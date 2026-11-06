export interface Env {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  GEMINI_API_KEY: string;
}

export type RumorKind = "TRANSFER" | "RENEWAL" | "FA" | "STAY" | "RETIREMENT" | "UNKNOWN";
export type DraftStatus = "pending" | "approved" | "rejected";

export interface CandidateDraft {
  post_id: string;
  source: "X" | "WEIBO" | "PRESS" | "COMMUNITY";
  author: string;
  author_en?: string;
  author_zh?: string;
  raw_text: string;
  summary: string;
  summary_en: string;
  summary_zh: string;
  player_slug?: string;
  player_name?: string;
  current_team_short?: string;
  target_team_short?: string;
  league?: "LCK" | "LPL" | "LEC" | "LCS" | "GLOBAL";
  kind: RumorKind;
  confidence: number;
  post_url?: string;
  published_at?: string;
}

export interface RumorDraftRow {
  id?: number;
  post_id: string;
  source: string;
  author: string;
  author_en?: string | null;
  author_zh?: string | null;
  raw_text: string;
  summary: string;
  summary_en?: string | null;
  summary_zh?: string | null;
  player_slug?: string | null;
  player_name?: string | null;
  current_team_short?: string | null;
  target_team_short?: string | null;
  league?: string | null;
  kind?: string | null;
  confidence?: number;
  post_url?: string | null;
  published_at?: string;
  status: DraftStatus;
  raw_payload?: Record<string, unknown> | null;
}
