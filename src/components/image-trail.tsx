"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SHOTS = [
  "/screens/vantage.jpg",
  "/screens/bellwether.jpg",
  "/screens/planmate.jpg",
  "/screens/optivise.jpg",
  "/screens/kusum-farm.jpg",
  "/screens/gurukrupa-jewellers.jpg",
];

type Ghost = { id: number; x: number; y: number; src: string; rot: number };

/**
 * ImageTrail — project thumbnails bloom along the cursor's path and melt
 * away. Mount inside a `relative` section; it listens on its parent.
 * Desktop pointers only.
 */
export default function ImageTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const last = useRef({ x: -999, y: -999 });
  const counter = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parent = ref.current?.parentElement;
    if (!fine || !motionOk || !parent) return;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const dx = x - last.current.x;
      const dy = y - last.current.y;
      if (dx * dx + dy * dy < 110 * 110) return;
      last.current = { x, y };
      const id = counter.current++;
      const ghost: Ghost = {
        id,
        x,
        y,
        src: SHOTS[id % SHOTS.length],
        rot: (Math.random() - 0.5) * 14,
      };
      setGhosts((g) => [...g.slice(-7), ghost]);
      setTimeout(() => {
        setGhosts((g) => g.filter((it) => it.id !== id));
      }, 750);
    };

    parent.addEventListener("pointermove", onMove, { passive: true });
    return () => parent.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {ghosts.map((g) => (
          <motion.img
            key={g.id}
            src={g.src}
            alt=""
            initial={{ opacity: 0, scale: 0.45, rotate: g.rot }}
            animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute h-auto w-36 -translate-x-1/2 -translate-y-1/2 rounded-sm object-cover shadow-[0_24px_60px_-20px_rgba(22,19,15,0.45)] md:w-44"
            style={{ left: g.x, top: g.y }}
            draggable={false}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
