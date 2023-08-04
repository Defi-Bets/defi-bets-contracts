import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../../helper-hardhat-config";
import verify from "../../helper-functions";

const deployMathLibraryDefibets: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy } = hre.deployments;

    const library = await deploy("MathLibraryDefibets", {
        from: deployer,
        args: [],
        log: true,
        autoMine: true,
    });

    if (!developmentChains.includes(hre.network.name)) {
        await verify(library.address, []);
    }

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
