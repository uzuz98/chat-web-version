import axios from 'axios'
import { get, size } from 'lodash'

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

export const walletOfOwner = async address => {
  // one id config - domainConfigData
  const response = await axios.get('https://rapid.coin98.com/OneIDV3.json?cache=${cacheTimes}')
  const domainConfigData: IDomainConfig[] = response.data.domainConfig
  console.log("🩲 🩲 => walletOfOwner => domainConfigData:", domainConfigData)

  const ONEID_READ_CONTRACT = '0x2B8BE91659b669f1acf57350a81489d0c1Fa0c9b' // new

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
  console.log("🩲 🩲 => walletOfOwner => nftData:", nftData)

  // const balances = { ids: [], linked: [] }

  // if (size(nftData) > 0) {
  //   const rawId = _.compact(
  //     nftData.map(nft => {
  //       const nftTokenID = get(nft, 'tokenIdString', get(nft, 'tokendId', get(nft, 'tokenId')))

  //       const findDomain = CONTROLLER_BY_DOMAIN.find(controller => controller.registar === nft.token)
  //       if (!findDomain) return

  //       return nftTokenID + '.' + findDomain.domain
  //     })
  //   )
  //   // log('rawId', rawId)
  //   if (size(rawId) > 0) {
  //     const decodeIds = await APIServices(API_ENDPOINT_KEY.BaseOneId).post('scan/node', { ids: rawId })
  //     balances.ids = decodeIds || []

  //     const readContract = window.wallet.postCallServices({
  //       chain,
  //       name: 'getContract',
  //       params: [ONEID_READ_CONTRACT, OneIDRead]
  //     })

  //     const ownerOf = await window.wallet.postCallServices({
  //       chain,
  //       name: 'callContract',
  //       params: [readContract, 'ownerOf', [balances.ids.map(rs => rs.node), balances.ids.map(() => REGISTRY_CONTRACT)]]
  //     })
  //     const filterExpired = balances.ids.filter(item => labelExpire(item.expires)?.isExpire !== TYPE_EXPIRE.EXPIRED)

  //     balances.ids = _.orderBy(
  //       filterExpired.map((nd, idx) => {
  //         nd.nodeOwner = ownerOf[idx]
  //         return nd
  //       }),
  //       ['registrationDate'],
  //       ['desc']
  //     )
  //   }
  // }

  // const linkedWallets = await APIServices(API_ENDPOINT_KEY.BaseOneId)
  //   .get('link/wallet/' + address)
  //   .catch()

  // if (size(linkedWallets) > 0) {
  //   const filterExpired = linkedWallets.filter(item => labelExpire(item.expires)?.isExpire !== TYPE_EXPIRE.EXPIRED)
  //   balances.linked = _.orderBy(filterExpired, ['registrationDate'], ['desc'])
  // }
  // return balances
}