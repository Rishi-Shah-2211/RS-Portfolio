"use client";

import { useEffect, useRef } from "react";

/**
 * WaterRipple trail — the cursor drags through the page like a hand
 * through still water. Each movement sheds concentric rings that expand,
 * thin out, and dissolve; faster strokes shed bigger, stronger rings.
 * Subtle ink/sapphire strokes on the porcelain base. Canvas 2D, desktop
 * only, pointer-transparent; rAF sleeps once the surface settles.
 */

type Ripple = {
  x: number;
  y: number;
  born: number;
  life: number;
  maxR: number;
  strength: number; // 0..1, from cursor speed
};

export default function FluidTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!fine || !motionOk || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const ripples: Ripple[] = [];
    let raf = 0;
    let running = false;
    let last = { x: -999, y: -999, t: 0 };

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        const t = (now - rp.born) / rp.life;
        if (t >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        // radius eases out like a real wave-front; alpha dies with the wave
        const ease = 1 - Math.pow(1 - t, 2.2);
        const r = rp.maxR * ease;
        const fade = Math.pow(1 - t, 1.7) * rp.strength;

        // wave-front ring (ink-sapphire)
        ctx.strokeStyle = `rgba(35, 58, 114, ${0.34 * fade})`;
        ctx.lineWidth = 2.2 * (1 - t) + 0.4;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // trailing inner ring — softer, slightly behind the front
        if (r > 14) {
          ctx.strokeStyle = `rgba(35, 58, 114, ${0.16 * fade})`;
          ctx.lineWidth = 1.1 * (1 - t) + 0.3;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, r * 0.62, 0, Math.PI * 2);
          ctx.stroke();
        }

        // faint highlight crescent — light catching the wave
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * fade})`;
        ctx.lineWidth = 1.4 * (1 - t) + 0.3;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, r + 1.5, -0.9, 0.6);
        ctx.stroke();
      }

      if (ripples.length) {
        raf = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 34) return;
      const dt = Math.max(now - last.t, 1);
      const speed = Math.min(dist / dt, 3); // px per ms
      last = { x: e.clientX, y: e.clientY, t: now };

      ripples.push({
        x: e.clientX,
        y: e.clientY,
        born: now,
        life: 850 + speed * 250,
        maxR: 36 + speed * 46 + Math.random() * 12,
        strength: 0.55 + Math.min(speed / 2.4, 1) * 0.45,
      });
      if (ripples.length > 28) ripples.splice(0, ripples.length - 28);

      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    // a gentle "plonk" on click — a bigger, slower ring
    const onDown = (e: PointerEvent) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        born: performance.now(),
        life: 1300,
        maxR: 120,
        strength: 1,
      });
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[95]"
      aria-hidden
    />
  );
}
