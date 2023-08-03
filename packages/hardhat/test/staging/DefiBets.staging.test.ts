import { ethers, network } from "hardhat";
import { networkConfig, getNetworkIdFromName } from "../../helper-hardhat-config";
import {
    BTCPriceOracle,
    DefiBets,
    DefiBetsManager,
    DefiBetsVault,
    FakeDUSD,
    LiquidityPool,
} from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

const amountLP = ethers.utils.parseEther("1000000");
const expirationPrice = ethers.utils.parseEther("29516");

const { parseEther, formatEther } = ethers.utils;

if (network.name != "localhost") {
    describe.skip;
} else {
    describe("DefiBets Protocol Staging Test", () => {
        describe("# Run of a bet day with winnings for the players", () => {
            it("should be successfully paid out the winnings to the players", async () => {
                const fDUSD = (await ethers.getContract("FakeDUSD")) as FakeDUSD;
                const managerContract = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;
                const hash = await managerContract.getUnderlyingByte("BTC");

                async function setBets(
                    users: SignerWithAddress[],
                    expDates: BigNumber[],
                    betSizes: BigNumber[],
                    minPrices: BigNumber[],
                    maxPrices: BigNumber[],
                ) {
                    const vault = await managerContract.vaults(hash);
                    for (let i = 0; i < users.length; i++) {
                        console.log(`Set bet no.${i + 1}`);
                        const fee = await managerContract.calculateFee(betSizes[i]);
                        await fDUSD.mint(users[i].address, betSizes[i].add(fee));
                        await fDUSD.connect(users[i]).approve(vault, betSizes[i].add(fee));

                        await managerContract
                            .connect(users[i])
                            .setBet(betSizes[i], minPrices[i], maxPrices[i], expDates[i], "BTC");
                    }
                }

                const [deployer, user1, user2, lpProvider] = await ethers.getSigners();

                //1. Setup the contracts

                await setupContracts();

                // 2. Provide Liquidity to the LP pool
                const lpAddress = await managerContract.liquidityPool();

                console.log("Provide liquidity ...");
                await fDUSD.mint(lpProvider.address, amountLP);
                await fDUSD.connect(lpProvider).approve(lpAddress, amountLP);

                await managerContract.connect(lpProvider).provideLP(amountLP);

                //3. Set the bets for the next day

                const defiBetsAddress = await managerContract.defiBetsContracts(hash);
                const defiBets = (await ethers.getContractAt("DefiBets", defiBetsAddress)) as DefiBets;

                const dependendTimestamp = await defiBets.getDependentExpTime();
                const delta = await defiBets.timeDelta();

                const users = [user1, user2, user1, user2];
                const expDates = [
                    dependendTimestamp.add(delta.mul(2)),
                    dependendTimestamp.add(delta.mul(2)),
                    dependendTimestamp.add(delta.mul(3)),
                    dependendTimestamp.add(delta.mul(5)),
                ];
                const betSizes = [parseEther("22"), parseEther("100"), parseEther("20"), parseEther("80")];
                const minPrices = [parseEther("29000"), parseEther("28000"), parseEther("28000"), parseEther("28000")];
                const maxPrices = [parseEther("29500"), parseEther("32000"), parseEther("31000"), parseEther("30000")];

                await setBets(users, expDates, betSizes, minPrices, maxPrices);

                try {
                    // Create the event filter for the "BetPlaced" event
                    const filter = defiBets.filters.BetPlaced();

                    // Get the events that match the filter
                    const events = await defiBets.queryFilter(filter);

                    // Process the events
                    events.forEach(event => {
                        const _account = event.args?.account;
                        const _betSize = event.args?.betSize;
                        const _expDate = event.args?.expDate;
                        const _profit = event.args?.profit;
                        const _min = event.args?.minPrice;
                        const _max = event.args?.maxPrice;
                        const _tokenId = event.args?.tokenId;
                        console.log(
                            `Bet event - user: ${_account}, expTime: ${new Date(
                                _expDate.toNumber() * 1000,
                            ).toLocaleDateString()}, bet size: ${formatEther(_betSize)}, profit: ${formatEther(
                                _profit,
                            )}, range: ${formatEther(_min)} - ${formatEther(_max)}, token id: ${_tokenId.toNumber()}`,
                        );
                    });
                } catch (error) {
                    console.error("Error searching for events:", error);
                }

                //4. Increase one day and execute first exp date
                const priceOracleAddress = await managerContract.underlyingPriceFeeds(hash);
                const oracle = (await ethers.getContractAt(
                    "BTCPriceOracle",
                    priceOracleAddress,
                    deployer,
                )) as BTCPriceOracle;

                await oracle.updateAnswer(expirationPrice);
                let roundId = (await oracle.latestRoundData()).roundId;

                await time.increaseTo(dependendTimestamp.add(delta).add(1));
                await oracle.updateAnswer(expirationPrice);
                console.log("execute first exp date");
                await managerContract.executeExpiration(dependendTimestamp.add(delta), "BTC", roundId);

                await oracle.updateAnswer(expirationPrice);

                //5. Increase one day and execute the second exp date

                await time.increaseTo(expDates[0].sub(100));
                await oracle.updateAnswer(expirationPrice);

                roundId = (await oracle.latestRoundData()).roundId;
                await time.increaseTo(expDates[0].add(1));
                await oracle.updateAnswer(expirationPrice);
                console.log("execute second exp date");
                await managerContract.executeExpiration(expDates[0], "BTC", roundId);

                let lpLoss: BigNumber = ethers.BigNumber.from(0);
                try {
                    // Create the event filter for the "Expiration" event
                    const filter = defiBets.filters.Expiration();

                    // Get the events that match the filter
                    const events = await defiBets.queryFilter(filter);

                    // Process the events
                    events.forEach(event => {
                        const expTime = event.args?.expTime;
                        const profit = event.args?.profit;
                        const delta = event.args?.delta;

                        if (expDates[0].eq(expTime)) {
                            lpLoss = lpLoss.add(delta);
                        }
                        console.log(
                            `Expiration event - expTime: ${new Date(
                                expTime.toNumber() * 1000,
                            ).toLocaleDateString()}, profit: ${profit}, delta: ${formatEther(delta)}`,
                        );
                    });
                } catch (error) {
                    console.error("Error searching for events:", error);
                }

                //#1 Check the total supply from the liquidity pool
                const vaultAddress = await managerContract.vaults(hash);
                const vaultContract = (await ethers.getContractAt("DefiBetsVault", vaultAddress)) as DefiBetsVault;

                const expTimeSupply = await vaultContract.expTimeSupply(expDates[0]);

                const lp = (await ethers.getContractAt("LiquidityPool", lpAddress, deployer)) as LiquidityPool;
                const totalLPSupply = await lp.totalTokenSupply();

                expect(amountLP.sub(totalLPSupply)).to.be.equal(lpLoss);

                //#2 Check the status of the exp date

                const expInfo = await defiBets.expTimeInfos(expDates[0]);

                expect(expInfo.finished).to.be.equal(true);
                expect(expInfo.profit).to.be.equal(false);
                expect(expInfo.deltaValue).to.be.equal(lpLoss);
                expect(expInfo.deltaValue.add(expInfo.totalBets)).to.be.equal(expTimeSupply);

                //6. claim the winnings of the user

                for (let i = 0; i < expDates.length; i++) {
                    const _finished = (await defiBets.expTimeInfos(expDates[i])).finished;
                    if (_finished) {
                        console.log(`Claim the winnings for user ${users[i].address}`);
                        await managerContract.connect(users[i]).claimWinnings(i + 1, hash);
                    }
                }

                //#3 Check the token balances of the winning users (user2)

                let expectedWinning: BigNumber = ethers.BigNumber.from(0);

                try {
                    // Create the event filter for the "Claimed" event
                    const filter = defiBets.filters.Claimed();

                    // Get the events that match the filter
                    const events = await defiBets.queryFilter(filter);

                    // Process the events
                    events.forEach(async event => {
                        const _account = event.args?.account;
                        const _tokenId = event.args?.tokenId;
                        const _profit = event.args?.profit;

                        if (_account === user2.address && _profit === true) {
                            const tokenInfo = await defiBets.getBetTokenData(_tokenId);
                            expectedWinning = expectedWinning.add(tokenInfo.profit);
                        }

                        console.log(`Claimed event - acc: ${_account}, profit: ${_profit}, tokenId: ${_tokenId}`);
                    });
                } catch (error) {
                    console.error("Error searching for events:", error);
                }
                const tokenContract = (await ethers.getContract("FakeDUSD")) as FakeDUSD;
                const tokenBalance = await tokenContract.balanceOf(user2.address);
                expect(expectedWinning).to.be.equal(tokenBalance);

                //#4 Check the new payoutfactor

                const payoutFactor = await managerContract.payoutFactor();
                console.log(`New payout factor: ${payoutFactor.toNumber() / 100}`);
            });
        });
    });
}

