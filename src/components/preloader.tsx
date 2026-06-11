"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Preloader — editorial counter that runs 0 → 100 with easing, then the
 * ivory curtain lifts with a curved bottom edge. Locks scroll while visible.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 1700;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // easeOutQuart — fast start, settles into 100
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-cream px-6 py-8 md:px-10"
          aria-hidden
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl tracking-tight text-ink">
              Rishi<span className="text-terracotta">.</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
              Portfolio — 2026
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-lg italic text-ink-soft md:text-2xl"
              >
                Software, engineered with intent.
              </motion.p>
            </div>
            <span className="font-display text-[clamp(4rem,14vw,9rem)] font-light leading-none tracking-[-0.04em] text-ink tabular-nums">
              {progress}
            </span>
          </div>

          {/* progress hairline */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-ink/10">
            <div
              className="h-full bg-terracotta transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
