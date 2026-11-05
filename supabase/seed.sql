-- ==============================================================================
-- HotStoveLeague 2026년 11월 기준 글로벌 6대 리그 공식/최신 시드 데이터
-- ==============================================================================

-- 0. 기존 테이블 스키마 보정 (컬럼 누락 및 제약조건 자동 보정)
ALTER TABLE teams ADD COLUMN IF NOT EXISTS league VARCHAR(10) DEFAULT 'LCK';
CREATE INDEX IF NOT EXISTS idx_teams_league ON teams(league);
ALTER TABLE players ADD COLUMN IF NOT EXISTS slug VARCHAR(60);
ALTER TABLE players ADD COLUMN IF NOT EXISTS is_starter BOOLEAN DEFAULT true;
ALTER TABLE players ADD COLUMN IF NOT EXISTS source_url TEXT;
ALTER TABLE players ADD COLUMN IF NOT EXISTS verified_at DATE DEFAULT CURRENT_DATE;
ALTER TABLE players DROP CONSTRAINT IF EXISTS players_status_check;
ALTER TABLE players ADD CONSTRAINT players_status_check CHECK (status IN ('STAY', 'FA', 'RUMORED', 'CONFIRMED', 'SUB'));
DROP INDEX IF EXISTS idx_players_slug;
CREATE UNIQUE INDEX IF NOT EXISTS idx_players_slug ON players(slug);
DROP INDEX IF EXISTS idx_team_pos_starter;
CREATE UNIQUE INDEX IF NOT EXISTS idx_team_pos_starter ON players(current_team_id, position) WHERE is_starter = true;

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

-- 2. 리그별 구단 공식 명칭, 트라이코드, 리그 및 대표 색상 (2026년 11월 최신 기준)
INSERT INTO teams (id, name, short_name, league, light_logo_url, dark_logo_url, primary_color) VALUES
-- LCK (한국) - 10팀
(1, 'T1', 'T1', 'LCK', '/logos/t1.svg', '/logos/t1.svg', '#E4002B'),
(2, 'Gen.G', 'GEN', 'LCK', '/logos/gen.svg', '/logos/gen.svg', '#AA8A00'),
(3, 'Hanwha Life Esports', 'HLE', 'LCK', '/logos/hle.svg', '/logos/hle.svg', '#F37021'),
(4, 'Dplus KIA', 'DK', 'LCK', '/logos/dk.svg', '/logos/dk.svg', '#00EAFF'),
(5, 'kt Rolster', 'KT', 'LCK', '/logos/kt.svg', '/logos/kt.svg', '#ED1C24'),
(6, 'BNK FEARX', 'BFX', 'LCK', '/logos/bfx.svg', '/logos/bfx.svg', '#FFCC00'),
(7, 'Hanjin BRION', 'BRO', 'LCK', '/logos/bro.svg', '/logos/bro.svg', '#004F3B'),
(8, 'Kiwoom DRX', 'KRX', 'LCK', '/logos/krx.svg', '/logos/krx.svg', '#5A0019'),
(9, 'Nongshim RedForce', 'NS', 'LCK', '/logos/ns.svg', '/logos/ns.svg', '#DE1F26'),
(10, 'DN SOOPers', 'DNS', 'LCK', '/logos/dns.svg', '/logos/dns.svg', '#00A3FF'),

-- LPL (중국) - RNG 해체 반영, NIP 추가 등 10개 대표 구단
(11, 'Bilibili Gaming', 'BLG', 'LPL', '/logos/blg.svg', '/logos/blg.svg', '#00A1D6'),
(12, 'Top Esports', 'TES', 'LPL', '/logos/tes.png', '/logos/tes.png', '#FA3A2F'),
(13, 'JD Gaming', 'JDG', 'LPL', '/logos/jdg.png', '/logos/jdg.png', '#BA0C2F'),
(14, 'Weibo Gaming', 'WBG', 'LPL', '/logos/wbg.png', '/logos/wbg.png', '#FA3E3E'),
(15, 'LNG Esports', 'LNG', 'LPL', '/logos/lng.svg', '/logos/lng.svg', '#17366E'),
(16, 'Invictus Gaming', 'iG', 'LPL', '/logos/ig.png', '/logos/ig.png', '#231815'),
(17, 'EDward Gaming', 'EDG', 'LPL', '/logos/edg.png', '/logos/edg.png', '#282828'),
(18, 'Ninjas in Pyjamas', 'NIP', 'LPL', '/logos/nip.svg', '/logos/nip.svg', '#00FF00'),
(19, 'Team WE', 'WE', 'LPL', '/logos/we.png', '/logos/we.png', '#DA291C'),
(20, 'Anyone''s Legend', 'AL', 'LPL', '/logos/al.png', '/logos/al.png', '#E50027'),

-- LEC (유럽) - BDS -> Shifters(SHF) 리브랜딩, NAVI 합류 반영
(21, 'G2 Esports', 'G2', 'LEC', '/logos/g2.svg', '/logos/g2.svg', '#000000'),
(22, 'Fnatic', 'FNC', 'LEC', '/logos/fnc.svg', '/logos/fnc.svg', '#FF5900'),
(23, 'Movistar KOI', 'MDK', 'LEC', '/logos/mdk.svg', '/logos/mdk.svg', '#004B87'),
(24, 'Shifters', 'SHF', 'LEC', '/logos/shf.svg', '/logos/shf.svg', '#00A3E0'),
(25, 'Karmine Corp', 'KC', 'LEC', '/logos/kc.svg', '/logos/kc.svg', '#1B2C4B'),
(26, 'Team Vitality', 'VIT', 'LEC', '/logos/vit.png', '/logos/vit.png', '#FFF000'),
(27, 'SK Gaming', 'SK', 'LEC', '/logos/sk.svg', '/logos/sk.svg', '#002B49'),
(28, 'Team Heretics', 'TH', 'LEC', '/logos/th.svg', '/logos/th.svg', '#C4A000'),
(29, 'GIANTX', 'GX', 'LEC', '/logos/gx.svg', '/logos/gx.svg', '#1E2530'),
(30, 'Natus Vincere', 'NAVI', 'LEC', '/logos/navi.svg', '/logos/navi.svg', '#FFEE00'),

-- LCS (북미 / Americas North) - 100T 탈퇴 -> Sentinels(SEN) 슬롯 인수 반영
(31, 'FlyQuest', 'FLY', 'LCS', '/logos/fly.svg', '/logos/fly.svg', '#004938'),
(32, 'Team Liquid', 'TL', 'LCS', '/logos/tl.png', '/logos/tl.png', '#0F1923'),
(33, 'Cloud9', 'C9', 'LCS', '/logos/c9.svg', '/logos/c9.svg', '#0094D2'),
(34, 'Sentinels', 'SEN', 'LCS', '/logos/sen.svg', '/logos/sen.svg', '#CE0037'),
(35, 'Shopify Rebellion', 'SR', 'LCS', '/logos/sr.svg', '/logos/sr.svg', '#182B49'),
(36, 'Dignitas', 'DIG', 'LCS', '/logos/dig.svg', '/logos/dig.svg', '#FFCC00'),
(37, 'Disguised', 'DSG', 'LCS', '/logos/dsg.svg', '/logos/dsg.svg', '#1E1E1E'),
(38, 'Lyon Gaming', 'LYN', 'LCS', '/logos/lyn.svg', '/logos/lyn.svg', '#582C83'),

-- LCP (아시아태평양) - PSG 탈락/변경, MVK(구 VKE), DCG, GZ 게스트 합류 반영
(39, 'Secret Whales', 'TSW', 'LCP', '/logos/ts.svg', '/logos/ts.svg', '#1A1A1A'),
(40, 'GAM Esports', 'GAM', 'LCP', '/logos/gam.png', '/logos/gam.png', '#FED100'),
(41, 'Fukuoka SoftBank HAWKS gaming', 'SHG', 'LCP', '/logos/shg.svg', '/logos/shg.svg', '#F5A800'),
(42, 'CTBC Flying Oyster', 'CFO', 'LCP', '/logos/cfo.png', '/logos/cfo.png', '#0F2042'),
(43, 'MVK Esports', 'MVK', 'LCP', '/logos/mvk.png', '/logos/mvk.png', '#1C3144'),
(44, 'Deep Cross Gaming', 'DCG', 'LCP', '/logos/dcg.png', '/logos/dcg.png', '#00EAFF'),
(45, 'DetonatioN FocusMe', 'DFM', 'LCP', '/logos/dfm.svg', '/logos/dfm.svg', '#00A0E9'),
(46, 'Ground Zero Gaming', 'GZ', 'LCP', '/logos/gz.svg', '/logos/gz.svg', '#00FF66'),

-- CBLOL (브라질 / Americas South) - Leviatan(LEV) 합류, Fluxo W7M 리브랜딩 반영
(47, 'paiN Gaming', 'PNG', 'CBLOL', '/logos/png.svg', '/logos/png.svg', '#000000'),
(48, 'LOUD', 'LLL', 'CBLOL', '/logos/loud.svg', '/logos/loud.svg', '#00FF66'),
(49, 'Vivo Keyd Stars', 'VKS', 'CBLOL', '/logos/vks.svg', '/logos/vks.svg', '#552483'),
(50, 'RED Canids', 'RED', 'CBLOL', '/logos/red.png', '/logos/red.png', '#CC0000'),
(51, 'FURIA', 'FUR', 'CBLOL', '/logos/fur.png', '/logos/fur.png', '#000000'),
(52, 'Fluxo W7M', 'W7M', 'CBLOL', '/logos/w7m.svg', '/logos/w7m.svg', '#E50027'),
(53, 'Leviatan', 'LEV', 'CBLOL', '/logos/lev.svg', '/logos/lev.svg', '#00A3E0'),
(54, 'Los Grandes', 'LOS', 'CBLOL', '/logos/los.svg', '/logos/los.svg', '#FF5500');

-- 시퀀스 번호 동기화
SELECT setval('teams_id_seq', (SELECT MAX(id) FROM teams));

