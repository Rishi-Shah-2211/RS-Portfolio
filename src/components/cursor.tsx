"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Cursor — a clean two-part pointer: a soft trailing ring and a crisp dot.
 * Subtle scale-up over interactive elements, no labels. Desktop only.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) {
      document.body.classList.remove("custom-cursor-on");
      return;
    }
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, [role=button], input, [data-cursor]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.9 : 0.55 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-8 w-8 rounded-full border border-ink/40"
        />
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[201] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta"
      />
    </>
  );
}
