import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployDefiBetsVaultContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;
    const tokenAddress = (await hre.ethers.getContract("MockDUSD")).address;

    await deploy("DefiBetsVault", {
        from: deployer,
        args: [managerContractAddress, tokenAddress],
        log: true,
        autoMine: true,
    });
};

deployDefiBetsVaultContract.tags = ["core"];

export default deployDefiBetsVaultContract;
