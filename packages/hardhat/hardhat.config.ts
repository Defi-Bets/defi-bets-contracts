import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "solidity-coverage";

// If not set, it uses ours Alchemy's default API key.
// You can get your own at https://dashboard.alchemyapi.io
const providerApiKey = process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";
// If not set, it uses the hardhat account 0 private key.
const deployerPrivateKey =
    process.env.DEPLOYER_PRIVATE_KEY ?? "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
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

    defaultNetwork: "localhost",
    namedAccounts: {
        deployer: {
            // By default, it will take the first Hardhat account as the deployer
            default: 0,
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
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`,
            accounts: [deployerPrivateKey],
        },
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${providerApiKey}`,
            accounts: [deployerPrivateKey],
        },
        arbitrum: {
            url: `https://arb-mainnet.g.alchemy.com/v2/${providerApiKey}`,
            accounts: [deployerPrivateKey],
        },
        arbitrumGoerli: {
            url: `https://arb-goerli.g.alchemy.com/v2/${providerApiKey}`,
            accounts: [deployerPrivateKey],
        },
        optimism: {
            url: `https://opt-mainnet.g.alchemy.com/v2/${providerApiKey}`,
            accounts: [deployerPrivateKey],
        },
        optimismGoerli: {
            url: `https://opt-goerli.g.alchemy.com/v2/${providerApiKey}`,
            accounts: [deployerPrivateKey],
        },
        polygon: {
            url: `https://polygon-mainnet.g.alchemy.com/v2/${providerApiKey}`,
            accounts: [deployerPrivateKey],
        },
        polygonMumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${providerApiKey}`,
            accounts: [deployerPrivateKey],
        },
    },
    verify: {
        etherscan: {
            apiKey: `${etherscanApiKey}`,
        },
    },
    gasReporter: {
        currency: "USD",
        gasPrice: 1,
        enabled: process.env.ENABLE_GAS === "true",
        coinmarketcap: process.env.COINMARKET_CAP_API,
    },
    mocha: {
        timeout: 100000,
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
};

export default config;
