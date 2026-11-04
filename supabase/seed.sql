-- ==============================================================================
-- HotStoveLeague 2026년 11월 기준 글로벌 6대 리그 공식/최신 시드 데이터
-- ==============================================================================

-- 0. 기존 테이블 스키마 보정 (컬럼 누락 및 제약조건 자동 보정)
ALTER TABLE teams ADD COLUMN IF NOT EXISTS league VARCHAR(10) DEFAULT 'LCK';
CREATE INDEX IF NOT EXISTS idx_teams_league ON teams(league);
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
(11, 'Bilibili Gaming', 'BLG', 'LPL', '/logos/blg.png', '/logos/blg.png', '#00A1D6'),
(12, 'Top Esports', 'TES', 'LPL', '/logos/tes.png', '/logos/tes.png', '#FA3A2F'),
(13, 'JD Gaming', 'JDG', 'LPL', '/logos/jdg.png', '/logos/jdg.png', '#BA0C2F'),
(14, 'Weibo Gaming', 'WBG', 'LPL', '/logos/wbg.png', '/logos/wbg.png', '#FA3E3E'),
(15, 'LNG Esports', 'LNG', 'LPL', '/logos/lng.svg', '/logos/lng.svg', '#17366E'),
(16, 'Invictus Gaming', 'iG', 'LPL', '/logos/ig.png', '/logos/ig.png', '#231815'),
(17, 'EDward Gaming', 'EDG', 'LPL', '/logos/edg.png', '/logos/edg.png', '#282828'),
(18, 'Ninjas in Pyjamas', 'NIP', 'LPL', '/logos/nip.svg', '/logos/nip.svg', '#00FF00'),
(19, 'Team WE', 'WE', 'LPL', '/logos/we.svg', '/logos/we.svg', '#DA291C'),
(20, 'Anyone''s Legend', 'AL', 'LPL', '/logos/al.svg', '/logos/al.svg', '#E50027'),

-- LEC (유럽) - BDS -> Shifters(SHF) 리브랜딩, NAVI 합류 반영
(21, 'G2 Esports', 'G2', 'LEC', '/logos/g2.svg', '/logos/g2.svg', '#000000'),
(22, 'Fnatic', 'FNC', 'LEC', '/logos/fnc.svg', '/logos/fnc.svg', '#FF5900'),
(23, 'Movistar KOI', 'MDK', 'LEC', '/logos/mdk.svg', '/logos/mdk.svg', '#004B87'),
(24, 'Shifters', 'SHF', 'LEC', '/logos/shf.svg', '/logos/shf.svg', '#00A3E0'),
(25, 'Karmine Corp', 'KC', 'LEC', '/logos/kc.svg', '/logos/kc.svg', '#1B2C4B'),
(26, 'Team Vitality', 'VIT', 'LEC', '/logos/vit.svg', '/logos/vit.svg', '#FFF000'),
(27, 'SK Gaming', 'SK', 'LEC', '/logos/sk.svg', '/logos/sk.svg', '#002B49'),
(28, 'Team Heretics', 'TH', 'LEC', '/logos/th.svg', '/logos/th.svg', '#C4A000'),
(29, 'GIANTX', 'GX', 'LEC', '/logos/gx.svg', '/logos/gx.svg', '#1E2530'),
(30, 'Natus Vincere', 'NAVI', 'LEC', '/logos/navi.svg', '/logos/navi.svg', '#FFEE00'),

-- LCS (북미 / Americas North) - 100T 탈퇴 -> Sentinels(SEN) 슬롯 인수 반영
(31, 'FlyQuest', 'FLY', 'LCS', '/logos/fly.svg', '/logos/fly.svg', '#004938'),
(32, 'Team Liquid', 'TL', 'LCS', '/logos/tl.svg', '/logos/tl.svg', '#0F1923'),
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
(42, 'CTBC Flying Oyster', 'CFO', 'LCP', '/logos/cfo.svg', '/logos/cfo.svg', '#0F2042'),
(43, 'MVK Esports', 'MVK', 'LCP', '/logos/mvk.svg', '/logos/mvk.svg', '#1C3144'),
(44, 'Deep Cross Gaming', 'DCG', 'LCP', '/logos/dcg.svg', '/logos/dcg.svg', '#00EAFF'),
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
INSERT INTO players (name, real_name, position, current_team_id, predicted_team_id, is_starter, confidence, status) VALUES
-- ==============================================================================
-- LCK (한국) - 도오페페케 등 기존 로스터 보존
-- ==============================================================================
-- 1. T1 (id: 1)
('Doran', '최현준', 'TOP', 1, 1, true, 100, 'STAY'),
('Oner', '문현준', 'JGL', 1, 1, true, 100, 'STAY'),
('Faker', '이상혁', 'MID', 1, 1, true, 100, 'STAY'),
('Peyz', '김수환', 'BOT', 1, 1, true, 100, 'STAY'),
('Keria', '류민석', 'SPT', 1, 1, true, 100, 'STAY'),

