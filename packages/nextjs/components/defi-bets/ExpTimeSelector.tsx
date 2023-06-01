import React from "react";

type ExpTimeSelectorProps = {
  expTimes: number[];
  onChange: (value: number) => void;
  activeValue: number | undefined;
};

export const ExpTimeSelector = ({ expTimes, onChange, activeValue }: ExpTimeSelectorProps) => {
  return (
    <select
      className="select select-primary w-full max-w-xs"
      onChange={e => onChange(parseInt(e.target.value))}
      value={activeValue}
    >
      {expTimes?.map(time => {
        const date = new Date(time * 1000);
        const formatDate = date.toLocaleDateString();

        return (
          <option key={time} value={time}>
            {formatDate}
          </option>
        );
      })}
    </select>
  );
};
