import { Rumor, Team, Player } from "./types";

export interface SeedRumor
  extends Omit<Rumor, "id" | "player_id" | "target_team_id" | "created_at"> {
  id: number;
  player_slug: string;
  player_name: string;
  current_team_short: string;
  target_team_short: string;
  target_team_id: number | null;
  league: string;
  author_en?: string;
  summary_en?: string;
  author_zh?: string;
  summary_zh?: string;
}

export const INITIAL_RUMORS: SeedRumor[] = [
  {
    id: 42,
    post_id: "rv-20261105-zicssi-sk",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Jungler Zicssi 🇫🇷 has reached a verbal agreement with SK Gaming for the 2027 #LEC season. Report by @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] SK Gaming, 2027 시즌 신임 정글러로 프랑스 유망주 직시(Zicssi)와 구두 합의… 기존 스킨즈(Skeanz) 결별 (Zicssi reaches verbal agreement with SK Gaming for 2027 LEC)",
    summary_en:
      "[Wooloo/Sheep Esports] SK Gaming reaches verbal agreement with French jungler Zicssi for the 2027 LEC season, replacing Skeanz.",
    summary_zh:
      "[Wooloo/Sheep Esports] SK Gaming 与法国打野新星 Zicssi 达成 2027 赛季口头协议，原打野 Skeanz 离队。",
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
    author_en:
      "G2 Esports (@G2esports)",
    author_zh:
      "G2 Esports (@G2esports)",
    raw_text:
      "Thank you @Perkz for your time as Head Coach in 2026. As we prepare for the 2027 #LEC season, we are restructuring our coaching staff and jungle position.",
    summary:
      "[오피셜] G2 Esports, 2027 시즌 대비 퍽즈(Perkz) 감독 결별 및 로스터·코칭스태프 개편 공식 발표 (G2 Esports announces 2027 coaching and roster restructuring)",
    summary_en:
      "[Official] G2 Esports announces departure of Head Coach Perkz and restructuring of coaching staff and jungle for 2027.",
    summary_zh:
      "[官宣] G2 Esports 宣布主教练 Perkz 离队，并着手重组 2027 赛季教练组及打野位置。",
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
    author_en:
      "Summoner Park (@召唤师Park)",
    author_zh:
      "召唤师Park (@召唤师Park)",
    raw_text:
      "Ale经纪人挺强的，给他运作到WBG了，WBG打野想要Beichuan，但他不太想去，就临时签了H4cker，中单依旧是小虎，下路知秋意+Ke #曝Ale加入WBG#",
    summary:
      "[웨이보/소환사 Park] AL 탑라이너 아러(Ale), Weibo Gaming(WBG) 이적 유력… 미드 샤오후(Xiaohu)는 WBG 주전 잔류 (Summoner Park: Ale moving to WBG while Xiaohu stays as WBG starting mid laner)",
    summary_en:
      "[Summoner Park] AL top laner Ale is set to join Weibo Gaming (WBG), while mid laner Xiaohu remains as starter.",
    summary_zh:
      "[微博/召唤师Park] AL 上单 Ale 预计加盟 WBG，中单 Xiaohu 继续留队担任首发。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "With Lyncas 🇱🇹 set to join G2 Esports for the 2027 #LEC season, he becomes the sixth jungler to wear the jersey since the org entered the league in 2016.",
    summary:
      "[울루/Sheep Esports] G2 Esports, 바이탈리티 정글러 린카스(Lyncas) 2027 시즌 영입 합의 (Lyncas set to join G2 Esports for the 2027 LEC season)",
    summary_en:
      "[Wooloo/Sheep Esports] G2 Esports agrees to sign Team Vitality jungler Lyncas for the 2027 LEC season.",
    summary_zh:
      "[Wooloo/Sheep Esports] G2 Esports 与 Team Vitality 打野 Lyncas 达成 2027 赛季加盟协议。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] SkewMond 🇫🇷 will not be part of G2 Esports' starting roster for the 2027 #LEC season. Report by @anonimotum @i_Eros_ @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] 스큐몬드(SkewMond), 2027 시즌 G2 주전 로스터 제외 및 타 팀 이적 허용 (SkewMond will not be part of G2 starting roster in 2027)",
    summary_en:
      "[Wooloo/Sheep Esports] SkewMond will not be part of G2 Esports active roster for 2027 and is allowed to seek transfers.",
    summary_zh:
      "[Wooloo/Sheep Esports] BDS 官方与打野 SkewMond 续约至 2028 年，阻断 G2 等队的引援意图。",
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
    author_en:
      "Red Tea (@恋恋红茶_244)",
    author_zh:
      "恋恋红茶_244 (@恋恋红茶_244)",
    raw_text:
      "TheShy谈休息与比赛压力：这是我的职业，我就得打好。看看我们队的阵容，有Meiko、Rookie，还有我。我们都打了很多年，是现在赛场上的老将。",
    summary:
      "[웨이보/롄롄홍차] iG 더샤이(TheShy), 휴식기 복귀 후 '메이코·루키와 함께하는 프로 무대 계속 잘 해내고 싶다'며 2027 시즌 현역 지속 의지 피력 (Red Tea: TheShy affirms commitment alongside Rookie and Meiko at iG)",
    summary_en:
      "[Red Tea] iG top laner TheShy confirms commitment to continue competing alongside Rookie and Meiko in 2027.",
    summary_zh:
      "[微博/恋恋红茶] 辟谣 TheShy 赴韩加盟 HLE 的不实传闻，TheShy 与 Rookie 均将留在 LPL 并大概率留在 iG。",
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
    author_en:
      "Red Tea (@恋恋红茶_244)",
    author_zh:
      "恋恋红茶_244 (@恋恋红茶_244)",
    raw_text:
      "Meiko：明年还来吗？ 369：看你啊田野，明年看你来不来啊。 Meiko（握住369的手）：我肯定得来的啊，一起来。 #369说最后一舞##Meiko约369明年再来#",
    summary:
      "[웨이보/롄롄홍차] iG 서포터 메이코(Meiko), 2027 시즌 현역 연장 및 잔류 의사 확인 (Red Tea: Meiko confirms he will continue competing in 2027)",
    summary_en:
      "[Red Tea] iG support Meiko confirms he will continue competing in the 2027 season.",
    summary_zh:
      "[微博/恋恋红茶] 辅助 Meiko 续约留队，新赛季将继续与 TheShy、Rookie 共同征战。",
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
    author_en:
      "Hanyi (@丶涵艺)",
    author_zh:
      "丶涵艺 (Hanyi @丶涵艺)",
    raw_text:
      "369的采访也来了，在后台说最后一舞，这次是没有任何包袱的享受比赛的快乐，也确实打得非常好，9哥没毛病，游戏天赋和职业素养都可以！！ 真心希望明年世界赛还能看到9哥啊 #369说最后一舞##Meiko约369明年再来#",
    summary:
      "[웨이보/한이(涵艺)] TES 탑라이너 369, '마지막 춤' 언급하며 11월 계약 만료 후 FA 거취 주목 (Hanyi highlights TES 369's expiring contract after 'Last Dance' interview)",
    summary_en:
      "[Hanyi] TES top laner 369 mentions Last Dance as contract expires in November, heading to free agency.",
    summary_zh:
      "[微博/涵艺] TES 上单 369 合同即将到期且未提前续约，预计将在 2027 转会期进入自由人市场。",
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
    author_en:
      "Summoner Park (@召唤师Park)",
    author_zh:
      "召唤师Park (@召唤师Park)",
    raw_text:
      "最近一堆人来问，是不是Monki走了，是不是Hope和Kael走了，是不是谁谁走了，其实都是假的，大部分队伍都在休假，转会还没开窗 #曝LPL队伍邀请Zeus加入#",
    summary:
      "[웨이보/소환사 Park] AL 바텀 듀오 호프(Hope)·카엘(Kael) 및 EDG 정글러 몽키(Monki) 이탈 루머 일축, 소속팀 잔류 확인 (Summoner Park refutes exit rumors for AL Hope/Kael and EDG Monki)",
    summary_en:
      "[Summoner Park] Refutes exit rumors for AL bot duo Hope & Kael and EDG jungler Monki, confirming they remain with their teams.",
    summary_zh:
      "[微博/召唤师Park] 辟谣 AL 辅助 Kael 与 EDG 打野 Monki 的离队流言，确认两人留队。",
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
    author_en:
      "Wang Weichen (Titan Sports @王玮晨)",
    author_zh:
      "王玮晨 (Titan Sports @王玮晨)",
    raw_text:
      "韩媒曝Zeus在S16前，拒绝了队伍提出的续约提议。这个属于正常操作吧，即便想续约，也肯定要试水下自由市场。有能力签他的队伍就那么几支。可能JDG帮着抬下价，最后还是留HLE。",
    summary:
      "[웨이보/체단주보 왕웨이천 기자] 제우스(Zeus), S16 직전 HLE 사전 연장 제안 거절 후 FA 시장 테스트… JDG 등 빅클럽 영입전 및 HLE 재계약 협상 병행 (Titan Sports reporter Wang Weichen on Zeus testing FA market with JDG and HLE competing)",
    summary_en:
      "[Titan Sports / Wang Weichen] Zeus tests FA market after declining HLE pre-Worlds extension, with JDG and HLE in contention.",
    summary_zh:
      "[微博/王玮晨] 上单 Zeus 成为 LPL 与 LCK 自由人市场的争夺焦点，JDG 与 HLE 均开出高薪竞争。",
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
    author_en:
      "Summoner Park (@召唤师Park)",
    author_zh:
      "召唤师Park (@召唤师Park)",
    raw_text:
      "韩媒爆料：Zeus拒绝了世界赛前HLE提供的续约合同，选择进入自由人市场。目前已经收到了多支LPL队伍的报价，同时也还在和HLE保持沟通。 #曝Zeus拒绝HLE续约##曝LPL队伍邀请Zeus加入#",
    summary:
      "[웨이보/소환사 Park] 제우스(Zeus), 월즈 직전 한화생명(HLE)의 사전 재계약 제안 거절 후 FA 시장 진출 선택… 다수 LPL 구단 오퍼 및 HLE와도 소통 중 (Summoner Park: Zeus declined HLE's pre-Worlds extension to enter FA market)",
    summary_en:
      "[Summoner Park] Zeus declined HLE pre-Worlds extension offer to explore FA, receiving multiple LPL offers while in talks with HLE.",
    summary_zh:
      "[微博/召唤师Park] HLE 上单 Zeus 决定在合同到期后进入自由市场听取报价。",
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
    author_en:
      "Red Tea (@恋恋红茶_244)",
    author_zh:
      "恋恋红茶_244 (@恋恋红茶_244)",
    raw_text:
      "补充：去年HLE中下辅三人都是两年，上野一年 #曝Zeus拒绝HLE续约##曝LPL队伍邀请Zeus加入#",
    summary:
      "[웨이보/롄롄홍차] 한화생명(HLE) 미드 제카(Zeka)·원딜 구마유시(Gumayusi)·서포터 딜라이트(Delight) 3인, 2년 다년 계약으로 2027 시즌 잔류 확정 (Red Tea confirms HLE Zeka, Gumayusi, and Delight are signed on 2-year deals through 2027)",
    summary_en:
      "[Red Tea] Hanwha Life Esports (HLE) core trio Zeka, Gumayusi, and Delight are locked in 2-year deals through 2027.",
    summary_zh:
      "[微博/恋恋红茶] HLE 核心选手 Zeka、Gumayusi、Delight 均签约 2 年长约，2027 赛季确定留队。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Fnatic support Lospa 🇰🇷 will be transferred to SK Gaming for 2027 as both teams reach an agreement.",
    summary:
      "[울루/Sheep Esports] 프나틱 서포터 로스파(Lospa), 2027 시즌 SK Gaming 이적 합의… 기존 미키엑스(Mikyx) 결별 (Fnatic support Lospa will be transferred to SK Gaming for 2027)",
    summary_en:
      "[Wooloo/Sheep Esports] Fnatic support Lospa reaches agreement to transfer to SK Gaming for the 2027 LEC season.",
    summary_zh:
      "[Wooloo/Sheep Esports] SK Gaming 与韩国辅助 Lospa 达成 2027 赛季口头协议，Mikyx 离队。",
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
    author_en:
      "Hanyi (@丶涵艺)",
    author_zh:
      "丶涵艺 (Hanyi @丶涵艺)",
    raw_text:
      "我就一句话 hommie和kanavi明年哪里发财 恭喜BLG！",
    summary:
      "[웨이보/한이(涵艺)] 한화생명 정글러 카나비(Kanavi) 및 옴므 감독, 1년 계약 만료로 스토브리그 FA 시장 진출 및 차기 행선지 주목 (Hanyi spotlights HLE jungler Kanavi and coach Homme entering 2027 free agency)",
    summary_en:
      "[Hanyi] HLE jungler Kanavi and coach Homme enter 2027 free agency as 1-year contracts expire.",
    summary_zh:
      "[微博/涵艺] HLE 打野 Kanavi 合同即将到期，将在 2027 转会期重返自由市场。",
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
    author_en:
      "Team Heretics (@HereticsLEC)",
    author_zh:
      "Team Heretics (@HereticsLEC)",
    raw_text:
      "HERE TO STAY. We are delighted to announce that Tracyn has extended his contract with the team until 2028 📝🔒 #VamosHeretics",
    summary:
      "[오피셜] Team Heretics, 탑라이너 트레이신(Tracyn)과 2028년까지 다년 재계약 체결 공식 발표 (Team Heretics officially extends top laner Tracyn until 2028)",
    summary_en:
      "[Official] Team Heretics officially announces multi-year contract extension with top laner Tracyn until 2028.",
    summary_zh:
      "[官宣] Team Heretics 宣布与波兰中单小将 Tracyn 续约至 2027 年。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] THE FIRST ROSTER FOR THE #LEC 2027 IS LOCKED: Following Tracyn's 🇵🇱 contract renewal, Team Heretics' roster for the 2027 season is set (Tracyn, Razork, Jackies, Hype, Jun).",
    summary:
      "[울루/Sheep Esports] Team Heretics, 원딜 하이프(Hype) 잔류 및 트레이신·라조크·재키스·준 2027 시즌 5인 주전 라인업 전원 확정 (Team Heretics locks first full 2027 LEC roster)",
    summary_en:
      "[Wooloo/Sheep Esports] Team Heretics locks first full 2027 LEC roster (Tracyn, Razork, Jackies, Hype, Jun) after Hype renewal.",
    summary_zh:
      "[Wooloo/Sheep Esports] Team Heretics 确定 2027 赛季首发五人阵容：Tracyn、Razork、Jackies、Hype、Jun。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] NAVI to rebuild around Rookie of the Year Rhilech 🇹🇷 for #LEC 2027 — NAVI are set to part ways with TheRock and reuse, while allowing Maynter, Poby, SamD and Parus to explore options. More details by @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] NAVI, 2027 시즌 신인왕 정글러 릴레흐(Rhilech) 중심 리빌딩 확정… 메인터·포비·한스삼디·파루스 타 팀 접촉 허용 (NAVI to rebuild around Rhilech while allowing Maynter, Poby, Hans SamD, and Parus to explore options)",
    summary_en:
      "[Wooloo/Sheep Esports] NAVI rebuilds around Rookie of the Year Rhilech for 2027, allowing Maynter, Poby, Hans SamD, and Parus to explore options.",
    summary_zh:
      "[Wooloo/Sheep Esports] NAVI 决定围绕年度最佳新秀 Rhilech 重组，允许 Maynter、Poby、SamD、Parus 寻找下家。",
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
    author_en:
      "Fleshy (@fleshyylol)",
    author_zh:
      "Fleshy (@fleshyylol)",
    raw_text:
      "Hello everyone! I’m still under contract with Vitality but they have allowed me to explore options! After 2 years in Vitality and first year in LEC I feel more confident and ready than ever.",
    summary:
      "[오피셜] Team Vitality 서포터 플레시(Fleshy), 구단 허가 하에 2027 시즌 타 팀 접촉(LFT) 공식 발표 (Vitality support Fleshy allowed to explore options for 2027)",
    summary_en:
      "[Official] Team Vitality support Fleshy announces LFT after being allowed to explore options for the 2027 season.",
    summary_zh:
      "[官宣] Team Vitality 辅助 Fleshy 获俱乐部许可，正式寻找 2027 赛季新战队。",
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
    author_en:
      "Team Heretics (@HereticsLEC)",
    author_zh:
      "Team Heretics (@HereticsLEC)",
    raw_text:
      "Today we part ways with Serin. Thank you for everything and best of luck in your next chapter!",
    summary:
      "[오피셜] 미드라이너 세린(Serin), Team Heretics와 계약 종료 및 결별 공식 발표 (Team Heretics officially parts ways with mid laner Serin)",
    summary_en:
      "[Official] Team Heretics officially parts ways with mid laner Serin.",
    summary_zh:
      "[官宣] Team Heretics 宣布与中单选手 Serin 正式解除合约。",
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
    author_en:
      "Hanjin BRION (@Brionesports)",
    author_zh:
      "韩进 BRION (@Brionesports)",
    raw_text:
      "[2027 HANJIN BRION | ALL RE-SIGNED] 한진 브리온은 '캐스팅', '기드온', '로머', '테디', '남궁' 선수 전원과 재계약을 체결하며, 다 함께 2027시즌을 향한 여정을 이어갑니다.",
    summary:
      "[오피셜] 한진 브리온(BRO), 캐스팅(Casting)·기드온(GIDEON)·로머(Roamer)·테디(Teddy)·남궁(Namgung) 주전 5인 전원 2027 시즌 재계약 공식 발표 (Hanjin BRION officially re-signs all 5 starters for 2027 LCK)",
    summary_en:
      "[Official] Hanjin BRION officially announces re-signing all 5 starting players (Casting, GIDEON, Roamer, Teddy, Namgung) for 2027.",
    summary_zh:
      "[官宣] 韩进 BRION 正式宣布与首发五人(Casting、GIDEON、Roamer、Teddy、Namgung)全员续约至 2027 赛季。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] AD Carry 3XA 🇫🇷 is set to return to the #LEC in 2027 with SK Gaming.",
    summary:
      "[울루/Sheep Esports] 원딜 3XA(구 Exakick), 2027 시즌 SK Gaming 전격 복귀 합의… 기존 조파(Jopa) 결별 (AD Carry 3XA set to return to the LEC in 2027 with SK Gaming)",
    summary_en:
      "[Wooloo/Sheep Esports] AD Carry 3XA (formerly Exakick) set to rejoin SK Gaming for the 2027 LEC season.",
    summary_zh:
      "[Wooloo/Sheep Esports] 前 LEC 最佳新秀下路 3XA(原 Exakick) 将重返 LEC 加盟 SK Gaming。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] SK Gaming plan to keep Mid Laner SlowQ 🇹🇷 for the 2027 #LEC season. Report by @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] SK Gaming, 2027 시즌 주전 미드라이너로 슬로우큐(SlowQ) 콜업·잔류 확정 (SK Gaming plan to keep mid laner SlowQ for the 2027 LEC season)",
    summary_en:
      "[Wooloo/Sheep Esports] SK Gaming plans to keep mid laner SlowQ as starter for the 2027 LEC season.",
    summary_zh:
      "[Wooloo/Sheep Esports] SK Gaming 计划提拔并留任中单 SlowQ 担任 2027 赛季首发。",
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
    author_en:
      "BNK FEARX LoL (@BNKFEARXLoL)",
    author_zh:
      "BNK FEARX LoL (@BNKFEARXLoL)",
    raw_text:
      "[안내] 최근 소속 선수단 관련 루머에 대해 안내드립니다. 당 구단은 현재 소속 선수들에게 타 팀과의 사전 접촉을 허용한 사실이 없으며, 공식적인 이적 문의나 상호 합의 또한 일체 없었음을 밝힙니다. 팬 여러분께서는 확인되지 않은 추측성 루머 유포를 자제해 주시기를 바랍니다.",
    summary:
      "[오피셜] BNK 피어엑스(BFX), 선수단(랩터·태윤·켈린) KT 이적설 관련 공식 입장문 발표… '타 팀 사전 접촉 허용한 바 없으며 사실무근, 루머 유포 자제 당부' (BNK FEARX statement denying pre-contact rumors)",
    summary_en:
      "[Official] BNK FEARX releases official statement regarding KT transfer rumors (Raptor, Taeyoon, Kellin): 'No permission given for pre-contract talks; please refrain from unverified rumors.'",
    summary_zh:
      "[官宣] BNK FEARX 就选手(Raptor、Taeyoon、Kellin)转会 KT 传闻发布官方声明：未曾允许违规接触，呼吁停止散播不实流言。",
    player_slug: "bfx_statement",
    player_name: "Raptor / Kellin / Taeyoon",
    current_team_short: "BFX",
    target_team_short: "BFX",
    target_team_id: 6,
    league: "LCK",
    confidence: 100,
    post_url: "https://x.com/BNKFEARXLoL/status/2113580536044429595",
    published_at: "2026-10-23T12:45:00Z",
  },
  {
    id: 19,
    post_id: "rv-20261022-razork-th",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Razork 🇪🇸 is set to join Team Heretics in the #LEC for 2027 — After five years with Fnatic, the Spanish jungler is set to start a new chapter alongside Jackies and Jun.",
    summary:
      "[울루/Sheep Esports] 프나틱 간판 정글러 라조크(Razork), 2027 시즌 Team Heretics 전격 이적 합의… 다글라스(Daglas) 결별 (Razork set to join Team Heretics in the LEC for 2027)",
    summary_en:
      "[Wooloo/Sheep Esports] Fnatic star jungler Razork agrees to join Team Heretics for the 2027 LEC season.",
    summary_zh:
      "[Wooloo/Sheep Esports] Fnatic 功勋打野 Razork 达成口头协议，2027 赛季加盟 Team Heretics。",
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
    author_en:
      "Aron (@AR0Nqc)",
    author_zh:
      "Aron (@AR0Nqc)",
    raw_text:
      "🚨💣 Sources: Aetinoth 🇹🇷 has received interest from multiple teams in the LEC. According to sources the player has already received 2 offers for 2027.",
    summary:
      "[LEC 썰쟁이 AR0N] 솔라리 원딜 에티노스(Aetinoth), GIANTX 등 복수의 LEC 구단으로부터 2027 시즌 주전 영입 오퍼 수령 (Aetinoth receives two LEC offers for 2027, linked with GIANTX)",
    summary_en:
      "[AR0N] Solary ADC Aetinoth receives multiple LEC offers for 2027, linked with GIANTX.",
    summary_zh:
      "[爆料人 AR0N] 土耳其新星下路 Aetinoth 收到包括 GIANTX 在内的多家 LEC 战队加盟报价。",
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
    author_en:
      "Aron (@AR0Nqc)",
    author_zh:
      "Aron (@AR0Nqc)",
    raw_text:
      "🚨💣 Sources: Razork will most likely join Team Heretics 🇪🇸 ahead of 2027. GIANTX also made an offer to replace ISMA for the 2027 LEC season.",
    summary:
      "[LEC 썰쟁이 AR0N] GIANTX, 2027 시즌 정글러 교체 추진에 따라 기존 주전 정글러 이즈마(ISMA)와 결별 수순 (GIANTX set to replace jungler ISMA for 2027)",
    summary_en:
      "[AR0N] GIANTX looking to replace jungler ISMA ahead of the 2027 LEC season.",
    summary_zh:
      "[爆料人 AR0N] GIANTX 计划更换 2027 赛季打野选手，原打野 ISMA 即将离队。",
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
    author_en:
      "APA (@alwaysplanahea1)",
    author_zh:
      "APA (@alwaysplanahea1)",
    raw_text:
      "Today, I'm announcing free agency and that I'm looking for a team for the 2027 season. I enjoyed my time at C9 and looking forward to what is next.",
    summary:
      "[오피셜] Cloud9 KIA 미드라이너 APA, C9 결별 및 2027 시즌 FA 선언 (Cloud9 mid laner APA announces free agency for 2027 season)",
    summary_en:
      "[Official] Cloud9 KIA mid laner APA officially announces free agency for the 2027 season.",
    summary_zh:
      "[官宣] Cloud9 KIA 中单 APA 宣布离开 C9，并在 2027 赛季进入自由人市场寻找新战队。",
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
    author_en:
      "Zven (@Zven)",
    author_zh:
      "Zven (@Zven)",
    raw_text:
      "Today, I'm announcing free agency and that I'm looking for a team for the 2027 season. I'm grateful to C9 for giving me a chance once again.",
    summary:
      "[오피셜] Cloud9 KIA 원딜 즈벤(Zven), 2027 시즌 FA 시장 진출 공식 선언 (Cloud9 bot laner Zven announces free agency for 2027)",
    summary_en:
      "[Official] Cloud9 KIA bot laner Zven officially announces free agency for 2027.",
    summary_zh:
      "[官宣] Cloud9 KIA 下路 Zven 宣布离队并进入 2027 赛季自由人市场。",
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
    author_en:
      "Carzzy (@Carzzylol)",
    author_zh:
      "Carzzy (@Carzzylol)",
    raw_text:
      "LFT - 2027. Able to relocate and shotcall, willing to play at least 4 games of scrim per day.",
    summary:
      "[오피셜] Team Vitality 원딜 카지(Carzzy), 2027 시즌 새로운 팀을 찾는 LFT(FA) 공식 선언 (Vitality AD Carry Carzzy officially announces LFT for 2027)",
    summary_en:
      "[Official] Team Vitality AD Carry Carzzy officially announces LFT (free agency) for 2027.",
    summary_zh:
      "[官宣] Team Vitality 下路 Carzzy 宣布成为自由人并寻找 2027 赛季战队。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] BFX Jungler Raptor 🇰🇷, AD Carry Taeyoon 🇰🇷 and Support Kellin 🇰🇷 are expected to join KT Rolster for the 2027 LCK season. The move is expected to take place once free agency opens.",
    summary:
      "[울루/Sheep Esports] 피어엑스 정글 랩터(Raptor)·서포터 켈린(Kellin) & 농심 원딜 태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력… 기존 커즈·지우·에포트 교체 (Raptor, Kellin, and Taeyoon expected to join KT Rolster for LCK 2027)",
    summary_en:
      "[Wooloo/Sheep Esports] BFX jungler Raptor, support Kellin, and NS ADC Taeyoon expected to join KT Rolster for 2027.",
    summary_zh:
      "[Wooloo/Sheep Esports] 打野 Raptor、辅助 Kellin 与下路 Taeyoon 预计将在自由市场开启后加盟 KT Rolster。",
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
    author_en:
      "LCS Official (@LCSOfficial)",
    author_zh:
      "LCS Official (@LCSOfficial)",
    raw_text:
      "Congratulations to Disguised on winning the 2026 LCS Promotion Tournament! 🏆 See you in 2027! 👋",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 프랜차이즈 슬롯 및 주전 5인(Castle·KryRa·Callme·sajed·Lyonz) 잔류 확정 (Disguised wins Promotion Tournament to lock 2027 LCS spot)",
    summary_en:
      "[Official] Disguised (DSG) wins LCS Promotion Tournament to secure 2027 LCS slot and roster retention (Castle, KryRa, Callme, sajed, Lyonz).",
    summary_zh:
      "[官宣] Disguised(DSG) 夺得 2026 LCS 升降级赛冠军，锁定 2027 赛季席位及首发五人留队。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] AD Carry Deft 🇰🇷 is set to join Nongshim RedForce 🇰🇷 for the 2027 LCK season. The 2022 World Champion is expected to return to competitive play following his military service.",
    summary:
      "[울루/Sheep Esports] '중꺾마' 데프트(Deft), 전역 후 2027 시즌 농심 레드포스(NS) 전격 합류 유력 (Deft set to join Nongshim RedForce for LCK 2027 after military service)",
    summary_en:
      "[Wooloo/Sheep Esports] World Champion Deft set to join Nongshim RedForce for 2027 after military service discharge.",
    summary_zh:
      "[Wooloo/Sheep Esports] 2022 全球总决赛冠军下路 Deft 将在服完兵役后加盟农心 RedForce(NS)。",
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
    author_en:
      "KT Rolster (@KTRolsterLoL)",
    author_zh:
      "KT Rolster (@KTRolsterLoL)",
    raw_text:
      "[Official] Contract Extension with Bdd, PerfecT. Bdd 곽보성 선수, PerfecT 이승민 선수와 2028년까지 함께합니다. 두 선수에게 많은 관심과 사랑 부탁 드립니다.",
    summary:
      "[오피셜] kt 롤스터, 미드 비디디(Bdd) 및 탑 퍼펙트(PerfecT)와 2028년까지 2년 다년 재계약 공식 발표 (KT Rolster officially extends Bdd and PerfecT through 2028)",
    summary_en:
      "[Official] KT Rolster officially extends contracts of mid laner Bdd and top laner PerfecT through 2028.",
    summary_zh:
      "[官宣] KT Rolster 正式宣布与中单 Bdd 及上单 PerfecT 续约 2 年至 2028 年。",
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
    author_en:
      "JD Gaming (@JDG京东电子竞技俱乐部)",
    author_zh:
      "JDG京东电子竞技俱乐部 (@JDG京东电子竞技俱乐部)",
    raw_text:
      "Angel选手将以中路位置加入JDG与我们共同征战赛事。感谢Angel选手的加入，坚定你所相信，大家加油！ #JDG#",
    summary:
      "[웨이보/오피셜] JD Gaming(JDG), 베테랑 미드라이너 엔젤(Angel) 공식 영입 발표 (JD Gaming officially announces signing of mid laner Angel on Weibo)",
    summary_en:
      "[Official] JD Gaming officially announces signing of veteran mid laner Angel.",
    summary_zh:
      "[微博/官宣] JD Gaming(JDG) 官方宣布资深中单 Angel 正式加盟战队。",
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
    author_en:
      "Noah (@Noah_lol1004)",
    author_zh:
      "Noah (@Noah_lol1004)",
    raw_text:
      "Hello everyone! GIANTX has allowed me to explore options for 2027. I'm motivated than ever and looking for a team in LEC/LCK/LCS.",
    summary:
      "[오피셜] 원딜 노아(Noah), GIANTX 허가 하에 2027 시즌 새로운 팀을 찾는 LFT 공식 발표 (Noah announces LFT for the 2027 season)",
    summary_en:
      "[Official] Bot laner Noah announces LFT for 2027 after being allowed by GIANTX to explore options.",
    summary_zh:
      "[官宣] 下路选手 Noah 获得 GIANTX 许可，正式寻找 2027 赛季 LEC/LCK/LCS 新战队。",
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
    author_en:
      "Movistar KOI (@MovistarKOILoL)",
    author_zh:
      "Movistar KOI (@MovistarKOILoL)",
    raw_text:
      "We are thrilled to announce that Jojopyun has extended his contract with Movistar KOI for the 2027 LEC season!",
    summary:
      "[오피셜] Movistar KOI, 미드라이너 조조편(Jojopyun)과 2027 시즌 연장 계약 공식 발표 (Movistar KOI officially extends Jojopyun for 2027 LEC season)",
    summary_en:
      "[Official] Movistar KOI officially extends contract with mid laner Jojopyun for 2027.",
    summary_zh:
      "[官宣] Movistar KOI 官方宣布与中单选手 Jojopyun 续约至 2027 赛季。",
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
    author_en:
      "Sheep Esports (@Sheep_Esports)",
    author_zh:
      "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Support Jun 🇰🇷 is set to join Team Heretics in the #LEC for 2027 alongside mid laner Jackies. Report by @LEC_Wooloo, @anonimotum & @i_Eros_",
    summary:
      "[울루/Sheep Esports] GIANTX 서포터 준(Jun) & 미드 재키스(Jackies), 2027 시즌 Team Heretics 동반 이적 합의 (Jun and Jackies set to join Team Heretics for 2027 LEC)",
    summary_en:
      "[Wooloo/Sheep Esports] GIANTX support Jun and mid laner Jackies set to join Team Heretics for 2027.",
    summary_zh:
      "[Wooloo/Sheep Esports] GIANTX 辅助 Jun 与中单 Jackies 达成 2027 赛季携手加盟 Team Heretics 的口头协议。",
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
    author_en:
      "Wunder (@wunderlol)",
    author_zh:
      "Wunder (@wunderlol)",
    raw_text:
      "Looking for opportunities in LEC/LCS next year - notable achievements this year: Won as many playoffs series as Vitality did, made playoffs and worlds as many times as Fnatic.",
    summary:
      "[오피셜] SK Gaming 탑라이너 원더(Wunder), 2027 시즌 LEC/LCS 새 팀을 찾는 FA 구직 선언 (SK Gaming top laner Wunder announces he is looking for opportunities for 2027)",
    summary_en:
      "[Official] SK Gaming top laner Wunder announces he is looking for LEC/LCS opportunities for 2027.",
    summary_zh:
      "[官宣] SK Gaming 资深上单 Wunder 宣布寻找 2027 赛季 LEC/LCS 战队机会。",
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
    author_en:
      "Guan Zeyuan (@管泽元)",
    author_zh:
      "管泽元 (Guan Zeyuan @管泽元)",
    raw_text:
      "赌一手不同风格的化学反应！ JDG引入新打野！xiaofang加入！ #JDG官宣xiaofang加入#",
    summary:
      "[웨이보/오피셜] JD Gaming(JDG), 정글러 샤오팡(xiaofang) 공식 영입 발표 (JD Gaming officially signs jungler xiaofang)",
    summary_en:
      "[Official] JD Gaming officially announces signing of jungler xiaofang.",
    summary_zh:
      "[微博/官宣] 管泽元转发官宣：JD Gaming(JDG) 正式引入新打野选手 xiaofang。",
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
    author_en:
      "BLG (@BLG电子竞技俱乐部)",
    author_zh:
      "BLG电子竞技俱乐部 (@BLG电子竞技俱乐部)",
    raw_text:
      "【BLG电子竞技俱乐部英雄联盟分部人员变动公告】经过双方友好沟通与协商，上单选手李炫君（ID：Flandre）即日起正式加入BLG电子竞技俱乐部英雄联盟分部，将以BLG.Flandre之名征战英雄联盟职业赛场。",
    summary:
      "[웨이보/오피셜] Bilibili Gaming(BLG), 베테랑 탑라이너 플랑드레(Flandre) 공식 영입 발표 (BLG officially announces signing of top laner Flandre)",
    summary_en:
      "[Official] Bilibili Gaming (BLG) officially announces signing of top laner Flandre.",
    summary_zh:
      "[微博/官宣] Bilibili Gaming(BLG) 官方宣布功勋上单选手 Flandre(李炫君) 正式加盟。",
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
    author_en:
      "WBG (@WBG英雄联盟分部)",
    author_zh:
      "WBG英雄联盟分部 (@WBG英雄联盟分部)",
    raw_text:
      "【WBG英雄联盟分部人员变动公告】 #Xiaohao回归WBG# 我们非常高兴向大家正式宣布，经过俱乐部与选手友好沟通，打野选手彭浩（ID：Xiaohao）即日起正式回归WBG电子竞技俱乐部英雄联盟分部。",
    summary:
      "[웨이보/오피셜] Weibo Gaming(WBG), 정글러 샤오하오(Xiaohao) 공식 복귀 발표 (WBG officially announces return of jungler Xiaohao)",
    summary_en:
      "[Official] Weibo Gaming (WBG) officially announces return of jungler Xiaohao.",
    summary_zh:
      "[微博/官宣] Weibo Gaming(WBG) 官方宣布打野选手 Xiaohao(彭浩) 即日起正式回归战队。",
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
    author_en:
      "EDG (@EDG电子竞技俱乐部)",
    author_zh:
      "EDG电子竞技俱乐部 (@EDG电子竞技俱乐部)",
    raw_text:
      "【EDG英雄联盟分部人员变动公告】#EDG官宣Jiejie回归# 经过友好沟通与协商，我们很高兴地宣布：Jiejie（赵礼杰）选手正式回归EDG英雄联盟分部，将继续以EDG.Jiejie的身份征战英雄联盟职业赛场！",
    summary:
      "[웨이보/오피셜] EDward Gaming(EDG), WBG를 떠난 챔피언 정글러 지에지에(Jiejie) 친정팀 공식 복귀 발표 (EDG officially announces return of jungler Jiejie)",
    summary_en:
      "[Official] EDward Gaming (EDG) officially announces return of World Champion jungler Jiejie.",
    summary_zh:
      "[微博/官宣] EDward Gaming(EDG) 官方宣布全球总决赛冠军打野 Jiejie(赵礼杰) 正式回归。",
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
    author_en?: string;
    author_zh?: string;
    summary: string;
    summary_en?: string;
    summary_zh?: string;
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
        author_en: r.author_en,
        author_zh: r.author_zh,
        summary: r.summary || r.raw_text,
        summary_en: r.summary_en,
        summary_zh: r.summary_zh,
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
    author_en: "Hanjin BRION (@Brionesports)",
    author_zh: "韩进 BRION (@Brionesports)",
    summary:
      "[오피셜] 한진 브리온, 탑 캐스팅(Casting) 포함 주전 5인 전원과 2027 시즌 재계약 공식 발표",
    summary_en:
      "[Official] Hanjin BRION announces re-signing of all 5 starters including top laner Casting for the 2027 season.",
    summary_zh:
      "[官宣] 韩进 BRION 正式宣布与包括上单 Casting 在内的首发 5 人续约至 2027 赛季。",
  },
  gideon: {
    predicted_team_id: 7,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/Brionesports/status/2113925129373978690",
    author: "한진 브리온 (@Brionesports)",
    author_en: "Hanjin BRION (@Brionesports)",
    author_zh: "韩进 BRION (@Brionesports)",
    summary:
      "[오피셜] 한진 브리온, 정글 기드온(GIDEON) 포함 주전 5인 전원과 2027 시즌 재계약 공식 발표",
    summary_en:
      "[Official] Hanjin BRION announces re-signing of all 5 starters including jungler GIDEON for the 2027 season.",
    summary_zh:
      "[官宣] 韩进 BRION 正式宣布与包括打野 GIDEON 在内的首发 5 人续约至 2027 赛季。",
  },
  roamer: {
    predicted_team_id: 7,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/Brionesports/status/2113925129373978690",
    author: "한진 브리온 (@Brionesports)",
    author_en: "Hanjin BRION (@Brionesports)",
    author_zh: "韩进 BRION (@Brionesports)",
    summary:
      "[오피셜] 한진 브리온, 미드 로머(Roamer) 포함 주전 5인 전원과 2027 시즌 재계약 공식 발표",
    summary_en:
      "[Official] Hanjin BRION announces re-signing of all 5 starters including mid laner Roamer for the 2027 season.",
    summary_zh:
      "[官宣] 韩进 BRION 正式宣布与包括中单 Roamer 在内的首发 5 人续约至 2027 赛季。",
  },
  namgung: {
    predicted_team_id: 7,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/Brionesports/status/2113925129373978690",
    author: "한진 브리온 (@Brionesports)",
    author_en: "Hanjin BRION (@Brionesports)",
    author_zh: "韩进 BRION (@Brionesports)",
    summary:
      "[오피셜] 한진 브리온, 서포터 남궁(Namgung) 포함 주전 5인 전원과 2027 시즌 재계약 공식 발표",
    summary_en:
      "[Official] Hanjin BRION announces re-signing of all 5 starters including support Namgung for the 2027 season.",
    summary_zh:
      "[官宣] 韩进 BRION 正式宣布与包括辅助 Namgung 在内的首发 5 人续约至 2027 赛季。",
  },
  // LCK: KT 롤스터 2027 로스터 개편 (@KTRolsterLoL & @Sheep_Esports)
  perfect: {
    predicted_team_id: 5,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/KTRolsterLoL/status/2108130819479073079",
    author: "KT Rolster (@KTRolsterLoL)",
    author_en: "KT Rolster (@KTRolsterLoL)",
    author_zh: "KT Rolster (@KTRolsterLoL)",
    summary:
      "[오피셜] kt 롤스터, 탑 퍼펙트(PerfecT) 및 미드 비디디(Bdd)와 2028년까지 2년 다년 재계약 공식 발표",
    summary_en:
      "[Official] KT Rolster announces 2-year multi-year extensions through 2028 with top laner PerfecT and mid laner Bdd.",
    summary_zh:
      "[官宣] KT Rolster 宣布与上单 PerfecT 及中单 Bdd 续约 2 年至 2028 年。",
  },
  kellin: {
    predicted_team_id: 5,
    confidence: 93,
    status: "RUMORED",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] 서포터 켈린(Kellin)·정글 랩터(Raptor)·원딜 태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력",
    summary_en:
      "[Wooloo/Sheep Esports] Support Kellin, jungler Raptor, and ADC Taeyoon likely to join KT Rolster for the 2027 season.",
    summary_zh:
      "[Wooloo/Sheep Esports] 辅助 Kellin、打野 Raptor 与下路 Taeyoon 大概率在 2027 赛季加盟 KT Rolster。",
  },
  taeyoon: {
    predicted_team_id: 5,
    confidence: 93,
    status: "RUMORED",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] 원딜 태윤(Taeyoon)·정글 랩터(Raptor)·서포터 켈린(Kellin), 2027 시즌 KT 롤스터 동반 합류 유력",
    summary_en:
      "[Wooloo/Sheep Esports] ADC Taeyoon, jungler Raptor, and support Kellin likely to join KT Rolster for the 2027 season.",
    summary_zh:
      "[Wooloo/Sheep Esports] 下路 Taeyoon、打野 Raptor 与辅助 Kellin 大概率在 2027 赛季加盟 KT Rolster。",
  },
  cuzz: {
    predicted_team_id: null,
    confidence: 93,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] KT 롤스터가 2027 시즌 신임 정글러로 랩터(Raptor) 영입을 추진함에 따라 기존 정글러 커즈(Cuzz) FA 전환",
    summary_en:
      "[Wooloo/Sheep Esports] With KT Rolster pursuing jungler Raptor for 2027, incumbent jungler Cuzz enters free agency (FA).",
    summary_zh:
      "[Wooloo/Sheep Esports] 随着 KT 推进引进打野 Raptor，原主力打野 Cuzz 将进入自由人市场。",
  },
  jiwoo: {
    predicted_team_id: null,
    confidence: 93,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] KT 롤스터가 2027 시즌 원딜 태윤(Taeyoon) 영입을 추진함에 따라 기존 원딜 지우(Jiwoo) FA 전환",
    summary_en:
      "[Wooloo/Sheep Esports] With KT Rolster pursuing ADC Taeyoon for 2027, incumbent ADC Jiwoo enters free agency (FA).",
    summary_zh:
      "[Wooloo/Sheep Esports] 随着 KT 推进引进下路 Taeyoon，原主力下路 Jiwoo 将进入自由人市场。",
  },
  effort: {
    predicted_team_id: null,
    confidence: 93,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] KT 롤스터가 2027 시즌 서포터 켈린(Kellin) 영입을 추진함에 따라 기존 서포터 에포트(Effort) FA 전환",
    summary_en:
      "[Wooloo/Sheep Esports] With KT Rolster pursuing support Kellin for 2027, incumbent support Effort enters free agency (FA).",
    summary_zh:
      "[Wooloo/Sheep Esports] 随着 KT 推进引进辅助 Kellin，原主力辅助 Effort 将进入自由人市场。",
  },
  // LCK: 한화생명(HLE) 2년 계약 잔류 코어 (@恋恋红茶_244)
  zeka: {
    predicted_team_id: 3,
    confidence: 98,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2266865584/Rpvgka3gG",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    author_en: "Lianlian Hongcha (@恋恋红茶_244)",
    author_zh: "恋恋红茶_244 (@恋恋红茶_244)",
    summary:
      "[웨이보/롄롄홍차] 한화생명 제카(Zeka)·구마유시(Gumayusi)·딜라이트(Delight), 2년 다년 계약으로 2027 시즌 잔류 확정",
    summary_en:
      "[Weibo/Red Tea] HLE Zeka, Gumayusi, and Delight confirmed staying for 2027 season on 2-year multi-year contracts.",
    summary_zh:
      "[微博/恋恋红茶] HLE 核心 Zeka、Gumayusi、Delight 签下 2 年长约，确认留队至 2027 赛季。",
  },
  delight: {
    predicted_team_id: 3,
    confidence: 98,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2266865584/Rpvgka3gG",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    author_en: "Lianlian Hongcha (@恋恋红茶_244)",
    author_zh: "恋恋红茶_244 (@恋恋红茶_244)",
    summary:
      "[웨이보/롄롄홍차] 한화생명 딜라이트(Delight)·제카(Zeka)·구마유시(Gumayusi), 2년 다년 계약으로 2027 시즌 잔류 확정",
    summary_en:
      "[Weibo/Red Tea] HLE Delight, Zeka, and Gumayusi confirmed staying for 2027 season on 2-year multi-year contracts.",
    summary_zh:
      "[微博/恋恋红茶] HLE 核心 Delight、Zeka、Gumayusi 签下 2 年长约，确认留队至 2027 赛季。",
  },
  // LPL: WBG, AL, EDG, iG 로스터 변동 (@召唤师Park, @恋恋红茶_244)
  xiaohu: {
    predicted_team_id: 14,
    confidence: 95,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2522098777/Rq1lrwHjr",
    author: "召唤师Park (@召唤师Park)",
    author_en: "Summoner Park (@召唤师Park)",
    author_zh: "召唤师Park (@召唤师Park)",
    summary:
      "[웨이보/소환사 Park] Weibo Gaming(WBG), 미드라이너 샤오후(Xiaohu) 주전 잔류 및 탑 아러(Ale) 영입 추진",
    summary_en:
      "[Weibo/Summoner Park] Weibo Gaming (WBG) keeps mid laner Xiaohu as starter and pursues top laner Ale.",
    summary_zh:
      "[微博/召唤师Park] WBG 中单 Xiaohu 留队担任首发，战队正在运作引进上单 Ale。",
  },
  breathe: {
    predicted_team_id: null,
    confidence: 88,
    status: "FA",
    source_url: "https://weibo.com/2522098777/Rq1lrwHjr",
    author: "召唤师Park (@召唤师Park)",
    author_en: "Summoner Park (@召唤师Park)",
    author_zh: "召唤师Park (@召唤师Park)",
    summary:
      "[웨이보/소환사 Park] Weibo Gaming(WBG)이 신임 탑라이너 아러(Ale)를 영입함에 따라 기존 탑라이너 브리드(Breathe) 결별 및 FA 전환",
    summary_en:
      "[Weibo/Summoner Park] With WBG signing top laner Ale, Breathe departs and enters free agency (FA).",
    summary_zh:
      "[微博/召唤师Park] 随着 WBG 运作引进上单 Ale，原上单 Breathe 离队并转为自由人。",
  },
  kael: {
    predicted_team_id: 20,
    confidence: 92,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2522098777/Rpymw6nAT",
    author: "召唤师Park (@召唤师Park)",
    author_en: "Summoner Park (@召唤师Park)",
    author_zh: "召唤师Park (@召唤师Park)",
    summary:
      "[웨이보/소환사 Park] AL 서포터 카엘(Kael) 및 원딜 호프(Hope) 이적 루머 일축, 소속팀 잔류 확인",
    summary_en:
      "[Weibo/Summoner Park] AL dismisses transfer rumors for support Kael and ADC Hope, confirming they stay.",
    summary_zh:
      "[微博/召唤师Park] 辟谣 AL 辅助 Kael 与下路 Hope 的转会流言，确认留队。",
  },
  monki: {
    predicted_team_id: 17,
    confidence: 92,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2522098777/Rpymw6nAT",
    author: "召唤师Park (@召唤师Park)",
    author_en: "Summoner Park (@召唤师Park)",
    author_zh: "召唤师Park (@召唤师Park)",
    summary:
      "[웨이보/소환사 Park] EDG 정글러 몽키(Monki) 이탈설 일축, 잔류 확인",
    summary_en:
      "[Weibo/Summoner Park] EDG dismisses departure rumors for jungler Monki, confirming he stays.",
    summary_zh:
      "[微博/召唤师Park] 辟谣 EDG 打野 Monki 离队传闻，确认留队。",
  },
  rookie: {
    predicted_team_id: 16,
    confidence: 90,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2266865584/RpWLblXCm",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    author_en: "Lianlian Hongcha (@恋恋红茶_244)",
    author_zh: "恋恋红茶_244 (@恋恋红茶_244)",
    summary:
      "[웨이보/롄롄홍차] iG 더샤이(TheShy)·루키(Rookie)·메이코(Meiko) 베테랑 코어 체제 유지 확인",
    summary_en:
      "[Weibo/Red Tea] iG confirms veteran core structure with TheShy, Rookie, and Meiko.",
    summary_zh:
      "[微博/恋恋红茶] 确认 iG 将维持 TheShy、Rookie、Meiko 的老将核心阵容。",
  },
  // LEC: Team Heretics, SK Gaming, NAVI, Dignitas, Disguised
  jackies: {
    predicted_team_id: 28,
    confidence: 97,
    status: "RUMORED",
    source_url: "https://x.com/Sheep_Esports/status/2102435339810075042",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] GIANTX 미드라이너 재키스(Jackies), 서포터 준(Jun)과 함께 2027 시즌 Team Heretics 동반 이적 합의",
    summary_en:
      "[Wooloo/Sheep Esports] GIANTX mid laner Jackies reaches verbal agreement to join Team Heretics alongside Jun for 2027.",
    summary_zh:
      "[Wooloo/Sheep Esports] GIANTX 中单 Jackies 与辅助 Jun 达成口头协议，2027 赛季携手加盟 Team Heretics。",
  },
  daglas: {
    predicted_team_id: null,
    confidence: 96,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2116175898311643603",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] Team Heretics가 2027 시즌 주전 정글러로 라조크(Razork)를 영입함에 따라 기존 정글러 다글라스(Daglas) 결별",
    summary_en:
      "[Wooloo/Sheep Esports] With Team Heretics signing Razork as starting jungler for 2027, Daglas departs.",
    summary_zh:
      "[Wooloo/Sheep Esports] 随着 Team Heretics 签下 Razork，原打野 Daglas 离队。",
  },
  stend: {
    predicted_team_id: null,
    confidence: 100,
    status: "FA",
    source_url: "https://x.com/Stend_lol/status/2104595334106104250",
    author: "Stend (@Stend_lol)",
    author_en: "Stend (@Stend_lol)",
    author_zh: "Stend (@Stend_lol)",
    summary:
      "[오피셜] Team Heretics 서포터 스텐드(Stend), 선수 생활 은퇴 및 코칭스태프 전향 발표",
    summary_en:
      "[Official] Team Heretics support Stend announces retirement as player and transition to coaching staff.",
    summary_zh:
      "[官宣] Team Heretics 辅助 Stend 宣布退役并转型加入教练组。",
  },
  skeanz: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2118397190921933216",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] SK Gaming이 2027 시즌 신임 정글러 직시(Zicssi) 영입에 합의함에 따라 기존 정글러 스킨즈(Skeanz) 결별",
    summary_en:
      "[Wooloo/Sheep Esports] With SK Gaming agreeing to sign Zicssi for 2027, incumbent jungler Skeanz departs.",
    summary_zh:
      "[Wooloo/Sheep Esports] 随着 SK Gaming 签下 Zicssi，原打野 Skeanz 离队。",
  },
  lider: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2113631034570854408",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] SK Gaming이 2027 시즌 주전 미드로 슬로우큐(SlowQ)를 확정함에 따라 기존 미드 리더(LIDER) 결별",
    summary_en:
      "[Wooloo/Sheep Esports] With SK Gaming confirming SlowQ as starting mid laner for 2027, LIDER departs.",
    summary_zh:
      "[Wooloo/Sheep Esports] 随着 SK Gaming 确立 SlowQ 为首发中单，原中单 LIDER 离队。",
  },
  jopa: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2113639031003283468",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] SK Gaming이 2027 시즌 주전 원딜로 3XA를 영입함에 따라 기존 원딜 조파(Jopa) 결별",
    summary_en:
      "[Wooloo/Sheep Esports] With SK Gaming signing 3XA as starting ADC for 2027, Jopa departs.",
    summary_zh:
      "[Wooloo/Sheep Esports] 随着 SK Gaming 签下 3XA，原下路 Jopa 离队。",
  },
  mikyx: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2116940157848879493",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] SK Gaming이 2027 시즌 주전 서포터로 로스파(Lospa)를 영입함에 따라 기존 서포터 미키엑스(Mikyx) 결별",
    summary_en:
      "[Wooloo/Sheep Esports] With SK Gaming signing Lospa as starting support for 2027, Mikyx departs.",
    summary_zh:
      "[Wooloo/Sheep Esports] 随着 SK Gaming 签下 Lospa，原辅助 Mikyx 离队。",
  },
  maynter: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2115516946418397550",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] NAVI가 릴레흐 중심 리빌딩에 나서며 탑라이너 메인터(Maynter)에게 2027 시즌 타 팀 접촉(FA) 허용",
    summary_en:
      "[Wooloo/Sheep Esports] NAVI permits top laner Maynter to explore other opportunities (FA) for 2027.",
    summary_zh:
      "[Wooloo/Sheep Esports] NAVI 允许上单 Maynter 接触其他战队(自由人)。",
  },
  poby: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2115516946418397550",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] NAVI가 릴레흐 중심 리빌딩에 나서며 미드라이너 포비(Poby)에게 2027 시즌 타 팀 접촉(FA) 허용",
    summary_en:
      "[Wooloo/Sheep Esports] NAVI permits mid laner Poby to explore other opportunities (FA) for 2027.",
    summary_zh:
      "[Wooloo/Sheep Esports] NAVI 允许中单 Poby 接触其他战队(自由人)。",
  },
  hans_samd: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2115516946418397550",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] NAVI가 릴레흐 중심 리빌딩에 나서며 원딜 한스삼디(Hans SamD)에게 2027 시즌 타 팀 접촉(FA) 허용",
    summary_en:
      "[Wooloo/Sheep Esports] NAVI permits ADC Hans SamD to explore other opportunities (FA) for 2027.",
    summary_zh:
      "[Wooloo/Sheep Esports] NAVI 允许下路 Hans SamD 接触其他战队(自由人)。",
  },
  parus: {
    predicted_team_id: null,
    confidence: 95,
    status: "FA",
    source_url: "https://x.com/Sheep_Esports/status/2115516946418397550",
    author: "Sheep Esports (@Sheep_Esports)",
    author_en: "Sheep Esports (@Sheep_Esports)",
    author_zh: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] NAVI가 릴레흐 중심 리빌딩에 나서며 서포터 파루스(Parus)에게 2027 시즌 타 팀 접촉(FA) 허용",
    summary_en:
      "[Wooloo/Sheep Esports] NAVI permits support Parus to explore other opportunities (FA) for 2027.",
    summary_zh:
      "[Wooloo/Sheep Esports] NAVI 允许辅助 Parus 接触其他战队(自由人)。",
  },
  palafox: {
    predicted_team_id: null,
    confidence: 100,
    status: "FA",
    source_url: "https://x.com/dignitaslol/status/2101025966399115687",
    author: "Dignitas (@dignitaslol)",
    author_en: "Dignitas (@dignitaslol)",
    author_zh: "Dignitas (@dignitaslol)",
    summary:
      "[오피셜] Dignitas, 미드라이너 팔라폭스(Palafox)와 계약 종료 및 FA 발표",
    summary_en:
      "[Official] Dignitas announces contract expiration and free agency for mid laner Palafox.",
    summary_zh:
      "[官宣] Dignitas 宣布与中单 Palafox 合约到期并成为自由人。",
  },
  ignar: {
    predicted_team_id: null,
    confidence: 100,
    status: "FA",
    source_url: "https://x.com/dignitaslol/status/2101023454673952905",
    author: "Dignitas (@dignitaslol)",
    author_en: "Dignitas (@dignitaslol)",
    author_zh: "Dignitas (@dignitaslol)",
    summary:
      "[오피셜] Dignitas, 베테랑 서포터 이그나(IgNar)와 계약 종료 및 FA 발표",
    summary_en:
      "[Official] Dignitas announces contract expiration and free agency for veteran support IgNar.",
    summary_zh:
      "[官宣] Dignitas 宣布与老将辅助 IgNar 合约到期并成为自由人。",
  },
  kryra: {
    predicted_team_id: 37,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/LCSOfficial/status/2109819014323273817",
    author: "LCS Official (@LCSOfficial)",
    author_en: "LCS Official (@LCSOfficial)",
    author_zh: "LCS Official (@LCSOfficial)",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 잔류 확정 (Castle·KryRa·Callme·sajed·Lyonz)",
    summary_en:
      "[Official] Disguised (DSG) secures 2027 LCS spot after winning promotion tournament.",
    summary_zh:
      "[官宣] Disguised(DSG) 夺得升降级赛冠军，锁定 2027 LCS 席位。",
  },
  callme: {
    predicted_team_id: 37,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/LCSOfficial/status/2109819014323273817",
    author: "LCS Official (@LCSOfficial)",
    author_en: "LCS Official (@LCSOfficial)",
    author_zh: "LCS Official (@LCSOfficial)",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 잔류 확정 (Castle·KryRa·Callme·sajed·Lyonz)",
    summary_en:
      "[Official] Disguised (DSG) secures 2027 LCS spot after winning promotion tournament.",
    summary_zh:
      "[官宣] Disguised(DSG) 夺得升降级赛冠军，锁定 2027 LCS 席位。",
  },
  sajed: {
    predicted_team_id: 37,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/LCSOfficial/status/2109819014323273817",
    author: "LCS Official (@LCSOfficial)",
    author_en: "LCS Official (@LCSOfficial)",
    author_zh: "LCS Official (@LCSOfficial)",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 잔류 확정 (Castle·KryRa·Callme·sajed·Lyonz)",
    summary_en:
      "[Official] Disguised (DSG) secures 2027 LCS spot after winning promotion tournament.",
    summary_zh:
      "[官宣] Disguised(DSG) 夺得升降级赛冠军，锁定 2027 LCS 席位。",
  },
  lyonz: {
    predicted_team_id: 37,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/LCSOfficial/status/2109819014323273817",
    author: "LCS Official (@LCSOfficial)",
    author_en: "LCS Official (@LCSOfficial)",
    author_zh: "LCS Official (@LCSOfficial)",
    summary:
      "[오피셜] Disguised(DSG), 승강전 우승으로 2027 LCS 잔류 확정 (Castle·KryRa·Callme·sajed·Lyonz)",
    summary_en:
      "[Official] Disguised (DSG) secures 2027 LCS spot after winning promotion tournament.",
    summary_zh:
      "[官宣] Disguised(DSG) 夺得升降级赛冠军，锁定 2027 LCS 席位。",
  },
  beichuan: {
    predicted_team_id: 57,
    confidence: 90,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2522098777/Rq1lrwHjr",
    author: "召唤师Park (@召唤师Park)",
    author_en: "Summoner Park (@召唤师Park)",
    author_zh: "召唤师Park (@召唤师Park)",
    summary:
      "[웨이보/소환사 Park] WBG가 TT 정글러 베이촨(Beichuan) 영입을 타진했으나 선수가 이적을 고사하며 TT 잔류",
    summary_en:
      "[Weibo/Summoner Park] WBG inquired about TT jungler Beichuan, but he declined transfer and stays with TT.",
    summary_zh:
      "[微博/召唤师Park] WBG 曾向 TT 打野 Beichuan 抛出橄榄枝，但选手拒绝转会决定留在 TT。",
  },
};

