"use client";

import { Reveal, SplitWords } from "@/components/reveal";
import SectionLabel from "@/components/section-label";

const ITEMS = [
  {
    when: "Jan – Apr 2025",
    role: "Software Engineer Intern (Front-end)",
    org: "WeblogySphere Pvt. Ltd.",
    where: "Vadodara, Gujarat",
    bullets: [
      "Designed and shipped the GlowScape landing page with responsive Tailwind layouts.",
      "Independently delivered Ecommercely — full-stack e-commerce, schema → production.",
      "Stripe payments + Prisma over PostgreSQL on a Next.js / TypeScript / React Native stack.",
    ],
  },
  {
    when: "May 2024",
    role: "Software Engineer Intern",
    org: "TatvaSoft",
    where: "Ahmedabad, Gujarat",
    bullets: [
      "Built RBAC for the Virtual Community Support platform via JWT — admin / organizer / volunteer.",
      "Consolidated fragmented operations into a unified admin dashboard for missions and users.",
      "Shipped volunteer-facing flows for mission discovery, role applications, and profile updates.",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full py-32 md:py-44"
    >
      <div className="paper-grain absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionLabel>03 — Experience</SectionLabel>

        <h2 className="mt-8 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.02] tracking-[-0.035em] text-ink">
          <SplitWords text="Where I've" />{" "}
          <span className="italic text-terracotta">
            <SplitWords text="put" delay={0.1} />
          </span>{" "}
          <SplitWords text="things in production." delay={0.15} />
        </h2>

        <ol className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
          {ITEMS.map((item, i) => (
            <Reveal key={item.org} delay={i * 0.08}>
              <li className="group grid gap-6 py-10 md:grid-cols-12 md:items-start md:gap-10">
                <div className="md:col-span-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
                    {item.when}
                  </span>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                    {item.where}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl font-light leading-tight text-ink md:text-3xl">
                    {item.org}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-terracotta">
                    {item.role}
                  </p>
                </div>
                <ul className="space-y-2 text-[15px] leading-[1.7] text-ink-soft md:col-span-5">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[8px] inline-block h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* Publication */}
        <Reveal delay={0.2}>
          <div className="mt-20 grid gap-6 rounded-md border border-ink/10 bg-cream-dim/55 p-8 shadow-[0_28px_80px_-48px_rgba(110,39,70,0.24)] backdrop-blur md:grid-cols-12 md:p-10">
            <div className="md:col-span-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-terracotta">
                Publication
              </span>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                Springer · ICAIS 2025
              </p>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-display text-2xl font-light leading-snug text-ink md:text-[28px]">
                Integrating Voting Classifiers to Predict Customer Churn in
                the Banking Sector.
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Co-authored, presented at the 5th International Conference on
                Artificial Intelligence and Smart Energy (JCT College of
                Engineering and Technology, Coimbatore, 30–31 January 2025).
                Pages 21–30.
              </p>
              <a
                href="https://doi.org/10.1007/978-3-031-90482-0_2"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="DOI"
                className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink underline-offset-4 hover:underline"
              >
                10.1007/978-3-031-90482-0_2 ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

