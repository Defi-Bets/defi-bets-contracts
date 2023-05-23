import { useState } from "react";
import { useRouter } from "next/router";
import DefiBetsStat from "~~/components/defi-bets/DefiBetsStat";
import { useDefiBetsContract } from "~~/hooks/defi-bets";

export default function UnderlyingDetail() {
  const [activeExpTimeIndex, setActiveExpTimeIndex] = useState<string>("");

  const router = useRouter();

  const { hash } = router.query;

  const { expTimes } = useDefiBetsContract(hash);

  return (
    <div className="mx-4 my-8 flex flex-start space-x-4 xl:flex-row flex-col xl:justify-between">
      <DefiBetsStat />
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text ">Expiration Date</span>
        </label>
        <select className="select select-primary w-full max-w-xs" onChange={e => setActiveExpTimeIndex(e.target.value)}>
          {expTimes?.map(time => {
            const date = new Date(time * 1000);
            const formattedDate = date.toLocaleDateString();

            const isAactive = formattedDate === activeExpTimeIndex ? true : false;

            return (
              <option disabled={isAactive} selected={isAactive} key={time}>
                {formattedDate}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
