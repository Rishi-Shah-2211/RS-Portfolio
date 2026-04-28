"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import MeshGradient from "@/components/mesh-gradient";
import CircularSeal from "@/components/circular-seal";
import { SplitWords } from "@/components/reveal";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const yMeta = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ringY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[105vh] w-full flex-col justify-end overflow-hidden pb-24 pt-40 md:pb-32"
    >
      <MeshGradient />

      {/* Editorial maker's seal — premium, rich, smooth, doesn't compete */}
      <motion.div
        style={{ y: ringY }}
        aria-hidden
        className="pointer-events-none absolute right-[-22%] top-[6%] -z-10 h-[78vh] w-[78vh] opacity-90 md:right-[-12%] md:top-[4%]"
      >
        <CircularSeal />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10"
      >
        <motion.div style={{ y: yMeta }} className="mb-8 flex items-center gap-3">
          <span className="h-px w-12 bg-ink/40" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
            Software engineer · Petlad, Gujarat · Available for freelance
          </span>
        </motion.div>

        <motion.h1
          style={{ y: yTitle }}
          className="font-display font-light leading-[0.88] tracking-[-0.045em] text-ink"
        >
          <span className="block text-[clamp(3.5rem,12vw,11rem)]">
            <SplitWords text="Software," />
          </span>
          <span className="block text-[clamp(3.5rem,12vw,11rem)] italic text-terracotta">
            <SplitWords text="engineered" delay={0.1} />
          </span>
          <span className="block text-[clamp(3.5rem,12vw,11rem)]">
            <SplitWords text="with intent." delay={0.2} />
          </span>
        </motion.h1>

        <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p
            style={{ y: yMeta }}
            className="md:col-span-5 md:col-start-1 max-w-md text-base leading-relaxed text-ink-soft md:text-lg"
          >
            I&rsquo;m <span className="text-ink">Rishi Shah</span> — a full-stack
            engineer who ships data-grounded products with the polish of a
            magazine spread. Currently building analytics, ML, and LLM-powered
            tooling out of India.
          </motion.p>

          <motion.div
            style={{ y: yMeta }}
            className="md:col-span-4 md:col-start-9 flex flex-col items-start gap-3 md:items-end"
          >
            <a
              href="#work"
              data-cursor="explore"
              className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink"
            >
              <span className="relative">
                See selected work
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-ink transition-transform duration-700 group-hover:scale-x-0" />
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-terracotta transition-transform duration-700 group-hover:scale-x-100" />
              </span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
                ↓
              </span>
            </a>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              04 projects · live
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
            Scroll
          </span>
          <span className="block h-8 w-px animate-pulse bg-ink-mute" />
        </div>
      </motion.div>
    </section>
  );
}
