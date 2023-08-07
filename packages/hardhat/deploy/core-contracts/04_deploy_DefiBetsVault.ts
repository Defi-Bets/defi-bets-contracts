import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import verify from "../../helper-functions";
import { developmentChains } from "../../helper-hardhat-config";

const deployDefiBetsVaultContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, getOrNull, get } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;

    const tokenContract = await getOrNull("FakeDUSD");

    if (tokenContract) {
        const tokenAddress = tokenContract.address;
        const args = [managerContractAddress, tokenAddress];
        const vault = await deploy("DefiBetsVault", {
            from: deployer,
            args: args,
            log: true,
            autoMine: true,
            waitConfirmations: 6,
        });

        if (!developmentChains.includes(hre.network.name)) {
            await verify(vault.address, args);
        }
    } else {
        console.log("No Stable Token exist!! Please deploy stable token!");
    }
};

deployDefiBetsVaultContract.tags = ["core"];

export default deployDefiBetsVaultContract;
