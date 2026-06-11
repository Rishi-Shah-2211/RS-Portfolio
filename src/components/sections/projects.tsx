"use client";

import Link from "next/link";
import { PROJECTS, type Project } from "@/lib/projects";
import { Reveal, Reveal3D, SplitWords } from "@/components/reveal";

/**
 * Projects — Akina-style rounded cards. Big soft-cornered cards alternate
 * between periwinkle, deep plum, and frosted lilac, image on one side and
 * copy on the other, with side captions floating beside them on desktop.
 */

type Tone = "purple" | "plum" | "glass";
const TONES: Tone[] = ["purple", "plum", "glass"];

const toneStyles: Record<
  Tone,
  { card: string; title: string; soft: string; chip: string; cta: string; ghost: string }
> = {
  purple: {
    card: "bg-terracotta/75 text-white backdrop-blur-xl border border-white/25",
    title: "text-white",
    soft: "text-white/75",
    chip: "border-white/25 bg-white/10 text-white/85",
    cta: "bg-white text-ink hover:bg-white/90",
    ghost: "border-white/35 text-white hover:bg-white/10",
  },
  plum: {
    card: "bg-[#2a1430]/75 text-white backdrop-blur-xl border border-white/20",
    title: "text-white",
    soft: "text-white/70",
    chip: "border-white/20 bg-white/10 text-white/85",
    cta: "bg-peach text-ink hover:bg-peach/90",
    ghost: "border-white/30 text-white hover:bg-white/10",
  },
  glass: {
    card: "bg-white/35 text-ink backdrop-blur-xl border border-white/50",
    title: "text-ink",
    soft: "text-ink-soft",
    chip: "border-ink/15 bg-cream text-ink-soft",
    cta: "bg-ink text-cream hover:bg-ink/90",
    ghost: "border-ink/25 text-ink hover:bg-ink/5",
  },
};

const SIDE_NOTES = [
  "You can open the full case study for every build — process, stack, and decisions.",
  "Each product is live in production; the screenshots link straight to it.",
  "Three of these run an LLM copilot grounded in the user's own data.",
];

export default function Projects() {
  return (
    <section id="work" className="relative w-full py-28 md:py-36">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <Reveal>
          <div className="text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              03 — Selected Work
            </span>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-light leading-[1] tracking-[-0.035em] text-ink">
              <SplitWords text="Seven products," />{" "}
              <span className="italic text-terracotta">
                <SplitWords text="all live, all shipped." delay={0.1} />
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 space-y-12 md:space-y-20">
          {PROJECTS.map((p, i) => (
            <Card key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ project, index }: { project: Project; index: number }) {
  const tone = toneStyles[TONES[index % TONES.length]];
  const flip = index % 2 === 1;
  const slug = project.name.toLowerCase().replace(/\s+/g, "-");
  const hasScreenshot = project.hasScreenshot !== false;
  const isPrivate = project.privateProject === true;
  const note = SIDE_NOTES[index % SIDE_NOTES.length];

  return (
    <div className="grid items-center gap-6 md:grid-cols-12">
      {/* floating side caption (Akina-style) */}
      <Reveal
        delay={0.15}
        className={`hidden md:block md:col-span-3 ${flip ? "md:order-2 text-left" : "md:order-1 text-right"}`}
      >
        <p className="text-sm leading-[1.8] text-ink-soft">{note}</p>
        <Link
          href={`/work/${slug}`}
          className="mt-4 inline-block rounded-full border border-ink/20 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink/5"
        >
          View more
        </Link>
      </Reveal>

      {/* the card */}
      <Reveal3D className={`md:col-span-9 ${flip ? "md:order-1" : "md:order-2"}`}>
        <div
          className={`relative overflow-hidden rounded-[1.75rem] p-6 shadow-[0_40px_90px_-45px_rgba(33,26,54,0.45)] md:rounded-[2.25rem] md:p-10 ${tone.card}`}
        >
          <div className={`grid items-center gap-7 md:grid-cols-2 md:gap-10`}>
            <div className={flip ? "md:order-2" : ""}>
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[10px] uppercase tracking-[0.24em] ${tone.soft}`}>
                  {project.index} · {project.role}
                </span>
                <span className={`rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] ${tone.chip}`}>
                  {isPrivate ? "Under NDA" : "Live"} · {project.year}
                </span>
              </div>
              <h3 className={`mt-5 font-display text-3xl font-light leading-[1.02] tracking-[-0.03em] md:text-5xl ${tone.title}`}>
                {project.name}
              </h3>
              <p className={`mt-3 font-display text-base italic md:text-xl ${tone.soft}`}>
                {project.tagline}
              </p>
              <p className={`mt-4 text-[13px] leading-[1.75] md:text-sm ${tone.soft}`}>
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 5).map((s) => (
                  <span
                    key={s}
                    className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] ${tone.chip}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/work/${slug}`}
                  data-cursor="open"
                  className={`rounded-full px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${tone.cta}`}
                >
                  Case study
                </Link>
                {!isPrivate && project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="visit"
                    className={`rounded-full border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${tone.ghost}`}
                  >
                    Visit ↗
                  </a>
                )}
              </div>
            </div>

            <div className={flip ? "md:order-1" : ""}>
              {hasScreenshot ? (
                <a
                  href={project.url ?? `/work/${slug}`}
                  target={project.url ? "_blank" : undefined}
                  rel={project.url ? "noopener noreferrer" : undefined}
                  data-cursor="visit"
                  className="group block overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(20,14,40,0.55)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/screens/${slug}.jpg`}
                    alt={`${project.name} preview`}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </a>
              ) : (
                <div
                  className="grid aspect-[16/10] w-full place-items-center overflow-hidden rounded-2xl"
                  style={{
                    background: `
                      radial-gradient(120% 90% at 15% 10%, ${project.accent}66 0%, transparent 60%),
                      radial-gradient(120% 90% at 85% 90%, ${project.accent}33 0%, transparent 55%),
                      linear-gradient(135deg, #1c1430 0%, #2c2244 100%)
                    `,
                  }}
                >
                  <span className="font-display text-3xl font-light text-cream md:text-5xl">
                    {project.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal3D>
    </div>
  );
}
