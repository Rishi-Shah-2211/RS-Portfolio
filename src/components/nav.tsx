"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(28,26,23,0)", "rgba(28,26,23,0.72)"],
  );
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"]);
  const border = useTransform(
    scrollY,
    [0, 80],
    ["rgba(240,232,216,0)", "rgba(240,232,216,0.1)"],
  );

  return (
    <motion.header
      style={{ background: bg, backdropFilter: blur, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="#top"
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
        <a
          href="mailto:rishishah457@gmail.com"
          data-cursor="email"
          className="shimmer group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-cream transition-transform hover:-translate-y-0.5"
        >
          <span className="relative z-10">Get in touch</span>
          <span className="relative z-10 inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
        </a>
      </div>
    </motion.header>
  );
}
