import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DefiBetsManager } from "../typechain-types";

const deployLiquidityPoolContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const managerContractAddress = (await get("DefiBetsManager")).address;

  const token = (await hre.ethers.getContract("MockDUSD")).address;
  const lpPoolContract = await deploy("LiquidityPool", {
    from: deployer,
    log: true,
    args: [managerContractAddress, token],
    autoMine: true,
  });

  const managerContract: DefiBetsManager = await hre.ethers.getContract("DefiBetsManager");

  await managerContract.setAddresses(lpPoolContract.address);
};

deployLiquidityPoolContract.tags = ["core"];

export default deployLiquidityPoolContract;
