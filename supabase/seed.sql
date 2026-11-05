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
('peanut', 'Peanut', '한왕호', 'JGL', 3, 3, true, 100, 'STAY'),
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
('fisher', 'Fisher', '이정태', 'MID', 7, 7, true, 100, 'STAY'),
('teddy', 'Teddy', '박진성', 'BOT', 7, 7, true, 100, 'STAY'),
('namgung', 'Namgung', '남궁성훈', 'SPT', 7, 7, true, 100, 'STAY'),
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
('ice', 'Ice', 'Yoon Sang-hoon', 'BOT', 28, 28, true, 100, 'STAY'),
('stend', 'Stend', 'Paul Lardin', 'SPT', 28, 28, true, 100, 'STAY'),

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
('ackerman', 'Ackerman', 'Gabriel Aparicio', 'SPT', 54, 54, true, 100, 'STAY');

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
-- 6. 2027 스토브리그 찌라시(루머) 타임라인 데이터 (34건)
-- ==============================================================================
INSERT INTO rumors (post_id, source, author, raw_text, summary, player_id, target_team_id, confidence, post_url, published_at) VALUES
('tw-20261026-aiming-dk', 'TWITTER', '윤민섭 기자 (Kukmin Ilbo)', '[단독] DRX와 계약 만료를 앞둔 바텀 라이너 ''에이밍'' 김하람 선수를 향해 디플러스 기아(DK)가 강력한 러브콜을 보내고 있는 것으로 확인되었습니다. DK는 바텀 화력 보강을 최우선 과제로 두고 적극적인 협상 테이블을 마련 중입니다.', '[윤민섭] DK, DRX 에이밍(Aiming) 영입 추진… 바텀 라인 화력 보강 총력전', (SELECT id FROM players WHERE slug = 'aiming'), 4, 82, 'https://x.com/mulseop/status/1850129384729184256', '2026-10-26T04:15:00Z'),
('wb-20261026-scout-lng', 'WEIBO', '丶涵艺 (Hanyi)', 'Scout基本上不会留在NS了，他和LPL这边的沟通一直很顺畅。LNG正在全力接触他，双方在薪资和阵容结构上聊得很深，几乎达成框架协议。今年中路大鱼就看小学弟了。', '[한이] 스카웃(Scout), 농심 떠나 LPL LNG 복귀 유력… 기본 합의 도달', (SELECT id FROM players WHERE slug = 'scout'), 15, 85, 'https://weibo.com/hanyi/status/5093781293840192', '2026-10-26T11:40:00Z'),
('tw-20261027-g2-lyncas', 'TWITTER', 'LEC_Wooloo (Sheep Esports)', '[Sources] G2 Esports and Team Vitality have reached a verbal agreement for the transfer of jungler Linas ''Lyncas'' Nauncikas to G2. Meanwhile, Rudy ''SkewMond'' Semaan is allowed to explore buyout options following G2''s internal restructuring.', '[울루] G2, 바이탈리티 정글러 린카스(Lyncas) 영입 구두 합의… 스큐몬드 이적 허용', (SELECT id FROM players WHERE slug = 'lyncas'), 21, 92, 'https://sheepesports.com/articles/sources-g2-verbal-agreement-lyncas-skewmond-market/2026-10-27', '2026-10-27T14:22:00Z'),
('cm-20261028-cuzz-dk', 'COMMUNITY', '한상용 (H-Dragon)', '어제 방송에서 말씀드렸듯이, 이번 스토브리그에서 베테랑 정글러 몸값이 상상 이상으로 치솟고 있습니다. 커즈 선수는 KT 잔류와 타 팀 이적 사이에서 고민 중인데, 특히 운영형 정글러를 절실히 원하는 한 팀(DK)이 매우 적극적입니다. 주말 지나면 윤곽이 나올 것 같네요.', '[한상용] 베테랑 정글러 커즈(Cuzz), DK 이적 가능성 급부상… 오더형 정글 갈망', (SELECT id FROM players WHERE slug = 'cuzz'), 4, 78, 'https://chzzk.naver.com/live/hdragon/community/98231', '2026-10-28T09:30:00Z'),
('wb-20261028-bin-blg', 'WEIBO', '恋恋红茶 (Red Tea)', 'Bin哥的动向很多粉丝在问，目前可以确定BLG给出的顶薪续约诚意十足，TES虽然通过中间人试探过报价，但Bin本人更倾向于留在BLG继续冲击冠军，下赛季BLG依然以上中野核心建队。', '[홍차] 빈(Bin), TES 거액 오퍼 고사하고 BLG 잔류 재계약 유력', (SELECT id FROM players WHERE slug = 'bin'), 11, 88, 'https://weibo.com/redtea/status/5094209183492810', '2026-10-28T16:05:00Z'),
('tw-20261029-doran-t1', 'TWITTER', '윤민섭 기자 (Kukmin Ilbo)', '[단독] T1과 최현준(Doran) 선수가 재계약에 긍정적인 공감대를 형성했습니다. 서머와 월즈를 거치며 팀 내 신뢰가 두터워졌고, 구단 고위층 역시 도란 선수의 팀 헌신도를 높게 평가하여 다년 계약을 제안한 상태입니다.', '[윤민섭] T1, 도란(Doran)과 다년 재계약 합의 근접… 신뢰 바탕 동행', (SELECT id FROM players WHERE slug = 'doran'), 1, 90, 'https://x.com/mulseop/status/1851210948392817409', '2026-10-29T02:50:00Z'),
('tw-20261029-inspired-fly', 'TWITTER', 'Travis Gafford', 'Hearing strong reports that FlyQuest is making a big play for Inspired. With Lyon Gaming restructuring, Inspired is looking for an MSI/Worlds caliber project, and FLY has offered him full roster influence and top salary.', '[트래비스 개포드] 플라이퀘스트(FLY), 리옹 게이밍 인스파이어드(Inspired) 전격 영입 추진', (SELECT id FROM players WHERE slug = 'inspired'), 31, 84, 'https://x.com/TravisGafford/status/1851301982749102834', '2026-10-29T18:15:00Z'),
('wb-20261030-viper-hle', 'WEIBO', 'Doinb', '兄弟们，大瓜来了！Viper可能要回LCK了，BLG续约谈得很艰难，因为韩国那边韩华（HLE）给的待遇太离谱了。如果Viper回去，HLE下路可能又要变天，今年转会期真的太疯狂了！', '[도인비] 바이퍼(Viper), BLG와 협상 난항… 한화생명(HLE)의 파격 오퍼로 LCK 유턴 가능성', (SELECT id FROM players WHERE slug = 'viper'), 3, 75, 'https://weibo.com/doinb/status/5094918239019284', '2026-10-30T13:10:00Z'),
('cm-20261030-smash-krx', 'COMMUNITY', '익명 관계자 (FMKorea)', '[찌라시] DK 바텀 스매쉬(Smash) 선수 바이아웃 관련해서 DRX가 진지하게 접근 중. DK가 에이밍을 노리면서 스매쉬 선수의 출전 기회 보장을 위해 임대 또는 완전 이적 카드를 맞교환 형식으로 논의 중이라는 썰이 돎.', '[펨코 익명 썰] DRX, DK 원딜 스매쉬(Smash) 영입 접촉… 에이밍 딜과 연계된 연쇄 이동설', (SELECT id FROM players WHERE slug = 'smash'), 8, 65, 'https://www.fmkorea.com/lol/7639102849', '2026-10-30T21:45:00Z'),
('wb-20261031-tarzan-wbg', 'WEIBO', 'OBGG', '[转会速递] 据悉，AL打野Tarzan已经与WBG展开深度接洽。WBG在Jiejie合同到期后希望引进一名具备顶尖大局观和控图能力的控图型打野，Tarzan是其第一顺位引援目标。', '[OBGG] WBG, AL 정글러 타잔(Tarzan) 최우선 영입 타깃으로 협상 돌입', (SELECT id FROM players WHERE slug = 'tarzan'), 14, 80, 'https://weibo.com/obgg/status/5095293810294821', '2026-10-31T08:20:00Z'),
('tw-20261031-serin-sk', 'TWITTER', 'Alejandro Gomis', '[Sources] Mid laner Tolga ''Serin'' Ölmez has reached a verbal agreement with SK Gaming for the 2027 LEC season, replacing LIDER. Heretics approved the termination of his remaining contract by mutual consent.', '[고미스] 미드라이너 세린(Serin), 헤레틱스 떠나 SK 게이밍과 구두 합의 완료', (SELECT id FROM players WHERE slug = 'serin'), 27, 89, 'https://sheepesports.com/articles/sources-serin-verbal-agreement-sk-gaming/2026-10-31', '2026-10-31T17:35:00Z'),
('tw-20261101-ruler-gen', 'TWITTER', '윤민섭 기자 (Kukmin Ilbo)', '젠지 이스포츠(Gen.G)가 원거리 딜러 ''룰러'' 박재혁 선수와의 계약 연장에 청신호를 켰습니다. LPL 팀들의 거액 베팅 루머가 돌았으나 룰러 본인이 젠지 프랜차이즈로서의 잔류 의지를 강력히 표명한 것으로 전해집니다.', '[윤민섭] 젠지, 프랜차이즈 스타 룰러(Ruler)와 재계약 유력… LPL 복귀설 일축', (SELECT id FROM players WHERE slug = 'ruler'), 2, 93, 'https://x.com/mulseop/status/1852290481920491823', '2026-11-01T03:15:00Z'),
('tw-20261101-quid-c9', 'TWITTER', 'LEC_Wooloo (Sheep Esports)', '[Sources] Cloud9 is exploring options to acquire midlaner Quid from Team Liquid. With C9 looking to upgrade their mid lane carry potential alongside Blaber, talks have started between both NA heavyweights.', '[울루] C9, 팀 리퀴드(TL) 미드 퀴드(Quid) 영입 문의… 블라버 파트너 모색', (SELECT id FROM players WHERE slug = 'quid'), 33, 72, 'https://sheepesports.com/articles/sources-c9-exploring-quid-tl-transfer/2026-11-01', '2026-11-01T15:40:00Z'),
('wb-20261101-theshy-ig', 'WEIBO', '恋恋红茶 (Red Tea)', '极粉们放宽心，TheShy和Rookie基本确定继续绑定一年。iG管理层刚刚完成了新一轮赞助合同，预算充足，下赛季老iG核心框架完全不会动摇，正在挑选替补上单和分析师。', '[홍차] 더샤이(TheShy) & 루키, iG와 동반 1년 재계약 확정적', (SELECT id FROM players WHERE slug = 'theshy'), 16, 94, 'https://weibo.com/redtea/status/5095692019842104', '2026-11-01T19:00:00Z'),
('cm-20261102-siwoo-kt', 'COMMUNITY', '한상용 (H-Dragon)', 'KT 쪽 소식 궁금해하시는 분들 많은데, 탑 라인에 공격적인 유망주 수혈을 적극 검토하고 있습니다. 퍼펙트 선수와 경쟁하거나 주전을 책임질 자원으로 DK의 시우(Siwoo) 선수에게 진지한 오퍼가 들어간 걸로 알고 있습니다.', '[한상용] kt 롤스터, DK 신예 탑 시우(Siwoo) 영입 오퍼 타진', (SELECT id FROM players WHERE slug = 'siwoo'), 5, 68, 'https://chzzk.naver.com/live/hdragon/community/98412', '2026-11-02T05:30:00Z'),
('wb-20261102-gala-blg', 'WEIBO', '丶涵艺 (Hanyi)', '如果Viper真的回韩国，BLG第一顺位就是GALA，JDG目前薪资空间受限，放走GALA可以腾出巨额薪金帽。BLG已经跟GALA团队打过招呼了，只要LCK那边一落定，这边随时秒签。', '[한이] 바이퍼 LCK 복귀 시 BLG 차기 원딜 1순위는 갈라(GALA)', (SELECT id FROM players WHERE slug = 'gala'), 11, 77, 'https://weibo.com/hanyi/status/5096019284710293', '2026-11-02T10:15:00Z'),
('tw-20261102-carzzy-fnc', 'TWITTER', 'LEC_Wooloo (Sheep Esports)', '[Sources] Fnatic is exploring options in the bot lane and has inquired about Team Vitality''s AD Carry Matyáš ''Carzzy'' Orság. Upset''s future with the team remains uncertain heading into the 2027 offseason.', '[울루] 프나틱(FNC), 바이탈리티 카르지(Carzzy) 영입 타진… 업셋 거취 유동적', (SELECT id FROM players WHERE slug = 'carzzy'), 22, 76, 'https://sheepesports.com/articles/sources-fnatic-inquires-carzzy-vitality/2026-11-02', '2026-11-02T13:45:00Z'),
('tw-20261102-berserker-tl', 'TWITTER', 'Travis Gafford', 'Hearing massive LCS rumors: Team Liquid has Berserker at the very top of their wish list for 2027. Pair him with CoreJJ, and TL would have the most dominant bot lane on paper in Americas North.', '[트래비스 개포드] 팀 리퀴드(TL), 버서커(Berserker) 영입 추진… 코어장전과 호흡 노린다', (SELECT id FROM players WHERE slug = 'berserker'), 32, 81, 'https://x.com/TravisGafford/status/1852781049281728190', '2026-11-02T22:10:00Z'),
('cm-20261103-pyosik-krx', 'COMMUNITY', '감스트/케인 스토브리그 썰', '어제 관계자 형들한테 들었는데 표식(Pyosik)이 친정팀 DRX 복귀 썰 진짜 진지하더라. 디엔숲에서도 잡으려곤 하는데 표식이 DRX에 워낙 애정이 깊어서 감독진이랑 교감 중이라는 소리 나옴.', '[인터넷 방송 썰] 표식(Pyosik), 친정팀 DRX 컴백 교감설… DNS 재계약과 저울질', (SELECT id FROM players WHERE slug = 'pyosik'), 8, 63, 'https://vod.sooplive.co.kr/player/109283741', '2026-11-03T02:20:00Z'),
('wb-20261103-tian-jdg', 'WEIBO', '丶涵艺 (Hanyi)', '高天亮（Tian）在TES替补席坐了大半年，渴望首发出战。JDG打野位今年变动频繁，已经向滔搏正式递交了租借/转会询价函，Tian本人也极度希望加盟一支具备季后赛实力的俱乐部证明自己。', '[한이] JDG, TES 서브 정글러 티안(Tian) 영입 문의 공식 전달', (SELECT id FROM players WHERE slug = 'tian'), 13, 83, 'https://weibo.com/hanyi/status/5096381029481729', '2026-11-03T07:50:00Z'),
('tw-20261103-peanut-hle', 'TWITTER', '윤민섭 기자 (Kukmin Ilbo)', '한화생명e스포츠(HLE)의 캡틴 피넛(Peanut) 한왕호 선수가 팀과 1년 재계약에 구두 합의했습니다. 은퇴 및 군 입대 시점을 앞두고 HLE의 끈질긴 설득과 리그 제패를 향한 의지가 통했다는 평가입니다.', '[윤민섭] 한화생명 피넛(Peanut), 구단과 1년 재계약 구두 합의… 캡틴 잔류', (SELECT id FROM players WHERE slug = 'peanut'), 3, 91, 'https://x.com/mulseop/status/1853018293847291048', '2026-11-03T11:00:00Z'),
('wb-20261103-doggo-al', 'WEIBO', 'OBGG', '[LPL/LCP 联动] CFO当家AD选手Doggo近期正在接受LPL俱乐部Anyone''s Legend (AL)的试训考察。随着Hope合同即将到期，AL急需引进强力对线型下路，双方意向相当契合。', '[OBGG] CFO 간판 원딜 도고(Doggo), LPL AL 입단 테스트 및 이적 협상 중', (SELECT id FROM players WHERE slug = 'doggo'), 20, 74, 'https://weibo.com/obgg/status/5096491028374910', '2026-11-03T16:40:00Z'),
('cm-20261103-teddy-dns', 'COMMUNITY', '익명 관계자 (FMKorea)', '[단독 찌라시] DN 숲퍼스가 덕담(deokdam)과의 결별 가능성을 열어두고 베테랑 원딜 테디(Teddy) 영입을 타진 중. 브리온과의 계약 해지 조항을 활용해 DNS가 안정적인 캐리 라인 구축을 노린다는 소식.', '[펨코 익명 썰] DN 숲퍼스, 브리온 테디(Teddy) 영입 타진… 베테랑 원딜 교체 검토', (SELECT id FROM players WHERE slug = 'teddy'), 10, 60, 'https://www.fmkorea.com/lol/7649281729', '2026-11-03T23:15:00Z'),
('tw-20261104-mikyx-g2', 'TWITTER', 'LEC_Wooloo (Sheep Esports)', '[Sources] Following discussions regarding their support position for 2027, G2 Esports has internally considered a potential reunion with veteran support Mihael ''Mikyx'' Mehle, who is currently under contract with SK Gaming.', '[울루] G2, SK 게이밍 미킥스(Mikyx) 복귀 시나리오 내부 검토 중', (SELECT id FROM players WHERE slug = 'mikyx'), 21, 66, 'https://sheepesports.com/articles/sources-g2-considers-mikyx-return-sk-gaming/2026-11-04', '2026-11-04T08:30:00Z'),
('tw-20261104-thanatos-fly', 'TWITTER', 'Travis Gafford', 'Hearing Cloud9 top laner Thanatos has drawn serious interest from FlyQuest. FLY is exploring top lane upgrades over Gakgos, and Thanatos’ aggressive lane dominant playstyle fits their upcoming super-roster blueprint.', '[트래비스 개포드] 플라이퀘스트, C9 탑 타나토스(Thanatos) 영입 눈독', (SELECT id FROM players WHERE slug = 'thanatos'), 31, 70, 'https://x.com/TravisGafford/status/1853391829471928491', '2026-11-04T12:00:00Z'),
('wb-20261104-elk-blg', 'WEIBO', '恋恋红茶 (Red Tea)', 'WBG这个赛季成绩没有达到管理层预期，Elk有可能会重返BLG。BLG管理层始终认为当年Bin/Xun/knight/Elk/ON的夺冠化学反应是最强的，双方已经有了非正式接触。', '[홍차] 엘크(Elk), WBG 떠나 BLG 복귀 타진… 우승 멤버 재결합 시동', (SELECT id FROM players WHERE slug = 'elk'), 11, 79, 'https://weibo.com/redtea/status/5096819283910284', '2026-11-04T14:40:00Z'),
('tw-20261104-vicla-fly', 'TWITTER', 'Alejandro Gomis', '[Sources] FlyQuest has opened talks with BNK FEARX to sign mid laner Lee ''VicLa'' Dae-kwang. VicLa previously played in North America and FlyQuest regards his LCK experience as an upgrade for their mid lane.', '[고미스] 플라이퀘스트(FLY), 피어엑스 미드 빅라(VicLa) 영입 접촉 개시', (SELECT id FROM players WHERE slug = 'vicla'), 31, 73, 'https://sheepesports.com/articles/sources-flyquest-talks-vicla-bnk-fearx/2026-11-04', '2026-11-04T18:15:00Z'),
('tw-20261104-levi-gam', 'TWITTER', 'LEC_Wooloo (Sheep Esports)', '[Sources] GAM Esports legendary jungler Đỗ ''Levi'' Duy Khánh is set to extend his contract with the Vietnamese organization for another year, rejecting lucrative offers from overseas regions.', '[울루] GAM의 심장 레비(Levi), 해외 팀 러브콜 거절하고 1년 재계약 체결', (SELECT id FROM players WHERE slug = 'levi'), 40, 92, 'https://sheepesports.com/articles/sources-levi-extends-with-gam-esports/2026-11-04', '2026-11-04T20:50:00Z'),
('tw-20261105-hena-lll', 'TWITTER', 'Travis Gafford', 'Brazilian sources tell me LOUD is finalizing a deal to acquire Korean bot laner Hena from paiN Gaming. LOUD aims to reclaim the CBLOL crown with Hena anchoring their damage output in 2027.', '[트래비스 개포드] 브라질 LOUD, paiN 게이밍 한국인 원딜 헤나(Hena) 영입 임박', (SELECT id FROM players WHERE slug = 'hena'), 48, 86, 'https://x.com/TravisGafford/status/1853689201984210492', '2026-11-05T01:30:00Z'),
('tw-20261105-peyz-t1', 'TWITTER', '윤민섭 기자 (Kukmin Ilbo)', '[단독] T1과 ''페이즈'' 김수환 선수가 계약 연장에 최종 서명했습니다. T1의 2026 시즌 핵심 전력으로 안착한 페이즈 선수는 팀의 장기 프로젝트 중심축으로 2027 시즌도 붉은 유니폼을 입게 됩니다.', '[윤민섭] T1, 페이즈(Peyz)와 계약 연장 최종 서명 완료… 2027 동행 확정', (SELECT id FROM players WHERE slug = 'peyz'), 1, 95, 'https://x.com/mulseop/status/1853741829019284710', '2026-11-05T06:10:00Z'),
('wb-20261105-weiwei-tes', 'WEIBO', '丶涵艺 (Hanyi)', 'TES打野位正在加速重组，naiyou经验尚浅，滔搏已经和LNG就Weiwei的转会事宜进行了三轮谈判。Weiwei本人非常看好369和JackeyLove的阵容竞争力，转会推进速度很快。', '[한이] TES, LNG 정글러 웨이웨이(Weiwei) 영입 협상 급진전', (SELECT id FROM players WHERE slug = 'weiwei'), 12, 82, 'https://weibo.com/hanyi/status/5097120938471920', '2026-11-05T09:45:00Z'),
('cm-20261105-kingen-ns', 'COMMUNITY', '한상용 (H-Dragon)', '농심 탑 킹겐(Kingen) 선수 거취 물어보시는 분들이 많은데, 농심 프론트가 킹겐 선수를 리빌딩의 핵심 기둥으로 잡고 있어서 적극적으로 붙잡고 있습니다. 타 팀 오퍼도 있었지만 킹겐 선수 역시 팀에 대한 책임감이 커서 잔류 쪽으로 기우는 분위기입니다.', '[한상용] 농심 레드포스, 탑 킹겐(Kingen)과 재계약 유력… 리빌딩 기둥 잔류', (SELECT id FROM players WHERE slug = 'kingen'), 9, 85, 'https://chzzk.naver.com/live/hdragon/community/98654', '2026-11-05T12:30:00Z'),
('tw-20261105-mireu-fur', 'TWITTER', 'Alejandro Gomis', '[Sources] Brazilian organization FURIA is in advanced negotiations to sign Korean mid laner Jeong ''Mireu'' Jo-bin from Vivo Keyd Stars. FURIA is looking to replace Tutsz for the 2027 season.', '[고미스] 브라질 FURIA, VKS 미드 미르(Mireu) 영입 협상 진전', (SELECT id FROM players WHERE slug = 'mireu'), 51, 80, 'https://sheepesports.com/articles/sources-furia-negotiations-mireu-vks/2026-11-05', '2026-11-05T14:15:00Z'),
('tw-20261105-caliste-kc', 'TWITTER', 'LEC_Wooloo (Sheep Esports)', '[Sources] Karmine Corp has officially locked in AD Carry prodigy Caliste Henry-Hennebert with a new long-term contract extension through 2029, building their entire LEC future around the French star.', '[울루] 카르민 코프(KC), 신성 칼리스트(Caliste)와 2029년까지 장기 재계약', (SELECT id FROM players WHERE slug = 'caliste'), 25, 95, 'https://sheepesports.com/articles/sources-caliste-extends-with-karmine-corp-2029/2026-11-05', '2026-11-05T15:20:00Z');

