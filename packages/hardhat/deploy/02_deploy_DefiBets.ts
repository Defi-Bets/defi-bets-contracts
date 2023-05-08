import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployDefiBetsContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;
    const mathContractAddress = (await get("MockMath")).address;

    await deploy("DefiBets", {
        from: deployer,
        log: true,
        args: [managerContractAddress, mathContractAddress],
        autoMine: true,
    });
};

deployDefiBetsContract.tags = ["core"];

export default deployDefiBetsContract;
