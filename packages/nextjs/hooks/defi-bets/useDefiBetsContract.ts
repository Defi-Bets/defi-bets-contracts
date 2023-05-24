import { useEffect, useState } from "react";
import { useManagerContract } from "./useManagerContract";
import { Abi } from "abitype";
import { useChainId, useContract, useSigner } from "wagmi";
import { getContractAbi } from "~~/utils/defi-bets";

export function useDefiBetsContract(hash?: string) {
  const [expTimes, setExpTimes] = useState<number[]>();
  const [address, setAddress] = useState<string>("");
  const [contractAbi, setContractAbi] = useState<Abi>();

  const { managerContract } = useManagerContract();

  const chainId = useChainId();
  const { data: signer } = useSigner();

  const defiBetsContract = useContract({ address: address, abi: contractAbi, signerOrProvider: signer });

  const fetchBettingsFromExpTime = async (expTime: number) => {
    const bettingEvents = await defiBetsContract?.queryFilter("BetPlaced");

    bettingEvents?.filter(event => event?.args?.expDate === expTime);

    console.log(bettingEvents);
  };

  useEffect(() => {
    const getContractData = async () => {
      const _address = await managerContract?.defiBetsContracts(hash);
      const _abi = getContractAbi("DefiBets", chainId);

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
    if (hash) {
      getContractData();
      fetchEvents();
    }
    console.log("run");
  }, [hash, chainId, address, contractAbi]);

  return { expTimes, fetchBettingsFromExpTime };
}
