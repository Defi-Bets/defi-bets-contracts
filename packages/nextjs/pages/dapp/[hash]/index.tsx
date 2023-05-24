import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefiBetsStat from "~~/components/defi-bets/DefiBetsStat";
import { useDefiBetsContract } from "~~/hooks/defi-bets";
import { BettingModal } from "~~/components/defi-bets/BettingModal";

export default function UnderlyingDetail() {
  const [activeExpTime, setActiveExpTime] = useState<number>(0);

  const router = useRouter();

  const { hash } = router.query;
  const hashString = Array.isArray(hash) ? hash[0] : hash;
  const { expTimes, fetchBettingsFromExpTime } = useDefiBetsContract(hashString);

  useEffect(() => {
    console.log(activeExpTime);

    const getData = async () => {
      await fetchBettingsFromExpTime(activeExpTime);
    };

    getData();
  }, [activeExpTime]);

  return (
    <div className="mx-4 my-8 flex flex-start space-x-4 flex-col items-start space-y-8">
      <div>
        <DefiBetsStat />
      </div>
      <div className="bg-base-100 rounded-xl shadow-sm shadow-secondary py-8 px-4 w-1/2">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl text-primary font-bold">Betting Overview</h1>
            <BettingModal expTime={activeExpTime} hash={hashString ? hashString : ""} />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text ">Expiration Date</span>
            </label>
            <select
              className="select select-primary w-full max-w-xs"
              onChange={e => setActiveExpTime(parseInt(e.target.value))}
            >
              {expTimes?.map(time => {
                const date = new Date(time * 1000);
                const formattedDate = date.toLocaleDateString();

                const isAactive = time === activeExpTime ? true : false;

                return (
                  <option disabled={isAactive} selected={isAactive} key={time} value={time}>
                    {formattedDate}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