-- ==============================================================================
-- 7. 찌라시 기반 2027 시즌 예상 로스터(Predicted Roster) 및 원본 링크 반영
-- ==============================================================================
-- LCK 이적 및 재계약 루머 반영
UPDATE players SET predicted_team_id = 4, confidence = 82, status = 'RUMORED', source_url = 'https://x.com/mulseop/status/1850129384729184256' WHERE slug = 'aiming';
UPDATE players SET predicted_team_id = 8, confidence = 65, status = 'RUMORED', source_url = 'https://www.fmkorea.com/lol/7639102849' WHERE slug = 'smash';
UPDATE players SET predicted_team_id = 4, confidence = 78, status = 'RUMORED', source_url = 'https://chzzk.naver.com/live/hdragon/community/98231' WHERE slug = 'cuzz';
UPDATE players SET predicted_team_id = 5, confidence = 68, status = 'RUMORED', source_url = 'https://chzzk.naver.com/live/hdragon/community/98412' WHERE slug = 'siwoo';
UPDATE players SET predicted_team_id = 8, confidence = 63, status = 'RUMORED', source_url = 'https://vod.sooplive.co.kr/player/109283741' WHERE slug = 'pyosik';
UPDATE players SET predicted_team_id = 10, confidence = 60, status = 'RUMORED', source_url = 'https://www.fmkorea.com/lol/7649281729' WHERE slug = 'teddy';
UPDATE players SET predicted_team_id = 15, confidence = 85, status = 'RUMORED', source_url = 'https://weibo.com/hanyi/status/5093781293840192' WHERE slug = 'scout';
UPDATE players SET predicted_team_id = 3, confidence = 75, status = 'RUMORED', source_url = 'https://weibo.com/doinb/status/5094918239019284' WHERE slug = 'viper';
UPDATE players SET predicted_team_id = 1, confidence = 90, status = 'CONFIRMED', source_url = 'https://x.com/mulseop/status/1851210948392817409' WHERE slug = 'doran';
UPDATE players SET predicted_team_id = 1, confidence = 95, status = 'CONFIRMED', source_url = 'https://x.com/mulseop/status/1853741829019284710' WHERE slug = 'peyz';
UPDATE players SET predicted_team_id = 2, confidence = 93, status = 'CONFIRMED', source_url = 'https://x.com/mulseop/status/1852290481920491823' WHERE slug = 'ruler';
UPDATE players SET predicted_team_id = 3, confidence = 91, status = 'CONFIRMED', source_url = 'https://x.com/mulseop/status/1853018293847291048' WHERE slug = 'peanut';
UPDATE players SET predicted_team_id = 9, confidence = 85, status = 'STAY', source_url = 'https://chzzk.naver.com/live/hdragon/community/98654' WHERE slug = 'kingen';

