"use client";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    await supabaseBrowser().auth.signOut();
    router.push("/");
    router.refresh();
  }
  return (
    <button onClick={signOut} className="rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-veil/5 hover:text-ink">
      خروج
    </button>
  );
}