-- 2. Gen.G (id: 2)
('Kiin', '김기인', 'TOP', 2, 2, true, 100, 'STAY'),
('Canyon', '김건부', 'JGL', 2, 2, true, 100, 'STAY'),
('Chovy', '정지훈', 'MID', 2, 2, true, 100, 'STAY'),
('Ruler', '박재혁', 'BOT', 2, 2, true, 100, 'STAY'),
('Duro', '주민규', 'SPT', 2, 2, true, 100, 'STAY'),

-- 3. Hanwha Life Esports (id: 3)
('Zeus', '최우제', 'TOP', 3, 3, true, 100, 'STAY'),
('Peanut', '한왕호', 'JGL', 3, 3, true, 100, 'STAY'),
('Zeka', '김건우', 'MID', 3, 3, true, 100, 'STAY'),
('Viper', '박도현', 'BOT', 3, 3, true, 100, 'STAY'),
('Delight', '유환중', 'SPT', 3, 3, true, 100, 'STAY'),

-- 4. Dplus KIA (id: 4)
('Siwoo', '전시우', 'TOP', 4, 4, true, 100, 'STAY'),
('Lucid', '최용혁', 'JGL', 4, 4, true, 100, 'STAY'),
('ShowMaker', '허수', 'MID', 4, 4, true, 100, 'STAY'),
('Aiming', '김하람', 'BOT', 4, 4, true, 100, 'STAY'),
('BeryL', '조건희', 'SPT', 4, 4, true, 100, 'STAY'),

-- 5. kt Rolster (id: 5)
('PerfecT', '이승민', 'TOP', 5, 5, true, 100, 'STAY'),
('Cuzz', '문우찬', 'JGL', 5, 5, true, 100, 'STAY'),
('Bdd', '곽보성', 'MID', 5, 5, true, 100, 'STAY'),
('Taeyoon', '김태윤', 'BOT', 5, 5, true, 100, 'STAY'),
('Way', '한길', 'SPT', 5, 5, true, 100, 'STAY'),
('Paduck', '박석현', 'BOT', 5, 5, false, 100, 'STAY'),

-- 6. BNK FEARX (id: 6)
('Clear', '송현민', 'TOP', 6, 6, true, 100, 'STAY'),
('Raptor', '전어진', 'JGL', 6, 6, true, 100, 'STAY'),
('VicLa', '이대광', 'MID', 6, 6, true, 100, 'STAY'),
('Diable', '남대근', 'BOT', 6, 6, true, 100, 'STAY'),
('Kellin', '김형규', 'SPT', 6, 6, true, 100, 'STAY'),
('Daystar', '유지혁', 'MID', 6, 6, false, 100, 'STAY'),

-- 7. 한진 브리온 (id: 7)
('Morgan', '박루한', 'TOP', 7, 7, true, 100, 'STAY'),
('HamBak', '함유진', 'JGL', 7, 7, true, 100, 'STAY'),
('Karis', '이홍민', 'MID', 7, 7, true, 100, 'STAY'),
('Hype', '변정현', 'BOT', 7, 7, true, 100, 'STAY'),
('Pollu', '오동규', 'SPT', 7, 7, true, 100, 'STAY'),
('Kangin', '안강인', 'TOP', 7, 7, false, 100, 'STAY'),
('Roamer', '이상민', 'MID', 7, 7, false, 100, 'STAY'),
('Enosh', '임유백', 'SPT', 7, 7, false, 100, 'STAY'),

-- 8. 키움 DRX (id: 8)
('Rich', '이재원', 'TOP', 8, 8, true, 100, 'STAY'),
('Sponge', '배영준', 'JGL', 8, 8, true, 100, 'STAY'),
('Ucal', '손우현', 'MID', 8, 8, true, 100, 'STAY'),
('Teddy', '박진성', 'BOT', 8, 8, true, 100, 'STAY'),
('Andil', '문관빈', 'SPT', 8, 8, true, 100, 'STAY'),
('Frog', '민경민', 'TOP', 8, 8, false, 100, 'STAY'),
('kyeahoo', '이공우', 'MID', 8, 8, false, 100, 'STAY'),
('Pleata', '손민우', 'SPT', 8, 8, false, 100, 'STAY'),