-- 3. 2026 시즌 리그별 공식 로스터 (주전 is_starter=true / 서브 is_starter=false)
INSERT INTO players (slug, name, real_name, position, current_team_id, predicted_team_id, is_starter, confidence, status) VALUES
-- ==============================================================================
-- LCK (한국) - 도오페페케 등 기존 로스터 보존
-- ==============================================================================
-- 1. T1 (id: 1)
('doran', 'Doran', '최현준', 'TOP', 1, 1, true, 100, 'STAY'),
('oner', 'Oner', '문현준', 'JGL', 1, 1, true, 100, 'STAY'),
('faker', 'Faker', '이상혁', 'MID', 1, 1, true, 100, 'STAY'),
('peyz', 'Peyz', '김수환', 'BOT', 1, 1, true, 100, 'STAY'),
('keria', 'Keria', '류민석', 'SPT', 1, 1, true, 100, 'STAY'),

-- 2. Gen.G (id: 2)
('kiin', 'Kiin', '김기인', 'TOP', 2, 2, true, 100, 'STAY'),
('canyon', 'Canyon', '김건부', 'JGL', 2, 2, true, 100, 'STAY'),
('chovy', 'Chovy', '정지훈', 'MID', 2, 2, true, 100, 'STAY'),
('ruler', 'Ruler', '박재혁', 'BOT', 2, 2, true, 100, 'STAY'),
('duro', 'Duro', '주민규', 'SPT', 2, 2, true, 100, 'STAY'),

-- 3. Hanwha Life Esports (id: 3)
('zeus', 'Zeus', '최우제', 'TOP', 3, 3, true, 100, 'STAY'),
('kanavi', 'Kanavi', '서진혁', 'JGL', 3, 3, true, 100, 'STAY'),
('zeka', 'Zeka', '김건우', 'MID', 3, 3, true, 100, 'STAY'),
('gumayusi', 'Gumayusi', '이민형', 'BOT', 3, 3, true, 100, 'STAY'),
('delight', 'Delight', '유환중', 'SPT', 3, 3, true, 100, 'STAY'),

-- 4. Dplus KIA (id: 4)
('siwoo', 'Siwoo', '전시우', 'TOP', 4, 4, true, 100, 'STAY'),
('lucid', 'Lucid', '최용혁', 'JGL', 4, 4, true, 100, 'STAY'),
('showmaker', 'ShowMaker', '허수', 'MID', 4, 4, true, 100, 'STAY'),
('smash', 'Smash', '신금재', 'BOT', 4, 4, true, 100, 'STAY'),
('career', 'Career', '오형석', 'SPT', 4, 4, true, 100, 'STAY'),

-- 5. kt Rolster (id: 5)
('perfect', 'PerfecT', '이승민', 'TOP', 5, 5, true, 100, 'STAY'),
('cuzz', 'Cuzz', '문우찬', 'JGL', 5, 5, true, 100, 'STAY'),
('bdd', 'Bdd', '곽보성', 'MID', 5, 5, true, 100, 'STAY'),
('jiwoo', 'Jiwoo', '정지우', 'BOT', 5, 5, true, 100, 'STAY'),
('effort', 'Effort', '이상호', 'SPT', 5, 5, true, 100, 'STAY'),

-- 6. BNK FEARX (id: 6)
('clear', 'Clear', '송현민', 'TOP', 6, 6, true, 100, 'STAY'),
('raptor', 'Raptor', '전어진', 'JGL', 6, 6, true, 100, 'STAY'),
('vicla', 'VicLa', '이대광', 'MID', 6, 6, true, 100, 'STAY'),
('diable', 'Diable', '남대근', 'BOT', 6, 6, true, 100, 'STAY'),
('kellin', 'Kellin', '김형규', 'SPT', 6, 6, true, 100, 'STAY'),
('daystar', 'Daystar', '유지혁', 'MID', 6, 6, false, 100, 'STAY'),

-- 7. 한진 브리온 (id: 7)
('casting', 'Casting', '신민제', 'TOP', 7, 7, true, 100, 'STAY'),
('gideon', 'GIDEON', '김민성', 'JGL', 7, 7, true, 100, 'STAY'),
('roamer', 'Roamer', '조우진', 'MID', 7, 7, true, 100, 'STAY'),
('teddy', 'Teddy', '박진성', 'BOT', 7, 7, true, 100, 'STAY'),
('namgung', 'Namgung', '남궁성훈', 'SPT', 7, 7, true, 100, 'STAY'),
('fisher', 'Fisher', '이정태', 'MID', 7, 7, false, 100, 'STAY'),
('kangin', 'Kangin', '안강인', 'TOP', 7, 7, false, 100, 'STAY'),
('enosh', 'Enosh', '임유백', 'SPT', 7, 7, false, 100, 'STAY'),

-- 8. 키움 DRX (id: 8)
('rich', 'Rich', '이재원', 'TOP', 8, 8, true, 100, 'STAY'),
('vincenzo', 'Vincenzo', '하승민', 'JGL', 8, 8, true, 100, 'STAY'),
('ucal', 'Ucal', '손우현', 'MID', 8, 8, true, 100, 'STAY'),
('aiming', 'Aiming', '김하람', 'BOT', 8, 8, true, 100, 'STAY'),
('andil', 'Andil', '문관빈', 'SPT', 8, 8, true, 100, 'STAY'),
('willer', 'Willer', '김정현', 'JGL', 8, 8, false, 100, 'STAY'),
('frog', 'Frog', '민경민', 'TOP', 8, 8, false, 100, 'STAY'),
('pleata', 'Pleata', '손민우', 'SPT', 8, 8, false, 100, 'STAY'),

-- 9. Nongshim RedForce (id: 9)
('kingen', 'Kingen', '황성훈', 'TOP', 9, 9, true, 100, 'STAY'),
('sponge', 'Sponge', '배영준', 'JGL', 9, 9, true, 100, 'STAY'),
('scout', 'Scout', '이예찬', 'MID', 9, 9, true, 100, 'STAY'),
('taeyoon', 'Taeyoon', '김태윤', 'BOT', 9, 9, true, 100, 'STAY'),
('lehends', 'Lehends', '손시우', 'SPT', 9, 9, true, 100, 'STAY'),
('calix', 'Calix', '선현욱', 'MID', 9, 9, false, 100, 'STAY'),

-- 10. DN SOOPers (id: 10)
('dudu', 'DuDu', '이동주', 'TOP', 10, 10, true, 100, 'STAY'),
('pyosik', 'Pyosik', '홍창현', 'JGL', 10, 10, true, 100, 'STAY'),
('clozer', 'Clozer', '이주현', 'MID', 10, 10, true, 100, 'STAY'),
('deokdam', 'deokdam', '서대길', 'BOT', 10, 10, true, 100, 'STAY'),
('life', 'Life', '김정민', 'SPT', 10, 10, true, 100, 'STAY'),
('sharvel', 'Sharvel', '김단우', 'JGL', 10, 10, false, 100, 'STAY'),
('peter', 'Peter', '정윤수', 'SPT', 10, 10, false, 100, 'STAY'),

-- ==============================================================================
-- LPL 2026년 11월 기준 최신 공식 로스터 (RNG 해체 반영, NIP 추가)
-- ==============================================================================
-- 11. Bilibili Gaming (id: 11)
('bin', 'Bin', 'Chen Zebin', 'TOP', 11, 11, true, 100, 'STAY'),
('xun', 'Xun', 'Peng Lixun', 'JGL', 11, 11, true, 100, 'STAY'),
('knight', 'knight', 'Zhuo Ding', 'MID', 11, 11, true, 100, 'STAY'),
('viper', 'Viper', 'Park Do-hyeon', 'BOT', 11, 11, true, 100, 'STAY'),
('on', 'ON', 'Luo Wenjun', 'SPT', 11, 11, true, 100, 'STAY'),
('flandre', 'Flandre', 'Li Xuanjun', 'TOP', 11, 11, false, 100, 'STAY'),

-- 12. Top Esports (id: 12)
('369', '369', 'Bai Jiahao', 'TOP', 12, 12, true, 100, 'STAY'),
('naiyou', 'naiyou', 'Yang Zijian', 'JGL', 12, 12, true, 100, 'STAY'),
('creme', 'Creme', 'Lin Jian', 'MID', 12, 12, true, 100, 'STAY'),
('jackeylove', 'JackeyLove', 'Yu Wenbo', 'BOT', 12, 12, true, 100, 'STAY'),
('zhuo', 'Zhuo', 'Wang Xuzhuo', 'SPT', 12, 12, true, 100, 'STAY'),
('tian', 'Tian', 'Gao Tianliang', 'JGL', 12, 12, false, 100, 'STAY'),

-- 13. JD Gaming (id: 13)
('xiaoxu', 'Xiaoxu', 'Xu Xingzu', 'TOP', 13, 13, true, 100, 'STAY'),
('junjia', 'JunJia', 'Yu Chun-chia', 'JGL', 13, 13, true, 100, 'STAY'),
('hongq', 'HongQ', 'Chu Chun-lan', 'MID', 13, 13, true, 100, 'STAY'),
('gala', 'GALA', 'Chen Wei', 'BOT', 13, 13, true, 100, 'STAY'),
('vampire', 'Vampire', 'Zhao Zhe', 'SPT', 13, 13, true, 100, 'STAY'),
('xiaofang', 'xiaofang', 'Fang Zheyu', 'JGL', 13, 13, false, 100, 'STAY'),

-- 14. Weibo Gaming (id: 14)
('breathe', 'Breathe', 'Chen Chen', 'TOP', 14, 14, true, 100, 'STAY'),
('jiejie', 'Jiejie', 'Zhao Lijie', 'JGL', 14, 14, true, 100, 'STAY'),
('xiaohu', 'Xiaohu', 'Li Yuanhao', 'MID', 14, 14, true, 100, 'STAY'),
('elk', 'Elk', 'Zhao Jiahao', 'BOT', 14, 14, true, 100, 'STAY'),
('crisp', 'Crisp', 'Liu Qingsong', 'SPT', 14, 14, true, 100, 'STAY'),
('xiaohao', 'Xiaohao', 'Peng Hao', 'JGL', 14, 14, false, 100, 'STAY'),

