import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DefiBetsManager } from "../../typechain-types";

const deployLiquidityPoolContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;
    const betVault = (await get("DefiBetsVault")).address;

    const token = (await hre.ethers.getContract("MockDUSD")).address;

    const maxLossPerTime = 50000;

    await deploy("LiquidityPool", {
        from: deployer,
        log: true,
        args: [managerContractAddress, token, betVault, maxLossPerTime],
        autoMine: true,
    });

    const managerContract: DefiBetsManager = await hre.ethers.getContract("DefiBetsManager");

    const defiBetsAddress = (await get("DefiBets")).address;

    const feedAddress = (await get("MockV3Aggregator")).address;
    await managerContract.addUnderlyingToken("BTC", feedAddress, defiBetsAddress, betVault);
};

deployLiquidityPoolContract.tags = ["core"];

export default deployLiquidityPoolContract;
