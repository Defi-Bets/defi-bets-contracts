import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig, getNetworkIdFromName, developmentChains } from "../../helper-hardhat-config";
import verify from "../../helper-functions";

const deployDefiBetsManagerContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy, get } = hre.deployments;

    const mathLibrary = (await get("MathLibraryDefibets")).address;

    const network = hre.network.name;

    const chainId = await getNetworkIdFromName(network);

    if (chainId) {
        const fee = networkConfig[chainId].fee;
        const payoutRatio = networkConfig[chainId].payoutRatio;
        const args = [fee, payoutRatio];

        const manager = await deploy("DefiBetsManager", {
            from: deployer,
            args: args,
            log: true,
            autoMine: true,
            libraries: {
                MathLibraryDefibets: mathLibrary,
            },
            waitConfirmations: 6,
        });

        if (!developmentChains.includes(hre.network.name)) {
            await verify(manager.address, args);
        }
    } else {
        console.log("Missing parameters in hardhat helper config...");
    }
};

deployDefiBetsManagerContract.tags = ["core"];

export default deployDefiBetsManagerContract;