-- 9. Nongshim RedForce (id: 9)
('Kingen', '황성훈', 'TOP', 9, 9, true, 100, 'STAY'),
('Sylvie', '이승복', 'JGL', 9, 9, true, 100, 'STAY'),
('Fisher', '이정태', 'MID', 9, 9, true, 100, 'STAY'),
('Jiwoo', '정지우', 'BOT', 9, 9, true, 100, 'STAY'),
('Lehends', '손시우', 'SPT', 9, 9, true, 100, 'STAY'),
('Calix', '선현욱', 'MID', 9, 9, false, 100, 'STAY'),

-- 10. DN SOOPers (id: 10)
('DuDu', '이동주', 'TOP', 10, 10, true, 100, 'STAY'),
('Pyosik', '홍창현', 'JGL', 10, 10, true, 100, 'STAY'),
('Clozer', '이주현', 'MID', 10, 10, true, 100, 'STAY'),
('deokdam', '서대길', 'BOT', 10, 10, true, 100, 'STAY'),
('Life', '김정민', 'SPT', 10, 10, true, 100, 'STAY'),
('Sharvel', '김단우', 'JGL', 10, 10, false, 100, 'STAY'),
('Peter', '정윤수', 'SPT', 10, 10, false, 100, 'STAY'),

-- ==============================================================================
-- LPL 2026년 11월 기준 최신 공식 로스터 (RNG 해체 반영, NIP 추가)
-- ==============================================================================
-- 11. Bilibili Gaming (id: 11)
('Bin', 'Chen Zebin', 'TOP', 11, 11, true, 100, 'STAY'),
('Xun', 'Peng Lixun', 'JGL', 11, 11, true, 100, 'STAY'),
('knight', 'Zhuo Ding', 'MID', 11, 11, true, 100, 'STAY'),
('Viper', 'Park Do-hyeon', 'BOT', 11, 11, true, 100, 'STAY'),
('ON', 'Luo Wenjun', 'SPT', 11, 11, true, 100, 'STAY'),
('Flandre', 'Li Xuanjun', 'TOP', 11, 11, false, 100, 'STAY'),

-- 12. Top Esports (id: 12)
('369', 'Bai Jiahao', 'TOP', 12, 12, true, 100, 'STAY'),
('naiyou', 'Yang Zijian', 'JGL', 12, 12, true, 100, 'STAY'),
('Creme', 'Lin Jian', 'MID', 12, 12, true, 100, 'STAY'),
('JackeyLove', 'Yu Wenbo', 'BOT', 12, 12, true, 100, 'STAY'),
('Zhuo', 'Wang Xuzhuo', 'SPT', 12, 12, true, 100, 'STAY'),
('JiaQi', 'Zi Jiaqi', 'BOT', 12, 12, false, 100, 'STAY'),

-- 13. JD Gaming (id: 13)
('Xiaoxu', 'Xu Xingzu', 'TOP', 13, 13, true, 100, 'STAY'),
('JunJia', 'Yu Chun-chia', 'JGL', 13, 13, true, 100, 'STAY'),
('HongQ', 'Chu Chun-lan', 'MID', 13, 13, true, 100, 'STAY'),
('GALA', 'Chen Wei', 'BOT', 13, 13, true, 100, 'STAY'),
('Vampire', 'Zhao Zhe', 'SPT', 13, 13, true, 100, 'STAY'),
('xiaofang', 'Fang Zheyu', 'JGL', 13, 13, false, 100, 'STAY'),

-- 14. Weibo Gaming (id: 14)
('Zika', 'Tang Huayu', 'TOP', 14, 14, true, 100, 'STAY'),
('Jiejie', 'Zhao Lijie', 'JGL', 14, 14, true, 100, 'STAY'),
('Xiaohu', 'Li Yuanhao', 'MID', 14, 14, true, 100, 'STAY'),
('Elk', 'Zhao Jiahao', 'BOT', 14, 14, true, 100, 'STAY'),
('Crisp', 'Liu Qingsong', 'SPT', 14, 14, true, 100, 'STAY'),
('Xiaohao', 'Peng Hao', 'JGL', 14, 14, false, 100, 'STAY'),

-- 15. LNG Esports (id: 15)
('Breathe', 'Chen Chen', 'TOP', 15, 15, true, 100, 'STAY'),
('Weiwei', 'Wei Bohan', 'JGL', 15, 15, true, 100, 'STAY'),
('Scout', 'Lee Ye-chan', 'MID', 15, 15, true, 100, 'STAY'),
('Light', 'Wang Guangyu', 'BOT', 15, 15, true, 100, 'STAY'),
('Hang', 'Fu Minghang', 'SPT', 15, 15, true, 100, 'STAY'),

