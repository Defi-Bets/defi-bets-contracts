import { useEffect, useState } from "react";
import { useChainId } from "wagmi";
import { contracts } from "~~/utils/defi-bets";
import { Contract, ContractCodeStatus } from "~~/utils/scaffold-eth/contract";

export type ContractAbis = Record<string, readonly ContractABI[]>;
export type ContractAddresses = Record<string, string>;

export type ContractABI =
  | ReadonlyArray<ABIFunction | ABIConstructor | ABIEvent | AbiError>
  | ABIFunction
  | ABIConstructor
  | ABIEvent
  | AbiError;

type ABIFunction = {
  name: string;
  inputs: readonly ABIParameter[];
  outputs: readonly ABIParameter[];
  stateMutability: "pure" | "view" | "nonpayable" | "payable";
  type: "function";
  constant?: boolean;
  payable?: boolean;
};

type AbiError = {
  name: string;
  inputs: readonly ABIParameter[];
  type: "error";
};

type ABIConstructor = {
  inputs: readonly ABIParameter[];
  stateMutability?: "nonpayable";
  type: "constructor";
};

type ABIEvent = {
  name: string;
  inputs: readonly ABIParameter[];
  anonymous: boolean;
  type: "event";
};

type ABIParameter = {
  name: string;
  type: string;
  indexed?: boolean;
};

const initialContractAbis: ContractAbis = {
  DefiBetsManager: [],
  DefiBets: [],
};

const initialContractAddresses: ContractAddresses = {
  DefiBetsManager: "",
};

export const useDefiBetsContracts = () => {
  const [contractAddresses, setContractAddresses] = useState<ContractAddresses>(initialContractAddresses);
  const [contractAbis, setContractAbis] = useState<ContractAbis>(initialContractAbis);
  const [status, setStatus] = useState<ContractCodeStatus>(ContractCodeStatus.LOADING);

  const chainId = useChainId();

  const fetchContractInfos = () => {
    setStatus(ContractCodeStatus.LOADING);

    const _contractAbis: ContractAbis = {};
    const _contractAddresses: ContractAddresses = {};

    let deployed = true;

    const deployedDefiBetsManager = contracts?.[chainId]?.[0]?.contracts?.[
      "DefiBetsManager"
    ] as Contract<"DefiBetsManager">;

    const deployedDefiBets = contracts?.[chainId]?.[0]?.contracts?.["DefiBets"] as Contract<"DefiBets">;

    const deployedMockUSD = contracts?.[chainId]?.[0]?.contracts?.["MockDUSD"] as Contract<"MockDUSD">;

    const deployeBetVault = contracts?.[chainId]?.[0]?.contracts?.["DefiBetsVault"] as Contract<"DefiBetsVault">;

    if (deployedMockUSD) {
      _contractAddresses["MockDUSD"] = deployedMockUSD.address;
    } else {
      deployed = false;
    }

    if (deployeBetVault) {
      _contractAddresses["DefiBetsVault"] = deployeBetVault.address;
    } else {
      deployed = false;
    }

    if (deployedDefiBetsManager) {
      _contractAbis["DefiBetsManager"] = deployedDefiBetsManager.abi;

      _contractAddresses["DefiBetsManager"] = deployedDefiBetsManager.address;
    } else {
      deployed = false;
    }

    if (deployedDefiBets) {
      _contractAbis["DefiBets"] = deployedDefiBets.abi;
      _contractAddresses["DefiBets"] = deployedDefiBets.address;
    } else {
      deployed = false;
    }

    if (deployed) {
      setStatus(ContractCodeStatus.DEPLOYED);
    } else {
      setStatus(ContractCodeStatus.NOT_FOUND);
    }

    setContractAbis({ ...initialContractAbis, ..._contractAbis });
    setContractAddresses({ ...initialContractAddresses, ..._contractAddresses });
  };

  useEffect(() => {
    fetchContractInfos();
  }, [chainId]);

  return { status, contractAbis, contractAddresses };
};
