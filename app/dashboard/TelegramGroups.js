"use client";

import { useState } from "react";

export default function TelegramGroups({ expiresLabel, groups }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-panel border border-line rounded-sm mb-6 overflow-hidden">
      {/* <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-4 py-4 hover:bg-line/30 transition"
      >
        <span className="flex items-center gap-2 font-bold text-base">
          <span className="text-[#229ED9] text-lg">✈</span>
          جروبات التليجرام الخاصة بالمشتركين
        </span>
        <span className="flex items-center gap-2 text-sm text-ink/70">
          {!open && <span>اضغط للعرض</span>}
          <span
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-line/50 text-lg transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </span>
      </button> */}

      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm text-ink/70 mb-3">
            اشتراكك فعّال لحد <b>{expiresLabel}</b>.
          </p>
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.label}
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-[#229ED9] text-white text-sm font-bold px-4 py-2.5 rounded-sm hover:brightness-95 transition"
              >
                {g.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}