import { Env, CandidateDraft } from "./types";

export const TEAM_NAME_TO_SHORT: Record<string, { short: string; id: number; league: string }> = {
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
  "Bilibili Gaming": { short: "BLG", id: 11, league: "LPL" },
  "Top Esports": { short: "TES", id: 12, league: "LPL" },
  "LNG Esports": { short: "LNG", id: 13, league: "LPL" },
  "Weibo Gaming": { short: "WBG", id: 14, league: "LPL" },
  "JD Gaming": { short: "JDG", id: 15, league: "LPL" },
  "Invictus Gaming": { short: "IG", id: 16, league: "LPL" },
  "EDward Gaming": { short: "EDG", id: 17, league: "LPL" },
  "Ninjas in Pyjamas": { short: "NIP", id: 18, league: "LPL" },
  "FunPlus Phoenix": { short: "FPX", id: 19, league: "LPL" },
  "Anyone's Legend": { short: "AL", id: 20, league: "LPL" },
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
  "100 Thieves": { short: "100T", id: 36, league: "LCS" },
  Disguised: { short: "DSG", id: 37, league: "LCS" },
  LYON: { short: "LYN", id: 38, league: "LCS" },
  "Secret Whales": { short: "TSW", id: 39, league: "LCP" },
  "Team Secret Whales": { short: "TSW", id: 39, league: "LCP" },
  "GAM Esports": { short: "GAM", id: 40, league: "LCP" },
  "Fukuoka SoftBank HAWKS gaming": { short: "SHG", id: 41, league: "LCP" },
  "CTBC Flying Oyster": { short: "CFO", id: 42, league: "LCP" },
  "MVK Esports": { short: "MVK", id: 43, league: "LCP" },
  "Deep Cross Gaming": { short: "DCG", id: 44, league: "LCP" },
  "Saigon Warriors": { short: "SGW", id: 45, league: "LCP" },
  "Saigon Warrior": { short: "SGW", id: 45, league: "LCP" },
  "Ground Zero Gaming": { short: "GZ", id: 46, league: "LCP" },
  "paiN Gaming": { short: "PNG", id: 47, league: "CBLOL" },
  LOUD: { short: "LLL", id: 48, league: "CBLOL" },
  "Vivo Keyd Stars": { short: "VKS", id: 49, league: "CBLOL" },
  "RED Canids": { short: "RED", id: 50, league: "CBLOL" },
  FURIA: { short: "FUR", id: 51, league: "CBLOL" },
  "Fluxo W7M": { short: "W7M", id: 52, league: "CBLOL" },
  Leviatan: { short: "LEV", id: 53, league: "CBLOL" },
  "Leviatán": { short: "LEV", id: 53, league: "CBLOL" },
  "LØS": { short: "LOS", id: 54, league: "CBLOL" },
  "Los Grandes": { short: "LOS", id: 54, league: "CBLOL" },
};

export const SHORT_TO_TEAM: Record<string, { short: string; id: number; league: string }> = Object.values(
  TEAM_NAME_TO_SHORT
).reduce((acc, t) => {
  acc[t.short.toUpperCase()] = t;
  return acc;
}, {} as Record<string, { short: string; id: number; league: string }>);

function cleanPlayerName(raw: string): string {
  return raw.replace(/\s*\([^)]*\)\s*/g, "").trim();
}

