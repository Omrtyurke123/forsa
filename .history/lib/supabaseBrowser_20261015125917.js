// "use client";

// import { createBrowserClient } from "@supabase/ssr";

// export function supabaseBrowser() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );
  
// }
"use client";

import { createBrowserClient } from "@supabase/ssr";

export function supabaseBrowser() {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (typeof window !== "undefined") window.sb = client; // مؤقت للاختبار — امسح السطر ده بعدين

  return client;
}