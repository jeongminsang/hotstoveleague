import { Env, CandidateDraft } from "./types";
import { RealNewsItem } from "./news";
import { parseRealNewsWithGemini } from "./gemini";
import { autoPublishCandidateDraft } from "./leaguepedia";
import { getSupabaseClient, filterExistingDrafts, insertRumorDrafts } from "./supabase";

export interface WeiboTarget {
  uid: string;
  author: string;
  authorEn: string;
  isOfficialTeam?: boolean;
  teamShort?: string;
}

/**
 * 5 Tier-1 Weibo Insiders + LPL Official Team Weibo Accounts
 */
export const WEIBO_INSIDER_TARGETS: WeiboTarget[] = [
  { uid: "2266865584", author: "恋恋红茶_244", authorEn: "Red Tea (@恋恋红茶_244)" },
  { uid: "2522098777", author: "召唤师Park", authorEn: "Summoner Park (@召唤师Park)" },
  { uid: "1992350413", author: "丶涵艺", authorEn: "Hanyi (@丶涵艺)" },
  { uid: "5386924056", author: "王玮晨", authorEn: "Wang Weichen (@王玮晨)" },
  { uid: "2600241232", author: "_尧阿尧y_", authorEn: "Xichan Agent (@_尧阿尧y_)" },
];

export const WEIBO_OFFICIAL_TEAM_TARGETS: WeiboTarget[] = [
  { uid: "5926660141", author: "BLG电子竞技俱乐部", authorEn: "BLG Official Weibo", isOfficialTeam: true, teamShort: "BLG" },
  { uid: "5449734852", author: "滔搏电子竞技俱乐部", authorEn: "TES Official Weibo", isOfficialTeam: true, teamShort: "TES" },
  { uid: "6174976862", author: "JDG京东电子竞技俱乐部", authorEn: "JDG Official Weibo", isOfficialTeam: true, teamShort: "JDG" },
  { uid: "5937903233", author: "WBG英雄联盟分部", authorEn: "WBG Official Weibo", isOfficialTeam: true, teamShort: "WBG" },
  { uid: "2099708877", author: "iG电子竞技俱乐部", authorEn: "IG Official Weibo", isOfficialTeam: true, teamShort: "IG" },
  { uid: "5235726837", author: "EDG电子竞技俱乐部", authorEn: "EDG Official Weibo", isOfficialTeam: true, teamShort: "EDG" },
  { uid: "5628492638", author: "LNG九号电动电子竞技俱乐部", authorEn: "LNG Official Weibo", isOfficialTeam: true, teamShort: "LNG" },
  { uid: "5042958097", author: "AL英雄联盟", authorEn: "AL Official Weibo", isOfficialTeam: true, teamShort: "AL" },
];

const TRANSFER_KEYWORD_REGEX =
  /(转会|冬转|续约|官宣|签约|加盟|离队|自由人|解约|恢复自由身份|人员变动|主教练|曝|爆料|接触|试训|买断|转会费|阵容)/i;
const EXCLUDE_NOISE_REGEX = /(AI短剧|AI短片|表情包|音乐缘计划|庆功饭堂|被开卡车)/i;

function cleanWeiboHtml(htmlText: string): string {
  return htmlText
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function getWeiboGuestCookie(): Promise<{ sub: string; subp: string } | null> {
  try {
    const res = await fetch("https://visitor.passport.weibo.cn/visitor/genvisitor2", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
      },
      body: "cb=visitor_gray_callback&tid=&from=weibo",
    });
    if (!res.ok) return null;
    const text = await res.text();
    const match = text.match(/visitor_gray_callback\((.*)\)/);
    if (!match) return null;
    const json = JSON.parse(match[1]);
    const sub = json?.data?.sub;
    const subp = json?.data?.subp || "";
    return sub ? { sub, subp } : null;
  } catch {
    return null;
  }
}

