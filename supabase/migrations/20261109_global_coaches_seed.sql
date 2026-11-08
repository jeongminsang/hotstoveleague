-- ==============================================================================
-- Migration: 20261109_global_coaches_seed.sql
-- 1) Allow public insert/update on coaches table
-- 2) Insert authentic global coaches for LPL, LEC, LCS, LCP, CBLOL
-- ==========================================

DROP POLICY IF EXISTS "Allow modify coaches" ON coaches;
CREATE POLICY "Allow modify coaches"
    ON coaches FOR ALL
    USING (true)
    WITH CHECK (true);

INSERT INTO coaches (id, team_id, role, name, real_name) VALUES
  -- LPL
  (31, 11, 'HEAD_COACH', 'BigWei', 'Fu Chien-Wei'),
  (32, 11, 'COACH', 'Xiasu', 'Chen Long'),
  (33, 11, 'COACH', 'Easyhoon', 'Lee Ji-hoon'),
  (34, 12, 'HEAD_COACH', 'Despa1r', 'Zhou Jie'),
  (35, 12, 'COACH', 'River', 'Wang Dong'),
  (36, 13, 'HEAD_COACH', 'WarHorse', 'Chen Ju-Chih'),
  (37, 13, 'COACH', 'Viod', 'Lu Fan'),
  (38, 13, 'COACH', 'Lyn', 'Kim Da-bin'),
  (39, 14, 'HEAD_COACH', 'Daeny', 'Yang Dae-in'),
  (40, 14, 'COACH', 'Tabe', 'Wong Pak Kan'),
  (41, 14, 'COACH', 'Rui', 'Zhu Rui'),
  (42, 15, 'HEAD_COACH', 'U', 'Zeng Long'),
  (43, 15, 'COACH', 'Dynasty', 'Li Ting-Chun'),
  (44, 16, 'HEAD_COACH', 'Mafa', 'Won Sang-yeon'),
  (45, 16, 'COACH', 'Rashomon', 'Luo Bin'),
  (46, 17, 'HEAD_COACH', 'Clearlove', 'Ming Kai'),
  (47, 17, 'COACH', 'Poppy', 'Chang Po-Hao'),
  (48, 18, 'HEAD_COACH', 'Byun', 'Byun Young-sub'),
  (49, 18, 'COACH', 'Clare', 'Fan Xiao-Hao'),
  (50, 19, 'HEAD_COACH', 'Chubby', 'Li Chuan-Chun'),
  (51, 19, 'COACH', 'Condi', 'Xiang Ren-Jie'),
  (52, 20, 'HEAD_COACH', 'Tabe', 'Wong Pak Kan'),
  (53, 20, 'COACH', 'Qirann', 'Xiao Hong-Jun'),
  (54, 55, 'HEAD_COACH', 'noname', 'Zhou Qi-Lin'),
  (55, 55, 'COACH', 'Geitii', 'Gao Wei'),
  (56, 56, 'HEAD_COACH', 'Shine', 'Shin Dong-wook'),
  (57, 56, 'COACH', 'Deceit', 'Jiang Bo'),
  (58, 57, 'HEAD_COACH', 'Along', 'Li Yan'),
  (59, 57, 'COACH', 'Ares', 'Kim Min-kwon'),
  (60, 58, 'HEAD_COACH', 'Xiaopeng', 'Wang Peng'),
  (61, 58, 'COACH', 'Yuzhang', 'Fan Yuzhang'),

  -- LEC
  (62, 21, 'HEAD_COACH', 'Dylan Falco', 'Dylan Falco'),
  (63, 21, 'COACH', 'Rodrigo', 'Rodrigo Oliveira'),
  (64, 21, 'COACH', 'Duffman', 'Christopher Duff'),
  (65, 22, 'HEAD_COACH', 'Nightshare', 'Tomáš Kněžínek'),
  (66, 22, 'COACH', 'Gaax', 'Pablo Pérez'),
  (67, 22, 'COACH', 'Hiiva', 'Aleksi Kaikkonen'),
  (68, 23, 'HEAD_COACH', 'Melzhet', 'Tomás Campelos'),
  (69, 23, 'COACH', 'Reven', 'Sung Sung-hoon'),
  (70, 23, 'COACH', 'Zeph', 'Quentin Viguié'),
  (71, 24, 'HEAD_COACH', 'Kirei', 'Thomas Yuen'),
  (72, 24, 'COACH', 'Nahovsky', 'Bartłomiej Duda'),
  (73, 25, 'HEAD_COACH', 'Reeker', 'Steven Chen'),
  (74, 25, 'COACH', 'Shaves', 'Kevin Tolman'),
  (75, 25, 'COACH', 'Apples', 'Dan Van Vo'),
  (76, 26, 'HEAD_COACH', 'Carter', 'Alexander Cartwright'),
  (77, 26, 'COACH', 'Hidon', 'Harry Appelkvist'),
  (78, 27, 'HEAD_COACH', 'Swiffer', 'Scott Sheehan'),
  (79, 27, 'COACH', 'Own3r', 'David Rodríguez'),
  (80, 28, 'HEAD_COACH', 'Machuki', 'Víctor Machado'),
  (81, 28, 'COACH', 'Nelson', 'Nelson Sng'),
  (82, 29, 'HEAD_COACH', 'Kaas', 'Christophe van Oudheusden'),
  (83, 29, 'COACH', 'Erelyth', 'Álvaro Miguélez'),
  (84, 30, 'HEAD_COACH', 'Danusch', 'Danusch Fischer'),
  (85, 30, 'COACH', 'Inero', 'Nick Smith'),

  -- LCS
  (86, 31, 'HEAD_COACH', 'Nukeduck', 'Erlend Våtevik Holm'),
  (87, 31, 'COACH', 'Mithy', 'Alfonso Aguirre Rodríguez'),
  (88, 31, 'COACH', 'RapidStar', 'Jung Min-sung'),
  (89, 32, 'HEAD_COACH', 'Spawn', 'Jake Tiberi'),
  (90, 32, 'COACH', 'Reignover', 'Kim Yeu-jin'),
  (91, 32, 'COACH', 'Haitham', 'Haitham Algbory'),
  (92, 33, 'HEAD_COACH', 'Reapered', 'Han Gyu-sik'),
  (93, 33, 'COACH', 'Hai', 'Hai Du Lam'),
  (94, 33, 'COACH', 'Bubbadub', 'Royce Newcomb'),
  (95, 34, 'HEAD_COACH', 'Inero', 'Nick Smith'),
  (96, 34, 'COACH', 'Thinkcard', 'Thomas Slotkin'),
  (97, 35, 'HEAD_COACH', 'Reven', 'Sung Sung-hoon'),
  (98, 35, 'COACH', 'Stardust', 'Son Seok-hee'),
  (99, 36, 'HEAD_COACH', 'Rigby', 'Han Sang-yong'),
  (100, 36, 'COACH', 'Enep', 'Lee Min-ho'),
  (101, 37, 'HEAD_COACH', 'Dan Dan', 'Danny Le Comte'),
  (102, 37, 'COACH', 'Empyros', 'Konstantinos Natsis'),
  (103, 38, 'HEAD_COACH', 'Yash', 'Yash Bhavsar'),
  (104, 38, 'COACH', 'Arce', 'Diego Arce Chang'),

  -- LCP & CBLOL
  (105, 39, 'HEAD_COACH', 'Amo', 'Nguyen Van Cuong'),
  (106, 40, 'HEAD_COACH', 'Archie', 'Tran Minh Nhat'),
  (107, 41, 'HEAD_COACH', 'Vsta', 'Oh Hyo-seok'),
  (108, 42, 'HEAD_COACH', 'Chawy', 'Wong Xing Lei'),
  (109, 45, 'HEAD_COACH', 'Kazu', 'Kazuta Suzuki'),
  (110, 47, 'HEAD_COACH', 'Xis', 'Matheus Morelli'),
  (111, 48, 'HEAD_COACH', 'Stardust', 'Son Seok-hee'),
  (112, 49, 'HEAD_COACH', 'SeeEl', 'Christopher Lee'),
  (113, 51, 'HEAD_COACH', 'Maestro', 'Lucas Pierre')
ON CONFLICT (id) DO UPDATE SET
  team_id = EXCLUDED.team_id,
  role = EXCLUDED.role,
  name = EXCLUDED.name,
  real_name = EXCLUDED.real_name;
