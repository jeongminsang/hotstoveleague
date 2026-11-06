import { Rumor } from "./types";

export interface SeedRumor
  extends Omit<Rumor, "id" | "player_id" | "target_team_id" | "created_at"> {
  id: number;
  player_slug: string;
  player_name: string;
  current_team_short: string;
  target_team_short: string;
  target_team_id: number | null;
  league: string;
}

export const INITIAL_RUMORS: SeedRumor[] = [
  {
    id: 42,
    post_id: "rv-20261105-zicssi-sk",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Jungler Zicssi 🇫🇷 has reached a verbal agreement with SK Gaming for the 2027 #LEC season. Report by @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] SK Gaming, 2027 시즌 신임 정글러로 프랑스 유망주 직시(Zicssi)와 구두 합의… 기존 스킨즈(Skeanz) 결별 (Zicssi reaches verbal agreement with SK Gaming for 2027 LEC)",
    player_slug: "zicssi",
    player_name: "Zicssi",
    current_team_short: "FA",
    target_team_short: "SK",
    target_team_id: 27,
    league: "LEC",
    confidence: 95,
    post_url: "https://x.com/Sheep_Esports/status/2118397190921933216",
    published_at: "2026-11-05T17:30:00Z",
  },
  {
    id: 41,
    post_id: "rv-20261105-g2-staff-rebuild",
    source: "TWITTER",
    author: "G2 Esports (@G2esports)",
    raw_text:
      "Thank you @Perkz for your time as Head Coach in 2026. As we prepare for the 2027 #LEC season, we are restructuring our coaching staff and jungle position.",
    summary:
      "[오피셜] G2 Esports, 2027 시즌 대비 퍽즈(Perkz) 감독 결별 및 로스터·코칭스태프 개편 공식 발표 (G2 Esports announces 2027 coaching and roster restructuring)",
    player_slug: "caps",
    player_name: "Caps",
    current_team_short: "G2",
    target_team_short: "G2",
    target_team_id: 21,
    league: "LEC",
    confidence: 100,
    post_url: "https://x.com/G2esports/status/2118335170784985252",
    published_at: "2026-11-05T15:10:00Z",
  },
  {
    id: 40,
    post_id: "rv-20261105-ale-wbg",
    source: "WEIBO",
    author: "召唤师Park (@召唤师Park)",
    raw_text:
      "Ale经纪人挺强的，给他运作到WBG了，WBG打野想要Beichuan，但他不太想去，就临时签了H4cker，中单依旧是小虎，下路知秋意+Ke #曝Ale加入WBG#",
    summary:
      "[웨이보/소환사 Park] AL 탑라이너 아러(Ale), Weibo Gaming(WBG) 이적 유력… 미드 샤오후(Xiaohu)는 WBG 주전 잔류 (Summoner Park: Ale moving to WBG while Xiaohu stays as WBG starting mid laner)",
    player_slug: "ale",
    player_name: "Ale",
    current_team_short: "AL",
    target_team_short: "WBG",
    target_team_id: 14,
    league: "LPL",
    confidence: 88,
    post_url: "https://weibo.com/2522098777/Rq1lrwHjr",
    published_at: "2026-11-05T14:12:21Z",
  },
  {
    id: 39,
    post_id: "rv-20261105-lyncas-g2",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "With Lyncas 🇱🇹 set to join G2 Esports for the 2027 #LEC season, he becomes the sixth jungler to wear the jersey since the org entered the league in 2016.",
    summary:
      "[울루/Sheep Esports] G2 Esports, 바이탈리티 정글러 린카스(Lyncas) 2027 시즌 영입 합의 (Lyncas set to join G2 Esports for the 2027 LEC season)",
    player_slug: "lyncas",
    player_name: "Lyncas",
    current_team_short: "VIT",
    target_team_short: "G2",
    target_team_id: 21,
    league: "LEC",
    confidence: 95,
    post_url: "https://x.com/Sheep_Esports/status/2118045173036753216",
    published_at: "2026-11-05T13:20:00Z",
  },
  {
    id: 38,
    post_id: "rv-20261105-skewmond-g2",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] SkewMond 🇫🇷 will not be part of G2 Esports' starting roster for the 2027 #LEC season. Report by @anonimotum @i_Eros_ @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] 스큐몬드(SkewMond), 2027 시즌 G2 주전 로스터 제외 및 타 팀 이적 허용 (SkewMond will not be part of G2 starting roster in 2027)",
    player_slug: "skewmond",
    player_name: "SkewMond",
    current_team_short: "G2",
    target_team_short: "FA",
    target_team_id: null,
    league: "LEC",
    confidence: 95,
    post_url: "https://x.com/Sheep_Esports/status/2117983028324749541",
    published_at: "2026-11-05T11:45:00Z",
  },
  {
    id: 37,
    post_id: "rv-20261105-theshy-ig",
    source: "WEIBO",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    raw_text:
      "TheShy谈休息与比赛压力：这是我的职业，我就得打好。看看我们队的阵容，有Meiko、Rookie，还有我。我们都打了很多年，是现在赛场上的老将。",
    summary:
      "[웨이보/롄롄홍차] iG 더샤이(TheShy), 휴식기 복귀 후 '메이코·루키와 함께하는 프로 무대 계속 잘 해내고 싶다'며 2027 시즌 현역 지속 의지 피력 (Red Tea: TheShy affirms commitment alongside Rookie and Meiko at iG)",
    player_slug: "theshy",
    player_name: "TheShy",
    current_team_short: "IG",
    target_team_short: "IG",
    target_team_id: 16,
    league: "LPL",
    confidence: 90,
    post_url: "https://weibo.com/2266865584/RpWLblXCm",
    published_at: "2026-11-05T02:32:00Z",
  },
  {
    id: 36,
    post_id: "rv-20261104-meiko-ig",
    source: "WEIBO",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    raw_text:
      "Meiko：明年还来吗？ 369：看你啊田野，明年看你来不来啊。 Meiko（握住369的手）：我肯定得来的啊，一起来。 #369说最后一舞##Meiko约369明年再来#",
    summary:
      "[웨이보/롄롄홍차] iG 서포터 메이코(Meiko), 2027 시즌 현역 연장 및 잔류 의사 확인 (Red Tea: Meiko confirms he will continue competing in 2027)",
    player_slug: "meiko",
    player_name: "Meiko",
    current_team_short: "IG",
    target_team_short: "IG",
    target_team_id: 16,
    league: "LPL",
    confidence: 92,
    post_url: "https://weibo.com/2266865584/RpQgGC8RO",
    published_at: "2026-11-04T10:00:25Z",
  },
  {
    id: 35,
    post_id: "rv-20261104-369-tes",
    source: "WEIBO",
    author: "丶涵艺 (Hanyi @丶涵艺)",
    raw_text:
      "369的采访也来了，在后台说最后一舞，这次是没有任何包袱的享受比赛的快乐，也确实打得非常好，9哥没毛病，游戏天赋和职业素养都可以！！ 真心希望明年世界赛还能看到9哥啊 #369说最后一舞##Meiko约369明年再来#",
    summary:
      "[웨이보/한이(涵艺)] TES 탑라이너 369, '마지막 춤' 언급하며 11월 계약 만료 후 FA 거취 주목 (Hanyi highlights TES 369's expiring contract after 'Last Dance' interview)",
    player_slug: "369",
    player_name: "369",
    current_team_short: "TES",
    target_team_short: "FA",
    target_team_id: null,
    league: "LPL",
    confidence: 88,
    post_url: "https://weibo.com/1992350413/RpQga3JgP",
    published_at: "2026-11-04T09:59:07Z",
  },
  {
    id: 34,
    post_id: "rv-20261102-al-edg-stay",
    source: "WEIBO",
    author: "召唤师Park (@召唤师Park)",
    raw_text:
      "最近一堆人来问，是不是Monki走了，是不是Hope和Kael走了，是不是谁谁走了，其实都是假的，大部分队伍都在休假，转会还没开窗 #曝LPL队伍邀请Zeus加入#",
    summary:
      "[웨이보/소환사 Park] AL 바텀 듀오 호프(Hope)·카엘(Kael) 및 EDG 정글러 몽키(Monki) 이탈 루머 일축, 소속팀 잔류 확인 (Summoner Park refutes exit rumors for AL Hope/Kael and EDG Monki)",
    player_slug: "hope",
    player_name: "Hope",
    current_team_short: "AL",
    target_team_short: "AL",
    target_team_id: 20,
    league: "LPL",
    confidence: 92,
    post_url: "https://weibo.com/2522098777/Rpymw6nAT",
    published_at: "2026-11-02T12:25:20Z",
  },
  {
    id: 33,
    post_id: "rv-20261102-zeus-jdg-hle",
    source: "WEIBO",
    author: "王玮晨 (Titan Sports @王玮晨)",
    raw_text:
      "韩媒曝Zeus在S16前，拒绝了队伍提出的续约提议。这个属于正常操作吧，即便想续约，也肯定要试水下自由市场。有能力签他的队伍就那么几支。可能JDG帮着抬下价，最后还是留HLE。",
    summary:
      "[웨이보/체단주보 왕웨이천 기자] 제우스(Zeus), S16 직전 HLE 사전 연장 제안 거절 후 FA 시장 테스트… JDG 등 빅클럽 영입전 및 HLE 재계약 협상 병행 (Titan Sports reporter Wang Weichen on Zeus testing FA market with JDG and HLE competing)",
    player_slug: "zeus",
    player_name: "Zeus",
    current_team_short: "HLE",
    target_team_short: "FA",
    target_team_id: null,
    league: "LCK",
    confidence: 92,
    post_url: "https://weibo.com/5386924056/RpvP0ArMm",
    published_at: "2026-11-02T05:57:18Z",
  },
  {
    id: 32,
    post_id: "rv-20261102-zeus-fa",
    source: "WEIBO",
    author: "召唤师Park (@召唤师Park)",
    raw_text:
      "韩媒爆料：Zeus拒绝了世界赛前HLE提供的续约合同，选择进入自由人市场。目前已经收到了多支LPL队伍的报价，同时也还在和HLE保持沟通。 #曝Zeus拒绝HLE续约##曝LPL队伍邀请Zeus加入#",
    summary:
      "[웨이보/소환사 Park] 제우스(Zeus), 월즈 직전 한화생명(HLE)의 사전 재계약 제안 거절 후 FA 시장 진출 선택… 다수 LPL 구단 오퍼 및 HLE와도 소통 중 (Summoner Park: Zeus declined HLE's pre-Worlds extension to enter FA market)",
    player_slug: "zeus",
    player_name: "Zeus",
    current_team_short: "HLE",
    target_team_short: "FA",
    target_team_id: null,
    league: "LCK",
    confidence: 92,
    post_url: "https://weibo.com/2522098777/Rpvy79Utp",
    published_at: "2026-11-02T05:15:43Z",
  },
  {
    id: 31,
    post_id: "rv-20261102-hle-core-stay",
    source: "WEIBO",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    raw_text:
      "补充：去年HLE中下辅三人都是两年，上野一年 #曝Zeus拒绝HLE续约##曝LPL队伍邀请Zeus加入#",
    summary:
      "[웨이보/롄롄홍차] 한화생명(HLE) 미드 제카(Zeka)·원딜 구마유시(Gumayusi)·서포터 딜라이트(Delight) 3인, 2년 다년 계약으로 2027 시즌 잔류 확정 (Red Tea confirms HLE Zeka, Gumayusi, and Delight are signed on 2-year deals through 2027)",
    player_slug: "gumayusi",
    player_name: "Gumayusi",
    current_team_short: "HLE",
    target_team_short: "HLE",
    target_team_id: 3,
    league: "LCK",
    confidence: 98,
    post_url: "https://weibo.com/2266865584/Rpvgka3gG",
    published_at: "2026-11-02T04:31:50Z",
  },
  {
    id: 30,
    post_id: "rv-20261101-lospa-sk",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Fnatic support Lospa 🇰🇷 will be transferred to SK Gaming for 2027 as both teams reach an agreement.",
    summary:
      "[울루/Sheep Esports] 프나틱 서포터 로스파(Lospa), 2027 시즌 SK Gaming 이적 합의… 기존 미키엑스(Mikyx) 결별 (Fnatic support Lospa will be transferred to SK Gaming for 2027)",
    player_slug: "lospa",
    player_name: "Lospa",
    current_team_short: "FNC",
    target_team_short: "SK",
    target_team_id: 27,
    league: "LEC",
    confidence: 95,
    post_url: "https://x.com/Sheep_Esports/status/2116940157848879493",
    published_at: "2026-11-01T18:45:00Z",
  },
  {
    id: 29,
    post_id: "rv-20261101-kanavi-fa",
    source: "WEIBO",
    author: "丶涵艺 (Hanyi @丶涵艺)",
    raw_text:
      "我就一句话 hommie和kanavi明年哪里发财 恭喜BLG！",
    summary:
      "[웨이보/한이(涵艺)] 한화생명 정글러 카나비(Kanavi) 및 옴므 감독, 1년 계약 만료로 스토브리그 FA 시장 진출 및 차기 행선지 주목 (Hanyi spotlights HLE jungler Kanavi and coach Homme entering 2027 free agency)",
    player_slug: "kanavi",
    player_name: "Kanavi",
    current_team_short: "HLE",
    target_team_short: "FA",
    target_team_id: null,
    league: "LCK",
    confidence: 90,
    post_url: "https://weibo.com/1992350413/RpjVc4FJR",
    published_at: "2026-11-01T00:39:34Z",
  },
  {
    id: 28,
    post_id: "rv-20261030-tracyn-th-official",
    source: "TWITTER",
    author: "Team Heretics (@HereticsLEC)",
    raw_text:
      "HERE TO STAY. We are delighted to announce that Tracyn has extended his contract with the team until 2028 📝🔒 #VamosHeretics",
    summary:
      "[오피셜] Team Heretics, 탑라이너 트레이신(Tracyn)과 2028년까지 다년 재계약 체결 공식 발표 (Team Heretics officially extends top laner Tracyn until 2028)",
    player_slug: "tracyn",
    player_name: "Tracyn",
    current_team_short: "TH",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 100,
    post_url: "https://x.com/HereticsLEC/status/2116168297934631052",
    published_at: "2026-10-30T16:30:00Z",
  },
  {
    id: 27,
    post_id: "rv-20261030-th-5man-locked",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] THE FIRST ROSTER FOR THE #LEC 2027 IS LOCKED: Following Tracyn's 🇵🇱 contract renewal, Team Heretics' roster for the 2027 season is set (Tracyn, Razork, Jackies, Hype, Jun).",
    summary:
      "[울루/Sheep Esports] Team Heretics, 원딜 하이프(Hype) 잔류 및 트레이신·라조크·재키스·준 2027 시즌 5인 주전 라인업 전원 확정 (Team Heretics locks first full 2027 LEC roster)",
    player_slug: "hype",
    player_name: "Hype",
    current_team_short: "TH",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 98,
    post_url: "https://x.com/Sheep_Esports/status/2116175898311643603",
    published_at: "2026-10-30T17:00:00Z",
  },
  {
    id: 26,
    post_id: "rv-20261028-rhilech-navi",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] NAVI to rebuild around Rookie of the Year Rhilech 🇹🇷 for #LEC 2027 — NAVI are set to part ways with TheRock and reuse, while allowing Maynter, Poby, SamD and Parus to explore options. More details by @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] NAVI, 2027 시즌 신인왕 정글러 릴레흐(Rhilech) 중심 리빌딩 확정… 메인터·포비·한스삼디·파루스 타 팀 접촉 허용 (NAVI to rebuild around Rhilech while allowing Maynter, Poby, Hans SamD, and Parus to explore options)",
    player_slug: "rhilech",
    player_name: "Rhilech",
    current_team_short: "NAVI",
    target_team_short: "NAVI",
    target_team_id: 30,
    league: "LEC",
    confidence: 95,
    post_url: "https://x.com/Sheep_Esports/status/2115516946418397550",
    published_at: "2026-10-28T15:10:00Z",
  },
  {
    id: 25,
    post_id: "rv-20261026-fleshy-vit",
    source: "TWITTER",
    author: "Fleshy (@fleshyylol)",
    raw_text:
      "Hello everyone! I’m still under contract with Vitality but they have allowed me to explore options! After 2 years in Vitality and first year in LEC I feel more confident and ready than ever.",
    summary:
      "[오피셜] Team Vitality 서포터 플레시(Fleshy), 구단 허가 하에 2027 시즌 타 팀 접촉(LFT) 공식 발표 (Vitality support Fleshy allowed to explore options for 2027)",
    player_slug: "fleshy",
    player_name: "Fleshy",
    current_team_short: "VIT",
    target_team_short: "FA",
    target_team_id: null,
    league: "LEC",
    confidence: 100,
    post_url: "https://x.com/fleshyylol/status/2114771756988973568",
    published_at: "2026-10-26T19:15:00Z",
  },
  {
    id: 24,
    post_id: "rv-20261026-serin-th",
    source: "TWITTER",
    author: "Team Heretics (@HereticsLEC)",
    raw_text:
      "Today we part ways with Serin. Thank you for everything and best of luck in your next chapter!",
    summary:
      "[오피셜] 미드라이너 세린(Serin), Team Heretics와 계약 종료 및 결별 공식 발표 (Team Heretics officially parts ways with mid laner Serin)",
    player_slug: "serin",
    player_name: "Serin",
    current_team_short: "TH",
    target_team_short: "FA",
    target_team_id: null,
    league: "LEC",
    confidence: 100,
    post_url: "https://x.com/HereticsLEC/status/2114749355253022721",
    published_at: "2026-10-26T18:00:00Z",
  },
  {
    id: 23,
    post_id: "rv-20261024-brion-all-resigned",
    source: "TWITTER",
    author: "한진 브리온 (@Brionesports)",
    raw_text:
      "[2027 HANJIN BRION | ALL RE-SIGNED] 한진 브리온은 '캐스팅', '기드온', '로머', '테디', '남궁' 선수 전원과 재계약을 체결하며, 다 함께 2027시즌을 향한 여정을 이어갑니다.",
    summary:
      "[오피셜] 한진 브리온(BRO), 캐스팅(Casting)·기드온(GIDEON)·로머(Roamer)·테디(Teddy)·남궁(Namgung) 주전 5인 전원 2027 시즌 재계약 공식 발표 (Hanjin BRION officially re-signs all 5 starters for 2027 LCK)",
    player_slug: "teddy",
    player_name: "Teddy",
    current_team_short: "BRO",
    target_team_short: "BRO",
    target_team_id: 7,
    league: "LCK",
    confidence: 100,
    post_url: "https://x.com/Brionesports/status/2113925129373978690",
    published_at: "2026-10-24T11:30:00Z",
  },
  {
    id: 22,
    post_id: "rv-20261023-3xa-sk",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] AD Carry 3XA 🇫🇷 is set to return to the #LEC in 2027 with SK Gaming.",
    summary:
      "[울루/Sheep Esports] 원딜 3XA(구 Exakick), 2027 시즌 SK Gaming 전격 복귀 합의… 기존 조파(Jopa) 결별 (AD Carry 3XA set to return to the LEC in 2027 with SK Gaming)",
    player_slug: "3xa",
    player_name: "3XA",
    current_team_short: "FA",
    target_team_short: "SK",
    target_team_id: 27,
    league: "LEC",
    confidence: 95,
    post_url: "https://x.com/Sheep_Esports/status/2113639031003283468",
    published_at: "2026-10-23T16:40:00Z",
  },
  {
    id: 21,
    post_id: "rv-20261023-slowq-sk",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] SK Gaming plan to keep Mid Laner SlowQ 🇹🇷 for the 2027 #LEC season. Report by @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] SK Gaming, 2027 시즌 주전 미드라이너로 슬로우큐(SlowQ) 콜업·잔류 확정 (SK Gaming plan to keep mid laner SlowQ for the 2027 LEC season)",
    player_slug: "slowq",
    player_name: "SlowQ",
    current_team_short: "SK",
    target_team_short: "SK",
    target_team_id: 27,
    league: "LEC",
    confidence: 95,
    post_url: "https://x.com/Sheep_Esports/status/2113631034570854408",
    published_at: "2026-10-23T16:10:00Z",
  },
  {
    id: 20,
    post_id: "rv-20261023-bfx-statement",
    source: "TWITTER",
    author: "BNK FEARX LoL (@BNKFEARXLoL)",
    raw_text:
      "[안내] 2027 LCK 스토브리그를 앞두고 BNK FEARX 선수단 운영 및 핵심 로스터 계약 현황에 대해 팬 여러분께 안내드립니다.",
    summary:
      "[오피셜] BNK 피어엑스(BFX), 2027 시즌 스토브리그 선수단 운영 방침 및 클리어(Clear)·빅라(VicLa)·디아블(Diable) 코어 체제 공식 안내 (BNK FEARX official statement ahead of the 2027 LCK Stove League)",
    player_slug: "diable",
    player_name: "Diable",
    current_team_short: "BFX",
    target_team_short: "BFX",
    target_team_id: 6,
    league: "LCK",
    confidence: 95,
    post_url: "https://x.com/BNKFEARXLoL/status/2113580536044429595",
    published_at: "2026-10-23T12:45:00Z",
  },
  {
    id: 19,
    post_id: "rv-20261022-razork-th",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Razork 🇪🇸 is set to join Team Heretics in the #LEC for 2027 — After five years with Fnatic, the Spanish jungler is set to start a new chapter alongside Jackies and Jun.",
    summary:
      "[울루/Sheep Esports] 프나틱 간판 정글러 라조크(Razork), 2027 시즌 Team Heretics 전격 이적 합의… 다글라스(Daglas) 결별 (Razork set to join Team Heretics in the LEC for 2027)",
    player_slug: "razork",
    player_name: "Razork",
    current_team_short: "FNC",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 96,
    post_url: "https://x.com/Sheep_Esports/status/2113346571014185029",
    published_at: "2026-10-22T19:15:00Z",
  },
  {
    id: 18,
    post_id: "rv-20261020-aetinoth-gx",
    source: "TWITTER",
    author: "Aron (@AR0Nqc)",
    raw_text:
      "🚨💣 Sources: Aetinoth 🇹🇷 has received interest from multiple teams in the LEC. According to sources the player has already received 2 offers for 2027.",
    summary:
      "[LEC 썰쟁이 AR0N] 솔라리 원딜 에티노스(Aetinoth), GIANTX 등 복수의 LEC 구단으로부터 2027 시즌 주전 영입 오퍼 수령 (Aetinoth receives two LEC offers for 2027, linked with GIANTX)",
    player_slug: "aetinoth",
    player_name: "Aetinoth",
    current_team_short: "FA",
    target_team_short: "GX",
    target_team_id: 29,
    league: "LEC",
    confidence: 82,
    post_url: "https://x.com/AR0Nqc/status/2112585214568600024",
    published_at: "2026-10-20T16:15:00Z",
  },
  {
    id: 17,
    post_id: "rv-20261020-isma-gx",
    source: "TWITTER",
    author: "Aron (@AR0Nqc)",
    raw_text:
      "🚨💣 Sources: Razork will most likely join Team Heretics 🇪🇸 ahead of 2027. GIANTX also made an offer to replace ISMA for the 2027 LEC season.",
    summary:
      "[LEC 썰쟁이 AR0N] GIANTX, 2027 시즌 정글러 교체 추진에 따라 기존 주전 정글러 이즈마(ISMA)와 결별 수순 (GIANTX set to replace jungler ISMA for 2027)",
    player_slug: "isma",
    player_name: "ISMA",
    current_team_short: "GX",
    target_team_short: "FA",
    target_team_id: null,
    league: "LEC",
    confidence: 88,
    post_url: "https://x.com/AR0Nqc/status/2112548173478842584",
    published_at: "2026-10-20T14:00:00Z",
  },
  {
    id: 16,
    post_id: "rv-20261020-apa-c9",
    source: "TWITTER",
    author: "APA (@alwaysplanahea1)",
    raw_text:
      "Today, I'm announcing free agency and that I'm looking for a team for the 2027 season. I enjoyed my time at C9 and looking forward to what is next.",
    summary:
      "[오피셜] Cloud9 KIA 미드라이너 APA, C9 결별 및 2027 시즌 FA 선언 (Cloud9 mid laner APA announces free agency for 2027 season)",
    player_slug: "apa",
    player_name: "APA",
    current_team_short: "C9",
    target_team_short: "FA",
    target_team_id: null,
    league: "LCS",
    confidence: 100,
    post_url: "https://x.com/alwaysplanahea1/status/2112656559675433308",
    published_at: "2026-10-20T20:10:00Z",
  },
  {
    id: 15,
    post_id: "rv-20261020-zven-c9",
    source: "TWITTER",
    author: "Zven (@Zven)",
    raw_text:
      "Today, I'm announcing free agency and that I'm looking for a team for the 2027 season. I'm grateful to C9 for giving me a chance once again.",
    summary:
      "[오피셜] Cloud9 KIA 원딜 즈벤(Zven), 2027 시즌 FA 시장 진출 공식 선언 (Cloud9 bot laner Zven announces free agency for 2027)",
    player_slug: "zven",
    player_name: "Zven",
    current_team_short: "C9",
    target_team_short: "FA",
    target_team_id: null,
    league: "LCS",
    confidence: 100,
    post_url: "https://x.com/Zven/status/2112650165815595237",
    published_at: "2026-10-20T19:45:00Z",
  },
  {
    id: 14,
    post_id: "rv-20261019-carzzy-vit",
    source: "TWITTER",
    author: "Carzzy (@Carzzylol)",
    raw_text:
      "LFT - 2027. Able to relocate and shotcall, willing to play at least 4 games of scrim per day.",
    summary:
      "[오피셜] Team Vitality 원딜 카지(Carzzy), 2027 시즌 새로운 팀을 찾는 LFT(FA) 공식 선언 (Vitality AD Carry Carzzy officially announces LFT for 2027)",
    player_slug: "carzzy",
    player_name: "Carzzy",
    current_team_short: "VIT",
    target_team_short: "FA",
    target_team_id: null,
    league: "LEC",
    confidence: 100,
    post_url: "https://x.com/Carzzylol/status/2112180540984148243",
    published_at: "2026-10-19T15:20:00Z",
  },
  {
    id: 13,
    post_id: "rv-20261018-raptor-kellin-taeyoon-kt",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] BFX Jungler Raptor 🇰🇷, AD Carry Taeyoon 🇰🇷 and Support Kellin 🇰🇷 are expected to join KT Rolster for the 2027 LCK season. The move is expected to take place once free agency opens.",
    summary:
      "[울루/Sheep Esports] 피어엑스 정글 랩터(Raptor)·서포터 켈린(Kellin) & 농심 원딜 태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력… 기존 커즈·지우·에포트 교체 (Raptor, Kellin, and Taeyoon expected to join KT Rolster for LCK 2027)",
    player_slug: "raptor",
    player_name: "Raptor",
    current_team_short: "BFX",
    target_team_short: "KT",
    target_team_id: 5,
    league: "LCK",
    confidence: 93,
    post_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    published_at: "2026-10-18T17:00:00Z",
  },
  {
    id: 12,
    post_id: "rv-20261013-dsg-lcs-2027",
    source: "TWITTER",
    author: "LCS Official (@LCSOfficial)",
    raw_text:
      "Congratulations to Disguised on winning the 2026 LCS Promotion Tournament! 🏆 See you in 2027! 👋",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 프랜차이즈 슬롯 및 주전 5인(Castle·KryRa·Callme·sajed·Lyonz) 잔류 확정 (Disguised wins Promotion Tournament to lock 2027 LCS spot)",
    player_slug: "castle",
    player_name: "Castle",
    current_team_short: "DSG",
    target_team_short: "DSG",
    target_team_id: 37,
    league: "LCS",
    confidence: 100,
    post_url: "https://x.com/LCSOfficial/status/2109819014323273817",
    published_at: "2026-10-13T03:00:00Z",
  },
  {
    id: 11,
    post_id: "rv-20261010-deft-ns",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] AD Carry Deft 🇰🇷 is set to join Nongshim RedForce 🇰🇷 for the 2027 LCK season. The 2022 World Champion is expected to return to competitive play following his military service.",
    summary:
      "[울루/Sheep Esports] '중꺾마' 데프트(Deft), 전역 후 2027 시즌 농심 레드포스(NS) 전격 합류 유력 (Deft set to join Nongshim RedForce for LCK 2027 after military service)",
    player_slug: "deft",
    player_name: "Deft",
    current_team_short: "FA",
    target_team_short: "NS",
    target_team_id: 9,
    league: "LCK",
    confidence: 94,
    post_url: "https://x.com/Sheep_Esports/status/2108942662464356785",
    published_at: "2026-10-10T15:00:00Z",
  },
  {
    id: 10,
    post_id: "rv-20261008-bdd-perfect-kt",
    source: "TWITTER",
    author: "KT Rolster (@KTRolsterLoL)",
    raw_text:
      "[Official] Contract Extension with Bdd, PerfecT. Bdd 곽보성 선수, PerfecT 이승민 선수와 2028년까지 함께합니다. 두 선수에게 많은 관심과 사랑 부탁 드립니다.",
    summary:
      "[오피셜] kt 롤스터, 미드 비디디(Bdd) 및 탑 퍼펙트(PerfecT)와 2028년까지 2년 다년 재계약 공식 발표 (KT Rolster officially extends Bdd and PerfecT through 2028)",
    player_slug: "bdd",
    player_name: "Bdd",
    current_team_short: "KT",
    target_team_short: "KT",
    target_team_id: 5,
    league: "LCK",
    confidence: 100,
    post_url: "https://x.com/KTRolsterLoL/status/2108130819479073079",
    published_at: "2026-10-08T12:00:00Z",
  },
  {
    id: 9,
    post_id: "rv-20260929-angel-jdg",
    source: "WEIBO",
    author: "JDG京东电子竞技俱乐部 (@JDG京东电子竞技俱乐部)",
    raw_text:
      "Angel选手将以中路位置加入JDG与我们共同征战赛事。感谢Angel选手的加入，坚定你所相信，大家加油！ #JDG#",
    summary:
      "[웨이보/오피셜] JD Gaming(JDG), 베테랑 미드라이너 엔젤(Angel) 공식 영입 발표 (JD Gaming officially announces signing of mid laner Angel on Weibo)",
    player_slug: "angel",
    player_name: "Angel",
    current_team_short: "EDG",
    target_team_short: "JDG",
    target_team_id: 13,
    league: "LPL",
    confidence: 100,
    post_url: "https://weibo.com/6174976862/Rkm85oD1j",
    published_at: "2026-09-29T08:05:00Z",
  },
  {
    id: 8,
    post_id: "rv-20260924-noah-gx",
    source: "TWITTER",
    author: "Noah (@Noah_lol1004)",
    raw_text:
      "Hello everyone! GIANTX has allowed me to explore options for 2027. I'm motivated than ever and looking for a team in LEC/LCK/LCS.",
    summary:
      "[오피셜] 원딜 노아(Noah), GIANTX 허가 하에 2027 시즌 새로운 팀을 찾는 LFT 공식 발표 (Noah announces LFT for the 2027 season)",
    player_slug: "noah",
    player_name: "Noah",
    current_team_short: "GX",
    target_team_short: "FA",
    target_team_id: null,
    league: "LEC",
    confidence: 100,
    post_url: "https://x.com/Noah_lol1004/status/2102739638821523520",
    published_at: "2026-09-24T12:00:00Z",
  },
  {
    id: 7,
    post_id: "rv-20260923-jojopyun-mkoi",
    source: "TWITTER",
    author: "Movistar KOI (@MovistarKOILoL)",
    raw_text:
      "We are thrilled to announce that Jojopyun has extended his contract with Movistar KOI for the 2027 LEC season!",
    summary:
      "[오피셜] Movistar KOI, 미드라이너 조조편(Jojopyun)과 2027 시즌 연장 계약 공식 발표 (Movistar KOI officially extends Jojopyun for 2027 LEC season)",
    player_slug: "jojopyun",
    player_name: "Jojopyun",
    current_team_short: "MKOI",
    target_team_short: "MKOI",
    target_team_id: 23,
    league: "LEC",
    confidence: 100,
    post_url: "https://x.com/MovistarKOILoL/status/2102381378566279627",
    published_at: "2026-09-23T06:20:00Z",
  },
  {
    id: 6,
    post_id: "rv-20260922-jun-jackies-th",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Support Jun 🇰🇷 is set to join Team Heretics in the #LEC for 2027 alongside mid laner Jackies. Report by @LEC_Wooloo, @anonimotum & @i_Eros_",
    summary:
      "[울루/Sheep Esports] GIANTX 서포터 준(Jun) & 미드 재키스(Jackies), 2027 시즌 Team Heretics 동반 이적 합의 (Jun and Jackies set to join Team Heretics for 2027 LEC)",
    player_slug: "jun",
    player_name: "Jun",
    current_team_short: "GX",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 97,
    post_url: "https://x.com/Sheep_Esports/status/2102435339810075042",
    published_at: "2026-09-22T15:00:00Z",
  },
  {
    id: 5,
    post_id: "rv-20260913-wunder-sk",
    source: "TWITTER",
    author: "Wunder (@wunderlol)",
    raw_text:
      "Looking for opportunities in LEC/LCS next year - notable achievements this year: Won as many playoffs series as Vitality did, made playoffs and worlds as many times as Fnatic.",
    summary:
      "[오피셜] SK Gaming 탑라이너 원더(Wunder), 2027 시즌 LEC/LCS 새 팀을 찾는 FA 구직 선언 (SK Gaming top laner Wunder announces he is looking for opportunities for 2027)",
    player_slug: "wunder",
    player_name: "Wunder",
    current_team_short: "SK",
    target_team_short: "FA",
    target_team_id: null,
    league: "LEC",
    confidence: 100,
    post_url: "https://x.com/wunderlol/status/2098855349549679080",
    published_at: "2026-09-13T17:00:00Z",
  },
  {
    id: 4,
    post_id: "rv-20260811-xiaofang-jdg",
    source: "WEIBO",
    author: "管泽元 (Guan Zeyuan @管泽元)",
    raw_text:
      "赌一手不同风格的化学反应！ JDG引入新打野！xiaofang加入！ #JDG官宣xiaofang加入#",
    summary:
      "[웨이보/오피셜] JD Gaming(JDG), 정글러 샤오팡(xiaofang) 공식 영입 발표 (JD Gaming officially signs jungler xiaofang)",
    player_slug: "xiaofang",
    player_name: "xiaofang",
    current_team_short: "JDG",
    target_team_short: "JDG",
    target_team_id: 13,
    league: "LPL",
    confidence: 100,
    post_url: "https://weibo.com/2521600165/RcU4j6dFO",
    published_at: "2026-08-11T07:46:57Z",
  },
  {
    id: 3,
    post_id: "rv-20260809-flandre-blg",
    source: "WEIBO",
    author: "BLG电子竞技俱乐部 (@BLG电子竞技俱乐部)",
    raw_text:
      "【BLG电子竞技俱乐部英雄联盟分部人员变动公告】经过双方友好沟通与协商，上单选手李炫君（ID：Flandre）即日起正式加入BLG电子竞技俱乐部英雄联盟分部，将以BLG.Flandre之名征战英雄联盟职业赛场。",
    summary:
      "[웨이보/오피셜] Bilibili Gaming(BLG), 베테랑 탑라이너 플랑드레(Flandre) 공식 영입 발표 (BLG officially announces signing of top laner Flandre)",
    player_slug: "flandre",
    player_name: "Flandre",
    current_team_short: "BLG",
    target_team_short: "BLG",
    target_team_id: 11,
    league: "LPL",
    confidence: 100,
    post_url: "https://weibo.com/5926660141/RcAI5AOhx",
    published_at: "2026-08-09T06:30:02Z",
  },
  {
    id: 2,
    post_id: "rv-20260806-xiaohao-wbg",
    source: "WEIBO",
    author: "WBG英雄联盟分部 (@WBG英雄联盟分部)",
    raw_text:
      "【WBG英雄联盟分部人员变动公告】 #Xiaohao回归WBG# 我们非常高兴向大家正式宣布，经过俱乐部与选手友好沟通，打野选手彭浩（ID：Xiaohao）即日起正式回归WBG电子竞技俱乐部英雄联盟分部。",
    summary:
      "[웨이보/오피셜] Weibo Gaming(WBG), 정글러 샤오하오(Xiaohao) 공식 복귀 발표 (WBG officially announces return of jungler Xiaohao)",
    player_slug: "xiaohao",
    player_name: "Xiaohao",
    current_team_short: "WBG",
    target_team_short: "WBG",
    target_team_id: 14,
    league: "LPL",
    confidence: 100,
    post_url: "https://weibo.com/5937903233/Rcacbme3I",
    published_at: "2026-08-06T11:00:00Z",
  },
  {
    id: 1,
    post_id: "rv-20260804-jiejie-edg",
    source: "WEIBO",
    author: "EDG电子竞技俱乐部 (@EDG电子竞技俱乐部)",
    raw_text:
      "【EDG英雄联盟分部人员变动公告】#EDG官宣Jiejie回归# 经过友好沟通与协商，我们很高兴地宣布：Jiejie（赵礼杰）选手正式回归EDG英雄联盟分部，将继续以EDG.Jiejie的身份征战英雄联盟职业赛场！",
    summary:
      "[웨이보/오피셜] EDward Gaming(EDG), WBG를 떠난 챔피언 정글러 지에지에(Jiejie) 친정팀 공식 복귀 발표 (EDG officially announces return of jungler Jiejie)",
    player_slug: "jiejie",
    player_name: "Jiejie",
    current_team_short: "WBG",
    target_team_short: "EDG",
    target_team_id: 17,
    league: "LPL",
    confidence: 100,
    post_url: "https://weibo.com/5235726837/RbRlbE8w4",
    published_at: "2026-08-04T11:00:00Z",
  },
];

