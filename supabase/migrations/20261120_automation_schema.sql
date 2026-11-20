-- ============================================================================
-- HotStoveLeague Automation & Single-Source-of-Truth Migration (2026-11-20)
-- Run this in Supabase SQL Editor.
-- ============================================================================

-- 1. Schema enhancements for coaches & rumors
ALTER TABLE coaches
  ADD COLUMN IF NOT EXISTS predicted_role TEXT;

ALTER TABLE rumors
  ADD COLUMN IF NOT EXISTS entity_type TEXT NOT NULL DEFAULT 'PLAYER',
  ADD COLUMN IF NOT EXISTS coach_id INTEGER REFERENCES coaches(id);

-- 2. Rule-engine metadata tables
CREATE TABLE IF NOT EXISTS source_tiers (
  id SERIAL PRIMARY KEY,
  source_key TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  tier INTEGER NOT NULL CHECK (tier BETWEEN 0 AND 3),
  default_confidence INTEGER NOT NULL CHECK (default_confidence BETWEEN 0 AND 100),
  auto_publish BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO source_tiers (source_key, display_name, tier, default_confidence, auto_publish)
VALUES
  ('leaguepedia_official', 'Leaguepedia (Official)', 0, 100, true),
  ('team_official_x', 'Team Official X', 0, 100, true),
  ('sheep_esports', 'Sheep Esports', 1, 90, true),
  ('kukmin_ilbo', 'Kukmin Ilbo', 1, 90, true),
  ('inven', 'Inven', 1, 90, true),
  ('xportsnews', 'Xportsnews', 1, 90, true),
  ('weibo_insider', 'Weibo Insider', 2, 75, false),
  ('community', 'Community (Arca/FMKorea)', 3, 40, false)
ON CONFLICT (source_key) DO NOTHING;

CREATE TABLE IF NOT EXISTS entity_aliases (
  id SERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('TEAM', 'PLAYER', 'COACH')),
  alias TEXT NOT NULL,
  canonical_slug TEXT NOT NULL,
  team_id INTEGER REFERENCES teams(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (entity_type, alias)
);

CREATE TABLE IF NOT EXISTS crawler_runs (
  id SERIAL PRIMARY KEY,
  source_name TEXT NOT NULL,
  fetched_count INTEGER NOT NULL DEFAULT 0,
  published_count INTEGER NOT NULL DEFAULT 0,
  drafted_count INTEGER NOT NULL DEFAULT 0,
  skipped_count INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  ran_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Status priority helper (monotonic upgrade: never overwrite higher-tier status)
CREATE OR REPLACE FUNCTION status_rank(s TEXT)
RETURNS INTEGER
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE UPPER(COALESCE(s, 'STAY'))
    WHEN 'CONFIRMED' THEN 100
    WHEN 'VERBAL' THEN 90
    WHEN 'RUMORED' THEN 70
    WHEN 'FA' THEN 50
    WHEN 'SPECULATION' THEN 40
    WHEN 'STAY' THEN 10
    ELSE 0
  END;
$$;

-- 4. Atomic publish RPC: inserts into rumors + updates players/coaches in one transaction
CREATE OR REPLACE FUNCTION publish_transfer_event(
  p_post_id TEXT,
  p_entity_type TEXT,
  p_player_slug TEXT,
  p_player_name TEXT,
  p_current_team_short TEXT,
  p_target_team_id INTEGER,
  p_target_team_short TEXT,
  p_league TEXT,
  p_status TEXT,
  p_confidence INTEGER,
  p_source TEXT,
  p_author TEXT,
  p_post_url TEXT,
  p_raw_text TEXT,
  p_summary TEXT,
  p_summary_en TEXT,
  p_summary_zh TEXT,
  p_published_at TIMESTAMPTZ
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_player_id INTEGER;
  v_curr_status TEXT;
  v_curr_conf INTEGER;
  v_new_rank INTEGER := status_rank(p_status);
  v_curr_rank INTEGER;
  v_rumor_id INTEGER;
BEGIN
  -- Deduplicate by post_id
  IF EXISTS (SELECT 1 FROM rumors WHERE post_id = p_post_id) THEN
    RETURN jsonb_build_object('action', 'skipped', 'reason', 'duplicate_post_id');
  END IF;

  IF UPPER(p_entity_type) = 'PLAYER' THEN
    SELECT id, status, confidence
      INTO v_player_id, v_curr_status, v_curr_conf
      FROM players
     WHERE slug = p_player_slug
     LIMIT 1;

    IF v_player_id IS NULL THEN
      RETURN jsonb_build_object('action', 'draft_needed', 'reason', 'unknown_player');
    END IF;

    v_curr_rank := status_rank(v_curr_status);
    IF v_new_rank < v_curr_rank OR (v_new_rank = v_curr_rank AND p_confidence < COALESCE(v_curr_conf, 0)) THEN
      RETURN jsonb_build_object('action', 'skipped', 'reason', 'lower_priority_than_current');
    END IF;

    UPDATE players
       SET predicted_team_id = p_target_team_id,
           status = UPPER(p_status),
           confidence = p_confidence,
           source_url = p_post_url,
           updated_at = NOW()
     WHERE id = v_player_id;
  END IF;

  INSERT INTO rumors (
    post_id, entity_type, player_id, player_slug, player_name,
    current_team_short, target_team_id, target_team_short,
    league, confidence, source, author, post_url,
    raw_text, summary, summary_en, summary_zh, published_at
  ) VALUES (
    p_post_id, UPPER(p_entity_type), v_player_id, p_player_slug, p_player_name,
    p_current_team_short, p_target_team_id, p_target_team_short,
    p_league, p_confidence, LEFT(p_source, 20), p_author, p_post_url,
    p_raw_text, p_summary, p_summary_en, p_summary_zh, p_published_at
  )
  RETURNING id INTO v_rumor_id;

  RETURN jsonb_build_object('action', 'published', 'rumor_id', v_rumor_id, 'player_id', v_player_id);
END;
$$;

-- 5. RLS Hardening: Public read-only, writes via service_role only
ALTER TABLE source_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE crawler_runs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on source_tiers" ON source_tiers;
CREATE POLICY "Allow public read on source_tiers" ON source_tiers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read on entity_aliases" ON entity_aliases;
CREATE POLICY "Allow public read on entity_aliases" ON entity_aliases FOR SELECT USING (true);

-- Note: Remove permissive public INSERT/UPDATE policies on players, coaches, rumors once
-- Cloudflare Worker & admin scripts switch to SUPABASE_SERVICE_ROLE_KEY.
