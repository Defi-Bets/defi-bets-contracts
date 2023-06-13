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

    await deploy("UseMathLibraryDefibets", {
        from: deployer,
        args: [],
        log: true,
        autoMine: true,
        libraries: {
            MathLibraryDefibets: (await hre.ethers.getContract("MathLibraryDefibets")).address,
        },
    });
};

deployMathLibraryDefibets.tags = ["core"];

export default deployMathLibraryDefibets;
