"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/reveal";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.08]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate w-full overflow-hidden bg-cream-dim py-32 text-ink md:py-44"
    >
      {/* atmospheric background */}
      <motion.div
        style={{ y, scale }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[10%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-terracotta/30 blur-[120px]" />
        <div className="absolute right-[-10%] top-[40%] h-[55vh] w-[55vh] rounded-full bg-brass/25 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[50vh] w-[50vh] rounded-full bg-lavender/20 blur-[120px]" />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/40" />
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink/70">
              05 — Contact
            </span>
          </div>
        </Reveal>

        <h2 className="mt-10 font-display text-[clamp(3rem,10vw,9rem)] font-light leading-[0.9] tracking-[-0.045em] text-ink">
          Let&rsquo;s build <br />
          <span className="italic text-peach">something extraordinary.</span>
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl">
            Open to freelance, contract, and full-time opportunities — especially
            data-grounded products, ML-adjacent tooling, and cinematic frontends.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-wrap gap-4">
            <a
              href="mailto:rishishah457@gmail.com"
              data-cursor="email"
              className="shimmer group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-cream-dim transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">rishishah457@gmail.com</span>
              <span className="relative z-10 inline-block h-1.5 w-1.5 rounded-full bg-terracotta transition-transform group-hover:scale-150" />
            </a>
            <a
              href="tel:+919023080466"
              data-cursor="call"
              className="inline-flex items-center gap-3 rounded-full border border-ink/30 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink/90 transition-colors hover:bg-ink/10"
            >
              +91 90230 80466
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-20 grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={s.label.toLowerCase()}
                className="group flex items-baseline justify-between gap-4 border-b border-ink/15 pb-4 transition-colors hover:border-peach"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
                    {s.label}
                  </p>
                  <p className="mt-2 font-display text-2xl text-ink transition-colors group-hover:text-peach">
                    {s.handle}
                  </p>
                </div>
                <span className="inline-block text-ink/60 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-peach">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-ink/15 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
            © {new Date().getFullYear()} Rishi Shah · Crafted in Petlad, Gujarat
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
            Next.js 16 · r3f · Lenis · Framer Motion
          </p>
        </footer>
      </div>
    </section>
  );
}

const SOCIALS = [
  {
    label: "LinkedIn",
    handle: "in/rishishah2203",
    href: "https://linkedin.com/in/rishishah2203",
  },
  {
    label: "GitHub",
    handle: "rishi-shah-2211",
    href: "https://github.com/rishi-shah-2211",
  },
  {
    label: "Email",
    handle: "rishishah457@gmail.com",
    href: "mailto:rishishah457@gmail.com",
  },
];
