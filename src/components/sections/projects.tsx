"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { PROJECTS, type Project } from "@/lib/projects";
import { Reveal, SplitWords } from "@/components/reveal";
import TiltCard from "@/components/tilt-card";
import SectionLabel from "@/components/section-label";

/**
 * Projects — cinematic alternating rows. Each project's screenshot glides
 * in from one side while its copy counter-drifts from the other, with a
 * giant ghost numeral parallaxing at a third speed behind the row. Odd and
 * even rows move in opposite directions, so the whole section scrolls
 * like an editing-table sequence.
 */
export default function Projects() {
  return (
    <section id="work" className="relative w-full pb-28 pt-28 md:pb-40 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel>Selected Work</SectionLabel>
        <h2 className="mt-8 max-w-5xl font-display text-[clamp(2.25rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.04em] text-ink">
          <SplitWords text="Seven products," />{" "}
          <span className="italic text-terracotta">
            <SplitWords text="all live," delay={0.1} />
          </span>{" "}
          <SplitWords text="all shipped." delay={0.2} />
        </h2>

        <div className="mt-24 space-y-28 md:space-y-40">
          {PROJECTS.map((p, i) => (
            <Row key={p.name} project={p} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // image and copy drift toward each other from opposite sides; odd rows
  // run the directions mirrored so consecutive rows cross
  const dir = flip ? -1 : 1;
  const xImg = useTransform(scrollYProgress, [0, 0.45, 1], [`${14 * dir}%`, "0%", `${-7 * dir}%`]);
  const xCopy = useTransform(scrollYProgress, [0, 0.45, 1], [`${-10 * dir}%`, "0%", `${5 * dir}%`]);
  const yGhost = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);

  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  const slug = project.name.toLowerCase().replace(/\s+/g, "-");
  const hasScreenshot = project.hasScreenshot !== false;
  const isPrivate = project.privateProject === true;

  return (
    <div ref={ref} className="relative">
      {/* ghost numeral — third parallax layer */}
      <motion.span
        style={{ y: yGhost }}
        aria-hidden
        className={`pointer-events-none absolute -top-20 select-none font-display text-[clamp(9rem,24vw,22rem)] font-light leading-none tracking-[-0.05em] text-ink/[0.05] will-change-transform ${
          flip ? "left-0 md:-left-6" : "right-0 md:-right-6"
        }`}
      >
        {project.index}
      </motion.span>

      <div className="relative grid items-center gap-8 md:grid-cols-12 md:gap-12">
        {/* image — slides in from its side */}
        <motion.div
          style={{ x: xImg }}
          className={`md:col-span-7 [perspective:1200px] will-change-transform ${flip ? "md:order-2" : ""}`}
        >
          <TiltCard max={7}>
          <a
            href={!isPrivate && project.url ? project.url : `/work/${slug}`}
            target={!isPrivate && project.url ? "_blank" : undefined}
            rel={!isPrivate && project.url ? "noopener noreferrer" : undefined}
            data-cursor="visit"
            className="group relative block overflow-hidden rounded-md shadow-[0_50px_120px_-46px_rgba(110,39,70,0.4)]"
          >
            {hasScreenshot ? (
              <motion.img
                style={{ scale: imgScale }}
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={
                  inView
                    ? { clipPath: "inset(0 0 0% 0)" }
                    : { clipPath: "inset(0 0 100% 0)" }
                }
                transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
                src={`/screens/${slug}.jpg`}
                alt={`${project.name} preview`}
                className="aspect-[16/10] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              <div
                className="grid aspect-[16/10] w-full place-items-center"
                style={{
                  background: `
                    radial-gradient(120% 90% at 15% 10%, ${project.accent}55 0%, transparent 60%),
                    radial-gradient(120% 90% at 85% 90%, ${project.accent}33 0%, transparent 55%),
                    linear-gradient(135deg, #1a1a1d 0%, #2a2a2f 100%)
                  `,
                }}
              >
                <span className="font-display text-4xl font-light text-cream md:text-6xl">
                  {project.name}
                </span>
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" />
            {/* hover veil with label */}
            <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ink/35 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="rounded-full bg-cream px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                {isPrivate ? "Open case study" : "Open live site ↗"}
              </span>
            </div>
          </a>
          </TiltCard>
        </motion.div>

        {/* copy — counter-drifts */}
        <motion.div
          style={{ x: xCopy }}
          className={`md:col-span-5 will-change-transform ${flip ? "md:order-1 md:text-right" : ""}`}
        >
          <div className={`flex items-center gap-3 ${flip ? "md:justify-end" : ""}`}>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
              {project.index} / 07 — {project.role}
            </span>
            <span className="flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
              {isPrivate ? "NDA" : "Live"} · {project.year}
            </span>
          </div>
          <h3 className="mt-4 font-display text-4xl font-light leading-[0.98] tracking-[-0.035em] text-ink md:text-6xl">
            {project.name}
          </h3>
          <p className="mt-3 font-display text-lg italic leading-snug text-terracotta md:text-xl">
            {project.tagline}
          </p>
          <p className="mt-4 text-sm leading-[1.75] text-ink-soft md:text-[15px]">
            {project.description}
          </p>
          <div className={`mt-5 flex flex-wrap gap-1.5 ${flip ? "md:justify-end" : ""}`}>
            {project.stack.slice(0, 6).map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/15 bg-paper px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
          <div className={`mt-7 flex flex-wrap gap-3 ${flip ? "md:justify-end" : ""}`}>
            <Link
              href={`/work/${slug}`}
              data-cursor="open"
              className="rounded-full bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-terracotta"
            >
              Case study
            </Link>
            {!isPrivate && project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="visit"
                className="rounded-full border border-ink/25 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink/5"
              >
                Visit ↗
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
