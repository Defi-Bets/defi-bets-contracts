import { useEffect, useState } from "react";
import { useManagerContract } from "./useManagerContract";
import { getContractAbi } from "~~/utils/defi-bets";
import { useChainId, useContract, useSigner } from "wagmi";
import { Abi } from "abitype";

export function useDefiBetsContract(hash?: string) {
  const [expTimes, setExpTimes] = useState<number[]>();
  const [address, setAddress] = useState<string>("");
  const [contractAbi, setContractAbi] = useState<Abi>();

  const { managerContract } = useManagerContract();

  const chainId = useChainId();
  const { data: signer } = useSigner();

  const defiBetsContract = useContract({ address: address, abi: contractAbi, signerOrProvider: signer });

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
          expTimes?.push(event.args.expTime);
        }
      });

      setExpTimes(_expTimes);
    }
    if (hash) {
      getContractData();
      fetchEvents;
    }
  });

  return { expTimes };
}
