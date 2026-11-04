-- ==============================================================================
-- HotStoveLeague 2026 시즌 LCK 10개 구단 공식 확정 로스터 시드 데이터
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

-- 2. 리그별 구단 공식 명칭, 트라이코드, 리그 및 대표 색상
INSERT INTO teams (id, name, short_name, league, light_logo_url, dark_logo_url, primary_color) VALUES
-- LCK (한국)
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

-- LPL (중국)
(11, 'Bilibili Gaming', 'BLG', 'LPL', null, null, '#00A1D6'),
(12, 'Top Esports', 'TES', 'LPL', null, null, '#FA3A2F'),
(13, 'JD Gaming', 'JDG', 'LPL', null, null, '#BA0C2F'),
(14, 'Weibo Gaming', 'WBG', 'LPL', null, null, '#FA3E3E'),
(15, 'LNG Esports', 'LNG', 'LPL', null, null, '#17366E'),
(16, 'Invictus Gaming', 'iG', 'LPL', null, null, '#231815'),
(17, 'EDward Gaming', 'EDG', 'LPL', null, null, '#282828'),
(18, 'Royal Never Give Up', 'RNG', 'LPL', null, null, '#C5A96A'),
(19, 'Team WE', 'WE', 'LPL', null, null, '#DA291C'),
(20, 'Anyone''s Legend', 'AL', 'LPL', null, null, '#E50027'),

-- LEC (유럽)
(21, 'G2 Esports', 'G2', 'LEC', null, null, '#000000'),
(22, 'Fnatic', 'FNC', 'LEC', null, null, '#FF5900'),
(23, 'MAD Lions KOI', 'MDK', 'LEC', null, null, '#004B87'),
(24, 'Team BDS', 'BDS', 'LEC', null, null, '#00A3E0'),
(25, 'Karmine Corp', 'KC', 'LEC', null, null, '#1B2C4B'),
(26, 'Team Vitality', 'VIT', 'LEC', null, null, '#FFF000'),
(27, 'SK Gaming', 'SK', 'LEC', null, null, '#002B49'),
(28, 'Team Heretics', 'TH', 'LEC', null, null, '#C4A000'),
(29, 'GIANTX', 'GX', 'LEC', null, null, '#1E2530'),
(30, 'Rogue', 'RGE', 'LEC', null, null, '#0A5C8C'),

-- LCS (북미 / Americas North)
(31, 'FlyQuest', 'FLY', 'LCS', null, null, '#004938'),
(32, 'Team Liquid', 'TL', 'LCS', null, null, '#0F1923'),
(33, 'Cloud9', 'C9', 'LCS', null, null, '#0094D2'),
(34, '100 Thieves', '100', 'LCS', null, null, '#DF1A1A'),
(35, 'Shopify Rebellion', 'SR', 'LCS', null, null, '#182B49'),
(36, 'Dignitas', 'DIG', 'LCS', null, null, '#FFCC00'),
(37, 'Disguised', 'DSG', 'LCS', null, null, '#1E1E1E'),
(38, 'Lyon Gaming', 'LYN', 'LCS', null, null, '#582C83'),

-- LCP (아시아태평양)
(39, 'PSG Talon', 'PSG', 'LCP', null, null, '#1E2B58'),
(40, 'GAM Esports', 'GAM', 'LCP', null, null, '#FED100'),
(41, 'Fukuoka SoftBank HAWKS gaming', 'SHG', 'LCP', null, null, '#F5A800'),
(42, 'CTBC Flying Oyster', 'CFO', 'LCP', null, null, '#0F2042'),
(43, 'Vikings Esports', 'VKE', 'LCP', null, null, '#1C3144'),
(44, 'Team Secret', 'TS', 'LCP', null, null, '#1A1A1A'),
(45, 'DetonatioN FocusMe', 'DFM', 'LCP', null, null, '#00A0E9'),
(46, 'Chiefs Esports Club', 'CHF', 'LCP', null, null, '#157AFB'),

