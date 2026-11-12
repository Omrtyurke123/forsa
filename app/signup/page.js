"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import AuthShell from "../AuthShell";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabaseBrowser().auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.full_name, phone: form.phone } },
    });
    if (error) {
      setError("مش قادرين نكمل التسجيل بالبيانات دي، تأكد من الإيميل أو جرّب تاني.");
      setLoading(false);
      return;
    }
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }
    setAwaitingConfirmation(true);
    setLoading(false);
  }

  if (awaitingConfirmation) {
    return (
      <AuthShell title="تحقق من إيميلك">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/10 text-3xl ring-1 ring-gold/40">✉️</div>
          <p className="mt-5 leading-8 text-muted">
            بعتنالك رسالة تأكيد على <b dir="ltr" className="text-ink">{form.email}</b>.
            <br />افتح الرسالة واضغط على رابط التأكيد عشان تفعّل حسابك.
          </p>
          <button onClick={() => setAwaitingConfirmation(false)} className="btn-ghost mt-6">جرّب تاني</button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="ابدأ تجربتك المجانية"
      subtitle="3 أيام كاملة من غير أي التزام."
      footer={<>عندك حساب؟ <Link href="/login" className="font-bold text-gold hover:underline">سجّل دخولك</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-muted">الاسم بالكامل</label>
          <input className="input" required value={form.full_name} onChange={set("full_name")} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-muted">رقم الموبايل</label>
          <input className="input" type="tel" dir="ltr" required value={form.phone} onChange={set("phone")} placeholder="01xxxxxxxxx" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-muted">الإيميل</label>
          <input className="input" type="email" dir="ltr" required value={form.email} onChange={set("email")} placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-muted">كلمة المرور</label>
          <input className="input" type="password" dir="ltr" required minLength={6} value={form.password} onChange={set("password")} placeholder="6 أحرف على الأقل" />
        </div>
        {error && <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-danger">{error}</p>}
        <button disabled={loading} className="btn-gold w-full">{loading ? "جاري التسجيل..." : "إنشاء الحساب"}</button>
      </form>
    </AuthShell>
  );
}
