-- ==============================================================================
-- HotStoveLeague 2026 시즌 LCK 10개 구단 공식 확정 로스터 시드 데이터
-- ==============================================================================

-- 0. 기존 테이블 스키마 보정 (컬럼 누락 및 제약조건 자동 보정)
ALTER TABLE players ADD COLUMN IF NOT EXISTS is_starter BOOLEAN DEFAULT true;
ALTER TABLE players DROP CONSTRAINT IF EXISTS players_status_check;
ALTER TABLE players ADD CONSTRAINT players_status_check CHECK (status IN ('STAY', 'FA', 'RUMORED', 'CONFIRMED', 'SUB'));

CREATE TABLE IF NOT EXISTS coaches (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('HEAD_COACH', 'COACH')),
    name VARCHAR(50) NOT NULL,
    real_name VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public coaches are viewable by everyone" ON coaches;
CREATE POLICY "Public coaches are viewable by everyone" ON coaches FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role can modify coaches" ON coaches;
CREATE POLICY "Service role can modify coaches" ON coaches FOR ALL TO service_role USING (true);

-- 1. 기존 데이터 초기화 (외래키 및 UNIQUE 제약조건 충돌 방지)
TRUNCATE TABLE rumors, players, coaches, teams RESTART IDENTITY CASCADE;

-- 2. 2026 LCK 10개 구단 공식 명칭, 트라이코드 및 로컬 SVG 로고
INSERT INTO teams (id, name, short_name, light_logo_url, dark_logo_url, primary_color) VALUES
(1, 'T1', 'T1', '/logos/t1.svg', '/logos/t1.svg', '#E4002B'),
(2, 'Gen.G', 'GEN', '/logos/gen.svg', '/logos/gen.svg', '#AA8A00'),
(3, 'Hanwha Life Esports', 'HLE', '/logos/hle.svg', '/logos/hle.svg', '#F37021'),
(4, 'Dplus KIA', 'DK', '/logos/dk.svg', '/logos/dk.svg', '#00EAFF'),
(5, 'kt Rolster', 'KT', '/logos/kt.svg', '/logos/kt.svg', '#ED1C24'),
(6, 'BNK FEARX', 'BFX', '/logos/bfx.svg', '/logos/bfx.svg', '#FFCC00'),
(7, 'Hanjin BRION', 'BRO', '/logos/bro.svg', '/logos/bro.svg', '#004F3B'),
(8, 'Kiwoom DRX', 'KRX', '/logos/krx.svg', '/logos/krx.svg', '#5A0019'),
(9, 'Nongshim RedForce', 'NS', '/logos/ns.svg', '/logos/ns.svg', '#DE1F26'),
(10, 'DN SOOPers', 'DNS', '/logos/dns.svg', '/logos/dns.svg', '#00A3FF');

-- 시퀀스 번호 동기화
SELECT setval('teams_id_seq', (SELECT MAX(id) FROM teams));

-- 3. 2026 시즌 10개 구단 전체 로스터 (주전 is_starter=true / 서브 is_starter=false)
INSERT INTO players (name, real_name, position, current_team_id, predicted_team_id, is_starter, confidence, status) VALUES
-- 1. T1 (id: 1) - 도오페페케
('Doran', '최현준', 'TOP', 1, 1, true, 100, 'STAY'),
('Oner', '문현준', 'JGL', 1, 1, true, 100, 'STAY'),
('Faker', '이상혁', 'MID', 1, 1, true, 100, 'STAY'),
('Peyz', '김수환', 'BOT', 1, 1, true, 100, 'STAY'),
('Keria', '류민석', 'SPT', 1, 1, true, 100, 'STAY'),

-- 2. Gen.G (id: 2) - 기캐쵸룰듀
('Kiin', '김기인', 'TOP', 2, 2, true, 100, 'STAY'),
('Canyon', '김건부', 'JGL', 2, 2, true, 100, 'STAY'),
('Chovy', '정지훈', 'MID', 2, 2, true, 100, 'STAY'),
('Ruler', '박재혁', 'BOT', 2, 2, true, 100, 'STAY'),
('Duro', '주민규', 'SPT', 2, 2, true, 100, 'STAY'),

