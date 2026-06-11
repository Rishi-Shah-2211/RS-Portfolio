"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import dynamic from "next/dynamic";

const EmberField = dynamic(() => import("@/components/ember-field"), {
  ssr: false,
});

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
      {/* generative alpine-dusk scene — twilight sky, layered ridgelines, mist */}
      <motion.div style={{ scale: scaleBg, y: yBg }} className="absolute inset-0 isolate will-change-transform">
        {/* twilight sky */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#cdbbed_0%,#9d8bd0_34%,#6c63d6_62%,#312a5e_100%)]" />
        {/* sun-glow on the horizon */}
        <div className="absolute inset-x-0 bottom-[24%] h-[40%] bg-[radial-gradient(60%_100%_at_50%_100%,rgba(244,226,255,0.55)_0%,transparent_70%)]" />
        {/* ridgelines — three parallax silhouettes */}
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="absolute bottom-[14%] left-0 h-[34%] w-full opacity-70">
          <path d="M0,420 L0,250 L160,150 L300,230 L460,90 L620,210 L780,120 L940,240 L1100,140 L1260,220 L1440,160 L1440,420 Z" fill="#7a6cc4" />
        </svg>
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="absolute bottom-[6%] left-0 h-[36%] w-full opacity-85">
          <path d="M0,420 L0,280 L120,190 L280,270 L430,140 L600,260 L760,170 L930,280 L1090,190 L1250,270 L1440,210 L1440,420 Z" fill="#4f4496" />
        </svg>
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[32%] w-full">
          <path d="M0,420 L0,300 L180,210 L340,300 L520,180 L700,290 L880,210 L1060,310 L1240,230 L1440,290 L1440,420 Z" fill="#312a5e" />
        </svg>
        {/* valley mist + village lights */}
        <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#211a36] via-[#312a5e]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-[4%] h-[10%] bg-[radial-gradient(12%_60%_at_22%_50%,rgba(255,224,178,0.4)_0%,transparent_100%),radial-gradient(10%_50%_at_48%_60%,rgba(255,224,178,0.3)_0%,transparent_100%),radial-gradient(14%_60%_at_76%_45%,rgba(255,224,178,0.35)_0%,transparent_100%)] blur-[2px]" />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(33,26,54,0.4)_100%)]" />
        <EmberField />
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
