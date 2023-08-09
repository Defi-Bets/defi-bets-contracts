import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig, getNetworkIdFromName } from "../../helper-hardhat-config";
import verify from "../../helper-functions";

const deployMathLibraryDefibets: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();

    const { deploy } = hre.deployments;

    const network = hre.network.name;

    const chainId = await getNetworkIdFromName(network);
    if (chainId) {
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
            waitConfirmations: networkConfig[chainId].confirmations,
        });
    }
};

deployMathLibraryDefibets.tags = ["core"];

export default deployMathLibraryDefibets;
