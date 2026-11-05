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
    id: 34,
    post_id: "rv-20261105-zeus-t1",
    source: "COMMUNITY",
    author: "인벤 스토브 찌라시 (Inven)",
    raw_text:
      "제우스 FA 및 에이전트 변경 소식과 함께 폭마갤·커뮤니티 찌라시에서도 한화생명 잔류보다 T1 복귀 가능성이 높다는 이야기가 확산 중.",
    summary:
      "[스토브 찌라시] 한화생명 제우스(Zeus), 에이전트 변경 및 2027 시즌 T1 전격 복귀설 급부상 (Zeus rumored to return to T1 after agency change)",
    player_slug: "zeus",
    player_name: "Zeus",
    current_team_short: "HLE",
    target_team_short: "T1",
    target_team_id: 1,
    league: "LCK",
    confidence: 78,
    post_url: "https://www.inven.co.kr/board/lol/4625/4274150",
    published_at: "2026-11-05T15:30:00Z",
  },
  {
    id: 33,
    post_id: "rv-20261105-lyncas-g2",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Lithuanian jungler Linas 'Lyncas' Nauncikas is set to join G2 Esports ahead of the 2027 LEC season, replacing SkewMond on the active starting roster and reuniting with coach Pad.",
    summary:
      "[울루/Sheep Esports] G2 Esports, 바이탈리티 정글러 린카스(Lyncas) 2027 시즌 영입 합의 (Lyncas set to join G2 Esports ahead of 2027 LEC season)",
    player_slug: "lyncas",
    player_name: "Lyncas",
    current_team_short: "VIT",
    target_team_short: "G2",
    target_team_id: 21,
    league: "LEC",
    confidence: 95,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xnrlza/sources_lyncas_set_to_join_g2_esports_ahead_of/",
    published_at: "2026-11-05T13:20:00Z",
  },
  {
    id: 32,
    post_id: "rv-20261105-skewmond-g2",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Rudy 'SkewMond' Semaan won't continue on G2 Esports' active roster in 2027 despite being under contract until November 2028, as G2 restructures its jungle-coaching duo.",
    summary:
      "[울루/Sheep Esports] 스큐몬드(SkewMond), 2027 시즌 G2 주전 로스터 제외 및 타 팀 이적 타진 (SkewMond won't continue on G2 active roster in 2027)",
    player_slug: "skewmond",
    player_name: "SkewMond",
    current_team_short: "G2",
    target_team_short: "VIT",
    target_team_id: 26,
    league: "LEC",
    confidence: 90,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xnpaei/sources_skewmond_wont_continue_on_g2_esports/",
    published_at: "2026-11-05T11:45:00Z",
  },
  {
    id: 31,
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
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xnzw9p/sheep_esports_sources_movistar_koi_navi_and_g2/",
    published_at: "2026-11-05T09:10:00Z",
  },
  {
    id: 30,
    post_id: "rv-20261104-viper-krx",
    source: "COMMUNITY",
    author: "인벤 스토브 찌라시 (Inven)",
    raw_text:
      "이번 스토브리그 원딜 최대어는 바이퍼(Viper)의 LCK 리턴 여부. DRX가 롤 게임단에 대대적 투자를 예고하며 스카웃·바이퍼·도란·리핸즈 등 대어급 매물에 대형 오퍼를 넣었다는 찌라시.",
    summary:
      "[스토브 찌라시] BLG 바이퍼(Viper) LCK 복귀설 및 키움 DRX(KRX) 초대형 영입 오퍼 타진 (Viper rumored to return to LCK with massive offer from DRX)",
    player_slug: "viper",
    player_name: "Viper",
    current_team_short: "BLG",
    target_team_short: "KRX",
    target_team_id: 8,
    league: "LCK",
    confidence: 74,
    post_url: "https://www.inven.co.kr/board/lol/4625/4273398",
    published_at: "2026-11-04T21:30:00Z",
  },
  {
    id: 29,
    post_id: "rv-20261104-kanavi-hle",
    source: "COMMUNITY",
    author: "인벤 스토브 찌라시 (Inven)",
    raw_text:
      "한화생명e스포츠(HLE) 카나비(Kanavi) 선수의 거취와 관련해 구단 공식 축전 및 시장 상황상 한화생명이 주전 코어 라인업(카나비-제카-구마유시-딜라이트) 재계약 및 유지를 택할 가능성이 높다는 분석.",
    summary:
      "[스토브 찌라시] 한화생명(HLE), 정글러 카나비(Kanavi) 재계약 및 주전 라인업 잔류 기조 유력 (HLE expected to re-sign jungler Kanavi for 2027)",
    player_slug: "kanavi",
    player_name: "Kanavi",
    current_team_short: "HLE",
    target_team_short: "HLE",
    target_team_id: 3,
    league: "LCK",
    confidence: 85,
    post_url: "https://www.inven.co.kr/board/lol/4625/4273189",
    published_at: "2026-11-04T18:00:00Z",
  },
  {
    id: 28,
    post_id: "rv-20261104-369-tes",
    source: "COMMUNITY",
    author: "인벤 스토브 찌라시 (Inven)",
    raw_text:
      "2026년 11월 17일 TES와의 계약 만료를 앞둔 탑라이너 369 선수가 LPL 및 LCK 스토브리그 탑 영입 1순위 매물로 꼽히며 TES의 최우선 재계약 협상이 진행 중.",
    summary:
      "[스토브 찌라시] TES 탑라이너 369, 계약 만료 앞두고 스토브리그 최우선 재계약 협상 돌입 (TES top laner 369 enters key extension talks ahead of November expiry)",
    player_slug: "369",
    player_name: "369",
    current_team_short: "TES",
    target_team_short: "TES",
    target_team_id: 12,
    league: "LPL",
    confidence: 84,
    post_url: "https://www.inven.co.kr/board/lol/4625/4273612",
    published_at: "2026-11-04T15:10:00Z",
  },
  {
    id: 27,
    post_id: "rv-20261104-doran-gen",
    source: "COMMUNITY",
    author: "인벤 스토브 찌라시 (Inven)",
    raw_text:
      "제우스의 T1 복귀설과 맞물려 T1 도란(Doran)과 한화생명·젠지 간 연쇄 탑 이동 시나리오가 스토브리그 최대 화두로 부상. 도란의 T1 재계약 여부 및 빅클럽 이동 루머.",
    summary:
      "[스토브 찌라시] T1 도란(Doran), FA 계약 만료 앞두고 재계약 및 빅클럽 연쇄 이동설 (Doran at the center of LCK top lane dominoes for 2027)",
    player_slug: "doran",
    player_name: "Doran",
    current_team_short: "T1",
    target_team_short: "GEN",
    target_team_id: 2,
    league: "LCK",
    confidence: 70,
    post_url: "https://www.inven.co.kr/board/lol/4625/4273392",
    published_at: "2026-11-04T12:20:00Z",
  },
  {
    id: 26,
    post_id: "rv-20261104-kiin-hle",
    source: "COMMUNITY",
    author: "인벤 스토브 찌라시 (Inven)",
    raw_text:
      "한화생명에서 제우스가 이탈할 경우 1순위 대체자로 젠지 기인(Kiin) 영입에 나설 것이라는 스토브리그 연쇄 이동 시나리오가 제기됨.",
    summary:
      "[스토브 찌라시] 한화생명(HLE), 제우스 이탈 대비해 젠지 탑 기인(Kiin) 영입 시나리오 부상 (HLE rumored to target Gen.G top laner Kiin if Zeus departs)",
    player_slug: "kiin",
    player_name: "Kiin",
    current_team_short: "GEN",
    target_team_short: "HLE",
    target_team_id: 3,
    league: "LCK",
    confidence: 72,
    post_url: "https://www.inven.co.kr/board/lol/4625/4273322",
    published_at: "2026-11-04T09:40:00Z",
  },
  {
    id: 25,
    post_id: "rv-20261103-siwoo-dk",
    source: "COMMUNITY",
    author: "인벤 스토브 찌라시 (Inven)",
    raw_text:
      "각 팀 2027 시즌 탑 구도 정리: 디플러스 기아(DK)는 전시우(Siwoo) 선수가 2027년 11월까지 계약되어 있어 주전 탑 잔류 확정.",
    summary:
      "[스토브 정리] 디플러스 기아(DK), 에이스 탑 시우(Siwoo) 2027 시즌 주전 잔류 확정 (Dplus KIA locks in top laner Siwoo for 2027 season)",
    player_slug: "siwoo",
    player_name: "Siwoo",
    current_team_short: "DK",
    target_team_short: "DK",
    target_team_id: 4,
    league: "LCK",
    confidence: 98,
    post_url: "https://www.inven.co.kr/board/lol/4625/4273151",
    published_at: "2026-11-03T19:00:00Z",
  },
  {
    id: 24,
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
    post_url: "https://rostermania.lol/en/lec",
    published_at: "2026-11-02T16:30:00Z",
  },
  {
    id: 23,
    post_id: "rv-20261101-lospa-sk",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Korean support Park 'Lospa' Joon-hyeong is set to join SK Gaming for the 2027 LEC season after leaving Fnatic, reaching a verbal agreement with the German organization.",
    summary:
      "[울루/Sheep Esports] 프나틱 서포터 로스파(Lospa), 2027 시즌 SK Gaming 이적 구두 합의 (Fnatic support Lospa set to join SK Gaming for 2027 LEC)",
    player_slug: "lospa",
    player_name: "Lospa",
    current_team_short: "FNC",
    target_team_short: "SK",
    target_team_id: 27,
    league: "LEC",
    confidence: 95,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xl8d20/sources_lospa_set_to_join_sk_gaming_for_2027_in/",
    published_at: "2026-11-01T18:45:00Z",
  },
  {
    id: 22,
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
    post_url: "https://rostermania.lol/en/lec",
    published_at: "2026-11-01T14:15:00Z",
  },
  {
    id: 21,
    post_id: "rv-20261030-tracyn-th",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Official / Sources] Top laner Sebastian 'Tracyn' Wojtoń has extended his contract with Team Heretics until the end of the 2028 LEC season.",
    summary:
      "[울루/오피셜] Team Heretics, 탑라이너 트레이신(Tracyn)과 2028년까지 다년 연장 계약 체결 (Tracyn extends contract with Team Heretics until 2028)",
    player_slug: "tracyn",
    player_name: "Tracyn",
    current_team_short: "TH",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 100,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xjinul/official_tracyn_extends_with_team_heretics_until/",
    published_at: "2026-10-30T17:00:00Z",
  },
  {
    id: 20,
    post_id: "rv-20261029-hype-th",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Korean AD Carry 변정현 'Hype' has reached an agreement to remain with Team Heretics in 2027 after accepting a pay cut to stay with the revamped roster.",
    summary:
      "[울루/Sheep Esports] 한국인 원딜 하이프(Hype), 연봉 조정 수용하며 2027 시즌 Team Heretics 잔류 합의 (Hype reaches agreement to remain with Team Heretics in 2027)",
    player_slug: "hype",
    player_name: "Hype",
    current_team_short: "TH",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 96,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xirr7z/sheep_esports_hype_has_reached_an_agreement_to/",
    published_at: "2026-10-29T16:20:00Z",
  },
  {
    id: 19,
    post_id: "rv-20261028-rhilech-navi",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Natus Vincere (NAVI) plans to rebuild its entire 2027 LEC roster around jungler Enes 'Rhilech' Uçan while allowing Maynter, Poby, SamD and Parus to explore options.",
    summary:
      "[울루/Sheep Esports] NAVI, 2027 시즌 정글러 릴레흐(Rhilech) 중심 전면 리빌딩 확정 (NAVI to rebuild 2027 LEC roster around jungler Rhilech)",
    player_slug: "rhilech",
    player_name: "Rhilech",
    current_team_short: "NAVI",
    target_team_short: "NAVI",
    target_team_id: 30,
    league: "LEC",
    confidence: 95,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xhx4sq/sheep_esports_sources_navi_to_rebuild_around/",
    published_at: "2026-10-28T15:10:00Z",
  },
  {
    id: 18,
    post_id: "rv-20261027-tarzan-wbg",
    source: "WEIBO",
    author: "웨이보 / 인벤 찌라시",
    raw_text:
      "AL의 월즈 일정 종료 후 중국 웨이보 및 커뮤니티에서 정글러 타잔(Tarzan) 선수가 새 시즌 더 높은 체급의 로스터(WBG 등)로 이적할 가능성에 대한 논의가 확산 중.",
    summary:
      "[웨이보/인벤] AL 정글러 타잔(Tarzan), 2027 시즌 WBG 등 상위권 구단 이적 가능성 부상 (AL jungler Tarzan linked with potential move to WBG for 2027)",
    player_slug: "tarzan",
    player_name: "Tarzan",
    current_team_short: "AL",
    target_team_short: "WBG",
    target_team_id: 14,
    league: "LPL",
    confidence: 73,
    post_url: "https://www.inven.co.kr/board/lol/4625/4270740",
    published_at: "2026-10-27T14:00:00Z",
  },
  {
    id: 17,
    post_id: "rv-20261026-serin-th",
    source: "TWITTER",
    author: "Team Heretics / Sheep Esports",
    raw_text:
      "Today we part ways with Serin. Following his departure from Team Heretics, mid laner Tolga 'Serin' Ölmez is set to return to Galions for the 2027 season.",
    summary:
      "[오피셜/울루] 미드라이너 세린(Serin), Team Heretics와 계약 종료 및 2027 시즌 Galions 복귀 (Serin parts ways with Team Heretics and returns to Galions)",
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
    id: 16,
    post_id: "rv-20261023-3xa-sk",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] AD Carry Thomas '3XA' Foucou (formerly Exakick) is set to rejoin SK Gaming in the LEC for the 2027 season, pairing with support Lospa.",
    summary:
      "[울루/Sheep Esports] 원딜 3XA(구 Exakick), 2027 시즌 SK Gaming 전격 복귀 확정 (3XA formerly Exakick set to rejoin SK Gaming in the LEC)",
    player_slug: "3xa",
    player_name: "3XA",
    current_team_short: "FA",
    target_team_short: "SK",
    target_team_id: 27,
    league: "LEC",
    confidence: 95,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xdfq05/sheep_esports_sources_3xa_formerly_exakick_set_to/",
    published_at: "2026-10-23T16:40:00Z",
  },
  {
    id: 15,
    post_id: "rv-20261022-razork-th",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Spanish jungler Iván 'Razork' Martín Díaz has chosen Team Heretics over GIANTX and is set to join Team Heretics for the 2027 LEC season after five years with Fnatic.",
    summary:
      "[울루/Sheep Esports] 프나틱 간판 정글러 라조크(Razork), 2027 시즌 Team Heretics 전격 이적 합의 (Razork set to join Team Heretics in the LEC for 2027)",
    player_slug: "razork",
    player_name: "Razork",
    current_team_short: "FNC",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 96,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xcsbex/sources_razork_is_set_to_join_team_heretics_in/",
    published_at: "2026-10-22T19:15:00Z",
  },
  {
    id: 14,
    post_id: "rv-20261022-maynter-vit",
    source: "TWITTER",
    author: "EsportsBet / Rostermania",
    raw_text:
      "As NAVI rebuilds around Rhilech for 2027, Ukrainian top laner Volodymyr 'Maynter' Sorokin and jungler Daglas have participated in tryouts for Team Vitality.",
    summary:
      "[Rostermania] NAVI 탑라이너 메인터(Maynter) 및 정글러 다글라스(Daglas), Team Vitality 트라이아웃 진행 (Maynter and Daglas in tryouts for Team Vitality)",
    player_slug: "maynter",
    player_name: "Maynter",
    current_team_short: "NAVI",
    target_team_short: "VIT",
    target_team_id: 26,
    league: "LEC",
    confidence: 75,
    post_url:
      "https://esportsbet.io/news/lol/breaking/details/Global/27446/NAVI-REPORTEDLY-PLANS-2027-REBUILD-AROUND-RHILECH/",
    published_at: "2026-10-22T14:00:00Z",
  },
  {
    id: 13,
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
    id: 12,
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
    id: 11,
    post_id: "rv-20261019-scout-krx",
    source: "COMMUNITY",
    author: "인벤 LCK 스토브리그 찌라시",
    raw_text:
      "LCK 스토브리그 찌라시: 키움 DRX(KRX)가 롤 게임단에 집중 투자하며 농심 스카웃(Scout) 선수를 중심으로 2027 로스터를 구축하려 한다는 관계자 썰이 제기됨.",
    summary:
      "[LCK 찌라시] 키움 DRX(KRX), 미드 스카웃(Scout) 중심 2027 리빌딩 및 집중 투자 추진설 (DRX rumored to build 2027 roster around mid laner Scout)",
    player_slug: "scout",
    player_name: "Scout",
    current_team_short: "NS",
    target_team_short: "KRX",
    target_team_id: 8,
    league: "LCK",
    confidence: 77,
    post_url: "https://www.inven.co.kr/board/lol/4625/4268972",
    published_at: "2026-10-19T15:30:00Z",
  },
  {
    id: 10,
    post_id: "rv-20261019-cuzz-dns",
    source: "COMMUNITY",
    author: "인벤 LCK 스토브리그 찌라시",
    raw_text:
      "KT가 피어엑스 정글러 랩터(Raptor)를 영입함에 따라 기존 KT 정글러 커즈(Cuzz) 선수가 반등을 노리는 DN 수퍼스(DNS)로 이적한다는 스토브리그 찌라시 확산.",
    summary:
      "[LCK 찌라시] KT 정글러 커즈(Cuzz), DN 수퍼스(DNS) 이적설 급부상… 샤벨은 농심행 루머 (KT jungler Cuzz heavily linked with move to DN SOOPers for 2027)",
    player_slug: "cuzz",
    player_name: "Cuzz",
    current_team_short: "KT",
    target_team_short: "DNS",
    target_team_id: 10,
    league: "LCK",
    confidence: 80,
    post_url: "https://www.inven.co.kr/board/lol/4625/4268591",
    published_at: "2026-10-19T11:20:00Z",
  },
  {
    id: 9,
    post_id: "rv-20261019-pyosik-ns",
    source: "COMMUNITY",
    author: "인벤 LCK 스토브리그 찌라시",
    raw_text:
      "피어엑스 3인방이 KT로 향하고 커즈가 DN 수퍼스로 간다는 찌라시와 함께, 농심 레드포스(NS)가 데프트(Deft) 영입에 맞춰 정글러 표식(Pyosik) 또는 샤벨(Sharvel)을 영입한다는 소식.",
    summary:
      "[LCK 찌라시] 농심 레드포스(NS), 데프트 합류 맞춰 정글러 표식(Pyosik) 영입 타진설 (Nongshim RedForce linked with jungler Pyosik alongside Deft)",
    player_slug: "pyosik",
    player_name: "Pyosik",
    current_team_short: "DNS",
    target_team_short: "NS",
    target_team_id: 9,
    league: "LCK",
    confidence: 76,
    post_url: "https://www.inven.co.kr/board/lol/4625/4268665",
    published_at: "2026-10-19T09:00:00Z",
  },
  {
    id: 8,
    post_id: "rv-20261018-raptor-kellin-taeyoon-kt",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Raptor, Kellin and Taeyoon are expected to join KT Rolster together for the LCK 2027 season, completing a 2027 KT roster of PerfecT, Raptor, Bdd, Taeyoon and Kellin.",
    summary:
      "[울루/Sheep Esports] 피어엑스 랩터(Raptor)·켈린(Kellin) & 태윤(Taeyoon), 2027 시즌 KT 롤스터 동반 합류 유력 (Raptor, Kellin, and Taeyoon expected to join KT Rolster for LCK 2027)",
    player_slug: "raptor",
    player_name: "Raptor",
    current_team_short: "BFX",
    target_team_short: "KT",
    target_team_id: 5,
    league: "LCK",
    confidence: 93,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1x966ie/sources_raptor_kellin_and_taeyoon_expected_to/",
    published_at: "2026-10-18T17:00:00Z",
  },
  {
    id: 7,
    post_id: "rv-20261018-kellin-kt",
    source: "COMMUNITY",
    author: "Sheep Esports / 인벤",
    raw_text:
      "Sheep Esports 보도에 따르면 BNK 피어엑스의 서포터 켈린(Kellin)과 정글러 랩터(Raptor), 원딜 태윤(Taeyoon)이 2027 시즌 KT 롤스터로 이적해 퍼펙트-랩터-비디디-태윤-켈린 라인업을 구축할 예정.",
    summary:
      "[울루/인벤] 서포터 켈린(Kellin) & 원딜 태윤(Taeyoon), 2027 시즌 KT 롤스터 이적 유력 (Kellin and Taeyoon expected to form KT Rolster's 2027 bot lane)",
    player_slug: "kellin",
    player_name: "Kellin",
    current_team_short: "BFX",
    target_team_short: "KT",
    target_team_id: 5,
    league: "LCK",
    confidence: 93,
    post_url: "https://www.inven.co.kr/board/lol/4625/4268674",
    published_at: "2026-10-18T16:30:00Z",
  },
  {
    id: 6,
    post_id: "rv-20261016-bro-retain",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
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
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1x7hrys/sheep_esports_hanjin_brion_resigns_full_player/",
    published_at: "2026-10-16T14:00:00Z",
  },
  {
    id: 5,
    post_id: "rv-20261010-deft-ns",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Legendary AD Carry Kim 'Deft' Hyuk-kyu is set to return from mandatory military service and join Nongshim RedForce for the LCK 2027 season.",
    summary:
      "[울루/Sheep Esports] '중꺾마' 데프트(Deft), 전역 후 2027 시즌 농심 레드포스(NS) 전격 합류 유력 (Deft set to join Nongshim RedForce for LCK 2027 after military service)",
    player_slug: "deft",
    player_name: "Deft",
    current_team_short: "FA",
    target_team_short: "NS",
    target_team_id: 9,
    league: "LCK",
    confidence: 94,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1x2i6eu/sheep_esports_deft_is_set_to_join_nongshim/",
    published_at: "2026-10-10T15:00:00Z",
  },
  {
    id: 4,
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
    id: 3,
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
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1wydjy5/sheep_esports_sources_piero_set_to_join_giantx/",
    published_at: "2026-10-05T16:00:00Z",
  },
  {
    id: 2,
    post_id: "rv-20260929-angel-jdg",
    source: "WEIBO",
    author: "JD Gaming Official / JJANG.GG",
    raw_text:
      "JD Gaming officially announces the signing of veteran mid laner Xiang 'Angel' Tao ahead of the upcoming LPL stove league window.",
    summary:
      "[웨이보/오피셜] JD Gaming(JDG), 베테랑 미드라이너 엔젤(Angel) 영입 발표 (JD Gaming signs mid laner Angel from EDward Gaming)",
    player_slug: "angel",
    player_name: "Angel",
    current_team_short: "EDG",
    target_team_short: "JDG",
    target_team_id: 13,
    league: "LPL",
    confidence: 100,
    post_url: "https://jjang.gg/stove-league/lpl",
    published_at: "2026-09-29T10:00:00Z",
  },
  {
    id: 1,
    post_id: "rv-20260922-jun-jackies-th",
    source: "TWITTER",
    author: "Sheep Esports (LEC_Wooloo)",
    raw_text:
      "[Sources] Support Yoon 'Jun' Se-jun is set to join Team Heretics for the 2027 LEC season after delaying his military service, alongside former GIANTX teammate Jackies.",
    summary:
      "[울루/Sheep Esports] GIANTX 서포터 준(Jun) & 미드 재키스(Jackies), 2027 시즌 Team Heretics 동반 이적 확정 (Jun and Jackies set to join Team Heretics for 2027 LEC)",
    player_slug: "jun",
    player_name: "Jun",
    current_team_short: "GX",
    target_team_short: "TH",
    target_team_id: 28,
    league: "LEC",
    confidence: 97,
    post_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1wnel61/sheep_esports_support_jun_is_set_to_join_team/",
    published_at: "2026-09-22T15:00:00Z",
  },
];