-- 15. LNG Esports (id: 15) - 지카-웨이웨이-하이차오-LP-항 (사용자 지적: 2025 로스터 반영)
('zika', 'Zika', 'Tang Huayu', 'TOP', 15, 15, true, 100, 'STAY'),
('weiwei', 'Weiwei', 'Wei Bohan', 'JGL', 15, 15, true, 100, 'STAY'),
('haichao', 'haichao', 'Zhang Haichao', 'MID', 15, 15, true, 100, 'STAY'),
('lp', 'LP', 'Li Fei', 'BOT', 15, 15, true, 100, 'STAY'),
('hang', 'Hang', 'Fu Minghang', 'SPT', 15, 15, true, 100, 'STAY'),

-- 16. Invictus Gaming (id: 16) - 더샤이-웨이-루키-쟈치-메이코
('theshy', 'TheShy', 'Kang Seung-lok', 'TOP', 16, 16, true, 100, 'STAY'),
('wei', 'Wei', 'Yan Yangwei', 'JGL', 16, 16, true, 100, 'STAY'),
('rookie', 'Rookie', 'Song Eui-jin', 'MID', 16, 16, true, 100, 'STAY'),
('jiaqi', 'JiaQi', 'Zi Jiaqi', 'BOT', 16, 16, true, 100, 'STAY'),
('meiko', 'Meiko', 'Tian Ye', 'SPT', 16, 16, true, 100, 'STAY'),
('soboro', 'Soboro', 'Lim Sung-min', 'TOP', 16, 16, false, 100, 'STAY'),

-- 17. EDward Gaming (id: 17)
('solokill', 'Solokill', 'Mak Fu-hing', 'TOP', 17, 17, true, 100, 'STAY'),
('monki', 'Monki', 'Wang Mengqi', 'JGL', 17, 17, true, 100, 'STAY'),
('angel', 'Angel', 'Xiang Tao', 'MID', 17, 17, true, 100, 'STAY'),
('thesnake', 'Thesnake', 'Kang Guang', 'BOT', 17, 17, true, 100, 'STAY'),
('wink', 'Wink', 'Zhang Rui', 'SPT', 17, 17, true, 100, 'STAY'),

-- 18. Ninjas in Pyjamas (id: 18) - 2026 LPL
('hoya', 'HOYA', 'Yoon Yong-ho', 'TOP', 18, 18, true, 100, 'STAY'),
('guwon', 'Guwon', 'Koo Gwan-mo', 'JGL', 18, 18, true, 100, 'STAY'),
('care', 'Care', 'Yang Jie', 'MID', 18, 18, true, 100, 'STAY'),
('photic', 'Photic', 'Ying Qishen', 'BOT', 18, 18, true, 100, 'STAY'),
('fengyue', 'fengyue', 'Wang Runlai', 'SPT', 18, 18, true, 100, 'STAY'),

-- 19. Team WE (id: 19)
('wayward', 'Wayward', 'Huang Renxing', 'TOP', 19, 19, true, 100, 'STAY'),
('heng', 'Heng', 'Yang Cuiheng', 'JGL', 19, 19, true, 100, 'STAY'),
('fofo', 'FoFo', 'Chu Chun-lan', 'MID', 19, 19, true, 100, 'STAY'),
('able', 'Able', 'Dai Zhi-chun', 'BOT', 19, 19, true, 100, 'STAY'),
('iwandy', 'Iwandy', 'Liao Pengchuan', 'SPT', 19, 19, true, 100, 'STAY'),

-- 20. Anyone's Legend (id: 20)
('ale', 'Ale', 'Han Zhao', 'TOP', 20, 20, true, 100, 'STAY'),
('tarzan', 'Tarzan', 'Lee Seung-yong', 'JGL', 20, 20, true, 100, 'STAY'),
('shanks', 'Shanks', 'Cui Xiaojun', 'MID', 20, 20, true, 100, 'STAY'),
('hope', 'Hope', 'Wang Jie', 'BOT', 20, 20, true, 100, 'STAY'),
('kael', 'Kael', 'Kim Jin-hong', 'SPT', 20, 20, true, 100, 'STAY'),

-- ==============================================================================
-- LEC 2026년 11월 기준 최신 공식 로스터 (Shifters, NAVI 반영)
-- ==============================================================================
-- 21. G2 Esports (id: 21)
('brokenblade', 'BrokenBlade', 'Sergen Celik', 'TOP', 21, 21, true, 100, 'STAY'),
('skewmond', 'SkewMond', 'Rudy Semaan', 'JGL', 21, 21, true, 100, 'STAY'),
('caps', 'Caps', 'Rasmus Winther', 'MID', 21, 21, true, 100, 'STAY'),
('hans_sama', 'Hans Sama', 'Steven Liv', 'BOT', 21, 21, true, 100, 'STAY'),
('labrov', 'Labrov', 'Labros Papoutsakis', 'SPT', 21, 21, true, 100, 'STAY'),

-- 22. Fnatic (id: 22)
('oscarinin', 'Oscarinin', 'Oscar Munoz', 'TOP', 22, 22, true, 100, 'STAY'),
('razork', 'Razork', 'Ivan Martin', 'JGL', 22, 22, true, 100, 'STAY'),
('vladi', 'Vladi', 'VladimiR Bilohorats', 'MID', 22, 22, true, 100, 'STAY'),
('upset', 'Upset', 'Elias Lipp', 'BOT', 22, 22, true, 100, 'STAY'),
('lospa', 'Lospa', 'Park Joon-hyeong', 'SPT', 22, 22, true, 100, 'STAY'),

-- 23. Movistar KOI (MDK) (id: 23)
('myrwn', 'Myrwn', 'Alex Pastor', 'TOP', 23, 23, true, 100, 'STAY'),
('elyoya', 'Elyoya', 'Javier Prades', 'JGL', 23, 23, true, 100, 'STAY'),
('jojopyun', 'Jojopyun', 'Joseph Joon Pyun', 'MID', 23, 23, true, 100, 'STAY'),
('supa', 'Supa', 'David Garcia', 'BOT', 23, 23, true, 100, 'STAY'),
('alvaro', 'Alvaro', 'Alvaro Fernandez', 'SPT', 23, 23, true, 100, 'STAY'),

-- 24. Shifters (구 Team BDS) (id: 24)
('rooster', 'Rooster', 'Shin Yun-hwan', 'TOP', 24, 24, true, 100, 'STAY'),
('boukada', 'Boukada', 'Mehdi Leni', 'JGL', 24, 24, true, 100, 'STAY'),
('nuc', 'Nuc', 'Ilias Bizriken', 'MID', 24, 24, true, 100, 'STAY'),
('paduck', 'Paduck', 'Park Seok-hyeon', 'BOT', 24, 24, true, 100, 'STAY'),
('trymbi', 'Trymbi', 'Adrian Trybus', 'SPT', 24, 24, true, 100, 'STAY'),

-- 25. Karmine Corp (id: 25)
('canna', 'Canna', 'Kim Chang-dong', 'TOP', 25, 25, true, 100, 'STAY'),
('yike', 'Yike', 'Martin Sundelin', 'JGL', 25, 25, true, 100, 'STAY'),
('vladimir', 'VladimiR', 'Volodymyr Bilohorats', 'MID', 25, 25, true, 100, 'STAY'),
('caliste', 'Caliste', 'Caliste Henry-Hennebert', 'BOT', 25, 25, true, 100, 'STAY'),
('busio', 'Busio', 'Alan Cwalina', 'SPT', 25, 25, true, 100, 'STAY'),

-- 26. Team Vitality (id: 26)
('naak_nako', 'Naak_Nako', 'Kaan Okan', 'TOP', 26, 26, true, 100, 'STAY'),
('lyncas', 'Lyncas', 'Linas Nauncikas', 'JGL', 26, 26, true, 100, 'STAY'),
('vetheo', 'Vetheo', 'Vincent Berrie', 'MID', 26, 26, true, 100, 'STAY'),
('carzzy', 'Carzzy', 'Matyas Orsag', 'BOT', 26, 26, true, 100, 'STAY'),
('hylissang', 'Hylissang', 'Zdravets Galabov', 'SPT', 26, 26, true, 100, 'STAY'),

-- 27. SK Gaming (id: 27)
('wunder', 'Wunder', 'Martin Hansen', 'TOP', 27, 27, true, 100, 'STAY'),
('skeanz', 'Skeanz', 'Duncan Marquet', 'JGL', 27, 27, true, 100, 'STAY'),
('lider', 'LIDER', 'Adam Ilyasov', 'MID', 27, 27, true, 100, 'STAY'),
('jopa', 'Jopa', 'Josip Cancar', 'BOT', 27, 27, true, 100, 'STAY'),
('mikyx', 'Mikyx', 'Mihael Mehle', 'SPT', 27, 27, true, 100, 'STAY'),

-- 28. Team Heretics (id: 28)
('tracyn', 'Tracyn', 'Sebastian Wojton', 'TOP', 28, 28, true, 100, 'STAY'),
('daglas', 'Daglas', 'Kacper Dagiel', 'JGL', 28, 28, true, 100, 'STAY'),
('serin', 'Serin', 'Tolga Olmez', 'MID', 28, 28, true, 100, 'STAY'),
('hype', 'Hype', '변정현', 'BOT', 28, 28, true, 100, 'STAY'),
('stend', 'Stend', 'Paul Lardin', 'SPT', 28, 28, true, 100, 'STAY'),
('ice', 'Ice', 'Yoon Sang-hoon', 'BOT', 28, 28, false, 100, 'STAY'),

-- 29. GIANTX (id: 29)
('lot', 'Lot', 'Eren Yildiz', 'TOP', 29, 29, true, 100, 'STAY'),
('isma', 'ISMA', 'Ismail Boualem', 'JGL', 29, 29, true, 100, 'STAY'),
('jackies', 'Jackies', 'Adam Jerabek', 'MID', 29, 29, true, 100, 'STAY'),
('flakked', 'Flakked', 'Victor Lirola', 'BOT', 29, 29, true, 100, 'STAY'),
('jun', 'Jun', 'Yoon Se-jun', 'SPT', 29, 29, true, 100, 'STAY'),