async function setupContracts() {
    const networkName = network.name;

    const chainId = await getNetworkIdFromName(networkName);

    console.log(`chain id: ${chainId}`);

    if (chainId) {
        const minDuration = networkConfig[chainId].minDuration;
        const maxDuration = networkConfig[chainId].maxDuration;
        const slot = networkConfig[chainId].slot;
        const periodVola = networkConfig[chainId].periodIV;
        const fee = networkConfig[chainId].fee;

        const manager = (await ethers.getContract("DefiBetsManager")) as DefiBetsManager;

        const hash = await manager.getUnderlyingByte("BTC");

        const isAlreadySetup = await manager.validUnderlying(hash);

        if (isAlreadySetup) {
            return;
        }

        const priceFeed = (await ethers.getContract("BTCPriceOracle")).address;
        const defiBets = (await ethers.getContract("DefiBets")).address;
        const volaFeed = (await ethers.getContract("ImpliedVolatilityOracle")).address;
        const vault = (await ethers.getContract("DefiBetsVault")).address;

        await manager.addUnderlyingToken("BTC", priceFeed, defiBets, vault);
        await manager.updateIVFeed(hash, volaFeed, periodVola);

        console.log("🎛️  Setup the defi-bets contract...");
        const owner = (await ethers.getSigners())[0];

        const timestamp = (await ethers.provider.getBlock("latest")).timestamp;

        const tx = await manager.connect(owner).initializeBets(hash, timestamp, minDuration, maxDuration, slot, 2);
        await tx.wait();

        await manager.connect(owner).setFeesPpm(fee);

        console.log("🎟️  finished. you can start betting.");
    } else {
        console.log("🛑  You don't have setup the parameters in the config for this chain!");
        console.log("You can set the paramaters in [helper-hardhat-config.ts]");
    }
}