-- LPL 이적 및 재계약 루머 반영
UPDATE players SET predicted_team_id = 14, confidence = 80, status = 'RUMORED', source_url = 'https://weibo.com/obgg/status/5095293810294821' WHERE slug = 'tarzan';
UPDATE players SET predicted_team_id = 11, confidence = 77, status = 'RUMORED', source_url = 'https://weibo.com/hanyi/status/5096019284710293' WHERE slug = 'gala';
UPDATE players SET predicted_team_id = 11, confidence = 79, status = 'RUMORED', source_url = 'https://weibo.com/redtea/status/5096819283910284' WHERE slug = 'elk';
UPDATE players SET predicted_team_id = 13, confidence = 83, status = 'RUMORED', source_url = 'https://weibo.com/hanyi/status/5096381029481729' WHERE slug = 'tian';
UPDATE players SET predicted_team_id = 12, confidence = 82, status = 'RUMORED', source_url = 'https://weibo.com/hanyi/status/5097120938471920' WHERE slug = 'weiwei';
UPDATE players SET predicted_team_id = 11, confidence = 88, status = 'CONFIRMED', source_url = 'https://weibo.com/redtea/status/5094209183492810' WHERE slug = 'bin';
UPDATE players SET predicted_team_id = 16, confidence = 94, status = 'CONFIRMED', source_url = 'https://weibo.com/redtea/status/5095692019842104' WHERE slug = 'theshy';

