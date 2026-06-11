"use client";

import { useEffect, useState } from "react";

/** Live IST clock + availability chip shown in the contact section. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-2 rounded-full border border-ink/15 bg-cream-dim/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80 backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" />
        Available for work
      </span>
      <span className="rounded-full border border-ink/15 bg-cream-dim/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80 backdrop-blur tabular-nums">
        {time ?? "--:--:--"} IST · Gujarat, India
      </span>
    </div>
  );
}
