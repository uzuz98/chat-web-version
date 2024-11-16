type CommuniComponent<T> = (props: T & React.HTMLAttributes<HTMLDivElement>) => JSX.Element;

declare module "@communi/chat-react" {
  const PSChatProvider: CommuniComponent<{
    appId: string;
    fetchToken: () => Promise<string>;
    children: React.ReactNode;
  }>;
  const PSThreadList: CommuniComponent<{
    threadId: string;
    style: React.CSSProperties;
    onThreadSelected: (threadId: string) => void;
    onFrequentlyItemSelected: (threadId: string) => void;
  }>;
  const PSConversation: CommuniComponent<{
    threadId: string;
  }>;
  const PSUIProvider: any;
  export = { PSChatProvider, PSThreadList, PSConversation, PSUIProvider };
  export default { PSChatProvider, PSThreadList, PSConversation, PSUIProvider };
}