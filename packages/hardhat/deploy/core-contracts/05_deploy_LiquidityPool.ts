import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig, getNetworkIdFromName } from "../../helper-hardhat-config";

const deployLiquidityPoolContract: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get, getOrNull } = hre.deployments;

    const managerContractAddress = (await get("DefiBetsManager")).address;
    const betVault = (await get("DefiBetsVault")).address;

    const tokenContract = await getOrNull("FakeDUSD");

    if (tokenContract) {
        const tokenAddress = tokenContract.address;

        const network = hre.network.name;

        const chainId = await getNetworkIdFromName(network);

        if (chainId) {
            const maxLossPerTime = networkConfig[chainId].maxLossPerTime;

            await deploy("LiquidityPool", {
                from: deployer,
                log: true,
                args: [managerContractAddress, tokenAddress, betVault, maxLossPerTime],
                autoMine: true,
                waitConfirmations: 1,
            });
        }
    } else {
        console.log("No Stable Token exist!! Please deploy stable token!");
    }

    // const managerContract: DefiBetsManager = await hre.ethers.getContract("DefiBetsManager");

    // const defiBetsAddress = (await get("DefiBets")).address;

    // const feedAddress = (await get("MockV3Aggregator")).address;
    // await managerContract.addUnderlyingToken("BTC", feedAddress, defiBetsAddress, betVault);
};

deployLiquidityPoolContract.tags = ["core"];

export default deployLiquidityPoolContract;
