---
name: hotstove-research
description: >-
  Use this skill when investigating LoL esports offseason rumors or official roster moves, verifying source URLs and publication dates, auditing 2026/2027 player and coach rosters in Supabase, syncing /rumors timelines, or maintaining the Cloudflare crawler.
---

# HotStoveLeague Research and Sync Workflow

Follow this end-to-end procedure whenever investigating transfers, auditing team rosters/coaches, or writing updates to Supabase.

## Step 1: Audit Existing Supabase State First

Before searching or inserting, query Supabase (`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from `.env.local`) to inspect current rows and prevent duplicates:

1. Check `teams` for exact `id`, `name`, `short_name`, `league`, and logo paths.
2. Check `players` (`id`, `slug`, `name`, `position`, `current_team_id`, `predicted_team_id`, `is_starter`, `status`, `confidence`, `source_url`) for affected players and any competing starter in the same `(team, position)`.
3. Check `coaches` (`id`, `team_id`, `predicted_team_id`, `role`, `predicted_role`, `name`, `status`, `source_url`).
4. Check `rumors` and `rumor_drafts` (`post_id`, `player_name`, `target_team_short`, `post_url`, `published_at`) so already recorded items are skipped or updated cleanly rather than duplicated.

## Step 2: Gather Verified Primary Sources

Use sources strictly in priority order:

1. **Leaguepedia Cargo API (Fastest way to obtain verified Sheep Esports / Official X URLs & exact dates)**
   - Query `tables=RosterRumors` (`Date,Player,TeamStart,TeamEnd,Status,SourceLink,SourceSite,NotHappening`) for recent rumors.
   - Query `tables=RosterChanges` (`Date_Sort,Player,Team,Role,Direction,Source`) for official `Join`, `Re-sign`, and `Leave` moves.
2. **Tier 0 / Tier 1 Search**
   - Targeted `search_web` queries using `site:sheepesports.com/en/articles`, `site:x.com/<TeamHandle>`, `site:inven.co.kr/webzine/news`, `site:m.sports.naver.com`, or `site:xportsnews.com`.
   - If `search_web` returns a grounding redirect URL, resolve its `Location` header to inspect the real destination URL.
   - If a result points to Reddit (`reddit.com`) or a secondary news aggregator (`rostermania.lol`, `egamersworld.com`, `esportnow.gg`, `dotesports.com`, `insider-gaming.com`, `ruliweb.com`), NEVER stop there: find the original Sheep Esports article or team X post referenced inside it, or check Leaguepedia `RosterRumors`/`RosterChanges` for the direct primary link.
3. **Tier 2 Verified Weibo Insiders**
   - When checking LPL/LCK rumors on Weibo, inspect only the 5 whitelisted insiders (`2266865584`, `2522098777`, `1992350413`, `5386924056`, `2600241232`) and official LPL club accounts in [weibo.ts](../../../crawler/src/weibo.ts).
   - Discard unrelated stream quotes, interviews, memes, or non-roster chatter.
4. **2026 Baseline Rosters, Coaches, and Logos Only**
   - Use `namu.wiki` and `liquipedia.net` strictly to verify 2026 season starters, subs, coaching staff, and team rebrands/promotions (e.g., `SGW` replacing `DFM`). Never attach `namu.wiki` links to 2027 rumor records.

## Step 3: Validate Every Candidate Before Writing

Verify every item against these checks before any DB mutation:

- **Individual URL**: Exact article/tweet/weibo post URL, never a homepage URL and never a guessed slug.
- **Exact Entity Match**: Confirm the post explicitly names the target player/coach and destination (never assign another teammate's announcement tweet, e.g. ShowMaker vs Smash, and never misread an anti-rumor warning).
- **Exact Article Date**: Set `published_at` to the publication date of the source article/post, never today's date unless published today. Reject 2020-2025 articles.
- **Exact Status & Confidence**:
  - `CONFIRMED` (`100`) ONLY for official team/league announcements (`Join`, `Re-sign`, official `FA` departure).
  - `RUMORED` (`90`) for Tier 1 press exclusives and Sheep Esports / Wooloo verbal agreement reports.
  - `RUMORED` (`75`) for Tier 2 verified Weibo insiders.

## Step 4: Apply Synchronized Updates to Supabase

1. **Update `players` or `coaches`**:
   - Set `predicted_team_id` (or `NULL` for `FA`), `status`, `confidence`, and `source_url`.
   - Handle `idx_team_pos_starter`: if inserting/promoting a starter causes `409` (`23505`), check whether the outgoing player moved (`predicted_team_id` changed) or demote the displaced sub to `is_starter: false` first.
   - If `409` hits `players_pkey` or `coaches_pkey`, report exact `setval` SQL for the user to run in Supabase SQL Editor.
   - If updating `teams` hits RLS `42501`, report the exact one-line `UPDATE teams ...` SQL.
2. **Sync `rumors` Simultaneously**:
   - Insert/upsert the matching row into `rumors` with deterministic `post_id` (e.g., `manual-YYYYMMDD-slug-team` or `lp-...`), `post_url`, `published_at` (article date), English author/team tags, and ALL three summaries: `summary` (Korean), `summary_en` (English), and `summary_zh` (Chinese).
   - Verify [app/rumors/page.tsx](../../../app/rumors/page.tsx) fallback sync does not expose stale items if a player/coach status is reverted to `STAY`.

## Step 5: Revalidate and Verify

1. Verify Supabase state by re-querying modified IDs across `players`, `coaches`, and `rumors`.
2. If Next.js dev/prod server is running locally, call `POST http://localhost:3000/api/revalidate` (check HTTP `200`; remember `GET` returns `405`).
3. If crawler files under `crawler/src/` changed:
   - Ensure worst-case `fetch()` calls stay well below 50 subrequests per Cloudflare Worker invocation.
   - Deploy with `cd crawler && npx wrangler deploy` and verify `/harvest` output + check recent `rumors` / `rumor_drafts` rows.
   - Never run `git push` unless explicitly instructed by the user.