// 단일 찌라시에서 동시에 언급된 선수들(예: 태윤->KT, 퍼펙트->KT 잔류, 브리온 5인 잔류, 재키스->TH, 쿼드->NAVI, 마수->MKOI, 조조편->MKOI 등)까지 모두 예상 로스터 하이라이트 & 원본 링크 연결
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
    source_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1x966ie/sources_raptor_kellin_and_taeyoon_expected_to/",
    author: "Sheep Esports (LEC_Wooloo)",
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
    source_url: "https://www.inven.co.kr/board/lol/4625/4269435",
    author: "Sheep Esports / 인벤",
    summary:
      "[오피셜] 한진 브리온(BRO), 캐스팅(Casting) 포함 2027 시즌 주전 5인 전원 재계약 성공",
  },
  gideon: {
    predicted_team_id: 7,
    confidence: 99,
    status: "CONFIRMED",
    source_url: "https://www.inven.co.kr/board/lol/4625/4269435",
    author: "Sheep Esports / 인벤",
    summary:
      "[오피셜] 한진 브리온(BRO), 기드온(GIDEON) 포함 2027 시즌 주전 5인 전원 재계약 성공",
  },
  roamer: {
    predicted_team_id: 7,
    confidence: 99,
    status: "CONFIRMED",
    source_url: "https://www.inven.co.kr/board/lol/4625/4269435",
    author: "Sheep Esports / 인벤",
    summary:
      "[오피셜] 한진 브리온(BRO), 로머(Roamer) 포함 2027 시즌 주전 5인 전원 재계약 성공",
  },
  namgung: {
    predicted_team_id: 7,
    confidence: 99,
    status: "CONFIRMED",
    source_url: "https://www.inven.co.kr/board/lol/4625/4269435",
    author: "Sheep Esports / 인벤",
    summary:
      "[오피셜] 한진 브리온(BRO), 남궁(Namgung) 포함 2027 시즌 주전 5인 전원 재계약 성공",
  },
  sharvel: {
    predicted_team_id: 9,
    confidence: 74,
    status: "RUMORED",
    source_url: "https://www.inven.co.kr/board/lol/4625/4268591",
    author: "인벤 LCK 스토브리그 찌라시",
    summary: "[LCK 찌라시] DN 수퍼스 정글러 샤벨(Sharvel), 2027 시즌 농심 레드포스(NS) 이적설",
  },
  jackies: {
    predicted_team_id: 28,
    confidence: 97,
    status: "RUMORED",
    source_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1wkm1w5/sheep_esports_jackies_is_set_to_join_team/",
    author: "Sheep Esports (LEC_Wooloo)",
    summary:
      "[울루/Sheep Esports] GIANTX 미드라이너 재키스(Jackies), 2027 시즌 Team Heretics 합류 확정",
  },
  jojopyun: {
    predicted_team_id: 23,
    confidence: 100,
    status: "CONFIRMED",
    source_url: "https://x.com/MovistarKOILoL/status/2102381378566279627",
    author: "Movistar KOI Official",
    summary: "[오피셜] Movistar KOI, 미드라이너 조조편(Jojopyun)과 2027 시즌 재계약 발표",
  },
  massu: {
    predicted_team_id: 23,
    confidence: 72,
    status: "RUMORED",
    source_url: "https://rostermania.lol/en/lec",
    author: "Rostermania (@rostermania_lol)",
    summary:
      "[Rostermania] 조조편의 요청으로 Movistar KOI가 FlyQuest 원딜 마수(Massu) 영입 타진 중",
  },
  quad: {
    predicted_team_id: 30,
    confidence: 74,
    status: "RUMORED",
    source_url: "https://rostermania.lol/en/lec",
    author: "Rostermania (@rostermania_lol)",
    summary:
      "[Rostermania] NAVI, 2027 시즌 미드라이너로 FlyQuest 한국인 미드 쿼드(Quad) 영입 문의",
  },
  daglas: {
    predicted_team_id: 26,
    confidence: 75,
    status: "RUMORED",
    source_url: "https://rostermania.lol/en/lec",
    author: "Rostermania (@rostermania_lol)",
    summary:
      "[Rostermania] Team Heretics 정글러 다글라스(Daglas), 2027 시즌 Team Vitality 트라이아웃 참가",
  },
  naaknako: {
    predicted_team_id: 21,
    confidence: 82,
    status: "RUMORED",
    source_url:
      "https://www.reddit.com/r/leagueoflegends/comments/1xnzw9p/sheep_esports_sources_movistar_koi_navi_and_g2/",
    author: "Sheep Esports (LEC_Wooloo)",
    summary:
      "[울루/Sheep Esports] G2·MKOI·NAVI, 바이탈리티 탑 낙나코(Naak Nako) 영입전 참전… G2 최우선 타깃",
  },
};
