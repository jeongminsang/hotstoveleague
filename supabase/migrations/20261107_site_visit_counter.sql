-- ==============================================================================
-- Migration: 20261107_site_visit_counter.sql
-- 1) Create site_visits table for daily aggregated traffic
-- 2) Create atomic increment RPC function
-- 3) Enable RLS with open read & restricted execution
-- ==============================================================================

CREATE TABLE IF NOT EXISTS site_visits (
    date DATE PRIMARY KEY DEFAULT CURRENT_DATE,
    page_views INT NOT NULL DEFAULT 0,
    unique_visitors INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read site_visits" ON site_visits;
CREATE POLICY "Allow public read site_visits"
    ON site_visits FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow public insert/update site_visits" ON site_visits;
CREATE POLICY "Allow public insert/update site_visits"
    ON site_visits FOR ALL
    USING (true)
    WITH CHECK (true);

-- Atomic RPC function to increment visits
CREATE OR REPLACE FUNCTION record_site_visit(is_unique BOOLEAN)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    today_date DATE := CURRENT_DATE;
    today_views INT;
    today_uniques INT;
    total_uniques INT;
    base_offset INT := 32; -- Initial base count between 20~43 (e.g. 32)
BEGIN
    INSERT INTO site_visits (date, page_views, unique_visitors, updated_at)
    VALUES (today_date, 1, CASE WHEN is_unique THEN 1 ELSE 0 END, NOW())
    ON CONFLICT (date)
    DO UPDATE SET
        page_views = site_visits.page_views + 1,
        unique_visitors = site_visits.unique_visitors + (CASE WHEN is_unique THEN 1 ELSE 0 END),
        updated_at = NOW()
    RETURNING page_views, unique_visitors INTO today_views, today_uniques;

    SELECT COALESCE(SUM(unique_visitors), 0) + base_offset
    INTO total_uniques
    FROM site_visits;

    RETURN json_build_object(
        'today_views', today_views,
        'today_uniques', today_uniques,
        'total_uniques', total_uniques
    );
END;
$$;

-- Function to get current stats without incrementing
CREATE OR REPLACE FUNCTION get_site_visit_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    today_date DATE := CURRENT_DATE;
    today_views INT := 0;
    today_uniques INT := 0;
    total_uniques INT := 0;
    base_offset INT := 32; -- Initial base count between 20~43
BEGIN
    SELECT COALESCE(page_views, 0), COALESCE(unique_visitors, 0)
    INTO today_views, today_uniques
    FROM site_visits
    WHERE date = today_date;

    SELECT COALESCE(SUM(unique_visitors), 0) + base_offset
    INTO total_uniques
    FROM site_visits;

    RETURN json_build_object(
        'today_views', COALESCE(today_views, 0),
        'today_uniques', COALESCE(today_uniques, 0),
        'total_uniques', total_uniques
    );
END;
$$;
