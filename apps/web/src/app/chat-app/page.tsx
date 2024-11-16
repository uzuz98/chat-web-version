'use client'
// import { useEffect } from "react";
import { PISCALE_APP_ID } from "~/constants/config";
import { fetchToken } from "~/constants/token";
import dynamic from "next/dynamic";
import { useState } from "react";

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

const Page = () => {
  const [threadId, setThreadId] = useState('49110071457410')
  // useEffect(() => {
  //   const signature = getStorage(EnumKeyStorage.LOGIN_SIGNATURE)
  //   console.log("🩲 🩲 => useEffect => signature:", signature)
  // }, [])

  const handleSelectThread = (seletedId: string) => {
    console.log("🩲 🩲 => handleSelectThread => threadId:", seletedId)
    setThreadId(seletedId)
  }

  const renderThread = () => {
    if (threadId) {
      return (
        <PSConversationDynamic threadId={threadId} />
      )
    }
  }

  return (
    <div
      className="min-h-screen bg-black"
      id="chat-container"
    >
      <PSChatProviderDynamic appId={PISCALE_APP_ID} fetchToken={fetchToken}>
        <div className="flex items-center flex-1 gap-x-4">
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
                className="!items-start !h-screen threadDetail__container"
              />
            )
          }
        </div>
      </PSChatProviderDynamic>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});
