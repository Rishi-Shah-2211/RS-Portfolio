"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * FluidTrail — translucent ink-in-water blobs bloom along the cursor's
 * path everywhere on the site and dissolve. Soft radial gradients in the
 * maison palette (sapphire / champagne gold), heavily blurred so adjacent
 * blobs visually merge into one flowing ribbon of fluid.
 * Desktop pointers only; sits above content but under the grain overlay,
 * fully pointer-transparent.
 */

const TINTS = [
  "radial-gradient(circle, rgba(35,58,114,0.20) 0%, rgba(35,58,114,0.07) 45%, transparent 70%)",
  "radial-gradient(circle, rgba(176,141,68,0.16) 0%, rgba(176,141,68,0.05) 45%, transparent 70%)",
  "radial-gradient(circle, rgba(22,37,77,0.16) 0%, rgba(22,37,77,0.05) 45%, transparent 70%)",
];

type Blob = { id: number; x: number; y: number; size: number; tint: string };

export default function FluidTrail() {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const last = useRef({ x: -999, y: -999 });
  const counter = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !motionOk) return;

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (dx * dx + dy * dy < 70 * 70) return;
      last.current = { x: e.clientX, y: e.clientY };
      const id = counter.current++;
      const blob: Blob = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: 110 + Math.random() * 90,
        tint: TINTS[id % TINTS.length],
      };
      setBlobs((b) => [...b.slice(-11), blob]);
      setTimeout(() => setBlobs((b) => b.filter((it) => it.id !== id)), 950);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95]" aria-hidden>
      <AnimatePresence>
        {blobs.map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
            style={{
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              background: b.tint,
              filter: "blur(14px)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
