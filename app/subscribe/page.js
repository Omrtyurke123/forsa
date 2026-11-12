"use client";
import { useState } from "react";
import Link from "next/link";
import AuthShell from "../AuthShell";

// ضع رقم التحويل الحقيقي هنا
const TRANSFER_NUMBER = "01xxxxxxxxx";

export default function SubscribePage() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const res = await fetch("/api/payments", { method: "POST", body: new FormData(e.target) });
    if (res.ok) setStatus("sent");
    else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "حصلت مشكلة، جرّب تاني.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <AuthShell title="تم استلام طلبك">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal/10 text-3xl text-teal ring-1 ring-teal/40">✓</div>
          <p className="mt-5 leading-8 text-muted">هنراجع التحويل ونفعّل اشتراكك في أقرب وقت.</p>
          <Link href="/dashboard" className="btn-gold mt-6">رجوع للوحة التحكم</Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="فعّل اشتراكك" subtitle="حوّل المبلغ ثم ارفع إثبات التحويل، وهنفعّل حسابك بعد المراجعة.">
      <div className="mb-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/15 to-transparent p-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-muted">الاشتراك الشهري</div>
            <div className="gold-text font-display text-4xl font-bold">99 <span className="text-base">جنيه / شهر</span></div>
          </div>
          <span className="eyebrow !text-xs">إلغاء في أي وقت</span>
        </div>
        <div className="mt-4 border-t border-veil/10 pt-3 text-sm text-muted">
          حوّل على الرقم: <b dir="ltr" className="text-ink">{TRANSFER_NUMBER}</b>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-muted">طريقة الدفع</label>
          <select name="method" className="input" required defaultValue="vodafone_cash">
            <option value="vodafone_cash">فودافون كاش</option>
            <option value="instapay">إنستا باي</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-muted">الرقم اللي حوّلت منه</label>
          <input name="sender_phone" className="input" dir="ltr" required placeholder="01xxxxxxxxx" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-muted">رقم العملية (اختياري)</label>
          <input name="transaction_ref" className="input" dir="ltr" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-muted">صورة إثبات التحويل</label>
          <input name="proof" type="file" accept="image/*" required className="input file:ml-3 file:rounded-full file:border-0 file:bg-gold/15 file:px-4 file:py-1.5 file:text-sm file:font-bold file:text-gold" />
        </div>
        {status === "error" && <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-danger">{error}</p>}
        <button disabled={status === "sending"} className="btn-gold w-full">{status === "sending" ? "جاري الإرسال..." : "إرسال الطلب"}</button>
      </form>
    </AuthShell>
  );
}
