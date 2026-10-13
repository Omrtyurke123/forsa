"use client";

import { useState } from "react";

const STATUS_LABEL = { pending: "بانتظار المراجعة", approved: "مفعّل", rejected: "مرفوض" };

export default function PaymentRow({ payment }) {
  const [status, setStatus] = useState(payment.status);
  const [loading, setLoading] = useState(false);

  async function act(action) {
    setLoading(true);
    const res = await fetch(`/api/payments/${payment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setLoading(false);
    if (res.ok) setStatus(action === "approve" ? "approved" : "rejected");
  }

  return (
    <div className="bg-panel border border-line rounded-sm p-4 flex items-start justify-between gap-4">
      <div className="text-sm">
        <p className="font-bold">{payment.profiles?.full_name || "بدون اسم"}</p>
        <p className="text-muted">{payment.profiles?.phone}</p>
        <p className="mt-1">
          {payment.method === "vodafone_cash" ? "فودافون كاش" : "انستاباي"} من{" "}
          {payment.sender_phone}
          {payment.transaction_ref && ` — رقم العملية: ${payment.transaction_ref}`}
        </p>
        {payment.proofUrl && (
          <a
            href={payment.proofUrl}
            target="_blank"
            rel="noreferrer"
            className="text-teal font-bold inline-block mt-1"
          >
            عرض إيصال التحويل
          </a>
        )}
        <p className="text-xs text-muted mt-2">{STATUS_LABEL[status]}</p>
      </div>

      {status === "pending" && (
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => act("approve")}
            disabled={loading}
            className="bg-teal text-white text-sm font-bold px-3 py-1.5 rounded-sm disabled:opacity-50"
          >
            تفعيل
          </button>
          <button
            onClick={() => act("reject")}
            disabled={loading}
            className="bg-paper border border-line text-sm font-bold px-3 py-1.5 rounded-sm disabled:opacity-50"
          >
            رفض
          </button>
        </div>
      )}
    </div>
  );
}
