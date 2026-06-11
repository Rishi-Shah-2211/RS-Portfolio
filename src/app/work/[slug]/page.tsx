import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/projects";
import { Reveal, Reveal3D, SplitWords } from "@/components/reveal";

const slugOf = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: slugOf(p.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => slugOf(p.name) === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Rishi Shah`,
    description: project.tagline,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => slugOf(p.name) === slug);
  if (index === -1) notFound();
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const hasScreenshot = project.hasScreenshot !== false;
  const isPrivate = project.privateProject === true;

  return (
    <main className="relative bg-cream pt-28 md:pt-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        {/* breadcrumb */}
        <Reveal>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute transition-colors hover:text-ink"
          >
            ← All work
          </Link>
        </Reveal>

        {/* title block */}
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display text-[clamp(3rem,11vw,9.5rem)] font-light leading-[0.85] tracking-[-0.045em] text-ink">
            <SplitWords text={project.name} />
          </h1>
          <span className="mb-3 flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: project.accent }} />
            {isPrivate ? "Under NDA" : "Live"} · {project.year}
          </span>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl font-display text-2xl italic leading-snug text-terracotta md:text-4xl">
            {project.tagline}
          </p>
        </Reveal>

        {/* meta strip */}
        <Reveal delay={0.18}>
          <div className="mt-10 grid gap-6 border-y border-ink/10 py-6 md:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">Role</p>
              <p className="mt-2 text-sm text-ink">{project.role}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">Year</p>
              <p className="mt-2 text-sm text-ink">{project.year}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">Status</p>
              <p className="mt-2 text-sm text-ink">{isPrivate ? "Private engagement" : "In production"}</p>
            </div>
          </div>
        </Reveal>

        {/* hero visual */}
        <Reveal3D delay={0.1} className="mt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md shadow-[0_60px_140px_-50px_rgba(22,19,15,0.4)]">
            {hasScreenshot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/screens/${slug}.jpg`}
                alt={`${project.name} interface`}
                className="absolute inset-0 h-full w-full object-cover"
              />
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
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-5xl font-light tracking-[-0.03em] text-cream md:text-7xl">
                    {project.name}
                  </span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" />
          </div>
        </Reveal3D>

        {/* body */}
        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="font-display text-3xl font-light tracking-[-0.03em] text-ink md:text-4xl">
                About the <span className="italic text-terracotta">build</span>
              </h2>
              <p className="mt-6 text-base leading-[1.85] text-ink-soft md:text-lg">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-12 font-mono text-[11px] uppercase tracking-[0.26em] text-ink-mute">
                Highlights
              </h3>
              <ul className="mt-5 space-y-4">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-4 border-b border-ink/10 pb-4 text-[15px] leading-relaxed text-ink">
                    <span style={{ color: project.accent }} className="mt-[2px]">●</span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.15}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.26em] text-ink-mute">
                Stack
              </h3>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-ink/15 bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {!isPrivate && project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="visit"
                  className="shimmer group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-cream"
                >
                  <span className="relative z-10">Visit live site</span>
                  <span className="relative z-10 inline-block transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              )}
            </Reveal>
          </aside>
        </div>

        {/* next project */}
        <Link
          href={`/work/${slugOf(next.name)}`}
          className="group mt-24 block border-t border-ink/10 py-14"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-mute">
            Next project
          </p>
          <div className="mt-4 flex items-baseline justify-between gap-6">
            <span className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-none tracking-[-0.04em] text-ink transition-colors duration-500 group-hover:text-terracotta">
              {next.name}
            </span>
            <span className="text-2xl text-ink-mute transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-terracotta">
              ↗
            </span>
          </div>
        </Link>
      </div>
    </main>
  );
}
