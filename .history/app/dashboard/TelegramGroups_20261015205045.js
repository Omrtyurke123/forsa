"use client";

import { useState } from "react";

export default function TelegramGroups({ expiresLabel, groups }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-panel border border-line rounded-sm px-4 py-4 mb-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-sm"
      >
        <span>
          اشتراكك فعّال لحد <b>{expiresLabel}</b>.
        </span>
        <span
          className={`inline-block transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="flex flex-wrap gap-2 mt-3">
          {groups.map((g) => (
            <a
              key={g.label}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-[#229ED9] text-white text-sm font-bold px-3 py-2 rounded-sm hover:brightness-95 transition"
            >
              {g.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}