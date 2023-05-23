import { useState } from "react";

export function useDefiBetsContract(hash?: string) {
  const [expTimes, setExpTimes] = useState<number[]>([]);

  return { expTimes };
}
