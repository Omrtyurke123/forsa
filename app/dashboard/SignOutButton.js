"use client";

import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button onClick={handleSignOut} className="text-sm text-muted hover:text-ink">
      خروج
    </button>
  );
}
