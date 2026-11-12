"use client";
import { useState } from "react";

export default function TelegramGroups({ expiresLabel, groups }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="glass mb-5 overflow-hidden rounded-2xl">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right transition hover:bg-white/[0.03]"
      >
        <span className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#229ED9]/15 text-[#4cc2f5] ring-1 ring-[#229ED9]/40">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.7 19.5c-.2 1-.9 1.3-1.7.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.7-7.9c.4-.3-.1-.5-.6-.2L6.6 13.3 2 11.9c-1-.3-1-1 .2-1.5L20.2 3.5c.8-.3 1.6.2 1.7.8z" /></svg>
          </span>
          <span>
            <span className="block font-display text-lg font-bold">جروبات التليجرام الخاصة بالمشتركين</span>
            <span className="block text-sm text-muted">اضغط للعرض</span>
          </span>
        </span>
        <svg
          width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          className={`shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-white/10 px-5 pb-5 pt-4">
          <p className="mb-4 text-sm text-muted">
            اشتراكك فعّال لحد <b className="text-gold">{expiresLabel}</b>.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {groups.map((g) => (
              <a
                key={g.label}
                href={g.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-gradient-to-l from-[#229ED9] to-[#1b7fb3] px-5 py-3.5 font-bold text-white shadow-lg shadow-[#229ED9]/20 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                <span>{g.label}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 transition group-hover:-translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
