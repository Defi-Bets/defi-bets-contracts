import { Chain } from "wagmi";

export const dmcTestnet = {
  id: 1133,
  name: "DMC Testnet",
  network: "dmcTestnet",
  nativeCurrency: {
    decimals: 18,
    name: "DeFiChain",
    symbol: "DFI",
  },
  rpcUrls: {
    public: { http: [" https://testnet-dmc.mydefichain.com:20551/"] },
    default: { http: ["https://testnet-dmc.mydefichain.com:20551/"] },
  },
  blockExplorers: {
    etherscan: { name: "MyDefiChain", url: "https://testnet-dmc.mydefichain.com:8444/" },
    default: { name: "MyDefiChain", url: "https://testnet-dmc.mydefichain.com:8444/" },
  },
} as const satisfies Chain;
