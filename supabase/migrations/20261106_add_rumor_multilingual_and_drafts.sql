-- ==============================================================================
-- Migration: 20261106_add_rumor_multilingual_and_drafts.sql
-- 1) Extend rumors table with multilingual & structured transfer fields
-- 2) Create rumor_drafts table for Cloudflare Worker collection
-- ==============================================================================

-- 1. rumors 테이블 다국어 및 구조화 메타데이터 컬럼 추가
ALTER TABLE rumors ADD COLUMN IF NOT EXISTS author_en VARCHAR(100);
ALTER TABLE rumors ADD COLUMN IF NOT EXISTS author_zh VARCHAR(100);
ALTER TABLE rumors ADD COLUMN IF NOT EXISTS summary_en TEXT;
ALTER TABLE rumors ADD COLUMN IF NOT EXISTS summary_zh TEXT;
ALTER TABLE rumors ADD COLUMN IF NOT EXISTS league VARCHAR(20);
ALTER TABLE rumors ADD COLUMN IF NOT EXISTS player_slug VARCHAR(60);
ALTER TABLE rumors ADD COLUMN IF NOT EXISTS player_name VARCHAR(60);
ALTER TABLE rumors ADD COLUMN IF NOT EXISTS current_team_short VARCHAR(20);
ALTER TABLE rumors ADD COLUMN IF NOT EXISTS target_team_short VARCHAR(20);

-- 2. rumor_drafts 테이블 생성 (Cloudflare Worker가 수집한 후보 저장용)
CREATE TABLE IF NOT EXISTS rumor_drafts (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(100) UNIQUE NOT NULL,      -- 원본/생성 고유 ID (중복 수집 방지)
    source VARCHAR(30) NOT NULL,               -- 'TWITTER' | 'WEIBO' | 'NEWS' | 'OFFICIAL'
    author VARCHAR(100) NOT NULL,              -- 작성자/출처 표기
    author_en VARCHAR(100),                    -- 영문 작성자 표기
    author_zh VARCHAR(100),                    -- 중문 작성자 표기
    raw_text TEXT NOT NULL,                    -- 수집된 원문 또는 발췌문
    summary TEXT,                              -- 국문 요약
    summary_en TEXT,                           -- 영문 요약
    summary_zh TEXT,                           -- 중문 요약
    player_slug VARCHAR(60),                   -- 연관 선수 식별자 (선택)
    player_name VARCHAR(60),                   -- 연관 선수 인게임 태그
    current_team_short VARCHAR(20),            -- 원 소속팀 short_name
    target_team_short VARCHAR(20),             -- 예상 행선지 short_name
    from_team VARCHAR(20),                     -- 원 소속팀 short_name (alias)
    to_team VARCHAR(20),                       -- 예상 행선지 short_name (alias)
    league VARCHAR(20),                        -- 리그 (LCK, LPL, LEC, LCS 등)
    kind VARCHAR(20) DEFAULT 'RUMOR',          -- 'OFFICIAL' | 'RUMOR'
    confidence INT DEFAULT 50,                 -- AI 추정 신뢰도 (0~100)
    post_url TEXT NOT NULL,                    -- 원본 링크
    published_at TIMESTAMPTZ NOT NULL,         -- 작성 일시
    status VARCHAR(20) DEFAULT 'pending'       -- 'pending' | 'approved' | 'rejected'
        CHECK (status IN ('pending', 'approved', 'rejected')),
    review_note TEXT,                          -- 검증/반려 메모
    reviewed_at TIMESTAMPTZ,                   -- 검토 일시
    collected_at TIMESTAMPTZ DEFAULT NOW(),    -- 수집 일시
    raw_payload JSONB                          -- AI 추출 원본 JSON 및 메타데이터
);

-- 2-1. 기존 rumor_drafts 테이블이 있을 경우 누락 컬럼 자동 추가
ALTER TABLE rumor_drafts ADD COLUMN IF NOT EXISTS current_team_short VARCHAR(20);
ALTER TABLE rumor_drafts ADD COLUMN IF NOT EXISTS target_team_short VARCHAR(20);
ALTER TABLE rumor_drafts ADD COLUMN IF NOT EXISTS author_en VARCHAR(100);
ALTER TABLE rumor_drafts ADD COLUMN IF NOT EXISTS author_zh VARCHAR(100);
ALTER TABLE rumor_drafts ADD COLUMN IF NOT EXISTS summary_en TEXT;
ALTER TABLE rumor_drafts ADD COLUMN IF NOT EXISTS summary_zh TEXT;

-- 3. 인덱스
CREATE INDEX IF NOT EXISTS idx_rumor_drafts_status ON rumor_drafts(status);
CREATE INDEX IF NOT EXISTS idx_rumor_drafts_collected_at ON rumor_drafts(collected_at DESC);
CREATE INDEX IF NOT EXISTS idx_rumor_drafts_post_id ON rumor_drafts(post_id);

-- 4. RLS 및 쓰기 권한: publishable key(anon)로도 draft와 rumors/players 관리 가능하도록 허용
ALTER TABLE rumor_drafts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access to rumor_drafts" ON rumor_drafts;
DROP POLICY IF EXISTS "Allow all access to rumor_drafts" ON rumor_drafts;
CREATE POLICY "Allow all access to rumor_drafts"
    ON rumor_drafts FOR ALL
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can modify rumors" ON rumors;
DROP POLICY IF EXISTS "Allow modify rumors" ON rumors;
CREATE POLICY "Allow modify rumors"
    ON rumors FOR ALL
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can modify players" ON players;
DROP POLICY IF EXISTS "Allow modify players" ON players;
CREATE POLICY "Allow modify players"
    ON players FOR ALL
    USING (true)
    WITH CHECK (true);

-- 5. Realtime 발행 목록 안전 추가 (이미 등록되어 있으면 건너뜀)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'rumors'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE rumors;
    END IF;
END $$;

