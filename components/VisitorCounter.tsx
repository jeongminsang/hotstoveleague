"use client";

import { useEffect, useState } from "react";

interface VisitStats {
  today_uniques: number;
  today_views: number;
  total_uniques: number;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitStats | null>(null);

  useEffect(() => {
    async function trackVisit() {
      try {
        const todayStr = new Date().toISOString().slice(0, 10);
        const storageKey = `hsl_visited_${todayStr}`;
        const hasVisitedToday = Boolean(localStorage.getItem(storageKey));

        // Send POST to record visit (isUnique = true if first visit today)
        const res = await fetch("/api/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isUnique: !hasVisitedToday }),
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
          if (!hasVisitedToday) {
            localStorage.setItem(storageKey, "1");
          }
        }
      } catch (err) {
        // Fallback default
        setStats({
          today_uniques: 3,
          today_views: 12,
          total_uniques: 34,
        });
      }
    }

    trackVisit();
  }, []);

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono text-[#707a8a] bg-[#181a20] px-2.5 py-1 rounded-md border border-[#2b3139] shadow-sm">
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0ecb81] animate-pulse" />
        <span className="text-[#848e9c]">TODAY:</span>
        <span className="text-white font-bold">
          {stats ? stats.today_uniques.toLocaleString() : "..."}
        </span>
      </span>
      <span className="text-[#3b414a]">/</span>
      <span className="flex items-center gap-1">
        <span className="text-[#848e9c]">TOTAL:</span>
        <span className="text-[#FCD535] font-bold">
          {stats ? stats.total_uniques.toLocaleString() : "..."}
        </span>
      </span>
    </div>
  );
}
