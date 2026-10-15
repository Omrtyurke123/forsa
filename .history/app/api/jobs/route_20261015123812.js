import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

function hasAccess(profile) {
  if (!profile) return false;

  const trialEnds = new Date(profile.trial_started_at);
  trialEnds.setDate(trialEnds.getDate() + (profile.trial_days ?? 3));

  const trialActive = new Date() < trialEnds;

  const subActive =
    profile.subscription_active &&
    profile.subscription_expires_at &&
    new Date(profile.subscription_expires_at) > new Date();

  return trialActive || subActive;
}

export async function GET(request) {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const access = hasAccess(profile);

  const { searchParams } = new URL(request.url);
  const feedType = searchParams.get("feed_type") || "low_offers";
  const source = searchParams.get("source"); // اختياري، للأقسام الفورية

  let query = supabase
    .from("jobs")
    .select("*")
    .eq("feed_type", feedType)
    .order("created_at", { ascending: false })
    .limit(access ? 60 : 5);

  if (source) query = query.eq("source", source);

  const { data: jobs, error } = await query;

  if (error) {
  console.error("jobs fetch error:", error);
  return NextResponse.json({ error: "حصل خطأ، حاول تاني" }, { status: 500 });
}

  // لو مفيش اشتراك/تجربة سارية: نبعت المعاينة بس من غير تفاصيل حساسة
  const payload = access
    ? jobs
    : jobs.map((j) => ({
        id: j.id,
        feed_type: j.feed_type,
        source: j.source,
        title: j.title,
        created_at: j.created_at,
        locked: true,
      }));

  return NextResponse.json({ access, jobs: payload });
}
