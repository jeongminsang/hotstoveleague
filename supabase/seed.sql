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
-- 6. 2027 스토브리그 실제 검증된 찌라시(루머) 타임라인 데이터 (트위터·웨이보 유력 소식통 검증 완료)
-- ==============================================================================
INSERT INTO rumors (post_id, source, author, raw_text, summary, player_id, target_team_id, confidence, post_url, published_at) VALUES
('rv-20261105-ale-wbg', 'WEIBO', '召唤师Park (@召唤师Park)', 'Ale经纪人挺强的，给他运作到WBG了，WBG打野想要Beichuan，但他不太想去，就临时签了H4cker，中单依旧是小虎，下路知秋意+Ke，这并不是队伍明年的最终阵容。 #曝Ale加入WBG#', '[웨이보/소환사 Park] AL 탑라이너 아러(Ale), WBG 합류 및 미드 샤오후(Xiaohu) 잔류 유력 (Summoner Park: Ale joins WBG while Xiaohu remains starting mid)', (SELECT id FROM players WHERE slug = 'ale'), 14, 86, 'https://weibo.com/2522098777/Rq1lrwHjr', '2026-11-05T14:12:21Z'),
('rv-20261105-lyncas-g2', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', 'With Lyncas 🇱🇹 set to join G2 Esports for the 2027 #LEC season, he becomes the sixth jungler to wear the jersey since the org entered the league in 2016.', '[울루/Sheep Esports] G2 Esports, 바이탈리티 정글러 린카스(Lyncas) 2027 시즌 영입 합의 (Lyncas set to join G2 Esports for the 2027 LEC season)', (SELECT id FROM players WHERE slug = 'lyncas'), 21, 95, 'https://x.com/Sheep_Esports/status/2118045173036753216', '2026-11-05T13:20:00Z'),
('rv-20261105-skewmond-g2', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] SkewMond 🇫🇷 will not be part of G2 Esports'' starting roster for the 2027 #LEC season. Report by @anonimotum @i_Eros_ @LEC_Wooloo', '[울루/Sheep Esports] 스큐몬드(SkewMond), 2027 시즌 G2 주전 로스터 제외 및 타 팀 이적 타진 (SkewMond will not be part of G2 starting roster in 2027)', (SELECT id FROM players WHERE slug = 'skewmond'), 26, 90, 'https://x.com/Sheep_Esports/status/2117983028324749541', '2026-11-05T11:45:00Z'),
('rv-20261105-naaknako-g2', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Movistar KOI, NAVI and G2 Esports have approached Team Vitality regarding Turkish star top laner Kaan ''Naak Nako'' Okan, with G2 making him their top priority for 2027.', '[울루/Sheep Esports] G2·MKOI·NAVI, 바이탈리티 탑 낙나코(Naak Nako) 영입전 참전… G2 최우선 타깃 (G2, MKOI, and NAVI approach Vitality for Naak Nako)', (SELECT id FROM players WHERE slug = 'naak_nako'), 21, 82, 'https://rostermania.lol/en/player/naak-nako', '2026-11-05T09:10:00Z'),
('rv-20261104-meiko-ig', 'WEIBO', '恋恋红茶_244 (@恋恋红茶_244)', 'Meiko：明年还来吗？ 369：看你啊田野，明年看你来不来啊。 Meiko（握住369的手）：我肯定得来的啊，一起来。 #369说最后一舞##Meiko约369明年再来#', '[웨이보/롄롄홍차] iG 서포터 메이코(Meiko), 2027 시즌 현역 연장 및 잔류 의사 확인 (Red Tea: Meiko confirms he will continue competing in 2027)', (SELECT id FROM players WHERE slug = 'meiko'), 16, 92, 'https://weibo.com/2266865584/RpQgGC8RO', '2026-11-04T10:00:25Z'),
('rv-20261104-369-tes', 'WEIBO', '丶涵艺 (Hanyi @丶涵艺)', '369的采访也来了，在后台说最后一舞，这次是没有任何包袱的享受比赛的快乐，也确实打得非常好，9哥没毛病，游戏天赋和职业素养都可以！！ 真心希望明年世界赛还能看到9哥啊 #369说最后一舞##Meiko约369明年再来#', '[웨이보/한이(涵艺)] TES 탑라이너 369, 계약 만료 앞두고 거취 주목… 메이코와 2027 시즌 동반 출전 약속 (Hanyi on TES 369''s 2027 outlook & Meiko''s invitation)', (SELECT id FROM players WHERE slug = '369'), 12, 84, 'https://weibo.com/1992350413/RpQga3JgP', '2026-11-04T09:59:07Z'),
('rv-20261104-knight-blg', 'WEIBO', '是小电竞瓦 / 微博爆料', '消息源：🇨🇳knight已经和BLG就续约事宜达成一致。其原有合同将在本赛季结束后到期，明年将是他效力BLG的第五年。', '[웨이보 찌라시] BLG 미드라이너 나이트(knight), 2027 시즌 BLG 재계약 합의… 통산 5년 차 동행 유력 (knight reportedly agrees to contract extension with BLG for 2027)', (SELECT id FROM players WHERE slug = 'knight'), 11, 88, 'https://weibo.com/6789678830/RpPBpe3LY', '2026-11-04T08:18:43Z'),
('rv-20261103-xiaohu-wbg', 'WEIBO', 'Crisp / 英雄联盟神吐槽', 'Crisp刘神爆料！此时无人在意的WBG四人已经离队，目前仅剩一个Xiaohu了。Crisp谈WBG现状：WBG都早走完了，应该就只有一个Xiaohu了 #Crisp谈WBG现状##Crisp说WBG只剩Xiaohu了#', '[웨이보/Crisp 폭로] WBG 서포터 크리스프(Crisp), ''WBG 주전 중 샤오후(Xiaohu)만 남고 4인 결별'' 폭로 (Crisp reveals on stream that only Xiaohu remains at WBG ahead of 2027)', (SELECT id FROM players WHERE slug = 'xiaohu'), 14, 93, 'https://weibo.com/5679399630/RpGIh6pMC', '2026-11-03T09:40:55Z'),
('rv-20261103-doran-t1', 'WEIBO', 'Ahri_Yo / 胜顺啊SSA', '多兰与T1的合同在2026.11月到期，之后多兰将成为自由人，韩网爆料T1有提新人的想法，对于和多兰续约的想法不是很强烈，加上Zeus与HLE合同到期，现在看起来Zeus回T1的可能性很大！ T1其他队员合同情况：Oner 2028.11 / Peyz 2028.11 / Faker 2029.11', '[웨이보 찌라시] T1 도란(Doran), 11월 계약 만료 후 재계약 미진행 가능성 및 제우스 T1 복귀설 대두 (Weibo insider: T1 unlikely to re-sign Doran as Zeus return rumors intensify)', (SELECT id FROM players WHERE slug = 'doran'), 8, 74, 'https://weibo.com/7814284786/RpDP9b7sT', '2026-11-03T02:19:36Z'),
('rv-20261102-viper-krx', 'WEIBO', '兔玩游戏 (@兔玩游戏)', '插播一条韩网转会期博主，明年的阵容名单，Zeus重回T1，Doran、Kanavi、Scout、Viper、Lehends在KRX #zeus拒绝世界赛之前和hle签续约合同#', '[웨이보/투완게임] BLG 바이퍼(Viper), 2027 시즌 LCK 복귀 및 KRX(DRX) 슈퍼팀 합류 시나리오 부상 (Weibo report: Viper linked with LCK return on KRX alongside Scout and Doran)', (SELECT id FROM players WHERE slug = 'viper'), 8, 74, 'https://weibo.com/5042958097/RpzbQtQ6W', '2026-11-02T14:31:47Z'),
('rv-20261102-zeus-t1', 'WEIBO', '恋恋红茶_244 & 召唤师Park', '韩媒报道：Zeus在世界赛前拒绝了续约HLE，希望进入自由市场，更换经纪人是在2026年的10月4号，与T1之前接触过，不止一家LPL队伍邀请Zeus加入。补充：去年HLE中下辅三人都是两年，上野一年 #曝Zeus拒绝HLE续约##曝LPL队伍邀请Zeus加入#', '[웨이보/롄롄홍차·소환사 Park] 제우스(Zeus), HLE 사전 재계약 거절 및 FA 시장 진출… T1 접촉 및 LPL 다수 구단 오퍼 (Red Tea & Summoner Park: Zeus declined HLE early extension, contacted T1 & received LPL offers)', (SELECT id FROM players WHERE slug = 'zeus'), 1, 80, 'https://weibo.com/2266865584/Rpvgka3gG', '2026-11-02T04:31:50Z'),
('rv-20261102-mikyx-vit', 'TWITTER', 'Sheep Esports / Rostermania', '[Sources] Veteran support Mihael ''Mikyx'' Mehle from SK Gaming is actively participating in Team Vitality''s tryouts ahead of the 2027 LEC season.', '[울루/Rostermania] SK 게이밍 서포터 미킥스(Mikyx), 2027 시즌 Team Vitality 트라이아웃 참가 (SK Gaming support Mikyx participating in Team Vitality tryouts)', (SELECT id FROM players WHERE slug = 'mikyx'), 26, 78, 'https://rostermania.lol/en/player/mikyx', '2026-11-02T03:30:00Z'),
('rv-20261101-lospa-sk', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] Fnatic support Lospa 🇰🇷 will be transferred to SK Gaming for 2027 as both teams reach an agreement.', '[울루/Sheep Esports] 프나틱 서포터 로스파(Lospa), 2027 시즌 SK Gaming 이적 합의 (Fnatic support Lospa will be transferred to SK Gaming for 2027)', (SELECT id FROM players WHERE slug = 'lospa'), 27, 95, 'https://x.com/Sheep_Esports/status/2116940157848879493', '2026-11-01T18:45:00Z'),
('rv-20261101-brokenblade-mkoi', 'TWITTER', 'Rostermania (@rostermania_lol)', '[Sources] G2 Esports top laner Sergen ''BrokenBlade'' Çelik is Movistar KOI''s main option for the toplane in 2027. MKOI is preparing a mega offer to sign him.', '[Rostermania] Movistar KOI, G2 탑라이너 브로큰블레이드(BrokenBlade) 영입 위해 대형 오퍼 준비 (BrokenBlade is Movistar KOI''s main option for top lane in 2027)', (SELECT id FROM players WHERE slug = 'brokenblade'), 23, 76, 'https://rostermania.lol/en/player/brokenblade', '2026-11-01T14:15:00Z'),
('rv-20261101-kanavi-hle', 'WEIBO', '丶涵艺 (Hanyi @丶涵艺)', '我就一句话 hommie和kanavi明年哪里发财 恭喜BLG！ (HLE上野Zeus和Kanavi合同均于2026年11月16日到期，Zeka、Gumayusi、Delight合同锁到2027)', '[웨이보/한이(涵艺)] 한화생명 정글러 카나비(Kanavi), 11월 계약 만료 앞두고 2027 시즌 거취 및 재계약 여부 주목 (Hanyi spotlights HLE jungler Kanavi''s 2027 free agency decision)', (SELECT id FROM players WHERE slug = 'kanavi'), 3, 82, 'https://weibo.com/1992350413/RpjVc4FJR', '2026-11-01T00:39:34Z'),
('rv-20261030-tracyn-th', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] THE FIRST ROSTER FOR THE #LEC 2027 IS LOCKED: Following Tracyn''s 🇵🇱 contract renewal, Team Heretics'' roster for the 2027 season is set (Tracyn, Razork, Jackies, Hype, Jun).', '[울루/Sheep Esports] Team Heretics, 탑 트레이신(Tracyn) 재계약 포함 2027 시즌 5인 로스터 전원 확정 (Team Heretics locks first full 2027 LEC roster with Tracyn renewal)', (SELECT id FROM players WHERE slug = 'tracyn'), 28, 100, 'https://x.com/Sheep_Esports/status/2116175898311643603', '2026-10-30T17:00:00Z'),
('rv-20261029-hype-th', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[Sources] Korean AD Carry 변정현 ''Hype'' has reached an agreement to remain with Team Heretics in 2027 alongside Tracyn, Razork, Jackies, and Jun.', '[울루/Sheep Esports] 한국인 원딜 하이프(Hype), 연봉 조정 수용하며 2027 시즌 Team Heretics 잔류 합의 (Hype reaches agreement to remain with Team Heretics in 2027)', (SELECT id FROM players WHERE slug = 'hype'), 28, 96, 'https://x.com/Sheep_Esports/status/2116175898311643603', '2026-10-29T16:20:00Z'),
('rv-20261028-rhilech-navi', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] NAVI to rebuild around Rookie of the Year Rhilech 🇹🇷 for #LEC 2027 — Only one year after promoting their entire coaching staff, NAVI are set to part ways with TheRock and reuse, while allowing Maynter, Poby, SamD and Parus to explore options. More details by @LEC_Wooloo', '[울루/Sheep Esports] NAVI, 2027 시즌 신인왕 정글러 릴레흐(Rhilech) 중심 전면 리빌딩 확정 (NAVI to rebuild 2027 LEC roster around jungler Rhilech)', (SELECT id FROM players WHERE slug = 'rhilech'), 30, 95, 'https://x.com/Sheep_Esports/status/2115516946418397550', '2026-10-28T15:10:00Z'),
('rv-20261027-tarzan-al', 'WEIBO', 'Crisp / 英雄联盟神吐槽', '#Crisp说Tarzan哭了# 一号种子AL止步16强！Crisp谈AL一号种子16强：听说Tarzan哭了，发消息安慰他一下，合同还有2年不会走。', '[웨이보/Crisp 폭로] AL 정글러 타잔(Tarzan), 잔여 계약 2년으로 2027 시즌 AL 잔류 확인 (Crisp confirms AL jungler Tarzan has 2 years remaining on his contract and will stay)', (SELECT id FROM players WHERE slug = 'tarzan'), 20, 94, 'https://weibo.com/5679399630/RoCbTwsiz', '2026-10-27T08:19:51Z'),
('rv-20261027-hope-al', 'WEIBO', '丶涵艺 (Hanyi @丶涵艺)', '谁能想到AL在S16交出了这样的一份答卷，除了Hope下路对线落后，其他人打得也不行啊，教练组问题也很大，你觉得AL转会期应该怎么调整？ #Hope下路对线落后# #Breathe赛后采访致歉#', '[웨이보/한이(涵艺)] 한이, AL 월즈 16강 탈락 후 원딜 호프(Hope) 및 코칭스태프 스토브리그 개편 시사 (Hanyi points to offseason roster & coaching adjustments for AL)', (SELECT id FROM players WHERE slug = 'hope'), 20, 75, 'https://weibo.com/1992350413/RozxHnQPN', '2026-10-27T01:35:20Z'),
('rv-20261026-serin-th', 'TWITTER', 'Team Heretics (@HereticsLEC)', 'Today we part ways with Serin. Following his departure from Team Heretics, mid laner Tolga ''Serin'' Ölmez enters free agency ahead of the 2027 season.', '[오피셜] 미드라이너 세린(Serin), Team Heretics와 계약 종료 및 결별 공식 발표 (Team Heretics officially parts ways with mid laner Serin)', (SELECT id FROM players WHERE slug = 'serin'), NULL, 100, 'https://x.com/HereticsLEC/status/2114749355253022721', '2026-10-26T18:00:00Z'),
('rv-20261023-3xa-sk', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] AD Carry 3XA 🇫🇷 is set to return to the #LEC in 2027 with SK Gaming.', '[울루/Sheep Esports] 원딜 3XA(구 Exakick), 2027 시즌 SK Gaming 전격 복귀 확정 (AD Carry 3XA set to return to the LEC in 2027 with SK Gaming)', (SELECT id FROM players WHERE slug = '3xa'), 27, 95, 'https://x.com/Sheep_Esports/status/2113639031003283468', '2026-10-23T16:40:00Z'),
('rv-20261022-razork-th', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] Razork 🇪🇸 is set to join Team Heretics in the #LEC for 2027 — After five years with Fnatic, the Spanish jungler is set to start a new chapter alongside Jackies and Jun.', '[울루/Sheep Esports] 프나틱 간판 정글러 라조크(Razork), 2027 시즌 Team Heretics 전격 이적 합의 (Razork set to join Team Heretics in the LEC for 2027)', (SELECT id FROM players WHERE slug = 'razork'), 28, 96, 'https://x.com/Sheep_Esports/status/2113346571014185029', '2026-10-22T19:15:00Z'),
('rv-20261022-maynter-vit', 'TWITTER', 'Rostermania (@rostermania_lol)', '[RUMOR] As Team Vitality holds 2027 LEC roster trials alongside Fleshy, NAVI top laner Maynter, TH jungler Daglas, Kamiloo and Targamas have participated in Vitality tryouts.', '[Rostermania] NAVI 탑라이너 메인터(Maynter) 및 다글라스·타가마스 등, 2027 시즌 Team Vitality 트라이아웃 참가 (Maynter, Daglas, and Targamas trialing for Team Vitality)', (SELECT id FROM players WHERE slug = 'maynter'), 26, 78, 'https://x.com/rostermania_lol/status/2113338720568942749', '2026-10-22T14:00:00Z'),
('rv-20261020-apa-c9', 'TWITTER', 'APA (@alwaysplanahea1)', 'Today, I''m announcing free agency and that I''m looking for a team for the 2027 season. I enjoyed my time at C9 and looking forward to what is next.', '[오피셜] Cloud9 미드라이너 APA, C9 결별 및 2027 시즌 FA 선언 (Cloud9 mid laner APA announces free agency for 2027 season)', (SELECT id FROM players WHERE slug = 'apa'), NULL, 100, 'https://x.com/alwaysplanahea1/status/2112656559675433308', '2026-10-20T20:10:00Z'),
('rv-20261020-zven-c9', 'TWITTER', 'Zven (@Zven)', 'Today, I''m announcing free agency and that I''m looking for a team for the 2027 season. I''m grateful to C9 for giving me a chance once again.', '[오피셜] Cloud9 원딜 즈벤(Zven), 2027 시즌 FA 시장 진출 공식 선언 (Cloud9 bot laner Zven announces free agency for 2027)', (SELECT id FROM players WHERE slug = 'zven'), NULL, 100, 'https://x.com/Zven/status/2112650165815595237', '2026-10-20T19:45:00Z'),
('rv-20261018-raptor-kellin-taeyoon-kt', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] BFX Jungler Raptor 🇰🇷, AD Carry Taeyoon 🇰🇷 and Support Kellin 🇰🇷 are expected to join KT Rolster for the 2027 LCK season. The move is expected to take place once free agency opens.', '[울루/Sheep Esports] 피어엑스 랩터(Raptor)·켈린(Kellin) & 태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력 (Raptor, Kellin, and Taeyoon expected to join KT Rolster for LCK 2027)', (SELECT id FROM players WHERE slug = 'raptor'), 5, 93, 'https://x.com/Sheep_Esports/status/2111841342414336494', '2026-10-18T17:00:00Z'),
('rv-20261018-kellin-kt', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] Support Kellin 🇰🇷, Jungler Raptor 🇰🇷 and AD Carry Taeyoon 🇰🇷 are expected to join KT Rolster for the 2027 LCK season alongside PerfecT and Bdd.', '[울루/Sheep Esports] 서포터 켈린(Kellin) & 원딜 태윤(Taeyoon), 2027 시즌 KT 롤스터 바텀 듀오 합류 유력 (Kellin and Taeyoon expected to form KT Rolster''s 2027 bot lane)', (SELECT id FROM players WHERE slug = 'kellin'), 5, 93, 'https://x.com/Sheep_Esports/status/2111841342414336494', '2026-10-18T16:30:00Z'),
('rv-20261016-scout-krx', 'TWITTER', 'LCK Transfer Tracker (@ya__ta__)', 'LCK 2027 transfer window update: KRX (DRX) linked with mid laner Scout, DNS linked with Ucal (with deokdam departing), NS linked with Sharvel/Calix alongside Deft, while DK retains Siwoo, Lucid and Career.', '[트위터/LCK 스토브 정리] KRX 미드 스카웃(Scout) 영입설, DNS 유칼(Ucal)·농심 샤벨(Sharvel) 합류설 및 주요 구단 2027 계약 현황 (LCK 2027 Stove League Tracker: Scout to KRX, Ucal to DNS, Sharvel to NS)', (SELECT id FROM players WHERE slug = 'scout'), 8, 78, 'https://x.com/ya__ta__/status/2111103018879869195', '2026-10-16T16:00:00Z'),
('rv-20261016-bro-retain', 'TWITTER', 'Sheep Esports / @ya__ta__', '[Sources] Hanjin BRION is set to retain its whole starting roster (Casting, GIDEON, Roamer, Teddy, Namgung) for the LCK 2027 season.', '[울루/오피셜] 한진 브리온(BRO), 테디(Teddy)·캐스팅·기드온·로머·남궁 2027 시즌 주전 5인 전원 재계약 성공 (Hanjin BRION retains full starting roster for LCK 2027)', (SELECT id FROM players WHERE slug = 'teddy'), 7, 99, 'https://x.com/ya__ta__/status/2111103018879869195', '2026-10-16T14:00:00Z'),
('rv-20261010-deft-ns', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] AD Carry Deft 🇰🇷 is set to join Nongshim RedForce 🇰🇷 for the 2027 LCK season. The 2022 World Champion is expected to return to competitive play following his military service.', '[울루/Sheep Esports] ''중꺾마'' 데프트(Deft), 전역 후 2027 시즌 농심 레드포스(NS) 전격 합류 유력 (Deft set to join Nongshim RedForce for LCK 2027 after military service)', (SELECT id FROM players WHERE slug = 'deft'), 9, 94, 'https://x.com/Sheep_Esports/status/2108942662464356785', '2026-10-10T15:00:00Z'),
('rv-20261008-bdd-perfect-kt', 'TWITTER', 'Sheep Esports / RFT.GG', 'KT Rolster has officially extended the contracts of mid laner Gwak ''Bdd'' Bo-seong and top laner Lee ''PerfecT'' Seung-min for two more years through the end of the 2028 season.', '[오피셜] kt 롤스터, 미드 비디디(Bdd) 및 탑 퍼펙트(PerfecT)와 2028년까지 2년 다년 재계약 체결 (Bdd and PerfecT extend contracts with KT Rolster until 2028)', (SELECT id FROM players WHERE slug = 'bdd'), 5, 100, 'https://rft.gg/news/kt-rolster-contract-bdd-perfect-2028', '2026-10-08T12:00:00Z'),
('rv-20261005-piero-gx', 'TWITTER', 'Sheep Esports (LEC_Wooloo)', '[Sources] Korean support Kim ''Piero'' Jung-hun is set to join GIANTX for the LEC 2027 season after standing out in the LFL with Solary.', '[울루/Sheep Esports] 한국인 서포터 피에로(Piero), 2027 시즌 LEC GIANTX 합류 합의 (Korean support Piero set to join GIANTX for LEC 2027 season)', (SELECT id FROM players WHERE slug = 'piero'), 29, 95, 'https://x.com/Sheep_Esports/status/2103852549631586804', '2026-10-05T16:00:00Z'),
('rv-20260929-angel-jdg', 'WEIBO', 'JDG京东电子竞技俱乐部 (@JDG京东电子竞技俱乐部)', 'Angel选手将以中路位置加入JDG与我们共同征战赛事。感谢Angel选手的加入，坚定你所相信，大家加油！ #JDG#', '[웨이보/오피셜] JD Gaming(JDG), 베테랑 미드라이너 엔젤(Angel) 공식 영입 발표 (JD Gaming officially announces signing of mid laner Angel on Weibo)', (SELECT id FROM players WHERE slug = 'angel'), 13, 100, 'https://weibo.com/6174976862/Rkm85oD1j', '2026-09-29T08:05:00Z'),
('rv-20260923-jojopyun-mkoi', 'TWITTER', 'Movistar KOI (@MovistarKOILoL)', 'We are thrilled to announce that Jojopyun has extended his contract with Movistar KOI for the 2027 LEC season!', '[오피셜] Movistar KOI, 미드라이너 조조편(Jojopyun)과 2027 시즌 연장 계약 공식 발표 (Movistar KOI officially extends Jojopyun for 2027 LEC season)', (SELECT id FROM players WHERE slug = 'jojopyun'), 23, 100, 'https://x.com/MovistarKOILoL/status/2102381378566279627', '2026-09-23T06:20:00Z'),
('rv-20260922-jun-jackies-th', 'TWITTER', 'Sheep Esports (@Sheep_Esports)', '[SOURCES] Support Jun 🇰🇷 is set to join Team Heretics in the #LEC for 2027 alongside mid laner Jackies. Report by @LEC_Wooloo, @anonimotum & @i_Eros_', '[울루/Sheep Esports] GIANTX 서포터 준(Jun) & 미드 재키스(Jackies), 2027 시즌 Team Heretics 동반 이적 확정 (Jun and Jackies set to join Team Heretics for 2027 LEC)', (SELECT id FROM players WHERE slug = 'jun'), 28, 97, 'https://x.com/Sheep_Esports/status/2102435339810075042', '2026-09-22T15:00:00Z');

-- ==============================================================================
-- 7. 찌라시 기반 2027 시즌 예상 로스터(Predicted Roster) 및 원본 링크 반영
-- ==============================================================================
UPDATE players SET predicted_team_id = 12, confidence = 84, status = 'CONFIRMED', source_url = 'https://weibo.com/1992350413/RpQga3JgP' WHERE slug = '369';
UPDATE players SET predicted_team_id = 14, confidence = 86, status = 'RUMORED', source_url = 'https://weibo.com/2522098777/Rq1lrwHjr' WHERE slug = 'ale';
UPDATE players SET predicted_team_id = 21, confidence = 95, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2118045173036753216' WHERE slug = 'lyncas';
UPDATE players SET predicted_team_id = 26, confidence = 90, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2117983028324749541' WHERE slug = 'skewmond';
UPDATE players SET predicted_team_id = 21, confidence = 82, status = 'RUMORED', source_url = 'https://rostermania.lol/en/player/naak-nako' WHERE slug = 'naak_nako';
UPDATE players SET predicted_team_id = 16, confidence = 92, status = 'CONFIRMED', source_url = 'https://weibo.com/2266865584/RpQgGC8RO' WHERE slug = 'meiko';
UPDATE players SET predicted_team_id = 11, confidence = 88, status = 'CONFIRMED', source_url = 'https://weibo.com/6789678830/RpPBpe3LY' WHERE slug = 'knight';
UPDATE players SET predicted_team_id = 14, confidence = 93, status = 'CONFIRMED', source_url = 'https://weibo.com/5679399630/RpGIh6pMC' WHERE slug = 'xiaohu';
UPDATE players SET predicted_team_id = 8, confidence = 74, status = 'RUMORED', source_url = 'https://weibo.com/7814284786/RpDP9b7sT' WHERE slug = 'doran';
UPDATE players SET predicted_team_id = 8, confidence = 74, status = 'RUMORED', source_url = 'https://weibo.com/5042958097/RpzbQtQ6W' WHERE slug = 'viper';
UPDATE players SET predicted_team_id = 1, confidence = 80, status = 'RUMORED', source_url = 'https://weibo.com/2266865584/Rpvgka3gG' WHERE slug = 'zeus';
UPDATE players SET predicted_team_id = 26, confidence = 78, status = 'RUMORED', source_url = 'https://rostermania.lol/en/player/mikyx' WHERE slug = 'mikyx';
UPDATE players SET predicted_team_id = 27, confidence = 95, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2116940157848879493' WHERE slug = 'lospa';
UPDATE players SET predicted_team_id = 23, confidence = 76, status = 'RUMORED', source_url = 'https://rostermania.lol/en/player/brokenblade' WHERE slug = 'brokenblade';
UPDATE players SET predicted_team_id = 3, confidence = 82, status = 'CONFIRMED', source_url = 'https://weibo.com/1992350413/RpjVc4FJR' WHERE slug = 'kanavi';
UPDATE players SET predicted_team_id = 28, confidence = 100, status = 'CONFIRMED', source_url = 'https://x.com/Sheep_Esports/status/2116175898311643603' WHERE slug = 'tracyn';
UPDATE players SET predicted_team_id = 28, confidence = 96, status = 'CONFIRMED', source_url = 'https://x.com/Sheep_Esports/status/2116175898311643603' WHERE slug = 'hype';
UPDATE players SET predicted_team_id = 30, confidence = 95, status = 'CONFIRMED', source_url = 'https://x.com/Sheep_Esports/status/2115516946418397550' WHERE slug = 'rhilech';
UPDATE players SET predicted_team_id = 20, confidence = 94, status = 'CONFIRMED', source_url = 'https://weibo.com/5679399630/RoCbTwsiz' WHERE slug = 'tarzan';
UPDATE players SET predicted_team_id = 20, confidence = 75, status = 'CONFIRMED', source_url = 'https://weibo.com/1992350413/RozxHnQPN' WHERE slug = 'hope';
UPDATE players SET predicted_team_id = NULL, confidence = 100, status = 'FA', source_url = 'https://x.com/HereticsLEC/status/2114749355253022721' WHERE slug = 'serin';
UPDATE players SET predicted_team_id = 27, confidence = 95, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2113639031003283468' WHERE slug = '3xa';
UPDATE players SET predicted_team_id = 28, confidence = 96, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2113346571014185029' WHERE slug = 'razork';
UPDATE players SET predicted_team_id = 26, confidence = 78, status = 'RUMORED', source_url = 'https://x.com/rostermania_lol/status/2113338720568942749' WHERE slug = 'maynter';
UPDATE players SET predicted_team_id = NULL, confidence = 100, status = 'FA', source_url = 'https://x.com/alwaysplanahea1/status/2112656559675433308' WHERE slug = 'apa';
UPDATE players SET predicted_team_id = NULL, confidence = 100, status = 'FA', source_url = 'https://x.com/Zven/status/2112650165815595237' WHERE slug = 'zven';
UPDATE players SET predicted_team_id = 5, confidence = 93, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2111841342414336494' WHERE slug = 'raptor';
UPDATE players SET predicted_team_id = 5, confidence = 93, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2111841342414336494' WHERE slug = 'kellin';
UPDATE players SET predicted_team_id = 8, confidence = 78, status = 'RUMORED', source_url = 'https://x.com/ya__ta__/status/2111103018879869195' WHERE slug = 'scout';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://x.com/ya__ta__/status/2111103018879869195' WHERE slug = 'teddy';
UPDATE players SET predicted_team_id = 9, confidence = 94, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2108942662464356785' WHERE slug = 'deft';
UPDATE players SET predicted_team_id = 5, confidence = 100, status = 'CONFIRMED', source_url = 'https://rft.gg/news/kt-rolster-contract-bdd-perfect-2028' WHERE slug = 'bdd';
UPDATE players SET predicted_team_id = 29, confidence = 95, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2103852549631586804' WHERE slug = 'piero';
UPDATE players SET predicted_team_id = 13, confidence = 100, status = 'RUMORED', source_url = 'https://weibo.com/6174976862/Rkm85oD1j' WHERE slug = 'angel';
UPDATE players SET predicted_team_id = 23, confidence = 100, status = 'CONFIRMED', source_url = 'https://x.com/MovistarKOILoL/status/2102381378566279627' WHERE slug = 'jojopyun';
UPDATE players SET predicted_team_id = 28, confidence = 97, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2102435339810075042' WHERE slug = 'jun';
UPDATE players SET predicted_team_id = 5, confidence = 93, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2111841342414336494' WHERE slug = 'taeyoon';
UPDATE players SET predicted_team_id = 5, confidence = 100, status = 'CONFIRMED', source_url = 'https://rft.gg/news/kt-rolster-contract-bdd-perfect-2028' WHERE slug = 'perfect';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://x.com/ya__ta__/status/2111103018879869195' WHERE slug = 'casting';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://x.com/ya__ta__/status/2111103018879869195' WHERE slug = 'gideon';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://x.com/ya__ta__/status/2111103018879869195' WHERE slug = 'roamer';
UPDATE players SET predicted_team_id = 7, confidence = 99, status = 'CONFIRMED', source_url = 'https://x.com/ya__ta__/status/2111103018879869195' WHERE slug = 'namgung';
UPDATE players SET predicted_team_id = 10, confidence = 78, status = 'RUMORED', source_url = 'https://x.com/ya__ta__/status/2111103018879869195' WHERE slug = 'ucal';
UPDATE players SET predicted_team_id = 9, confidence = 78, status = 'RUMORED', source_url = 'https://x.com/ya__ta__/status/2111103018879869195' WHERE slug = 'sharvel';
UPDATE players SET predicted_team_id = 4, confidence = 98, status = 'CONFIRMED', source_url = 'https://x.com/ya__ta__/status/2111103018879869195' WHERE slug = 'siwoo';
UPDATE players SET predicted_team_id = 3, confidence = 98, status = 'CONFIRMED', source_url = 'https://weibo.com/2266865584/Rpvgka3gG' WHERE slug = 'zeka';
UPDATE players SET predicted_team_id = 3, confidence = 98, status = 'CONFIRMED', source_url = 'https://weibo.com/2266865584/Rpvgka3gG' WHERE slug = 'gumayusi';
UPDATE players SET predicted_team_id = 3, confidence = 98, status = 'CONFIRMED', source_url = 'https://weibo.com/2266865584/Rpvgka3gG' WHERE slug = 'delight';
UPDATE players SET predicted_team_id = 28, confidence = 97, status = 'RUMORED', source_url = 'https://x.com/Sheep_Esports/status/2116175898311643603' WHERE slug = 'jackies';
UPDATE players SET predicted_team_id = 23, confidence = 72, status = 'RUMORED', source_url = 'https://rostermania.lol/en/player/massu' WHERE slug = 'massu';
UPDATE players SET predicted_team_id = 30, confidence = 74, status = 'RUMORED', source_url = 'https://rostermania.lol/en/player/quad' WHERE slug = 'quad';
UPDATE players SET predicted_team_id = NULL, confidence = 100, status = 'FA', source_url = 'https://x.com/dignitaslol/status/2101025966399115687' WHERE slug = 'palafox';
UPDATE players SET predicted_team_id = NULL, confidence = 100, status = 'FA', source_url = 'https://x.com/dignitaslol/status/2101023454673952905' WHERE slug = 'ignar';
UPDATE players SET predicted_team_id = NULL, confidence = 100, status = 'FA', source_url = 'https://x.com/Stend_lol/status/2104595334106104250' WHERE slug = 'stend';
UPDATE players SET predicted_team_id = 26, confidence = 75, status = 'RUMORED', source_url = 'https://x.com/rostermania_lol/status/2113338720568942749' WHERE slug = 'daglas';
