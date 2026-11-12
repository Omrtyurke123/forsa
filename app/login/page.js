"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import AuthShell from "../AuthShell";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email, password });
    if (error) {
      setError("الإيميل أو كلمة المرور غلط.");
      setLoading(false);
      return;
    }
    const nextParam = params.get("next");
    const safeNext =
      nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/dashboard";
    router.push(safeNext);
    router.refresh();
  }

  return (
    <AuthShell
      title="أهلاً بعودتك"
      subtitle="سجّل دخولك وكمّل من حيث وقفت."
      footer={<>لسه معندكش حساب؟ <Link href="/signup" className="font-bold text-gold hover:underline">ابدأ تجربتك المجانية</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-muted">الإيميل</label>
          <input className="input" type="email" dir="ltr" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-muted">كلمة المرور</label>
          <input className="input" type="password" dir="ltr" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        {error && <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-danger">{error}</p>}
        <button disabled={loading} className="btn-gold w-full">{loading ? "جاري الدخول..." : "تسجيل الدخول"}</button>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
