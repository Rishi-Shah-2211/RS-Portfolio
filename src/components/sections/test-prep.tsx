"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PREP_APPS, type PrepApp } from "@/lib/test-prep";

/**
 * Test-Prep Suite — pinned horizontal gallery. The section pins to the
 * viewport while vertical scroll drives the row of exam cards sideways,
 * with a giant ghost wordmark drifting at half speed behind them.
 */
export default function TestPrep() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0.08, 0.95], ["0%", "-62%"]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["6%", "-28%"]);
  const barW = useTransform(scrollYProgress, [0.08, 0.95], ["0%", "100%"]);

  return (
    <section id="test-prep" ref={ref} className="relative h-[420svh] bg-cream">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col justify-center overflow-hidden">
        <div className="paper-grain pointer-events-none absolute inset-0" aria-hidden />

        {/* ghost wordmark */}
        <motion.span
          style={{ x: ghostX }}
          aria-hidden
          className="pointer-events-none absolute top-[6%] left-0 select-none whitespace-nowrap font-display text-[clamp(7rem,22vw,19rem)] font-light italic leading-none tracking-[-0.05em] text-ink/[0.05] will-change-transform"
        >
          Test-Prep Suite — IELTS · GRE · SAT
        </motion.span>

        {/* header */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              04 — Test-Prep Suite
            </span>
          </div>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2rem,5vw,4.25rem)] font-light leading-[0.98] tracking-[-0.04em] text-ink">
            One exam engine,{" "}
            <span className="italic text-terracotta">four standardized tests.</span>
          </h2>
        </div>

        {/* horizontal track */}
        <motion.div
          style={{ x }}
          className="relative z-10 mt-10 flex w-max gap-5 pl-6 pr-[20vw] md:mt-14 md:gap-8 md:pl-10 will-change-transform"
        >
          {PREP_APPS.map((app) => (
            <PrepCard key={app.index} app={app} />
          ))}
          {/* trailing note card */}
          <div className="flex w-[68vw] shrink-0 items-center justify-center sm:w-[44vw] md:w-[26vw]">
            <p className="max-w-[280px] text-sm leading-[1.8] text-ink-soft">
              A family of computer-delivered exam simulators built for a
              test-prep institute — shared timing, scoring, and review
              infrastructure underneath; each exam&rsquo;s real interface
              faithfully recreated on top.
            </p>
          </div>
        </motion.div>

        {/* progress bar */}
        <div className="relative z-10 mx-auto mt-10 w-full max-w-[1400px] px-6 md:mt-14 md:px-10">
          <div className="h-px w-full bg-ink/10">
            <motion.div style={{ width: barW }} className="h-px bg-terracotta" />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
            <span>Keep scrolling</span>
            <span>3 live · 1 in development</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrepCard({ app }: { app: PrepApp }) {
  const live = app.status === "live";

  const inner = (
    <div className="group relative flex h-[52svh] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-md border border-ink/10 bg-paper p-7 transition-colors duration-500 hover:border-ink/25 sm:w-[58vw] md:h-[56svh] md:w-[38vw] md:p-9">
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
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] ${
            live
              ? "border-ink/10 bg-cream-dim/80 text-ink"
              : "border-ink/10 bg-cream-dim/40 text-ink-mute"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulse" : ""}`}
            style={{ background: live ? app.accent : "#968e80" }}
          />
          {live ? "Live" : "In development"}
        </span>
      </div>

      <div className="relative">
        <h3 className="font-display text-[clamp(3rem,9vw,6.5rem)] font-light leading-none tracking-[-0.04em] text-ink">
          {app.exam}
        </h3>
        {app.variant && (
          <p
            className="mt-2 font-display text-lg italic leading-snug md:text-2xl"
            style={{ color: app.accent }}
          >
            {app.variant}
          </p>
        )}
        <p className="mt-4 line-clamp-4 max-w-md text-[13px] leading-[1.7] text-ink-soft md:text-sm">
          {app.description}
        </p>
      </div>

      <div className="relative flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {app.modules.map((m) => (
            <span
              key={m}
              className="rounded-full border border-ink/15 bg-cream px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft md:text-[10px]"
            >
              {m}
            </span>
          ))}
        </div>
        {live && (
          <span className="inline-flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink transition-transform duration-500 group-hover:translate-x-1">
            Visit ↗
          </span>
        )}
      </div>
    </div>
  );

  return live && app.url ? (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="visit"
      className="block shrink-0"
    >
      {inner}
    </a>
  ) : (
    <div className="block shrink-0">{inner}</div>
  );
}
