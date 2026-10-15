import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import JobsFeed from "./JobsFeed";
import SignOutButton from "./SignOutButton";
import ThemeProvider, { ThemeToggleButton } from "./ThemeProvider";
import "./aurora-theme.css";

export default async function DashboardPage() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const trialEnds = new Date(profile.trial_started_at);
  trialEnds.setDate(trialEnds.getDate() + (profile.trial_days ?? 3));
  const trialDaysLeft = Math.ceil((trialEnds - new Date()) / 86400000);

  const subActive =
    profile.subscription_active &&
    profile.subscription_expires_at &&
    new Date(profile.subscription_expires_at) > new Date();

  const hadSubscriptionBefore = Boolean(profile.subscription_expires_at);

  let daysLeftLabel = null;
  if (subActive) {
    const expiresAt = new Date(profile.subscription_expires_at);
    const subDaysLeft = Math.ceil((expiresAt - new Date()) / 86400000);
    daysLeftLabel = `باقي ${subDaysLeft} يوم على الاشتراك`;
  } else if (!hadSubscriptionBefore) {
    daysLeftLabel =
      trialDaysLeft > 0 ? `باقي ${trialDaysLeft} يوم تجربة` : "انتهت التجربة";
  } else {
    daysLeftLabel = "انتهى الاشتراك";
  }

  return (
    <ThemeProvider>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="font-display font-bold text-2xl">أهلاً {profile.full_name || ""}</h1>
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            {daysLeftLabel && (
              <span className="text-sm text-ink/70">{daysLeftLabel}</span>
            )}
            {!subActive && (
              <a
                href="/subscribe"
                className="bg-gold text-ink text-sm font-bold px-4 py-2 rounded-sm"
              >
                اشترك الآن
              </a>
            )}
            <SignOutButton />
          </div>
        </header>

        {subActive && (
          <div className="bg-panel border border-line rounded-sm px-4 py-3 mb-6 text-sm">
            اشتراكك فعّال لحد{" "}
            <b>
              {new Date(profile.subscription_expires_at).toLocaleDateString("ar-EG")}
            </b>
            .
          </div>
        )}

        {!subActive && hadSubscriptionBefore && (
          <div className="bg-panel border border-line rounded-sm px-4 py-3 mb-6 text-sm">
            انتهى اشتراكك الشهري.{" "}
            <a href="/subscribe" className="text-teal font-bold">
              جدّد اشتراكك
            </a>{" "}
            عشان تكمل تشوف المشاريع كاملة.
          </div>
        )}

        {!subActive && !hadSubscriptionBefore && (
          <div className="bg-panel border border-line rounded-sm px-4 py-3 mb-6 text-sm">
            {trialDaysLeft > 0 ? (
              <>باقي لك <b>{trialDaysLeft}</b> يوم في التجربة المجانية.</>
            ) : (
              <>انتهت تجربتك المجانية. <a href="/subscribe" className="text-teal font-bold">اشترك</a> عشان تكمل تشوف المشاريع كاملة.</>
            )}
          </div>
        )}

        <JobsFeed />
      </main>
    </ThemeProvider>
  );
}