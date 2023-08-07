import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { LiquidityPool__factory, MockDUSD__factory } from "../typechain-types";

const maxLossPerTime = 50000;

describe("LiquidityPool unit test", () => {
    async function deployLiquidityPoolFixture() {
        const [deployer, lpProvider, manager, betVault] = await ethers.getSigners();

        const MockDUSD = (await ethers.getContractFactory("MockDUSD")) as MockDUSD__factory;
        const stableToken = await MockDUSD.deploy();

        const LiquidityPool = (await ethers.getContractFactory("LiquidityPool")) as LiquidityPool__factory;
        const liquidityPool = await LiquidityPool.deploy(
            manager.address,
            stableToken.address,
            betVault.address,
            maxLossPerTime,
        );

        return { stableToken, lpProvider, manager, liquidityPool, deployer, betVault };
    }

    describe("#depositForAccount", () => {
        it("should deposit tokens for an account", async () => {
            const { manager, lpProvider, stableToken, liquidityPool } = await loadFixture(deployLiquidityPoolFixture);

            const mintAmount = ethers.utils.parseEther("1000");

            //1. Mint tokens for the lp provider
            await stableToken.mint(lpProvider.address, mintAmount);

            const depositAmount = ethers.utils.parseEther("150");
            //2. Approve LP for Token transfer
            await stableToken.connect(lpProvider).approve(liquidityPool.address, depositAmount);

            //3. Provide Liquidity and deposit stable tokens
            await liquidityPool.connect(manager).depositForAccount(lpProvider.address, depositAmount);

            expect(await liquidityPool.totalTokenSupply()).to.be.equal(depositAmount);
            expect(await liquidityPool.balanceOf(lpProvider.address)).to.be.equal(depositAmount);
        });
    });

    describe("#redeemSharesForAccount", () => {
        it("should redeem the tokens from lp", async () => {
            const { manager, lpProvider, stableToken, liquidityPool, betVault } = await loadFixture(
                deployLiquidityPoolFixture,
            );

            //1. deposit tokens
            const mintAmount = ethers.utils.parseEther("1000");
            await stableToken.mint(lpProvider.address, mintAmount);

            const depositAmount = ethers.utils.parseEther("150");
            await stableToken.connect(lpProvider).approve(liquidityPool.address, depositAmount);

            await liquidityPool.connect(manager).depositForAccount(lpProvider.address, depositAmount);

            //2. increase the value of the lp pool
            await stableToken.mint(liquidityPool.address, depositAmount);
            await liquidityPool.connect(manager).updateTokenSupply(betVault.address, depositAmount, true);

            //3. redeem tokens
            const _balanceBefore = await stableToken.balanceOf(lpProvider.address);
            const _shares = await liquidityPool.balanceOf(lpProvider.address);
            await liquidityPool.connect(manager).redeemSharesForAccount(lpProvider.address, _shares);

            expect(await stableToken.balanceOf(lpProvider.address)).to.be.equal(
                _balanceBefore.add(depositAmount.mul(2)),
            );
        });

        it("should fail when not enough free tokens in the lp", async () => {
            const { manager, lpProvider, stableToken, liquidityPool } = await loadFixture(deployLiquidityPoolFixture);

            //1. deposit tokens
            const mintAmount = ethers.utils.parseEther("1000");
            await stableToken.mint(lpProvider.address, mintAmount);

            const depositAmount = ethers.utils.parseEther("150");
            await stableToken.connect(lpProvider).approve(liquidityPool.address, depositAmount);

            await liquidityPool.connect(manager).depositForAccount(lpProvider.address, depositAmount);

            //2. Lock the tokens
            const lockAmount = ethers.utils.parseEther("100");
            await liquidityPool.connect(manager).updateLockedTokenSupply(lockAmount, true, 1000);

            //3. Try to redeem the total deposits
            await expect(
                liquidityPool.connect(manager).redeemSharesForAccount(lpProvider.address, depositAmount),
            ).to.be.revertedWithCustomError(liquidityPool, "LiquidityPool__NotEnoughFreeSuppy");
        });
    });
});
