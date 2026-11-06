# HotStoveLeague 🔥

> Professional League of Legends Off-season Roster & Intelligence Terminal  
> Live URL: [https://hotstoveleague.lol](https://hotstoveleague.lol)

HotStoveLeague provides real-time AI-refined transfer predictions, verified official rosters, and tier-1 insider rumors across major global leagues (LCK, LPL, LEC, LCS, LCP, CBLOL).

---

## Key Features

- **Real-Time Transfer Tracker:** Chronological feed of official team announcements and verified insider rumors.
- **Roster Viewer:** Switch seamlessly between 2026 registered rosters and 2027 predicted off-season rosters.
- **Multi-League Coverage:** Full roster and rumor tracking for LCK, LPL, LEC, LCS, LCP, and CBLOL.
- **Strict Integrity System:** 1-to-1 player assignment with zero multi-team splits.
- **Multi-Language Support:** Instant switching between English (`en`), Korean (`ko`), and Simplified Chinese (`zh`).
- **Financial Terminal UI:** Clean, high-density Binance-inspired dark financial interface built with Tailwind CSS.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router, Turbopack)
- **Database & Auth:** [Supabase](https://supabase.com) (PostgreSQL)
- **Styling:** [Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev)
- **Package Manager:** [pnpm](https://pnpm.io)

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/hotstoveleague.git
cd hotstoveleague
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## License

MIT © 2026 [HotStoveLeague](https://hotstoveleague.lol)
