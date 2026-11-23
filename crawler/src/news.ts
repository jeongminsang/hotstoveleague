export interface RealNewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  author: string;
  snippet?: string;
}

interface SearchQuery {
  q: string;
  bingQ: string;
  author: string;
  source: string;
  hl: string;
  gl: string;
  ceid: string;
}

const SEARCH_QUERIES: SearchQuery[] = [
  {
    q: '"Sheep Esports" LoL (roster OR transfer OR verbal OR sources) when:7d',
    bingQ: '"Sheep Esports" LoL (sources OR verbal OR transfer OR roster)',
    author: "Sheep Esports",
    source: "NEWS",
    hl: "en-US",
    gl: "US",
    ceid: "US:en",
  },
  {
    q: '"LEC Wooloo" (sources OR verbal OR transfer) when:7d',
    bingQ: '"LEC Wooloo" (sources OR verbal OR transfer)',
    author: "@LEC_Wooloo",
    source: "X",
    hl: "en-US",
    gl: "US",
    ceid: "US:en",
  },
  {
    q: '(site:x.com/T1LoL OR site:x.com/GenG OR site:x.com/HLEofficial OR site:x.com/DplusKia OR site:x.com/KTRolsterLoL OR site:x.com/BNKFEARXLoL OR site:x.com/Brionesports OR site:x.com/DRX_LCK OR site:x.com/NS_RedForce OR site:x.com/DN_SOOPers) when:5d',
    bingQ: '(site:x.com/T1LoL OR site:x.com/GenG OR site:x.com/HLEofficial OR site:x.com/DplusKia OR site:x.com/KTRolsterLoL OR site:x.com/BNKFEARXLoL OR site:x.com/DRX_LCK OR site:x.com/NS_RedForce) (Welcome OR Farewell OR Contract OR Official)',
    author: "LCK Official X",
    source: "X",
    hl: "ko",
    gl: "KR",
    ceid: "KR:ko",
  },
  {
    q: '(site:x.com/G2esports OR site:x.com/FNATIC OR site:x.com/MovistarKOILoL OR site:x.com/KarmineCorp OR site:x.com/TeamVitality OR site:x.com/SKGaming OR site:x.com/HereticsLEC OR site:x.com/GIANTXLeague OR site:x.com/FlyQuest OR site:x.com/TeamLiquidLoL OR site:x.com/C9LoL OR site:x.com/ShopifyRebels) when:5d',
    bingQ: '(site:x.com/G2esports OR site:x.com/FNATIC OR site:x.com/KarmineCorp OR site:x.com/TeamVitality OR site:x.com/FlyQuest OR site:x.com/TeamLiquidLoL OR site:x.com/C9LoL) (Welcome OR Thank you OR Roster OR Official)',
    author: "Global Team Official X",
    source: "X",
    hl: "en-US",
    gl: "US",
    ceid: "US:en",
  },
  {
    q: "LCK (이적 OR 계약 OR FA OR 영입 OR 재계약) when:5d",
    bingQ: "LCK 스토브리그 (단독 OR 오피셜 OR 영입 OR 계약 종료)",
    author: "LCK Press",
    source: "NEWS",
    hl: "ko",
    gl: "KR",
    ceid: "KR:ko",
  },
  {
    q: '("召唤师Park" OR "涵艺" OR "恋恋红茶" OR "王玮晨" OR "_尧阿尧y_") (转会 OR 续约 OR 签约 OR 离队 OR Zeus OR T1 OR LPL) when:5d',
    bingQ: '("召唤师Park" OR "涵艺" OR "恋恋红茶" OR "王玮晨" OR "_尧阿尧y_") LPL 转会',
    author: "Weibo Insider",
    source: "WEIBO",
    hl: "zh-CN",
    gl: "CN",
    ceid: "CN:zh-Hans",
  },
  {
    q: "LPL (转会 OR 官宣 OR 续约 OR 自由人) when:5d",
    bingQ: "LPL (官宣 OR 转会 OR 续约 OR 离队)",
    author: "LPL Press",
    source: "PRESS",
    hl: "zh-CN",
    gl: "CN",
    ceid: "CN:zh-Hans",
  },
];

