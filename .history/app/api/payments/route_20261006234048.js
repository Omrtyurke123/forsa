import { NextResponse } from "next/server";
import { supabaseServer, supabaseAdmin } from "@/lib/supabaseServer";

export async function POST(request) {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const method = formData.get("method");
  const senderPhone = formData.get("sender_phone");
  const transactionRef = formData.get("transaction_ref");
  const planId = formData.get("plan_id");
  const file = formData.get("proof");

  if (!method || !file || typeof file === "string") {
    return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
  }

  const admin = supabaseAdmin();

  const ext = file.name?.split(".").pop() || "jpg";
  const path = `${user.id}/${Date.now()}.${ext}`;

  const { error: uploadError } = await admin.storage
    .from("payment-proofs")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { error: insertError } = await supabase.from("payments").insert({
    user_id: user.id,
    plan_id: planId || null,
    method,
    sender_phone: senderPhone,
    transaction_ref: transactionRef,
    proof_path: path,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
