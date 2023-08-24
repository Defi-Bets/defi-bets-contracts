import { ethers } from "hardhat";
import { MockDUSD, MockDUSD__factory, RedeemTracker__factory } from "../typechain-types";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

describe("RedeemTracker unit test", () => {
    const tokenToRedeem = ethers.utils.parseEther("145");
    const redeemTime = 7 * 60 * 60 * 24; // 7 days

    async function deployRedeemTrackerFixture() {
        const [deployer, liquidityPool, redeemer, badActor] = await ethers.getSigners();

        const MockDUSD = (await ethers.getContractFactory("MockDUSD")) as MockDUSD__factory;
        const token = (await MockDUSD.deploy()) as MockDUSD;

        const RedeemTracker = (await ethers.getContractFactory("RedeemTracker")) as RedeemTracker__factory;
        const redeemTracker = await RedeemTracker.deploy(token.address, liquidityPool.address);

        return { liquidityPool, redeemer, deployer, token, badActor, redeemTracker };
    }

    describe("#mintTokenForAccount", () => {
        it("should mint a token when the liqudity pool call the function", async () => {
            const { liquidityPool, redeemTracker, redeemer } = await loadFixture(deployRedeemTrackerFixture);

            const _time = (await ethers.provider.getBlock("latest")).timestamp + redeemTime;
            const tokenIDs = await redeemTracker.tokenIds();
            await redeemTracker.connect(liquidityPool).mintTokenForAccount(redeemer.address, tokenToRedeem, _time);

            expect(await redeemTracker.balanceOf(redeemer.address)).to.be.equal(1);
            expect(await redeemTracker.ownerOf(tokenIDs.add(1))).to.be.equal(redeemer.address);
            expect((await redeemTracker.redeemInfos(tokenIDs.add(1))).redeemTime).to.be.equal(_time);
            expect((await redeemTracker.redeemInfos(tokenIDs.add(1))).tokenAmount).to.be.equal(tokenToRedeem);
        });
    });

    describe("#redeem", () => {
        it("should finish the redeem period and transfer the tokens", async () => {
            const { liquidityPool, redeemTracker, redeemer, token } = await loadFixture(deployRedeemTrackerFixture);

            const _time = (await ethers.provider.getBlock("latest")).timestamp + redeemTime;
            await token.mint(redeemTracker.address, tokenToRedeem);
            await redeemTracker.connect(liquidityPool).mintTokenForAccount(redeemer.address, tokenToRedeem, _time);
            const tokenID = await redeemTracker.tokenIds();

            await time.increaseTo(_time + 1);

            await expect(redeemTracker.connect(redeemer).redeem(tokenID))
                .to.be.emit(redeemTracker, "RedeemFinished")
                .withArgs(redeemer.address, tokenID, tokenToRedeem);

            expect(await token.balanceOf(redeemer.address)).to.be.equal(tokenToRedeem);
        });

        it("should fail when the time has not passed for redeeming", async () => {
            const { liquidityPool, redeemTracker, redeemer, token } = await loadFixture(deployRedeemTrackerFixture);

            const _time = (await ethers.provider.getBlock("latest")).timestamp + redeemTime;
            await token.mint(redeemTracker.address, tokenToRedeem);
            await redeemTracker.connect(liquidityPool).mintTokenForAccount(redeemer.address, tokenToRedeem, _time);
            const tokenID = await redeemTracker.tokenIds();

            await expect(redeemTracker.connect(redeemer).redeem(tokenID)).to.be.revertedWith(
                "RedeemTracker__TimeNotPassed",
            );
        });

        it("should fail when the caller is not the owner of the token", async () => {
            const { liquidityPool, redeemTracker, badActor, token, redeemer } = await loadFixture(
                deployRedeemTrackerFixture,
            );

            const _time = (await ethers.provider.getBlock("latest")).timestamp + redeemTime;
            await token.mint(redeemTracker.address, tokenToRedeem);
            await redeemTracker.connect(liquidityPool).mintTokenForAccount(redeemer.address, tokenToRedeem, _time);
            const tokenID = await redeemTracker.tokenIds();

            await time.increaseTo(_time + 1);

            await expect(redeemTracker.connect(badActor).redeem(tokenID)).to.be.revertedWith(
                "RedeemTracker__NotTheOwner",
            );
        });
    });
});
