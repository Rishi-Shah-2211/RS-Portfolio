"use client";

import { useEffect, useRef } from "react";

/**
 * StarDust trail — a comet of self-shining particles pours out of the
 * cursor: deep-sapphire orbs with soft glowing halos and champagne-gold
 * four-point star flares that twinkle as they drift, shrink, and die.
 * Depth illusion: near particles are large and soft, far ones small and
 * sharp, all easing apart in 3D-ish drift. Canvas 2D, desktop only,
 * pointer-transparent; the rAF loop sleeps when the dust settles.
 */

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  life: number;
  size: number;
  depth: number; // 0 far → 1 near
  gold: boolean;
  phase: number;
  spin: number;
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

    const parts: P[] = [];
    let raf = 0;
    let running = false;
    let lastSpawn = { x: -999, y: -999 };

    const spawn = (x: number, y: number, speed: number) => {
      const n = Math.min(2 + Math.floor(speed / 18), 4);
      for (let i = 0; i < n; i++) {
        const depth = Math.random();
        parts.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4 - 0.25,
          born: performance.now(),
          life: 600 + Math.random() * 500,
          size: 2.5 + depth * 7,
          depth,
          gold: Math.random() < 0.4,
          phase: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.006,
        });
      }
      if (parts.length > 140) parts.splice(0, parts.length - 140);
    };

    const star = (x: number, y: number, r: number, rot: number) => {
      ctx.beginPath();
      for (let a = 0; a < 4; a++) {
        const ang = rot + (a * Math.PI) / 2;
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(ang) * r, y + Math.sin(ang) * r);
      }
      ctx.stroke();
    };

    const draw = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        const t = (now - p.born) / p.life;
        if (t >= 1) {
          parts.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.004; // gentle float upward

        const fade = Math.pow(1 - t, 1.4);
        // self-shine: each particle twinkles on its own rhythm
        const twinkle = 0.55 + 0.45 * Math.sin(p.phase + now / (90 + p.depth * 110));
        const a = fade * twinkle;
        const r = p.size * (1 - t * 0.5);

        if (p.gold) {
          // champagne star flare
          ctx.strokeStyle = `rgba(168, 146, 224, ${0.75 * a})`;
          ctx.lineWidth = 1 + p.depth;
          star(p.x, p.y, r * 2.6, now * p.spin + p.phase);
          ctx.fillStyle = `rgba(220, 204, 245, ${0.9 * a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 0.55, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // sapphire orb with glowing halo
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.4);
          grad.addColorStop(0, `rgba(108, 99, 214, ${0.85 * a})`);
          grad.addColorStop(0.45, `rgba(122, 108, 220, ${0.35 * a})`);
          grad.addColorStop(1, "rgba(122, 108, 220, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 2.4, 0, Math.PI * 2);
          ctx.fill();
          // bright core
          ctx.fillStyle = `rgba(74, 63, 174, ${0.9 * a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (parts.length) {
        raf = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - lastSpawn.x;
      const dy = e.clientY - lastSpawn.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 22) return;
      lastSpawn = { x: e.clientX, y: e.clientY };
      spawn(e.clientX, e.clientY, dist);
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
