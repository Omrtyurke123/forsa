"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SignupPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone } },
    });

    setLoading(false);

    if (signUpError) {
      setError("مش قادرين نكمل التسجيل بالبيانات دي، تأكد من الإيميل أو جرّب تاني.");
      return;
    }

    // لو فيه session يبقى التأكيد مش مفعّل (أو الحساب موجود ومتأكد بالفعل) — روح على طول
    if (data.session) {
      router.push("/dashboard");
      return;
    }

    // لو مفيش session، يبقى التأكيد مفعّل وبعتنالهم إيميل
    setAwaitingConfirmation(true);
  }

  if (awaitingConfirmation) {
    return (
      <main className="max-w-sm mx-auto px-6 py-16 text-center">
        <h1 className="font-display font-bold text-2xl mb-2">تحقق من إيميلك</h1>
        <p className="text-muted leading-relaxed">
          بعتنالك رسالة تأكيد على <b dir="ltr">{email}</b>. افتح الرسالة ودوس على
          لينك التأكيد عشان تفعّل حسابك وتبدأ تجربتك المجانية.<
        </p>
        <p className="text-sm text-muted mt-6">
          مش لاقي الرسالة؟ تأكد من الـ Spam، أو{" "}
          <button
            onClick={() => setAwaitingConfirmation(false)}
            className="text-teal font-bold underline"
          >
            جرّب تاني
          </button>
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-sm mx-auto px-6 py-16">
      <h1 className="font-display font-bold text-2xl mb-1">ابدأ تجربتك المجانية</h1>
      <p className="text-muted text-sm mb-8">3 أيام مجانًا، من غير بطاقة بنكية.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="الاسم" value={fullName} onChange={setFullName} required />
        <Field label="رقم الموبايل" value={phone} onChange={setPhone} required />
        <Field
          label="الإيميل"
          type="email"
          value={email}
          onChange={setEmail}
          required
        />
        <Field
          label="كلمة المرور"
          type="password"
          value={password}
          onChange={setPassword}
          required
          minLength={6}
        />

        {error && <p className="text-danger text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-paper font-bold py-3 rounded-sm hover:bg-teal transition disabled:opacity-50"
        >
          {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
        </button>
      </form>

      <p className="text-sm text-muted mt-6">
        عندك حساب بالفعل؟{" "}
        <a href="/login" className="text-teal font-bold">
          سجّل دخولك
        </a>
      </p>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", ...rest }) {
  return (
    <label className="block">
      <span className="text-sm text-muted block mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line rounded-sm px-3 py-2 bg-panel focus:outline-none focus-visible:outline-2 focus-visible:outline-teal"
        {...rest}
      />
    </label>
  );
}