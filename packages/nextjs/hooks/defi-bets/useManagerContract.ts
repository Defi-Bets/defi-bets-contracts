import { useEffect, useState } from "react";
import { useChainId, useContract, useSigner } from "wagmi";
import abi from "~~/contract-abis/DefiBetsManager";
import { getContractAddress } from "~~/utils/defi-bets";

export type UnderlyingData = { address: string; name: string; vaultAddress: string; hash?: string };

export function useManagerContract() {
  const [address, setAddress] = useState<string>("");
  const [underlyings, setUnderlyings] = useState<UnderlyingData[]>();

  const chainId = useChainId();
  const { data: signer } = useSigner();

  const managerContract = useContract({
    address: address,
    abi: abi,
    signerOrProvider: signer,
  });

  useEffect(() => {
    const getContractData = () => {
      const _address = getContractAddress("DefiBetsManager", chainId);

      if (_address) {
        setAddress(_address);
      }
    };

    async function fetchEvents() {
      if (address) {
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
  }, [chainId, signer, managerContract]);

  return { managerContract, underlyings, address, abi };
}
