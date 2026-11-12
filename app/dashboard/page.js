import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import Link from "next/link";
import JobsFeed from "./JobsFeed";
import SignOutButton from "./SignOutButton";
import TelegramGroups from "./TelegramGroups";
import Logo from "../Logo";

// ضع روابط جروبات التليجرام الحقيقية هنا
const TELEGRAM_GROUPS = [
  { label: "جروب أقل عروض", url: "https://t.me/+REPLACE_ME" },
  { label: "جروب مستقل", url: "https://t.me/+REPLACE_ME" },
  { label: "جروب خمسات", url: "https://t.me/+REPLACE_ME" },
  { label: "جروب نفذلي", url: "https://t.me/+REPLACE_ME" },
];

export default async function Dashboard() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (!profile) redirect("/login");

  const now = new Date();
  const trialEnds = new Date(profile.trial_started_at);
  trialEnds.setDate(trialEnds.getDate() + (profile.trial_days ?? 3));

  const subActive =
    profile.subscription_active &&
    profile.subscription_expires_at &&
    new Date(profile.subscription_expires_at) > now;
  const hadSubscriptionBefore = Boolean(profile.subscription_expires_at);

  const daysLeft = (d) => Math.max(0, Math.ceil((d - now) / 86400000));
  const daysLeftLabel = subActive
    ? `باقي ${daysLeft(new Date(profile.subscription_expires_at))} يوم على الاشتراك`
    : now < trialEnds
    ? `باقي ${daysLeft(trialEnds)} يوم تجربة`
    : hadSubscriptionBefore
    ? "انتهى الاشتراك"
    : "انتهت التجربة";

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/5 bg-paper/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3.5">
          <Logo href="/dashboard" />
          <div className="flex items-center gap-2 sm:gap-3">
            <span
              className={`hidden rounded-full border px-3 py-1 text-xs font-bold sm:inline-block ${
                subActive ? "border-teal/40 bg-teal/10 text-teal" : "border-gold/40 bg-gold/10 text-gold"
              }`}
            >
              {daysLeftLabel}
            </span>
            {!subActive && (
              <Link href="/subscribe" className="btn-gold !py-1.5 !px-4 text-sm">اشترك الآن</Link>
            )}
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            أهلاً <span className="gold-text">{profile.full_name}</span>
          </h1>
          <p className="mt-1 text-sm text-muted sm:hidden">{daysLeftLabel}</p>
        </div>

        {/* {subActive && (
          <TelegramGroups
            expiresLabel={new Date(profile.subscription_expires_at).toLocaleDateString("ar-EG")}
            groups={TELEGRAM_GROUPS}
          />
        )} */}
         
        {!subActive && hadSubscriptionBefore && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-danger/30 bg-danger/10 px-5 py-4 text-sm">
            <span className="text-ink/90">انتهى اشتراكك الشهري. جدّد اشتراكك عشان ترجع تشوف كل المشاريع وتدخل جروبات التليجرام.</span>
            <Link href="/subscribe" className="btn-gold !py-1.5 !px-4 text-sm">جدّد الآن</Link>
          </div>
        )}
        {!subActive && !hadSubscriptionBefore && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm">
            <span className="text-ink/90">
              {now < trialEnds
                ? `أنت في فترة التجربة المجانية — ${daysLeftLabel}.`
                : "انتهت تجربتك المجانية. اشترك عشان تكمّل."}
            </span>
            <Link href="/subscribe" className="btn-gold !py-1.5 !px-4 text-sm">اشترك الآن</Link>
          </div>
        )}

        <JobsFeed />
      </div>
    </main>
  );
}
