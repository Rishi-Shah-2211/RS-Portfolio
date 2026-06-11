"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Hero — Akina-style glass poster. The portrait runs full-bleed behind a
 * dusky lavender wash; a frosted-glass frame floats inset over it with the
 * name centred, a glass CTA pill, and glass info chips along the bottom
 * rail. The photo zooms slowly as you scroll while the frame fades.
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate h-[100svh] w-full overflow-hidden"
    >
      {/* full-bleed portrait with alpine-dusk wash */}
      <motion.div style={{ scale: scaleBg, y: yBg }} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/rishi.png"
          alt=""
          className="h-full w-full object-cover object-[50%_22%] [filter:saturate(0.9)]"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8d7bb8]/55 via-[#6c63d6]/20 to-[#211a36]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(33,26,54,0.35)_100%)]" />
      </motion.div>

      {/* frosted glass frame */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-3 z-10 md:inset-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full rounded-[1.75rem] border border-white/35 bg-white/[0.07] backdrop-blur-[2px] md:rounded-[2.25rem]"
        >
          {/* top rail */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5 md:px-8 md:pt-7">
            <span className="glass flex h-9 w-9 items-center justify-center rounded-full text-cream/90">
              ✦
            </span>
            <span className="font-display text-lg tracking-wide text-white/90 md:text-xl">
              RISHI <span className="font-light italic text-white/60">shah</span>
            </span>
            <a
              href="#contact"
              data-cursor="hire"
              className="glass rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:bg-white/25"
            >
              Hire me
            </a>
          </div>

          {/* centre — title + CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/75 md:text-[11px]"
            >
              Full-stack engineer · Petlad, Gujarat
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.55, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-display text-[clamp(2.75rem,8.5vw,7.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-white [text-shadow:0_4px_40px_rgba(33,26,54,0.45)]"
            >
              Software, engineered
              <br />
              <span className="italic text-peach">with intent.</span>
            </motion.h1>
            <motion.a
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              href="#work"
              data-cursor="explore"
              className="glass mt-8 rounded-full px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:bg-white/25"
            >
              View selected work
            </motion.a>
          </div>

          {/* bottom rail — glass info chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-2 px-5 pb-5 md:justify-between md:gap-3 md:px-8 md:pb-7"
          >
            <a
              href="tel:+919023080466"
              data-cursor="call"
              className="glass hidden items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/90 transition-colors hover:bg-white/25 md:flex"
            >
              ☏ 90230 80466
            </a>
            <div className="glass flex items-center divide-x divide-white/25 rounded-full px-2 py-1">
              {[
                { label: "GitHub", href: "https://github.com/rishi-shah-2211" },
                { label: "LinkedIn", href: "https://linkedin.com/in/rishishah2203" },
                { label: "Email", href: "mailto:rishishah457@gmail.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85 transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <span className="glass hidden items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/90 md:flex">
              07 products · all live
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