-- 16. Invictus Gaming (id: 16) - 더샤이-루키-웨이
('TheShy', 'Kang Seung-lok', 'TOP', 16, 16, true, 100, 'STAY'),
('Wei', 'Yan Yangwei', 'JGL', 16, 16, true, 100, 'STAY'),
('Rookie', 'Song Eui-jin', 'MID', 16, 16, true, 100, 'STAY'),
('Photic', 'Ying Qishen', 'BOT', 16, 16, true, 100, 'STAY'),
('Meiko', 'Tian Ye', 'SPT', 16, 16, true, 100, 'STAY'),
('Soboro', 'Lim Sung-min', 'TOP', 16, 16, false, 100, 'STAY'),

-- 17. EDward Gaming (id: 17)
('Solokill', 'Mak Fu-hing', 'TOP', 17, 17, true, 100, 'STAY'),
('Monki', 'Wang Mengqi', 'JGL', 17, 17, true, 100, 'STAY'),
('Angel', 'Xiang Tao', 'MID', 17, 17, true, 100, 'STAY'),
('Thesnake', 'Kang Guang', 'BOT', 17, 17, true, 100, 'STAY'),
('Wink', 'Zhang Rui', 'SPT', 17, 17, true, 100, 'STAY'),

-- 18. Ninjas in Pyjamas (id: 18) - 2026 LPL
('HOYA', 'Yoon Yong-ho', 'TOP', 18, 18, true, 100, 'STAY'),
('Guwon', 'Koo Gwan-mo', 'JGL', 18, 18, true, 100, 'STAY'),
('Care', 'Yang Jie', 'MID', 18, 18, true, 100, 'STAY'),
('Assum', 'Zou Jun', 'BOT', 18, 18, true, 100, 'STAY'),
('fengyue', 'Wang Runlai', 'SPT', 18, 18, true, 100, 'STAY'),

-- 19. Team WE (id: 19)
('Wayward', 'Huang Renxing', 'TOP', 19, 19, true, 100, 'STAY'),
('Heng', 'Yang Cuiheng', 'JGL', 19, 19, true, 100, 'STAY'),
('FoFo', 'Chu Chun-lan', 'MID', 19, 19, true, 100, 'STAY'),
('Able', 'Dai Zhi-chun', 'BOT', 19, 19, true, 100, 'STAY'),
('Iwandy', 'Liao Pengchuan', 'SPT', 19, 19, true, 100, 'STAY'),

-- 20. Anyone's Legend (id: 20)
('Ale', 'Han Zhao', 'TOP', 20, 20, true, 100, 'STAY'),
('Tarzan', 'Lee Seung-yong', 'JGL', 20, 20, true, 100, 'STAY'),
('Shanks', 'Cui Xiaojun', 'MID', 20, 20, true, 100, 'STAY'),
('Hope', 'Wang Jie', 'BOT', 20, 20, true, 100, 'STAY'),
('Kael', 'Kim Jin-hong', 'SPT', 20, 20, true, 100, 'STAY'),

-- ==============================================================================
-- LEC 2026년 11월 기준 최신 공식 로스터 (Shifters, NAVI 반영)
-- ==============================================================================
-- 21. G2 Esports (id: 21)
('BrokenBlade', 'Sergen Celik', 'TOP', 21, 21, true, 100, 'STAY'),
('SkewMond', 'Rudy Semaan', 'JGL', 21, 21, true, 100, 'STAY'),
('Caps', 'Rasmus Winther', 'MID', 21, 21, true, 100, 'STAY'),
('Hans Sama', 'Steven Liv', 'BOT', 21, 21, true, 100, 'STAY'),
('Labrov', 'Labros Papoutsakis', 'SPT', 21, 21, true, 100, 'STAY'),

-- 22. Fnatic (id: 22)
('Oscarinin', 'Oscar Munoz', 'TOP', 22, 22, true, 100, 'STAY'),
('Razork', 'Ivan Martin', 'JGL', 22, 22, true, 100, 'STAY'),
('Vladi', 'VladimiR Bilohorats', 'MID', 22, 22, true, 100, 'STAY'),
('Upset', 'Elias Lipp', 'BOT', 22, 22, true, 100, 'STAY'),
('Lospa', 'Park Joon-hyeong', 'SPT', 22, 22, true, 100, 'STAY'),

-- 23. Movistar KOI (MDK) (id: 23)
('Myrwn', 'Alex Pastor', 'TOP', 23, 23, true, 100, 'STAY'),
('Elyoya', 'Javier Prades', 'JGL', 23, 23, true, 100, 'STAY'),
('Jojopyun', 'Joseph Joon Pyun', 'MID', 23, 23, true, 100, 'STAY'),
('Supa', 'David Garcia', 'BOT', 23, 23, true, 100, 'STAY'),
('Alvaro', 'Alvaro Fernandez', 'SPT', 23, 23, true, 100, 'STAY'),

