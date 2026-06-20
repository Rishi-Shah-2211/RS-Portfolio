"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import TiltCard from "@/components/tilt-card";

/**
 * HomeDirectory — three oversized 3D-tilt navigation cards that send the
 * visitor deeper into the site (About / Work / Contact). Each tilts toward
 * the cursor with a moving glare; the inner content floats above the card
 * for real depth. This is the home page's "choose your path" moment.
 */
const CARDS = [
  {
    href: "/about",
    no: "01",
    label: "About",
    line: "The engineer behind the work — background, stack, and the way I think.",
    accent: "#233a72",
  },
  {
    href: "/work",
    no: "02",
    label: "Work",
    line: "Seven products in production — analytics, ML, LLM copilots, and more.",
    accent: "#b08d44",
  },
  {
    href: "/contact",
    no: "03",
    label: "Contact",
    line: "Open to freelance and full-time. Let's build something worth shipping.",
    accent: "#6b647e",
  },
];

export default function HomeDirectory() {
  return (
    <section className="relative w-full bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              Explore — three ways in
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {CARDS.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.1}>
              <Link href={c.href} data-cursor="open" className="block [perspective:1100px]">
                <TiltCard max={11} className="h-full">
                  <div
                    className="group relative flex h-72 flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-paper p-7 shadow-[0_40px_90px_-50px_rgba(35,58,114,0.4)] md:h-80 md:p-9"
                  >
                    {/* accent glow */}
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                      style={{ background: c.accent }}
                    />
                    <div className="relative flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
                      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
                        {c.no}
                      </span>
                      <span className="text-ink-mute transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-terracotta">
                        ↗
                      </span>
                    </div>
                    <div className="relative" style={{ transform: "translateZ(55px)" }}>
                      <h3 className="font-display text-4xl font-light tracking-[-0.03em] text-ink md:text-5xl">
                        {c.label}
                      </h3>
                      <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                        {c.line}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
