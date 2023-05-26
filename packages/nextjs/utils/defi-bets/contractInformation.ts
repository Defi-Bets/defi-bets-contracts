import { GenericContractsDeclaration } from "../scaffold-eth/contract";
import contractsData from "~~/generated/deployedContracts";

export const contracts = contractsData as GenericContractsDeclaration | null;

export const getContractAbi = (contractName: string) => {
  const contractData = contracts as GenericContractsDeclaration;
  return contractData?.[31337]?.[0].contracts?.[contractName]?.abi;
};

export const getContractAddress = (contractName: string, chainId: number) => {
  const contractData = contracts as GenericContractsDeclaration;
  return contractData?.[chainId]?.[0]?.contracts?.[contractName]?.address;
};
