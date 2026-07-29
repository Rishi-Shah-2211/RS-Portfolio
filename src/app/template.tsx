"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Route template — re-mounts on every navigation (unlike layout), so each
 * page gets a cinematic entrance: two slanted plum panels sit over the
 * viewport and sweep off to the right, carrying the incoming page's name
 * with them. Keyed on the pathname so back/forward and case-study links
 * all replay the transition.
 */

const LABELS: Record<string, string> = {
  "/": "Rishi Shah",
  "/about": "About",
  "/work": "Work",
  "/contact": "Contact",
};

function labelFor(pathname: string) {
  const known = LABELS[pathname];
  if (known) return known;
  // /work/<slug> → title-cased project name
  if (pathname.startsWith("/work/")) {
    const slug = pathname.split("/")[2] ?? "";
    return slug
      .split("-")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return "";
}

const EASE = [0.76, 0, 0.24, 1] as const;
const SKEW = -9;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const label = labelFor(pathname);

  if (reduce) return <div key={pathname}>{children}</div>;

  return (
    <div key={pathname}>
      {/* leading panel — deep plum, slightly ahead */}
      <motion.div
        initial={{ x: "0%", skewX: SKEW }}
        animate={{ x: "165%", skewX: SKEW }}
        transition={{ duration: 0.95, ease: EASE }}
        className="pointer-events-none fixed -inset-y-[25%] -inset-x-[35%] z-[150] bg-terracotta-deep"
        aria-hidden
      />

      {/* trailing panel — carries the incoming page name */}
      <motion.div
        initial={{ x: "0%", skewX: SKEW }}
        animate={{ x: "165%", skewX: SKEW }}
        transition={{ duration: 0.95, delay: 0.1, ease: EASE }}
        className="pointer-events-none fixed -inset-y-[25%] -inset-x-[35%] z-[149] flex items-center justify-center bg-terracotta"
        aria-hidden
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ duration: 0.85, times: [0, 0.25, 0.6, 1], ease: EASE }}
            style={{ skewX: -SKEW }}
            className="font-display text-[clamp(2.5rem,9vw,7rem)] font-light tracking-[-0.03em] text-cream"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* content entrance */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