-- CBLOL (브라질 / Americas South)
(47, 'paiN Gaming', 'PNG', 'CBLOL', null, null, '#000000'),
(48, 'LOUD', 'LLL', 'CBLOL', null, null, '#00FF66'),
(49, 'Vivo Keyd Stars', 'VKS', 'CBLOL', null, null, '#552483'),
(50, 'RED Canids', 'RED', 'CBLOL', null, null, '#CC0000'),
(51, 'FURIA', 'FUR', 'CBLOL', null, null, '#000000'),
(52, 'Fluxo', 'FX', 'CBLOL', null, null, '#6B38FB'),
(53, 'INTZ', 'ITZ', 'CBLOL', null, null, '#1B242A'),
(54, 'Los Grandes', 'LOS', 'CBLOL', null, null, '#FF5500');

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
('Peter', '정윤수', 'SPT', 10, 10, false, 100, 'STAY'),

-- ==============================================================================
-- LPL 대표 로스터
-- ==============================================================================
-- 11. Bilibili Gaming (id: 11)
('Bin', 'Chen Zebin', 'TOP', 11, 11, true, 100, 'STAY'),
('Xun', 'Peng Lixun', 'JGL', 11, 11, true, 100, 'STAY'),
('knight', 'Zhuo Ding', 'MID', 11, 11, true, 100, 'STAY'),
('Elk', 'Zhao Jiahao', 'BOT', 11, 11, true, 100, 'STAY'),
('ON', 'Luo Wenjun', 'SPT', 11, 11, true, 100, 'STAY'),

-- 12. Top Esports (id: 12)
('369', 'Bai Jiahao', 'TOP', 12, 12, true, 100, 'STAY'),
('Tian', 'Gao Tianliang', 'JGL', 12, 12, true, 100, 'STAY'),
('Creme', 'Lin Jian', 'MID', 12, 12, true, 100, 'STAY'),
('JackeyLove', 'Yu Wenbo', 'BOT', 12, 12, true, 100, 'STAY'),
('Meiko', 'Tian Ye', 'SPT', 12, 12, true, 100, 'STAY'),

-- 13. JD Gaming (id: 13)
('Flandre', 'Li Xuanjun', 'TOP', 13, 13, true, 100, 'STAY'),
('Kanavi', 'Seo Jin-hyeok', 'JGL', 13, 13, true, 100, 'STAY'),
('Yagao', 'Zeng Qi', 'MID', 13, 13, true, 100, 'STAY'),
('Ruler', 'Park Jae-hyuk', 'BOT', 13, 13, true, 100, 'STAY'),
('MISSING', 'Lou Yunfeng', 'SPT', 13, 13, true, 100, 'STAY'),

-- 14. Weibo Gaming (id: 14)
('Breathe', 'Chen Chen', 'TOP', 14, 14, true, 100, 'STAY'),
('Tarzan', 'Lee Seung-yong', 'JGL', 14, 14, true, 100, 'STAY'),
('Xiaohu', 'Li Yuanhao', 'MID', 14, 14, true, 100, 'STAY'),
('Light', 'Wang Guangyu', 'BOT', 14, 14, true, 100, 'STAY'),
('Crisp', 'Liu Qingsong', 'SPT', 14, 14, true, 100, 'STAY'),

-- 15. LNG Esports (id: 15)
('Zika', 'Tang Huayu', 'TOP', 15, 15, true, 100, 'STAY'),
('Weiwei', 'Wei Bohan', 'JGL', 15, 15, true, 100, 'STAY'),
('Scout', 'Lee Ye-chan', 'MID', 15, 15, true, 100, 'STAY'),
('GALA', 'Chen Wei', 'BOT', 15, 15, true, 100, 'STAY'),
('Hang', 'Fu Minghang', 'SPT', 15, 15, true, 100, 'STAY'),

-- 16. Invictus Gaming (id: 16)
('YSKM', 'Chau Shu Tak', 'TOP', 16, 16, true, 100, 'STAY'),
('gluer', 'Li Guorui', 'JGL', 16, 16, true, 100, 'STAY'),
('Rookie', 'Song Eui-jin', 'MID', 16, 16, true, 100, 'STAY'),
('Ahn', 'An Shanzhen', 'BOT', 16, 16, true, 100, 'STAY'),
('Wink', 'Zhang Rui', 'SPT', 16, 16, true, 100, 'STAY'),