// 구버전 DB에서 누락되어 있던 LPL 4개 구단(LGD, OMG, TT, UP) 및 2026 로스터 자동 보강 (총 14개 LPL 파트너 구단 완성)
export const MISSING_LPL_TEAMS: Team[] = [
  {
    id: 55,
    name: "LGD Gaming",
    short_name: "LGD",
    league: "LPL",
    light_logo_url: "/logos/lgd.png",
    dark_logo_url: "/logos/lgd.png",
    primary_color: "#E60012",
  },
  {
    id: 56,
    name: "Oh My God",
    short_name: "OMG",
    league: "LPL",
    light_logo_url: "/logos/omg.png",
    dark_logo_url: "/logos/omg.png",
    primary_color: "#F39800",
  },
  {
    id: 57,
    name: "ThunderTalk Gaming",
    short_name: "TT",
    league: "LPL",
    light_logo_url: "/logos/tt.png",
    dark_logo_url: "/logos/tt.png",
    primary_color: "#00B4FF",
  },
  {
    id: 58,
    name: "Ultra Prime",
    short_name: "UP",
    league: "LPL",
    light_logo_url: "/logos/up.png",
    dark_logo_url: "/logos/up.png",
    primary_color: "#5B37EB",
  },
];

export const MISSING_LPL_PLAYERS: Player[] = [
  // 55. LGD Gaming (id: 55)
  { id: 9551, slug: "sasi", name: "sasi", real_name: "Yan Rui", position: "TOP", current_team_id: 55, predicted_team_id: 55, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9552, slug: "climber", name: "climber", real_name: "Yeungists", position: "JGL", current_team_id: 55, predicted_team_id: 55, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9553, slug: "tangyuan", name: "Tangyuan", real_name: "Lin Yuhong", position: "MID", current_team_id: 55, predicted_team_id: 55, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9554, slug: "shaoye", name: "Shaoye", real_name: "Qiu Guobin", position: "BOT", current_team_id: 55, predicted_team_id: 55, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9555, slug: "ycx", name: "ycx", real_name: "Zhao Wenhao", position: "SPT", current_team_id: 55, predicted_team_id: 55, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9556, slug: "burdol", name: "Burdol", real_name: "Roh Tae-yoon", position: "TOP", current_team_id: 55, predicted_team_id: 55, is_starter: false, confidence: 100, status: "STAY" },

  // 56. Oh My God (id: 56)
  { id: 9561, slug: "hery", name: "Hery", real_name: "Wang Heyong", position: "TOP", current_team_id: 56, predicted_team_id: 56, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9562, slug: "re0", name: "re0", real_name: "Xu Hanyang", position: "JGL", current_team_id: 56, predicted_team_id: 56, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9563, slug: "linfeng", name: "LinFeng", real_name: "Chen Linfeng", position: "MID", current_team_id: 56, predicted_team_id: 56, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9564, slug: "starry", name: "Starry", real_name: "Lei Ming", position: "BOT", current_team_id: 56, predicted_team_id: 56, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9565, slug: "moham", name: "Moham", real_name: "Jeong Jae-hun", position: "SPT", current_team_id: 56, predicted_team_id: 56, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9566, slug: "juhan", name: "Juhan", real_name: "Lee Ju-han", position: "JGL", current_team_id: 56, predicted_team_id: 56, is_starter: false, confidence: 100, status: "STAY" },

  // 57. ThunderTalk Gaming (id: 57)
  { id: 9571, slug: "keshi", name: "Keshi", real_name: "Li Qinghua", position: "TOP", current_team_id: 57, predicted_team_id: 57, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9572, slug: "junhao", name: "Junhao", real_name: "Luo Junhao", position: "JGL", current_team_id: 57, predicted_team_id: 57, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9573, slug: "heru", name: "Heru", real_name: "Kim Min-seong", position: "MID", current_team_id: 57, predicted_team_id: 57, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9574, slug: "ahn", name: "Ahn", real_name: "Feng Nai", position: "BOT", current_team_id: 57, predicted_team_id: 57, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9575, slug: "feather", name: "Feather", real_name: "Wang Tiancifu", position: "SPT", current_team_id: 57, predicted_team_id: 57, is_starter: true, confidence: 100, status: "STAY" },
  {
    id: 9576,
    slug: "beichuan",
    name: "Beichuan",
    real_name: "Yang Ling",
    position: "JGL",
    current_team_id: 57,
    predicted_team_id: 57,
    is_starter: false,
    confidence: 90,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2522098777/Rq1lrwHjr",
  },
  { id: 9577, slug: "setab", name: "SeTab", real_name: "Song Kyeong-jin", position: "MID", current_team_id: 57, predicted_team_id: 57, is_starter: false, confidence: 100, status: "STAY" },
  { id: 9578, slug: "ryan3", name: "Ryan3", real_name: "Chen Qihong", position: "BOT", current_team_id: 57, predicted_team_id: 57, is_starter: false, confidence: 100, status: "STAY" },

  // 58. Ultra Prime (id: 58)
  { id: 9581, slug: "liangchen", name: "Liangchen", real_name: "Zhang Liangchen", position: "TOP", current_team_id: 58, predicted_team_id: 58, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9582, slug: "grizzly", name: "Grizzly", real_name: "Jo Seung-hoon", position: "JGL", current_team_id: 58, predicted_team_id: 58, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9583, slug: "saber", name: "Saber", real_name: "Song Dailin", position: "MID", current_team_id: 58, predicted_team_id: 58, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9584, slug: "hena", name: "Hena", real_name: "Park Jeung-hwan", position: "BOT", current_team_id: 58, predicted_team_id: 58, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9585, slug: "xiaoxia", name: "Xiaoxia", real_name: "Xia Jingyao", position: "SPT", current_team_id: 58, predicted_team_id: 58, is_starter: true, confidence: 100, status: "STAY" },
  { id: 9586, slug: "1jiang", name: "1Jiang", real_name: "Chien Chung-yuan", position: "TOP", current_team_id: 58, predicted_team_id: 58, is_starter: false, confidence: 100, status: "STAY" },
  { id: 9587, slug: "luoyiyu", name: "luoyiyu", real_name: "Luo Yiyu", position: "JGL", current_team_id: 58, predicted_team_id: 58, is_starter: false, confidence: 100, status: "STAY" },
  { id: 9588, slug: "baiye", name: "Baiye", real_name: "Liu Baiye", position: "BOT", current_team_id: 58, predicted_team_id: 58, is_starter: false, confidence: 100, status: "STAY" },
];
