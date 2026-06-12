"use client";

import { Reveal } from "@/components/reveal";

const ROW_1 = [
  "TypeScript", "Next.js", "React", "Tailwind CSS", "Framer Motion",
  "Three.js", "react-three-fiber", "Drizzle ORM", "Prisma", "Postgres",
  "TanStack Query", "Zod", "shadcn/ui", "Radix UI", "Better Auth",
  "@react-pdf/renderer", "Recharts",
];
const ROW_2 = [
  "Python", "scikit-learn", "XGBoost", "ONNX Runtime", "NumPy", "Pandas",
  "Groq", "OpenAI", "RAG", "Prompt Engineering", "Stripe", "Turborepo",
  "pnpm", "Vercel", "Neon", "Git", "SQL", "C++", "Java",
];

const GROUPS = [
  {
    title: "Languages",
    items: ["TypeScript", "Python", "JavaScript", "SQL", "C/C++", "Java"],
  },
  {
    title: "Frameworks",
    items: [
      "Next.js 16", "React 19", "Tailwind v4", "Framer Motion",
      "Three.js / r3f", "TanStack Query", "Zod", "shadcn/ui",
    ],
  },
  {
    title: "Data & ML",
    items: [
      "Postgres", "Drizzle", "Prisma", "scikit-learn", "XGBoost",
      "ONNX", "NumPy", "Pandas",
    ],
  },
  {
    title: "AI",
    items: [
      "Groq llama-3.3-70b", "OpenAI SDK", "RAG copilots",
      "Prompt engineering", "ONNX Runtime Web",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative w-full overflow-hidden py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              02 — Stack
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.02] tracking-[-0.035em] text-ink">
            Tools I reach for when the brief says{" "}
            <span className="italic text-terracotta">make it real.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-4">
          {GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={0.1 + gi * 0.08}>
              <div className="border-t border-ink/15 pt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  {g.title}
                </div>
                <ul className="mt-4 space-y-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-baseline gap-2 font-display text-lg text-ink transition-colors hover:text-terracotta md:text-xl"
                    >
                      <span className="text-[10px] text-ink-mute group-hover:text-terracotta">
                        ◌
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-24 space-y-6">
        <Marquee items={ROW_1} />
        <Marquee items={ROW_2} reverse />
      </div>
    </section>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const dup = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="marquee-track flex items-center gap-12 whitespace-nowrap"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {dup.map((t, i) => (
          <span
            key={i}
            className="font-display text-5xl font-light tracking-[-0.02em] text-ink/85 md:text-7xl"
          >
            {t}
            <span className="mx-6 text-terracotta">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
