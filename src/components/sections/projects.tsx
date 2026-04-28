"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { PROJECTS, type Project } from "@/lib/projects";
import { Reveal, SplitWords } from "@/components/reveal";

export default function Projects() {
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

        <h2 className="mt-8 max-w-5xl font-display text-[clamp(2.25rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.04em] text-ink">
          <SplitWords text="Four products," />{" "}
          <span className="italic text-terracotta">
            <SplitWords text="all live," delay={0.1} />
          </span>{" "}
          <SplitWords text="all shipped." delay={0.2} />
        </h2>

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

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const screenshot = `/screens/${project.name.toLowerCase()}.jpg`;

  return (
    <article ref={ref} className="relative grid gap-10 md:grid-cols-12 md:items-center md:gap-14">
      {/* preview */}
      <div className={flip ? "md:col-span-7 md:col-start-6" : "md:col-span-7 md:col-start-1"}>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="visit"
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="group relative block aspect-[16/10] w-full overflow-hidden rounded-md bg-cream-dim shadow-[0_42px_120px_-46px_rgba(232,112,44,0.36)]"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            style={{
              y,
              rotateX: rx,
              rotateY: ry,
              transformStyle: "preserve-3d",
            }}
            className="relative h-[112%] w-full will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenshot}
              alt={`${project.name} preview`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            {/* color wash */}
            <div
              className="absolute inset-0 mix-blend-soft-light opacity-50 transition-opacity duration-700 group-hover:opacity-30"
              style={{
                background: `linear-gradient(135deg, ${project.accent}55, transparent 60%)`,
              }}
            />
            {/* sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10" />
          </motion.div>

          <div className="absolute inset-0 ring-1 ring-inset ring-ink/15" />

          {/* corner badge */}
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-ink/10 bg-cream-dim/80 px-3 py-1.5 backdrop-blur-md">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: project.accent }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
              Live · {project.year}
            </span>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ink/90 px-3 py-1.5 text-cream-dim backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
              Visit
            </span>
            <span>↗</span>
          </div>
        </a>
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
