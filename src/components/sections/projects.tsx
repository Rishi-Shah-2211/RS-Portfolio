"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { PROJECTS, type Project } from "@/lib/projects";
import DistortImage from "@/components/distort-image";

/**
 * Projects — full-screen stacking panels. Each project pins to the viewport
 * and the next slides over it while the pinned one scales back and dims,
 * like a deck of posters being laid down one over another.
 */
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" ref={containerRef} className="relative bg-cream">
      {PROJECTS.map((p, i) => (
        <div key={p.name} className="contents">
          <Panel
            project={p}
            index={i}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
          {/* rest zone — keeps the panel fully visible (and its Visit button
              clickable) for a beat before the next panel slides over */}
          {i < PROJECTS.length - 1 && <div className="h-[55svh]" aria-hidden />}
        </div>
      ))}
    </section>
  );
}

function Panel({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // While the NEXT panel slides over this one, scale back + dim. The
  // transition only spans the tail of each slot — the head is the rest zone
  // where the panel sits fully visible and interactive.
  const start = index / total;
  const end = (index + 1) / total;
  const overlapStart = start + (end - start) * 0.62;
  const scale = useTransform(progress, [overlapStart, end], [1, 0.92]);
  const dim = useTransform(progress, [overlapStart, end], [0, 0.35]);
  // slow parallax drift for the screenshot inside its frame
  const imgY = useTransform(progress, [start, end], ["-7%", "7%"]);

  const slug = project.name.toLowerCase().replace(/\s+/g, "-");
  const hasScreenshot = project.hasScreenshot !== false;
  const isPrivate = project.privateProject === true;
  const alt = index % 2 === 1;

  const inner = (
    <motion.div
      style={{ scale }}
      className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-none bg-paper px-6 pb-8 pt-24 md:px-12 md:pb-10 md:pt-28"
    >
      {/* ghost index */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[clamp(10rem,30vw,26rem)] font-light leading-none tracking-[-0.05em] text-ink/[0.045]"
      >
        {project.index}
      </span>

      {/* top meta row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-ink/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-soft md:text-[11px]">
            {project.index} / 0{total} — {project.role}
          </span>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-ink/10 bg-cream/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
          {isPrivate ? "Under NDA" : "Live"} · {project.year}
        </span>
      </div>

      {/* core: name + image */}
      <div className="relative z-10 grid flex-1 items-center gap-8 py-6 md:grid-cols-12 md:gap-12">
        <div className={`md:col-span-5 ${alt ? "md:order-2" : ""}`}>
          <h3 className="font-display text-[clamp(2.75rem,7.5vw,7rem)] font-light leading-[0.92] tracking-[-0.04em] text-ink">
            {project.name}
          </h3>
          <p className="mt-4 font-display text-lg italic leading-snug text-terracotta md:text-2xl">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-md text-sm leading-[1.7] text-ink-soft md:text-[15px]">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/15 bg-cream px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft md:text-[10px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className={`relative md:col-span-7 ${alt ? "md:order-1" : ""}`}>
          <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-md shadow-[0_50px_120px_-40px_rgba(22,19,15,0.35)]">
            {hasScreenshot ? (
              <div className="absolute inset-0">
                <DistortImage src={`/screens/${slug}.jpg`} alt={`${project.name} preview`} />
              </div>
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    radial-gradient(120% 90% at 15% 10%, ${project.accent}55 0%, transparent 60%),
                    radial-gradient(120% 90% at 85% 90%, ${project.accent}33 0%, transparent 55%),
                    linear-gradient(135deg, #1a1a1d 0%, #2a2a2f 100%)
                  `,
                }}
              >
                <div className="absolute inset-0 grid place-items-center px-8 text-center">
                  <div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: project.accent }}
                    >
                      {isPrivate ? "Under NDA" : "Live"} · {project.year}
                    </div>
                    <div className="mt-4 font-display text-3xl font-light leading-[1.05] tracking-[-0.03em] text-cream md:text-5xl">
                      {project.name}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" />
          </div>
        </div>
      </div>

      {/* bottom row: highlights + visit */}
      <div className="relative z-10 flex flex-col gap-4 border-t border-ink/10 pt-5 md:flex-row md:items-center md:justify-between">
        <ul className="hidden flex-wrap gap-x-8 gap-y-1 text-xs text-ink-soft md:flex">
          {project.highlights.slice(0, 2).map((h) => (
            <li key={h} className="flex items-center gap-2">
              <span style={{ color: project.accent }}>●</span>
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/work/${slug}`}
            data-cursor="read"
            className="group/cs inline-flex w-fit items-center gap-3 rounded-full border border-ink/25 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-cream md:text-xs"
          >
            Case study
            <span className="inline-block transition-transform duration-500 group-hover/cs:translate-x-0.5">
              →
            </span>
          </Link>
          {!isPrivate && project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="visit"
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cream md:text-xs"
            >
              Visit {project.name}
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ) : (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-soft md:text-xs">
              Private engagement
            </span>
          )}
        </div>
      </div>

      {/* dimmer as next panel slides over */}
      <motion.div
        style={{ opacity: dim }}
        className="pointer-events-none absolute inset-0 z-20 bg-ink"
        aria-hidden
      />
    </motion.div>
  );

  return (
    <div className="sticky top-0 h-[100svh] w-full" style={{ zIndex: index + 1 }}>
      {inner}
    </div>
  );
}