export async function runWeiboDirectHarvest(env: Env): Promise<{
  accountsChecked: number;
  postsMatched: number;
  saved: number;
  autoPublished: number;
}> {
  if (!env.GEMINI_API_KEY || !env.SUPABASE_URL || !env.SUPABASE_KEY) {
    return { accountsChecked: 0, postsMatched: 0, saved: 0, autoPublished: 0 };
  }

  const cookie = await getWeiboGuestCookie();
  if (!cookie) {
    return { accountsChecked: 0, postsMatched: 0, saved: 0, autoPublished: 0 };
  }

  // Rotate Official teams by current hour (2 per run) to stay well within Cloudflare 50 subrequest limit
  const slot = (new Date().getUTCHours() % 4) * 2;
  const officialSlice = WEIBO_OFFICIAL_TEAM_TARGETS.slice(slot, slot + 2);
  const targets = [...WEIBO_INSIDER_TARGETS, ...officialSlice];

  const matchedPosts: RealNewsItem[] = [];
  const cutoffMs = Date.now() - 3 * 24 * 60 * 60 * 1000;

  for (const target of targets) {
    try {
      const url = `https://m.weibo.cn/api/container/getIndex?type=uid&value=${target.uid}&containerid=107603${target.uid}`;
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
          Cookie: `SUB=${cookie.sub}; SUBP=${cookie.subp};`,
          Referer: `https://m.weibo.cn/u/${target.uid}`,
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      if (!res.ok) continue;

      const json = (await res.json()) as any;
      const cards = json?.data?.cards || [];

      let perAccountCount = 0;
      for (const card of cards.slice(0, 6)) {
        const mblog = card?.mblog;
        if (!mblog || (!mblog.bid && !mblog.id)) continue;

        const text = cleanWeiboHtml(mblog.raw_text || mblog.text || "");
        if (!text || !TRANSFER_KEYWORD_REGEX.test(text) || EXCLUDE_NOISE_REGEX.test(text)) continue;

        const createdDate = mblog.created_at ? new Date(mblog.created_at) : new Date();
        if (!isNaN(createdDate.getTime()) && createdDate.getTime() < cutoffMs) continue;

        const bid = mblog.bid || mblog.mblogid || mblog.id;
        matchedPosts.push({
          id: `wb-${target.uid}-${bid}`,
          title: text.slice(0, 220),
          link: `https://weibo.com/${target.uid}/${bid}`,
          pubDate: !isNaN(createdDate.getTime()) ? createdDate.toISOString() : new Date().toISOString(),
          source: "WEIBO",
          author: target.authorEn,
        });
        perAccountCount++;
        if (perAccountCount >= 2) break;
      }
    } catch (e) {
      console.error(`[Weibo Crawler] Failed for ${target.author}:`, e);
    }
  }

  if (matchedPosts.length === 0) {
    return { accountsChecked: targets.length, postsMatched: 0, saved: 0, autoPublished: 0 };
  }

  const supabase = getSupabaseClient(env);
  const preCandidates = matchedPosts.map((p) => ({ post_id: p.id } as CandidateDraft));
  const unseenIds = new Set((await filterExistingDrafts(supabase, preCandidates)).map((d) => d.post_id));
  const unseenPosts = matchedPosts.filter((p) => unseenIds.has(p.id)).slice(0, 3);

  if (unseenPosts.length === 0) {
    return {
      accountsChecked: targets.length,
      postsMatched: matchedPosts.length,
      saved: 0,
      autoPublished: 0,
    };
  }

  const candidates: CandidateDraft[] = [];
  let autoPublished = 0;

  for (const post of unseenPosts) {
    const parsed = await parseRealNewsWithGemini(env.GEMINI_API_KEY, post);
    if (parsed) {
      candidates.push(parsed);
      const pubOk = await autoPublishCandidateDraft(env, parsed);
      if (pubOk) autoPublished++;
    }
  }

  if (candidates.length === 0) {
    return {
      accountsChecked: targets.length,
      postsMatched: matchedPosts.length,
      saved: 0,
      autoPublished,
    };
  }

  const saved = await insertRumorDrafts(supabase, candidates);
  return {
    accountsChecked: targets.length,
    postsMatched: matchedPosts.length,
    saved,
    autoPublished,
  };
}
