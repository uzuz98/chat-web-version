// modal.tsx
"use client";

import dynamic from "next/dynamic";
import { ChainInfo, evmChains, viction } from "@coin98-com/wallet-adapter-react-ui";

const WalletModalC98 = dynamic(
  async () => (await import("@coin98-com/wallet-adapter-react-ui")).WalletModalC98,
  {
    ssr: false,
  }
);

const Coin98AdapterModal = () => {
  const defaultChains = [viction]; // multi-chain
  return <WalletModalC98 isHiddenSocial isC98Theme enableChains={defaultChains} />;
};

export default Coin98AdapterModal;