import { Rumor } from "./types";

export interface SeedRumor extends Omit<Rumor, "id" | "player_id" | "target_team_id" | "created_at"> {
  id: number;
  player_slug: string;
  player_name: string;
  current_team_short: string;
  target_team_short: string;
  target_team_id: number;
  league: string;
}

export const INITIAL_RUMORS: SeedRumor[] = [
  {
    id: 34,
    post_id: "tw-20261105-caliste-kc",
    source: "TWITTER",
    author: "LEC_Wooloo (Sheep Esports)",
    raw_text:
      "[Sources] Karmine Corp has officially locked in AD Carry prodigy Caliste Henry-Hennebert with a new long-term contract extension through 2029, building their entire LEC future around the French star.",
    summary:
      "[울루] 카르민 코프(KC), 신성 칼리스트(Caliste)와 2029년까지 장기 재계약 확정 (Karmine Corp officially locks in Caliste with long-term extension through 2029)",
    player_slug: "caliste",
    player_name: "Caliste",
    current_team_short: "KC",
    target_team_short: "KC",
    target_team_id: 25,
    league: "LEC",
    confidence: 95,
    post_url:
      "https://sheepesports.com/articles/sources-caliste-extends-with-karmine-corp-2029/2026-11-05",
    published_at: "2026-11-05T15:20:00Z",
  },
  {
    id: 33,
    post_id: "tw-20261105-mireu-fur",
    source: "TWITTER",
    author: "Alejandro Gomis",
    raw_text:
      "[Sources] Brazilian organization FURIA is in advanced negotiations to sign Korean mid laner Jeong 'Mireu' Jo-bin from Vivo Keyd Stars. FURIA is looking to replace Tutsz for the 2027 season.",
    summary:
      "[고미스] 브라질 FURIA, VKS 한국인 미드 미르(Mireu) 영입 협상 진전 (FURIA in advanced negotiations to sign Korean mid laner Mireu from VKS)",
    player_slug: "mireu",
    player_name: "Mireu",
    current_team_short: "VKS",
    target_team_short: "FUR",
    target_team_id: 51,
    league: "CBLOL",
    confidence: 80,
    post_url:
      "https://sheepesports.com/articles/sources-furia-negotiations-mireu-vks/2026-11-05",
    published_at: "2026-11-05T14:15:00Z",
  },
  {
    id: 32,
    post_id: "cm-20261105-kingen-ns",
    source: "COMMUNITY",
    author: "한상용 (H-Dragon)",
    raw_text:
      "농심 탑 킹겐(Kingen) 선수 거취 물어보시는 분들이 많은데, 농심 프론트가 킹겐 선수를 리빌딩의 핵심 기둥으로 잡고 있어서 적극적으로 붙잡고 있습니다. 타 팀 오퍼도 있었지만 킹겐 선수 역시 팀에 대한 책임감이 커서 잔류 쪽으로 기우는 분위기입니다.",
    summary:
      "[한상용] 농심 레드포스, 탑 킹겐(Kingen)과 재계약 유력… 리빌딩 기둥 잔류 (Nongshim RedForce likely re-signing top laner Kingen as cornerstone)",
    player_slug: "kingen",
    player_name: "Kingen",
    current_team_short: "NS",
    target_team_short: "NS",
    target_team_id: 9,
    league: "LCK",
    confidence: 85,
    post_url: "https://chzzk.naver.com/live/hdragon/community/98654",
    published_at: "2026-11-05T12:30:00Z",
  },
  {
    id: 31,
    post_id: "wb-20261105-weiwei-tes",
    source: "WEIBO",
    author: "丶涵艺 (Hanyi)",
    raw_text:
      "TES打野位正在加速重组，naiyou经验尚浅，滔搏已经和LNG就Weiwei的转会事宜进行了三轮谈判。Weiwei本人非常看好369和JackeyLove的阵容竞争力，转会推进速度很快。",
    summary:
      "[한이] TES, LNG 정글러 웨이웨이(Weiwei) 영입 협상 급진전 (TES advancing negotiations to acquire jungler Weiwei from LNG)",
    player_slug: "weiwei",
    player_name: "Weiwei",
    current_team_short: "LNG",
    target_team_short: "TES",
    target_team_id: 12,
    league: "LPL",
    confidence: 82,
    post_url: "https://weibo.com/hanyi/status/5097120938471920",
    published_at: "2026-11-05T09:45:00Z",
  },
  {
    id: 30,
    post_id: "tw-20261105-peyz-t1",
    source: "TWITTER",
    author: "윤민섭 기자 (Kukmin Ilbo)",
    raw_text:
      "[단독] T1과 '페이즈' 김수환 선수가 계약 연장에 최종 서명했습니다. T1의 2026 시즌 핵심 전력으로 안착한 페이즈 선수는 팀의 장기 프로젝트 중심축으로 2027 시즌도 붉은 유니폼을 입게 됩니다.",
    summary:
      "[윤민섭] T1, 페이즈(Peyz)와 계약 연장 최종 서명 완료… 2027 동행 확정 (T1 officially completes contract extension with Peyz for 2027)",
    player_slug: "peyz",
    player_name: "Peyz",
    current_team_short: "T1",
    target_team_short: "T1",
    target_team_id: 1,
    league: "LCK",
    confidence: 95,
    post_url: "https://x.com/mulseop/status/1853741829019284710",
    published_at: "2026-11-05T06:10:00Z",
  },
  {
    id: 29,
    post_id: "tw-20261105-hena-lll",
    source: "TWITTER",
    author: "Travis Gafford",
    raw_text:
      "Brazilian sources tell me LOUD is finalizing a deal to acquire Korean bot laner Hena from paiN Gaming. LOUD aims to reclaim the CBLOL crown with Hena anchoring their damage output in 2027.",
    summary:
      "[트래비스 개포드] 브라질 LOUD, paiN 게이밍 한국인 원딜 헤나(Hena) 영입 임박 (LOUD finalizing deal to sign Korean ADC Hena from paiN Gaming)",
    player_slug: "hena",
    player_name: "Hena",
    current_team_short: "PNG",
    target_team_short: "LLL",
    target_team_id: 48,
    league: "CBLOL",
    confidence: 86,
    post_url: "https://x.com/TravisGafford/status/1853689201984210492",
    published_at: "2026-11-05T01:30:00Z",
  },
  {
    id: 28,
    post_id: "tw-20261104-levi-gam",
    source: "TWITTER",
    author: "LEC_Wooloo (Sheep Esports)",
    raw_text:
      "[Sources] GAM Esports legendary jungler Đỗ 'Levi' Duy Khánh is set to extend his contract with the Vietnamese organization for another year, rejecting lucrative offers from overseas regions.",
    summary:
      "[울루] GAM의 심장 레비(Levi), 해외 팀 러브콜 거절하고 1년 재계약 체결 (GAM legendary jungler Levi set to sign 1-year contract extension)",
    player_slug: "levi",
    player_name: "Levi",
    current_team_short: "GAM",
    target_team_short: "GAM",
    target_team_id: 40,
    league: "LCP",
    confidence: 92,
    post_url:
      "https://sheepesports.com/articles/sources-levi-extends-with-gam-esports/2026-11-04",
    published_at: "2026-11-04T20:50:00Z",
  },
  {
    id: 27,
    post_id: "tw-20261104-vicla-fly",
    source: "TWITTER",
    author: "Alejandro Gomis",
    raw_text:
      "[Sources] FlyQuest has opened talks with BNK FEARX to sign mid laner Lee 'VicLa' Dae-kwang. VicLa previously played in North America and FlyQuest regards his LCK experience as an upgrade for their mid lane.",
    summary:
      "[고미스] 플라이퀘스트(FLY), 피어엑스 미드 빅라(VicLa) 영입 접촉 개시 (FlyQuest opens talks with BNK FEARX to bring back mid laner VicLa to North America)",
    player_slug: "vicla",
    player_name: "VicLa",
    current_team_short: "BFX",
    target_team_short: "FLY",
    target_team_id: 31,
    league: "LCS",
    confidence: 73,
    post_url:
      "https://sheepesports.com/articles/sources-flyquest-talks-vicla-bnk-fearx/2026-11-04",
    published_at: "2026-11-04T18:15:00Z",
  },
  {
    id: 26,
    post_id: "wb-20261104-elk-blg",
    source: "WEIBO",
    author: "恋恋红茶 (Red Tea)",
    raw_text:
      "WBG这个赛季成绩没有达到管理层预期，Elk有可能会重返BLG。BLG管理层始终认为当年Bin/Xun/knight/Elk/ON的夺冠化学反应是最强的，双方已经有了非正式接触。",
    summary:
      "[홍차] 엘크(Elk), WBG 떠나 BLG 복귀 타진… 우승 멤버 재결합 시동 (Elk in talks for potential return to BLG as WBG restructures)",
    player_slug: "elk",
    player_name: "Elk",
    current_team_short: "WBG",
    target_team_short: "BLG",
    target_team_id: 11,
    league: "LPL",
    confidence: 79,
    post_url: "https://weibo.com/redtea/status/5096819283910284",
    published_at: "2026-11-04T14:40:00Z",
  },
  {
    id: 25,
    post_id: "tw-20261104-thanatos-fly",
    source: "TWITTER",
    author: "Travis Gafford",
    raw_text:
      "Hearing Cloud9 top laner Thanatos has drawn serious interest from FlyQuest. FLY is exploring top lane upgrades over Gakgos, and Thanatos’ aggressive lane dominant playstyle fits their upcoming super-roster blueprint.",
    summary:
      "[트래비스 개포드] 플라이퀘스트, C9 탑 타나토스(Thanatos) 영입 눈독 (FlyQuest expressing serious interest in acquiring C9 top laner Thanatos)",
    player_slug: "thanatos",
    player_name: "Thanatos",
    current_team_short: "C9",
    target_team_short: "FLY",
    target_team_id: 31,
    league: "LCS",
    confidence: 70,
    post_url: "https://x.com/TravisGafford/status/1853391829471928491",
    published_at: "2026-11-04T12:00:00Z",
  },
  {
    id: 24,
    post_id: "tw-20261104-mikyx-g2",
    source: "TWITTER",
    author: "LEC_Wooloo (Sheep Esports)",
    raw_text:
      "[Sources] Following discussions regarding their support position for 2027, G2 Esports has internally considered a potential reunion with veteran support Mihael 'Mikyx' Mehle, who is currently under contract with SK Gaming.",
    summary:
      "[울루] G2, SK 게이밍 미킥스(Mikyx) 복귀 시나리오 내부 검토 중 (G2 Esports internally considering a reunion with veteran support Mikyx from SK Gaming)",
    player_slug: "mikyx",
    player_name: "Mikyx",
    current_team_short: "SK",
    target_team_short: "G2",
    target_team_id: 21,
    league: "LEC",
    confidence: 66,
    post_url:
      "https://sheepesports.com/articles/sources-g2-considers-mikyx-return-sk-gaming/2026-11-04",
    published_at: "2026-11-04T08:30:00Z",
  },
  {
    id: 23,
    post_id: "cm-20261103-teddy-dns",
    source: "COMMUNITY",
    author: "익명 관계자 (FMKorea)",
    raw_text:
      "[단독 찌라시] DN 숲퍼스가 덕담(deokdam)과의 결별 가능성을 열어두고 베테랑 원딜 테디(Teddy) 영입을 타진 중. 브리온과의 계약 해지 조항을 활용해 DNS가 안정적인 캐리 라인 구축을 노린다는 소식.",
    summary:
      "[펨코 익명 썰] DN 숲퍼스, 브리온 테디(Teddy) 영입 타진… 베테랑 원딜 교체 검토 (DN SOOPers reportedly inquiring about BRION veteran Teddy to reinforce bot lane)",
    player_slug: "teddy",
    player_name: "Teddy",
    current_team_short: "BRO",
    target_team_short: "DNS",
    target_team_id: 10,
    league: "LCK",
    confidence: 60,
    post_url: "https://www.fmkorea.com/lol/7649281729",
    published_at: "2026-11-03T23:15:00Z",
  },
  {
    id: 22,
    post_id: "wb-20261103-doggo-al",
    source: "WEIBO",
    author: "OBGG",
    raw_text:
      "[LPL/LCP 联动] CFO当家AD选手Doggo近期正在接受LPL俱乐部Anyone's Legend (AL)的试训考察。随着Hope合同即将到期，AL急需引进强力对线型下路，双方意向相当契合。",
    summary:
      "[OBGG] CFO 간판 원딜 도고(Doggo), LPL AL 입단 테스트 및 이적 협상 중 (CFO star ADC Doggo in trials and talks with LPL side Anyone's Legend)",
    player_slug: "doggo",
    player_name: "Doggo",
    current_team_short: "CFO",
    target_team_short: "AL",
    target_team_id: 20,
    league: "LPL",
    confidence: 74,
    post_url: "https://weibo.com/obgg/status/5096491028374910",
    published_at: "2026-11-03T16:40:00Z",
  },
  {
    id: 21,
    post_id: "tw-20261103-peanut-hle",
    source: "TWITTER",
    author: "윤민섭 기자 (Kukmin Ilbo)",
    raw_text:
      "한화생명e스포츠(HLE)의 캡틴 피넛(Peanut) 한왕호 선수가 팀과 1년 재계약에 구두 합의했습니다. 은퇴 및 군 입대 시점을 앞두고 HLE의 끈질긴 설득과 리그 제패를 향한 의지가 통했다는 평가입니다.",
    summary:
      "[윤민섭] 한화생명 피넛(Peanut), 구단과 1년 재계약 구두 합의… 캡틴 잔류 (Peanut reaches verbal agreement on 1-year extension to remain HLE captain)",
    player_slug: "peanut",
    player_name: "Peanut",
    current_team_short: "HLE",
    target_team_short: "HLE",
    target_team_id: 3,
    league: "LCK",
    confidence: 91,
    post_url: "https://x.com/mulseop/status/1853018293847291048",
    published_at: "2026-11-03T11:00:00Z",
  },
  {
    id: 20,
    post_id: "wb-20261103-tian-jdg",
    source: "WEIBO",
    author: "丶涵艺 (Hanyi)",
    raw_text:
      "高天亮（Tian）在TES替补席坐了大半年，渴望首发出战。JDG打野位今年变动频繁，已经向滔搏正式递交了租借/转会询价函，Tian本人也极度希望加盟一支具备季后赛实力的俱乐部证明自己。",
    summary:
      "[한이] JDG, TES 서브 정글러 티안(Tian) 영입 문의 공식 전달 (JDG officially inquires with TES regarding jungler Tian seeking starting role)",
    player_slug: "tian",
    player_name: "Tian",
    current_team_short: "TES",
    target_team_short: "JDG",
    target_team_id: 13,
    league: "LPL",
    confidence: 83,
    post_url: "https://weibo.com/hanyi/status/5096381029481729",
    published_at: "2026-11-03T07:50:00Z",
  },
  {
    id: 19,
    post_id: "cm-20261103-pyosik-krx",
    source: "COMMUNITY",
    author: "감스트/케인 스토브리그 썰",
    raw_text:
      "어제 관계자 형들한테 들었는데 표식(Pyosik)이 친정팀 DRX 복귀 썰 진짜 진지하더라. 디엔숲에서도 잡으려곤 하는데 표식이 DRX에 워낙 애정이 깊어서 감독진이랑 교감 중이라는 소리 나옴.",
    summary:
      "[인터넷 방송 썰] 표식(Pyosik), 친정팀 DRX 컴백 교감설… DNS 재계약과 저울질 (Pyosik rumored in mutual contact for nostalgic comeback to DRX from DNS)",
    player_slug: "pyosik",
    player_name: "Pyosik",
    current_team_short: "DNS",
    target_team_short: "KRX",
    target_team_id: 8,
    league: "LCK",
    confidence: 63,
    post_url: "https://vod.sooplive.co.kr/player/109283741",
    published_at: "2026-11-03T02:20:00Z",
  },
  {
    id: 18,
    post_id: "tw-20261102-berserker-tl",
    source: "TWITTER",
    author: "Travis Gafford",
    raw_text:
      "Hearing massive LCS rumors: Team Liquid has Berserker at the very top of their wish list for 2027. Pair him with CoreJJ, and TL would have the most dominant bot lane on paper in Americas North.",
    summary:
      "[트래비스 개포드] 팀 리퀴드(TL), 버서커(Berserker) 영입 추진… 코어장전과 호흡 노린다 (TL placing Berserker at the top of their wishlist to partner with CoreJJ)",
    player_slug: "berserker",
    player_name: "Berserker",
    current_team_short: "LYN",
    target_team_short: "TL",
    target_team_id: 32,
    league: "LCS",
    confidence: 81,
    post_url: "https://x.com/TravisGafford/status/1852781049281728190",
    published_at: "2026-11-02T22:10:00Z",
  },
  {
    id: 17,
    post_id: "tw-20261102-carzzy-fnc",
    source: "TWITTER",
    author: "LEC_Wooloo (Sheep Esports)",
    raw_text:
      "[Sources] Fnatic is exploring options in the bot lane and has inquired about Team Vitality's AD Carry Matyáš 'Carzzy' Orság. Upset's future with the team remains uncertain heading into the 2027 offseason.",
    summary:
      "[울루] 프나틱(FNC), 바이탈리티 카르지(Carzzy) 영입 타진… 업셋 거취 유동적 (Fnatic inquires about Vitality ADC Carzzy amidst uncertainty surrounding Upset)",
    player_slug: "carzzy",
    player_name: "Carzzy",
    current_team_short: "VIT",
    target_team_short: "FNC",
    target_team_id: 22,
    league: "LEC",
    confidence: 76,
    post_url:
      "https://sheepesports.com/articles/sources-fnatic-inquires-carzzy-vitality/2026-11-02",
    published_at: "2026-11-02T13:45:00Z",
  },
  {
    id: 16,
    post_id: "wb-20261102-gala-blg",
    source: "WEIBO",
    author: "丶涵艺 (Hanyi)",
    raw_text:
      "如果Viper真的回韩国，BLG第一顺位就是GALA，JDG目前薪资空间受限，放走GALA可以腾出巨额薪金帽。BLG已经跟GALA团队打过招呼了，只要LCK那边一落定，这边随时秒签。",
    summary:
      "[한이] 바이퍼 LCK 복귀 시 BLG 차기 원딜 1순위는 갈라(GALA) (If Viper leaves for LCK, BLG is primed to immediately sign JDG bot laner GALA)",
    player_slug: "gala",
    player_name: "GALA",
    current_team_short: "JDG",
    target_team_short: "BLG",
    target_team_id: 11,
    league: "LPL",
    confidence: 77,
    post_url: "https://weibo.com/hanyi/status/5096019284710293",
    published_at: "2026-11-02T10:15:00Z",
  },
  {
    id: 15,
    post_id: "cm-20261102-siwoo-kt",
    source: "COMMUNITY",
    author: "한상용 (H-Dragon)",
    raw_text:
      "KT 쪽 소식 궁금해하시는 분들 많은데, 탑 라인에 공격적인 유망주 수혈을 적극 검토하고 있습니다. 퍼펙트 선수와 경쟁하거나 주전을 책임질 자원으로 DK의 시우(Siwoo) 선수에게 진지한 오퍼가 들어간 걸로 알고 있습니다.",
    summary:
      "[한상용] kt 롤스터, DK 신예 탑 시우(Siwoo) 영입 오퍼 타진 (kt Rolster actively sending inquiry to DK for rookie toplaner Siwoo)",
    player_slug: "siwoo",
    player_name: "Siwoo",
    current_team_short: "DK",
    target_team_short: "KT",
    target_team_id: 5,
    league: "LCK",
    confidence: 68,
    post_url: "https://chzzk.naver.com/live/hdragon/community/98412",
    published_at: "2026-11-02T05:30:00Z",
  },
  {
    id: 14,
    post_id: "wb-20261101-theshy-ig",
    source: "WEIBO",
    author: "恋恋红茶 (Red Tea)",
    raw_text:
      "极粉们放宽心，TheShy和Rookie基本确定继续绑定一年。iG管理层刚刚完成了新一轮赞助合同，预算充足，下赛季老iG核心框架完全不会动摇，正在挑选替补上单和分析师。",
    summary:
      "[홍차] 더샤이(TheShy) & 루키, iG와 동반 1년 재계약 확정적 (TheShy and Rookie confirmed to stay together at iG for another season)",
    player_slug: "theshy",
    player_name: "TheShy",
    current_team_short: "iG",
    target_team_short: "iG",
    target_team_id: 16,
    league: "LPL",
    confidence: 94,
    post_url: "https://weibo.com/redtea/status/5095692019842104",
    published_at: "2026-11-01T19:00:00Z",
  },
  {
    id: 13,
    post_id: "tw-20261101-quid-c9",
    source: "TWITTER",
    author: "LEC_Wooloo (Sheep Esports)",
    raw_text:
      "[Sources] Cloud9 is exploring options to acquire midlaner Quid from Team Liquid. With C9 looking to upgrade their mid lane carry potential alongside Blaber, talks have started between both NA heavyweights.",
    summary:
      "[울루] C9, 팀 리퀴드(TL) 미드 퀴드(Quid) 영입 문의… 블라버 파트너 모색 (Cloud9 exploring acquisition of Team Liquid mid laner Quid to pair with Blaber)",
    player_slug: "quid",
    player_name: "Quid",
    current_team_short: "TL",
    target_team_short: "C9",
    target_team_id: 33,
    league: "LCS",
    confidence: 72,
    post_url:
      "https://sheepesports.com/articles/sources-c9-exploring-quid-tl-transfer/2026-11-01",
    published_at: "2026-11-01T15:40:00Z",
  },
  {
    id: 12,
    post_id: "tw-20261101-ruler-gen",
    source: "TWITTER",
    author: "윤민섭 기자 (Kukmin Ilbo)",
    raw_text:
      "젠지 이스포츠(Gen.G)가 원거리 딜러 '룰러' 박재혁 선수와의 계약 연장에 청신호를 켰습니다. LPL 팀들의 거액 베팅 루머가 돌았으나 룰러 본인이 젠지 프랜차이즈로서의 잔류 의지를 강력히 표명한 것으로 전해집니다.",
    summary:
      "[윤민섭] 젠지, 프랜차이즈 스타 룰러(Ruler)와 재계약 유력… LPL 복귀설 일축 (Gen.G nearing contract extension with franchise star Ruler, denying LPL rumors)",
    player_slug: "ruler",
    player_name: "Ruler",
    current_team_short: "GEN",
    target_team_short: "GEN",
    target_team_id: 2,
    league: "LCK",
    confidence: 93,
    post_url: "https://x.com/mulseop/status/1852290481920491823",
    published_at: "2026-11-01T03:15:00Z",
  },
  {
    id: 11,
    post_id: "tw-20261031-serin-sk",
    source: "TWITTER",
    author: "Alejandro Gomis",
    raw_text:
      "[Sources] Mid laner Tolga 'Serin' Ölmez has reached a verbal agreement with SK Gaming for the 2027 LEC season, replacing LIDER. Heretics approved the termination of his remaining contract by mutual consent.",
    summary:
      "[고미스] 미드라이너 세린(Serin), 헤레틱스 떠나 SK 게이밍과 구두 합의 완료 (Serin reaches verbal agreement to join SK Gaming from Team Heretics)",
    player_slug: "serin",
    player_name: "Serin",
    current_team_short: "TH",
    target_team_short: "SK",
    target_team_id: 27,
    league: "LEC",
    confidence: 89,
    post_url:
      "https://sheepesports.com/articles/sources-serin-verbal-agreement-sk-gaming/2026-10-31",
    published_at: "2026-10-31T17:35:00Z",
  },
  {
    id: 10,
    post_id: "wb-20261031-tarzan-wbg",
    source: "WEIBO",
    author: "OBGG",
    raw_text:
      "[转会速递] 据悉，AL打野Tarzan已经与WBG展开深度接洽。WBG在Jiejie合同到期后希望引进一名具备顶尖大局观和控图能力的控图型打野，Tarzan是其第一顺位引援目标。",
    summary:
      "[OBGG] WBG, AL 정글러 타잔(Tarzan) 최우선 영입 타깃으로 협상 돌입 (WBG targeting AL jungler Tarzan as top priority after Jiejie contract)",
    player_slug: "tarzan",
    player_name: "Tarzan",
    current_team_short: "AL",
    target_team_short: "WBG",
    target_team_id: 14,
    league: "LPL",
    confidence: 80,
    post_url: "https://weibo.com/obgg/status/5095293810294821",
    published_at: "2026-10-31T08:20:00Z",
  },
  {
    id: 9,
    post_id: "cm-20261030-smash-krx",
    source: "COMMUNITY",
    author: "익명 관계자 (FMKorea)",
    raw_text:
      "[찌라시] DK 바텀 스매쉬(Smash) 선수 바이아웃 관련해서 DRX가 진지하게 접근 중. DK가 에이밍을 노리면서 스매쉬 선수의 출전 기회 보장을 위해 임대 또는 완전 이적 카드를 맞교환 형식으로 논의 중이라는 썰이 돎.",
    summary:
      "[펨코 익명 썰] DRX, DK 원딜 스매쉬(Smash) 영입 접촉… 에이밍 딜과 연계된 연쇄 이동설 (DRX reportedly inquiring about DK ADC Smash amidst Aiming negotiations)",
    player_slug: "smash",
    player_name: "Smash",
    current_team_short: "DK",
    target_team_short: "KRX",
    target_team_id: 8,
    league: "LCK",
    confidence: 65,
    post_url: "https://www.fmkorea.com/lol/7639102849",
    published_at: "2026-10-30T21:45:00Z",
  },
  {
    id: 8,
    post_id: "wb-20261030-viper-hle",
    source: "WEIBO",
    author: "Doinb",
    raw_text:
      "兄弟们，大瓜来了！Viper可能要回LCK了，BLG续约谈得很艰难，因为韩国那边韩华（HLE）给的待遇太离谱了。如果Viper回去，HLE下路可能又要变天，今年转会期真的太疯狂了！",
    summary:
      "[도인비] 바이퍼(Viper), BLG와 협상 난항… 한화생명(HLE)의 파격 오퍼로 LCK 유턴 가능성 (Doinb streams that Viper may return to LCK with massive offer from HLE)",
    player_slug: "viper",
    player_name: "Viper",
    current_team_short: "BLG",
    target_team_short: "HLE",
    target_team_id: 3,
    league: "LCK",
    confidence: 75,
    post_url: "https://weibo.com/doinb/status/5094918239019284",
    published_at: "2026-10-30T13:10:00Z",
  },
  {
    id: 7,
    post_id: "tw-20261029-inspired-fly",
    source: "TWITTER",
    author: "Travis Gafford",
    raw_text:
      "Hearing strong reports that FlyQuest is making a big play for Inspired. With Lyon Gaming restructuring, Inspired is looking for an MSI/Worlds caliber project, and FLY has offered him full roster influence and top salary.",
    summary:
      "[트래비스 개포드] 플라이퀘스트(FLY), 리옹 게이밍 인스파이어드(Inspired) 전격 영입 추진 (FlyQuest aggressively targeting Lyon Gaming jungler Inspired)",
    player_slug: "inspired",
    player_name: "Inspired",
    current_team_short: "LYN",
    target_team_short: "FLY",
    target_team_id: 31,
    league: "LCS",
    confidence: 84,
    post_url: "https://x.com/TravisGafford/status/1851301982749102834",
    published_at: "2026-10-29T18:15:00Z",
  },
  {
    id: 6,
    post_id: "tw-20261029-doran-t1",
    source: "TWITTER",
    author: "윤민섭 기자 (Kukmin Ilbo)",
    raw_text:
      "[단독] T1과 최현준(Doran) 선수가 재계약에 긍정적인 공감대를 형성했습니다. 서머와 월즈를 거치며 팀 내 신뢰가 두터워졌고, 구단 고위층 역시 도란 선수의 팀 헌신도를 높게 평가하여 다년 계약을 제안한 상태입니다.",
    summary:
      "[윤민섭] T1, 도란(Doran)과 다년 재계약 합의 근접… 신뢰 바탕 동행 (T1 close to multi-year extension with Doran after strong showing)",
    player_slug: "doran",
    player_name: "Doran",
    current_team_short: "T1",
    target_team_short: "T1",
    target_team_id: 1,
    league: "LCK",
    confidence: 90,
    post_url: "https://x.com/mulseop/status/1851210948392817409",
    published_at: "2026-10-29T02:50:00Z",
  },
  {
    id: 5,
    post_id: "wb-20261028-bin-blg",
    source: "WEIBO",
    author: "恋恋红茶 (Red Tea)",
    raw_text:
      "Bin哥的动向很多粉丝在问，目前可以确定BLG给出的顶薪续约诚意十足，TES虽然通过中间人试探过报价，但Bin本人更倾向于留在BLG继续冲击冠军，下赛季BLG依然以上中野核心建队。",
    summary:
      "[홍차] 빈(Bin), TES 거액 오퍼 고사하고 BLG 잔류 재계약 유력 (Bin inclined to re-sign top-tier extension with BLG despite TES interest)",
    player_slug: "bin",
    player_name: "Bin",
    current_team_short: "BLG",
    target_team_short: "BLG",
    target_team_id: 11,
    league: "LPL",
    confidence: 88,
    post_url: "https://weibo.com/redtea/status/5094209183492810",
    published_at: "2026-10-28T16:05:00Z",
  },
  {
    id: 4,
    post_id: "cm-20261028-cuzz-dk",
    source: "COMMUNITY",
    author: "한상용 (H-Dragon)",
    raw_text:
      "어제 방송에서 말씀드렸듯이, 이번 스토브리그에서 베테랑 정글러 몸값이 상상 이상으로 치솟고 있습니다. 커즈 선수는 KT 잔류와 타 팀 이적 사이에서 고민 중인데, 특히 운영형 정글러를 절실히 원하는 한 팀(DK)이 매우 적극적입니다. 주말 지나면 윤곽이 나올 것 같네요.",
    summary:
      "[한상용] 베테랑 정글러 커즈(Cuzz), DK 이적 가능성 급부상… 오더형 정글 갈망 (H-Dragon hints Cuzz could move from KT to DK as veteran shotcaller in high demand)",
    player_slug: "cuzz",
    player_name: "Cuzz",
    current_team_short: "KT",
    target_team_short: "DK",
    target_team_id: 4,
    league: "LCK",
    confidence: 78,
    post_url: "https://chzzk.naver.com/live/hdragon/community/98231",
    published_at: "2026-10-28T09:30:00Z",
  },
  {
    id: 3,
    post_id: "tw-20261027-g2-lyncas",
    source: "TWITTER",
    author: "LEC_Wooloo (Sheep Esports)",
    raw_text:
      "[Sources] G2 Esports and Team Vitality have reached a verbal agreement for the transfer of jungler Linas 'Lyncas' Nauncikas to G2. Meanwhile, Rudy 'SkewMond' Semaan is allowed to explore buyout options following G2's internal restructuring.",
    summary:
      "[울루] G2, 바이탈리티 정글러 린카스(Lyncas) 영입 구두 합의… 스큐몬드 이적 허용 (G2 reaches verbal agreement to sign Vitality jungler Lyncas; SkewMond allowed to seek buyout)",
    player_slug: "lyncas",
    player_name: "Lyncas",
    current_team_short: "VIT",
    target_team_short: "G2",
    target_team_id: 21,
    league: "LEC",
    confidence: 92,
    post_url:
      "https://sheepesports.com/articles/sources-g2-verbal-agreement-lyncas-skewmond-market/2026-10-27",
    published_at: "2026-10-27T14:22:00Z",
  },
  {
    id: 2,
    post_id: "wb-20261026-scout-lng",
    source: "WEIBO",
    author: "丶涵艺 (Hanyi)",
    raw_text:
      "Scout基本上不会留在NS了，他和LPL这边的沟通一直很顺畅。LNG正在全力接触他，双方在薪资和阵容结构上聊得很深，几乎达成框架协议。今年中路大鱼就看小学弟了。",
    summary:
      "[한이] 스카웃(Scout), 농심 떠나 LPL LNG 복귀 유력… 기본 합의 도달 (Scout likely leaving NS to return to LPL with LNG nearing agreement)",
    player_slug: "scout",
    player_name: "Scout",
    current_team_short: "NS",
    target_team_short: "LNG",
    target_team_id: 15,
    league: "LPL",
    confidence: 85,
    post_url: "https://weibo.com/hanyi/status/5093781293840192",
    published_at: "2026-10-26T11:40:00Z",
  },
  {
    id: 1,
    post_id: "tw-20261026-aiming-dk",
    source: "TWITTER",
    author: "윤민섭 기자 (Kukmin Ilbo)",
    raw_text:
      "[단독] DRX와 계약 만료를 앞둔 바텀 라이너 '에이밍' 김하람 선수를 향해 디플러스 기아(DK)가 강력한 러브콜을 보내고 있는 것으로 확인되었습니다. DK는 바텀 화력 보강을 최우선 과제로 두고 적극적인 협상 테이블을 마련 중입니다.",
    summary:
      "[윤민섭] DK, DRX 에이밍(Aiming) 영입 추진… 바텀 라인 화력 보강 총력전 (DK aggressively pursuing DRX bot laner Aiming to bolster fire power)",
    player_slug: "aiming",
    player_name: "Aiming",
    current_team_short: "KRX",
    target_team_short: "DK",
    target_team_id: 4,
    league: "LCK",
    confidence: 82,
    post_url: "https://x.com/mulseop/status/1850129384729184256",
    published_at: "2026-10-26T04:15:00Z",
  },
];

export const PREDICTED_PLAYER_OVERRIDES: Record<
  string,
  {
    predicted_team_id: number;
    confidence: number;
    status: "RUMORED" | "CONFIRMED" | "STAY";
    source_url: string;
    author: string;
    summary: string;
  }
> = Object.fromEntries(
  INITIAL_RUMORS.map((r) => [
    r.player_slug,
    {
      predicted_team_id: r.target_team_id,
      confidence: r.confidence,
      status: r.current_team_short === r.target_team_short ? "CONFIRMED" : "RUMORED",
      source_url: r.post_url || "",
      author: r.author,
      summary: r.summary || r.raw_text,
    },
  ])
);