-- 3. Hanwha Life Esports (id: 3) - 제카제구딜
('Zeus', '최우제', 'TOP', 3, 3, true, 100, 'STAY'),
('Kanavi', '서진혁', 'JGL', 3, 3, true, 100, 'STAY'),
('Zeka', '김건우', 'MID', 3, 3, true, 100, 'STAY'),
('Gumayusi', '이민형', 'BOT', 3, 3, true, 100, 'STAY'),
('Delight', '유환중', 'SPT', 3, 3, true, 100, 'STAY'),

-- 4. Dplus KIA (id: 4) - 시루쇼스커
('Siwoo', '전시우', 'TOP', 4, 4, true, 100, 'STAY'),
('Lucid', '최용혁', 'JGL', 4, 4, true, 100, 'STAY'),
('ShowMaker', '허수', 'MID', 4, 4, true, 100, 'STAY'),
('Smash', '신금재', 'BOT', 4, 4, true, 100, 'STAY'),
('Career', '신동욱', 'SPT', 4, 4, true, 100, 'STAY'),

-- 5. kt Rolster (id: 5)
('PerfecT', '이승민', 'TOP', 5, 5, true, 100, 'STAY'),
('Cuzz', '문우찬', 'JGL', 5, 5, true, 100, 'STAY'),
('Bdd', '곽보성', 'MID', 5, 5, true, 100, 'STAY'),
('Jiwoo', '정지우', 'BOT', 5, 5, true, 100, 'STAY'),
('Effort', '이상호', 'SPT', 5, 5, true, 100, 'STAY'),
('Fenrir', '박강준', 'BOT', 5, 5, false, 100, 'STAY'),
('Pollu', '오동규', 'SPT', 5, 5, false, 100, 'STAY'),
('Ghost', '장용준', 'SPT', 5, 5, false, 100, 'STAY'),

-- 6. BNK FEARX (id: 6)
('Clear', '송현민', 'TOP', 6, 6, true, 100, 'STAY'),
('Raptor', '전어진', 'JGL', 6, 6, true, 100, 'STAY'),
('VicLa', '이대광', 'MID', 6, 6, true, 100, 'STAY'),
('Taeyoon', '김태윤', 'BOT', 6, 6, true, 100, 'STAY'),
('Kellin', '김형규', 'SPT', 6, 6, true, 100, 'STAY'),
('Daystar', '유지명', 'MID', 6, 6, false, 100, 'STAY'),

-- 7. 한진 브리온 (id: 7)
('Casting', '신민제', 'TOP', 7, 7, true, 100, 'STAY'),
('Gideon', '김민성', 'JGL', 7, 7, true, 100, 'STAY'),
('Roamer', '조우진', 'MID', 7, 7, true, 100, 'STAY'),
('Teddy', '박진성', 'BOT', 7, 7, true, 100, 'STAY'),
('Namgung', '남궁민항', 'SPT', 7, 7, true, 100, 'STAY'),
('Lokii', '이상민', 'MID', 7, 7, false, 100, 'STAY'),

-- 8. 키움 DRX (id: 8)
('Rich', '이재원', 'TOP', 8, 8, true, 100, 'STAY'),
('Frog', '이민회', 'TOP', 8, 8, false, 100, 'STAY'),
('Vincenzo', '하승민', 'JGL', 8, 8, true, 100, 'STAY'),
('Willer', '김정현', 'JGL', 8, 8, false, 100, 'STAY'),
('Ucal', '손우현', 'MID', 8, 8, true, 100, 'STAY'),
('Aiming', '김하람', 'BOT', 8, 8, true, 100, 'STAY'),
('Andil', '문관빈', 'SPT', 8, 8, true, 100, 'STAY'),

