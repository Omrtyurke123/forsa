import { supabaseServer, supabaseAdmin } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import PaymentRow from "./PaymentRow";

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

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="font-display font-bold text-2xl mb-6">طلبات الدفع</h1>

      <div className="space-y-3">
        {withUrls.length === 0 && (
          <p className="text-muted text-sm">مفيش طلبات لسه.</p>
        )}

        {withUrls.map((p) => (
          <PaymentRow key={p.id} payment={p} />
        ))}
      </div>
    </main>
  );
}