-- 24. Shifters (구 Team BDS) (id: 24)
('Adam', 'Adam Maanane', 'TOP', 24, 24, true, 100, 'STAY'),
('Sheo', 'Theo Borile', 'JGL', 24, 24, true, 100, 'STAY'),
('Nuc', 'Ilias Bizriken', 'MID', 24, 24, true, 100, 'STAY'),
('Trigger', 'Kim Eui-joo', 'BOT', 24, 24, true, 100, 'STAY'),
('Trymbi', 'Adrian Trybus', 'SPT', 24, 24, true, 100, 'STAY'),

-- 25. Karmine Corp (id: 25)
('Canna', 'Kim Chang-dong', 'TOP', 25, 25, true, 100, 'STAY'),
('Yike', 'Martin Sundelin', 'JGL', 25, 25, true, 100, 'STAY'),
('kyeahoo', 'Lee Kong-woo', 'MID', 25, 25, true, 100, 'STAY'),
('Caliste', 'Caliste Henry-Hennebert', 'BOT', 25, 25, true, 100, 'STAY'),
('Busio', 'Alan Cwalina', 'SPT', 25, 25, true, 100, 'STAY'),

-- 26. Team Vitality (id: 26)
('Photon', 'Kyeong Gyu-tae', 'TOP', 26, 26, true, 100, 'STAY'),
('Lyncas', 'Linas Nauncikas', 'JGL', 26, 26, true, 100, 'STAY'),
('Vetheo', 'Vincent Berrie', 'MID', 26, 26, true, 100, 'STAY'),
('Carzzy', 'Matyas Orsag', 'BOT', 26, 26, true, 100, 'STAY'),
('Hylissang', 'Zdravets Galabov', 'SPT', 26, 26, true, 100, 'STAY'),

-- 27. SK Gaming (id: 27)
('Wunder', 'Martin Hansen', 'TOP', 27, 27, true, 100, 'STAY'),
('Skeanz', 'Duncan Marquet', 'JGL', 27, 27, true, 100, 'STAY'),
('LIDER', 'Adam Ilyasov', 'MID', 27, 27, true, 100, 'STAY'),
('Jopa', 'Josip Cancar', 'BOT', 27, 27, true, 100, 'STAY'),
('Mikyx', 'Mihael Mehle', 'SPT', 27, 27, true, 100, 'STAY'),

-- 28. Team Heretics (id: 28)
('Tracyn', 'Sebastian Wojton', 'TOP', 28, 28, true, 100, 'STAY'),
('Jankos', 'Marcin Jankowski', 'JGL', 28, 28, true, 100, 'STAY'),
('Jackies', 'Jack Jesenek', 'MID', 28, 28, true, 100, 'STAY'),
('Flakked', 'Victor Lirola', 'BOT', 28, 28, true, 100, 'STAY'),
('Jun', 'Yoon Se-jun', 'SPT', 28, 28, true, 100, 'STAY'),

-- 29. GIANTX (id: 29)
('Lot', 'Eren Yildiz', 'TOP', 29, 29, true, 100, 'STAY'),
('ISMA', 'Ismail Boualem', 'JGL', 29, 29, true, 100, 'STAY'),
('Feisty', 'Jeong Seong-hoon', 'MID', 29, 29, true, 100, 'STAY'),
('Noah', 'Oh Hyeon-taek', 'BOT', 29, 29, true, 100, 'STAY'),
('Luon', 'Han Hyeon-joon', 'SPT', 29, 29, true, 100, 'STAY'),

-- 30. Natus Vincere (id: 30) - 2026 LEC 신규 합류
('Maynter', 'Volodymyr Sorokin', 'TOP', 30, 30, true, 100, 'STAY'),
('Rhilech', 'Enes Ucan', 'JGL', 30, 30, true, 100, 'STAY'),
('Poby', 'Yoon Sung-won', 'MID', 30, 30, true, 100, 'STAY'),
('Hans SamD', 'Lee Jae-hoon', 'BOT', 30, 30, true, 100, 'STAY'),
('Parus', 'Polat Furkan Cicek', 'SPT', 30, 30, true, 100, 'STAY'),

-- ==============================================================================
-- LCS (Americas North) 2026년 11월 기준 최신 공식 로스터 (Sentinels 인수 반영)
-- ==============================================================================
-- 31. FlyQuest (id: 31)
('Gakgos', 'Gokhan Acikgoz', 'TOP', 31, 31, true, 100, 'STAY'),
('Gryffinn', 'Gryffinn Lee', 'JGL', 31, 31, true, 100, 'STAY'),
('Quad', 'Song Su-hyeong', 'MID', 31, 31, true, 100, 'STAY'),
('Massu', 'Fahad Abdulmalek', 'BOT', 31, 31, true, 100, 'STAY'),
('Cryogen', 'Christian Aho', 'SPT', 31, 31, true, 100, 'STAY'),