// 오피셜 구단/선수 계정 및 1티어 원천 소식통(@Sheep_Esports, @AR0Nqc, 웨이보 한이·롄롄홍차·소환사Park·왕웨이천)에서 본문과 100% 일치하는 로스터 변동만 반영
export const PREDICTED_PLAYER_OVERRIDES: Record<
  string,
  {
    predicted_team_id: number | null;
    confidence: number;
    status: "RUMORED" | "CONFIRMED" | "STAY" | "FA";
    source_url: string;
    author: string;
    summary: string;
  }
> = {
  ...Object.fromEntries(
    INITIAL_RUMORS.map((r) => [
      r.player_slug,
      {
        predicted_team_id: r.target_team_id,
        confidence: r.confidence,
        status:
          r.target_team_id === null
            ? ("FA" as const)
            : r.current_team_short === r.target_team_short
              ? ("CONFIRMED" as const)
              : ("RUMORED" as const),
        source_url: r.post_url || "",
        author: r.author,
        summary: r.summary || r.raw_text,
      },
    ])
  ),
  // LCK: 한진 브리온(BRO) 5인 전원 2027 시즌 재계약 오피셜 (@Brionesports)
  casting: {
    predicted_team_id: 7,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/Brionesports/status/2113925129373978690",
    author: "한진 브리온 (@Brionesports)",
    summary:
      "[오피셜] 한진 브리온, 탑 캐스팅(Casting) 포함 주전 5인 전원과 2027 시즌 재계약 공식 발표",
  },
  gideon: {
    predicted_team_id: 7,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/Brionesports/status/2113925129373978690",
    author: "한진 브리온 (@Brionesports)",
    summary:
      "[오피셜] 한진 브리온, 정글 기드온(GIDEON) 포함 주전 5인 전원과 2027 시즌 재계약 공식 발표",
  },
  roamer: {
    predicted_team_id: 7,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/Brionesports/status/2113925129373978690",
    author: "한진 브리온 (@Brionesports)",
    summary:
      "[오피셜] 한진 브리온, 미드 로머(Roamer) 포함 주전 5인 전원과 2027 시즌 재계약 공식 발표",
  },
  namgung: {
    predicted_team_id: 7,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/Brionesports/status/2113925129373978690",
    author: "한진 브리온 (@Brionesports)",
    summary:
      "[오피셜] 한진 브리온, 서포터 남궁(Namgung) 포함 주전 5인 전원과 2027 시즌 재계약 공식 발표",
  },
  // LCK: KT 롤스터 2027 로스터 개편 (@KTRolsterLoL & @Sheep_Esports)
  perfect: {
    predicted_team_id: 5,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/KTRolsterLoL/status/2108130819479073079",
    author: "KT Rolster (@KTRolsterLoL)",
    summary:
      "[오피셜] kt 롤스터, 탑 퍼펙트(PerfecT) 및 미드 비디디(Bdd)와 2028년까지 2년 다년 재계약 공식 발표",
  },
  kellin: {
    predicted_team_id: 5,
    confidence: 93,
    status: "RUMORED",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] 서포터 켈린(Kellin)·정글 랩터(Raptor)·원딜 태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력",
  },
  taeyoon: {
    predicted_team_id: 5,
    confidence: 93,
    status: "RUMORED",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] 원딜 태윤(Taeyoon)·정글 랩터(Raptor)·서포터 켈린(Kellin), 2027 시즌 KT 롤스터 동반 합류 유력",
  },
  cuzz: {
    predicted_team_id: null,
    confidence: 93,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] KT 롤스터가 2027 시즌 신임 정글러로 랩터(Raptor) 영입을 추진함에 따라 기존 정글러 커즈(Cuzz) FA 전환",
  },
  jiwoo: {
    predicted_team_id: null,
    confidence: 93,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] KT 롤스터가 2027 시즌 원딜 태윤(Taeyoon) 영입을 추진함에 따라 기존 원딜 지우(Jiwoo) FA 전환",
  },
  effort: {
    predicted_team_id: null,
    confidence: 93,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] KT 롤스터가 2027 시즌 서포터 켈린(Kellin) 영입을 추진함에 따라 기존 서포터 에포트(Effort) FA 전환",
  },
  // LCK: BNK FEARX 코어 잔류 (@BNKFEARXLoL)
  clear: {
    predicted_team_id: 6,
    confidence: 95,
    status: "CONFIRMED",
    source_url: "https://x.com/BNKFEARXLoL/status/2113580536044429595",
    author: "BNK FEARX LoL (@BNKFEARXLoL)",
    summary:
      "[오피셜] BNK 피어엑스, 2027 스토브리그 선수단 운영 안내를 통해 탑 클리어(Clear)·미드 빅라(VicLa)·원딜 디아블(Diable) 코어 체제 확인",
  },
  vicla: {
    predicted_team_id: 6,
    confidence: 95,
    status: "CONFIRMED",
    source_url: "https://x.com/BNKFEARXLoL/status/2113580536044429595",
    author: "BNK FEARX LoL (@BNKFEARXLoL)",
    summary:
      "[오피셜] BNK 피어엑스, 2027 스토브리그 선수단 운영 안내를 통해 미드 빅라(VicLa)·탑 클리어(Clear)·원딜 디아블(Diable) 코어 체제 확인",
  },
  // LCK: 한화생명(HLE) 2년 계약 잔류 코어 (@恋恋红茶_244)
  zeka: {
    predicted_team_id: 3,
    confidence: 98,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2266865584/Rpvgka3gG",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    summary:
      "[웨이보/롄롄홍차] 한화생명 제카(Zeka)·구마유시(Gumayusi)·딜라이트(Delight), 2년 다년 계약으로 2027 시즌 잔류 확정",
  },
  delight: {
    predicted_team_id: 3,
    confidence: 98,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2266865584/Rpvgka3gG",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    summary:
      "[웨이보/롄롄홍차] 한화생명 딜라이트(Delight)·제카(Zeka)·구마유시(Gumayusi), 2년 다년 계약으로 2027 시즌 잔류 확정",
  },
  // LPL: WBG, AL, EDG, iG 로스터 변동 (@召唤师Park, @恋恋红茶_244)
  xiaohu: {
    predicted_team_id: 14,
    confidence: 95,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2522098777/Rq1lrwHjr",
    author: "召唤师Park (@召唤师Park)",
    summary:
      "[웨이보/소환사 Park] Weibo Gaming(WBG), 미드라이너 샤오후(Xiaohu) 주전 잔류 및 탑 아러(Ale) 영입 추진",
  },
  breathe: {
    predicted_team_id: null,
    confidence: 88,
    status: "FA",
    source_url: "https://weibo.com/2522098777/Rq1lrwHjr",
    author: "召唤师Park (@召唤师Park)",
    summary:
      "[웨이보/소환사 Park] Weibo Gaming(WBG)이 신임 탑라이너 아러(Ale)를 영입함에 따라 기존 탑라이너 브리드(Breathe) 결별 및 FA 전환",
  },
  kael: {
    predicted_team_id: 20,
    confidence: 92,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2522098777/Rpymw6nAT",
    author: "召唤师Park (@召唤师Park)",
    summary:
      "[웨이보/소환사 Park] AL 서포터 카엘(Kael) 및 원딜 호프(Hope) 이적 루머 일축, 소속팀 잔류 확인",
  },
  monki: {
    predicted_team_id: 17,
    confidence: 92,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2522098777/Rpymw6nAT",
    author: "召唤师Park (@召唤师Park)",
    summary:
      "[웨이보/소환사 Park] EDG 정글러 몽키(Monki) 이탈설 일축, 잔류 확인",
  },
  rookie: {
    predicted_team_id: 16,
    confidence: 90,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2266865584/RpWLblXCm",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    summary:
      "[웨이보/롄롄홍차] iG 더샤이(TheShy)·루키(Rookie)·메이코(Meiko) 베테랑 코어 체제 유지 확인",
  },
  // LEC: Team Heretics, SK Gaming, NAVI, Dignitas, Disguised
  jackies: {
    predicted_team_id: 28,
    confidence: 97,
    status: "RUMORED",
    source_url: "https://x.com/Sheep_Esports/status/2102435339810075042",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] GIANTX 미드라이너 재키스(Jackies), 서포터 준(Jun)과 함께 2027 시즌 Team Heretics 동반 이적 합의",
  },
  daglas: {
    predicted_team_id: null,
    confidence: 96,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2116175898311643603",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] Team Heretics가 2027 시즌 주전 정글러로 라조크(Razork)를 영입함에 따라 기존 정글러 다글라스(Daglas) 결별",
  },
  stend: {
    predicted_team_id: null,
    confidence: 100,
    status: "FA",
    source_url: "https://x.com/Stend_lol/status/2104595334106104250",
    author: "Stend (@Stend_lol)",
    summary:
      "[오피셜] Team Heretics 서포터 스텐드(Stend), 선수 생활 은퇴 및 코칭스태프 전향 발표",
  },
  skeanz: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2118397190921933216",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] SK Gaming이 2027 시즌 신임 정글러 직시(Zicssi) 영입에 합의함에 따라 기존 정글러 스킨즈(Skeanz) 결별",
  },
  lider: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2113631034570854408",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] SK Gaming이 2027 시즌 주전 미드로 슬로우큐(SlowQ)를 확정함에 따라 기존 미드 리더(LIDER) 결별",
  },
  jopa: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2113639031003283468",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] SK Gaming이 2027 시즌 주전 원딜로 3XA를 영입함에 따라 기존 원딜 조파(Jopa) 결별",
  },
  mikyx: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2116940157848879493",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] SK Gaming이 2027 시즌 주전 서포터로 로스파(Lospa)를 영입함에 따라 기존 서포터 미키엑스(Mikyx) 결별",
  },
  maynter: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2115516946418397550",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] NAVI가 릴레흐 중심 리빌딩에 나서며 탑라이너 메인터(Maynter)에게 2027 시즌 타 팀 접촉(FA) 허용",
  },
  poby: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2115516946418397550",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] NAVI가 릴레흐 중심 리빌딩에 나서며 미드라이너 포비(Poby)에게 2027 시즌 타 팀 접촉(FA) 허용",
  },
  hans_samd: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2115516946418397550",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] NAVI가 릴레흐 중심 리빌딩에 나서며 원딜 한스삼디(Hans SamD)에게 2027 시즌 타 팀 접촉(FA) 허용",
  },
  parus: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2115516946418397550",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] NAVI가 릴레흐 중심 리빌딩에 나서며 서포터 파루스(Parus)에게 2027 시즌 타 팀 접촉(FA) 허용",
  },
  palafox: {
    predicted_team_id: null,
    confidence: 100,
    status: "FA",
    source_url: "https://x.com/dignitaslol/status/2101025966399115687",
    author: "Dignitas (@dignitaslol)",
    summary:
      "[오피셜] Dignitas, 미드라이너 팔라폭스(Palafox)와 계약 종료 및 FA 발표",
  },
  ignar: {
    predicted_team_id: null,
    confidence: 100,
    status: "FA",
    source_url: "https://x.com/dignitaslol/status/2101023454673952905",
    author: "Dignitas (@dignitaslol)",
    summary:
      "[오피셜] Dignitas, 베테랑 서포터 이그나(IgNar)와 계약 종료 및 FA 발표",
  },
  kryra: {
    predicted_team_id: 37,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/LCSOfficial/status/2109819014323273817",
    author: "LCS Official (@LCSOfficial)",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 잔류 확정 (Castle·KryRa·Callme·sajed·Lyonz)",
  },
  callme: {
    predicted_team_id: 37,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/LCSOfficial/status/2109819014323273817",
    author: "LCS Official (@LCSOfficial)",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 잔류 확정 (Castle·KryRa·Callme·sajed·Lyonz)",
  },
  sajed: {
    predicted_team_id: 37,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/LCSOfficial/status/2109819014323273817",
    author: "LCS Official (@LCSOfficial)",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 잔류 확정 (Castle·KryRa·Callme·sajed·Lyonz)",
  },
  lyonz: {
    predicted_team_id: 37,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/LCSOfficial/status/2109819014323273817",
    author: "LCS Official (@LCSOfficial)",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 잔류 확정 (Castle·KryRa·Callme·sajed·Lyonz)",
  },
};
