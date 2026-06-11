"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import MeshGradient from "@/components/mesh-gradient";

const EmberField = dynamic(() => import("@/components/ember-field"), {
  ssr: false,
});
/**
 * Hero — full-viewport name poster. Giant editorial type fills the screen
 * with the portrait layered between the two lines (first name behind the
 * photo, surname in front). Everything is scroll-driven: the lines split
 * apart, the portrait sinks slower, the meta row fades first.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yFirst = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const yLast = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scalePortrait = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex h-[100svh] w-full flex-col justify-center overflow-hidden"
    >
      <MeshGradient />
      <EmberField />

      <motion.div style={{ opacity }} className="relative z-10 h-full w-full">
        {/* giant name — two lines hugging the viewport */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.h1
            aria-label="Rishi Shah"
            className="relative flex h-full w-full flex-col items-center justify-center font-display font-light leading-[0.78] tracking-[-0.04em] text-ink"
          >
            {/* portrait — framed card behind the type */}
            <motion.div
              style={{ y: yPortrait, scale: scalePortrait }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-[4/5] h-auto w-[72vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md shadow-[0_60px_140px_-40px_rgba(22,19,15,0.45)] md:w-[30vw] md:max-w-[460px] will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/rishi.png"
                alt=""
                className="h-full w-full object-cover [filter:saturate(0.82)_contrast(1.05)]"
                draggable={false}
              />
              {/* ivory veils where the type overlaps */}
              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-cream/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cream/70 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-ink/10" />
            </motion.div>

            <motion.span
              style={{ y: yFirst }}
              className="relative z-20 -mb-[0.06em] block select-none text-[clamp(5.5rem,21.5vw,21rem)] [text-shadow:0_2px_30px_rgba(246,241,231,0.45)] will-change-transform"
            >
              <Kinetic text="Rishi" />
            </motion.span>

            <motion.span
              style={{ y: yLast }}
              className="relative z-20 block select-none text-[clamp(5.5rem,21.5vw,21rem)] italic text-terracotta [text-shadow:0_2px_30px_rgba(246,241,231,0.45)] will-change-transform"
            >
              <Kinetic text="Shah" delay={0.12} />
            </motion.span>
          </motion.h1>
        </div>

        {/* corner meta — editorial poster captions */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute inset-x-0 top-24 z-30 mx-auto flex max-w-[1400px] items-start justify-between px-6 md:top-28 md:px-10"
        >
          <p className="max-w-[180px] font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-ink-soft md:max-w-[230px] md:text-[11px]">
            Full-stack engineer — data-grounded products with magazine-spread
            polish
          </p>
          <p className="hidden max-w-[200px] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-ink-soft md:block md:text-[11px]">
            Petlad, Gujarat · India
            <br />
            Available for freelance
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute inset-x-0 bottom-7 z-30 mx-auto flex max-w-[1400px] items-end justify-between px-6 md:px-10"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
            07 products · all live
          </span>
          <a
            href="#work"
            data-cursor="explore"
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink md:text-xs"
          >
            Scroll
            <span className="inline-block animate-bounce">↓</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Per-character rise-in for the giant name. */
function Kinetic({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "115%", rotate: 4 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{
            duration: 1.1,
            delay: 2.1 + delay + i * 0.045,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block will-change-transform"
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
