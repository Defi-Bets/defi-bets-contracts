import { useEffect, useState } from "react";
import useDefiBetsProtocolContracts, { UnderlyingData } from "./useDefiBetsProtocolContracts";

export function useManagerContract() {
  const { fetchUnderlyingsWithContracts, defiBetsManagerContract } = useDefiBetsProtocolContracts();

  const [underlyings, setUnderlyings] = useState<UnderlyingData[]>();

  useEffect(() => {
    async function fetchUnderlyingInformation() {
      const _underlyings = await fetchUnderlyingsWithContracts();

      setUnderlyings(_underlyings);
    }

    fetchUnderlyingInformation();
  }, [defiBetsManagerContract, fetchUnderlyingsWithContracts]);

  return { underlyings };
}
