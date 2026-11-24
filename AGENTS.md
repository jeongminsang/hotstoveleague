# HotStoveLeague Project Rules

Global League of Legends esports offseason & roster tracker (`LCK`, `LPL`, `LEC`, `LCS`, `LCP`, `CBLOL`).
Every roster, coach, rumor, and crawler change MUST follow these rules strictly.

## 1. Source Verification & Domain Policy

Only cite and store evidence from verified primary sources mapped to `source_tiers`:

- **Tier 0 - Official (`CONFIRMED`, `100%`)**
  - Official team and league X (Twitter) accounts (e.g., `@T1LoL`, `@GenG`, `@HLEofficial`, `@DplusKia`, `@KTRolsterLoL`, `@BNKFEARXLoL`, `@SOOPers_LoL`, `@Brionesports`, `@DRX_LCK`, `@NS_RedForce`, `@G2esports`, `@FNATIC`, `@KarmineCorp`, `@MovistarKOILoL`, `@HereticsLEC`, `@GIANTXLeague`, `@LCSOfficial`, `@paiNGamingBR`, `@Sentinels_LoL`).
  - Official LPL team Weibo accounts listed in `crawler/src/weibo.ts` (`BLG`, `TES`, `JDG`, `WBG`, `IG`, `EDG`, `LNG`, `AL`) and official team Facebook posts.
  - Leaguepedia (`lol.fandom.com`) `RosterChanges` (`Join` / `Re-sign` / `Leave`), provided the linked `Source` URL points to the real official post.
  - 4Gamers (`4gamers.com.tw`) for official LCP club announcements.
- **Tier 1 - Primary Media & Insiders (`RUMORED`, `90%`)**
  - **Sheep Esports**: `sheepesports.com`, `@Sheep_Esports`, `@LEC_Wooloo`.
  - **Korean Press**: Naver Sports / Kukmin Ilbo (`m.sports.naver.com`), Xportsnews (`xportsnews.com`), and **Inven News Webzine** (`inven.co.kr/webzine/news/` reporter articles only, never user boards).
  - **Leaguepedia `RosterRumors`**: Only entries backed by a Tier 0 or Tier 1 primary `SourceLink`.
- **Tier 2 - Verified Weibo Insiders (`RUMORED`, `75%`)**
  - Strictly limited to the 5 insiders configured in `crawler/src/weibo.ts`:
    1. Red Tea (`2266865584`)
    2. Summoner Park (`2522098777`)
    3. Hanyi (`1992350413`)
    4. Wang Weichen (`5386924056`)
    5. Xichan Agent (`2600241232`)
  - Reject casual stream clips, interviews, memes, or non-transfer chatter even from Tier 2 accounts.
- **Tier 3 - Community (`40%`, explicit user instruction only)**
  - `arca.live`, `fmkorea.com`, or Korean galleries are NEVER used automatically. Add only when explicitly requested by the user. Format `author` concisely as the domain/site token (e.g., `arca`), not a localized phrase.
- **Baseline Reference Only (Never Use as Rumor/Official Proof)**
  - `namu.wiki` and `liquipedia.net` may ONLY be used to verify **2026 baseline rosters, coaching staff, starter/sub status, and team logos/renames**. NEVER store `namu.wiki` or `liquipedia.net` as `source_url` or `post_url` for 2027 rumors/transfers (except rare verified historical team departure lookups when no primary post is reachable and the user approves).
- **Forbidden / Trace-Back-Only Domains**
  - NEVER use `rostermania.lol`, `egamersworld.com`, `esportnow.gg`, `insider-gaming.com`, `dotesports.com`, `reddit.com`, `ruliweb.com`, Inven community boards, or `youtube.com` as final `source_url` / `post_url`.
  - If a search hit comes from a secondary aggregator or Reddit thread, always trace through to the cited primary article/tweet (`sheepesports.com`, `@Sheep_Esports`, official team X, `inven.co.kr/webzine/news/`, `m.sports.naver.com`, etc.). If unreachable, report the gap instead of substituting a secondary URL.

