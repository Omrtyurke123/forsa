import { NextResponse } from "next/server";
import { supabaseServer, supabaseAdmin } from "@/lib/supabaseServer";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_EXT = ["jpg", "jpeg", "png", "webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

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

  if (!["vodafone_cash", "instapay"].includes(method)) {
    return NextResponse.json({ error: "طريقة دفع غير صالحة" }, { status: 400 });
  }

  // تحقق من نوع وحجم الملف — قبل أي رفع
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "الملف لازم يكون صورة (jpg/png/webp)" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "حجم الصورة أكبر من 5 ميجا" }, { status: 400 });
  }

  const admin = supabaseAdmin();

  // استخرج الامتداد من نوع MIME الحقيقي، مش من اسم الملف (اسم الملف غير موثوق)
  const extFromType = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
  const ext = extFromType[file.type];
  const path = `${user.id}/${Date.now()}.${ext}`;

  const { error: uploadError } = await admin.storage
    .from("payment-proofs")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
  console.error("upload error:", uploadError);
  return NextResponse.json({ error: "حصل خطأ في رفع الصورة، حاول تاني" }, { status: 500 });
}

  // status ثابتة 'pending' هنا أصلًا (الافتراضي في الجدول) — لكن لازم
  // تتأكد إن سياسة RLS "payments_insert_own" بقت فيها with check (status = 'pending')
  // زي ما اتفقنا، عشان حتى لو حد حاول يبعت insert مباشر من المتصفح يتمنع
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