-- 30. Natus Vincere (id: 30) - 2026 LEC 신규 합류
('maynter', 'Maynter', 'Volodymyr Sorokin', 'TOP', 30, 30, true, 100, 'STAY'),
('rhilech', 'Rhilech', 'Enes Ucan', 'JGL', 30, 30, true, 100, 'STAY'),
('poby', 'Poby', 'Yoon Sung-won', 'MID', 30, 30, true, 100, 'STAY'),
('hans_samd', 'Hans SamD', 'Lee Jae-hoon', 'BOT', 30, 30, true, 100, 'STAY'),
('parus', 'Parus', 'Polat Furkan Cicek', 'SPT', 30, 30, true, 100, 'STAY'),

-- ==============================================================================
-- LCS (Americas North) 2026년 11월 기준 최신 공식 로스터 (Sentinels 인수 반영)
-- ==============================================================================
-- 31. FlyQuest (id: 31)
('gakgos', 'Gakgos', 'Gokhan Acikgoz', 'TOP', 31, 31, true, 100, 'STAY'),
('gryffinn', 'Gryffinn', 'Gryffinn Lee', 'JGL', 31, 31, true, 100, 'STAY'),
('quad', 'Quad', 'Song Su-hyeong', 'MID', 31, 31, true, 100, 'STAY'),
('massu', 'Massu', 'Fahad Abdulmalek', 'BOT', 31, 31, true, 100, 'STAY'),
('cryogen', 'Cryogen', 'Christian Aho', 'SPT', 31, 31, true, 100, 'STAY'),

-- 32. Team Liquid (id: 32)
('morgan', 'Morgan', 'Park Ru-han', 'TOP', 32, 32, true, 100, 'STAY'),
('josedeodo', 'Josedeodo', 'Brandon Joel Villegas', 'JGL', 32, 32, true, 100, 'STAY'),
('quid', 'Quid', 'Lim Hyeon-seung', 'MID', 32, 32, true, 100, 'STAY'),
('yeon', 'Yeon', 'Sean Sung', 'BOT', 32, 32, true, 100, 'STAY'),
('corejj', 'CoreJJ', 'Jo Yong-in', 'SPT', 32, 32, true, 100, 'STAY'),

-- 33. Cloud9 (id: 33)
('thanatos', 'Thanatos', 'Park Seung-gyu', 'TOP', 33, 33, true, 100, 'STAY'),
('blaber', 'Blaber', 'Robert Huang', 'JGL', 33, 33, true, 100, 'STAY'),
('apa', 'APA', 'Eain Stearns', 'MID', 33, 33, true, 100, 'STAY'),
('zven', 'Zven', 'Jesper Svenningsen', 'BOT', 33, 33, true, 100, 'STAY'),
('vulcan', 'VULCAN', 'Philippe Laflamme', 'SPT', 33, 33, true, 100, 'STAY'),

-- 34. Sentinels (id: 34) - 100T 슬롯 인수 2026 신규 팀
('impact', 'Impact', 'Jeong Eon-young', 'TOP', 34, 34, true, 100, 'STAY'),
('hambak', 'HamBak', 'Ham Yoo-jin', 'JGL', 34, 34, true, 100, 'STAY'),
('darkwings', 'DARKWINGS', 'Isaac Chou', 'MID', 34, 34, true, 100, 'STAY'),
('rahel', 'Rahel', 'Cho Min-seong', 'BOT', 34, 34, true, 100, 'STAY'),
('huhi', 'huhi', 'Choi Jae-hyun', 'SPT', 34, 34, true, 100, 'STAY'),

-- 35. Shopify Rebellion (id: 35)
('fudge', 'Fudge', 'Ibrahim Allami', 'TOP', 35, 35, true, 100, 'STAY'),
('contractz', 'Contractz', 'Juan Arturo Garcia', 'JGL', 35, 35, true, 100, 'STAY'),
('zinie', 'Zinie', 'Yoo Baek-jin', 'MID', 35, 35, true, 100, 'STAY'),
('bvoy', 'Bvoy', 'Joo Yeong-hoon', 'BOT', 35, 35, true, 100, 'STAY'),
('zeyzal', 'Zeyzal', 'Tristan Stidam', 'SPT', 35, 35, true, 100, 'STAY'),

-- 36. Dignitas (id: 36)
('photon', 'Photon', 'Kyeong Gyu-tae', 'TOP', 36, 36, true, 100, 'STAY'),
('exyu', 'eXyu', 'Lawrence Xu', 'JGL', 36, 36, true, 100, 'STAY'),
('palafox', 'Palafox', 'David Penn', 'MID', 36, 36, true, 100, 'STAY'),
('fbi', 'FBI', 'Ian Victor Huang', 'BOT', 36, 36, true, 100, 'STAY'),
('ignar', 'IgNar', 'Lee Dong-geun', 'SPT', 36, 36, true, 100, 'STAY'),

-- 37. Disguised (id: 37)
('castle', 'Castle', 'Cho Hyeon-seong', 'TOP', 37, 37, true, 100, 'STAY'),
('kryra', 'KryRa', 'Christian Rahaian', 'JGL', 37, 37, true, 100, 'STAY'),
('callme', 'Callme', 'Oh Ji-hoon', 'MID', 37, 37, true, 100, 'STAY'),
('sajed', 'sajed', 'Sajed Ziade', 'BOT', 37, 37, true, 100, 'STAY'),
('lyonz', 'Lyonz', 'Pedro Luis Peralta', 'SPT', 37, 37, true, 100, 'STAY'),

-- 38. Lyon Gaming (id: 38)
('zamudo', 'Zamudo', 'Moises David', 'TOP', 38, 38, true, 100, 'STAY'),
('inspired', 'Inspired', 'Kacper Sloma', 'JGL', 38, 38, true, 100, 'STAY'),
('saint', 'Saint', 'David De Guia', 'MID', 38, 38, true, 100, 'STAY'),
('berserker', 'Berserker', 'Kim Min-cheol', 'BOT', 38, 38, true, 100, 'STAY'),
('isles', 'Isles', 'Jonah Rosario', 'SPT', 38, 38, true, 100, 'STAY'),

-- ==============================================================================
-- LCP (아시아태평양) 2026년 11월 기준 최신 공식 로스터 (Secret Whales, DCG, GZ 반영)
-- ==============================================================================
-- 39. Secret Whales (구 Team Secret) (id: 39) - 2026 LCP 전 시즌 챔피언
('pun', 'Pun', 'Nguyen Dang Khoa', 'TOP', 39, 39, true, 100, 'STAY'),
('hizto', 'Hizto', 'Le Van Hoang Hai', 'JGL', 39, 39, true, 100, 'STAY'),
('dire', 'Dire', 'Tran Duy Duc', 'MID', 39, 39, true, 100, 'STAY'),
('eddie', 'Eddie', 'Nghia Hoang', 'BOT', 39, 39, true, 100, 'STAY'),
('bie', 'Bie', 'Tran Duc Hieu', 'SPT', 39, 39, true, 100, 'STAY'),
('hiro02', 'Hiro02', 'Le Le Hai', 'TOP', 39, 39, false, 100, 'STAY'),

-- 40. GAM Esports (id: 40)
('kiaya', 'Kiaya', 'Tran Duy Sang', 'TOP', 40, 40, true, 100, 'STAY'),
('levi', 'Levi', 'Do Duy Khanh', 'JGL', 40, 40, true, 100, 'STAY'),
('aress', 'Aress', 'Doan Van Hieu', 'MID', 40, 40, true, 100, 'STAY'),
('easylove', 'EasyLove', 'Hua Thanh An', 'BOT', 40, 40, true, 100, 'STAY'),
('elio', 'Elio', 'Pham Thach Nhan Bang', 'SPT', 40, 40, true, 100, 'STAY'),

-- 41. Fukuoka SoftBank HAWKS gaming (id: 41)
('evi', 'Evi', 'Shunsuke Murase', 'TOP', 41, 41, true, 100, 'STAY'),
('forest', 'Forest', 'Lee Hyeon-seo', 'JGL', 41, 41, true, 100, 'STAY'),
('dasher', 'DasheR', 'Kim Deok-beom', 'MID', 41, 41, true, 100, 'STAY'),
('marble', 'Marble', 'Ryo Endo', 'BOT', 41, 41, true, 100, 'STAY'),
('vsta', 'Vsta', 'Oh Hyo-seok', 'SPT', 41, 41, true, 100, 'STAY'),

-- 42. CTBC Flying Oyster (id: 42)
('rest', 'Rest', 'Hsu Shih-chieh', 'TOP', 42, 42, true, 100, 'STAY'),
('shad0w', 'Shad0w', 'Zhiqiang Zhao', 'JGL', 42, 42, true, 100, 'STAY'),
('pungyeon', 'Pungyeon', 'Lee Jong-hyeok', 'MID', 42, 42, true, 100, 'STAY'),
('doggo', 'Doggo', 'Chiu Tzu-Chuan', 'BOT', 42, 42, true, 100, 'STAY'),
('orca', 'Orca', 'Chen Wei-chieh', 'SPT', 42, 42, true, 100, 'STAY'),

-- 43. MVK Esports (구 Vikings Esports) (id: 43)
('kratos', 'Kratos', 'Ngo Duc Khanh', 'TOP', 43, 43, true, 100, 'STAY'),
('gury', 'Gury', 'Luong Hai Long', 'JGL', 43, 43, true, 100, 'STAY'),
('chika', 'Chika', 'Vo Le Nhan', 'MID', 43, 43, true, 100, 'STAY'),
('harky', 'Harky', 'Nguyen Van Huu', 'BOT', 43, 43, true, 100, 'STAY'),
('siuloong', 'SiuLoong', 'Nguyen Hoang Lam', 'SPT', 43, 43, true, 100, 'STAY'),

-- 44. Deep Cross Gaming (id: 44) - 2026 LCP 준우승/MSI 진출
('xiaoxiang', 'XiaoXiang', 'Yi-Xiang Liao', 'TOP', 44, 44, true, 100, 'STAY'),
('pop9', 'Pop9', 'Yi-Han Wu', 'JGL', 44, 44, true, 100, 'STAY'),
('hongsuo', 'HongSuo', 'Bei-Yi Guo', 'MID', 44, 44, true, 100, 'STAY'),
('flauren', 'Flauren', 'Chak-Kin Lo', 'BOT', 44, 44, true, 100, 'STAY'),
('shiauc', 'ShiauC', 'Jia-Hao Liu', 'SPT', 44, 44, true, 100, 'STAY'),

