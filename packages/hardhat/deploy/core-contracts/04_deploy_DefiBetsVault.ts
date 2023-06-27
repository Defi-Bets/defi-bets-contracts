import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployDefiBetsVaultContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, getOrNull, get } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;

    const tokenContract = await getOrNull("FakeDUSD");

    if (tokenContract) {
        const tokenAddress = tokenContract.address;

        await deploy("DefiBetsVault", {
            from: deployer,
            args: [managerContractAddress, tokenAddress],
            log: true,
            autoMine: true,
        });
    } else {
        console.log("No Stable Token exist!! Please deploy stable token!");
    }
};

deployDefiBetsVaultContract.tags = ["core"];

export default deployDefiBetsVaultContract;
