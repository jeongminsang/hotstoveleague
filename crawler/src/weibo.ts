import { RawRumor } from "./types";

const WEIBO_TARGETS = [
  { uid: "60171180", author: "丶涵艺" },
  // { uid: "758673838", author: "恋恋红茶_244" },
];

function cleanWeiboHtml(htmlText: string): string {
  return htmlText
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export async function fetchWeiboRumors(subCookie?: string): Promise<RawRumor[]> {
  const results: RawRumor[] = [];

  for (const target of WEIBO_TARGETS) {
    try {
      const containerId = `107603${target.uid}`;
      const url = `https://m.weibo.cn/api/container/getIndex?containerid=${containerId}`;

      const headers: Record<string, string> = {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
        "Referer": `https://m.weibo.cn/u/${target.uid}`,
        "Accept": "application/json, text/plain, */*",
      };

      if (subCookie) {
        headers["Cookie"] = `SUB=${subCookie};`;
      }

      const response = await fetch(url, { headers });
      if (!response.ok) {
        console.warn(`[Weibo] Request failed for uid ${target.uid}: ${response.status}`);
        continue;
      }

      const json = await response.json<any>();
      const cards = json?.data?.cards || [];

      for (const card of cards) {
        const mblog = card?.mblog;
        if (!mblog || !mblog.id || !mblog.text) continue;

        const rawText = cleanWeiboHtml(mblog.raw_text || mblog.text);
        const createdAt = mblog.created_at ? new Date(mblog.created_at).toISOString() : new Date().toISOString();

        results.push({
          postId: `wb_${mblog.id}`,
          source: "WEIBO",
          author: target.author,
          text: rawText,
          postUrl: `https://m.weibo.cn/status/${mblog.mid || mblog.id}`,
          publishedAt: createdAt,
        });
      }
    } catch (err) {
      console.error(`[Weibo] Error scraping uid ${target.uid}:`, err);
    }
  }

  return results;
}