-- 17. EDward Gaming (id: 17)
('Ale', 'Han Zhao', 'TOP', 17, 17, true, 100, 'STAY'),
('Jiejie', 'Zhao Lijie', 'JGL', 17, 17, true, 100, 'STAY'),
('Fisher', 'Lee Jeong-tae', 'MID', 17, 17, true, 100, 'STAY'),
('Thesnake', 'Kang Guang', 'BOT', 17, 17, true, 100, 'STAY'),
('Vampire', 'Zhao Zhe', 'SPT', 17, 17, true, 100, 'STAY'),

-- 18. Royal Never Give Up (id: 18)
('Breathe', 'Chen Chen', 'TOP', 18, 18, true, 100, 'STAY'),
('Wei', 'Yan Yangwei', 'JGL', 18, 18, true, 100, 'STAY'),
('Tangyuan', 'Lin Yuhong', 'MID', 18, 18, true, 100, 'STAY'),
('Lwx', 'Lin Weixiang', 'BOT', 18, 18, true, 100, 'STAY'),
('Ming', 'Shi Senming', 'SPT', 18, 18, true, 100, 'STAY'),

-- 19. Team WE (id: 19)
('Wayward', 'Huang Renxing', 'TOP', 19, 19, true, 100, 'STAY'),
('Heng', 'Yang Cuiheng', 'JGL', 19, 19, true, 100, 'STAY'),
('FoFo', 'Chu Chun-lan', 'MID', 19, 19, true, 100, 'STAY'),
('Prince', 'Lee Chae-hwan', 'BOT', 19, 19, true, 100, 'STAY'),
('Iwandy', 'Liao Pengchuan', 'SPT', 19, 19, true, 100, 'STAY'),

-- 20. Anyone's Legend (id: 20)
('Hery', 'Wang Hetian', 'TOP', 20, 20, true, 100, 'STAY'),
('Croco', 'Kim Dong-beom', 'JGL', 20, 20, true, 100, 'STAY'),
('Shanks', 'Cui Xiaojun', 'MID', 20, 20, true, 100, 'STAY'),
('Hope', 'Wang Jie', 'BOT', 20, 20, true, 100, 'STAY'),
('Kael', 'Kim Jin-hong', 'SPT', 20, 20, true, 100, 'STAY'),

-- ==============================================================================
-- LEC 대표 로스터
-- ==============================================================================
-- 21. G2 Esports (id: 21)
('BrokenBlade', 'Sergen Celik', 'TOP', 21, 21, true, 100, 'STAY'),
('Yike', 'Martin Sundelin', 'JGL', 21, 21, true, 100, 'STAY'),
('Caps', 'Rasmus Winther', 'MID', 21, 21, true, 100, 'STAY'),
('Hans Sama', 'Steven Liv', 'BOT', 21, 21, true, 100, 'STAY'),
('Mikyx', 'Mihael Mehle', 'SPT', 21, 21, true, 100, 'STAY'),

-- 22. Fnatic (id: 22)
('Oscarinin', 'Oscar Munoz', 'TOP', 22, 22, true, 100, 'STAY'),
('Razork', 'Ivan Martin', 'JGL', 22, 22, true, 100, 'STAY'),
('Humanoid', 'Marek Brazda', 'MID', 22, 22, true, 100, 'STAY'),
('Noah', 'Oh Hyeon-taek', 'BOT', 22, 22, true, 100, 'STAY'),
('Jun', 'Yoon Se-jun', 'SPT', 22, 22, true, 100, 'STAY'),

-- 23. MAD Lions KOI (id: 23)
('Myrwn', 'Alex Pastor', 'TOP', 23, 23, true, 100, 'STAY'),
('Elyoya', 'Javier Prades', 'JGL', 23, 23, true, 100, 'STAY'),
('Fresskowy', 'Bartlomiej Proba', 'MID', 23, 23, true, 100, 'STAY'),
('Supa', 'David Garcia', 'BOT', 23, 23, true, 100, 'STAY'),
('Alvaro', 'Alvaro Fernandez', 'SPT', 23, 23, true, 100, 'STAY'),

-- 24. Team BDS (id: 24)
('Adam', 'Adam Maanane', 'TOP', 24, 24, true, 100, 'STAY'),
('Sheo', 'Theo Borile', 'JGL', 24, 24, true, 100, 'STAY'),
('Nuc', 'Ilias Bizriken', 'MID', 24, 24, true, 100, 'STAY'),
('Ice', 'Yoon Sang-hoon', 'BOT', 24, 24, true, 100, 'STAY'),
('Labrov', 'Labros Papoutsakis', 'SPT', 24, 24, true, 100, 'STAY'),

