#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export interface DraftItem {
  id: number;
  post_id: string;
  source: string;
  author: string;
  author_en?: string;
  author_zh?: string;
  raw_text: string;
  summary: string;
  summary_en?: string;
  summary_zh?: string;
  player_slug?: string;
  player_name?: string;
  current_team_short?: string;
  target_team_short?: string;
  league?: string;
  kind?: string;
  confidence: number;
  post_url?: string;
  published_at?: string;
  status: "pending" | "approved" | "rejected";
  review_note?: string;
}

const DRAFTS_FILE = path.resolve(process.cwd(), "drafts_review.json");

/**
 * 1. Export pending drafts to local JSON file for inspection / AI verification
 */
async function exportDrafts() {
  console.log("📥 Fetching pending drafts from Supabase...");
  const { data, error } = await supabase
    .from("rumor_drafts")
    .select("*")
    .eq("status", "pending")
    .order("id", { ascending: true });

  if (error) {
    console.error("❌ Failed to query rumor_drafts:", error);
    process.exit(1);
  }

  const drafts: DraftItem[] = (data || []).map((row) => ({
    id: row.id,
    post_id: row.post_id,
    source: row.source,
    author: row.author,
    author_en: row.author_en || row.author,
    author_zh: row.author_zh || row.author,
    raw_text: row.raw_text,
    summary: row.summary,
    summary_en: row.summary_en || "",
    summary_zh: row.summary_zh || "",
    player_slug: row.player_slug || "",
    player_name: row.player_name || "",
    current_team_short: row.current_team_short || "",
    target_team_short: row.target_team_short || "",
    league: row.league || "LCK",
    kind: row.kind || "UNKNOWN",
    confidence: row.confidence ?? 80,
    post_url: row.post_url || "",
    published_at: row.published_at || new Date().toISOString(),
    status: row.status,
    review_note: row.review_note || "",
  }));

  fs.writeFileSync(DRAFTS_FILE, JSON.stringify(drafts, null, 2), "utf-8");
  console.log(`✅ Exported ${drafts.length} pending draft(s) to ${DRAFTS_FILE}`);
  console.log(`💡 You can now review/edit 'status' ('approved' or 'rejected') and 'review_note' in the file.`);
}

/**
 * 2. Update review decisions back to rumor_drafts table
 */
async function syncReview() {
  if (!fs.existsSync(DRAFTS_FILE)) {
    console.error(`❌ Review file not found: ${DRAFTS_FILE}`);
    console.log("👉 Run 'pnpm drafts:export' first.");
    process.exit(1);
  }

  const fileContent = fs.readFileSync(DRAFTS_FILE, "utf-8");
  const drafts: DraftItem[] = JSON.parse(fileContent);

  const reviewedItems = drafts.filter(
    (d) => d.status === "approved" || d.status === "rejected"
  );

  console.log(`🔄 Syncing ${reviewedItems.length} reviewed decision(s)...`);

  for (const item of reviewedItems) {
    const { error } = await supabase
      .from("rumor_drafts")
      .update({
        status: item.status,
        review_note: item.review_note || null,
        reviewed_at: new Date().toISOString(),
        summary: item.summary,
        summary_en: item.summary_en || null,
        summary_zh: item.summary_zh || null,
        player_slug: item.player_slug || null,
        player_name: item.player_name || null,
        current_team_short: item.current_team_short || null,
        target_team_short: item.target_team_short || null,
        confidence: item.confidence,
      })
      .eq("id", item.id);

    if (error) {
      console.error(`⚠️ Failed to update draft #${item.id}:`, error.message);
    } else {
      console.log(`  [Draft #${item.id}] Status -> ${item.status}`);
    }
  }

  console.log("✅ Review decisions updated in Supabase.");
}

/**
 * 3. Publish approved drafts into public rumors table & update player predictions
 */
