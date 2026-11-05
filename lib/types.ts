export type League = "LCK" | "LPL" | "LEC" | "LCS" | "LCP" | "CBLOL";

export interface Team {
  id: number;
  name: string;
  short_name: string;
  league?: League | string;
  light_logo_url: string | null;
  dark_logo_url: string | null;
  primary_color: string | null;
}

export interface Coach {
  id: number;
  team_id: number;
  role: "HEAD_COACH" | "COACH";
  name: string;
  real_name: string | null;
}

export interface Player {
  id: number;
  slug?: string;
  name: string;
  real_name: string | null;
  position: "TOP" | "JGL" | "MID" | "BOT" | "SPT";
  current_team_id: number | null;
  predicted_team_id: number | null;
  is_starter?: boolean;
  confidence: number;
  image_url?: string | null;
  status: "CONFIRMED" | "RUMORED" | "FA" | "STAY" | "SUB";
  source_url?: string | null;
  verified_at?: string | null;
  updated_at?: string;
}

export interface Rumor {
  id: number;
  post_id: string;
  source: "TWITTER" | "WEIBO" | "COMMUNITY" | "NEWS" | string;
  author: string;
  raw_text: string;
  summary: string | null;
  player_id: number | null;
  target_team_id: number | null;
  confidence: number;
  post_url: string | null;
  published_at: string;
  created_at?: string;
}