-- 25. Karmine Corp (id: 25)
('Cabochard', 'Lucas Simon-Meslet', 'TOP', 25, 25, true, 100, 'STAY'),
('Closer', 'Can Celik', 'JGL', 25, 25, true, 100, 'STAY'),
('VladimiR', 'Volodymyr Bilohorats', 'MID', 25, 25, true, 100, 'STAY'),
('Upset', 'Elias Lipp', 'BOT', 25, 25, true, 100, 'STAY'),
('Targamas', 'Raphael Crabbe', 'SPT', 25, 25, true, 100, 'STAY'),

-- 26. Team Vitality (id: 26)
('Photon', 'Kyeong Gyu-tae', 'TOP', 26, 26, true, 100, 'STAY'),
('Lyncas', 'Linas Nauncikas', 'JGL', 26, 26, true, 100, 'STAY'),
('Vetheo', 'Vincent Berrie', 'MID', 26, 26, true, 100, 'STAY'),
('Carzzy', 'Matyas Orsag', 'BOT', 26, 26, true, 100, 'STAY'),
('Hylissang', 'Zdravets Galabov', 'SPT', 26, 26, true, 100, 'STAY'),

-- 27. SK Gaming (id: 27)
('Irrelevant', 'Joel Miro Scharoll', 'TOP', 27, 27, true, 100, 'STAY'),
('ISMA', 'Ismail Boualem', 'JGL', 27, 27, true, 100, 'STAY'),
('Nisqy', 'Yasin Dincer', 'MID', 27, 27, true, 100, 'STAY'),
('Rahel', 'Cho Min-seong', 'BOT', 27, 27, true, 100, 'STAY'),
('Luon', 'Han Hyeon-joon', 'SPT', 27, 27, true, 100, 'STAY'),

-- 28. Team Heretics (id: 28)
('Wunder', 'Martin Hansen', 'TOP', 28, 28, true, 100, 'STAY'),
('Jankos', 'Marcin Jankowski', 'JGL', 28, 28, true, 100, 'STAY'),
('Zwyroo', 'Artur Trojan', 'MID', 28, 28, true, 100, 'STAY'),
('Flakked', 'Victor Lirola', 'BOT', 28, 28, true, 100, 'STAY'),
('Trymbi', 'Adrian Trybus', 'SPT', 28, 28, true, 100, 'STAY'),

-- 29. GIANTX (id: 29)
('Th3Antonio', 'Antonio Espinosa', 'TOP', 29, 29, true, 100, 'STAY'),
('Juhan', 'Lee Ju-han', 'JGL', 29, 29, true, 100, 'STAY'),
('Jackies', 'Jack Jesenek', 'MID', 29, 29, true, 100, 'STAY'),
('Patrik', 'Patrik Jiru', 'BOT', 29, 29, true, 100, 'STAY'),
('IgNar', 'Lee Dong-geun', 'SPT', 29, 29, true, 100, 'STAY'),

-- 30. Rogue (id: 30)
('Finn', 'Finn Wiestal', 'TOP', 30, 30, true, 100, 'STAY'),
('Markoon', 'Mark van Woensel', 'JGL', 30, 30, true, 100, 'STAY'),
('Larssen', 'Emil Larsson', 'MID', 30, 30, true, 100, 'STAY'),
('Comp', 'Markos Stamkopoulos', 'BOT', 30, 30, true, 100, 'STAY'),
('Zoelys', 'Paul Lelier', 'SPT', 30, 30, true, 100, 'STAY'),

-- ==============================================================================
-- LCS (Americas North) 대표 로스터
-- ==============================================================================
-- 31. FlyQuest (id: 31)
('Bwipo', 'Gabriël Rau', 'TOP', 31, 31, true, 100, 'STAY'),
('Inspired', 'Kacper Sloma', 'JGL', 31, 31, true, 100, 'STAY'),
('Quad', 'Song Su-hyeong', 'MID', 31, 31, true, 100, 'STAY'),
('Massu', 'Fahad Abdulmalek', 'BOT', 31, 31, true, 100, 'STAY'),
('Busio', 'Alan Cwalina', 'SPT', 31, 31, true, 100, 'STAY'),

