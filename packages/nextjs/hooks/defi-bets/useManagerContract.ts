import { useEffect, useState } from "react";
import { Abi } from "abitype";
import { useChainId, useContract, useSigner } from "wagmi";
import { getContractAbi, getContractAddress } from "~~/utils/defi-bets";

export type UnderlyingData = { address: string; name: string; vaultAddress: string; hash?: string };

export function useManagerContract() {
  const [address, setAddress] = useState<string>("");
  const [contractAbi, setContractAbi] = useState<Abi>();
  const [underlyings, setUnderlyings] = useState<UnderlyingData[]>();

  const chainId = useChainId();
  const { data: signer } = useSigner();

  const managerContract = useContract({
    address: address,
    abi: contractAbi,
    signerOrProvider: signer,
  });

  useEffect(() => {
    const getContractData = () => {
      const _address = getContractAddress("DefiBetsManager", chainId);
      const _abi = getContractAbi("DefiBetsManager", chainId);
      console.log(_address);
      console.log(chainId);
      if (_address) {
        setAddress(_address);
      }

      if (_abi) {
        setContractAbi(_abi);
      }
    };

    async function fetchEvents() {
      if (address && contractAbi) {
        const underlyingEvents = await managerContract?.queryFilter("UnderlyingAdded");
        const _underlyings: UnderlyingData[] = [];
        underlyingEvents?.forEach(event => {
          const args = event.args;
          if (args) {
            _underlyings.push({
              address: args.defiBets,
              name: args.underlying,
              vaultAddress: args.vault,
              hash: args.underlyingHash,
            });
          }
        });

        setUnderlyings(_underlyings);
      }
    }

    getContractData();
    fetchEvents();
  }, [chainId, signer, contractAbi]);

  return { managerContract, underlyings };
}
