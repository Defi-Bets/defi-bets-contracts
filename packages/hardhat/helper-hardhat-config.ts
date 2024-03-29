import { ethers } from "ethers";

interface INetworkConfig {
    [key: number]: any;
}
export const networkConfig: INetworkConfig = {
    31337: {
        name: "localhost",
        minDuration: 86400,
        maxDuration: 604800,
        fee: 20000,
        payoutRatio: 90,
        priceFeed: "0x",
        volatilityFeed: "0x",
        timeDelta: 43200,
        slot: ethers.utils.parseEther("100"),
        decimalsIV: 4,
        initialAnswerIV: 5000,
        periodIV: 30 * 60 * 60 * 24,
        decimalsPriceFeed: 18,
        initialAnswerPrice: ethers.utils.parseEther("30100"),
        targetPayoutRatio: 90,
        moduloDays: 30,
        maxLossPerTime: 50000,
        confirmations: 1,
        redeemPeriod: 6 * 24 * 60 * 60,
        redeemFee: 60000, //6 %
    },
    1133: {
        name: "dmcTestnet",
        minDuration: 43200,
        maxDuration: 604800,
        fee: 0,
        payoutRatio: 90,
        priceFeed: "0x",
        volatilityFeed: "0x",
        timeDelta: 43200,
        slot: ethers.utils.parseEther("100"),
        decimalsIV: 4,
        initialAnswerIV: 2000,
        periodIV: 30 * 60 * 60 * 24,
        decimalsPriceFeed: 18,
        initialAnswerPrice: ethers.utils.parseEther("29000"),
        targetPayoutRatio: 90,
        moduloDays: 30,
        maxLossPerTime: 50000,
        confirmations: 2,
        stableToken: "0xFF0000000000000000000000000000000000000B",
        redeemPeriod: 6 * 24 * 60 * 60,
        redeemFee: 60000, //6 %
    },
    80001: {
        name: "mumbai",
        minDuration: 43200,
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
        moduloDays: 30,
        maxLossPerTime: 50000,
        confirmations: 6,
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
        confirmations: 6,
    },
};

export const developmentChains = ["hardhat", "localhost"];
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
