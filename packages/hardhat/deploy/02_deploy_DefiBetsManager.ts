import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployDefiBetsManagerContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy, get } = hre.deployments;

    const mathLibrary = (await get("MathLibraryDefibets")).address;

    await deploy("DefiBetsManager", {
        from: deployer,
        args: [],
        log: true,
        autoMine: true,
        libraries: {
            MathLibraryDefibets: mathLibrary,
        },
    });
};

deployDefiBetsManagerContract.tags = ["tags"];

export default deployDefiBetsManagerContract;
