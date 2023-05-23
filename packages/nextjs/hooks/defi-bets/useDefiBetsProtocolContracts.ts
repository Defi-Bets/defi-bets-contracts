import { useChainId, useContract, useSigner } from "wagmi";
import contracts from "~~/generated/deployedContracts";
import { Contract, GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

export type UnderlyingData = { address: string; name: string; vaultAddress: string; hash?: string };

export default function useDefiBetsProtocolContracts() {
  const chainId = useChainId();
  const { data: signer } = useSigner();

  const contractData = contracts as GenericContractsDeclaration;

  const defiBetsManagerData = contractData?.[chainId]?.[0]?.contracts?.[
    "DefiBetsManager"
  ] as Contract<"DefiBetsManager">;

  const defiBetsManagerContract = useContract({
    address: defiBetsManagerData.address,
    abi: defiBetsManagerData.abi,
    signerOrProvider: signer,
  });

  const fetchUnderlyingsWithContracts = async () => {
    const events = await defiBetsManagerContract?.queryFilter("UnderlyingAdded");

    const underlyingContracts: UnderlyingData[] = [];

    events?.forEach(async event => {
      const information: UnderlyingData = {
        name: event.args?.underlying,
        address: event.args?.defiBets,
        vaultAddress: event.args?.vault,
        hash: event.args?.underlyingHash,
      };

      underlyingContracts.push(information);
    });

    return underlyingContracts;
  };

  return { defiBetsManagerContract, fetchUnderlyingsWithContracts };
}
