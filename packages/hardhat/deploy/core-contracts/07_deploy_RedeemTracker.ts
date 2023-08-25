import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig, getNetworkIdFromName } from "../../helper-hardhat-config";
import { ethers } from "hardhat";
import { LiquidityPool } from "../../typechain-types";

const deployRedeemTracker: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployer } = await hre.getNamedAccounts();
    const { deploy, get } = hre.deployments;

    const network = hre.network.name;

    const chainId = await getNetworkIdFromName(network);

    if (chainId) {
        const redeemFee = networkConfig[chainId].redeemFee;
        const redeemPeriod = networkConfig[chainId].redeemPeriod;
        let stableToken = networkConfig[chainId].stableToken;
        if (!stableToken) {
            stableToken = (await get("FakeDUSD")).address;
        }

        const lp = (await ethers.getContract("LiquidityPool")) as LiquidityPool;

        const redeemTracker = await deploy("RedeemTracker", {
            from: deployer,
            log: true,
            autoMine: true,
            args: [stableToken, lp.address],
            waitConfirmations: networkConfig[chainId].confirmations,
        });

        console.log("Setup redeem tracker...");
        let tx = await lp.setRedeemTracker(redeemTracker.address);
        await tx.wait();

        tx = await lp.setupRedeemConditions(redeemFee, redeemPeriod);
        await tx.wait();
    }
};

deployRedeemTracker.tags = ["core"];

export default deployRedeemTracker;
