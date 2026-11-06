import { createClient } from "@/utils/supabase/server";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Team, Player, Rumor, Coach } from "@/lib/types";
import RosterViewer from "@/components/RosterViewer";
import RumorFeed from "@/components/RumorFeed";
import HomeHero from "@/components/HomeHero";
import {
  INITIAL_RUMORS,
  PREDICTED_PLAYER_OVERRIDES,
  MISSING_LPL_TEAMS,
  MISSING_LPL_PLAYERS,
} from "@/lib/rumors-data";

export default async function Index() {
  if (!hasEnvVars) {
    return (
      <div className="w-full flex justify-center py-16">
        <div className="w-full max-w-xl text-center border-2 border-dashed rounded-2xl bg-card p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-2xl font-bold">
            ⚠️
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Supabase 환경변수 설정이 필요합니다
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            프로젝트 루트에 <code className="bg-secondary px-1.5 py-0.5 rounded font-mono font-bold text-xs text-foreground">.env.local</code> 파일을 생성하고,
            Supabase 대시보드에서 발급받은 2가지 키를 등록해주세요.
          </p>
          <div className="p-4 rounded-xl bg-secondary/60 text-left font-mono text-xs text-foreground/90 space-y-1 overflow-x-auto border">
            <p className="text-muted-foreground"># .env.local 예시</p>
            <p>NEXT_PUBLIC_SUPABASE_URL=https://your-id.supabase.co</p>
            <p>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...</p>
          </div>
          <p className="text-xs text-muted-foreground">
            환경변수를 입력한 후 개발 서버를 다시 시작하시면 화면이 자동으로 연결됩니다.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();

  // 1. 팀 목록, 선수 목록, 최근 루머 목록 조회
  const { data: teamsData } = await supabase
    .from("teams")
    .select("*")
    .order("id", { ascending: true });

  const { data: playersData } = await supabase
    .from("players")
    .select("*");

  const { data: coachesData } = await supabase
    .from("coaches")
    .select("*")
    .order("id", { ascending: true });

  const { data: rumorsData } = await supabase
    .from("rumors")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(20);

  const rawTeams = (teamsData as Team[]) || [];
  const existingTeamShorts = new Set(
    rawTeams.map((t) => t.short_name.toUpperCase())
  );
  const teams: Team[] = [
    ...rawTeams,
    ...MISSING_LPL_TEAMS.filter(
      (mt) => !existingTeamShorts.has(mt.short_name.toUpperCase())
    ),
  ];
  const rawPlayers = (playersData as Player[]) || [];
  const coaches = (coachesData as Coach[]) || [];
  const rawRumors = (rumorsData as Rumor[]) || [];

  // 1. 한화생명(HLE, id: 3) 정글러가 구버전 DB에서 Peanut으로 남아있을 경우 Kanavi(서진혁)로 즉시 보정
  // 2. 오피셜 구단/선수 계정 및 1티어 원천 소식통(PREDICTED_PLAYER_OVERRIDES)만 반영하고, 이외 이전 DB 잔여 예측값은 초기화
  const mappedPlayers: Player[] = rawPlayers
    .filter((raw) => (raw.slug || raw.name || "").toLowerCase() !== "piero")
    .map((raw) => {
      const p: Player =
        raw.current_team_id === 3 &&
        ((raw.slug || "").toLowerCase() === "peanut" ||
          raw.name.toLowerCase() === "peanut")
          ? {
              ...raw,
              slug: "kanavi",
              name: "Kanavi",
              real_name: "서진혁",
            }
          : raw;

      const slugKey = (p.slug || p.name || "").toLowerCase();
      const override = PREDICTED_PLAYER_OVERRIDES[slugKey];
      if (override) {
        return {
          ...p,
          predicted_team_id: override.predicted_team_id,
          confidence: override.confidence,
          status: override.status,
          source_url: override.source_url,
        };
      }
      return {
        ...p,
        predicted_team_id: p.current_team_id,
        confidence: 100,
        status: "STAY",
        source_url: undefined,
      };
    });

  // DB에 아직 추가 전인 신규/복귀 찌라시 선수(Deft, Hype, 3XA, Zicssi, SlowQ, Aetinoth, Fleshy, Noah) 자동 보강
  const extraPlayers: Player[] = [
    {
      id: 9001,
      slug: "deft",
      name: "Deft",
      real_name: "김혁규",
      position: "BOT",
      current_team_id: null,
      predicted_team_id: 9,
      is_starter: false,
      confidence: 94,
      status: "RUMORED",
      source_url: PREDICTED_PLAYER_OVERRIDES.deft.source_url,
    },
    {
      id: 9003,
      slug: "hype",
      name: "Hype",
      real_name: "변정현",
      position: "BOT",
      current_team_id: 28,
      predicted_team_id: 28,
      is_starter: true,
      confidence: 98,
      status: "CONFIRMED",
      source_url: PREDICTED_PLAYER_OVERRIDES.hype.source_url,
    },
    {
      id: 9004,
      slug: "3xa",
      name: "3XA",
      real_name: "Thomas Foucou",
      position: "BOT",
      current_team_id: null,
      predicted_team_id: 27,
      is_starter: false,
      confidence: 95,
      status: "RUMORED",
      source_url: PREDICTED_PLAYER_OVERRIDES["3xa"].source_url,
    },
    {
      id: 9005,
      slug: "zicssi",
      name: "Zicssi",
      real_name: "Léo-Paulurez",
      position: "JGL",
      current_team_id: null,
      predicted_team_id: 27,
      is_starter: false,
      confidence: 95,
      status: "RUMORED",
      source_url: PREDICTED_PLAYER_OVERRIDES.zicssi.source_url,
    },
    {
      id: 9006,
      slug: "slowq",
      name: "SlowQ",
      real_name: "Yasin Koca",
      position: "MID",
      current_team_id: 27,
      predicted_team_id: 27,
      is_starter: false,
      confidence: 95,
      status: "CONFIRMED",
      source_url: PREDICTED_PLAYER_OVERRIDES.slowq.source_url,
    },
    {
      id: 9007,
      slug: "aetinoth",
      name: "Aetinoth",
      real_name: "berat",
      position: "BOT",
      current_team_id: null,
      predicted_team_id: 29,
      is_starter: false,
      confidence: 82,
      status: "RUMORED",
      source_url: PREDICTED_PLAYER_OVERRIDES.aetinoth.source_url,
    },
  ];

  const existingSlugs = new Set(
    mappedPlayers.map((p) => (p.slug || p.name || "").toLowerCase())
  );
  const allExtraPlayers = [...extraPlayers, ...MISSING_LPL_PLAYERS];
  const players: Player[] = [
    ...mappedPlayers,
    ...allExtraPlayers.filter(
      (ep) => !existingSlugs.has((ep.slug || ep.name || "").toLowerCase())
    ),
  ];

  const seedByPostId = new Map(INITIAL_RUMORS.map((sr) => [sr.post_id, sr]));
  // DB에 저장된 루머가 있으면 이를 직접 사용하되, 혹시 누락된 메타데이터가 있다면 seed 데이터로 보강
  const verifiedDbRumors: Rumor[] = rawRumors.map((r) => {
    const sr = r.post_id ? seedByPostId.get(r.post_id) : undefined;
    return {
      ...r,
      source: r.source || sr?.source || "X",
      author: r.author || sr?.author || "Unknown",
      author_en: r.author_en || sr?.author_en,
      author_zh: r.author_zh || sr?.author_zh,
      raw_text: r.raw_text || sr?.raw_text || "",
      summary: r.summary || sr?.summary || "",
      summary_en: r.summary_en || sr?.summary_en,
      summary_zh: r.summary_zh || sr?.summary_zh,
      target_team_id: r.target_team_id ?? sr?.target_team_id ?? null,
      confidence: r.confidence ?? sr?.confidence ?? 80,
      post_url: r.post_url ?? sr?.post_url ?? null,
      published_at: r.published_at ?? sr?.published_at ?? new Date().toISOString(),
      league: r.league || sr?.league,
      player_name: r.player_name || sr?.player_name,
      current_team_short: r.current_team_short || sr?.current_team_short,
      target_team_short: r.target_team_short || sr?.target_team_short,
    };
  });

  const rumors: Rumor[] =
    verifiedDbRumors.length > 0
      ? verifiedDbRumors
      : INITIAL_RUMORS.map((sr) => ({
          id: sr.id,
          post_id: sr.post_id,
          source: sr.source,
          author: sr.author,
          author_en: sr.author_en,
          author_zh: sr.author_zh,
          raw_text: sr.raw_text,
          summary: sr.summary,
          summary_en: sr.summary_en,
          summary_zh: sr.summary_zh,
          player_id: null,
          target_team_id: sr.target_team_id,
          confidence: sr.confidence,
          post_url: sr.post_url,
          published_at: sr.published_at,
          league: sr.league,
          player_name: sr.player_name,
          current_team_short: sr.current_team_short,
          target_team_short: sr.target_team_short,
        }));

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4">
      {/* 1. 상단 히어로 & 실시간 루머 타임라인 */}
      <div className="w-full max-w-5xl flex flex-col gap-4 items-center">
        <HomeHero />

        <RumorFeed initialRumors={rumors} />
      </div>

      {/* 2. 팀별 로스터 예측 뷰어 */}
      {teams.length === 0 ? (
        <div className="w-full max-w-2xl text-center py-16 border rounded-xl bg-card p-6 space-y-3">
          <h3 className="text-lg font-bold">데이터베이스 초기화가 필요합니다</h3>
          <p className="text-sm text-muted-foreground">
            Supabase 대시보드의 SQL Editor에서 <code className="bg-secondary px-1.5 py-0.5 rounded text-xs">supabase/schema.sql</code>과{" "}
            <code className="bg-secondary px-1.5 py-0.5 rounded text-xs">supabase/seed.sql</code>을 실행해주세요.
          </p>
        </div>
      ) : (
        <RosterViewer
          initialTeams={teams}
          initialPlayers={players}
          initialCoaches={coaches}
        />
      )}
    </div>
  );
}
