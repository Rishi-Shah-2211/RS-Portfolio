"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import Magnetic from "@/components/magnetic";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#test-prep", label: "Test-Prep" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Stack" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(243,241,236,0)", "rgba(243,241,236,0.78)"],
  );
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"]);
  const border = useTransform(
    scrollY,
    [0, 80],
    ["rgba(22,19,15,0)", "rgba(22,19,15,0.08)"],
  );

  return (
    <>
    <motion.header
      style={{ background: bg, backdropFilter: blur, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/#top"
          data-cursor="home"
          className="font-display text-xl font-medium tracking-tight text-ink"
        >
          Rishi<span className="text-terracotta">.</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-ink"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 -z-0 scale-90 rounded-full bg-cream-dim opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute md:inline-flex">
            ⌘K
          </span>
          <Magnetic className="hidden md:inline-block">
            <a
              href="mailto:rishishah457@gmail.com"
              data-cursor="email"
              className="shimmer group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-cream"
            >
              <span className="relative z-10">Get in touch</span>
              <span className="relative z-10 inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
            </a>
          </Magnetic>
          {/* mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[120] flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-ink/15 bg-cream/70 backdrop-blur md:hidden"
          >
            <span
              className={`block h-[1.5px] w-4 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[3.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[3.25px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-terracotta"
        aria-hidden
      />
    </motion.header>

    {/* fullscreen mobile menu */}
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[110] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 md:hidden"
        >
          <nav className="flex flex-col">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline gap-4 border-b border-cream/10 py-5"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cream/40">
                  0{i + 1}
                </span>
                <span className="font-display text-4xl font-light tracking-[-0.03em] text-cream">
                  {l.label}
                </span>
              </motion.a>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <a
              href="mailto:rishishah457@gmail.com"
              className="inline-flex w-fit items-center gap-3 rounded-full bg-cream px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink"
            >
              Get in touch
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
            </a>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cream/40">
              Petlad, Gujarat · Available for freelance
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
