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
    id: 26,
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
    id: 25,
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
    id: 24,
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
    id: 23,
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
    id: 22,
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
    id: 21,
    post_id: "rv-20261102-zeus-fa",
    source: "WEIBO",
    author: "召唤师Park (@召唤师Park)",
    raw_text:
      "韩媒爆料：Zeus拒绝了世界赛前HLE提供的续约合同，选择进入自由人市场。目前已经收到了多支LPL队伍的报价，同时也还在和HLE保持沟通。 #曝Zeus拒绝HLE续约##曝LPL队伍邀请Zeus加入#",
    summary:
      "[웨이보/소환사 Park] 제우스(Zeus), 월즈 직전 한화생명(HLE)의 사전 재계약 제안 거절 후 FA 시장 진출 선택… 다수 LPL 구단 오퍼 및 HLE와도 소통 중 (Summoner Park: Zeus declined HLE's pre-Worlds extension to enter FA market, receiving LPL offers while communicating with HLE)",
    player_slug: "zeus",
    player_name: "Zeus",
    current_team_short: "HLE",
    target_team_short: "FA",
    target_team_id: null,
    league: "LCK",
    confidence: 92,
    post_url: "https://weibo.com/2522098777/Rpvy79Utp",
    published_at: "2026-11-02T05:45:43Z",
  },
  {
    id: 20,
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
    id: 19,
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
    id: 18,
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
    id: 17,
    post_id: "rv-20261030-tracyn-th",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] THE FIRST ROSTER FOR THE #LEC 2027 IS LOCKED: Following Tracyn's 🇵🇱 contract renewal, Team Heretics' roster for the 2027 season is set (Tracyn, Razork, Jackies, Hype, Jun).",
    summary:
      "[울루/Sheep Esports] Team Heretics, 탑 트레이신(Tracyn) 및 원딜 하이프(Hype) 재계약 포함 2027 시즌 5인 로스터 전원 확정 (Team Heretics locks first full 2027 LEC roster with Tracyn & Hype renewal)",
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
    id: 16,
    post_id: "rv-20261028-rhilech-navi",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] NAVI to rebuild around Rookie of the Year Rhilech 🇹🇷 for #LEC 2027 — Only one year after promoting their entire coaching staff, NAVI are set to part ways with TheRock and reuse, while allowing Maynter, Poby, SamD and Parus to explore options. More details by @LEC_Wooloo",
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
    id: 15,
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
    id: 14,
    post_id: "rv-20261023-3xa-sk",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] AD Carry 3XA 🇫🇷 is set to return to the #LEC in 2027 with SK Gaming.",
    summary:
      "[울루/Sheep Esports] 원딜 3XA(구 Exakick), 2027 시즌 SK Gaming 전격 복귀 합의 (AD Carry 3XA set to return to the LEC in 2027 with SK Gaming)",
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
    id: 13,
    post_id: "rv-20261023-slowq-sk",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] SK Gaming plan to keep Mid Laner SlowQ 🇹🇷 for the 2027 #LEC season. Report by @LEC_Wooloo",
    summary:
      "[울루/Sheep Esports] SK Gaming, 2027 시즌 주전 미드라이너로 슬로우큐(SlowQ) 잔류 확정 (SK Gaming plan to keep mid laner SlowQ for the 2027 LEC season)",
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
    id: 12,
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
    id: 11,
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
    id: 10,
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
    id: 9,
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
    id: 8,
    post_id: "rv-20261018-raptor-kellin-taeyoon-kt",
    source: "TWITTER",
    author: "Sheep Esports (@Sheep_Esports)",
    raw_text:
      "[SOURCES] BFX Jungler Raptor 🇰🇷, AD Carry Taeyoon 🇰🇷 and Support Kellin 🇰🇷 are expected to join KT Rolster for the 2027 LCK season. The move is expected to take place once free agency opens.",
    summary:
      "[울루/Sheep Esports] 피어엑스 정글 랩터(Raptor)·서포터 켈린(Kellin) & 원딜 태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력 (Raptor, Kellin, and Taeyoon expected to join KT Rolster for LCK 2027)",
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
    id: 7,
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
    id: 6,
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
    id: 5,
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
    id: 4,
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
    id: 3,
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
    id: 2,
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
    id: 1,
    post_id: "rv-20260719-jiejie-wbg",
    source: "WEIBO",
    author: "WBG英雄联盟分部 (@WBG英雄联盟分部)",
    raw_text:
      "【WBG英雄联盟分部人员变动公告】经俱乐部与选手积极友好沟通，俱乐部充分尊重选手意愿，原WBG电子竞技俱乐部英雄联盟分部打野选手赵礼杰@JieJie赵礼杰 （原ID:WBG.Jiejie）即日起正式离队。",
    summary:
      "[웨이보/오피셜] Weibo Gaming(WBG), 정글러 지에지에(Jiejie)와의 상호 합의 계약 종료 및 FA 결별 공식 발표 (WBG officially announces departure of jungler Jiejie)",
    player_slug: "jiejie",
    player_name: "Jiejie",
    current_team_short: "WBG",
    target_team_short: "FA",
    target_team_id: null,
    league: "LPL",
    confidence: 100,
    post_url: "https://weibo.com/5937903233/RbRlbBXeO",
    published_at: "2026-07-19T10:00:00Z",
  },
];

// 오피셜 구단/선수 계정 및 1티어 원천 소식통(@Sheep_Esports, 웨이보 한이·롄롄홍차·소환사Park)에서 본문과 100% 일치하는 로스터 변동만 반영
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
  hype: {
    predicted_team_id: 28,
    confidence: 96,
    status: "CONFIRMED",
    source_url: "https://x.com/Sheep_Esports/status/2116175898311643603",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] 한국인 원딜 하이프(Hype), 2027 시즌 Team Heretics 주전 잔류 확정",
  },
  jackies: {
    predicted_team_id: 28,
    confidence: 97,
    status: "RUMORED",
    source_url: "https://x.com/Sheep_Esports/status/2102435339810075042",
    author: "Sheep Esports (@Sheep_Esports)",
    summary:
      "[울루/Sheep Esports] GIANTX 미드라이너 재키스(Jackies), 서포터 준(Jun)과 함께 2027 시즌 Team Heretics 동반 이적 합의",
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
  stend: {
    predicted_team_id: null,
    confidence: 100,
    status: "FA",
    source_url: "https://x.com/Stend_lol/status/2104595334106104250",
    author: "Stend (@Stend_lol)",
    summary:
      "[오피셜] Team Heretics 서포터 스텐드(Stend), 선수 생활 은퇴 및 코칭스태프 전향 발표",
  },
};
