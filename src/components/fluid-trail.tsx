"use client";

import { useEffect, useRef } from "react";

/**
 * GooeyTrail — a liquid plum blob that lags behind the cursor and merges
 * like mercury. A short chain of circles each chase the one ahead; an SVG
 * goo filter fuses them into one shape, so fast moves stretch it into a
 * teardrop and stillness lets it snap back round. Desktop only,
 * pointer-transparent, sleeps when the pointer rests.
 */

const N = 6; // chain length

export default function FluidTrail() {
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !motionOk) return;

    const pts = Array.from({ length: N }, () => ({ x: -100, y: -100 }));
    const target = { x: -100, y: -100 };
    let raf = 0;
    let idle = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      idle = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      // head chases the cursor fast; each link eases toward the one ahead
      pts[0].x += (target.x - pts[0].x) * 0.35;
      pts[0].y += (target.y - pts[0].y) * 0.35;
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.4;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.4;
      }
      let moving = 0;
      for (let i = 0; i < N; i++) {
        const c = circlesRef.current[i];
        if (c) {
          c.setAttribute("cx", String(pts[i].x));
          c.setAttribute("cy", String(pts[i].y));
        }
      }
      moving = Math.hypot(target.x - pts[N - 1].x, target.y - pts[N - 1].y);
      if (moving < 0.6) idle++;
      if (idle > 30) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[95] h-full w-full"
      aria-hidden
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
      <g filter="url(#goo)" fill="#6e2746" opacity="0.5">
        {Array.from({ length: N }).map((_, i) => (
          <circle
            key={i}
            ref={(el) => {
              circlesRef.current[i] = el;
            }}
            cx={-100}
            cy={-100}
            r={16 - i * 2}
          />
        ))}
      </g>
    </svg>
  );
}
