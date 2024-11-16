import axios from 'axios'
import { compact, get, orderBy, size } from 'lodash'
import Web3 from 'web3'
import { ONEID_READ_CONTRACT, OneIdRead } from './constants'

const tomoClient = axios.create({
  baseURL: 'https://vicscan.xyz/api/'
})

const infoAPI = axios.create({
  baseURL: 'https://rapid.coin98.com'
})

interface IDomainConfig {
  "tldName": string,
  "fullName": string
  "node": string
  "contractAddress": string
  "registry": string
  "controller": string
  "resolver": string
  "bulkAction": string
  "priceConfig": string
  "priceOverride": string
  "multiSend": string
  "tokenSupport": Record<string, string>
  "crossChainSupport": [],
  "features": {
    "chat": boolean,
    "kyc": boolean,
    "login": boolean,
    "extend": boolean,
    "registerSpecialName": boolean
  },
  "domainPrice": {
    "characterFee": Record<number, string>
    "servicesFee": string
    "premium": string
    "upscaleThreshold": number
    "upscaleThresholdPercent": number
    "renewAfterExpiredFee": string
    "renewAfterExpiredDiscount": string
    "gradePeriod": number
    "premiumPeriod": number
    "minDuration": number
    "freeDuration": number
    "minCommitment": number
    "maxCommitment": number
    "commitmentFeePercent": number
    "referalFeePercent": number
    "cashbackRate": number
    "partner": {
      "feePercent": number
      "addr": string
      "node": string
    }
  }
}

const walletOfOwner = async (address: string) => {
  const cacheTimes = Date.now()
  // one id config - domainConfigData
  const response = await infoAPI.get(`OneIDV3.json?cache=${cacheTimes}`)
  const domainConfigData: IDomainConfig[] = response.data.domainConfig

  const CONTROLLER_BY_DOMAIN = Object.entries(domainConfigData).map(([key, value]) => {
    return {
      registar: value.contractAddress,
      address: value.controller,
      resolver: value.resolver,
      domain: key
    }
  })

  const REGISTRY_CONTRACT = Object.values(domainConfigData)[0].registry
  const ONEID_BULK_CONTRACT = Object.values(domainConfigData)[0].bulkAction

  let totalIds: any[] = []

  const loadTotalData = async (offset = 0) => {
    const response = await tomoClient.get('/nft/inventory', {
      params: {
        account: address,
        offset,
        limit: 10000
      }
    })

    Array.prototype.push.apply(totalIds, get(response.data, 'data'))

    if (size(totalIds) < get(response.data, 'total')) {
      return loadTotalData(offset + 10000)
    }
    return totalIds
  }

  const nftData = await loadTotalData()

  const balances = { ids: [], linked: [] }

  if (size(nftData) > 0) {
    const rawId = compact(
      nftData.map(nft => {
        const nftTokenID = get(nft, 'tokenIdString', get(nft, 'tokendId', get(nft, 'tokenId')))

        const findDomain = CONTROLLER_BY_DOMAIN.find(controller => controller.registar === nft.token)
        if (!findDomain) return

        return nftTokenID + '.' + findDomain.domain
      })
    )
    // log('rawId', rawId)
    if (size(rawId) > 0) {
      const resultIds = await axios.post('https://api.oneid.xyz/scan/node', { ids: rawId })
      const decodeIds = resultIds?.data?.data || []

      balances.ids = decodeIds || []
      const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.tomochain.com/'))

      const oneIdContract = new web3.eth.Contract(OneIdRead, ONEID_READ_CONTRACT)

      const ownerOfData = oneIdContract.methods.ownerOf(
        // @ts-expect-error
        balances.ids.map(rs => rs.node),
        balances.ids.map(() => REGISTRY_CONTRACT)
      ).call()

      balances.ids = orderBy(
        balances.ids.map((nd, idx) => {
          // @ts-expect-error
          nd.nodeOwner = ownerOfData[idx]
          return nd
        }),
        ['registrationDate'],
        ['desc']
      )
    }
  }

  const result = await axios
    .get('https://api.oneid.xyz/link/wallet/' + address)
  const linkedWallets = result.data.data

  if (size(linkedWallets) > 0) {
    // @ts-expect-error
    balances.linked = orderBy(linkedWallets, ['registrationDate'], ['desc'])
  }
  return balances
}

export const GET = async (req: Request) => {
  const reqUrl = req.url
  const { searchParams } = new URL(reqUrl)
  const address = searchParams.get('address')

  if (!address) {
    return Response.json({
      error: 'Missing address'
    }, {
      status: 400
    })
  }

  const result = await walletOfOwner(address)
  return Response.json({
    ...result
  }, {
    status: 200
  })
}