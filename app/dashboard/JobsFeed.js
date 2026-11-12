"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
 
const TABS = [
  { label: "أقل عروض", feed_type: "low_offers", source: null },
  { label: "مستقل", feed_type: "instant", source: "مستقل" },
  { label: "خمسات", feed_type: "instant", source: "خمسات" },
  { label: "نفذلي", feed_type: "instant", source: "نفذلي" },
  { label: "كفيل", feed_type: "instant", source: "كفيل" },
  { label: "متعاون", feed_type: "low_offers", source: "متعاون" },
];
 
const SRC_COLOR = {
  "مستقل": "52 168 130",
  "خمسات": "224 168 64",
  "نفذلي": "92 140 230",
  "كفيل": "176 110 230",
  "متعاون": "94 210 184",
};
 
function SourceBadge({ source }) {
  const c = SRC_COLOR[source] || "212 175 105";
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-xs font-bold"
      style={{ background: `rgb(${c} / 0.14)`, color: `rgb(${c})`, border: `1px solid rgb(${c} / 0.35)` }}
    >
      {source}
    </span>
  );
}
 
function LockedCard() {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div className="select-none blur-sm">
        <div className="h-4 w-2/3 rounded bg-veil/20" />
        <div className="mt-3 h-3 w-full rounded bg-veil/10" />
        <div className="mt-2 h-3 w-4/5 rounded bg-veil/10" />
      </div>
      <div className="absolute inset-0 grid place-items-center bg-paper/40 text-sm text-gold">🔒 للمشتركين</div>
    </div>
  );
}
 
function LowOffersCard({ job }) {
  return (
    <a
      href={job.url}
      target="_blank"
      rel="noreferrer"
      className="glass glass-hover group block rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-bold leading-7 transition group-hover:text-gold">{job.title}</h3>
        <SourceBadge source={job.source} />
      </div>
      {job.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted">{job.description}</p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-veil/10 pt-3 text-xs text-muted">
        {job.budget && <span className="font-bold text-gold">{job.budget}</span>}
        {job.offers_count != null && <span>{job.offers_count} عروض</span>}
        {job.posted_label && <span className="mr-auto">{job.posted_label}</span>}
      </div>
    </a>
  );
}
 
function InstantCard({ job }) {
  const match = job.raw_text?.match(/https?:\/\/\S+$/);
  const url = match?.[0];
  const text = job.raw_text?.replace(/\n*https?:\/\/\S+\s*$/, "").trim();
 
  const body = (
    <>
      <div className="mb-2 flex items-center justify-between">
        <SourceBadge source={job.source || "كفيل"} />
        {job.posted_label && <span className="text-xs text-muted">{job.posted_label}</span>}
      </div>
      <p className="whitespace-pre-line text-sm leading-7">{text}</p>
    </>
  );
 
  return url ? (
    <a href={url} target="_blank" rel="noreferrer" className="glass glass-hover block rounded-2xl p-5">
      {body}
    </a>
  ) : (
    <div className="glass rounded-2xl p-5">{body}</div>
  );
}
 
export default function JobsFeed() {
  const [active, setActive] = useState(0);
  const [state, setState] = useState({ loading: true, access: true, jobs: [] });
 
  useEffect(() => {
    const tab = TABS[active];
    let cancelled = false;
    setState((s) => ({ ...s, loading: true }));
    const qs = new URLSearchParams({ feed_type: tab.feed_type });
    if (tab.source) qs.set("source", tab.source);
    fetch(`/api/jobs?${qs}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setState({ loading: false, access: d.access !== false, jobs: d.jobs || [] });
      })
      .catch(() => !cancelled && setState({ loading: false, access: true, jobs: [] }));
    return () => {
      cancelled = true;
    };
  }, [active]);
 
  const tab = TABS[active];
 
  return (
    <div>
      <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm font-bold transition ${
              i === active
                ? "border-transparent bg-gradient-to-br from-[#f3dca3] via-[#d4af69] to-[#b98a3e] text-[rgb(var(--on-gold))] shadow-gold"
                : "border-veil/10 bg-veil/[0.03] text-muted hover:border-gold/40 hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
 
      {state.loading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="glass h-32 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : state.jobs.length === 0 ? (
        <div className="glass rounded-2xl px-6 py-14 text-center text-muted">لسه مفيش مشاريع في القسم ده.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {state.jobs.map((job) =>
            job.locked ? (
              <LockedCard key={job.id} />
            ) : tab.feed_type === "instant" ? (
              <InstantCard key={job.id} job={job} />
            ) : (
              <LowOffersCard key={job.id} job={job} />
            )
          )}
        </div>
      )}
 
      {!state.access && !state.loading && (
        <div className="mt-6 text-center">
          <Link href="/subscribe" className="btn-gold">اشترك عشان تشوف كل المشاريع</Link>
        </div>
      )}
    </div>
  );
}
 