import { Coach } from "./types";

export interface CoachOverride {
  predicted_team_id: number | null;
  role: "HEAD_COACH" | "COACH";
  name: string;
  real_name: string;
  confidence: number;
  status: "CONFIRMED" | "RUMORED" | "FA" | "STAY";
  source_url?: string;
  ex_team_short?: string;
}

// 2027 시즌 예상 감코진 오버라이드 (검증된 정식 미디어 보도 기반)
export const PREDICTED_COACH_OVERRIDES: Record<string, CoachOverride> = {
  // G2: Mithy (헤드 코치 구두 합의 95% 루머, Sheep Esports 단독 보도)
  "g2-mithy": {
    predicted_team_id: 21,
    role: "HEAD_COACH",
    name: "Mithy",
    real_name: "Alfonso Aguirre Rodríguez (알폰소 아기레)",
    confidence: 95,
    status: "RUMORED",
    source_url: "https://www.sheepesports.com/en/articles/sources-mithy-set-to-join-g2-esports-as-head-coach-for-2027/en",
    ex_team_short: "TH",
  },
};

export const GLOBAL_COACHES: Coach[] = [
  // ==========================================
  // LPL (Teams 11 ~ 20 & 55 ~ 58)
  // 나무위키 2026 시즌 기준 감코진
  // ==========================================
  // 11: BLG (Bilibili Gaming)
  { id: 31, team_id: 11, role: "HEAD_COACH", name: "Daeny", real_name: "Yang Dae-in (양대인)" },
  { id: 32, team_id: 11, role: "COACH", name: "zyb", real_name: "Zhuang Yi-Bin (좡이빈)" },
  { id: 33, team_id: 11, role: "COACH", name: "Chieh", real_name: "Li Jie (리제)" },
  { id: 34, team_id: 11, role: "COACH", name: "Ben", real_name: "Nam Dong-hyun (남동현)" },

  // 12: TES (Top Esports)
  { id: 35, team_id: 12, role: "HEAD_COACH", name: "Poppy", real_name: "Chang Po-Hao (장보하오)" },
  { id: 36, team_id: 12, role: "COACH", name: "BoBo", real_name: "He Wen-Bo (허원보)" },
  { id: 37, team_id: 12, role: "COACH", name: "Leo", real_name: "Li Yu-Ming (리위밍)" },
  { id: 38, team_id: 12, role: "COACH", name: "Xiaobai", real_name: "Yang Zhong-He (양중허)" },

  // 13: JDG (JD Gaming)
  { id: 39, team_id: 13, role: "HEAD_COACH", name: "Tabe", real_name: "Wong Pak Kan (웡박칸)" },
  { id: 40, team_id: 13, role: "COACH", name: "Xiaobai", real_name: "Yang Zhong-He (양중허)" },

  // 14: WBG (Weibo Gaming)
  { id: 41, team_id: 14, role: "HEAD_COACH", name: "Shine", real_name: "Shin Dong-wook (신동욱)" },
  { id: 42, team_id: 14, role: "COACH", name: "Tselin", real_name: "Zhao Ze-Lin (자오쩌린)" },
  { id: 43, team_id: 14, role: "COACH", name: "HuangXin", real_name: "Huang Xin (황신)" },

  // 15: LNG (LNG Esports)
  { id: 44, team_id: 15, role: "HEAD_COACH", name: "LvMao", real_name: "Zuo Ming-Hao (쭤밍하오)" },
  { id: 45, team_id: 15, role: "COACH", name: "Xiasu", real_name: "Chen Long (천룽)" },
  { id: 46, team_id: 15, role: "COACH", name: "333", real_name: "Huang Yi-Hong (황이훙)" },

  // 16: iG (Invictus Gaming)
  { id: 47, team_id: 16, role: "HEAD_COACH", name: "Helper", real_name: "Kwon Young-jae (권영재)" },
  { id: 48, team_id: 16, role: "COACH", name: "Kezman", real_name: "Son Dae-young (손대영)" },
  { id: 49, team_id: 16, role: "COACH", name: "Fury", real_name: "Lee Jin-yong (이진용)" },
  { id: 50, team_id: 16, role: "COACH", name: "chengz", real_name: "Ye Sheng-Liao (예성랴오)" },

  // 17: EDG (EDward Gaming)
  { id: 51, team_id: 17, role: "HEAD_COACH", name: "Clearlove", real_name: "Ming Kai (밍카이)" },
  { id: 52, team_id: 17, role: "COACH", name: "Maokai", real_name: "Yang Ji-Song (양지쑹)" },
  { id: 53, team_id: 17, role: "COACH", name: "Mni", real_name: "Peng Fang (펑팡)" },

  // 18: NIP (Ninjas in Pyjamas)
  { id: 54, team_id: 18, role: "HEAD_COACH", name: "Maizijian", real_name: "Zeng Xin-Yi (쩡신이)" },
  { id: 55, team_id: 18, role: "COACH", name: "Renzhe", real_name: "Li Ren-Zhe (리런저)" },

  // 19: WE (Team WE)
  { id: 56, team_id: 19, role: "HEAD_COACH", name: "JinJin", real_name: "Jin Guang-Hua (진광화)" },
  { id: 57, team_id: 19, role: "COACH", name: "694", real_name: "He Xin (허신)" },

  // 20: AL (Anyone's Legend)
  { id: 58, team_id: 20, role: "HEAD_COACH", name: "BigWei", real_name: "Fu Chien-Wei (푸첸웨이)" },
  { id: 59, team_id: 20, role: "COACH", name: "Teacherma", real_name: "Jiang Chen (장천)" },
  { id: 60, team_id: 20, role: "COACH", name: "Despa1r", real_name: "Zhou Li-Peng (저우리펑)" },

  // 55: OMG (Oh My God)
  { id: 61, team_id: 55, role: "HEAD_COACH", name: "noname", real_name: "Zhou Qi-Lin (저우치린)" },
  { id: 62, team_id: 55, role: "COACH", name: "Geitii", real_name: "Gao Wei (가오웨이)" },

  // 56: Rare Atom
  { id: 63, team_id: 56, role: "HEAD_COACH", name: "Deceit", real_name: "Jiang Bo (장보)" },

  // 57: ThunderTalk Gaming
  { id: 64, team_id: 57, role: "HEAD_COACH", name: "Along", real_name: "Li Yan (리옌)" },
  { id: 65, team_id: 57, role: "COACH", name: "Ares", real_name: "Kim Min-kwon (김민권)" },

  // 58: Ultra Prime
  { id: 66, team_id: 58, role: "HEAD_COACH", name: "Xiaopeng", real_name: "Wang Peng (왕펑)" },
  { id: 67, team_id: 58, role: "COACH", name: "Yuzhang", real_name: "Fan Yuzhang (판위장)" },

  // ==========================================
  // LEC (Teams 21 ~ 30)
  // 나무위키 2026 시즌 기준 감코진
  // ==========================================
  // 21: G2 (G2 Esports)
  { id: 68, team_id: 21, role: "HEAD_COACH", name: "Perkz", real_name: "Luka Perković (루카 페르코비치)" },
  { id: 69, team_id: 21, role: "COACH", name: "Memento", real_name: "Jonas Elmarghichi (요나스 엘마르기치)" },
  { id: 70, team_id: 21, role: "COACH", name: "Rodrigo", real_name: "Rodrigo Oliveira (호드리구 올리베이라)" },
  { id: 71, team_id: 21, role: "COACH", name: "Isma", real_name: "Ismael Pedraza (이스마엘 페드라자)" },

  // 22: FNC (Fnatic)
  { id: 72, team_id: 22, role: "HEAD_COACH", name: "GrabbZ", real_name: "Fabian Lohmann (파비안 로만)" },
  { id: 73, team_id: 22, role: "COACH", name: "Gaax", real_name: "Pablo Vegas Pérez (파블로 베가스 페레스)" },
  { id: 74, team_id: 22, role: "COACH", name: "Immanuelity", real_name: "Richard Walter (리차드 월터)" },
  { id: 75, team_id: 22, role: "COACH", name: "Odoamne", real_name: "Andrei Pascu (안드레이 파스쿠)" },

  // 23: MDK (Movistar KOI)
  { id: 76, team_id: 23, role: "HEAD_COACH", name: "Melzhet", real_name: "Tomás Campelos (토마스 캄펠로스)" },
  { id: 77, team_id: 23, role: "COACH", name: "Independent", real_name: "Eric Ruiz (에릭 루이스)" },
  { id: 78, team_id: 23, role: "COACH", name: "Alphari", real_name: "Barney Morris (바니 모리스)" },

  // 24: SHF (Shifters)
  { id: 79, team_id: 24, role: "HEAD_COACH", name: "Kirei", real_name: "Thomas Yuen (토마스 윈)" },
  { id: 80, team_id: 24, role: "COACH", name: "Nahovsky", real_name: "Bartłomiej Duda (바르트워미에이 두다)" },

  // 25: KC (Karmine Corp)
  { id: 81, team_id: 25, role: "HEAD_COACH", name: "Reapered", real_name: "Bok Han-gyu (복한규)" },
  { id: 82, team_id: 25, role: "COACH", name: "Zeph", real_name: "Quentin Viguié (퀸틴 비규)" },
  { id: 83, team_id: 25, role: "COACH", name: "Clement", real_name: "Clément Thillier (클레망 틸리에)" },

  // 26: VIT (Team Vitality)
  { id: 84, team_id: 26, role: "HEAD_COACH", name: "Pad", real_name: "Patrick Suckow-Breum (패트릭 주코브레움)" },
  { id: 85, team_id: 26, role: "COACH", name: "Khaas", real_name: "Christophe van Oudheusden" },

  // 27: SK (SK Gaming)
  { id: 86, team_id: 27, role: "HEAD_COACH", name: "OWN3R", real_name: "David Rodríguez (다비드 로드리게스)" },
  { id: 87, team_id: 27, role: "COACH", name: "Duffman", real_name: "Christopher Duff (크리스토퍼 더프)" },
  { id: 88, team_id: 27, role: "COACH", name: "Baguette", real_name: "Simon Cordonnier (시몽 코르도니에)" },

  // 28: TH (Team Heretics)
  { id: 89, team_id: 28, role: "HEAD_COACH", name: "Nukeduck", real_name: "Erlend Våtevik Holm (에흘란 홀름)" },
  { id: 90, team_id: 28, role: "COACH", name: "Mithy", real_name: "Alfonso Aguirre Rodríguez (알폰소 아기레)" },
  { id: 91, team_id: 28, role: "COACH", name: "sOAZ", real_name: "Paul Boyer (폴 부아예)" },
  { id: 92, team_id: 28, role: "COACH", name: "Hidon", real_name: "Jonas Vraa (요나스 브라)" },

  // 29: GX (GIANTX)
  { id: 93, team_id: 29, role: "HEAD_COACH", name: "Guilhoto", real_name: "André Guilhoto (안드레 길료투)" },
  { id: 94, team_id: 29, role: "COACH", name: "Rhuckz", real_name: "Rúben Barbosa (루벤 바르보사)" },
  { id: 95, team_id: 29, role: "COACH", name: "Maxlore", real_name: "Nubar Sarafian (누바 사라피안)" },

  // 30: NAVI (Natus Vincere)
  { id: 96, team_id: 30, role: "HEAD_COACH", name: "TheRock", real_name: "Vasilis Voltis (바실리스 볼티스)" },
  { id: 97, team_id: 30, role: "COACH", name: "GotoOne", real_name: "Adrien Picard (아드리앵 피카르)" },
  { id: 98, team_id: 30, role: "COACH", name: "Lopon", real_name: "Jorge López (호르헤 로페스)" },

  // ==========================================
  // LCS / LTA Americas (Teams 31 ~ 38)
  // 나무위키 2026 시즌 기준 감코진
  // ==========================================
  // 31: FLY (FlyQuest)
  { id: 99, team_id: 31, role: "HEAD_COACH", name: "Thinkcard", real_name: "Thomas Slotkin (토마스 슬로트킨)" },
  { id: 100, team_id: 31, role: "COACH", name: "Apollo", real_name: "Apollo Price (아폴로 프라이스)" },

  // 32: TL (Team Liquid)
  { id: 101, team_id: 32, role: "HEAD_COACH", name: "Spawn", real_name: "Jake Tiberi (제이크 티베리)" },
  { id: 102, team_id: 32, role: "COACH", name: "Spookz", real_name: "Samuel Broadley (새뮤얼 브로들리)" },
  { id: 103, team_id: 32, role: "COACH", name: "Haitham", real_name: "Haitham Algbory (하이삼 알그보리)" },

  // 33: C9 (Cloud9)
  { id: 104, team_id: 33, role: "HEAD_COACH", name: "IWDominate", real_name: "Christian Rivera (크리스찬 리베라)" },
  { id: 105, team_id: 33, role: "COACH", name: "Veigar v2", real_name: "Marius Aune (마리우스 오네)" },
  { id: 106, team_id: 33, role: "COACH", name: "Arrow", real_name: "Noh Dong-hyeon (노동현)" },
  { id: 107, team_id: 33, role: "COACH", name: "YamatoCannon", real_name: "Jakob Mebdi (야콥 멥디)" },

  // 34: SEN (Sentinels)
  { id: 108, team_id: 34, role: "HEAD_COACH", name: "Goldenglue", real_name: "Grayson Gilmer (그레이슨 길머)" },
  { id: 109, team_id: 34, role: "COACH", name: "Dayos", real_name: "Marthinus Angelo Lachica (머빈안젤로 라치카)" },

  // 35: SR (Shopify Rebellion)
  { id: 110, team_id: 35, role: "HEAD_COACH", name: "Reven", real_name: "Sung Sung-hoon (성상현)" },
  { id: 111, team_id: 35, role: "COACH", name: "Damonte", real_name: "Tanner Damonte (태너 다몬테)" },
  { id: 112, team_id: 35, role: "COACH", name: "Selfie", real_name: "Marcin Wolski (마르친 울스키)" },

  // 36: DIG (Dignitas)
  { id: 113, team_id: 36, role: "HEAD_COACH", name: "Swiffer", real_name: "Simon Papamarkos (사이먼 파파마르코스)" },
  { id: 114, team_id: 36, role: "COACH", name: "Emi", real_name: "Emanuel Ursacki (에마누엘 우르사키)" },

  // 37: DSG (Disguised)
  { id: 115, team_id: 37, role: "HEAD_COACH", name: "Ido", real_name: "Ian McCormick (이안 맥코믹)" },
  { id: 116, team_id: 37, role: "COACH", name: "Brandini", real_name: "Brandon Chen (브랜던 천)" },

  // 38: LYN (Lyon Gaming)
  { id: 117, team_id: 38, role: "HEAD_COACH", name: "Reignover", real_name: "Kim Yeu-jin (김의진)" },
  { id: 118, team_id: 38, role: "COACH", name: "Rigby", real_name: "Han Sang-yong (한얼)" },

  // ==========================================
  // LCP & CBLOL Notable (39 ~ 51)
  // ==========================================
  // 39: TSW (Secret Whales)
  { id: 119, team_id: 39, role: "HEAD_COACH", name: "Amo", real_name: "Nguyen Van Cuong" },
  // 40: GAM Esports
  { id: 120, team_id: 40, role: "HEAD_COACH", name: "Archie", real_name: "Tran Minh Nhat" },
  // 41: SHG (SoftBank HAWKS)
  { id: 121, team_id: 41, role: "HEAD_COACH", name: "Vsta", real_name: "Oh Hyo-seok" },
  // 42: CFO (CTBC Flying Oyster)
  { id: 122, team_id: 42, role: "HEAD_COACH", name: "Chawy", real_name: "Wong Xing Lei" },
  // 45: DFM (DetonatioN FocusMe)
  { id: 123, team_id: 45, role: "HEAD_COACH", name: "Kazu", real_name: "Kazuta Suzuki" },
  // 47: PNG (paiN Gaming)
  { id: 124, team_id: 47, role: "HEAD_COACH", name: "Xis", real_name: "Matheus Morelli" },
  // 48: LLL (LOUD)
  { id: 125, team_id: 48, role: "HEAD_COACH", name: "Stardust", real_name: "Son Seok-hee" },
  // 49: VKS (Vivo Keyd Stars)
  { id: 126, team_id: 49, role: "HEAD_COACH", name: "SeeEl", real_name: "Christopher Lee" },
  // 51: FUR (FURIA)
  { id: 127, team_id: 51, role: "HEAD_COACH", name: "Maestro", real_name: "Lucas Pierre" },
];