-- 32. Team Liquid (id: 32)
('Morgan', 'Park Ru-han', 'TOP', 32, 32, true, 100, 'STAY'),
('Josedeodo', 'Brandon Joel Villegas', 'JGL', 32, 32, true, 100, 'STAY'),
('Roamer', 'Lee Sang-min', 'MID', 32, 32, true, 100, 'STAY'),
('Yeon', 'Sean Sung', 'BOT', 32, 32, true, 100, 'STAY'),
('CoreJJ', 'Jo Yong-in', 'SPT', 32, 32, true, 100, 'STAY'),

-- 33. Cloud9 (id: 33)
('Thanatos', 'Park Seung-gyu', 'TOP', 33, 33, true, 100, 'STAY'),
('Blaber', 'Robert Huang', 'JGL', 33, 33, true, 100, 'STAY'),
('APA', 'Eain Stearns', 'MID', 33, 33, true, 100, 'STAY'),
('Zven', 'Jesper Svenningsen', 'BOT', 33, 33, true, 100, 'STAY'),
('VULCAN', 'Philippe Laflamme', 'SPT', 33, 33, true, 100, 'STAY'),

-- 34. Sentinels (id: 34) - 100T 슬롯 인수 2026 신규 팀
('Impact', 'Jeong Eon-young', 'TOP', 34, 34, true, 100, 'STAY'),
('HamBak', 'Ham Yoo-jin', 'JGL', 34, 34, true, 100, 'STAY'),
('DARKWINGS', 'Isaac Chou', 'MID', 34, 34, true, 100, 'STAY'),
('Rahel', 'Cho Min-seong', 'BOT', 34, 34, true, 100, 'STAY'),
('huhi', 'Choi Jae-hyun', 'SPT', 34, 34, true, 100, 'STAY'),

-- 35. Shopify Rebellion (id: 35)
('Fudge', 'Ibrahim Allami', 'TOP', 35, 35, true, 100, 'STAY'),
('Contractz', 'Juan Arturo Garcia', 'JGL', 35, 35, true, 100, 'STAY'),
('Zinie', 'Yoo Baek-jin', 'MID', 35, 35, true, 100, 'STAY'),
('Bvoy', 'Joo Yeong-hoon', 'BOT', 35, 35, true, 100, 'STAY'),
('Zeyzal', 'Tristan Stidam', 'SPT', 35, 35, true, 100, 'STAY'),

-- 36. Dignitas (id: 36)
('Photon', 'Kyeong Gyu-tae', 'TOP', 36, 36, true, 100, 'STAY'),
('eXyu', 'Lawrence Xu', 'JGL', 36, 36, true, 100, 'STAY'),
('Palafox', 'David Penn', 'MID', 36, 36, true, 100, 'STAY'),
('FBI', 'Ian Victor Huang', 'BOT', 36, 36, true, 100, 'STAY'),
('Denathor', 'Noah Erikson', 'SPT', 36, 36, true, 100, 'STAY'),

-- 37. Disguised (id: 37)
('Castle', 'Cho Hyeon-min', 'TOP', 37, 37, true, 100, 'STAY'),
('Young', 'Miracle Okoli', 'JGL', 37, 37, true, 100, 'STAY'),
('YoungJae', 'Ko Yeong-jae', 'MID', 37, 37, true, 100, 'STAY'),
('ScaryJerry', 'Jerry Meng', 'BOT', 37, 37, true, 100, 'STAY'),
('Poome', 'Philippe Lavoie-Giguere', 'SPT', 37, 37, true, 100, 'STAY'),

-- 38. Lyon Gaming (id: 38)
('Zamudo', 'Moises David', 'TOP', 38, 38, true, 100, 'STAY'),
('Inspired', 'Kacper Sloma', 'JGL', 38, 38, true, 100, 'STAY'),
('Saint', 'David De Guia', 'MID', 38, 38, true, 100, 'STAY'),
('Berserker', 'Kim Min-cheol', 'BOT', 38, 38, true, 100, 'STAY'),
('Isles', 'Jonah Rosario', 'SPT', 38, 38, true, 100, 'STAY'),

-- ==============================================================================
-- LCP (아시아태평양) 2026년 11월 기준 최신 공식 로스터 (Secret Whales, DCG, GZ 반영)
-- ==============================================================================
-- 39. Secret Whales (구 Team Secret) (id: 39) - 2026 LCP 전 시즌 챔피언
('Pun', 'Nguyen Dang Khoa', 'TOP', 39, 39, true, 100, 'STAY'),
('Hizto', 'Le Van Hoang Hai', 'JGL', 39, 39, true, 100, 'STAY'),
('Dire', 'Tran Duy Duc', 'MID', 39, 39, true, 100, 'STAY'),
('Eddie', 'Nghia Hoang', 'BOT', 39, 39, true, 100, 'STAY'),
('Bie', 'Tran Duc Hieu', 'SPT', 39, 39, true, 100, 'STAY'),
('Hiro02', 'Le Le Hai', 'TOP', 39, 39, false, 100, 'STAY'),

