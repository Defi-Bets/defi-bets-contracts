import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig, getNetworkIdFromName } from "../helper-hardhat-config";

const deployDefiBetsManagerContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy, get } = hre.deployments;

    const mathLibrary = (await get("MathLibraryDefibets")).address;

    const network = hre.network.name;

    const chainId = await getNetworkIdFromName(network);

    if (chainId) {
        const fee = networkConfig[chainId].fee;
        const payoutRatio = networkConfig[chainId].payoutRatio;

        await deploy("DefiBetsManager", {
            from: deployer,
            args: [fee, payoutRatio],
            log: true,
            autoMine: true,
            libraries: {
                MathLibraryDefibets: mathLibrary,
            },
        });
    } else {
        console.log("Missing parameters in hardhat helper config...");
    }
};

deployDefiBetsManagerContract.tags = ["tags"];

export default deployDefiBetsManagerContract;
