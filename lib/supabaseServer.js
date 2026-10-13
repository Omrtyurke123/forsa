import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// عميل بصلاحية المستخدم المسجّل دخوله (محترم لـ RLS)
export function supabaseServer() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // بيحصل جوه Server Components بس (read-only) — المسموح بيه
            // فعليًا بيتم ضبط الكوكيز من middleware.js
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {}
        },
      },
    }
  );
}

// عميل بصلاحية كاملة (service_role) — بيتخطى RLS بالكامل.
// استخدام في كود السيرفر بس (API routes)، وممنوع نهائي في كود المتصفح.
export function supabaseAdmin() {
  const { createClient } = require("@supabase/supabase-js");

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
