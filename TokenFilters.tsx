"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store";
import { filterTokens } from "@/features/tokens/tokensSlice";
import type { TokenStatus } from "@/lib/types";

const BUTTONS: Array<"ALL" | TokenStatus> = [
  "ALL",
  "NEW",
  "FINAL_STRETCH",
  "MIGRATED",
];

export default function TokenFilters() {
  const [active, setActive] = useState<"ALL" | TokenStatus>("ALL");
  const dispatch = useAppDispatch();

  function handle(key: "ALL" | TokenStatus) {
    setActive(key);
    dispatch(filterTokens(key));
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 px-4 py-3">
      {BUTTONS.map((b) => (
        <button
          key={b}
          onClick={() => handle(b)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition
            ${
              active === b
                ? "bg-slate-100 text-slate-900 shadow-sm"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
        >
          {b === "FINAL_STRETCH" ? "Final Stretch" : b === "NEW" ? "New" : b}
        </button>
      ))}
    </div>
  );
}
