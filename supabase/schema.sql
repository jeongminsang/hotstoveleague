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
    name VARCHAR(50) NOT NULL UNIQUE,       -- e.g. 'T1', 'Gen.G'
    short_name VARCHAR(10) NOT NULL UNIQUE, -- e.g. 'T1', 'GEN'
    light_logo_url TEXT,                    -- 라이트 모드 로고 URL
    dark_logo_url TEXT,                     -- 다크 모드 로고 URL
    primary_color VARCHAR(10),              -- 팀 대표 색상 (Hex 코드, e.g. '#E4002B')
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 선수 (players) 테이블 생성 (주전/서브 지원)
CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,              -- 닉네임 e.g. 'Faker', 'Chovy'
    real_name VARCHAR(50),                  -- 실명 e.g. '이상혁', '정지훈'
    position VARCHAR(10) NOT NULL CHECK (position IN ('TOP', 'JGL', 'MID', 'BOT', 'SPT')),
    current_team_id INT REFERENCES teams(id) ON DELETE SET NULL,   -- 기존 소속 팀
    predicted_team_id INT REFERENCES teams(id) ON DELETE SET NULL, -- 이적 예상 팀
    is_starter BOOLEAN DEFAULT true,        -- 주전(true) / 서브(false) 여부
    confidence INT DEFAULT 0 CHECK (confidence >= 0 AND confidence <= 100), -- 0~100% 확신도
    image_url TEXT,                         -- 프로필 사진 URL
    status VARCHAR(20) DEFAULT 'STAY',      -- 'CONFIRMED', 'RUMORED', 'FA', 'STAY', 'SUB'
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
    source VARCHAR(20) NOT NULL,            -- 'WEIBO' | 'TWITTER'
    author VARCHAR(50) NOT NULL,            -- e.g. '丶涵艺', 'LEC_Wooloo', '윤민섭'
    raw_text TEXT NOT NULL,                 -- 수집된 찌라시 원문
    summary TEXT,                           -- Gemini AI가 추출한 한국어 1줄 요약
    player_id INT REFERENCES players(id) ON DELETE SET NULL, -- 연관 선수
    target_team_id INT REFERENCES teams(id) ON DELETE SET NULL, -- 언급된 행선지
    confidence INT DEFAULT 50,              -- 신뢰도 점수 (0~100)
    post_url TEXT,                          -- 원문 링크
    published_at TIMESTAMPTZ NOT NULL,      -- 원문 작성 시각
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. 인덱스 생성
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
