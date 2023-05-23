import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployMathLibraryDefibets: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy } = hre.deployments;

    await deploy("MathLibraryDefibets", {
        from: deployer,
        args: [],
        log: true,
        autoMine: true,
    });
};

deployMathLibraryDefibets.tags = ["tags"];

export default deployMathLibraryDefibets;
