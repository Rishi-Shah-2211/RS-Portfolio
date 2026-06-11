"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import { Reveal, SplitWords } from "@/components/reveal";

export default function Projects() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: headProgress } = useScroll({
    target: headRef,
    offset: ["start end", "end start"],
  });
  const headX = useTransform(headProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="work" className="relative w-full bg-cream py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              03 — Selected Work
            </span>
          </div>
        </Reveal>

        <motion.h2
          ref={headRef}
          style={{ x: headX }}
          className="mt-8 max-w-5xl font-display text-[clamp(2.25rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.04em] text-ink will-change-transform"
        >
          <SplitWords text="Seven products," />{" "}
          <span className="italic text-terracotta">
            <SplitWords text="all live," delay={0.1} />
          </span>{" "}
          <SplitWords text="all shipped." delay={0.2} />
        </motion.h2>

        <div className="mt-20 space-y-32 md:space-y-44">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  // Typed against the union of element types this handler is bound to —
  // anchor for public projects, div for NDA cards. Both expose
  // `currentTarget.getBoundingClientRect`, so the parallax math is identical.
  const onMove = (e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  // Slugify so multi-word project names produce hyphenated filenames
  // ("Kusum Farm" → kusum-farm.jpg) instead of spaces in URLs.
  const slug = project.name.toLowerCase().replace(/\s+/g, "-");
  const screenshot = `/screens/${slug}.jpg`;
  const hasScreenshot = project.hasScreenshot !== false;
  const isPrivate = project.privateProject === true;

  // The preview block is a link when public, a static panel when under NDA.
  // We share the inner content between both modes to keep the visual rhythm.
  const previewInner = (
    <>
      <motion.div
        style={{
          y,
          rotateX: rx,
          rotateY: ry,
          transformStyle: "preserve-3d",
        }}
        className="relative h-[112%] w-full will-change-transform"
      >
        {hasScreenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screenshot}
            alt={`${project.name} preview`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          // Typographic placeholder for projects without a captured screenshot.
          // Layered radial + linear gradients in the project's accent give each
          // card a distinct, premium-looking surface without needing imagery.
          <div
            className="absolute inset-0 h-full w-full transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
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
                <div className="mt-4 font-display text-3xl font-light leading-[1.05] tracking-[-0.03em] text-cream-dim md:text-5xl">
                  {project.name}
                </div>
                <div className="mt-3 max-w-md text-xs leading-relaxed text-cream-dim/70 md:text-sm">
                  {project.tagline}
                </div>
              </div>
            </div>
            {/* hairline crosshatch — subtle texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>
        )}

        {hasScreenshot && (
          <>
            {/* color wash (only over a real screenshot) */}
            <div
              className="absolute inset-0 mix-blend-soft-light opacity-50 transition-opacity duration-700 group-hover:opacity-30"
              style={{
                background: `linear-gradient(135deg, ${project.accent}55, transparent 60%)`,
              }}
            />
            {/* sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10" />
          </>
        )}
      </motion.div>

      <div className="absolute inset-0 ring-1 ring-inset ring-ink/15" />

      {/* corner badge */}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-ink/10 bg-cream-dim/80 px-3 py-1.5 backdrop-blur-md">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: project.accent }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
          {isPrivate ? "Under NDA" : "Live"} · {project.year}
        </span>
      </div>

      {/* bottom-right action: Visit when public, NDA chip when private */}
      <div
        className={`absolute bottom-4 right-4 flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-md transition-transform duration-500 ${
          isPrivate
            ? "border border-cream-dim/20 bg-ink/70 text-cream-dim/85"
            : "bg-ink/90 text-cream-dim group-hover:-translate-y-1"
        }`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
          {isPrivate ? "Private" : "Visit"}
        </span>
        {!isPrivate && <span>↗</span>}
      </div>
    </>
  );

  return (
    <article ref={ref} className="relative grid gap-10 md:grid-cols-12 md:items-center md:gap-14">
      {/* preview */}
      <div className={flip ? "md:col-span-7 md:col-start-6" : "md:col-span-7 md:col-start-1"}>
        {isPrivate ? (
          <div
            data-cursor="locked"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="group relative block aspect-[16/10] w-full overflow-hidden rounded-md bg-cream-dim shadow-[0_42px_120px_-46px_rgba(125,31,46,0.22)]"
            style={{ perspective: "1200px" }}
          >
            {previewInner}
          </div>
        ) : (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="visit"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="group relative block aspect-[16/10] w-full overflow-hidden rounded-md bg-cream-dim shadow-[0_42px_120px_-46px_rgba(125,31,46,0.22)]"
            style={{ perspective: "1200px" }}
          >
            {previewInner}
          </a>
        )}
      </div>

      {/* meta */}
      <div className={flip ? "md:col-span-5 md:col-start-1 md:row-start-1" : "md:col-span-5 md:col-start-8"}>
        <motion.div style={{ y: titleY }}>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              {project.index}
            </span>
            <span className="h-px flex-1 bg-ink/15" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
              {project.role}
            </span>
          </div>

          <h3 className="mt-5 font-display text-5xl font-light leading-none tracking-[-0.04em] text-ink md:text-6xl">
            {project.name}
          </h3>
          <p className="mt-4 font-display text-xl italic leading-snug text-terracotta md:text-2xl">
            {project.tagline}
          </p>

          <p className="mt-6 text-[15px] leading-[1.7] text-ink-soft md:text-base">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span style={{ color: project.accent }} className="mt-[7px]">
                  ●
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/15 bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