-- 9. Nongshim RedForce (id: 9)
('Kingen', '황성훈', 'TOP', 9, 9, true, 100, 'STAY'),
('Sponge', '배영준', 'JGL', 9, 9, true, 100, 'STAY'),
('Scout', '이예찬', 'MID', 9, 9, true, 100, 'STAY'),
('Diable', '남대근', 'BOT', 9, 9, true, 100, 'STAY'),
('Lehends', '손시우', 'SPT', 9, 9, true, 100, 'STAY'),
('Calix', '선현욱', 'MID', 9, 9, false, 100, 'STAY'),
('Pleata', '손민우', 'SPT', 9, 9, false, 100, 'STAY'),

-- 10. DN SOOPers (id: 10)
('DuDu', '이동주', 'TOP', 10, 10, true, 100, 'STAY'),
('Pyosik', '홍창현', 'JGL', 10, 10, true, 100, 'STAY'),
('Clozer', '이주현', 'MID', 10, 10, true, 100, 'STAY'),
('deokdam', '서대길', 'BOT', 10, 10, true, 100, 'STAY'),
('Life', '김정민', 'SPT', 10, 10, true, 100, 'STAY'),
('Sharvel', '김단우', 'JGL', 10, 10, false, 100, 'STAY'),
('Peter', '정윤수', 'SPT', 10, 10, false, 100, 'STAY');

-- 4. 2026 시즌 10개 구단 감코진 (감독 role='HEAD_COACH' / 코치 role='COACH')
INSERT INTO coaches (team_id, role, name, real_name) VALUES
-- 1. T1 (id: 1)
(1, 'HEAD_COACH', 'kkOma', '김정균'),
(1, 'COACH', 'Tom', '임재현'),
(1, 'COACH', 'Mata', '조세형'),
(1, 'COACH', 'Easyhoon', '이지훈'),

-- 2. Gen.G (id: 2)
(2, 'HEAD_COACH', 'Ryu', '유상욱'),
(2, 'COACH', 'Lyn', '김다빈'),
(2, 'COACH', 'Nova', '박찬호'),

-- 3. Hanwha Life Esports (id: 3)
(3, 'HEAD_COACH', 'Homme', '윤성영'),
(3, 'COACH', 'Sin', '연형모'),
(3, 'COACH', 'Mowgli', '이재하'),

-- 4. Dplus KIA (id: 4)
(4, 'HEAD_COACH', 'cvMax', '김대호'),
(4, 'COACH', 'PoohManDu', '이정현'),
(4, 'COACH', 'Hachani', '하승찬'),

-- 5. kt Rolster (id: 5)
(5, 'HEAD_COACH', 'Score', '고동빈'),
(5, 'COACH', 'Museong', '김무성'),
(5, 'COACH', 'Sonstar', '손승익'),

-- 6. BNK FEARX (id: 6)
(6, 'HEAD_COACH', 'Edo', '박준석'),
(6, 'COACH', 'Rather', '신형섭'),
(6, 'COACH', 'Lira', '남태유'),

-- 7. 한진 브리온 (id: 7)
(7, 'HEAD_COACH', 'SSOUNG', '김상수'),
(7, 'COACH', 'Duke', '이호성'),

-- 8. 키움 DRX (id: 8)
(8, 'HEAD_COACH', 'Joker', '조재읍'),
(8, 'COACH', 'Naehyun', '유내현'),
(8, 'COACH', 'Saroo', '이종원'),

-- 9. Nongshim RedForce (id: 9)
(9, 'HEAD_COACH', 'DanDy', '최인규'),
(9, 'COACH', 'Chelly', '박승진'),
(9, 'COACH', 'Crazy', '김재희'),

-- 10. DN SOOPers (id: 10)
(10, 'HEAD_COACH', 'RapidStar', '정민성'),
(10, 'COACH', 'Spirit', '이다윤'),
(10, 'COACH', 'Alvingo', '최병철');
