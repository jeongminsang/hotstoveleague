export interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  GEMINI_API_KEY: string;
  WEIBO_SUB_COOKIE?: string;
}

export interface RawRumor {
  postId: string;
  source: "TWITTER" | "WEIBO";
  author: string;
  text: string;
  postUrl: string;
  publishedAt: string; // ISO 8601 string
}

export interface ParsedRumor {
  is_roster_rumor: boolean;
  player_name: string | null;
  target_team: string | null;
  status: "TRANSFER" | "RENEWAL" | "FA" | "STAY" | "UNKNOWN";
  confidence: number;
  one_line_summary: string;
}

