import { Env } from "./types";

const TEAM_NAME_TO_SHORT: Record<string, { short: string; id: number; league: string }> = {
  T1: { short: "T1", id: 1, league: "LCK" },
  "Gen.G": { short: "GEN", id: 2, league: "LCK" },
  "Hanwha Life Esports": { short: "HLE", id: 3, league: "LCK" },
  "Dplus KIA": { short: "DK", id: 4, league: "LCK" },
  "Dplus Kia": { short: "DK", id: 4, league: "LCK" },
  "kt Rolster": { short: "KT", id: 5, league: "LCK" },
  "KT Rolster": { short: "KT", id: 5, league: "LCK" },
  "BNK FEARX": { short: "BFX", id: 6, league: "LCK" },
  "Hanjin BRION": { short: "BRO", id: 7, league: "LCK" },
  "OKSavingsBank BRION": { short: "BRO", id: 7, league: "LCK" },
  "Kiwoom DRX": { short: "KRX", id: 8, league: "LCK" },
  DRX: { short: "KRX", id: 8, league: "LCK" },
  "Nongshim RedForce": { short: "NS", id: 9, league: "LCK" },
  "DN SOOPers": { short: "DNS", id: 10, league: "LCK" },
  "G2 Esports": { short: "G2", id: 21, league: "LEC" },
  Fnatic: { short: "FNC", id: 22, league: "LEC" },
  "Movistar KOI": { short: "MDK", id: 23, league: "LEC" },
  Shifters: { short: "SHF", id: 24, league: "LEC" },
  "Karmine Corp": { short: "KC", id: 25, league: "LEC" },
  "Team Vitality": { short: "VIT", id: 26, league: "LEC" },
  "SK Gaming": { short: "SK", id: 27, league: "LEC" },
  "Team Heretics": { short: "TH", id: 28, league: "LEC" },
  GIANTX: { short: "GX", id: 29, league: "LEC" },
  "Natus Vincere": { short: "NAVI", id: 30, league: "LEC" },
  FlyQuest: { short: "FLY", id: 31, league: "LCS" },
  "Team Liquid": { short: "TL", id: 32, league: "LCS" },
  Cloud9: { short: "C9", id: 33, league: "LCS" },
  Sentinels: { short: "SEN", id: 34, league: "LCS" },
  "Shopify Rebellion": { short: "SR", id: 35, league: "LCS" },
  Disguised: { short: "DSG", id: 37, league: "LCS" },
  LYON: { short: "LYN", id: 38, league: "LCS" },
};

function cleanPlayerName(raw: string): string {
  return raw.replace(/\s*\([^)]*\)\s*/g, "").trim();
}

function toSlug(name: string): string {
  return cleanPlayerName(name).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function resolveTier(sourceSite: string, status: string) {
  if (status === "Confirmed") {
    return { status: "CONFIRMED", confidence: 100, autoPublish: true };
  }
  const s = (sourceSite || "").toLowerCase();
  if (s.includes("sheep esports") || s.includes("inven") || s.includes("kukmin") || s.includes("xportsnews")) {
    return { status: "RUMORED", confidence: 90, autoPublish: true };
  }
  return { status: "RUMORED", confidence: 75, autoPublish: false };
}

export async function runLeaguepediaAutoPublish(env: Env): Promise<{
  fetched: number;
  published: number;
  skipped: number;
}> {
  if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
    return { fetched: 0, published: 0, skipped: 0 };
  }

  const since = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const queryUrl =
    `https://lol.fandom.com/api.php?action=cargoquery&format=json&tables=RosterRumors` +
    `&fields=Date,Player,TeamStart,TeamEnd,RegionEnd,RoleEnd,Status,SourceLink,SourceSite,NotHappening` +
    `&where=Date%3E=%27${since}%27+AND+(RegionEnd=%27Korea%27+OR+RegionEnd=%27China%27+OR+RegionEnd=%27EMEA%27+OR+RegionEnd=%27North%20America%27)` +
    `&order_by=Date+DESC&limit=50`;

  const resp = await fetch(queryUrl, {
    headers: { "User-Agent": "HotStoveLeagueBot/1.0 (https://github.com/jeongminsang/hotstoveleague)" },
  });
  if (!resp.ok) return { fetched: 0, published: 0, skipped: 0 };

  const data: { cargoquery?: Array<{ title: Record<string, string> }> } = await resp.json();
  const rows = data.cargoquery || [];

  let published = 0;
  let skipped = 0;

  for (const item of rows) {
    const t = item.title;
    if (t.NotHappening === "1" || !t.SourceLink?.startsWith("http")) {
      skipped++;
      continue;
    }

    const targetTeam = TEAM_NAME_TO_SHORT[t.TeamEnd];
    if (!targetTeam) {
      skipped++;
      continue;
    }

    const playerName = cleanPlayerName(t.Player || "");
    const playerSlug = toSlug(playerName);
    const { status, confidence, autoPublish } = resolveTier(t.SourceSite, t.Status);

    if (!autoPublish) {
      skipped++;
      continue;
    }

    const postId = `lp-${t.Date}-${playerSlug}-${targetTeam.short.toLowerCase()}`;
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/publish_transfer_event`, {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_KEY,
        Authorization: `Bearer ${env.SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_post_id: postId,
        p_entity_type: "PLAYER",
        p_player_slug: playerSlug,
        p_player_name: playerName,
        p_current_team_short: TEAM_NAME_TO_SHORT[t.TeamStart]?.short || "FA",
        p_target_team_id: targetTeam.id,
        p_target_team_short: targetTeam.short,
        p_league: targetTeam.league,
        p_status: status,
        p_confidence: confidence,
        p_source: t.SourceSite || "Leaguepedia",
        p_author: t.SourceSite || "Leaguepedia",
        p_post_url: t.SourceLink,
        p_raw_text: `${playerName} -> ${targetTeam.short} (${t.SourceSite})`,
        p_summary: `${playerName} 선수가 2027 시즌 ${targetTeam.short}에 합류할 예정입니다.`,
        p_summary_en: `${playerName} is set to join ${targetTeam.short} for the 2027 season.`,
        p_summary_zh: `${playerName} 预计将在 2027 赛季加盟 ${targetTeam.short}。`,
        p_published_at: `${t.Date}T12:00:00+09:00`,
      }),
    });

    if (res.ok) {
      const rpcRes = (await res.json()) as { action?: string };
      if (rpcRes?.action === "published") published++;
      else skipped++;
    } else {
      skipped++;
    }
  }

  return { fetched: rows.length, published, skipped };
}
