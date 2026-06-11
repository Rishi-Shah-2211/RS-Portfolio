"use client";

import { motion } from "motion/react";

/**
 * AuroraBg — a fixed, site-wide wash of slowly drifting lavender/periwinkle
 * blobs behind all content. Every frosted-glass surface on the site blurs
 * against this, which is what makes the glassmorphism visible.
 */
export default function AuroraBg() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-cream" />
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          initial={{ x: b.from.x, y: b.from.y }}
          animate={{ x: b.to.x, y: b.to.y }}
          transition={{
            duration: 26 + i * 6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            background: b.color,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            filter: `blur(${b.blur}px)`,
          }}
          className="absolute rounded-full will-change-transform"
        />
      ))}
    </div>
  );
}

const BLOBS = [
  { color: "#6c63d6", size: "55vw", blur: 130, opacity: 0.16, from: { x: "-12vw", y: "-10vh" }, to: { x: "18vw", y: "22vh" } },
  { color: "#cdbbed", size: "48vw", blur: 120, opacity: 0.22, from: { x: "62vw", y: "8vh" }, to: { x: "44vw", y: "38vh" } },
  { color: "#8d7bb8", size: "42vw", blur: 115, opacity: 0.14, from: { x: "10vw", y: "62vh" }, to: { x: "32vw", y: "42vh" } },
  { color: "#4a3fae", size: "36vw", blur: 110, opacity: 0.1, from: { x: "78vw", y: "62vh" }, to: { x: "58vw", y: "78vh" } },
];
