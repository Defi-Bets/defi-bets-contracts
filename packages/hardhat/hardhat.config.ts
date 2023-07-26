import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
//import "solidity-coverage";
import "solidity-coverage";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

import "./tasks/set-bet";
import "./tasks/provide-lp";
import "./tasks/claim-winning";
import "./tasks/show-bet-info";
import "./tasks/mintFDUSD";
import "./tasks/verify-contracts";

// If not set, it uses ours Alchemy's default API key.
// You can get your own at https://dashboard.alchemyapi.io
const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";
// If not set, it uses the hardhat account 0 private key.
const deployerPrivateKey =
    process.env.DEPLOYER_PRIVATE_KEY ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const oracleOwnerPrivateKey =
    process.env.ORACLE_OWNER ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
// If not set, it uses ours Etherscan default API key.
const etherscanApiKey = process.env.ETHERSCAN_API_KEY || "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 800,
                    },
                },
            },
        ],
    },
    defaultNetwork: "dmcTestnet",
    namedAccounts: {
        deployer: {
            // By default, it will take the first Hardhat account as the deployer
            default: 0,
        },
        oracleOwner: {
            default: 1,
        },
    },
    networks: {
        // View the networks that are pre-configured.
        // If the network you are looking for is not here you can add new network settings
        hardhat: {
            forking: {
                url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
                enabled: process.env.MAINNET_FORKING_ENABLED === "true",
            },
        },
        mainnet: {
            url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
            accounts: [deployerPrivateKey],
        },
        dmcTestnet: {
            url: "https://testnet-dmc.mydefichain.com:20551/",
            accounts: [deployerPrivateKey, oracleOwnerPrivateKey],
            chainId: 1133,
            gas: 30_000_000,
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_ALCHEMY_URL}`,
            accounts: [deployerPrivateKey],
            chainId: 80001,
        },
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_ALCHEMY_URL}`,
            accounts: [deployerPrivateKey],
            chainId: 11155111,
        },
    },
    verify: {
        etherscan: {
            apiKey: `${etherscanApiKey}`,
        },
    },
    gasReporter: {
        currency: "USD",
        gasPrice: 15,
        enabled: process.env.ENABLE_GAS === "true",
        coinmarketcap: process.env.COINMARKET_CAP_API,
    },
    mocha: {
        timeout: 100000,
    },
    etherscan: {
        apiKey: {
            dmcTestnet: " ",
            polygonMumbai: `${etherscanApiKey}`,
        },
        customChains: [
            {
                network: "dmcTestnet",
                chainId: 1133,
                urls: {
                    apiURL: "https://testnet-dmc.mydefichain.com:8444/api",
                    browserURL: "https://testnet-dmc.mydefichain.com:8444/",
                },
            },
        ],
    },
};

export default config;
