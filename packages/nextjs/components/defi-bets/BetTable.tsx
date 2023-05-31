import React from "react";
import { BetData } from "~~/hooks/defi-bets";

interface BetTableProps {
  bets: BetData[];
}

export const BetTable: React.FC<BetTableProps> = ({ bets }) => {
  return (
    <div className="overflow-x-auto  ">
      <table className="table w-full  ">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Bet Size</th>
            <th>Expiration Date</th>
            <th>Minimum Price</th>
            <th>Maximum Price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {bets?.map((bet, idx) => {
            const date = new Date(bet.expDate * 1000);
            const formattedDate = date.toLocaleDateString();
            return (
              <tr key={idx}>
                <th>{idx}</th>
                <th>{bet.betSize} DUSD</th>
                <th>{formattedDate}</th>
                <th>{bet.minPrice} $</th>
                <th>{bet.maxPrice} $</th>
                <th>{bet.profit} DUSD</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
