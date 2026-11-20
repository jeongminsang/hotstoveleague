-- ============================================================================
-- Dynamic Source Tier Sync Migration (2026-11-20)
-- Run this in Supabase SQL Editor.
-- ============================================================================

-- 1. Link rumors & players to source_tiers(source_key)
ALTER TABLE rumors
  ADD COLUMN IF NOT EXISTS source_key TEXT REFERENCES source_tiers(source_key);

ALTER TABLE players
  ADD COLUMN IF NOT EXISTS source_key TEXT REFERENCES source_tiers(source_key);

-- 2. Backfill source_key on existing rumors based on source / post_url / confidence
UPDATE rumors
SET source_key = CASE
  WHEN confidence = 100 OR summary LIKE '[오피셜]%' THEN 'team_official_x'
  WHEN LOWER(COALESCE(source, '')) LIKE '%sheep%' OR LOWER(COALESCE(post_url, '')) LIKE '%sheepesports%' THEN 'sheep_esports'
  WHEN LOWER(COALESCE(source, '')) LIKE '%kukmin%' OR LOWER(COALESCE(post_url, '')) LIKE '%sports.naver%' THEN 'kukmin_ilbo'
  WHEN LOWER(COALESCE(source, '')) LIKE '%inven%' OR LOWER(COALESCE(post_url, '')) LIKE '%inven.co.kr%' THEN 'inven'
  WHEN LOWER(COALESCE(source, '')) LIKE '%xports%' OR LOWER(COALESCE(post_url, '')) LIKE '%xportsnews%' THEN 'xportsnews'
  WHEN LOWER(COALESCE(source, '')) LIKE '%arca%' OR LOWER(COALESCE(post_url, '')) LIKE '%arca.live%' THEN 'community'
  ELSE 'weibo_insider'
END
WHERE source_key IS NULL;

-- Backfill source_key on existing players based on status / source_url
UPDATE players
SET source_key = CASE
  WHEN status = 'CONFIRMED' THEN 'team_official_x'
  WHEN LOWER(COALESCE(source_url, '')) LIKE '%sheepesports%' THEN 'sheep_esports'
  WHEN LOWER(COALESCE(source_url, '')) LIKE '%sports.naver%' THEN 'kukmin_ilbo'
  WHEN LOWER(COALESCE(source_url, '')) LIKE '%inven.co.kr%' THEN 'inven'
  WHEN LOWER(COALESCE(source_url, '')) LIKE '%xportsnews%' THEN 'xportsnews'
  WHEN LOWER(COALESCE(source_url, '')) LIKE '%arca.live%' THEN 'community'
  WHEN status = 'RUMORED' THEN 'weibo_insider'
  ELSE NULL
END
WHERE source_key IS NULL AND status IN ('CONFIRMED', 'RUMORED');

-- 3. Normalize existing confidence values to match source_tiers.default_confidence
UPDATE rumors r
SET confidence = st.default_confidence
FROM source_tiers st
WHERE r.source_key = st.source_key
  AND r.confidence IS DISTINCT FROM st.default_confidence;

UPDATE players p
SET confidence = st.default_confidence
FROM source_tiers st
WHERE p.source_key = st.source_key
  AND p.confidence IS DISTINCT FROM st.default_confidence;

-- 4. Trigger: whenever source_tiers.default_confidence changes, auto-sync rumors & players
CREATE OR REPLACE FUNCTION sync_tier_confidence()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.default_confidence IS DISTINCT FROM OLD.default_confidence THEN
    UPDATE rumors
       SET confidence = NEW.default_confidence
     WHERE source_key = NEW.source_key;

    UPDATE players
       SET confidence = NEW.default_confidence,
           updated_at = NOW()
     WHERE source_key = NEW.source_key;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_sync_tier_confidence ON source_tiers;
CREATE TRIGGER trg_sync_tier_confidence
AFTER UPDATE OF default_confidence ON source_tiers
FOR EACH ROW
EXECUTE FUNCTION sync_tier_confidence();
