-- ==============================================================================
-- HotStoveLeague Database Schema
-- ==============================================================================

-- 1. 기존 테이블 및 함수 정리 (초기화 시)
DROP TABLE IF EXISTS rumors CASCADE;
DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS coaches CASCADE;
DROP TABLE IF EXISTS teams CASCADE;

-- 2. 팀 (teams) 테이블 생성
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,       -- e.g. 'T1', 'Gen.G', 'Bilibili Gaming'
    short_name VARCHAR(10) NOT NULL UNIQUE, -- e.g. 'T1', 'GEN', 'BLG'
    league VARCHAR(10) NOT NULL DEFAULT 'LCK', -- 'LCK', 'LPL', 'LEC', 'LCS', 'LCP', 'CBLOL'
    light_logo_url TEXT,                    -- 라이트 모드 로고 URL
    dark_logo_url TEXT,                     -- 다크 모드 로고 URL
    primary_color VARCHAR(10),              -- 팀 대표 색상 (Hex 코드, e.g. '#E4002B')
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 선수 (players) 테이블 생성 (주전/서브 지원)
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(60) NOT NULL UNIQUE,       -- 선수 고유 식별자 (1선수 = 1고유값 보장)
    name VARCHAR(50) NOT NULL,              -- 인게임 닉네임 e.g. 'Faker', 'Chovy'
    real_name VARCHAR(50),                  -- 실명 e.g. '이상혁', '정지훈'
    position VARCHAR(10) NOT NULL CHECK (position IN ('TOP', 'JGL', 'MID', 'BOT', 'SPT')),
    current_team_id INT REFERENCES teams(id) ON DELETE SET NULL,   -- 현재 소속 구단 FK (선수는 한 팀에만 소속)
    predicted_team_id INT REFERENCES teams(id) ON DELETE SET NULL, -- 이적 예상 구단 FK
    is_starter BOOLEAN DEFAULT true,        -- 주전(true) / 서브(false) 여부
    confidence INT DEFAULT 0 CHECK (confidence >= 0 AND confidence <= 100), -- 0~100% 확신도
    image_url TEXT,                         -- 프로필 사진 URL
    status VARCHAR(20) DEFAULT 'STAY',      -- 'CONFIRMED', 'RUMORED', 'FA', 'STAY', 'SUB'
    source_url TEXT,                        -- 로스터 근거 URL (나무위키 / Leaguepedia)
    verified_at DATE DEFAULT CURRENT_DATE,  -- 검증 기준일
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 감코진 (coaches) 테이블 생성 (감독 및 코치진)
CREATE TABLE coaches (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('HEAD_COACH', 'COACH')), -- 'HEAD_COACH' (감독) | 'COACH' (코치)
    name VARCHAR(50) NOT NULL,                                         -- 닉네임 e.g. 'kkOma', 'Score'
    real_name VARCHAR(50),                                             -- 실명 e.g. '김정균', '고동빈'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 루머/찌라시 (rumors) 타임라인 테이블 생성
CREATE TABLE rumors (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(100) UNIQUE NOT NULL,   -- 원천 게시물 고유 ID (중복 수집 방지)
    source VARCHAR(20) NOT NULL,            -- 'WEIBO' | 'TWITTER' | 'COMMUNITY' | 'NEWS'
    author VARCHAR(50) NOT NULL,            -- e.g. '丶涵艺', 'LEC_Wooloo', '윤민섭'
    raw_text TEXT NOT NULL,                 -- 수집된 찌라시 원문
    summary TEXT,                           -- 한국어/영문 1줄 요약
    player_id INT REFERENCES players(id) ON DELETE SET NULL, -- 연관 선수
    target_team_id INT REFERENCES teams(id) ON DELETE SET NULL, -- 언급된 행선지
    confidence INT DEFAULT 50,              -- 신뢰도 점수 (0~100)
    post_url TEXT,                          -- 원문 링크
    published_at TIMESTAMPTZ NOT NULL,      -- 원문 작성 시각
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 인덱스 생성
CREATE INDEX idx_teams_league ON teams(league);
CREATE UNIQUE INDEX idx_players_slug ON players(slug);
-- 한 팀의 특정 라인에는 주전(is_starter=true)이 1명만 존재하도록 DB 차원에서 강제
CREATE UNIQUE INDEX idx_team_pos_starter ON players(current_team_id, position) WHERE is_starter = true;
CREATE INDEX idx_players_current_team ON players(current_team_id);
CREATE INDEX idx_players_predicted_team ON players(predicted_team_id);
CREATE INDEX idx_coaches_team ON coaches(team_id);
CREATE INDEX idx_rumors_post_id ON rumors(post_id);
CREATE INDEX idx_rumors_published_at ON rumors(published_at DESC);

-- 7. Row Level Security (RLS) 설정
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE rumors ENABLE ROW LEVEL SECURITY;

-- 모든 사용자(익명/인증) 읽기 허용
CREATE POLICY "Public teams are viewable by everyone" ON teams FOR SELECT USING (true);
CREATE POLICY "Public players are viewable by everyone" ON players FOR SELECT USING (true);
CREATE POLICY "Public coaches are viewable by everyone" ON coaches FOR SELECT USING (true);
CREATE POLICY "Public rumors are viewable by everyone" ON rumors FOR SELECT USING (true);

-- 쓰기는 Service Role (Cloudflare Worker 및 관리자)만 허용
CREATE POLICY "Service role can modify teams" ON teams FOR ALL TO service_role USING (true);
CREATE POLICY "Service role can modify players" ON players FOR ALL TO service_role USING (true);
CREATE POLICY "Service role can modify coaches" ON coaches FOR ALL TO service_role USING (true);
CREATE POLICY "Service role can modify rumors" ON rumors FOR ALL TO service_role USING (true);

-- 8. Supabase Realtime 활성화 (웹소켓 실시간 이벤트 전송)
ALTER PUBLICATION supabase_realtime ADD TABLE players;
ALTER PUBLICATION supabase_realtime ADD TABLE rumors;

-- 9. 선수 이적 및 소속 변경 전용 함수 (1인 1팀 무결성 보장)
CREATE OR REPLACE FUNCTION move_player(
    p_slug VARCHAR(60),
    p_target_team_id INT,
    p_is_starter BOOLEAN DEFAULT true,
    p_status VARCHAR(20) DEFAULT 'CONFIRMED'
)
RETURNS VOID AS $$
BEGIN
    -- 만약 이동할 팀의 해당 포지션에 이미 주전이 있다면 기존 주전을 서브(is_starter=false)로 강등하거나 조정
    IF p_is_starter = true AND p_target_team_id IS NOT NULL THEN
        UPDATE players
        SET is_starter = false,
            updated_at = NOW()
        WHERE current_team_id = p_target_team_id
          AND position = (SELECT position FROM players WHERE slug = p_slug)
          AND is_starter = true;
    END IF;

    -- 대상 선수 소속 이전
    UPDATE players
    SET current_team_id = p_target_team_id,
        predicted_team_id = p_target_team_id,
        is_starter = p_is_starter,
        status = p_status,
        updated_at = NOW()
    WHERE slug = p_slug;
END;
$$ LANGUAGE plpgsql;
