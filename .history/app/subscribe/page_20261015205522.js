"use client";

import { useState } from "react";

export default function SubscribePage() {
  const [method, setMethod] = useState("vodafone_cash");
  const [senderPhone, setSenderPhone] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData();
    formData.set("method", method);
    formData.set("sender_phone", senderPhone);
    formData.set("transaction_ref", transactionRef);
    if (file) formData.set("proof", file);

    const res = await fetch("/api/payments", { method: "POST", body: formData });

    setStatus(res.ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <main className="max-w-md mx-auto px-6 py-16 text-center">
        <h1 className="font-display font-bold text-2xl mb-2">تم استلام طلبك</h1>
        <p className="text-muted">
          هنراجع عملية التحويل ونفعّل اشتراكك خلال ساعات. هتوصلك رسالة على
          الإيميل بعد التفعيل.
        </p>
        <a href="/dashboard" className="inline-block mt-6 text-teal font-bold">
          رجوع للمنصة
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <h1 className="font-display font-bold text-2xl mb-1">الاشتراك الشهري</h1>
      <p className="text-muted text-sm mb-8"> جنيه / شهر .</p>

      <div className="bg-panel border border-line rounded-sm p-4 mb-6 text-sm leading-relaxed">
        <p className="font-bold mb-1">حوّل المبلغ على:</p>
        <p>فودافون كاش / انستاباي: <b dir="ltr">01xxxxxxxxx</b></p>
        <p className="text-muted mt-2">
          بعد التحويل، املأ البيانات تحت وارفع صورة إيصال التحويل.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-muted block mb-1">طريقة التحويل</span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border border-line rounded-sm px-3 py-2 bg-panel"
          >
            <option value="vodafone_cash">فودافون كاش</option>
            <option value="instapay">انستاباي</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-muted block mb-1">رقمك اللي حوّلت منه</span>
          <input
            value={senderPhone}
            onChange={(e) => setSenderPhone(e.target.value)}
            required
            className="w-full border border-line rounded-sm px-3 py-2 bg-panel"
          />
        </label>

        <label className="block">
          <span className="text-sm text-muted block mb-1">
            رقم العملية (اختياري)
          </span>
          <input
            value={transactionRef}
            onChange={(e) => setTransactionRef(e.target.value)}
            className="w-full border border-line rounded-sm px-3 py-2 bg-panel"
          />
        </label>

        <label className="block">
          <span className="text-sm text-muted block mb-1">صورة إيصال التحويل</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            className="w-full text-sm"
          />
        </label>

        {status === "error" && (
          <p className="text-danger text-sm">حصل خطأ، جرّب تاني.</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-ink text-paper font-bold py-3 rounded-sm hover:bg-teal transition disabled:opacity-50"
        >
          {status === "sending" ? "جاري الإرسال..." : "إرسال الطلب"}
        </button>
      </form>
      <p className="text-xs text-ink/50 mt-6 text-center">
        باستخدامك المنصة أو اشتراكك، إنت موافق على{" "}
        <a href="/terms" className="text-teal underline">شروط الاستخدام</a>{" "}
        و{" "}
        <a href="/privacy" className="text-teal underline">سياسة الخصوصية</a>.
      </p>
    </main>
  );
}
