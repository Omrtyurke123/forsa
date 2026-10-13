import { NextResponse } from "next/server";
import { supabaseServer, supabaseAdmin } from "@/lib/supabaseServer";

export async function PATCH(request, { params }) {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { action } = await request.json(); // "approve" | "reject"

  if (!["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "invalid action" }, { status: 400 });
  }

  const admin = supabaseAdmin();

  const { data: payment, error: fetchError } = await admin
    .from("payments")
    .select("*, plans(duration_days)")
    .eq("id", params.id)
    .single();

  if (fetchError || !payment) {
    return NextResponse.json({ error: "طلب غير موجود" }, { status: 404 });
  }

  await admin
    .from("payments")
    .update({
      status: action === "approve" ? "approved" : "rejected",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", params.id);

  if (action === "approve") {
    const durationDays = payment.plans?.duration_days ?? 30;

    const { data: currentProfile } = await admin
      .from("profiles")
      .select("subscription_expires_at")
      .eq("id", payment.user_id)
      .single();

    const base =
      currentProfile?.subscription_expires_at &&
      new Date(currentProfile.subscription_expires_at) > new Date()
        ? new Date(currentProfile.subscription_expires_at)
        : new Date();

    base.setDate(base.getDate() + durationDays);

    await admin
      .from("profiles")
      .update({
        subscription_active: true,
        subscription_expires_at: base.toISOString(),
      })
      .eq("id", payment.user_id);
  }

  return NextResponse.json({ ok: true });
}