-- 32. Team Liquid (id: 32)
('Impact', 'Jeong Eon-young', 'TOP', 32, 32, true, 100, 'STAY'),
('UmTi', 'Eom Seong-hyeon', 'JGL', 32, 32, true, 100, 'STAY'),
('APA', 'Eain Stearns', 'MID', 32, 32, true, 100, 'STAY'),
('Yeon', 'Sean Sung', 'BOT', 32, 32, true, 100, 'STAY'),
('CoreJJ', 'Jo Yong-in', 'SPT', 32, 32, true, 100, 'STAY'),

-- 33. Cloud9 (id: 33)
('Thanatos', 'Park Seung-gyu', 'TOP', 33, 33, true, 100, 'STAY'),
('Blaber', 'Robert Huang', 'JGL', 33, 33, true, 100, 'STAY'),
('Jojopyun', 'Joseph Joon Pyun', 'MID', 33, 33, true, 100, 'STAY'),
('Berserker', 'Kim Min-cheol', 'BOT', 33, 33, true, 100, 'STAY'),
('VULCAN', 'Philippe Laflamme', 'SPT', 33, 33, true, 100, 'STAY'),

-- 34. 100 Thieves (id: 34)
('Sniper', 'Rayane Kechiche', 'TOP', 34, 34, true, 100, 'STAY'),
('River', 'Kim Dong-woo', 'JGL', 34, 34, true, 100, 'STAY'),
('Quid', 'Lim Hyeon-seung', 'MID', 34, 34, true, 100, 'STAY'),
('FBI', 'Ian Victor Huang', 'BOT', 34, 34, true, 100, 'STAY'),
('Eyla', 'Bill Nguyen', 'SPT', 34, 34, true, 100, 'STAY'),

-- 35. Shopify Rebellion (id: 35)
('FakeGod', 'Aaron Lee', 'TOP', 35, 35, true, 100, 'STAY'),
('Buggax', 'Mateo Aroztegui', 'JGL', 35, 35, true, 100, 'STAY'),
('Insanity', 'David Challe', 'MID', 35, 35, true, 100, 'STAY'),
('Bvoy', 'Joo Yeong-hoon', 'BOT', 35, 35, true, 100, 'STAY'),
('Zeyzal', 'Tristan Stidam', 'SPT', 35, 35, true, 100, 'STAY'),

-- 36. Dignitas (id: 36)
('Licorice', 'Eric Ritchie', 'TOP', 36, 36, true, 100, 'STAY'),
('Spica', 'Mingyi Lu', 'JGL', 36, 36, true, 100, 'STAY'),
('Jensen', 'Nicolaj Jensen', 'MID', 36, 36, true, 100, 'STAY'),
('Tomo', 'Frank Lam', 'BOT', 36, 36, true, 100, 'STAY'),
('Isles', 'Jonah Rosario', 'SPT', 36, 36, true, 100, 'STAY'),

-- 37. Disguised (id: 37)
('Castle', 'Cho Hyeon-min', 'TOP', 37, 37, true, 100, 'STAY'),
('Young', 'Miracle Okoli', 'JGL', 37, 37, true, 100, 'STAY'),
('YoungJae', 'Ko Yeong-jae', 'MID', 37, 37, true, 100, 'STAY'),
('ScaryJerry', 'Jerry Meng', 'BOT', 37, 37, true, 100, 'STAY'),
('Poome', 'Philippe Lavoie-Giguere', 'SPT', 37, 37, true, 100, 'STAY'),

-- 38. Lyon Gaming (id: 38)
('Bong', 'Cho Bo-woong', 'TOP', 38, 38, true, 100, 'STAY'),
('Oddie', 'Sebastian Nino', 'JGL', 38, 38, true, 100, 'STAY'),
('Keine', 'Kim Joon-cheol', 'MID', 38, 38, true, 100, 'STAY'),
('Snaker', 'Brian Distefano', 'BOT', 38, 38, true, 100, 'STAY'),
('Ackerman', 'Gabriel Aparicio', 'SPT', 38, 38, true, 100, 'STAY'),

