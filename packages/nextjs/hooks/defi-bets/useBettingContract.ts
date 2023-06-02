import { useEffect, useState } from "react";
import { useDefiBetsContracts } from "./useDefiBetsContracts";
import { BigNumber, ethers } from "ethers";
import { useContract, useContractEvent, useContractRead, useSigner } from "wagmi";

export type BetData = { betSize: number; expDate: number; minPrice: number; maxPrice: number; profit: number };

export const useBettingContract = (underlyingAddress: string, expTime?: number, tokenId?: number) => {
  const [bets, setBets] = useState<BetData[]>();
  const [expTimes, setExpTimes] = useState<number[]>([]);

  const { contractAbis } = useDefiBetsContracts();
  const abi = contractAbis["DefiBets"];

  const contractConfig = {
    abi: abi,
    address: underlyingAddress,
  };

  const { data: signer } = useSigner();

  const defiBetsContract = useContract({ ...contractConfig, signerOrProvider: signer });

  const { data: expTimeInfo } = useContractRead({
    ...contractConfig,
    functionName: "expTimeInfos",
    args: [expTime],
    enabled: Boolean(expTime),
    watch: true,
  });

  const totalBets = (expTimeInfo as { totalBets: BigNumber })?.totalBets;
  const maxLossLimit = (expTimeInfo as { maxLossLimit: BigNumber })?.maxLossLimit;
  const maxUserWinning = (expTimeInfo as { maxUserWinning: BigNumber })?.maxUserWinning;

  const { data: tokenData } = useContractRead({
    ...contractConfig,
    functionName: "getBetTokenData",
    args: [tokenId],
    enabled: Boolean(tokenId),
  });

  //Events
  useContractEvent({
    ...contractConfig,
    eventName: "EpxirationTimeCreated",
    listener: logs => {
      console.log(logs);
      setExpTimes(x => [...x, (logs as BigNumber).toNumber()]);
    },
  });

  useContractEvent({
    ...contractConfig,
    eventName: "BetPlaced",
    listener(log) {
      console.log(log);
    },
  });

  useEffect(() => {
    const fetchExpTimesFromUnderlying = async () => {
      const expTimesEvents = await defiBetsContract?.queryFilter("EpxirationTimeCreated");

      const _expTimes: number[] = [];
      expTimesEvents?.forEach(event => {
        if (event.args) {
          _expTimes?.push(event.args.expTime);
        }
      });

      setExpTimes(_expTimes);
    };

    const fetchBettingsFromExpTime = async () => {
      const bettingEvents = await defiBetsContract?.queryFilter("BetPlaced");

      // bettingEvents?.filter(event => event?.args?.expDate.toNumber() === expTime);
      const _bets: BetData[] = [];
      bettingEvents?.map(event => {
        if (event.args) {
          _bets.push({
            betSize: parseFloat(ethers.utils.formatUnits(event.args.betSize)),
            expDate: parseInt(event.args.expDate),
            minPrice: parseFloat(ethers.utils.formatUnits(event.args.minPrice)),
            maxPrice: parseFloat(ethers.utils.formatUnits(event.args.maxPrice)),
            profit: parseFloat(ethers.utils.formatUnits(event.args.profit)),
          });
        }
      });

      setBets(_bets);
    };

    fetchBettingsFromExpTime();
    fetchExpTimesFromUnderlying();
  }, [defiBetsContract, expTimeInfo]);

  return { totalBets, tokenData, expTimes, bets, maxLossLimit, maxUserWinning };
};
