import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployDefiBetsContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;
    const mathContractAddress = (await get("MockMath")).address;

    const dateString = Date.now();
    const startExpTime = Math.floor(new Date(dateString).getTime() / 1000);

    await deploy("DefiBets", {
        from: deployer,
        log: true,
        args: [managerContractAddress, mathContractAddress, startExpTime],
        autoMine: true,
    });
};

deployDefiBetsContract.tags = ["core"];

export default deployDefiBetsContract;
