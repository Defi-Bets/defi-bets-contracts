import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployUseMathLibraryDefibets: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployer } = await hre.getNamedAccounts();

  const { deploy } = hre.deployments;
  const library = (await hre.ethers.getContract("MathLibraryDefibets")).address;

  await deploy("UseMathLibraryDefibets", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
    libraries:
    {
      MathLibraryDefibets: (await hre.ethers.getContract("MathLibraryDefibets")).address
    }
  });
};

deployUseMathLibraryDefibets.tags = ["tags"];

export default deployUseMathLibraryDefibets;