-- 40. GAM Esports (id: 40)
('Kiaya', 'Tran Duy Sang', 'TOP', 40, 40, true, 100, 'STAY'),
('Levi', 'Do Duy Khanh', 'JGL', 40, 40, true, 100, 'STAY'),
('Aress', 'Doan Van Hieu', 'MID', 40, 40, true, 100, 'STAY'),
('EasyLove', 'Hua Thanh An', 'BOT', 40, 40, true, 100, 'STAY'),
('Elio', 'Pham Thach Nhan Bang', 'SPT', 40, 40, true, 100, 'STAY'),

-- 41. Fukuoka SoftBank HAWKS gaming (id: 41)
('Evi', 'Shunsuke Murase', 'TOP', 41, 41, true, 100, 'STAY'),
('Forest', 'Lee Hyeon-seo', 'JGL', 41, 41, true, 100, 'STAY'),
('DasheR', 'Kim Deok-beom', 'MID', 41, 41, true, 100, 'STAY'),
('Marble', 'Ryo Endo', 'BOT', 41, 41, true, 100, 'STAY'),
('Vsta', 'Oh Hyo-seok', 'SPT', 41, 41, true, 100, 'STAY'),

-- 42. CTBC Flying Oyster (id: 42)
('Rest', 'Hsu Shih-chieh', 'TOP', 42, 42, true, 100, 'STAY'),
('Shad0w', 'Zhiqiang Zhao', 'JGL', 42, 42, true, 100, 'STAY'),
('Pungyeon', 'Lee Jong-hyeok', 'MID', 42, 42, true, 100, 'STAY'),
('Doggo', 'Chiu Tzu-Chuan', 'BOT', 42, 42, true, 100, 'STAY'),
('Orca', 'Chen Wei-chieh', 'SPT', 42, 42, true, 100, 'STAY'),

-- 43. MVK Esports (구 Vikings Esports) (id: 43)
('Kratos', 'Ngo Duc Khanh', 'TOP', 43, 43, true, 100, 'STAY'),
('Gury', 'Luong Hai Long', 'JGL', 43, 43, true, 100, 'STAY'),
('Chika', 'Vo Le Nhan', 'MID', 43, 43, true, 100, 'STAY'),
('Harky', 'Nguyen Van Huu', 'BOT', 43, 43, true, 100, 'STAY'),
('SiuLoong', 'Nguyen Hoang Lam', 'SPT', 43, 43, true, 100, 'STAY'),

-- 44. Deep Cross Gaming (id: 44) - 2026 LCP 준우승/MSI 진출
('XiaoXiang', 'Yi-Xiang Liao', 'TOP', 44, 44, true, 100, 'STAY'),
('Pop9', 'Yi-Han Wu', 'JGL', 44, 44, true, 100, 'STAY'),
('HongSuo', 'Bei-Yi Guo', 'MID', 44, 44, true, 100, 'STAY'),
('Flauren', 'Chak-Kin Lo', 'BOT', 44, 44, true, 100, 'STAY'),
('ShiauC', 'Jia-Hao Liu', 'SPT', 44, 44, true, 100, 'STAY'),

-- 45. DetonatioN FocusMe (id: 45)
('RayFarky', 'Shinohara Ryuki', 'TOP', 45, 45, true, 100, 'STAY'),
('Steal', 'Moon Geon-yeong', 'JGL', 45, 45, true, 100, 'STAY'),
('Aria', 'Lee Ga-eul', 'MID', 45, 45, true, 100, 'STAY'),
('Milan', 'Arai Takumi', 'BOT', 45, 45, true, 100, 'STAY'),
('Harp', 'Lee Ji-yoong', 'SPT', 45, 45, true, 100, 'STAY'),

-- 46. Ground Zero Gaming (id: 46) - 2026 LCP 신규 게스트 팀
('1Jiang', 'Chen Yi-chin', 'TOP', 46, 46, true, 100, 'STAY'),
('Husha', 'Huang Tzu-wei', 'JGL', 46, 46, true, 100, 'STAY'),
('Uniboy', 'Chen Chang-chu', 'MID', 46, 46, true, 100, 'STAY'),
('Betty', 'Lu Yu-hung', 'BOT', 46, 46, true, 100, 'STAY'),
('Kaiwing', 'Ling Kai Wing', 'SPT', 46, 46, true, 100, 'STAY'),

