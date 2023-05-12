import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployRedeemVaultContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;
    const tokenAddress = (await hre.ethers.getContract("MockDUSD")).address;

    const signer = await ethers.getSigner(deployer);
    const transactionCount = await signer.getTransactionCount();

    const futureLPAddress = ethers.utils.getContractAddress({
        from: signer.address,
        nonce: transactionCount,
    });

    await deploy("RedeemVault", {
        from: deployer,
        log: true,
        args: [managerContractAddress, futureLPAddress, tokenAddress],
        autoMine: true,
    });
};

deployRedeemVaultContract.tags = ["core"];

export default deployRedeemVaultContract;
