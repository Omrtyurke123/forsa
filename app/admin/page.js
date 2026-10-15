import { supabaseServer, supabaseAdmin } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import PaymentRow from "./PaymentRow";

const SOURCES = [
  { feed_type: "low_offers", source: "مستقل" },
  { feed_type: "low_offers", source: "نفذلي" },
  { feed_type: "low_offers", source: "كفيل" },
  { feed_type: "low_offers", source: "متعاون" },
  { feed_type: "instant", source: "مستقل" },
  { feed_type: "instant", source: "خمسات" },
  { feed_type: "instant", source: "نفذلي" },
  { feed_type: "instant", source: "كفيل" },
];

function timeAgoLabel(iso) {
  if (!iso) return "لا يوجد بيانات بعد";

  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);

  if (mins < 1) return "الآن";
  if (mins < 60) return `منذ ${mins} دقيقة`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `منذ ${hours} ساعة`;

  const days = Math.floor(hours / 24);
  return `منذ ${days} يوم`;
}

export default async function AdminPage() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/dashboard");

  const admin = supabaseAdmin();

  // ---- طلبات الدفع (زي ما هو بالظبط، من غير أي تعديل) ----
  const { data: payments } = await admin
    .from("payments")
    .select("*, profiles!user_id(full_name, phone), plans(name, price_egp)")
    .order("created_at", { ascending: false });

  const withUrls = await Promise.all(
    (payments || []).map(async (p) => {
      const { data } = await admin.storage
        .from("payment-proofs")
        .createSignedUrl(p.proof_path, 3600);

      return { ...p, proofUrl: data?.signedUrl };
    })
  );

  const pendingCount = withUrls.filter((p) => p.status === "pending").length;

  // ---- كل الحسابات ----
  const { data: profiles } = await admin
    .from("profiles")
    .select(
      "id, full_name, phone, trial_started_at, trial_days, subscription_active, subscription_expires_at, created_at"
    )
    .order("created_at", { ascending: false });

  const accounts = profiles || [];
  const now = new Date();

  const accountsWithStatus = accounts.map((a) => {
    const expiresAt = a.subscription_expires_at
      ? new Date(a.subscription_expires_at)
      : null;

    const subActive = a.subscription_active && expiresAt && expiresAt > now;

    const trialEnds = new Date(a.trial_started_at || a.created_at);
    trialEnds.setDate(trialEnds.getDate() + (a.trial_days ?? 3));

    const inTrial = !a.subscription_expires_at && trialEnds > now;

    let statusLabel = "تجربة منتهية";
    let statusTone = "text-muted";

    if (subActive) {
      statusLabel = "مشترك فعّال";
      statusTone = "text-teal";
    } else if (inTrial) {
      statusLabel = "في التجربة المجانية";
      statusTone = "text-ink";
    } else if (a.subscription_expires_at) {
      statusLabel = "اشتراك منتهي";
      statusTone = "text-muted";
    }

    return { ...a, subActive, inTrial, statusLabel, statusTone };
  });

  const totalUsers = accountsWithStatus.length;
  const activeSubs = accountsWithStatus.filter((a) => a.subActive).length;
  const inTrialCount = accountsWithStatus.filter((a) => a.inTrial).length;
  const expiredOrNoSub = totalUsers - activeSubs - inTrialCount;

  // ---- حالة مصادر البيانات ----
  const { data: recentJobs } = await admin
    .from("jobs")
    .select("feed_type, source, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  const latestBySource = {};

  (recentJobs || []).forEach((j) => {
    const key = `${j.feed_type}:${j.source}`;
    if (!latestBySource[key]) latestBySource[key] = j.created_at;
  });

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="font-display font-bold text-2xl mb-8">لوحة تحكم الأدمن</h1>

      <section className="mb-10">
        <h2 className="font-bold text-lg mb-3">إحصائيات عامة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <StatCard label="إجمالي المستخدمين" value={totalUsers} />
          <StatCard label="اشتراكات فعّالة" value={activeSubs} />
          <StatCard label="في التجربة المجانية" value={inTrialCount} />
          <StatCard label="بدون اشتراك فعّال" value={expiredOrNoSub} />
          <StatCard
            label="طلبات دفع بانتظار المراجعة"
            value={pendingCount}
            highlight={pendingCount > 0}
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-bold text-lg mb-3">حالة مصادر البيانات</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SOURCES.map((s) => {
            const key = `${s.feed_type}:${s.source}`;
            const last = latestBySource[key];
            const stale =
              !last || Date.now() - new Date(last).getTime() > 1000 * 60 * 60 * 12;

            return (
              <div
                key={key}
                className="bg-panel border border-line rounded-sm p-3 text-sm"
              >
                <p className="font-bold">
                  {s.source}{" "}
                  <span className="text-xs text-muted font-normal">
                    ({s.feed_type === "instant" ? "فوري" : "أقل عروض"})
                  </span>
                </p>
                <p className={stale ? "text-red-500 mt-1" : "text-muted mt-1"}>
                  {timeAgoLabel(last)}
                </p>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted mt-2">
          ملحوظة: التوقيت ده بيعتمد على أحدث سجل وصل لقاعدة البيانات لنفس المصدر،
          مش بالضرورة وقت آخر تشغيل للبوت لو مفيش عروض جديدة فعليًا في الجولة.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-bold text-lg mb-3">كل الحسابات ({totalUsers})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-right text-muted border-b border-line">
                <th className="py-2 pr-2">الاسم</th>
                <th className="py-2 pr-2">الهاتف</th>
                <th className="py-2 pr-2">الحالة</th>
                <th className="py-2 pr-2">تاريخ الانضمام</th>
                <th className="py-2 pr-2">نهاية الاشتراك</th>
              </tr>
            </thead>
            <tbody>
              {accountsWithStatus.map((a) => (
                <tr key={a.id} className="border-b border-line/60">
                  <td className="py-2 pr-2">{a.full_name || "—"}</td>
                  <td className="py-2 pr-2">{a.phone || "—"}</td>
                  <td className={`py-2 pr-2 font-bold ${a.statusTone}`}>
                    {a.statusLabel}
                  </td>
                  <td className="py-2 pr-2 text-muted">
                    {a.created_at
                      ? new Date(a.created_at).toLocaleDateString("ar-EG")
                      : "—"}
                  </td>
                  <td className="py-2 pr-2 text-muted">
                    {a.subscription_expires_at
                      ? new Date(a.subscription_expires_at).toLocaleDateString(
                          "ar-EG"
                        )
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-lg mb-3">طلبات الدفع</h2>
        <div className="space-y-3">
          {withUrls.length === 0 && (
            <p className="text-muted text-sm">مفيش طلبات لسه.</p>
          )}

          {withUrls.map((p) => (
            <PaymentRow key={p.id} payment={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, highlight }) {
  return (
    <div
      className={`bg-panel border rounded-sm p-4 text-center ${
        highlight ? "border-gold" : "border-line"
      }`}
    >
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  );
}