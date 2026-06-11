"use client";

import { useEffect, useRef } from "react";

/**
 * FluidTrail — a dark ink ribbon that flows behind the cursor like a
 * calligraphy stroke being pulled through water. Canvas-drawn: a tapered
 * comet of deep sapphire ink with a fine champagne-gold core, fading as it
 * ages so the eye naturally follows wherever the cursor travels.
 * Desktop pointers only; pointer-transparent; rAF pauses when idle.
 */

type Pt = { x: number; y: number; t: number };

const LIFE = 650; // ms a point stays alive

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
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };
    resize();
    window.addEventListener("resize", resize);

    const points: Pt[] = [];
    let raf = 0;
    let running = false;

    const draw = () => {
      const now = performance.now();
      while (points.length && now - points[0].t > LIFE) points.shift();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (points.length > 2) {
        // draw newest-to-oldest as tapered segments: wide & dark at the
        // cursor, thinning and fading toward the tail
        for (let i = points.length - 1; i > 1; i--) {
          const p0 = points[i - 1];
          const p1 = points[i];
          const age = (now - p1.t) / LIFE; // 0 fresh → 1 dead
          const fade = Math.pow(1 - age, 1.6);
          const mx = (p0.x + p1.x) / 2;
          const my = (p0.y + p1.y) / 2;

          // outer ink — deep sapphire
          ctx.strokeStyle = `rgba(22, 37, 77, ${0.38 * fade})`;
          ctx.lineWidth = 22 * fade + 1;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.quadraticCurveTo(p0.x, p0.y, mx, my);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();

          // fine gold core
          ctx.strokeStyle = `rgba(176, 141, 68, ${0.5 * fade})`;
          ctx.lineWidth = 2.5 * fade + 0.4;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      }

      if (points.length) {
        raf = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      const lastPt = points[points.length - 1];
      // interpolate fast moves so the ribbon stays continuous
      if (lastPt) {
        const dx = e.clientX - lastPt.x;
        const dy = e.clientY - lastPt.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(Math.floor(dist / 14), 6);
        for (let s = 1; s <= steps; s++) {
          points.push({
            x: lastPt.x + (dx * s) / (steps + 1),
            y: lastPt.y + (dy * s) / (steps + 1),
            t: performance.now(),
          });
        }
      }
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (points.length > 90) points.splice(0, points.length - 90);
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
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
