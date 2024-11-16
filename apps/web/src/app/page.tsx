'use client'
import { ONEID_MESSAGE, PISCALE_APP_ID } from "~/constants/config";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const PSChatProviderDynamic = dynamic(
  async () => (await import('@communi/chat-react')).PSChatProvider,
  {
    ssr: false,
  }
);

const PSConversationDynamic = dynamic(
  async () => (await import('@communi/chat-react')).PSConversation,
  {
    ssr: false,
  }
);

const PSThreadListDynamic = dynamic(
  async () => (await import('@communi/chat-react')).PSThreadList,
  {
    ssr: false,
  }
);

export default function Page(): JSX.Element {
  const { address, connected, disconnect, signMessage } = useWallet()
  const { openWalletModal } = useWalletModal();
  const router = useRouter()
  const [oneIds, setOneIds] = useState<{
    expires: number
    id: string
    name: string
    node: string
    registrationDate: number
    tld: string
  }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState('')
  const [authToken, setAuthToken] = useState('')

  const handlOpenWalletModal = () => {
    try {
      openWalletModal()
    } catch (error) {
      console.log("🩲 🩲 => handlOpenWalletModal => error:", error)
    }
  }

  const handleSignMessage = (oneIdName: string) => async () => {
    const result = await signMessage(ONEID_MESSAGE)
    const signature = result.data

    const resultAuth = await axios.post('/api/token', {
      oneIdName,
      signature
    })
    setAuthToken(resultAuth.data)
  }

  const fetchOneIds = async () => {
    if (address && connected) {
      setIsLoading(true)
      try {
        const response = await axios.get<{}, {
          data: {
            ids: {
              expires: number
              id: string
              name: string
              node: string
              registrationDate: number
              tld: string
            }[]
            linked: any[]
          }
        }>('/api/one-ids/', {
          params: {
            address
          },
        })
        setOneIds(response.data.ids)

      } catch (error) {
        setOneIds([])
      }
      setIsLoading(false)
    }
  }

  const fetchToken = async () => {
    return authToken
  }

  useEffect(() => {
    if (address && connected) {
      fetchOneIds()
    }
  }, [address, connected])

  const renderButtonConnect = () => {
    if (isLoading) {
      return (
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>

      )
    }
    if (connected && address) {
      return (
        <>
          <div
            className="bg-sub2 rounded-full px-8 py-3 transition-all flex justify-between gap-x-2"
          >

            <p className="text-main-yellow">Account</p>
            <p className="text-white">{address}</p>
          </div>
          <div
            className="bg-sub2 rounded-full px-8 py-3 cursor-pointer transition-all hover:bg-sub1 flex justify-between gap-x-2"
            onClick={disconnect}
          >
            Disconnect
          </div>
          <div
            className="text-white"
          >
            Choose one id to continue login
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 w-full items-start px-4 rounded-lg text-white">
            {oneIds.map(({ name, registrationDate, expires }, index) => {
              return (
                <div
                  key={name}
                  className={
                    "border-[#454545] border w-96 cursor-pointer items-center bg-main-bg rounded-xl"
                  }
                  onClick={handleSignMessage(name)}
                >
                  <div className="bg-sub2 rounded-t-xl w-full p-4">
                    <span>{name}</span>
                  </div>
                  <div className="p-4 flex flex-col gap-y-2">
                    <div className="flex flex-col gap-y-2">
                      <div className="flex justify-between">
                        <p className='text-sub3'>Registration Date</p>
                        <p>{registrationDate * 1000}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <div className="flex justify-between">
                        <p className="text-sub3">Expiration Data</p>
                        <p>{expires * 1000}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )
    }
    return (
      <div
        onClick={handlOpenWalletModal}
        className="bg-sub2 rounded-full px-8 py-3 cursor-pointer transition-all hover:bg-sub1"
      >
        <p className="text-white">Connect Wallet</p>
      </div>
    )
  }

  const handleSelectThread = (seletedId: string) => {
    setThreadId(seletedId)
  }

  return (
    <main className="flex flex-col h-screen justify-between gap-y-8 bg-black">
      {
        authToken ? (
          <div
            className="flex-1 bg-black h-full bg-header bg-cover bg-no-repeat"
            id="chat-container"
          >
            <div className="z-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
            <PSChatProviderDynamic className="h-full flex-1 z-10" appId={PISCALE_APP_ID} fetchToken={fetchToken}>
              <div className="flex items-center h-full flex-1 gap-x-4">
                <PSThreadListDynamic
                  threadId={threadId}
                  style={{ width: 600, display: 'flex', flexDirection: 'column' }}
                  className="threadList__container"
                  onThreadSelected={handleSelectThread}
                  onFrequentlyItemSelected={handleSelectThread}
                />
                {
                  threadId && (
                    <PSConversationDynamic
                      threadId={threadId}
                      className="!items-start threadDetail__container flex-1 h-full"
                    />
                  )
                }
              </div>
            </PSChatProviderDynamic>
          </div>
        ) : (
          <div className="flex-1">
            <div className="bg-header bg-cover bg-no-repeat h-60 bg-center">
              <div className="flex flex-col justify-center items-start text-white h-full gap-y-4 px-4">
                <img className="w-36" src="/coin98-logo.svg" />
                <p className=" text-3xl"><span className=" text-main-yellow">Coin98 </span> Super Wallet</p>
                <p>Chat Web Version</p>
              </div>
            </div>
            <div className="flex-1 p-8 flex flex-col items-start gap-y-8">
              {renderButtonConnect()}
            </div>
          </div>
        )
      }
    </main>
  );
}
