"use client";

import { useEffect, useRef, useState } from "react";
import type { Token } from "@/lib/types";
import PriceChange from "./PriceChange";
import Modal from "@/components/ui/Modal";

type FlashDirection = "up" | "down" | null;

export default function TokenRow({ token }: { token: Token }) {
  const prevPriceRef = useRef(token.price);
  const [flash, setFlash] = useState<FlashDirection>(null);

  useEffect(() => {
    const prev = prevPriceRef.current;

    let nextFlash: FlashDirection = null;
    if (token.price > prev) nextFlash = "up";
    else if (token.price < prev) nextFlash = "down";

    prevPriceRef.current = token.price;

    if (!nextFlash) return;

    setFlash(nextFlash);
    const timeout = setTimeout(() => setFlash(null), 400);
    return () => clearTimeout(timeout);
  }, [token.price]);

  const flashClass =
    flash === "up"
      ? "bg-emerald-500/10"
      : flash === "down"
      ? "bg-rose-500/10"
      : "";

  const triggerRow = (
    <tr
      className={`bg-[#020617] hover:bg-slate-900/80 transition-colors cursor-pointer ${flashClass}`}
    >
      {/* Pair info */}
      <td className="sticky left-0 z-10 bg-inherit px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-slate-800/80" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{token.name}</span>
            <span className="text-[11px] uppercase text-slate-500">
              {token.symbol}
            </span>
          </div>
        </div>
      </td>

      {/* Market cap (using price as proxy) */}
      <td className="px-4 py-3 text-right font-mono text-xs text-slate-100">
        ${token.price.toFixed(3)}
        <div className="mt-1 text-[11px]">
          <PriceChange value={token.priceChange24h} />
        </div>
      </td>

      {/* Liquidity */}
      <td className="px-4 py-3 text-right font-mono text-xs text-slate-100">
        {token.liquidity.toLocaleString()}
      </td>

      {/* Volume */}
      <td className="px-4 py-3 text-right font-mono text-xs text-slate-100">
        {token.volume24h.toLocaleString()}
      </td>

      {/* Action */}
      <td className="px-4 py-3 text-right">
        <button className="rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400">
          Buy
        </button>
      </td>
    </tr>
  );

  return (
    <Modal trigger={triggerRow}>
      <h2 className="mb-2 text-lg font-semibold">{token.name}</h2>
      <p className="mb-1 text-sm text-slate-400">Symbol: {token.symbol}</p>
      <p className="mb-1 text-sm">
        Price:{" "}
        <span className="font-mono">${token.price.toFixed(4)}</span>
      </p>
      <p className="mb-1 text-sm">
        24h Change:{" "}
        <span className="font-mono">
          {token.priceChange24h.toFixed(2)}%
        </span>
      </p>
      <p className="mb-1 text-sm">
        Volume 24h:{" "}
        <span className="font-mono">
          {token.volume24h.toLocaleString()}
        </span>
      </p>
      <p className="mb-1 text-sm">
        Liquidity:{" "}
        <span className="font-mono">
          {token.liquidity.toLocaleString()}
        </span>
      </p>
    </Modal>
  );
}
