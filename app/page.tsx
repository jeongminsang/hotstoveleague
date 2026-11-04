import { createClient } from "@/utils/supabase/server";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Team, Player, Rumor, Coach } from "@/lib/types";
import RosterViewer from "@/components/RosterViewer";
import RumorFeed from "@/components/RumorFeed";

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
    .limit(10);

  const teams = (teamsData as Team[]) || [];
  const players = (playersData as Player[]) || [];
  const coaches = (coachesData as Coach[]) || [];
  const rumors = (rumorsData as Rumor[]) || [];

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4">
      {/* 1. 상단 히어로 & 실시간 루머 타임라인 */}
      <div className="w-full max-w-5xl flex flex-col gap-4 items-center">
        <div className="text-center space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            LCK 스토브리그 이적 예측 뷰어
          </h1>
          <p className="text-sm text-muted-foreground">
            웨이보·트위터 썰쟁이 데이터를 AI로 실시간 정제하여 나무위키보다 빠르게 제공합니다.
          </p>
        </div>

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
