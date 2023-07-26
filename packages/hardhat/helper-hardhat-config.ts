import { ethers } from "ethers";

interface INetworkConfig {
    [key: number]: any;
}
export const networkConfig: INetworkConfig = {
    31337: {
        name: "localhost",
        minDuration: 3600,
        maxDuration: 2592000,
        slot: ethers.utils.parseEther("200"),
        fee: 0,
        payoutRatio: 90,
        decimalsIV: 4,
        initialAnswerIV: 2000,
        periodIV: 30 * 60 * 60 * 24,
        decimalsPriceFeed: 18,
        initialAnswerPrice: ethers.utils.parseEther("25918"),
        targetPayoutRatio: 90,
        moduloDays: 7,
        maxLossPerTime: 50000,
    },
    1133: {
        name: "dmcTestnet",
        minDuration: 86400,
        maxDuration: 604800,
        fee: 20000,
        payoutRatio: 90,
        priceFeed: "0x",
        volatilityFeed: "0x",
        timeDelta: 43200,
        slot: ethers.utils.parseEther("50"),
        decimalsIV: 4,
        initialAnswerIV: 2000,
        periodIV: 30 * 60 * 60 * 24,
        decimalsPriceFeed: 18,
        initialAnswerPrice: ethers.utils.parseEther("25918"),
        targetPayoutRatio: 90,
        moduloDays: 7,
        maxLossPerTime: 50000,
    },
    80001: {
        name: "mumbai",
        minDuration: 86400,
        maxDuration: 604800,
        fee: 20000,
        payoutRatio: 90,
        priceFeed: "0x",
        volatilityFeed: "0x",
        timeDelta: 43200,
        slot: ethers.utils.parseEther("100"),
        decimalsIV: 4,
        initialAnswerIV: 2000,
        periodIV: 30 * 60 * 60 * 24,
        decimalsPriceFeed: 18,
        initialAnswerPrice: ethers.utils.parseEther("25918"),
        targetPayoutRatio: 90,
        moduloDays: 7,
        maxLossPerTime: 50000,
    },
    11155111: {
        name: "sepolia",
        minDuration: 86400,
        maxDuration: 604800,
        fee: 20000,
        payoutRatio: 90,
        priceFeed: "0x",
        volatilityFeed: "0x",
        timeDelta: 43200,
        slot: ethers.utils.parseEther("50"),
        decimalsIV: 4,
        initialAnswerIV: 2000,
        periodIV: 30 * 60 * 60 * 24,
        decimalsPriceFeed: 18,
        initialAnswerPrice: ethers.utils.parseEther("25918"),
        targetPayoutRatio: 90,
        moduloDays: 7,
        maxLossPerTime: 50000,
    },
};

export const developmentChains = ["hardhat", "localhost", "dmcTestnet"];
export const testNetworks = ["polygonMumbai"];

export const deploymentFilesLocation = "./deployments";
export const testDeploymentFilesLocation = "./test-deployments";

export const getNetworkIdFromName = async (networkIdName: string) => {
    for (const id in networkConfig) {
        if (networkConfig[id]["name"] === networkIdName) {
            return Number(id);
        }
    }
    return null;
};
