"use client";

import { ReactNode, useState } from "react";

export default function Modal({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FIX: Use span with display: contents, NOT <tbody> */}
      <span
        onClick={() => setOpen(true)}
        style={{ display: "contents" }}
      >
        {trigger}
      </span>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-2xl bg-[#020617] p-6 shadow-xl shadow-black/60">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-200">
                Token details
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