-- ==============================================================================
-- LCP (아시아태평양) 대표 로스터
-- ==============================================================================
-- 39. PSG Talon (id: 39)
('Azhi', 'Huang Shang-chih', 'TOP', 39, 39, true, 100, 'STAY'),
('Junjia', 'Yu Chun-chia', 'JGL', 39, 39, true, 100, 'STAY'),
('Maple', 'Huang Yi-tang', 'MID', 39, 39, true, 100, 'STAY'),
('Betty', 'Lu Yu-hung', 'BOT', 39, 39, true, 100, 'STAY'),
('Woody', 'Lin Zhang-wei', 'SPT', 39, 39, true, 100, 'STAY'),

-- 40. GAM Esports (id: 40)
('Kiaya', 'Tran Duy Sang', 'TOP', 40, 40, true, 100, 'STAY'),
('Levi', 'Do Duy Khanh', 'JGL', 40, 40, true, 100, 'STAY'),
('Emo', 'Nguyen Thai Vinh', 'MID', 40, 40, true, 100, 'STAY'),
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
('Karsa', 'Hung Hao-hsuan', 'JGL', 42, 42, true, 100, 'STAY'),
('Gori', 'Kim Tae-woo', 'MID', 42, 42, true, 100, 'STAY'),
('Shunn', 'Chao Sheng-lun', 'BOT', 42, 42, true, 100, 'STAY'),
('Kaiwing', 'Ling Kai Wing', 'SPT', 42, 42, true, 100, 'STAY'),

-- 43. Vikings Esports (id: 43)
('Nanaue', 'Nguyen Hoang Nam', 'TOP', 43, 43, true, 100, 'STAY'),
('Gury', 'Luong Hai Long', 'JGL', 43, 43, true, 100, 'STAY'),
('Kati', 'Dang Thanh Phe', 'MID', 43, 43, true, 100, 'STAY'),
('Shogun', 'Nguyen Van Huy', 'BOT', 43, 43, true, 100, 'STAY'),
('Bie', 'Tran Duc Hieu', 'SPT', 43, 43, true, 100, 'STAY'),

-- 44. Team Secret (id: 44)
('Hiro02', 'Le Le Hai', 'TOP', 44, 44, true, 100, 'STAY'),
('Qiang', 'Quach Khanh Hoang', 'JGL', 44, 44, true, 100, 'STAY'),
('Aress', 'Doan Van Hieu', 'MID', 44, 44, true, 100, 'STAY'),
('Eddie', 'Hoang Cong Nghia', 'BOT', 44, 44, true, 100, 'STAY'),
('Taki', 'Dinh Anh Tai', 'SPT', 44, 44, true, 100, 'STAY'),

-- 45. DetonatioN FocusMe (id: 45)
('RayFarky', 'Shinohara Ryuki', 'TOP', 45, 45, true, 100, 'STAY'),
('Steal', 'Moon Geon-yeong', 'JGL', 45, 45, true, 100, 'STAY'),
('Aria', 'Lee Ga-eul', 'MID', 45, 45, true, 100, 'STAY'),
('Milan', 'Arai Takumi', 'BOT', 45, 45, true, 100, 'STAY'),
('Harp', 'Lee Ji-yoong', 'SPT', 45, 45, true, 100, 'STAY'),

-- 46. Chiefs Esports Club (id: 46)
('Topoon', 'Kim Ji-hoon', 'TOP', 46, 46, true, 100, 'STAY'),
('Arthur', 'Park Mi-reu', 'JGL', 46, 46, true, 100, 'STAY'),
('Kisee', 'James Dong', 'MID', 46, 46, true, 100, 'STAY'),
('Raes', 'Quin Korebrits', 'BOT', 46, 46, true, 100, 'STAY'),
('Almini', 'Alen Rujnic', 'SPT', 46, 46, true, 100, 'STAY'),

-- ==============================================================================
-- CBLOL (Americas South) 대표 로스터
-- ==============================================================================
-- 47. paiN Gaming (id: 47)
('Wizer', 'Choi Ui-seok', 'TOP', 47, 47, true, 100, 'STAY'),
('CarioK', 'Marcos Santos', 'JGL', 47, 47, true, 100, 'STAY'),
('dyNquedo', 'Matheus Rossini', 'MID', 47, 47, true, 100, 'STAY'),
('TitaN', 'Alexandre Lima', 'BOT', 47, 47, true, 100, 'STAY'),
('Kuri', 'Choi Won-yeong', 'SPT', 47, 47, true, 100, 'STAY'),

