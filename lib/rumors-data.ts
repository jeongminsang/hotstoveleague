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
    id: 36,
    post_id: "rv-20261105-ale-wbg",
    source: "WEIBO",
    author: "召唤师Park (@召唤师Park)",
    raw_text:
      "Ale经纪人挺强的，给他运作到WBG了，WBG打野想要Beichuan，但他不太想去，就临时签了H4cker，中单依旧是小虎，下路知秋意+Ke，这并不是队伍明年的最终阵容。 #曝Ale加入WBG#",
    summary:
      "[웨이보/소환사 Park] AL 탑라이너 아러(Ale), WBG 합류 및 미드 샤오후(Xiaohu) 잔류 유력 (Summoner Park: Ale joins WBG while Xiaohu remains starting mid)",
    player_slug: "ale",
    player_name: "Ale",
    current_team_short: "AL",
    target_team_short: "WBG",
    target_team_id: 14,
    league: "LPL",
    confidence: 86,
    post_url: "https://weibo.com/2522098777/Rq1lrwHjr",
    published_at: "2026-11-05T14:12:21Z",
  },
  {
    id: 35,
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
    id: 34,
    post_id: "rv-20261105-skewmond-g2",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] SkewMond 🇫🇷 will not be part of G2 Esports' starting roster for the 2027 #LEC season. Report by @anonimotum @i_Eros_ @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] 스큐몬드(SkewMond), 2027 시즌 G2 주전 로스터 제외 및 타 팀 이적 타진 (SkewMond will not be part of G2 starting roster in 2027)",
    player_slug: "skewmond",
    player_name: "SkewMond",
    current_team_short: "G2",
    target_team_short: "VIT",
    target_team_id: 26,
    league: "LEC",
    confidence: 90,
    post_url: "https://x.com/Sheep_Esports/status/2117983028324749541",
    published_at: "2026-11-05T11:45:00Z",
  },
  {
    id: 33,
    post_id: "rv-20261105-naaknako-g2",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Movistar KOI, NAVI and G2 Esports have approached Team Vitality regarding Turkish star top laner Kaan 'Naak Nako' Okan, with G2 making him their top priority for 2027.",
    summary:
      "[울루/Sheep Esports] G2·MKOI·NAVI, 바이탈리티 탑 낙나코(Naak Nako) 영입전 참전… G2 최우선 타깃 (G2, MKOI, and NAVI approach Vitality for Naak Nako)",
    player_slug: "naak_nako",
    player_name: "Naak_Nako",
    current_team_short: "VIT",
    target_team_short: "G2",
    target_team_id: 21,
    league: "LEC",
    confidence: 82,
    post_url: "https://rostermania.lol/en/player/naak-nako",
    published_at: "2026-11-05T09:10:00Z",
  },
  {
    id: 32,
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
    id: 31,
    post_id: "rv-20261104-369-tes",
    source: "WEIBO",
    author: "丶涵艺 (Hanyi @丶涵艺)",
    raw_text:
      "369的采访也来了，在后台说最后一舞，这次是没有任何包袱的享受比赛的快乐，也确实打得非常好，9哥没毛病，游戏天赋和职业素养都可以！！ 真心希望明年世界赛还能看到9哥啊 #369说最后一舞##Meiko约369明年再来#",
    summary:
      "[웨이보/한이(涵艺)] TES 탑라이너 369, 계약 만료 앞두고 거취 주목… 메이코와 2027 시즌 동반 출전 약속 (Hanyi on TES 369's 2027 outlook & Meiko's invitation)",
    player_slug: "369",
    player_name: "369",
    current_team_short: "TES",
    target_team_short: "TES",
    target_team_id: 12,
    league: "LPL",
    confidence: 84,
    post_url: "https://weibo.com/1992350413/RpQga3JgP",
    published_at: "2026-11-04T09:59:07Z",
  },
  {
    id: 30,
    post_id: "rv-20261104-knight-blg",
    source: "WEIBO",
    author: "是小电竞瓦 / 微博爆料",
    raw_text:
      "消息源：🇨🇳knight已经和BLG就续约事宜达成一致。其原有合同将在本赛季结束后到期，明年将是他效力BLG的第五年。",
    summary:
      "[웨이보 찌라시] BLG 미드라이너 나이트(knight), 2027 시즌 BLG 재계약 합의… 통산 5년 차 동행 유력 (knight reportedly agrees to contract extension with BLG for 2027)",
    player_slug: "knight",
    player_name: "knight",
    current_team_short: "BLG",
    target_team_short: "BLG",
    target_team_id: 11,
    league: "LPL",
    confidence: 88,
    post_url: "https://weibo.com/6789678830/RpPBpe3LY",
    published_at: "2026-11-04T08:18:43Z",
  },
  {
    id: 29,
    post_id: "rv-20261103-xiaohu-wbg",
    source: "WEIBO",
    author: "Crisp / 英雄联盟神吐槽",
    raw_text:
      "Crisp刘神爆料！此时无人在意的WBG四人已经离队，目前仅剩一个Xiaohu了。Crisp谈WBG现状：WBG都早走完了，应该就只有一个Xiaohu了 #Crisp谈WBG现状##Crisp说WBG只剩Xiaohu了#",
    summary:
      "[웨이보/Crisp 폭로] WBG 서포터 크리스프(Crisp), 'WBG 주전 중 샤오후(Xiaohu)만 남고 4인 결별' 폭로 (Crisp reveals on stream that only Xiaohu remains at WBG ahead of 2027)",
    player_slug: "xiaohu",
    player_name: "Xiaohu",
    current_team_short: "WBG",
    target_team_short: "WBG",
    target_team_id: 14,
    league: "LPL",
    confidence: 93,
    post_url: "https://weibo.com/5679399630/RpGIh6pMC",
    published_at: "2026-11-03T09:40:55Z",
  },
  {
    id: 28,
    post_id: "rv-20261103-doran-t1",
    source: "WEIBO",
    author: "Ahri_Yo / 胜顺啊SSA",
    raw_text:
      "多兰与T1的合同在2026.11月到期，之后多兰将成为自由人，韩网爆料T1有提新人的想法，对于和多兰续约的想法不是很强烈，加上Zeus与HLE合同到期，现在看起来Zeus回T1的可能性很大！ T1其他队员合同情况：Oner 2028.11 / Peyz 2028.11 / Faker 2029.11",
    summary:
      "[웨이보 찌라시] T1 도란(Doran), 11월 계약 만료 후 재계약 미진행 가능성 및 제우스 T1 복귀설 대두 (Weibo insider: T1 unlikely to re-sign Doran as Zeus return rumors intensify)",
    player_slug: "doran",
    player_name: "Doran",
    current_team_short: "T1",
    target_team_short: "KRX",
    target_team_id: 8,
    league: "LCK",
    confidence: 74,
    post_url: "https://weibo.com/7814284786/RpDP9b7sT",
    published_at: "2026-11-03T02:19:36Z",
  },
  {
    id: 27,
    post_id: "rv-20261102-viper-krx",
    source: "WEIBO",
    author: "兔玩游戏 (@兔玩游戏)",
    raw_text:
      "插播一条韩网转会期博主，明年的阵容名单，Zeus重回T1，Doran、Kanavi、Scout、Viper、Lehends在KRX #zeus拒绝世界赛之前和hle签续约合同#",
    summary:
      "[웨이보/투완게임] BLG 바이퍼(Viper), 2027 시즌 LCK 복귀 및 KRX(DRX) 슈퍼팀 합류 시나리오 부상 (Weibo report: Viper linked with LCK return on KRX alongside Scout and Doran)",
    player_slug: "viper",
    player_name: "Viper",
    current_team_short: "BLG",
    target_team_short: "KRX",
    target_team_id: 8,
    league: "LCK",
    confidence: 74,
    post_url: "https://weibo.com/5042958097/RpzbQtQ6W",
    published_at: "2026-11-02T14:31:47Z",
  },
  {
    id: 26,
    post_id: "rv-20261102-zeus-t1",
    source: "WEIBO",
    author: "恋恋红茶_244 & 召唤师Park",
    raw_text:
      "韩媒报道：Zeus在世界赛前拒绝了续约HLE，希望进入自由市场，更换经纪人是在2026年的10月4号，与T1之前接触过，不止一家LPL队伍邀请Zeus加入。补充：去年HLE中下辅三人都是两年，上野一年 #曝Zeus拒绝HLE续约##曝LPL队伍邀请Zeus加入#",
    summary:
      "[웨이보/롄롄홍차·소환사 Park] 제우스(Zeus), HLE 사전 재계약 거절 및 FA 시장 진출… T1 접촉 및 LPL 다수 구단 오퍼 (Red Tea & Summoner Park: Zeus declined HLE early extension, contacted T1 & received LPL offers)",
    player_slug: "zeus",
    player_name: "Zeus",
    current_team_short: "HLE",
    target_team_short: "T1",
    target_team_id: 1,
    league: "LCK",
    confidence: 80,
    post_url: "https://weibo.com/2266865584/Rpvgka3gG",
    published_at: "2026-11-02T04:31:50Z",
  },
  {
    id: 25,
    post_id: "rv-20261102-mikyx-vit",
    source: "TWITTER",
    author: "Sheep Esports / Rostermania",
    raw_text:
      "[Sources] Veteran support Mihael 'Mikyx' Mehle from SK Gaming is actively participating in Team Vitality's tryouts ahead of the 2027 LEC season.",
    summary:
      "[울루/Rostermania] SK 게이밍 서포터 미킥스(Mikyx), 2027 시즌 Team Vitality 트라이아웃 참가 (SK Gaming support Mikyx participating in Team Vitality tryouts)",
    player_slug: "mikyx",
    player_name: "Mikyx",
    current_team_short: "SK",
    target_team_short: "VIT",
    target_team_id: 26,
    league: "LEC",
    confidence: 78,
    post_url: "https://rostermania.lol/en/player/mikyx",
    published_at: "2026-11-02T03:30:00Z",
  },
  {
    id: 24,
    post_id: "rv-20261101-lospa-sk",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Fnatic support Lospa 🇰🇷 will be transferred to SK Gaming for 2027 as both teams reach an agreement.",
    summary:
      "[울루/Sheep Esports] 프나틱 서포터 로스파(Lospa), 2027 시즌 SK Gaming 이적 합의 (Fnatic support Lospa will be transferred to SK Gaming for 2027)",
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
    id: 23,
    post_id: "rv-20261101-brokenblade-mkoi",
    source: "TWITTER",
    author: "Rostermania (@rostermania_lol)",
    raw_text:
      "[Sources] G2 Esports top laner Sergen 'BrokenBlade' Çelik is Movistar KOI's main option for the toplane in 2027. MKOI is preparing a mega offer to sign him.",
    summary:
      "[Rostermania] Movistar KOI, G2 탑라이너 브로큰블레이드(BrokenBlade) 영입 위해 대형 오퍼 준비 (BrokenBlade is Movistar KOI's main option for top lane in 2027)",
    player_slug: "brokenblade",
    player_name: "BrokenBlade",
    current_team_short: "G2",
    target_team_short: "MKOI",
    target_team_id: 23,
    league: "LEC",
    confidence: 76,
    post_url: "https://rostermania.lol/en/player/brokenblade",
    published_at: "2026-11-01T14:15:00Z",
  },
  {
    id: 22,
    post_id: "rv-20261101-kanavi-hle",
    source: "WEIBO",
    author: "丶涵艺 (Hanyi @丶涵艺)",
    raw_text:
      "我就一句话 hommie和kanavi明年哪里发财 恭喜BLG！ (HLE上野Zeus和Kanavi合同均于2026年11月16日到期，Zeka、Gumayusi、Delight合同锁到2027)",
    summary:
      "[웨이보/한이(涵艺)] 한화생명 정글러 카나비(Kanavi), 11월 계약 만료 앞두고 2027 시즌 거취 및 재계약 여부 주목 (Hanyi spotlights HLE jungler Kanavi's 2027 free agency decision)",
    player_slug: "kanavi",
    player_name: "Kanavi",
    current_team_short: "HLE",
    target_team_short: "HLE",
    target_team_id: 3,
    league: "LCK",
    confidence: 82,
    post_url: "https://weibo.com/1992350413/RpjVc4FJR",
    published_at: "2026-11-01T00:39:34Z",
  },
  {
    id: 21,
    post_id: "rv-20261030-tracyn-th",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] THE FIRST ROSTER FOR THE #LEC 2027 IS LOCKED: Following Tracyn's 🇵🇱 contract renewal, Team Heretics' roster for the 2027 season is set (Tracyn, Razork, Jackies, Hype, Jun).",
    summary:
      "[울루/Sheep Esports] Team Heretics, 탑 트레이신(Tracyn) 재계약 포함 2027 시즌 5인 로스터 전원 확정 (Team Heretics locks first full 2027 LEC roster with Tracyn renewal)",
    player_slug: "tracyn",
    player_name: "Tracyn",
    current_team_short: "TH",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 100,
    post_url: "https://x.com/Sheep_Esports/status/2116175898311643603",
    published_at: "2026-10-30T17:00:00Z",
  },
  {
    id: 20,
    post_id: "rv-20261029-hype-th",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[Sources] Korean AD Carry 변정현 'Hype' has reached an agreement to remain with Team Heretics in 2027 alongside Tracyn, Razork, Jackies, and Jun.",
    summary:
      "[울루/Sheep Esports] 한국인 원딜 하이프(Hype), 연봉 조정 수용하며 2027 시즌 Team Heretics 잔류 합의 (Hype reaches agreement to remain with Team Heretics in 2027)",
    player_slug: "hype",
    player_name: "Hype",
    current_team_short: "TH",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 96,
    post_url: "https://x.com/Sheep_Esports/status/2116175898311643603",
    published_at: "2026-10-29T16:20:00Z",
  },
  {
    id: 19,
    post_id: "rv-20261028-rhilech-navi",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] NAVI to rebuild around Rookie of the Year Rhilech 🇹🇷 for #LEC 2027 — Only one year after promoting their entire coaching staff, NAVI are set to part ways with TheRock and reuse, while allowing Maynter, Poby, SamD and Parus to explore options. More details by @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] NAVI, 2027 시즌 신인왕 정글러 릴레흐(Rhilech) 중심 전면 리빌딩 확정 (NAVI to rebuild 2027 LEC roster around jungler Rhilech)",
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
    id: 18,
    post_id: "rv-20261027-tarzan-al",
    source: "WEIBO",
    author: "Crisp / 英雄联盟神吐槽",
    raw_text:
      "#Crisp说Tarzan哭了# 一号种子AL止步16强！Crisp谈AL一号种子16强：听说Tarzan哭了，发消息安慰他一下，合同还有2年不会走。",
    summary:
      "[웨이보/Crisp 폭로] AL 정글러 타잔(Tarzan), 잔여 계약 2년으로 2027 시즌 AL 잔류 확인 (Crisp confirms AL jungler Tarzan has 2 years remaining on his contract and will stay)",
    player_slug: "tarzan",
    player_name: "Tarzan",
    current_team_short: "AL",
    target_team_short: "AL",
    target_team_id: 20,
    league: "LPL",
    confidence: 94,
    post_url: "https://weibo.com/5679399630/RoCbTwsiz",
    published_at: "2026-10-27T08:19:51Z",
  },
  {
    id: 17,
    post_id: "rv-20261027-hope-al",
    source: "WEIBO",
    author: "丶涵艺 (Hanyi @丶涵艺)",
    raw_text:
      "谁能想到AL在S16交出了这样的一份答卷，除了Hope下路对线落后，其他人打得也不行啊，教练组问题也很大，你觉得AL转会期应该怎么调整？ #Hope下路对线落后# #Breathe赛后采访致歉#",
    summary:
      "[웨이보/한이(涵艺)] 한이, AL 월즈 16강 탈락 후 원딜 호프(Hope) 및 코칭스태프 스토브리그 개편 시사 (Hanyi points to offseason roster & coaching adjustments for AL)",
    player_slug: "hope",
    player_name: "Hope",
    current_team_short: "AL",
    target_team_short: "AL",
    target_team_id: 20,
    league: "LPL",
    confidence: 75,
    post_url: "https://weibo.com/1992350413/RozxHnQPN",
    published_at: "2026-10-27T01:35:20Z",
  },
  {
    id: 16,
    post_id: "rv-20261026-serin-th",
    source: "TWITTER",
    author: "Team Heretics (@HereticsLEC)",
    raw_text:
      "Today we part ways with Serin. Following his departure from Team Heretics, mid laner Tolga 'Serin' Ölmez enters free agency ahead of the 2027 season.",
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
    id: 15,
    post_id: "rv-20261023-3xa-sk",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] AD Carry 3XA 🇫🇷 is set to return to the #LEC in 2027 with SK Gaming.",
    summary:
      "[울루/Sheep Esports] 원딜 3XA(구 Exakick), 2027 시즌 SK Gaming 전격 복귀 확정 (AD Carry 3XA set to return to the LEC in 2027 with SK Gaming)",
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
    id: 14,
    post_id: "rv-20261022-razork-th",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Razork 🇪🇸 is set to join Team Heretics in the #LEC for 2027 — After five years with Fnatic, the Spanish jungler is set to start a new chapter alongside Jackies and Jun.",
    summary:
      "[울루/Sheep Esports] 프나틱 간판 정글러 라조크(Razork), 2027 시즌 Team Heretics 전격 이적 합의 (Razork set to join Team Heretics in the LEC for 2027)",
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
    id: 13,
    post_id: "rv-20261022-maynter-vit",
    source: "TWITTER",
    author: "Rostermania (@rostermania_lol)",
    raw_text:
      "[RUMOR] As Team Vitality holds 2027 LEC roster trials alongside Fleshy, NAVI top laner Maynter, TH jungler Daglas, Kamiloo and Targamas have participated in Vitality tryouts.",
    summary:
      "[Rostermania] NAVI 탑라이너 메인터(Maynter) 및 다글라스·타가마스 등, 2027 시즌 Team Vitality 트라이아웃 참가 (Maynter, Daglas, and Targamas trialing for Team Vitality)",
    player_slug: "maynter",
    player_name: "Maynter",
    current_team_short: "NAVI",
    target_team_short: "VIT",
    target_team_id: 26,
    league: "LEC",
    confidence: 78,
    post_url: "https://x.com/rostermania_lol/status/2113338720568942749",
    published_at: "2026-10-22T14:00:00Z",
  },
  {
    id: 12,
    post_id: "rv-20261020-apa-c9",
    source: "TWITTER",
    author: "APA (@alwaysplanahea1)",
    raw_text:
      "Today, I'm announcing free agency and that I'm looking for a team for the 2027 season. I enjoyed my time at C9 and looking forward to what is next.",
    summary:
      "[오피셜] Cloud9 미드라이너 APA, C9 결별 및 2027 시즌 FA 선언 (Cloud9 mid laner APA announces free agency for 2027 season)",
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
    id: 11,
    post_id: "rv-20261020-zven-c9",
    source: "TWITTER",
    author: "Zven (@Zven)",
    raw_text:
      "Today, I'm announcing free agency and that I'm looking for a team for the 2027 season. I'm grateful to C9 for giving me a chance once again.",
    summary:
      "[오피셜] Cloud9 원딜 즈벤(Zven), 2027 시즌 FA 시장 진출 공식 선언 (Cloud9 bot laner Zven announces free agency for 2027)",
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
    id: 10,
    post_id: "rv-20261018-raptor-kellin-taeyoon-kt",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] BFX Jungler Raptor 🇰🇷, AD Carry Taeyoon 🇰🇷 and Support Kellin 🇰🇷 are expected to join KT Rolster for the 2027 LCK season. The move is expected to take place once free agency opens.",
    summary:
      "[울루/Sheep Esports] 피어엑스 랩터(Raptor)·켈린(Kellin) & 태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력 (Raptor, Kellin, and Taeyoon expected to join KT Rolster for LCK 2027)",
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
    id: 9,
    post_id: "rv-20261018-kellin-kt",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Support Kellin 🇰🇷, Jungler Raptor 🇰🇷 and AD Carry Taeyoon 🇰🇷 are expected to join KT Rolster for the 2027 LCK season alongside PerfecT and Bdd.",
    summary:
      "[울루/Sheep Esports] 서포터 켈린(Kellin) & 원딜 태윤(Taeyoon), 2027 시즌 KT 롤스터 바텀 듀오 합류 유력 (Kellin and Taeyoon expected to form KT Rolster's 2027 bot lane)",
    player_slug: "kellin",
    player_name: "Kellin",
    current_team_short: "BFX",
    target_team_short: "KT",
    target_team_id: 5,
    league: "LCK",
    confidence: 93,
    post_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    published_at: "2026-10-18T16:30:00Z",
  },
  {
    id: 8,
    post_id: "rv-20261016-scout-krx",
    source: "TWITTER",
    author: "LCK Transfer Tracker (@ya__ta__)",
    raw_text:
      "LCK 2027 transfer window update: KRX (DRX) linked with mid laner Scout, DNS linked with Ucal (with deokdam departing), NS linked with Sharvel/Calix alongside Deft, while DK retains Siwoo, Lucid and Career.",
    summary:
      "[트위터/LCK 스토브 정리] KRX 미드 스카웃(Scout) 영입설, DNS 유칼(Ucal)·농심 샤벨(Sharvel) 합류설 및 주요 구단 2027 계약 현황 (LCK 2027 Stove League Tracker: Scout to KRX, Ucal to DNS, Sharvel to NS)",
    player_slug: "scout",
    player_name: "Scout",
    current_team_short: "NS",
    target_team_short: "KRX",
    target_team_id: 8,
    league: "LCK",
    confidence: 78,
    post_url: "https://x.com/ya__ta__/status/2111103018879869195",
    published_at: "2026-10-16T16:00:00Z",
  },
  {
    id: 7,
    post_id: "rv-20261016-bro-retain",
    source: "TWITTER",
    author: "Sheep Esports / @ya__ta__",
    raw_text:
      "[Sources] Hanjin BRION is set to retain its whole starting roster (Casting, GIDEON, Roamer, Teddy, Namgung) for the LCK 2027 season.",
    summary:
      "[울루/오피셜] 한진 브리온(BRO), 테디(Teddy)·캐스팅·기드온·로머·남궁 2027 시즌 주전 5인 전원 재계약 성공 (Hanjin BRION retains full starting roster for LCK 2027)",
    player_slug: "teddy",
    player_name: "Teddy",
    current_team_short: "BRO",
    target_team_short: "BRO",
    target_team_id: 7,
    league: "LCK",
    confidence: 99,
    post_url: "https://x.com/ya__ta__/status/2111103018879869195",
    published_at: "2026-10-16T14:00:00Z",
  },
  {
    id: 6,
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
    id: 5,
    post_id: "rv-20261008-bdd-perfect-kt",
    source: "TWITTER",
    author: "Sheep Esports / RFT.GG",
    raw_text:
      "KT Rolster has officially extended the contracts of mid laner Gwak 'Bdd' Bo-seong and top laner Lee 'PerfecT' Seung-min for two more years through the end of the 2028 season.",
    summary:
      "[오피셜] kt 롤스터, 미드 비디디(Bdd) 및 탑 퍼펙트(PerfecT)와 2028년까지 2년 다년 재계약 체결 (Bdd and PerfecT extend contracts with KT Rolster until 2028)",
    player_slug: "bdd",
    player_name: "Bdd",
    current_team_short: "KT",
    target_team_short: "KT",
    target_team_id: 5,
    league: "LCK",
    confidence: 100,
    post_url: "https://rft.gg/news/kt-rolster-contract-bdd-perfect-2028",
    published_at: "2026-10-08T12:00:00Z",
  },
  {
    id: 4,
    post_id: "rv-20261005-piero-gx",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Korean support Kim 'Piero' Jung-hun is set to join GIANTX for the LEC 2027 season after standing out in the LFL with Solary.",
    summary:
      "[울루/Sheep Esports] 한국인 서포터 피에로(Piero), 2027 시즌 LEC GIANTX 합류 합의 (Korean support Piero set to join GIANTX for LEC 2027 season)",
    player_slug: "piero",
    player_name: "Piero",
    current_team_short: "FA",
    target_team_short: "GX",
    target_team_id: 29,
    league: "LEC",
    confidence: 95,
    post_url: "https://x.com/Sheep_Esports/status/2103852549631586804",
    published_at: "2026-10-05T16:00:00Z",
  },
  {
    id: 3,
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
    id: 2,
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
    id: 1,
    post_id: "rv-20260922-jun-jackies-th",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] Support Jun 🇰🇷 is set to join Team Heretics in the #LEC for 2027 alongside mid laner Jackies. Report by @LEC_Wooloo, @anonimotum & @i_Eros_",
    summary:
      "[울루/Sheep Esports] GIANTX 서포터 준(Jun) & 미드 재키스(Jackies), 2027 시즌 Team Heretics 동반 이적 확정 (Jun and Jackies set to join Team Heretics for 2027 LEC)",
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
];

