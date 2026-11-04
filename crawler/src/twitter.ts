import { RawRumor } from "./types";

const TWITTER_TARGETS = [
  { handle: "LEC_Wooloo", author: "LEC_Wooloo" },
  { handle: "midnoflash", author: "윤민섭" },
  { handle: "kenzi131", author: "켄지(김용우)" },
];

export async function fetchTwitterRumors(): Promise<RawRumor[]> {
  const results: RawRumor[] = [];

  for (const target of TWITTER_TARGETS) {
    try {
      const url = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${target.handle}`;
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)",
        },
      });

      if (!response.ok) {
        console.warn(`[Twitter] Failed to fetch @${target.handle}: ${response.status}`);
        continue;
      }

      const html = await response.text();
      const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
      if (!match) {
        console.warn(`[Twitter] __NEXT_DATA__ not found for @${target.handle}`);
        continue;
      }

      const jsonData = JSON.parse(match[1]);
      const entries = jsonData.props?.pageProps?.timeline?.entries || [];

      for (const entry of entries) {
        const tweet = entry.content?.tweet;
        if (!tweet || !tweet.id_str || !tweet.text) continue;

        results.push({
          postId: `tw_${tweet.id_str}`,
          source: "TWITTER",
          author: target.author,
          text: tweet.text.trim(),
          postUrl: `https://twitter.com/${target.handle}/status/${tweet.id_str}`,
          publishedAt: new Date(tweet.created_at).toISOString(),
        });
      }
    } catch (err) {
      console.error(`[Twitter] Error scraping @${target.handle}:`, err);
    }
  }

  return results;
}

