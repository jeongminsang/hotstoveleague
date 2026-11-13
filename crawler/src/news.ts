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
  author: string;
  source: string;
  hl: string;
  gl: string;
  ceid: string;
}

const SEARCH_QUERIES: SearchQuery[] = [
  {
    q: '"Sheep Esports" LoL (roster OR transfer OR verbal OR sources) when:7d',
    author: "Sheep Esports",
    source: "NEWS",
    hl: "en-US",
    gl: "US",
    ceid: "US:en",
  },
  {
    q: '"LEC Wooloo" (sources OR verbal OR transfer) when:7d',
    author: "@LEC_Wooloo",
    source: "X",
    hl: "en-US",
    gl: "US",
    ceid: "US:en",
  },
  {
    q: 'LCK (이적 OR 계약 OR FA OR 영입 OR 재계약) when:5d',
    author: "LCK Press",
    source: "NEWS",
    hl: "ko",
    gl: "KR",
    ceid: "KR:ko",
  },
  {
    q: '("召唤师Park" OR "涵艺" OR "恋恋红茶" OR "王玮晨") (转会 OR 续约 OR 签约 OR 离队 OR Zeus OR T1 OR LPL) when:5d',
    author: "Weibo Insider",
    source: "WEIBO",
    hl: "zh-CN",
    gl: "CN",
    ceid: "CN:zh-Hans",
  },
  {
    q: 'LPL (转会 OR 官宣 OR 续约 OR 自由人) when:5d',
    author: "LPL Press",
    source: "PRESS",
    hl: "zh-CN",
    gl: "CN",
    ceid: "CN:zh-Hans",
  },
];

const MAX_PER_QUERY = 5;

/**
 * Fetch real published articles from Google News RSS (zero API key / 100% free)
 */
export async function fetchRealRumorArticles(): Promise<RealNewsItem[]> {
  const articles: RealNewsItem[] = [];
  const seenUrls = new Set<string>();

  for (const query of SEARCH_QUERIES) {
    let countForQuery = 0;
    try {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query.q)}&hl=${query.hl}&gl=${query.gl}&ceid=${query.ceid}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "HotStoveCrawler/2.0" },
      });

      if (!res.ok) continue;

      const xmlText = await res.text();
      // Fast XML parsing for <item> nodes in Cloudflare Worker environment
      const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g) || [];

      for (const itemXml of itemMatches) {
        const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/);
        const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/);
        const pubDateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/);

        if (!titleMatch || !linkMatch) continue;

        const rawTitle = titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
        const rawLink = linkMatch[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim();
        const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();

        // Filter out academy match result scoreboards (e.g. "vs ... 1-2")
        if (/\b\d+\s*[-–]\s*\d+\b/.test(rawTitle) && !/sources|verbal|transfer|roster/i.test(rawTitle)) {
          continue;
        }

        if (seenUrls.has(rawLink)) continue;
        seenUrls.add(rawLink);

        // Deterministic post_id from Google News link token
        const matchToken = rawLink.match(/articles\/([^?]+)/);
        const postId = matchToken ? `gnews-${matchToken[1].slice(0, 32)}` : `gnews-${Date.now()}`;

        articles.push({
          id: postId,
          title: rawTitle,
          link: rawLink,
          pubDate: new Date(pubDate).toISOString(),
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