const MAX_PER_QUERY = 5;
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function parseRssItems(xmlText: string): Array<{ title: string; link: string; pubDate: string }> {
  const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g) || [];
  const results: Array<{ title: string; link: string; pubDate: string }> = [];

  for (const itemXml of itemMatches) {
    const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    if (!titleMatch || !linkMatch) continue;

    const rawTitle = titleMatch[1]
      .replace(/<!\[CDATA\[|\]\]>/g, "")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&")
      .trim();
    let rawLink = linkMatch[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();

    // Unwrap Bing News redirect url=... parameter if present
    const bingUrlParam = rawLink.match(/[?&]url=([^&]+)/);
    if (bingUrlParam) {
      try {
        rawLink = decodeURIComponent(bingUrlParam[1]);
      } catch {
        // keep rawLink
      }
    }

    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();
    results.push({ title: rawTitle, link: rawLink, pubDate });
  }
  return results;
}

/**
 * Fetch real published articles from Google News RSS + Bing News RSS fallback
 */
export async function fetchRealRumorArticles(): Promise<RealNewsItem[]> {
  const articles: RealNewsItem[] = [];
  const seenUrls = new Set<string>();

  for (const query of SEARCH_QUERIES) {
    let countForQuery = 0;
    try {
      const gUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query.q)}&hl=${query.hl}&gl=${query.gl}&ceid=${query.ceid}`;
      let parsedItems: Array<{ title: string; link: string; pubDate: string }> = [];

      const gRes = await fetch(gUrl, {
        headers: {
          "User-Agent": BROWSER_UA,
          Accept: "application/rss+xml, application/xml, text/xml, */*",
        },
      });
      if (gRes.ok) {
        parsedItems = parseRssItems(await gRes.text());
      }

      // Fallback to Bing News RSS if Google News RSS returned 0 items
      if (parsedItems.length === 0) {
        const bUrl = `https://www.bing.com/news/search?q=${encodeURIComponent(query.bingQ)}&format=rss`;
        const bRes = await fetch(bUrl, {
          headers: {
            "User-Agent": BROWSER_UA,
            Accept: "application/rss+xml, application/xml, text/xml, */*",
          },
        });
        if (bRes.ok) {
          parsedItems = parseRssItems(await bRes.text());
        }
      }

      for (const item of parsedItems) {
        if (
          /\b\d+\s*[-–]\s*\d+\b/.test(item.title) &&
          !/sources|verbal|transfer|roster|단독|오피셜|영입|계약/i.test(item.title)
        ) {
          continue;
        }

        if (seenUrls.has(item.link)) continue;
        seenUrls.add(item.link);

        const matchToken = item.link.match(/articles\/([^?]+)/);
        const postId = matchToken
          ? `gnews-${matchToken[1].slice(0, 32)}`
          : `news-${btoa(encodeURIComponent(item.link)).replace(/[^a-zA-Z0-9]/g, "").slice(-28)}`;

        let isoDate = new Date().toISOString();
        const cutoffMs = Date.now() - 7 * 24 * 60 * 60 * 1000;
        try {
          const d = new Date(item.pubDate);
          if (!isNaN(d.getTime())) {
            if (d.getTime() < cutoffMs) continue;
            isoDate = d.toISOString();
          }
        } catch {
          // keep current time
        }

        articles.push({
          id: postId,
          title: item.title,
          link: item.link,
          pubDate: isoDate,
          source: query.source,
          author: query.author,
        });

        countForQuery++;
        if (countForQuery >= MAX_PER_QUERY) break;
      }
    } catch (e) {
      console.error(`[News Crawler] Query failed (${query.q}):`, e);
    }
  }

  return articles;
}
