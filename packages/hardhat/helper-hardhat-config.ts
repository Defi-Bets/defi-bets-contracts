interface INetworkConfig {
    [key: number]: any;
}
export const networkConfig: INetworkConfig = {
    80001: {
        name: "polygonMumbai",
        multiSig: "0x2b604EdEf24e8883453A051ca72145C177ccaEf1",
        baseURL: "ipfs://bafybeibtxzsojo7jetfqcmj3ftc4sploxjviznlw3iz5337b5f2wr7qcga/",
    },
    31337: {
        name: "localhost",
        multiSig: "0x2b604EdEf24e8883453A051ca72145C177ccaEf1",
        baseURL: "ipfs://bafybeibtxzsojo7jetfqcmj3ftc4sploxjviznlw3iz5337b5f2wr7qcga/",
    },
};

export const developmentChains = ["hardhat", "localhost"];
export const testNetworks = ["polygonMumbai"];

export const deploymentFilesLocation = "./deployments";
export const testDeploymentFilesLocation = "./test-deployments";

export const getNetworkIdFromName = async (networkIdName: string) => {
    for (const id in networkConfig) {
        if (networkConfig[id][`"name"`] === networkIdName) {
            return Number(id);
        }
    }
    return null;
};