-- 45. DetonatioN FocusMe (id: 45)
('rayfarky', 'RayFarky', 'Shinohara Ryuki', 'TOP', 45, 45, true, 100, 'STAY'),
('steal', 'Steal', 'Moon Geon-yeong', 'JGL', 45, 45, true, 100, 'STAY'),
('aria', 'Aria', 'Lee Ga-eul', 'MID', 45, 45, true, 100, 'STAY'),
('milan', 'Milan', 'Arai Takumi', 'BOT', 45, 45, true, 100, 'STAY'),
('harp', 'Harp', 'Lee Ji-yoong', 'SPT', 45, 45, true, 100, 'STAY'),

-- 46. Ground Zero Gaming (id: 46) - 2026 LCP 신규 게스트 팀
('1jiang', '1Jiang', 'Chen Yi-chin', 'TOP', 46, 46, true, 100, 'STAY'),
('husha', 'Husha', 'Huang Tzu-wei', 'JGL', 46, 46, true, 100, 'STAY'),
('uniboy', 'Uniboy', 'Chen Chang-chu', 'MID', 46, 46, true, 100, 'STAY'),
('betty', 'Betty', 'Lu Yu-hung', 'BOT', 46, 46, true, 100, 'STAY'),
('kaiwing', 'Kaiwing', 'Ling Kai Wing', 'SPT', 46, 46, true, 100, 'STAY'),

-- ==============================================================================
-- CBLOL (Americas South) 2026년 11월 기준 최신 공식 로스터 (Leviatan, Fluxo W7M 반영)
-- ==============================================================================
-- 47. paiN Gaming (id: 47)
('boal', 'Boal', 'Felipe Boal', 'TOP', 47, 47, true, 100, 'STAY'),
('cariok', 'CarioK', 'Marcos Santos', 'JGL', 47, 47, true, 100, 'STAY'),
('keine', 'Keine', 'Kim Joon-young', 'MID', 47, 47, true, 100, 'STAY'),
('hena', 'Hena', 'Park Jeung-hwan', 'BOT', 47, 47, true, 100, 'STAY'),
('ceos', 'Ceos', 'Denilson Oliveira', 'SPT', 47, 47, true, 100, 'STAY'),

-- 48. LOUD (id: 48)
('xyno', 'xyno', 'Carlos Ferreira', 'TOP', 48, 48, true, 100, 'STAY'),
('youngjae', 'YoungJae', 'Ko Yeong-jae', 'JGL', 48, 48, true, 100, 'STAY'),
('envy', 'Envy', 'Lee Dong-ju', 'MID', 48, 48, true, 100, 'STAY'),
('bull', 'Bull', 'Song Seon-gyu', 'BOT', 48, 48, true, 100, 'STAY'),
('uzent', 'uZent', 'Gabriel Dutra', 'SPT', 48, 48, true, 100, 'STAY'),

-- 49. Vivo Keyd Stars (id: 49)
('zekas', 'ZekaS', 'Cesar Berteli Franca', 'TOP', 49, 49, true, 100, 'STAY'),
('disamis', 'Disamis', 'Pedro Gonsaubes', 'JGL', 49, 49, true, 100, 'STAY'),
('mireu', 'Mireu', 'Jeong Jo-bin', 'MID', 49, 49, true, 100, 'STAY'),
('jeskla', 'Jeskla', 'Jesper Stromberg', 'BOT', 49, 49, true, 100, 'STAY'),
('scamber', 'scamber', 'Pedro Lameiras', 'SPT', 49, 49, true, 100, 'STAY'),

-- 50. RED Canids (id: 50)
('zynts', 'zynts', 'Matheus Emanuel Silva', 'TOP', 50, 50, true, 100, 'STAY'),
('stepz', 'STEPZ', 'Eloy Rodriguez', 'JGL', 50, 50, true, 100, 'STAY'),
('fuuu', 'Fuuu', 'Gabriel Furuuti', 'MID', 50, 50, true, 100, 'STAY'),
('morttheus', 'Morttheus', 'Matheus Motta', 'BOT', 50, 50, true, 100, 'STAY'),
('frosty', 'frosty', 'Jose Eduardo', 'SPT', 50, 50, true, 100, 'STAY'),

-- 51. FURIA (id: 51)
('zzk', 'Zzk', 'Lucas Silveira', 'TOP', 51, 51, true, 100, 'STAY'),
('wiz', 'Wiz', 'Lee Han-seul', 'JGL', 51, 51, true, 100, 'STAY'),
('tutsz', 'Tutsz', 'Arthur Machado', 'MID', 51, 51, true, 100, 'STAY'),
('ayu', 'Ayu', 'Andrey Saraiva', 'BOT', 51, 51, true, 100, 'STAY'),
('zay', 'Zay', 'Vinicius Viana', 'SPT', 51, 51, true, 100, 'STAY'),

-- 52. Fluxo W7M (구 Fluxo) (id: 52)
('kiari', 'Kiari', 'Thiago Luiz', 'TOP', 52, 52, true, 100, 'STAY'),
('shini', 'Shini', 'Diogo Roge', 'JGL', 52, 52, true, 100, 'STAY'),
('furada', 'Furada', 'Pedro Rossi', 'MID', 52, 52, true, 100, 'STAY'),
('trigo', 'Trigo', 'Matheus Nobrega', 'BOT', 52, 52, true, 100, 'STAY'),
('scuro', 'Scuro', 'Gabriel Scuro', 'SPT', 52, 52, true, 100, 'STAY'),

-- 53. Leviatan (id: 53) - 2026 신규 합류
('devost', 'Devost', 'Julian Orozco', 'TOP', 53, 53, true, 100, 'STAY'),
('booki', 'Booki', 'Piero Aldo Medina', 'JGL', 53, 53, true, 100, 'STAY'),
('enga', 'Enga', 'Eneas Protti', 'MID', 53, 53, true, 100, 'STAY'),
('strensh', 'Strensh', 'Cristopher Gustavo Gonzalez', 'BOT', 53, 53, true, 100, 'STAY'),
('shiku', 'Shiku', 'Carlo Andre Carrion', 'SPT', 53, 53, true, 100, 'STAY'),

-- 54. Los Grandes (id: 54)
('zest', 'Zest', 'Kim Dong-min', 'TOP', 54, 54, true, 100, 'STAY'),
('curse', 'Curse', 'Rai Yamada', 'JGL', 54, 54, true, 100, 'STAY'),
('feisty', 'Feisty', 'Jeong Seong-hoon', 'MID', 54, 54, true, 100, 'STAY'),
('duduhh', 'Duduhh', 'Wallyson Silva', 'BOT', 54, 54, true, 100, 'STAY'),
('ackerman', 'Ackerman', 'Gabriel Aparicio', 'SPT', 54, 54, true, 100, 'STAY'),

-- 2027 스토브리그 FA / 복귀 / 콜업 영입 대상 선수 (2026 소속 NULL)
('deft', 'Deft', '김혁규', 'BOT', NULL, 9, false, 94, 'RUMORED'),
('3xa', '3XA', 'Thomas Foucou', 'BOT', NULL, 27, false, 95, 'RUMORED'),
('piero', 'Piero', '김정훈', 'SPT', NULL, 29, false, 95, 'RUMORED');

-- 4. 2026 시즌 LCK 감코진 (감독 role='HEAD_COACH' / 코치 role='COACH')
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

-- 5. 선수 이적 및 소속 변경 전용 프로시저 (1인 1팀 무결성 보장)
CREATE OR REPLACE FUNCTION move_player(
    p_slug VARCHAR(60),
    p_target_team_id INT,
    p_is_starter BOOLEAN DEFAULT true,
    p_status VARCHAR(20) DEFAULT 'CONFIRMED'
)
RETURNS VOID AS $$
BEGIN
    IF p_is_starter = true AND p_target_team_id IS NOT NULL THEN
        UPDATE players
        SET is_starter = false,
            updated_at = NOW()
        WHERE current_team_id = p_target_team_id
          AND position = (SELECT position FROM players WHERE slug = p_slug)
          AND is_starter = true;
    END IF;

    UPDATE players
    SET current_team_id = p_target_team_id,
        predicted_team_id = p_target_team_id,
        is_starter = p_is_starter,
        status = p_status,
        updated_at = NOW()
    WHERE slug = p_slug;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 6. 2027 스토브리그 실제 검증된 찌라시(루머) 타임라인 데이터 (34건, HTTP 200 검증 완료)
