import React from "react";

export default function PriceChange({ value }: { value: number }) {
  const isPos = value >= 0;
  const color = isPos ? "text-emerald-400" : "text-rose-400";

  return (
    <span className={`${color} font-semibold`}>
      {isPos ? "+" : ""}
      {value.toFixed(2)}%
    </span>
  );
}