## 2. Link, Date, and Classification Integrity

1. **Exact Item URLs Only**: Never store root domains (e.g., `https://www.sheepesports.com/`) or fabricated/guessed URL slugs. Verify redirect targets and check that the article does not 404.
2. **Entity & Content Cross-Check**: Confirm the linked post actually discusses the exact player/coach and move (watch out for multi-player posts assigning the wrong tweet, or anti-rumor club statements misread as transfers).
3. **Article Date for `published_at`**: Always use the original publication date of the source article/post, NEVER today's task execution timestamp. Filter out stale prior-season articles (e.g., 2020-2025 results).
4. **Status vs Confidence**:
   - Official team announcement = `CONFIRMED` (`100`).
   - Credible press / verbal agreement report = `RUMORED` (`90`), NEVER `CONFIRMED`.
   - Verified Weibo insider = `RUMORED` (`75`).

## 3. Database & Synchronization Rules (Supabase)

Supabase is the single source of truth. Never hardcode roster/coach overrides in frontend files (`lib/coaches-data.ts`, `lib/rumors-data.ts`).

1. **Roster Board <-> `/rumors` Synchronization**: Every transfer, renewal, FA departure, or coach update MUST stay synchronized across `players`/`coaches` AND `rumors` (plus `app/rumors/page.tsx` fallback sync). Before inserting, check for existing `post_id` and player/team duplicates.
2. **Strict 2026 vs 2027 Separation**:
   - Players: `current_team_id` = 2026 season team; `predicted_team_id` = 2027 projected team (`NULL` when `FA`).
   - Coaches: `team_id` = 2026 season team; `predicted_team_id` = 2027 projected team (`NULL` when `FA`); keep `role` vs `predicted_role` distinct.
3. **Slot & Starter Integrity (`idx_team_pos_starter`)**:
   - When a starter leaves via transfer rumor/official move (`predicted_team_id` changes), ensure they do not block the incoming replacement on their old team or get stuck with `is_starter: false` if they are the primary starter.
   - Verify true starters vs subs so active 2026/2027 starters render on team cards.
4. **Multilingual & Display Rules**:
   - Headlines, author names, player IDs (`name` only, never `real_name` in UI), and team names stay consistent in English across locales (`EN -> KO -> ZH` order).
   - Every `rumors` entry MUST populate all three summary fields: `summary` (Korean), `summary_en` (English), and `summary_zh` (Chinese).
5. **Logos & Revalidation**:
   - Store verified icon-only logos under `public/logos/<short>.(svg|png|webp)` suited for light mode (`design.md`), sync `teams.light_logo_url`/`dark_logo_url`, and remove unused legacy files.
   - After DB updates, invalidate Next.js ISR cache via `POST /api/revalidate` (never `GET`, which returns `405`).
   - If `teams` RLS (`42501`) blocks REST updates or PK sequence conflicts (`23505`) occur, provide the minimal SQL Editor command (`UPDATE` / `setval`) to the user.

## 4. Crawler (`crawler/`) & Git Constraints

- **Cloudflare Workers Free Plan**: Maximum **50 subrequests (`fetch`) per invocation**. Preserve the even/odd UTC hour rotation in `crawler/src/index.ts` (`leaguepedia` + `inven` on even hours, `weibo` + `news` on odd hours), pre-fetch existing `post_id` keys before calling Gemini/RPC, and filter RSS items older than 7 days in `crawler/src/news.ts`.
- **No Paid X API / No Manual Cookies**: Use Google/Bing RSS + Leaguepedia for X sources and anonymous guest `SUB` cookies via `genvisitor2` in `crawler/src/weibo.ts`.
- **Git Discipline**: Never run `git push` unless the user explicitly asks to push.
