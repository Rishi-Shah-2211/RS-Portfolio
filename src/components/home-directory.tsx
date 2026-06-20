"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";

/**
 * HomeDirectory — three rich navigation cards that send the visitor deeper
 * (About / Work / Contact). Each has a ghost numeral, an accent glow, a
 * detail list, and a sheen + lift on hover. No tilt — clean and premium.
 */
const CARDS = [
  {
    href: "/about",
    no: "01",
    eyebrow: "The profile",
    label: "About",
    line: "The engineer behind the work — background, stack, and the way I think.",
    items: ["Background & education", "Tools & stack", "Experience · publication"],
    accent: "#6e2746",
  },
  {
    href: "/work",
    no: "02",
    eyebrow: "The portfolio",
    label: "Work",
    line: "Seven products in production — analytics, ML, LLM copilots, and more.",
    items: ["07 live products", "5 platforms shipped", "Full case studies"],
    accent: "#ad8754",
  },
  {
    href: "/contact",
    no: "03",
    eyebrow: "Say hello",
    label: "Contact",
    line: "Open to freelance and full-time. Let's build something worth shipping.",
    items: ["Email · direct", "LinkedIn · GitHub", "Available now"],
    accent: "#8a6f86",
  },
];

export default function HomeDirectory() {
  return (
    <section className="relative w-full bg-cream py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
              Explore — three ways in
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {CARDS.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.1}>
              <Link href={c.href} data-cursor="open" className="block h-full">
                <article
                  className="group relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-paper p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_50px_100px_-50px_rgba(110,39,70,0.5)] md:min-h-[26rem] md:p-9"
                >
                  {/* accent glow top corner */}
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                    style={{ background: c.accent }}
                  />
                  {/* ghost numeral watermark */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-10 -right-3 select-none font-display text-[11rem] font-light leading-none text-ink/[0.04] transition-transform duration-700 group-hover:-translate-y-2"
                  >
                    {c.no}
                  </span>
                  {/* sheen sweep on hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />

                  {/* top */}
                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
                      {c.eyebrow}
                    </span>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-soft transition-all duration-500 group-hover:border-transparent group-hover:text-white"
                      style={{ background: "transparent" }}
                    >
                      <span
                        className="absolute h-9 w-9 scale-0 rounded-full transition-transform duration-500 group-hover:scale-100"
                        style={{ background: c.accent }}
                      />
                      <span className="relative transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </span>
                  </div>

                  {/* middle */}
                  <div className="relative">
                    <h3 className="font-display text-5xl font-light tracking-[-0.03em] text-ink md:text-6xl">
                      {c.label}
                    </h3>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
                      {c.line}
                    </p>
                  </div>

                  {/* bottom: detail list */}
                  <ul className="relative mt-6 space-y-2 border-t border-ink/10 pt-5">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: c.accent }}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
