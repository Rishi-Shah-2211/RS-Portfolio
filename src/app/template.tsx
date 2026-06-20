"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

/**
 * Route template — re-mounts on every navigation (unlike layout), so it
 * gives each page a cinematic entrance: the content rises and fades in
 * under a sapphire curtain that sweeps up off the screen. Keyed on the
 * pathname so back/forward and case-study links all replay the transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname}>
      {/* sweeping curtain */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none fixed inset-0 z-[150] bg-ink"
        aria-hidden
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none fixed inset-0 z-[149] bg-terracotta"
        aria-hidden
      />
      {/* content entrance */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
