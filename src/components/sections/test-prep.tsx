"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { PREP_APPS, type PrepApp } from "@/lib/test-prep";
import { Reveal, Reveal3D, SplitWords } from "@/components/reveal";

export default function TestPrep() {
  return (
    <section id="test-prep" className="relative w-full bg-paper py-32 md:py-44">
      <div className="paper-grain pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              04 — Test-Prep Suite
            </span>
          </div>
        </Reveal>

        <h2 className="mt-8 max-w-5xl font-display text-[clamp(2.25rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.04em] text-ink">
          <SplitWords text="One exam engine," />{" "}
          <span className="italic text-terracotta">
            <SplitWords text="four standardized tests." delay={0.1} />
          </span>
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-[15px] leading-[1.7] text-ink-soft md:text-base">
            A family of computer-delivered exam simulators I&rsquo;m building for a
            test-prep institute — shared timing, scoring, and review
            infrastructure underneath, with each exam&rsquo;s real interface and
            marking rubric faithfully recreated on top. Three are live today;
            the fourth is on the bench.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {PREP_APPS.map((app, i) => (
            <PrepCard key={app.index} app={app} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrepCard({ app, delay }: { app: PrepApp; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const live = app.status === "live";

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative h-full overflow-hidden rounded-md border border-ink/10 bg-cream p-8 transition-colors duration-500 hover:border-ink/25 md:p-10"
    >
      {/* accent wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(110% 80% at 80% 0%, ${app.accent}1f 0%, transparent 60%)`,
        }}
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
          {app.index}
        </span>
        <span
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] ${
            live
              ? "border-ink/10 bg-cream-dim/80 text-ink"
              : "border-ink/10 bg-cream-dim/40 text-ink-mute"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulse" : ""}`}
            style={{ background: live ? app.accent : "#8a8275" }}
          />
          {live ? "Live" : "In development"}
        </span>
      </div>

      <h3 className="mt-8 font-display text-5xl font-light leading-none tracking-[-0.04em] text-ink md:text-6xl">
        {app.exam}
      </h3>
      {app.variant && (
        <p className="mt-2 font-display text-xl italic leading-snug md:text-2xl" style={{ color: app.accent }}>
          {app.variant}
        </p>
      )}

      <p className="mt-6 text-[15px] leading-[1.7] text-ink-soft">
        {app.description}
      </p>

      <div className="mt-7 flex flex-wrap gap-1.5">
        {app.modules.map((m) => (
          <span
            key={m}
            className="rounded-full border border-ink/15 bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft"
          >
            {m}
          </span>
        ))}
      </div>

      <div className="relative mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          {live ? "Open simulator" : "Shipping next"}
        </span>
        {live && (
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-transform duration-500 group-hover:translate-x-1">
            Visit <span>↗</span>
          </span>
        )}
      </div>
    </motion.div>
  );

  return (
    <Reveal3D delay={delay} className="h-full">
      {live && app.url ? (
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="visit"
          className="block h-full"
          style={{ perspective: "1200px" }}
        >
          {inner}
        </a>
      ) : (
        <div className="block h-full" style={{ perspective: "1200px" }}>
          {inner}
        </div>
      )}
    </Reveal3D>
  );
}