// 검증된 트위터(@Sheep_Esports, @LEC_Wooloo, @rostermania_lol, @ya__ta__, 공식 계정) 및 웨이보(涵艺 한이, 恋恋红茶 롄롄홍차, 召唤师Park 소환사 Park 등) 출처 기반 2027 예상 로스터 하이라이트 & 원본 링크 연결
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
  taeyoon: {
    predicted_team_id: 5,
    confidence: 93,
    status: "RUMORED",
    source_url: "https://x.com/Sheep_Esports/status/2111841342414336494",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] 랩터·켈린·태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력",
  },
  perfect: {
    predicted_team_id: 5,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://rft.gg/news/kt-rolster-contract-bdd-perfect-2028",
    author: "Sheep Esports / RFT.GG",
    summary:
      "[오피셜] kt 롤스터, 탑 퍼펙트(PerfecT) 및 미드 비디디(Bdd)와 2028년까지 2년 연장 계약 체결",
  },
  casting: {
    predicted_team_id: 7,
    confidence: 99,
    status: "CONFIRMED",
    source_url: "https://x.com/ya__ta__/status/2111103018879869195",
    author: "Sheep Esports / @ya__ta__",
    summary:
      "[울루/오피셜] 한진 브리온(BRO), 캐스팅(Casting) 포함 2027 시즌 주전 5인 전원 재계약 성공",
  },
  gideon: {
    predicted_team_id: 7,
    confidence: 99,
    status: "CONFIRMED",
    source_url: "https://x.com/ya__ta__/status/2111103018879869195",
    author: "Sheep Esports / @ya__ta__",
    summary:
      "[울루/오피셜] 한진 브리온(BRO), 기드온(GIDEON) 포함 2027 시즌 주전 5인 전원 재계약 성공",
  },
  roamer: {
    predicted_team_id: 7,
    confidence: 99,
    status: "CONFIRMED",
    source_url: "https://x.com/ya__ta__/status/2111103018879869195",
    author: "Sheep Esports / @ya__ta__",
    summary:
      "[울루/오피셜] 한진 브리온(BRO), 로머(Roamer) 포함 2027 시즌 주전 5인 전원 재계약 성공",
  },
  namgung: {
    predicted_team_id: 7,
    confidence: 99,
    status: "CONFIRMED",
    source_url: "https://x.com/ya__ta__/status/2111103018879869195",
    author: "Sheep Esports / @ya__ta__",
    summary:
      "[울루/오피셜] 한진 브리온(BRO), 남궁(Namgung) 포함 2027 시즌 주전 5인 전원 재계약 성공",
  },
  ucal: {
    predicted_team_id: 10,
    confidence: 78,
    status: "RUMORED",
    source_url: "https://x.com/ya__ta__/status/2111103018879869195",
    author: "LCK Transfer Tracker (@ya__ta__)",
    summary:
      "[트위터/LCK 스토브 정리] 미드라이너 유칼(Ucal), 2027 시즌 DN 수퍼스(DNS) 합류 유력",
  },
  sharvel: {
    predicted_team_id: 9,
    confidence: 78,
    status: "RUMORED",
    source_url: "https://x.com/ya__ta__/status/2111103018879869195",
    author: "LCK Transfer Tracker (@ya__ta__)",
    summary:
      "[트위터/LCK 스토브 정리] 정글러 샤벨(Sharvel), 2027 시즌 농심 레드포스(NS) 합류설",
  },
  siwoo: {
    predicted_team_id: 4,
    confidence: 98,
    status: "CONFIRMED",
    source_url: "https://x.com/ya__ta__/status/2111103018879869195",
    author: "LCK Transfer Tracker (@ya__ta__)",
    summary:
      "[LCK 계약 현황] 디플러스 기아(DK), 탑 시우(Siwoo)·정글 루시드(Lucid)·서포터 커리어(Career) 2027 시즌 잔류 확정",
  },
  zeka: {
    predicted_team_id: 3,
    confidence: 98,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2266865584/Rpvgka3gG",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    summary:
      "[웨이보/롄롄홍차] 한화생명 제카(Zeka)·구마유시(Gumayusi)·딜라이트(Delight), 2년 다년 계약으로 2027 시즌 잔류 확정",
  },
  gumayusi: {
    predicted_team_id: 3,
    confidence: 98,
    status: "CONFIRMED",
    source_url: "https://weibo.com/2266865584/Rpvgka3gG",
    author: "恋恋红茶_244 (@恋恋红茶_244)",
    summary:
      "[웨이보/롄롄홍차] 한화생명 구마유시(Gumayusi)·제카(Zeka)·딜라이트(Delight), 2년 다년 계약으로 2027 시즌 잔류 확정",
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
  jackies: {
    predicted_team_id: 28,
    confidence: 97,
    status: "RUMORED",
    source_url: "https://x.com/Sheep_Esports/status/2116175898311643603",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] GIANTX 미드라이너 재키스(Jackies), 2027 시즌 Team Heretics 합류 확정",
  },
  massu: {
    predicted_team_id: 23,
    confidence: 72,
    status: "RUMORED",
    source_url: "https://rostermania.lol/en/player/massu",
    author: "Rostermania (@rostermania_lol)",
    summary:
      "[Rostermania] 조조편의 요청으로 Movistar KOI가 FlyQuest 원딜 마수(Massu) 영입 타진 중",
  },
  quad: {
    predicted_team_id: 30,
    confidence: 74,
    status: "RUMORED",
    source_url: "https://rostermania.lol/en/player/quad",
    author: "Rostermania (@rostermania_lol)",
    summary:
      "[Rostermania] NAVI, 2027 시즌 미드라이너로 FlyQuest 한국인 미드 쿼드(Quad) 영입 문의",
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
  stend: {
    predicted_team_id: null,
    confidence: 100,
    status: "FA",
    source_url: "https://x.com/Stend_lol/status/2104595334106104250",
    author: "Stend (@Stend_lol)",
    summary:
      "[오피셜] Team Heretics 서포터 스텐드(Stend), 선수 생활 은퇴 및 코칭스태프 전향 발표",
  },
  daglas: {
    predicted_team_id: 26,
    confidence: 75,
    status: "RUMORED",
    source_url: "https://x.com/rostermania_lol/status/2113338720568942749",
    author: "Rostermania (@rostermania_lol)",
    summary:
      "[Rostermania] Team Heretics 정글러 다글라스(Daglas), 2027 시즌 Team Vitality 트라이아웃 참가",
  },
  naaknako: {
    predicted_team_id: 21,
    confidence: 82,
    status: "RUMORED",
    source_url: "https://rostermania.lol/en/player/naak-nako",
    author: "Sheep Esports (LEC_Wooloo)",
    summary:
      "[울루/Sheep Esports] G2·MKOI·NAVI, 바이탈리티 탑 낙나코(Naak Nako) 영입전 참전… G2 최우선 타깃",
  },
};
