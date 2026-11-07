import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Base offset requested by user (between 20 ~ 43, default 34)
const BASE_OFFSET = 34;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({
        today_uniques: 3,
        today_views: 12,
        total_uniques: BASE_OFFSET,
        fallback: true,
      });
    }

    const today = new Date().toISOString().slice(0, 10);
    const { data: rows, error } = await supabase
      .from("site_visits")
      .select("date, page_views, unique_visitors");

    if (!error && rows && rows.length > 0) {
      const todayRow = rows.find((r) => r.date === today);
      const totalUniques =
        rows.reduce((acc, cur) => acc + (cur.unique_visitors || 0), 0) + BASE_OFFSET;
      return NextResponse.json({
        today_uniques: todayRow?.unique_visitors || 0,
        today_views: todayRow?.page_views || 0,
        total_uniques: totalUniques,
      });
    }

    // Fallback if table not yet created
    return NextResponse.json({
      today_uniques: 3,
      today_views: 12,
      total_uniques: BASE_OFFSET,
      fallback: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      { today_uniques: 1, today_views: 1, total_uniques: BASE_OFFSET, error: err.message },
      { status: 200 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const isUnique = Boolean(body.isUnique);
    const today = new Date().toISOString().slice(0, 10);

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({
        today_uniques: isUnique ? 1 : 0,
        today_views: 1,
        total_uniques: BASE_OFFSET,
        fallback: true,
      });
    }

    // 1. First attempt: call RPC record_site_visit
    const { data: rpcData, error: rpcError } = await supabase.rpc("record_site_visit", {
      is_unique: isUnique,
    });

    if (!rpcError && rpcData) {
      return NextResponse.json(rpcData);
    }

    // 2. Second attempt: Direct table upsert on site_visits
    const { data: existing } = await supabase
      .from("site_visits")
      .select("date, page_views, unique_visitors")
      .eq("date", today)
      .maybeSingle();

    if (existing) {
      const updatedViews = (existing.page_views || 0) + 1;
      const updatedUniques = (existing.unique_visitors || 0) + (isUnique ? 1 : 0);
      await supabase
        .from("site_visits")
        .update({
          page_views: updatedViews,
          unique_visitors: updatedUniques,
          updated_at: new Date().toISOString(),
        })
        .eq("date", today);
    } else {
      await supabase.from("site_visits").insert({
        date: today,
        page_views: 1,
        unique_visitors: isUnique ? 1 : 0,
      });
    }

    // Fetch totals
    const { data: allRows } = await supabase.from("site_visits").select("date, unique_visitors, page_views");
    const totalUniques =
      (allRows || []).reduce((acc, cur) => acc + (cur.unique_visitors || 0), 0) + BASE_OFFSET;
    const todayRow = (allRows || []).find((r: any) => r.date === today);

    return NextResponse.json({
      today_uniques: todayRow?.unique_visitors || (isUnique ? 1 : 0),
      today_views: todayRow?.page_views || 1,
      total_uniques: totalUniques,
    });
  } catch (err: any) {
    return NextResponse.json(
      { today_uniques: 1, today_views: 1, total_uniques: BASE_OFFSET, fallback: true },
      { status: 200 }
    );
  }
}