-- ==============================================================================
-- CBLOL (Americas South) 2026년 11월 기준 최신 공식 로스터 (Leviatan, Fluxo W7M 반영)
-- ==============================================================================
-- 47. paiN Gaming (id: 47)
('Boal', 'Felipe Boal', 'TOP', 47, 47, true, 100, 'STAY'),
('CarioK', 'Marcos Santos', 'JGL', 47, 47, true, 100, 'STAY'),
('Keine', 'Kim Joon-young', 'MID', 47, 47, true, 100, 'STAY'),
('Trigger', 'Kim Eui-joo', 'BOT', 47, 47, true, 100, 'STAY'),
('Kuri', 'Choi Won-yeong', 'SPT', 47, 47, true, 100, 'STAY'),

-- 48. LOUD (id: 48)
('xyno', 'Carlos Ferreira', 'TOP', 48, 48, true, 100, 'STAY'),
('YoungJae', 'Ko Yeong-jae', 'JGL', 48, 48, true, 100, 'STAY'),
('Envy', 'Lee Dong-ju', 'MID', 48, 48, true, 100, 'STAY'),
('Bull', 'Song Seon-gyu', 'BOT', 48, 48, true, 100, 'STAY'),
('uZent', 'Gabriel Dutra', 'SPT', 48, 48, true, 100, 'STAY'),

-- 49. Vivo Keyd Stars (id: 49)
('ZekaS', 'Cesar Berteli Franca', 'TOP', 49, 49, true, 100, 'STAY'),
('Disamis', 'Pedro Gonsaubes', 'JGL', 49, 49, true, 100, 'STAY'),
('Mireu', 'Jeong Jo-bin', 'MID', 49, 49, true, 100, 'STAY'),
('Jeskla', 'Jesper Stromberg', 'BOT', 49, 49, true, 100, 'STAY'),
('scamber', 'Pedro Lameiras', 'SPT', 49, 49, true, 100, 'STAY'),

-- 50. RED Canids (id: 50)
('zynts', 'Matheus Emanuel Silva', 'TOP', 50, 50, true, 100, 'STAY'),
('STEPZ', 'Eloy Rodriguez', 'JGL', 50, 50, true, 100, 'STAY'),
('Fuuu', 'Gabriel Furuuti', 'MID', 50, 50, true, 100, 'STAY'),
('Morttheus', 'Matheus Motta', 'BOT', 50, 50, true, 100, 'STAY'),
('frosty', 'Jose Eduardo', 'SPT', 50, 50, true, 100, 'STAY'),

-- 51. FURIA (id: 51)
('Zzk', 'Lucas Silveira', 'TOP', 51, 51, true, 100, 'STAY'),
('Wiz', 'Lee Han-seul', 'JGL', 51, 51, true, 100, 'STAY'),
('Tutsz', 'Arthur Machado', 'MID', 51, 51, true, 100, 'STAY'),
('Ayu', 'Andrey Saraiva', 'BOT', 51, 51, true, 100, 'STAY'),
('Zay', 'Vinicius Viana', 'SPT', 51, 51, true, 100, 'STAY'),

-- 52. Fluxo W7M (구 Fluxo) (id: 52)
('Kiari', 'Thiago Luiz', 'TOP', 52, 52, true, 100, 'STAY'),
('Shini', 'Diogo Roge', 'JGL', 52, 52, true, 100, 'STAY'),
('Furada', 'Pedro Rossi', 'MID', 52, 52, true, 100, 'STAY'),
('Trigo', 'Matheus Nobrega', 'BOT', 52, 52, true, 100, 'STAY'),
('Scuro', 'Gabriel Scuro', 'SPT', 52, 52, true, 100, 'STAY'),

-- 53. Leviatan (id: 53) - 2026 신규 합류
('Devost', 'Julian Orozco', 'TOP', 53, 53, true, 100, 'STAY'),
('Booki', 'Piero Aldo Medina', 'JGL', 53, 53, true, 100, 'STAY'),
('Enga', 'Eneas Protti', 'MID', 53, 53, true, 100, 'STAY'),
('Strensh', 'Cristopher Gustavo Gonzalez', 'BOT', 53, 53, true, 100, 'STAY'),
('Shiku', 'Carlo Andre Carrion', 'SPT', 53, 53, true, 100, 'STAY'),

-- 54. Los Grandes (id: 54)
('Boal_LG', 'Felipe Boal', 'TOP', 54, 54, true, 100, 'STAY'),
('Seize', 'Kim Ji-hun', 'JGL', 54, 54, true, 100, 'STAY'),
('tinowns', 'Thiago Sartori', 'MID', 54, 54, true, 100, 'STAY'),
('Netuno', 'Lucas Flores', 'BOT', 54, 54, true, 100, 'STAY'),
('Cavalo', 'Matheus Ferreira', 'SPT', 54, 54, true, 100, 'STAY');

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
