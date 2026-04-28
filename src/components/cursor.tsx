"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 1200, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 50, mass: 0.2 });
  const ref = useRef<HTMLDivElement>(null);

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
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role=button], [data-cursor]",
      ) as HTMLElement | null;
      setHovering(!!interactive);
      setLabel(interactive?.getAttribute("data-cursor") ?? null);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        ref={ref}
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: hovering ? 2.4 : 1,
            backgroundColor: hovering ? "rgba(232,112,44,0.16)" : "rgba(216,201,166,0.08)",
            borderColor: hovering ? "rgba(232,112,44,0.72)" : "rgba(216,201,166,0.42)",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm"
        >
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed left-0 top-0 z-[201] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta"
      />
    </>
  );
}
