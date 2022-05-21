import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import walletLinkModule from "@web3-onboard/walletlink";

const injected = injectedModule();
const walletConnect = walletConnectModule();
const coinbase = walletLinkModule();

export const onboard = init({
  wallets: [walletConnect, injected, coinbase],
  chains: [
    {
      id: "0x1", // chain ID must be in hexadecimel
      token: "ETH", // main chain token
      namespace: "evm",
      label: "Ethereum",
      rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL
    },
    {
      id: "0x89", // chain ID must be in hexadecimel
      token: "MATIC", // main chain token
      namespace: "evm",
      label: "Polygon",
      rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL
    },
    {
      id: "0x38", // chain ID must be in hexadecimel
      token: "BNB", // main chain token
      namespace: "evm",
      label: "Binance Smart Chain",
      rpcUrl: process.env.NEXT_PUBLIC_SMARTCHAIN_RPC_URL
    },
  ],
  appMetadata: {
    name: "Stackd AVS",
    icon: "/vercel.svg",
    logo: "/vercel.svg",
    description: "Signing dapp.",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" }
    ],
  }
});