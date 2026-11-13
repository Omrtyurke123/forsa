import { supabaseAdmin } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";

export default async function LocalAdminPage() {
  // حماية إضافية: الصفحة دي تشتغل بس لو NODE_ENV = development
  // يعني حتى لو اترفعت بالغلط للـ production، هترجع 404
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const admin = supabaseAdmin();

  const { data: profiles } = await admin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: payments } = await admin
    .from("payments")
    .select("*, profiles!user_id(full_name, phone), plans(name, price_egp)")
    .order("created_at", { ascending: false });

  const { data: usersResponse } = await admin.auth.admin.listUsers({
    perPage: 1000,
  });

  const emailById = {};
  (usersResponse?.users || []).forEach((u) => {
    emailById[u.id] = u.email;
  });

  const { data: jobs } = await admin
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main style={{ padding: 24, fontFamily: "monospace", direction: "rtl" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>
        لوحة الأدمن المحلية (محلي فقط — مش متاحة أونلاين)
      </h1>

      <h2 style={{ marginTop: 32 }}>كل الحسابات ({profiles?.length || 0})</h2>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>الاسم</th>
            <th>الإيميل</th>
            <th>الهاتف</th>
            <th>أدمن؟</th>
            <th>اشتراك فعّال؟</th>
            <th>نهاية الاشتراك</th>
            <th>تاريخ الانضمام</th>
          </tr>
        </thead>
        <tbody>
          {(profiles || []).map((p) => (
            <tr key={p.id}>
              <td style={{ fontSize: 11 }}>{p.id}</td>
              <td>{p.full_name || "—"}</td>
              <td dir="ltr">{emailById[p.id] || "—"}</td>
              <td>{p.phone || "—"}</td>
              <td>{p.is_admin ? "نعم" : "لا"}</td>
              <td>{p.subscription_active ? "نعم" : "لا"}</td>
              <td>
                {p.subscription_expires_at
                  ? new Date(p.subscription_expires_at).toLocaleString("ar-EG")
                  : "—"}
              </td>
              <td>{new Date(p.created_at).toLocaleString("ar-EG")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 32 }}>كل طلبات الدفع ({payments?.length || 0})</h2>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>المستخدم</th>
            <th>الخطة</th>
            <th>الطريقة</th>
            <th>رقم المرسل</th>
            <th>رقم العملية</th>
            <th>الحالة</th>
            <th>التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {(payments || []).map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.profiles?.full_name || "—"} ({p.profiles?.phone || "—"})</td>
              <td>{p.plans?.name || "—"} — {p.plans?.price_egp || "—"} ج</td>
              <td>{p.method}</td>
              <td>{p.sender_phone}</td>
              <td>{p.transaction_ref || "—"}</td>
              <td>{p.status}</td>
              <td>{new Date(p.created_at).toLocaleString("ar-EG")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 32 }}>آخر 200 وظيفة في النظام</h2>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>المصدر</th>
            <th>النوع</th>
            <th>العنوان</th>
            <th>التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {(jobs || []).map((j) => (
            <tr key={j.id}>
              <td>{j.source}</td>
              <td>{j.feed_type}</td>
              <td>{j.title || "—"}</td>
              <td>{new Date(j.created_at).toLocaleString("ar-EG")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}