-- ==============================================================================
INSERT INTO rumors (post_id, source, author, raw_text, summary, player_id, target_team_id, confidence, post_url, published_at) VALUES
('rv-20261105-zeus-t1', 'COMMUNITY', '인벤 스토브 찌라시 (Inven)', '제우스 FA 및 에이전트 변경 소식과 함께 폭마갤·커뮤니티 찌라시에서도 한화생명 잔류보다 T1 복귀 가능성이 높다는 이야기가 확산 중.', '[스토브 찌라시] 한화생명 제우스(Zeus), 에이전트 변경 및 2027 시즌 T1 전격 복귀설 급부상 (Zeus rumored to return to T1 after agency change)', (SELECT id FROM players WHERE slug = 'zeus'), 1, 78, 'https://www.inven.co.kr/board/lol/4625/4274150', '2026-11-05T15:30:00Z'),
('rv-20261105-lyncas-g2', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Lithuanian jungler Linas ''Lyncas'' Nauncikas is set to join G2 Esports ahead of the 2027 LEC season, replacing SkewMond on the active starting roster and reuniting with coach Pad.', '[울루/Sheep Esports] G2 Esports, 바이탈리티 정글러 린카스(Lyncas) 2027 시즌 영입 합의 (Lyncas set to join G2 Esports ahead of 2027 LEC season)', (SELECT id FROM players WHERE slug = 'lyncas'), 21, 95, 'https://www.reddit.com/r/leagueoflegends/comments/1xnrlza/sources_lyncas_set_to_join_g2_esports_ahead_of/', '2026-11-05T13:20:00Z'),
('rv-20261105-skewmond-g2', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Rudy ''SkewMond'' Semaan won''t continue on G2 Esports'' active roster in 2027 despite being under contract until November 2028, as G2 restructures its jungle-coaching duo.', '[울루/Sheep Esports] 스큐몬드(SkewMond), 2027 시즌 G2 주전 로스터 제외 및 타 팀 이적 타진 (SkewMond won''t continue on G2 active roster in 2027)', (SELECT id FROM players WHERE slug = 'skewmond'), 26, 90, 'https://www.reddit.com/r/leagueoflegends/comments/1xnpaei/sources_skewmond_wont_continue_on_g2_esports/', '2026-11-05T11:45:00Z'),
('rv-20261105-naaknako-g2', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Movistar KOI, NAVI and G2 Esports have approached Team Vitality regarding Turkish star top laner Kaan ''Naak Nako'' Okan, with G2 making him their top priority for 2027.', '[울루/Sheep Esports] G2·MKOI·NAVI, 바이탈리티 탑 낙나코(Naak Nako) 영입전 참전… G2 최우선 타깃 (G2, MKOI, and NAVI approach Vitality for Naak Nako)', (SELECT id FROM players WHERE slug = 'naak_nako'), 21, 82, 'https://www.reddit.com/r/leagueoflegends/comments/1xnzw9p/sheep_esports_sources_movistar_koi_navi_and_g2/', '2026-11-05T09:10:00Z'),
('rv-20261104-viper-krx', 'COMMUNITY', '인벤 스토브 찌라시 (Inven)', '이번 스토브리그 원딜 최대어는 바이퍼(Viper)의 LCK 리턴 여부. DRX가 롤 게임단에 대대적 투자를 예고하며 스카웃·바이퍼·도란·리핸즈 등 대어급 매물에 대형 오퍼를 넣었다는 찌라시.', '[스토브 찌라시] BLG 바이퍼(Viper) LCK 복귀설 및 키움 DRX(KRX) 초대형 영입 오퍼 타진 (Viper rumored to return to LCK with massive offer from DRX)', (SELECT id FROM players WHERE slug = 'viper'), 8, 74, 'https://www.inven.co.kr/board/lol/4625/4273398', '2026-11-04T21:30:00Z'),
('rv-20261104-kanavi-hle', 'COMMUNITY', '인벤 스토브 찌라시 (Inven)', '한화생명e스포츠(HLE) 카나비(Kanavi) 선수의 거취와 관련해 구단 공식 축전 및 시장 상황상 한화생명이 주전 코어 라인업(카나비-제카-구마유시-딜라이트) 재계약 및 유지를 택할 가능성이 높다는 분석.', '[스토브 찌라시] 한화생명(HLE), 정글러 카나비(Kanavi) 재계약 및 주전 라인업 잔류 기조 유력 (HLE expected to re-sign jungler Kanavi for 2027)', (SELECT id FROM players WHERE slug = 'kanavi'), 3, 85, 'https://www.inven.co.kr/board/lol/4625/4273189', '2026-11-04T18:00:00Z'),
('rv-20261104-369-tes', 'COMMUNITY', '인벤 스토브 찌라시 (Inven)', '2026년 11월 17일 TES와의 계약 만료를 앞둔 탑라이너 369 선수가 LPL 및 LCK 스토브리그 탑 영입 1순위 매물로 꼽히며 TES의 최우선 재계약 협상이 진행 중.', '[스토브 찌라시] TES 탑라이너 369, 계약 만료 앞두고 스토브리그 최우선 재계약 협상 돌입 (TES top laner 369 enters key extension talks ahead of November expiry)', (SELECT id FROM players WHERE slug = '369'), 12, 84, 'https://www.inven.co.kr/board/lol/4625/4273612', '2026-11-04T15:10:00Z'),
('rv-20261104-doran-gen', 'COMMUNITY', '인벤 스토브 찌라시 (Inven)', '제우스의 T1 복귀설과 맞물려 T1 도란(Doran)과 한화생명·젠지 간 연쇄 탑 이동 시나리오가 스토브리그 최대 화두로 부상. 도란의 T1 재계약 여부 및 빅클럽 이동 루머.', '[스토브 찌라시] T1 도란(Doran), FA 계약 만료 앞두고 재계약 및 빅클럽 연쇄 이동설 (Doran at the center of LCK top lane dominoes for 2027)', (SELECT id FROM players WHERE slug = 'doran'), 2, 70, 'https://www.inven.co.kr/board/lol/4625/4273392', '2026-11-04T12:20:00Z'),
('rv-20261104-kiin-hle', 'COMMUNITY', '인벤 스토브 찌라시 (Inven)', '한화생명에서 제우스가 이탈할 경우 1순위 대체자로 젠지 기인(Kiin) 영입에 나설 것이라는 스토브리그 연쇄 이동 시나리오가 제기됨.', '[스토브 찌라시] 한화생명(HLE), 제우스 이탈 대비해 젠지 탑 기인(Kiin) 영입 시나리오 부상 (HLE rumored to target Gen.G top laner Kiin if Zeus departs)', (SELECT id FROM players WHERE slug = 'kiin'), 3, 72, 'https://www.inven.co.kr/board/lol/4625/4273322', '2026-11-04T09:40:00Z'),
('rv-20261103-siwoo-dk', 'COMMUNITY', '인벤 스토브 찌라시 (Inven)', '각 팀 2027 시즌 탑 구도 정리: 디플러스 기아(DK)는 전시우(Siwoo) 선수가 2027년 11월까지 계약되어 있어 주전 탑 잔류 확정.', '[스토브 정리] 디플러스 기아(DK), 에이스 탑 시우(Siwoo) 2027 시즌 주전 잔류 확정 (Dplus KIA locks in top laner Siwoo for 2027 season)', (SELECT id FROM players WHERE slug = 'siwoo'), 4, 98, 'https://www.inven.co.kr/board/lol/4625/4273151', '2026-11-03T19:00:00Z'),
('rv-20261102-mikyx-vit', 'TWITTER', 'Sheep Esports / Rostermania', '[Sources] Veteran support Mihael ''Mikyx'' Mehle from SK Gaming is actively participating in Team Vitality''s tryouts ahead of the 2027 LEC season.', '[울루/Rostermania] SK 게이밍 서포터 미킥스(Mikyx), 2027 시즌 Team Vitality 트라이아웃 참가 (SK Gaming support Mikyx participating in Team Vitality tryouts)', (SELECT id FROM players WHERE slug = 'mikyx'), 26, 78, 'https://rostermania.lol/en/lec', '2026-11-02T16:30:00Z'),
('rv-20261101-lospa-sk', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Korean support Park ''Lospa'' Joon-hyeong is set to join SK Gaming for the 2027 LEC season after leaving Fnatic, reaching a verbal agreement with the German organization.', '[울루/Sheep Esports] 프나틱 서포터 로스파(Lospa), 2027 시즌 SK Gaming 이적 구두 합의 (Fnatic support Lospa set to join SK Gaming for 2027 LEC)', (SELECT id FROM players WHERE slug = 'lospa'), 27, 95, 'https://www.reddit.com/r/leagueoflegends/comments/1xl8d20/sources_lospa_set_to_join_sk_gaming_for_2027_in/', '2026-11-01T18:45:00Z'),
('rv-20261101-brokenblade-mkoi', 'TWITTER', 'Rostermania (@rostermania_lol)', '[Sources] G2 Esports top laner Sergen ''BrokenBlade'' Çelik is Movistar KOI''s main option for the toplane in 2027. MKOI is preparing a mega offer to sign him.', '[Rostermania] Movistar KOI, G2 탑라이너 브로큰블레이드(BrokenBlade) 영입 위해 대형 오퍼 준비 (BrokenBlade is Movistar KOI''s main option for top lane in 2027)', (SELECT id FROM players WHERE slug = 'brokenblade'), 23, 76, 'https://rostermania.lol/en/lec', '2026-11-01T14:15:00Z'),
('rv-20261030-tracyn-th', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Official / Sources] Top laner Sebastian ''Tracyn'' Wojtoń has extended his contract with Team Heretics until the end of the 2028 LEC season.', '[울루/오피셜] Team Heretics, 탑라이너 트레이신(Tracyn)과 2028년까지 다년 연장 계약 체결 (Tracyn extends contract with Team Heretics until 2028)', (SELECT id FROM players WHERE slug = 'tracyn'), 28, 100, 'https://www.reddit.com/r/leagueoflegends/comments/1xjinul/official_tracyn_extends_with_team_heretics_until/', '2026-10-30T17:00:00Z'),
('rv-20261029-hype-th', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Korean AD Carry 변정현 ''Hype'' has reached an agreement to remain with Team Heretics in 2027 after accepting a pay cut to stay with the revamped roster.', '[울루/Sheep Esports] 한국인 원딜 하이프(Hype), 연봉 조정 수용하며 2027 시즌 Team Heretics 잔류 합의 (Hype reaches agreement to remain with Team Heretics in 2027)', (SELECT id FROM players WHERE slug = 'hype'), 28, 96, 'https://www.reddit.com/r/leagueoflegends/comments/1xirr7z/sheep_esports_hype_has_reached_an_agreement_to/', '2026-10-29T16:20:00Z'),
('rv-20261028-rhilech-navi', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Natus Vincere (NAVI) plans to rebuild its entire 2027 LEC roster around jungler Enes ''Rhilech'' Uçan while allowing Maynter, Poby, SamD and Parus to explore options.', '[울루/Sheep Esports] NAVI, 2027 시즌 정글러 릴레흐(Rhilech) 중심 전면 리빌딩 확정 (NAVI to rebuild 2027 LEC roster around jungler Rhilech)', (SELECT id FROM players WHERE slug = 'rhilech'), 30, 95, 'https://www.reddit.com/r/leagueoflegends/comments/1xhx4sq/sheep_esports_sources_navi_to_rebuild_around/', '2026-10-28T15:10:00Z'),
('rv-20261027-tarzan-wbg', 'WEIBO', '웨이보 / 인벤 찌라시', 'AL의 월즈 일정 종료 후 중국 웨이보 및 커뮤니티에서 정글러 타잔(Tarzan) 선수가 새 시즌 더 높은 체급의 로스터(WBG 등)로 이적할 가능성에 대한 논의가 확산 중.', '[웨이보/인벤] AL 정글러 타잔(Tarzan), 2027 시즌 WBG 등 상위권 구단 이적 가능성 부상 (AL jungler Tarzan linked with potential move to WBG for 2027)', (SELECT id FROM players WHERE slug = 'tarzan'), 14, 73, 'https://www.inven.co.kr/board/lol/4625/4270740', '2026-10-27T14:00:00Z'),
('rv-20261026-serin-th', 'TWITTER', 'Team Heretics / Sheep Esports', 'Today we part ways with Serin. Following his departure from Team Heretics, mid laner Tolga ''Serin'' Ölmez is set to return to Galions for the 2027 season.', '[오피셜/울루] 미드라이너 세린(Serin), Team Heretics와 계약 종료 및 2027 시즌 Galions 복귀 (Serin parts ways with Team Heretics and returns to Galions)', (SELECT id FROM players WHERE slug = 'serin'), NULL, 100, 'https://x.com/HereticsLEC/status/2114749355253022721', '2026-10-26T18:00:00Z'),
('rv-20261023-3xa-sk', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] AD Carry Thomas ''3XA'' Foucou (formerly Exakick) is set to rejoin SK Gaming in the LEC for the 2027 season, pairing with support Lospa.', '[울루/Sheep Esports] 원딜 3XA(구 Exakick), 2027 시즌 SK Gaming 전격 복귀 확정 (3XA formerly Exakick set to rejoin SK Gaming in the LEC)', (SELECT id FROM players WHERE slug = '3xa'), 27, 95, 'https://www.reddit.com/r/leagueoflegends/comments/1xdfq05/sheep_esports_sources_3xa_formerly_exakick_set_to/', '2026-10-23T16:40:00Z'),
('rv-20261022-razork-th', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Spanish jungler Iván ''Razork'' Martín Díaz has chosen Team Heretics over GIANTX and is set to join Team Heretics for the 2027 LEC season after five years with Fnatic.', '[울루/Sheep Esports] 프나틱 간판 정글러 라조크(Razork), 2027 시즌 Team Heretics 전격 이적 합의 (Razork set to join Team Heretics in the LEC for 2027)', (SELECT id FROM players WHERE slug = 'razork'), 28, 96, 'https://www.reddit.com/r/leagueoflegends/comments/1xcsbex/sources_razork_is_set_to_join_team_heretics_in/', '2026-10-22T19:15:00Z'),
('rv-20261022-maynter-vit', 'TWITTER', 'EsportsBet / Rostermania', 'As NAVI rebuilds around Rhilech for 2027, Ukrainian top laner Volodymyr ''Maynter'' Sorokin and jungler Daglas have participated in tryouts for Team Vitality.', '[Rostermania] NAVI 탑라이너 메인터(Maynter) 및 정글러 다글라스(Daglas), Team Vitality 트라이아웃 진행 (Maynter and Daglas in tryouts for Team Vitality)', (SELECT id FROM players WHERE slug = 'maynter'), 26, 75, 'https://esportsbet.io/news/lol/breaking/details/Global/27446/NAVI-REPORTEDLY-PLANS-2027-REBUILD-AROUND-RHILECH/', '2026-10-22T14:00:00Z'),
('rv-20261020-apa-c9', 'TWITTER', 'APA (@alwaysplanahea1)', 'Today, I''m announcing free agency and that I''m looking for a team for the 2027 season. I enjoyed my time at C9 and looking forward to what is next.', '[오피셜] Cloud9 미드라이너 APA, C9 결별 및 2027 시즌 FA 선언 (Cloud9 mid laner APA announces free agency for 2027 season)', (SELECT id FROM players WHERE slug = 'apa'), NULL, 100, 'https://x.com/alwaysplanahea1/status/2112656559675433308', '2026-10-20T20:10:00Z'),
('rv-20261020-zven-c9', 'TWITTER', 'Zven (@Zven)', 'Today, I''m announcing free agency and that I''m looking for a team for the 2027 season. I''m grateful to C9 for giving me a chance once again.', '[오피셜] Cloud9 원딜 즈벤(Zven), 2027 시즌 FA 시장 진출 공식 선언 (Cloud9 bot laner Zven announces free agency for 2027)', (SELECT id FROM players WHERE slug = 'zven'), NULL, 100, 'https://x.com/Zven/status/2112650165815595237', '2026-10-20T19:45:00Z'),
('rv-20261019-scout-krx', 'COMMUNITY', '인벤 LCK 스토브리그 찌라시', 'LCK 스토브리그 찌라시: 키움 DRX(KRX)가 롤 게임단에 집중 투자하며 농심 스카웃(Scout) 선수를 중심으로 2027 로스터를 구축하려 한다는 관계자 썰이 제기됨.', '[LCK 찌라시] 키움 DRX(KRX), 미드 스카웃(Scout) 중심 2027 리빌딩 및 집중 투자 추진설 (DRX rumored to build 2027 roster around mid laner Scout)', (SELECT id FROM players WHERE slug = 'scout'), 8, 77, 'https://www.inven.co.kr/board/lol/4625/4268972', '2026-10-19T15:30:00Z'),
('rv-20261019-cuzz-dns', 'COMMUNITY', '인벤 LCK 스토브리그 찌라시', 'KT가 피어엑스 정글러 랩터(Raptor)를 영입함에 따라 기존 KT 정글러 커즈(Cuzz) 선수가 반등을 노리는 DN 수퍼스(DNS)로 이적한다는 스토브리그 찌라시 확산.', '[LCK 찌라시] KT 정글러 커즈(Cuzz), DN 수퍼스(DNS) 이적설 급부상… 샤벨은 농심행 루머 (KT jungler Cuzz heavily linked with move to DN SOOPers for 2027)', (SELECT id FROM players WHERE slug = 'cuzz'), 10, 80, 'https://www.inven.co.kr/board/lol/4625/4268591', '2026-10-19T11:20:00Z'),
('rv-20261019-pyosik-ns', 'COMMUNITY', '인벤 LCK 스토브리그 찌라시', '피어엑스 3인방이 KT로 향하고 커즈가 DN 수퍼스로 간다는 찌라시와 함께, 농심 레드포스(NS)가 데프트(Deft) 영입에 맞춰 정글러 표식(Pyosik) 또는 샤벨(Sharvel)을 영입한다는 소식.', '[LCK 찌라시] 농심 레드포스(NS), 데프트 합류 맞춰 정글러 표식(Pyosik) 영입 타진설 (Nongshim RedForce linked with jungler Pyosik alongside Deft)', (SELECT id FROM players WHERE slug = 'pyosik'), 9, 76, 'https://www.inven.co.kr/board/lol/4625/4268665', '2026-10-19T09:00:00Z'),
('rv-20261018-raptor-kellin-taeyoon-kt', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Raptor, Kellin and Taeyoon are expected to join KT Rolster together for the LCK 2027 season, completing a 2027 KT roster of PerfecT, Raptor, Bdd, Taeyoon and Kellin.', '[울루/Sheep Esports] 피어엑스 랩터(Raptor)·켈린(Kellin) & 태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력 (Raptor, Kellin, and Taeyoon expected to join KT Rolster for LCK 2027)', (SELECT id FROM players WHERE slug = 'raptor'), 5, 93, 'https://www.reddit.com/r/leagueoflegends/comments/1x966ie/sources_raptor_kellin_and_taeyoon_expected_to/', '2026-10-18T17:00:00Z'),
('rv-20261018-kellin-kt', 'COMMUNITY', 'Sheep Esports / 인벤', 'Sheep Esports 보도에 따르면 BNK 피어엑스의 서포터 켈린(Kellin)과 정글러 랩터(Raptor), 원딜 태윤(Taeyoon)이 2027 시즌 KT 롤스터로 이적해 퍼펙트-랩터-비디디-태윤-켈린 라인업을 구축할 예정.', '[울루/인벤] 서포터 켈린(Kellin) & 원딜 태윤(Taeyoon), 2027 시즌 KT 롤스터 이적 유력 (Kellin and Taeyoon expected to form KT Rolster''s 2027 bot lane)', (SELECT id FROM players WHERE slug = 'kellin'), 5, 93, 'https://www.inven.co.kr/board/lol/4625/4268674', '2026-10-18T16:30:00Z'),
('rv-20261016-bro-retain', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Hanjin BRION is set to retain its whole starting roster (Casting, GIDEON, Roamer, Teddy, Namgung) for the LCK 2027 season.', '[울루/오피셜] 한진 브리온(BRO), 테디(Teddy)·캐스팅·기드온·로머·남궁 2027 시즌 주전 5인 전원 재계약 성공 (Hanjin BRION retains full starting roster for LCK 2027)', (SELECT id FROM players WHERE slug = 'teddy'), 7, 99, 'https://www.reddit.com/r/leagueoflegends/comments/1x7hrys/sheep_esports_hanjin_brion_resigns_full_player/', '2026-10-16T14:00:00Z'),
('rv-20261010-deft-ns', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Legendary AD Carry Kim ''Deft'' Hyuk-kyu is set to return from mandatory military service and join Nongshim RedForce for the LCK 2027 season.', '[울루/Sheep Esports] ''중꺾마'' 데프트(Deft), 전역 후 2027 시즌 농심 레드포스(NS) 전격 합류 유력 (Deft set to join Nongshim RedForce for LCK 2027 after military service)', (SELECT id FROM players WHERE slug = 'deft'), 9, 94, 'https://www.reddit.com/r/leagueoflegends/comments/1x2i6eu/sheep_esports_deft_is_set_to_join_nongshim/', '2026-10-10T15:00:00Z'),
('rv-20261008-bdd-perfect-kt', 'TWITTER', 'Sheep Esports / RFT.GG', 'KT Rolster has officially extended the contracts of mid laner Gwak ''Bdd'' Bo-seong and top laner Lee ''PerfecT'' Seung-min for two more years through the end of the 2028 season.', '[오피셜] kt 롤스터, 미드 비디디(Bdd) 및 탑 퍼펙트(PerfecT)와 2028년까지 2년 다년 재계약 체결 (Bdd and PerfecT extend contracts with KT Rolster until 2028)', (SELECT id FROM players WHERE slug = 'bdd'), 5, 100, 'https://rft.gg/news/kt-rolster-contract-bdd-perfect-2028', '2026-10-08T12:00:00Z'),
('rv-20261005-piero-gx', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Korean support Kim ''Piero'' Jung-hun is set to join GIANTX for the LEC 2027 season after standing out in the LFL with Solary.', '[울루/Sheep Esports] 한국인 서포터 피에로(Piero), 2027 시즌 LEC GIANTX 합류 합의 (Korean support Piero set to join GIANTX for LEC 2027 season)', (SELECT id FROM players WHERE slug = 'piero'), 29, 95, 'https://www.reddit.com/r/leagueoflegends/comments/1wydjy5/sheep_esports_sources_piero_set_to_join_giantx/', '2026-10-05T16:00:00Z'),
('rv-20260929-angel-jdg', 'WEIBO', 'JD Gaming Official / JJANG.GG', 'JD Gaming officially announces the signing of veteran mid laner Xiang ''Angel'' Tao ahead of the upcoming LPL stove league window.', '[웨이보/오피셜] JD Gaming(JDG), 베테랑 미드라이너 엔젤(Angel) 영입 발표 (JD Gaming signs mid laner Angel from EDward Gaming)', (SELECT id FROM players WHERE slug = 'angel'), 13, 100, 'https://jjang.gg/stove-league/lpl', '2026-09-29T10:00:00Z'),
('rv-20260922-jun-jackies-th', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Support Yoon ''Jun'' Se-jun is set to join Team Heretics for the 2027 LEC season after delaying his military service, alongside former GIANTX teammate Jackies.', '[울루/Sheep Esports] GIANTX 서포터 준(Jun) & 미드 재키스(Jackies), 2027 시즌 Team Heretics 동반 이적 확정 (Jun and Jackies set to join Team Heretics for 2027 LEC)', (SELECT id FROM players WHERE slug = 'jun'), 28, 97, 'https://www.reddit.com/r/leagueoflegends/comments/1wnel61/sheep_esports_support_jun_is_set_to_join_team/', '2026-09-22T15:00:00Z');

-- ==============================================================================
-- 7. 찌라시 기반 2027 시즌 예상 로스터(Predicted Roster) 및 원본 링크 반영
-- ==============================================================================
UPDATE players SET predicted_team_id = 12, confidence = 84, status = 'CONFIRMED', source_url = 'https://www.inven.co.kr/board/lol/4625/4273612' WHERE slug = '369';
UPDATE players SET predicted_team_id = 1, confidence = 78, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4274150' WHERE slug = 'zeus';
UPDATE players SET predicted_team_id = 21, confidence = 95, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1xnrlza/sources_lyncas_set_to_join_g2_esports_ahead_of/' WHERE slug = 'lyncas';
UPDATE players SET predicted_team_id = 26, confidence = 90, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1xnpaei/sources_skewmond_wont_continue_on_g2_esports/' WHERE slug = 'skewmond';
UPDATE players SET predicted_team_id = 21, confidence = 82, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1xnzw9p/sheep_esports_sources_movistar_koi_navi_and_g2/' WHERE slug = 'naak_nako';
UPDATE players SET predicted_team_id = 8, confidence = 74, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4273398' WHERE slug = 'viper';
UPDATE players SET predicted_team_id = 3, confidence = 85, status = 'CONFIRMED', source_url = 'https://www.inven.co.kr/board/lol/4625/4273189' WHERE slug = 'kanavi';
UPDATE players SET predicted_team_id = 2, confidence = 70, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4273392' WHERE slug = 'doran';
UPDATE players SET predicted_team_id = 3, confidence = 72, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4273322' WHERE slug = 'kiin';
UPDATE players SET predicted_team_id = 4, confidence = 98, status = 'CONFIRMED', source_url = 'https://www.inven.co.kr/board/lol/4625/4273151' WHERE slug = 'siwoo';
UPDATE players SET predicted_team_id = 26, confidence = 78, status = 'RUMORED', source_url = 'https://rostermania.lol/en/lec' WHERE slug = 'mikyx';
UPDATE players SET predicted_team_id = 27, confidence = 95, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1xl8d20/sources_lospa_set_to_join_sk_gaming_for_2027_in/' WHERE slug = 'lospa';
UPDATE players SET predicted_team_id = 23, confidence = 76, status = 'RUMORED', source_url = 'https://rostermania.lol/en/lec' WHERE slug = 'brokenblade';
UPDATE players SET predicted_team_id = 28, confidence = 100, status = 'CONFIRMED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1xjinul/official_tracyn_extends_with_team_heretics_until/' WHERE slug = 'tracyn';
UPDATE players SET predicted_team_id = 28, confidence = 96, status = 'CONFIRMED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1xirr7z/sheep_esports_hype_has_reached_an_agreement_to/' WHERE slug = 'hype';
UPDATE players SET predicted_team_id = 30, confidence = 95, status = 'CONFIRMED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1xhx4sq/sheep_esports_sources_navi_to_rebuild_around/' WHERE slug = 'rhilech';
UPDATE players SET predicted_team_id = 14, confidence = 73, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4270740' WHERE slug = 'tarzan';
UPDATE players SET predicted_team_id = NULL, confidence = 100, status = 'FA', source_url = 'https://x.com/HereticsLEC/status/2114749355253022721' WHERE slug = 'serin';
UPDATE players SET predicted_team_id = 27, confidence = 95, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1xdfq05/sheep_esports_sources_3xa_formerly_exakick_set_to/' WHERE slug = '3xa';
UPDATE players SET predicted_team_id = 28, confidence = 96, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1xcsbex/sources_razork_is_set_to_join_team_heretics_in/' WHERE slug = 'razork';
UPDATE players SET predicted_team_id = 26, confidence = 75, status = 'RUMORED', source_url = 'https://esportsbet.io/news/lol/breaking/details/Global/27446/NAVI-REPORTEDLY-PLANS-2027-REBUILD-AROUND-RHILECH/' WHERE slug = 'maynter';
UPDATE players SET predicted_team_id = NULL, confidence = 100, status = 'FA', source_url = 'https://x.com/alwaysplanahea1/status/2112656559675433308' WHERE slug = 'apa';
UPDATE players SET predicted_team_id = NULL, confidence = 100, status = 'FA', source_url = 'https://x.com/Zven/status/2112650165815595237' WHERE slug = 'zven';
UPDATE players SET predicted_team_id = 8, confidence = 77, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4268972' WHERE slug = 'scout';
UPDATE players SET predicted_team_id = 10, confidence = 80, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4268591' WHERE slug = 'cuzz';
UPDATE players SET predicted_team_id = 9, confidence = 76, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4268665' WHERE slug = 'pyosik';
UPDATE players SET predicted_team_id = 5, confidence = 93, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1x966ie/sources_raptor_kellin_and_taeyoon_expected_to/' WHERE slug = 'raptor';
UPDATE players SET predicted_team_id = 5, confidence = 93, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4268674' WHERE slug = 'kellin';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1x7hrys/sheep_esports_hanjin_brion_resigns_full_player/' WHERE slug = 'teddy';
UPDATE players SET predicted_team_id = 9, confidence = 94, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1x2i6eu/sheep_esports_deft_is_set_to_join_nongshim/' WHERE slug = 'deft';
UPDATE players SET predicted_team_id = 5, confidence = 100, status = 'CONFIRMED', source_url = 'https://rft.gg/news/kt-rolster-contract-bdd-perfect-2028' WHERE slug = 'bdd';
UPDATE players SET predicted_team_id = 29, confidence = 95, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1wydjy5/sheep_esports_sources_piero_set_to_join_giantx/' WHERE slug = 'piero';
UPDATE players SET predicted_team_id = 13, confidence = 100, status = 'RUMORED', source_url = 'https://jjang.gg/stove-league/lpl' WHERE slug = 'angel';
UPDATE players SET predicted_team_id = 28, confidence = 97, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1wnel61/sheep_esports_support_jun_is_set_to_join_team/' WHERE slug = 'jun';
UPDATE players SET predicted_team_id = 5, confidence = 93, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1x966ie/sources_raptor_kellin_and_taeyoon_expected_to/' WHERE slug = 'taeyoon';
UPDATE players SET predicted_team_id = 5, confidence = 100, status = 'CONFIRMED', source_url = 'https://rft.gg/news/kt-rolster-contract-bdd-perfect-2028' WHERE slug = 'perfect';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://www.inven.co.kr/board/lol/4625/4269435' WHERE slug = 'casting';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://www.inven.co.kr/board/lol/4625/4269435' WHERE slug = 'gideon';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://www.inven.co.kr/board/lol/4625/4269435' WHERE slug = 'roamer';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://www.inven.co.kr/board/lol/4625/4269435' WHERE slug = 'namgung';
UPDATE players SET predicted_team_id = 9, confidence = 74, status = 'RUMORED', source_url = 'https://www.inven.co.kr/board/lol/4625/4268591' WHERE slug = 'sharvel';
UPDATE players SET predicted_team_id = 28, confidence = 97, status = 'RUMORED', source_url = 'https://www.reddit.com/r/leagueoflegends/comments/1wkm1w5/sheep_esports_jackies_is_set_to_join_team/' WHERE slug = 'jackies';
UPDATE players SET predicted_team_id = 23, confidence = 100, status = 'CONFIRMED', source_url = 'https://x.com/MovistarKOILoL/status/2102381378566279627' WHERE slug = 'jojopyun';
UPDATE players SET predicted_team_id = 23, confidence = 72, status = 'RUMORED', source_url = 'https://rostermania.lol/en/lec' WHERE slug = 'massu';
UPDATE players SET predicted_team_id = 30, confidence = 74, status = 'RUMORED', source_url = 'https://rostermania.lol/en/lec' WHERE slug = 'quad';
UPDATE players SET predicted_team_id = 26, confidence = 75, status = 'RUMORED', source_url = 'https://rostermania.lol/en/lec' WHERE slug = 'daglas';
