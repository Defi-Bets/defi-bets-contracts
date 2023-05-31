import { useEffect, useState } from "react";
import { useManagerContract } from "./useManagerContract";
import { Abi } from "abitype";
import { ethers } from "ethers";
import { useChainId, useContract, useSigner } from "wagmi";
import { getContractAbi } from "~~/utils/defi-bets";

export type BetData = { betSize: number; expDate: number; minPrice: number; maxPrice: number; profit: number };

export function useDefiBetsContract(underlying?: string) {
  const [expTimes, setExpTimes] = useState<number[]>();
  const [address, setAddress] = useState<string>("");
  const [contractAbi, setContractAbi] = useState<Abi>();
  const [betEvents, setBetEvents] = useState<BetData[]>();

  const { managerContract } = useManagerContract();

  const chainId = useChainId();
  const { data: signer } = useSigner();

  const defiBetsContract = useContract({ address: address, abi: contractAbi, signerOrProvider: signer });

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

    setBetEvents(_bets);
  };

  useEffect(() => {
    const getContractData = async () => {
      const _hash = await managerContract?.getUnderlyingByte(underlying ? underlying : "");

      const _address = await managerContract?.defiBetsContracts(_hash ? _hash : "0x");
      const _abi = getContractAbi("DefiBets");

      if (_address) {
        setAddress(_address);
      }
      if (_abi) {
        setContractAbi(_abi);
      }
    };

    async function fetchEvents() {
      const expTimesEvents = await defiBetsContract?.queryFilter("EpxirationTimeCreated");

      const _expTimes: number[] = [];
      expTimesEvents?.forEach(event => {
        if (event.args) {
          _expTimes?.push(event.args.expTime);
        }
      });

      setExpTimes(_expTimes);
    }
    if (underlying) {
      getContractData();
      fetchEvents();
    }
    console.log("run");
  }, [underlying, chainId, address, contractAbi]);

  return { expTimes, fetchBettingsFromExpTime, betEvents };
}
