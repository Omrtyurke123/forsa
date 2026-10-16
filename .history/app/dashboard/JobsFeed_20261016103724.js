"use client";

import { useEffect, useState } from "react";

const TABS = [
  { key: "low_offers", label: "أقل عروض", source: null, accent: "border-ink" },
  { key: "instant", label: "مستقل", source: "مستقل", accent: "border-mostaql" },
  { key: "instant", label: "خمسات", source: "خمسات", accent: "border-khamsat" },
  { key: "instant", label: "نفذلي", source: "نفذلي", accent: "border-nafezly" },
  { key: "instant", label: "كفيل", source: "كفيل", accent: "border-kafiil" },
  { key: "low_offers", label: "متعاون", source: "متعاون", accent: "border-ink" },
];

export default function JobsFeed() {
  const [activeTab, setActiveTab] = useState(0);
  const [state, setState] = useState({ loading: true, access: true, jobs: [] });

  useEffect(() => {
    const tab = TABS[activeTab];
    const params = new URLSearchParams({ feed_type: tab.key });
    if (tab.source) params.set("source", tab.source);

    setState((s) => ({ ...s, loading: true }));

    fetch(`/api/jobs?${params}`)
      .then((r) => r.json())
      .then((data) => setState({ loading: false, ...data }))
      .catch(() => setState({ loading: false, access: true, jobs: [] }));
  }, [activeTab]);

  return (
    <div>
      <div className="flex gap-1 border-b border-line mb-5 overflow-x-auto">
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm font-bold whitespace-nowrap border-b-2 -mb-px transition ${
              activeTab === i
                ? `${tab.accent} text-ink`
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {state.loading ? (
        <p className="text-muted text-sm">جاري التحميل...</p>
      ) : state.jobs.length === 0 ? (
        <p className="text-muted text-sm">لسه مفيش مشاريع في القسم ده.</p>
      ) : (
        <div className="space-y-3">
          {state.jobs.map((job) =>
            job.locked ? (
              <LockedCard key={job.id} job={job} />
            ) : job.feed_type === "instant" ? (
              <InstantCard key={job.id} job={job} />
            ) : (
              <LowOffersCard key={job.id} job={job} />
            )
          )}

          {!state.access && (
            <div className="text-center py-6">
              <a
                href="/subscribe"
                className="inline-block bg-gold text-ink font-bold px-6 py-3 rounded-sm"
              >
                اشترك عشان تشوف كل المشاريع
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LowOffersCard({ job }) {
  return (
    <a
      href={job.url}
      target="_blank"
      rel="noreferrer"
      className="block bg-panel border border-line rounded-sm p-4 hover:border-ink transition"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold leading-snug">{job.title}</h3>
        <span className="text-xs text-muted whitespace-nowrap shrink-0">{job.source}</span>
      </div>
      {job.description && (
        <p className="text-sm text-muted mt-1 line-clamp-2">{job.description}</p>
      )}
      <div className="flex items-center gap-4 mt-3 text-sm">
        {job.budget && <span className="font-bold">{job.budget}</span>}
        {job.offers_count != null && (
          <span className="text-muted">{job.offers_count} عروض</span>
        )}
        {job.posted_label && <span className="text-muted">{job.posted_label}</span>}
      </div>
    </a>
  );
}

function InstantCard({ job }) {
  // الرابط متضاف آخر سطر في النص — بنستخدمه للفتح بس، ومبنعرضوش كنص
  const match = job.raw_text?.match(/https?:\/\/\S+$/);
  const url = match?.[0];
  const text = job.raw_text?.replace(/\n*https?:\/\/\S+\s*$/, "").trim();

  const content = (
    <div className="whitespace-pre-line text-sm leading-relaxed">{text}</div>
  );

  if (!url) {
    return (
      <div className="bg-panel border border-line rounded-sm p-4">
        {content}
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="block bg-panel border border-line rounded-sm p-4 hover:border-ink transition"
    >
      {content}
    </a>
  );
}

function LockedCard({ job }) {
  return (
    <div className="relative bg-panel border border-line rounded-sm p-4 overflow-hidden">
      <h3 className="font-bold leading-snug blur-[3px] select-none">{job.title}</h3>
      <p className="text-sm text-muted mt-1 blur-[3px] select-none">
        تفاصيل المشروع متاحة للمشتركين بس.
      </p>
    </div>
  );
}