async function publishApproved(dryRun = false) {
  console.log(`🚀 Finding approved drafts to publish (dry-run: ${dryRun})...`);

  const { data: approvedDrafts, error } = await supabase
    .from("rumor_drafts")
    .select("*")
    .eq("status", "approved")
    .order("id", { ascending: true });

  if (error) {
    console.error("❌ Failed to query approved drafts:", error);
    process.exit(1);
  }

  if (!approvedDrafts || approvedDrafts.length === 0) {
    console.log("ℹ️ No approved drafts found. Nothing to publish.");
    return;
  }

  // Pre-fetch teams for short_name -> team_id mapping
  const { data: teamsData } = await supabase.from("teams").select("id, short_name, name");
  const teamByShort = new Map<string, number>();
  (teamsData || []).forEach((t) => {
    teamByShort.set(t.short_name.toUpperCase(), t.id);
  });

  // Pre-fetch players
  const { data: playersData } = await supabase.from("players").select("id, slug, name, current_team_id");
  const playerBySlug = new Map<string, any>();
  (playersData || []).forEach((p) => {
    if (p.slug) playerBySlug.set(p.slug.toLowerCase(), p);
    if (p.name) playerBySlug.set(p.name.toLowerCase(), p);
  });

  console.log(`📦 Processing ${approvedDrafts.length} approved draft(s)...`);

  let publishedRumors = 0;
  let updatedRosters = 0;

  for (const draft of approvedDrafts) {
    const targetTeamId = draft.target_team_short
      ? teamByShort.get(draft.target_team_short.toUpperCase()) || null
      : null;

    let matchedPlayerId: number | null = null;
    if (draft.player_slug) {
      const p = playerBySlug.get(draft.player_slug.toLowerCase());
      if (p) matchedPlayerId = p.id;
    } else if (draft.player_name) {
      const p = playerBySlug.get(draft.player_name.toLowerCase());
      if (p) matchedPlayerId = p.id;
    }

    console.log(`\n• Draft #${draft.id}: [${draft.league || "LCK"}] ${draft.player_name || "Unknown"} -> ${draft.target_team_short || "FA"}`);
    console.log(`  Summary: ${draft.summary}`);

    if (dryRun) {
      console.log(`  [DRY-RUN] Would insert into 'rumors' (post_id: ${draft.post_id})`);
      if (matchedPlayerId && targetTeamId) {
        console.log(`  [DRY-RUN] Would update player #${matchedPlayerId} predicted_team_id -> ${targetTeamId}`);
      }
      continue;
    }

    // 1) Upsert into rumors table
    const { error: insertRumorErr } = await supabase.from("rumors").upsert(
      {
        post_id: draft.post_id,
        source: draft.source,
        author: draft.author,
        author_en: draft.author_en,
        author_zh: draft.author_zh,
        raw_text: draft.raw_text,
        summary: draft.summary,
        summary_en: draft.summary_en,
        summary_zh: draft.summary_zh,
        player_id: matchedPlayerId,
        target_team_id: targetTeamId,
        confidence: draft.confidence || 80,
        post_url: draft.post_url,
        published_at: draft.published_at || new Date().toISOString(),
        league: draft.league,
        player_slug: draft.player_slug,
        player_name: draft.player_name,
        current_team_short: draft.current_team_short,
        target_team_short: draft.target_team_short,
      },
      { onConflict: "post_id" }
    );

    if (insertRumorErr) {
      console.error(`  ❌ Failed to insert rumor:`, insertRumorErr.message);
      continue;
    }
    publishedRumors++;

    // 2) Update player predicted roster if valid match exists
    if (matchedPlayerId && targetTeamId) {
      const { error: playerUpdateErr } = await supabase
        .from("players")
        .update({
          predicted_team_id: targetTeamId,
          confidence: draft.confidence || 80,
          status: draft.kind === "RENEWAL" || draft.kind === "STAY" ? "STAY" : "RUMORED",
          source_url: draft.post_url || undefined,
        })
        .eq("id", matchedPlayerId);

      if (playerUpdateErr) {
        console.error(`  ⚠️ Failed to update player prediction:`, playerUpdateErr.message);
      } else {
        updatedRosters++;
        console.log(`  ✨ Player roster prediction updated!`);
      }
    }

    // 3) Mark draft status as processed/archived
    await supabase
      .from("rumor_drafts")
      .update({
        review_note: (draft.review_note ? draft.review_note + " | " : "") + "Published to rumors",
      })
      .eq("id", draft.id);
  }

  if (!dryRun) {
    console.log(`\n🎉 Done! Published ${publishedRumors} rumors and updated ${updatedRosters} player roster predictions.`);
  } else {
    console.log(`\n💡 Dry-run completed. Run with '--apply' to commit changes to Supabase.`);
  }
}

// Command dispatcher
async function main() {
  const command = process.argv[2];
  const flag = process.argv[3];

  switch (command) {
    case "export":
      await exportDrafts();
      break;
    case "review":
      await syncReview();
      break;
    case "publish":
      const dryRun = flag !== "--apply";
      await publishApproved(dryRun);
      break;
    default:
      console.log(`
Usage:
  pnpm drafts:export          Export pending drafts from DB to drafts_review.json
  pnpm drafts:review          Sync review decisions (status/notes) back to DB
  pnpm drafts:publish         Dry-run publish of approved drafts
  pnpm drafts:publish --apply Commit approved drafts into rumors and update rosters
      `);
      break;
  }
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
