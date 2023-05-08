import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployDefiBetsManagerContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy } = hre.deployments;

    await deploy("DefiBetsManager", {
        from: deployer,
        args: [],
        log: true,
        autoMine: true,
    });
};

deployDefiBetsManagerContract.tags = ["tags"];

export default deployDefiBetsManagerContract;
