import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BetTable } from "~~/components/defi-bets/BetTable";
import { BettingModal } from "~~/components/defi-bets/BettingModal";
import DefiBetsStat from "~~/components/defi-bets/DefiBetsStat";
import { useDefiBetsContract } from "~~/hooks/defi-bets";

export default function UnderlyingDetail() {
  const [activeExpTime, setActiveExpTime] = useState<number>(0);

  const router = useRouter();

  const { name } = router.query;
  const nameString = name ? name.toString() : "";

  const { expTimes, fetchBettingsFromExpTime, betEvents } = useDefiBetsContract(nameString);

  useEffect(() => {
    const getData = async () => {
      await fetchBettingsFromExpTime();
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
            <BettingModal expTime={activeExpTime} underlying={nameString} />
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
                  <option disabled={isAactive} key={time} value={time} selected={isAactive}>
                    {formattedDate}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      {betEvents && <BetTable bets={betEvents} />}
    </div>
  );
}