-- LEC 이적 및 재계약 루머 반영
UPDATE players SET predicted_team_id = 21, confidence = 92, status = 'RUMORED', source_url = 'https://sheepesports.com/articles/sources-g2-verbal-agreement-lyncas-skewmond-market/2026-10-27' WHERE slug = 'lyncas';
UPDATE players SET predicted_team_id = 27, confidence = 89, status = 'RUMORED', source_url = 'https://sheepesports.com/articles/sources-serin-verbal-agreement-sk-gaming/2026-10-31' WHERE slug = 'serin';
UPDATE players SET predicted_team_id = 22, confidence = 76, status = 'RUMORED', source_url = 'https://sheepesports.com/articles/sources-fnatic-inquires-carzzy-vitality/2026-11-02' WHERE slug = 'carzzy';
UPDATE players SET predicted_team_id = 21, confidence = 66, status = 'RUMORED', source_url = 'https://sheepesports.com/articles/sources-g2-considers-mikyx-return-sk-gaming/2026-11-04' WHERE slug = 'mikyx';
UPDATE players SET predicted_team_id = 25, confidence = 95, status = 'CONFIRMED', source_url = 'https://sheepesports.com/articles/sources-caliste-extends-with-karmine-corp-2029/2026-11-05' WHERE slug = 'caliste';

