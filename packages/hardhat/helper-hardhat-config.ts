import { ethers } from "hardhat";

interface INetworkConfig {
    [key: number]: any;
}
export const networkConfig: INetworkConfig = {
    80001: {
        name: "polygonMumbai",
        minDuration: 3600,
        maxDuration: 2592000,
        slot: ethers.utils.parseEther("200"),
    },
    31337: {
        name: "localhost",
        minDuration: 3600,
        maxDuration: 2592000,
        slot: ethers.utils.parseEther("200"),
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