-- 48. LOUD (id: 48)
('Robo', 'Leonardo Souza', 'TOP', 48, 48, true, 100, 'STAY'),
('Croc', 'Park Jong-hoon', 'JGL', 48, 48, true, 100, 'STAY'),
('tinowns', 'Thiago Sartori', 'MID', 48, 48, true, 100, 'STAY'),
('Route', 'Moon Geom-su', 'BOT', 48, 48, true, 100, 'STAY'),
('RedBert', 'Ygor Freitas', 'SPT', 48, 48, true, 100, 'STAY'),

-- 49. Vivo Keyd Stars (id: 49)
('Guigo', 'Guilherme Ruiz', 'TOP', 49, 49, true, 100, 'STAY'),
('Disenchant', 'Lee Seung-min', 'JGL', 49, 49, true, 100, 'STAY'),
('Leleko', 'Leonardo dos Santos', 'MID', 49, 49, true, 100, 'STAY'),
('SMILEY', 'Ludvig Granquist', 'BOT', 49, 49, true, 100, 'STAY'),
('ProDelta', 'Gabriel Rossi', 'SPT', 49, 49, true, 100, 'STAY'),

-- 50. RED Canids (id: 50)
('fNb', 'Francisco Braz', 'TOP', 50, 50, true, 100, 'STAY'),
('Aegis', 'Gabriel Lemos', 'JGL', 50, 50, true, 100, 'STAY'),
('Grevthar', 'Daniel Xavier', 'MID', 50, 50, true, 100, 'STAY'),
('Brance', 'Diego Amaral', 'BOT', 50, 50, true, 100, 'STAY'),
('Jojopyun_BR', 'Joao Vitor', 'SPT', 50, 50, true, 100, 'STAY'),

-- 51. FURIA (id: 51)
('Zzk', 'Lucas Silveira', 'TOP', 51, 51, true, 100, 'STAY'),
('Wiz', 'Lee Han-seul', 'JGL', 51, 51, true, 100, 'STAY'),
('Tutsz', 'Arthur Machado', 'MID', 51, 51, true, 100, 'STAY'),
('Ayu', 'Andrey Saraiva', 'BOT', 51, 51, true, 100, 'STAY'),
('Zay', 'Vinicius Viana', 'SPT', 51, 51, true, 100, 'STAY'),

-- 52. Fluxo (id: 52)
('Kiari', 'Thiago Luiz', 'TOP', 52, 52, true, 100, 'STAY'),
('Shini', 'Diogo Roge', 'JGL', 52, 52, true, 100, 'STAY'),
('Furada', 'Pedro Rossi', 'MID', 52, 52, true, 100, 'STAY'),
('Trigo', 'Matheus Nobrega', 'BOT', 52, 52, true, 100, 'STAY'),
('Scuro', 'Gabriel Scuro', 'SPT', 52, 52, true, 100, 'STAY'),

-- 53. INTZ (id: 53)
('Yupps', 'Danilo Petry', 'TOP', 53, 53, true, 100, 'STAY'),
('Damage', 'Yan Sales', 'JGL', 53, 53, true, 100, 'STAY'),
('Acon', 'Lucas Araujo', 'MID', 53, 53, true, 100, 'STAY'),
('NinjaKiwi', 'Kaue Janegitz', 'BOT', 53, 53, true, 100, 'STAY'),
('Woodboy', 'Guilherme Silva', 'SPT', 53, 53, true, 100, 'STAY'),

-- 54. Los Grandes (id: 54)
('Boal', 'Felipe Boal', 'TOP', 54, 54, true, 100, 'STAY'),
('Seize', 'Kim Ji-hun', 'JGL', 54, 54, true, 100, 'STAY'),
('Envy', 'Lee Dong-ju', 'MID', 54, 54, true, 100, 'STAY'),
('Netuno', 'Lucas Flores', 'BOT', 54, 54, true, 100, 'STAY'),
('Cavalo', 'Matheus Ferreira', 'SPT', 54, 54, true, 100, 'STAY');

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