-- LCS 이적 루머 반영
UPDATE players SET predicted_team_id = 31, confidence = 84, status = 'RUMORED', source_url = 'https://x.com/TravisGafford/status/1851301982749102834' WHERE slug = 'inspired';
UPDATE players SET predicted_team_id = 31, confidence = 70, status = 'RUMORED', source_url = 'https://x.com/TravisGafford/status/1853391829471928491' WHERE slug = 'thanatos';
UPDATE players SET predicted_team_id = 31, confidence = 73, status = 'RUMORED', source_url = 'https://sheepesports.com/articles/sources-flyquest-talks-vicla-bnk-fearx/2026-11-04' WHERE slug = 'vicla';
UPDATE players SET predicted_team_id = 33, confidence = 72, status = 'RUMORED', source_url = 'https://sheepesports.com/articles/sources-c9-exploring-quid-tl-transfer/2026-11-01' WHERE slug = 'quid';
UPDATE players SET predicted_team_id = 32, confidence = 81, status = 'RUMORED', source_url = 'https://x.com/TravisGafford/status/1852781049281728190' WHERE slug = 'berserker';

-- LCP & CBLOL 이적 및 재계약 루머 반영
UPDATE players SET predicted_team_id = 20, confidence = 74, status = 'RUMORED', source_url = 'https://weibo.com/obgg/status/5096491028374910' WHERE slug = 'doggo';
UPDATE players SET predicted_team_id = 40, confidence = 92, status = 'CONFIRMED', source_url = 'https://sheepesports.com/articles/sources-levi-extends-with-gam-esports/2026-11-04' WHERE slug = 'levi';
UPDATE players SET predicted_team_id = 48, confidence = 86, status = 'RUMORED', source_url = 'https://x.com/TravisGafford/status/1853689201984210492' WHERE slug = 'hena';
UPDATE players SET predicted_team_id = 51, confidence = 80, status = 'RUMORED', source_url = 'https://sheepesports.com/articles/sources-furia-negotiations-mireu-vks/2026-11-05' WHERE slug = 'mireu';

