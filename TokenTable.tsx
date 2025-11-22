"use client";

import { useMemo } from "react";
import { useTokensFeed } from "@/features/tokens/useTokensFeed";
import TokenRow from "./TokenRow";
import TokenFilters from "./TokenFilters";
import Skeleton from "@/components/ui/Skeleton";
import { sortTokens } from "@/features/tokens/tokensSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import type { Token } from "@/lib/types";

export default function TokenTable() {
  const { isLoading, isError } = useTokensFeed();

  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.tokens.items);
  const sortBy = useAppSelector((s) => s.tokens.sortBy);
  const sortDir = useAppSelector((s) => s.tokens.sortDir);
  const filter = useAppSelector((s) => s.tokens.filter);

  const tokens: Token[] = useMemo(() => {
    if (filter === "ALL") return items;
    return items.filter((t) => t.status === filter);
  }, [items, filter]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#020617] shadow-xl shadow-black/40">
      <TokenFilters />

      <div className="overflow-x-auto">
        <table className="min-w-full border-t border-slate-800 text-sm md:text-[13px] text-slate-100">
          <thead className="bg-[#020819] text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="sticky left-0 z-10 bg-[#020819] px-4 py-3 text-left">
                Pair Info
              </th>

              <SortableTh
                label="Market Cap"
                active={sortBy === "price"}
                dir={sortDir}
                onClick={() => dispatch(sortTokens("price"))}
              />
              <SortableTh
                label="Liquidity"
                active={sortBy === "volume"}
                dir={sortDir}
                onClick={() => dispatch(sortTokens("volume"))}
              />
              <SortableTh
                label="Volume"
                active={sortBy === "change"}
                dir={sortDir}
                onClick={() => dispatch(sortTokens("change"))}
              />
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {/* Loading skeleton state */}
            {isLoading &&
              Array.from({ length: 10 }).map((_, idx) => (
                <tr key={idx} className="bg-[#020617]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-3 w-16 ml-auto" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-3 w-16 ml-auto" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-3 w-16 ml-auto" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Skeleton className="h-8 w-16 rounded-full" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              !isError &&
              tokens.map((token) => <TokenRow key={token.id} token={token} />)}

            {!isLoading && tokens.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No tokens for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortableTh({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
}) {
  return (
    <th
      className="px-4 py-3 text-right align-middle"
      scope="col"
      onClick={onClick}
    >
      <button
        className={`inline-flex items-center gap-1 text-ellipsis whitespace-nowrap text-xs font-medium transition ${
          active ? "text-slate-100" : "text-slate-400 hover:text-slate-200"
        }`}
      >
        <span>{label}</span>
        {active && <span>{dir === "asc" ? "▲" : "▼"}</span>}
      </button>
    </th>
  );
}