function toSlug(name: string): string {
  return cleanPlayerName(name).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeRole(roleRaw?: string): { entityType: "PLAYER" | "COACH"; position: string } {
  const r = (roleRaw || "").toLowerCase();
  if (r.includes("head coach") || r.includes("manager")) {
    return { entityType: "COACH", position: "HEAD_COACH" };
  }
  if (r.includes("coach") || r.includes("analyst")) {
    return { entityType: "COACH", position: "COACH" };
  }
  if (r.includes("top")) return { entityType: "PLAYER", position: "TOP" };
  if (r.includes("jung") || r.includes("jgl")) return { entityType: "PLAYER", position: "JGL" };
  if (r.includes("mid")) return { entityType: "PLAYER", position: "MID" };
  if (r.includes("bot") || r.includes("adc") || r.includes("ad carry")) return { entityType: "PLAYER", position: "BOT" };
  if (r.includes("sup") || r.includes("spt")) return { entityType: "PLAYER", position: "SPT" };
  return { entityType: "PLAYER", position: "MID" };
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

async function publishEventWithFallback(
  env: Env,
  params: {
    postId: string;
    entityType: "PLAYER" | "COACH";
    position: string;
    playerSlug: string;
    playerName: string;
    currentTeamShort: string;
    targetTeamId: number | null;
    targetTeamShort: string;
    league: string;
    status: string;
    confidence: number;
    source: string;
    author: string;
    postUrl: string;
    rawText: string;
    summary: string;
    summaryEn: string;
    summaryZh: string;
    publishedAt: string;
  }
): Promise<boolean> {
  const headers = {
    apikey: env.SUPABASE_KEY,
    Authorization: `Bearer ${env.SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };

  if (params.entityType === "COACH") {
    // Check duplicate post_id in rumors
    const dupRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/rumors?post_id=eq.${encodeURIComponent(params.postId)}&select=id`,
      { headers }
    );
    const dupRows = (await dupRes.json()) as any[];
    if (Array.isArray(dupRows) && dupRows.length > 0) return false;

    // Update or insert coach
    const cRes = await fetch(
      `${env.SUPABASE_URL}/rest/v1/coaches?name=ilike.${encodeURIComponent(params.playerName)}&select=id,status,confidence`,
      { headers }
    );
    const coaches = (await cRes.json()) as any[];
    if (Array.isArray(coaches) && coaches.length > 0) {
      await fetch(`${env.SUPABASE_URL}/rest/v1/coaches?id=eq.${coaches[0].id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          predicted_team_id: params.targetTeamId,
          status: params.status,
          confidence: params.confidence,
          source_url: params.postUrl,
        }),
      });
    } else if (params.targetTeamId) {
      await fetch(`${env.SUPABASE_URL}/rest/v1/coaches`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          team_id: null,
          predicted_team_id: params.targetTeamId,
          role: params.position === "HEAD_COACH" ? "HEAD_COACH" : "COACH",
          predicted_role: params.position === "HEAD_COACH" ? "HEAD_COACH" : "COACH",
          name: params.playerName,
          status: params.status,
          confidence: params.confidence,
          source_url: params.postUrl,
        }),
      });
    }

    const rInsert = await fetch(`${env.SUPABASE_URL}/rest/v1/rumors`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        post_id: params.postId,
        entity_type: "COACH",
        player_id: null,
        player_slug: params.playerSlug,
        player_name: params.playerName,
        current_team_short: params.currentTeamShort,
        target_team_id: params.targetTeamId,
        target_team_short: params.targetTeamShort,
        league: params.league,
        confidence: params.confidence,
        source: params.source.slice(0, 20),
        author: params.author,
        post_url: params.postUrl,
        raw_text: params.rawText,
        summary: params.summary,
        summary_en: params.summaryEn,
        summary_zh: params.summaryZh,
        published_at: params.publishedAt,
      }),
    });
    return rInsert.ok;
  }

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/publish_transfer_event`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      p_post_id: params.postId,
      p_entity_type: params.entityType,
      p_player_slug: params.playerSlug,
      p_player_name: params.playerName,
      p_current_team_short: params.currentTeamShort,
      p_target_team_id: params.targetTeamId,
      p_target_team_short: params.targetTeamShort,
      p_league: params.league,
      p_status: params.status,
      p_confidence: params.confidence,
      p_source: params.source,
      p_author: params.author,
      p_post_url: params.postUrl,
      p_raw_text: params.rawText,
      p_summary: params.summary,
      p_summary_en: params.summaryEn,
      p_summary_zh: params.summaryZh,
      p_published_at: params.publishedAt,
    }),
  });

  if (!res.ok) return false;
  const rpcRes = (await res.json()) as { action?: string; reason?: string };
  if (rpcRes?.action === "published") return true;

  // If unknown_player, auto-create player and retry RPC once
  if (rpcRes?.action === "draft_needed" && rpcRes?.reason === "unknown_player" && params.targetTeamId) {
    await fetch(`${env.SUPABASE_URL}/rest/v1/players`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        slug: params.playerSlug,
        name: params.playerName,
        position: params.position,
        current_team_id: null,
        predicted_team_id: params.targetTeamId,
        is_starter: false,
        status: params.status,
        confidence: params.confidence,
        source_url: params.postUrl,
      }),
    });

    const retry = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/publish_transfer_event`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        p_post_id: params.postId,
        p_entity_type: params.entityType,
        p_player_slug: params.playerSlug,
        p_player_name: params.playerName,
        p_current_team_short: params.currentTeamShort,
        p_target_team_id: params.targetTeamId,
        p_target_team_short: params.targetTeamShort,
        p_league: params.league,
        p_status: params.status,
        p_confidence: params.confidence,
        p_source: params.source,
        p_author: params.author,
        p_post_url: params.postUrl,
        p_raw_text: params.rawText,
        p_summary: params.summary,
        p_summary_en: params.summaryEn,
        p_summary_zh: params.summaryZh,
        p_published_at: params.publishedAt,
      }),
    });
    if (retry.ok) {
      const retryJson = (await retry.json()) as { action?: string };
      return retryJson?.action === "published";
    }
  }

  return false;
}

export async function autoPublishCandidateDraft(env: Env, draft: CandidateDraft): Promise<boolean> {
  if (!draft.player_name || (draft.confidence ?? 0) < 85) return false;
  const toShort = (draft.target_team_short || "").toUpperCase();
  const fromShort = (draft.current_team_short || "FA").toUpperCase();
  const isFa = draft.kind === "FA" || toShort === "FA";
  const targetTeam = isFa ? null : SHORT_TO_TEAM[toShort];
  if (!isFa && !targetTeam) return false;

  const fromTeam = SHORT_TO_TEAM[fromShort];
  const league = targetTeam?.league || fromTeam?.league || draft.league || "LCK";
  const status = isFa ? "FA" : (draft.confidence ?? 0) >= 95 ? "CONFIRMED" : "RUMORED";
  const playerSlug = (draft.player_slug || toSlug(draft.player_name)).toLowerCase();

  return publishEventWithFallback(env, {
    postId: draft.post_id,
    entityType: "PLAYER",
    position: "MID",
    playerSlug,
    playerName: draft.player_name,
    currentTeamShort: fromShort,
    targetTeamId: targetTeam?.id ?? null,
    targetTeamShort: isFa ? "FA" : targetTeam!.short,
    league,
    status,
    confidence: draft.confidence ?? 85,
    source: draft.source || "NEWS",
    author: draft.author || "Press",
    postUrl: draft.post_url || "",
    rawText: draft.raw_text || draft.summary || "",
    summary: draft.summary || `${draft.player_name} -> ${isFa ? "FA" : targetTeam!.short}`,
    summaryEn: draft.summary_en || `${draft.player_name} -> ${isFa ? "FA" : targetTeam!.short}`,
    summaryZh: draft.summary_zh || `${draft.player_name} -> ${isFa ? "FA" : targetTeam!.short}`,
    publishedAt: draft.published_at || new Date().toISOString(),
  });
}

export async function runLeaguepediaAutoPublish(env: Env): Promise<{
  fetched: number;
  published: number;
  skipped: number;
}> {
  if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
    return { fetched: 0, published: 0, skipped: 0 };
  }

  const headers = {
    apikey: env.SUPABASE_KEY,
    Authorization: `Bearer ${env.SUPABASE_KEY}`,
  };
  const existingRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/rumors?post_id=like.lp-*&select=post_id`,
    { headers }
  );
  const existingRows = existingRes.ok ? ((await existingRes.json()) as Array<{ post_id: string }>) : [];
  const existingPostIds = new Set(existingRows.map((r) => r.post_id));

  const since = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const queryUrl =
    `https://lol.fandom.com/api.php?action=cargoquery&format=json&tables=RosterRumors` +
    `&fields=Date,Player,TeamStart,TeamEnd,RegionEnd,RoleEnd,Status,SourceLink,SourceSite,NotHappening` +
    `&where=Date%3E=%27${since}%27+AND+(RegionEnd=%27Korea%27+OR+RegionEnd=%27China%27+OR+RegionEnd=%27EMEA%27+OR+RegionEnd=%27North%20America%27+OR+RegionEnd=%27Brazil%27+OR+RegionEnd=%27APAC%27)` +
    `&order_by=Date+DESC&limit=35`;

  const resp = await fetch(queryUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; HotStoveLeagueBot/1.0)" },
  });
  if (!resp.ok) return { fetched: 0, published: 0, skipped: 0 };

  const data: { cargoquery?: Array<{ title: Record<string, string> }> } = await resp.json();
  const rows = data.cargoquery || [];

  let published = 0;
  let skipped = 0;
  let subrequestBudget = 6;

  for (const item of rows) {
    if (subrequestBudget <= 0) break;
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

    const { entityType, position } = normalizeRole(t.RoleEnd);
    const postId = `lp-${t.Date}-${playerSlug}-${targetTeam.short.toLowerCase()}`;
    if (existingPostIds.has(postId)) {
      skipped++;
      continue;
    }
    existingPostIds.add(postId);
    subrequestBudget--;

    const ok = await publishEventWithFallback(env, {
      postId,
      entityType,
      position,
      playerSlug,
      playerName,
      currentTeamShort: TEAM_NAME_TO_SHORT[t.TeamStart]?.short || "FA",
      targetTeamId: targetTeam.id,
      targetTeamShort: targetTeam.short,
      league: targetTeam.league,
      status,
      confidence,
      source: t.SourceSite || "Leaguepedia",
      author: t.SourceSite || "Leaguepedia",
      postUrl: t.SourceLink,
      rawText: `${playerName} -> ${targetTeam.short} (${t.SourceSite})`,
      summary: `${playerName} ${entityType === "COACH" ? "코칭스태프가" : "선수가"} 2027 시즌 ${targetTeam.short}에 합류할 예정입니다.`,
      summaryEn: `${playerName} is set to join ${targetTeam.short} for the 2027 season.`,
      summaryZh: `${playerName} 预计将在 2027 赛季加盟 ${targetTeam.short}。`,
      publishedAt: `${t.Date}T12:00:00+09:00`,
    });

    if (ok) published++;
    else skipped++;
  }

  // Also poll RosterChanges for official Join / Re-sign / Leave announcements
  const changesUrl =
    `https://lol.fandom.com/api.php?action=cargoquery&format=json&tables=RosterChanges` +
    `&fields=Date_Sort,Player,Team,Role,Direction,Source` +
    `&where=Date_Sort%3E=%27${since}%27+AND+(Direction=%27Join%27+OR+Direction=%27Re-sign%27+OR+Direction=%27Leave%27)` +
    `&order_by=Date_Sort+DESC&limit=50`;

  const chResp = await fetch(changesUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; HotStoveLeagueBot/1.0)" },
  });
  if (chResp.ok) {
    const chData: { cargoquery?: Array<{ title: Record<string, string> }> } = await chResp.json();
    for (const item of chData.cargoquery || []) {
      if (subrequestBudget <= 0) break;
      const t = item.title;
      const teamInfo = TEAM_NAME_TO_SHORT[t.Team];
      if (!teamInfo) continue;

      const playerName = cleanPlayerName(t.Player || "");
      const playerSlug = toSlug(playerName);
      const sourceUrl = (t.Source || "").split(";;;")[0].trim();
      if (!sourceUrl.startsWith("http")) continue;

      const dateStr = (t["Date Sort"] || since).slice(0, 10);
      const isLeave = t.Direction === "Leave";
      const { entityType, position } = normalizeRole(t.Role);
      const postId = `lp-official-${dateStr}-${playerSlug}-${teamInfo.short.toLowerCase()}-${isLeave ? "fa" : "join"}`;
      if (existingPostIds.has(postId)) {
        skipped++;
        continue;
      }
      existingPostIds.add(postId);
      subrequestBudget--;

      const ok = await publishEventWithFallback(env, {
        postId,
        entityType,
        position,
        playerSlug,
        playerName,
        currentTeamShort: isLeave ? teamInfo.short : "FA",
        targetTeamId: isLeave ? null : teamInfo.id,
        targetTeamShort: isLeave ? "FA" : teamInfo.short,
        league: teamInfo.league,
        status: isLeave ? "FA" : "CONFIRMED",
        confidence: 100,
        source: teamInfo.short,
        author: teamInfo.short,
        postUrl: sourceUrl,
        rawText: isLeave
          ? `[Official] ${playerName} parts ways with ${teamInfo.short}`
          : `[Official] ${playerName} joins ${teamInfo.short}`,
        summary: isLeave
          ? `[오피셜] ${teamInfo.short}, ${playerName} 계약 종료 공식 발표 (FA)`
          : `[오피셜] ${teamInfo.short}, ${playerName} 영입/재계약 공식 발표`,
        summaryEn: isLeave
          ? `[Official] ${teamInfo.short} officially parts ways with ${playerName} (FA).`
          : `[Official] ${teamInfo.short} officially signs/re-signs ${playerName} for 2027.`,
        summaryZh: isLeave
          ? `[官宣] ${teamInfo.short} 正式宣布与 ${playerName} 结束合约 (FA)。`
          : `[官宣] ${teamInfo.short} 正式宣布签下/续约 ${playerName}。`,
        publishedAt: `${dateStr}T12:00:00+09:00`,
      });
      if (ok) published++;
    }
  }

  return { fetched: rows.length, published, skipped };
}
