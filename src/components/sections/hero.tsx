"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Magnetic from "@/components/magnetic";

/**
 * Hero — cinematic editorial opening. Three display lines enter from
 * alternating sides and, on scroll, slide back out in opposite directions
 * at different speeds. A sticky chapter index sits on the right rail;
 * meta strip and CTA anchor the bottom. Mesh + particles behind.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const xLine1 = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const xLine2 = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const xLine3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yIndex = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex h-[100svh] w-full flex-col justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 px-6 md:grid-cols-12 md:px-10"
      >
        {/* headline — three lines, three directions */}
        <div className="md:col-span-9">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft md:text-[11px]"
          >
            <span className="h-px w-12 bg-terracotta" />
            Rishi Shah · Full-stack engineer · India
          </motion.p>

          <h1 className="font-display font-light leading-[0.92] tracking-[-0.045em] text-ink">
            <Line x={xLine1} from="-60vw" delay={2.25} className="text-[clamp(3.25rem,10.5vw,9.5rem)]">
              Software,
            </Line>
            <Line x={xLine2} from="60vw" delay={2.4} className="text-[clamp(3.25rem,10.5vw,9.5rem)] italic text-terracotta">
              engineered
            </Line>
            <Line x={xLine3} from="-60vw" delay={2.55} className="text-[clamp(3.25rem,10.5vw,9.5rem)]">
              with intent.
            </Line>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Magnetic>
              <Link
                href="/work"
                data-cursor="explore"
                className="shimmer group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-cream"
              >
                <span className="relative z-10">Explore the work</span>
                <span className="relative z-10 inline-block transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </Magnetic>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              07 products in production — analytics, ML, LLM copilots, and
              cross-platform tooling.
            </p>
          </motion.div>
        </div>

        {/* sticky chapter index — right rail */}
        <motion.nav
          style={{ y: yIndex }}
          className="hidden md:col-span-3 md:flex md:flex-col md:items-end md:justify-center md:gap-1 will-change-transform"
          aria-label="Sections"
        >
          {INDEX.map((it, i) => (
            <motion.div
              key={it.href}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.6 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={it.href}
                data-cursor="open"
                className="group flex items-baseline justify-end gap-3 py-1.5 text-right"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-mute transition-colors group-hover:text-terracotta">
                  0{i + 1}
                </span>
                <span className="relative font-display text-xl font-light text-ink-soft transition-all duration-500 group-hover:-translate-x-1.5 group-hover:text-ink md:text-2xl">
                  {it.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-terracotta transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </motion.div>

      {/* bottom strip */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1, duration: 1 }}
        className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
          Scroll to begin ↓
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute md:block">
          Petlad, Gujarat · Available for freelance
        </span>
      </motion.div>
    </section>
  );
}

const INDEX = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

/** A headline line that flies in from one side, then drifts with scroll. */
function Line({
  children,
  x,
  from,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  x: ReturnType<typeof useTransform<number, string>>;
  from: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-visible">
      <motion.span
        initial={{ x: from, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="block will-change-transform"
      >
        <motion.span style={{ x }} className={`block ${className}`}>
          {children}
        </motion.span>
      </motion.span>
    </span>
  );
}
