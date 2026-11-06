export interface RealNewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  author: string;
  snippet?: string;
}

const SEARCH_QUERIES = [
  { q: '"Sheep Esports" LoL (roster OR transfer OR verbal OR sources) when:14d', author: "Sheep Esports", source: "NEWS" },
  { q: '"LEC Wooloo" (sources OR verbal OR transfer) when:14d', author: "@LEC_Wooloo", source: "X" },
  { q: 'LCK (이적 OR 계약 OR FA OR 영입 OR 재계약) when:7d', author: "LCK Press", source: "NEWS" },
  { q: 'LPL (转会 OR 官宣 OR 选手 OR 续约) when:7d', author: "LPL Press", source: "PRESS" },
];

/**
 * Fetch real published articles from Google News RSS (zero API key / 100% free)
 */
export async function fetchRealRumorArticles(): Promise<RealNewsItem[]> {
  const articles: RealNewsItem[] = [];
  const seenUrls = new Set<string>();

  for (const query of SEARCH_QUERIES) {
    try {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query.q)}&hl=en-US&gl=US&ceid=US:en`;
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

        if (articles.length >= 10) break;
      }
    } catch (e) {
      console.error(`[News Crawler] Query failed (${query.q}):`, e);
    }

    if (articles.length >= 10) break;
  }

  return articles;
}
