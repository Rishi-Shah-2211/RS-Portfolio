"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * StatsBand — a bold strip of headline numbers that count up from zero the
 * first time it scrolls into view. Gives a recruiter the shape of the work
 * in one glance before they read a single case study.
 */

const STATS = [
  { value: 7, label: "Products in production", note: "All live" },
  { value: 5, label: "Platforms shipped", note: "Web · Android · iOS · Win · macOS" },
  { value: 2, label: "Engineering internships", note: "Front-end · Full-stack" },
  { value: 1, label: "Published paper", note: "Springer · ICAIS 2025" },
];

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      ref={ref}
      className="relative w-full border-y border-ink/10 bg-cream-dim/40 py-14 md:py-20"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-6 md:grid-cols-4 md:gap-x-8 md:px-10">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-col">
            <Counter to={s.value} run={inView} delay={i * 140} />
            <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink md:text-[11px]">
              {s.label}
            </span>
            <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-mute md:text-[10px]">
              {s.note}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Counter({ to, run, delay }: { to: number; run: boolean; delay: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const DURATION = 1100;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min((now - start) / DURATION, 1);
        // easeOutExpo — fast then settle
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setN(Math.round(eased * to));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, to, delay]);

  return (
    <span className="font-display text-[clamp(3.25rem,9vw,6.5rem)] font-light leading-[0.85] tracking-[-0.04em] text-ink tabular-nums">
      {String(n).padStart(2, "0")}
    </span>
  );
}
