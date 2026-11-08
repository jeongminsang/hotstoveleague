import * as path from "path";
import * as dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(url, key);

// Authentic Coach Rosters for LPL, LEC, LCS (Teams 11 ~ 38)
const globalCoaches = [
  // ==========================================
  // LPL (Teams 11 ~ 20)
  // ==========================================
  // 11: BLG (Bilibili Gaming)
  { id: 31, team_id: 11, role: "HEAD_COACH", name: "BigWei", real_name: "Fu Chien-Wei" },
  { id: 32, team_id: 11, role: "COACH", name: "Xiasu", real_name: "Chen Long" },
  { id: 33, team_id: 11, role: "COACH", name: "Easyhoon", real_name: "Lee Ji-hoon" },

  // 12: TES (Top Esports)
  { id: 34, team_id: 12, role: "HEAD_COACH", name: "Despa1r", real_name: "Zhou Jie" },
  { id: 35, team_id: 12, role: "COACH", name: "River", real_name: "Wang Dong" },

  // 13: JDG (JD Gaming)
  { id: 36, team_id: 13, role: "HEAD_COACH", name: "WarHorse", real_name: "Chen Ju-Chih" },
  { id: 37, team_id: 13, role: "COACH", name: "Viod", real_name: "Lu Fan" },
  { id: 38, team_id: 13, role: "COACH", name: "Lyn", real_name: "Kim Da-bin" },

  // 14: WBG (Weibo Gaming)
  { id: 39, team_id: 14, role: "HEAD_COACH", name: "Daeny", real_name: "Yang Dae-in" },
  { id: 40, team_id: 14, role: "COACH", name: "Tabe", real_name: "Wong Pak Kan" },
  { id: 41, team_id: 14, role: "COACH", name: "Rui", real_name: "Zhu Rui" },

  // 15: LNG (LNG Esports)
  { id: 42, team_id: 15, role: "HEAD_COACH", name: "U", real_name: "Zeng Long" },
  { id: 43, team_id: 15, role: "COACH", name: "Dynasty", real_name: "Li Ting-Chun" },

  // 16: iG (Invictus Gaming)
  { id: 44, team_id: 16, role: "HEAD_COACH", name: "Mafa", real_name: "Won Sang-yeon" },
  { id: 45, team_id: 16, role: "COACH", name: "Rashomon", real_name: "Luo Bin" },

  // 17: EDG (EDward Gaming)
  { id: 46, team_id: 17, role: "HEAD_COACH", name: "Clearlove", real_name: "Ming Kai" },
  { id: 47, team_id: 17, role: "COACH", name: "Poppy", real_name: "Chang Po-Hao" },

  // 18: NIP (Ninjas in Pyjamas)
  { id: 48, team_id: 18, role: "HEAD_COACH", name: "Byun", real_name: "Byun Young-sub" },
  { id: 49, team_id: 18, role: "COACH", name: "Clare", real_name: "Fan Xiao-Hao" },

  // 19: WE (Team WE)
  { id: 50, team_id: 19, role: "HEAD_COACH", name: "Chubby", real_name: "Li Chuan-Chun" },
  { id: 51, team_id: 19, role: "COACH", name: "Condi", real_name: "Xiang Ren-Jie" },

  // 20: AL (Anyone's Legend)
  { id: 52, team_id: 20, role: "HEAD_COACH", name: "Tabe", real_name: "Wong Pak Kan" },
  { id: 53, team_id: 20, role: "COACH", name: "Qirann", real_name: "Xiao Hong-Jun" },

  // ==========================================
  // LEC (Teams 21 ~ 30)
  // ==========================================
  // 21: G2 (G2 Esports)
  { id: 54, team_id: 21, role: "HEAD_COACH", name: "Dylan Falco", real_name: "Dylan Falco" },
  { id: 55, team_id: 21, role: "COACH", name: "Rodrigo", real_name: "Rodrigo Oliveira" },
  { id: 56, team_id: 21, role: "COACH", name: "Duffman", real_name: "Christopher Duff" },

  // 22: FNC (Fnatic)
  { id: 57, team_id: 22, role: "HEAD_COACH", name: "Nightshare", real_name: "Tomáš Kněžínek" },
  { id: 58, team_id: 22, role: "COACH", name: "Gaax", real_name: "Pablo Pérez" },
  { id: 59, team_id: 22, role: "COACH", name: "Hiiva", real_name: "Aleksi Kaikkonen" },

  // 23: MDK (Movistar KOI)
  { id: 60, team_id: 23, role: "HEAD_COACH", name: "Melzhet", real_name: "Tomás Campelos" },
  { id: 61, team_id: 23, role: "COACH", name: "Reven", real_name: "Sung Sung-hoon" },
  { id: 62, team_id: 23, role: "COACH", name: "Zeph", real_name: "Quentin Viguié" },

  // 24: SHF (Shifters)
  { id: 63, team_id: 24, role: "HEAD_COACH", name: "Kirei", real_name: "Thomas Yuen" },
  { id: 64, team_id: 24, role: "COACH", name: "Nahovsky", real_name: "Bartłomiej Duda" },

  // 25: KC (Karmine Corp)
  { id: 65, team_id: 25, role: "HEAD_COACH", name: "Reeker", real_name: "Steven Chen" },
  { id: 66, team_id: 25, role: "COACH", name: "Shaves", real_name: "Kevin Tolman" },
  { id: 67, team_id: 25, role: "COACH", name: "Apples", real_name: "Dan Van Vo" },

  // 26: VIT (Team Vitality)
  { id: 68, team_id: 26, role: "HEAD_COACH", name: "Carter", real_name: "Alexander Cartwright" },
  { id: 69, team_id: 26, role: "COACH", name: "Hidon", real_name: "Harry Appelkvist" },

  // 27: SK (SK Gaming)
  { id: 70, team_id: 27, role: "HEAD_COACH", name: "Swiffer", real_name: "Scott Sheehan" },
  { id: 71, team_id: 27, role: "COACH", name: "Own3r", real_name: "David Rodríguez" },

  // 28: TH (Team Heretics)
  { id: 72, team_id: 28, role: "HEAD_COACH", name: "Machuki", real_name: "Víctor Machado" },
  { id: 73, team_id: 28, role: "COACH", name: "Kirei", real_name: "Thomas Yuen" },

  // 29: GX (GIANTX)
  { id: 74, team_id: 29, role: "HEAD_COACH", name: "Kaas", real_name: "Christophe van Oudheusden" },
  { id: 75, team_id: 29, role: "COACH", name: "Erelyth", real_name: "Álvaro Miguélez" },

  // 30: NAVI (Natus Vincere)
  { id: 76, team_id: 30, role: "HEAD_COACH", name: "Danusch", real_name: "Danusch Fischer" },
  { id: 77, team_id: 30, role: "COACH", name: "Inero", real_name: "Nick Smith" },

  // ==========================================
  // LCS (Teams 31 ~ 38)
  // ==========================================
  // 31: FLY (FlyQuest)
  { id: 78, team_id: 31, role: "HEAD_COACH", name: "Nukeduck", real_name: "Erlend Våtevik Holm" },
  { id: 79, team_id: 31, role: "COACH", name: "Mithy", real_name: "Alfonso Aguirre Rodríguez" },
  { id: 80, team_id: 31, role: "COACH", name: "RapidStar", real_name: "Jung Min-sung" },

  // 32: TL (Team Liquid)
  { id: 81, team_id: 32, role: "HEAD_COACH", name: "Spawn", real_name: "Jake Tiberi" },
  { id: 82, team_id: 32, role: "COACH", name: "Reignover", real_name: "Kim Yeu-jin" },
  { id: 83, team_id: 32, role: "COACH", name: "Haitham", real_name: "Haitham Algbory" },

  // 33: C9 (Cloud9)
  { id: 84, team_id: 33, role: "HEAD_COACH", name: "Reapered", real_name: "Han Gyu-sik" },
  { id: 85, team_id: 33, role: "COACH", name: "Hai", real_name: "Hai Du Lam" },
  { id: 86, team_id: 33, role: "COACH", name: "Bubbadub", real_name: "Royce Newcomb" },

  // 34: SEN (Sentinels)
  { id: 87, team_id: 34, role: "HEAD_COACH", name: "Inero", real_name: "Nick Smith" },
  { id: 88, team_id: 34, role: "COACH", name: "Thinkcard", real_name: "Thomas Slotkin" },

  // 35: SR (Shopify Rebellion)
  { id: 89, team_id: 35, role: "HEAD_COACH", name: "Reven", real_name: "Sung Sung-hoon" },
  { id: 90, team_id: 35, role: "COACH", name: "Stardust", real_name: "Son Seok-hee" },

  // 36: DIG (Dignitas)
  { id: 91, team_id: 36, role: "HEAD_COACH", name: "Rigby", real_name: "Han Sang-yong" },
  { id: 92, team_id: 36, role: "COACH", name: "Enep", real_name: "Lee Min-ho" },

  // 37: DSG (Disguised)
  { id: 93, team_id: 37, role: "HEAD_COACH", name: "Dan Dan", real_name: "Danny Le Comte" },
  { id: 94, team_id: 37, role: "COACH", name: "Empyros", real_name: "Konstantinos Natsis" },

  // 38: LYN (Lyon Gaming)
  { id: 95, team_id: 38, role: "HEAD_COACH", name: "Yash", real_name: "Yash Bhavsar" },
  { id: 96, team_id: 38, role: "COACH", name: "Arce", real_name: "Diego Arce Chang" },
];

async function seed() {
  console.log(`🚀 Seeding ${globalCoaches.length} authentic coaches across LPL, LEC, LCS...`);
  const { data, error } = await supabase.from("coaches").upsert(globalCoaches, { onConflict: "id" }).select();
  if (error) {
    console.error("❌ Seeding failed:", error.message);
  } else {
    console.log(`✅ Successfully seeded ${data?.length} coaches!`);
  }
}
seed();
