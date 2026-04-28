"use client";

import { motion } from "motion/react";

/**
 * Soft, low-contrast animated mesh — sits behind editorial type
 * without competing for attention. Five drifting blobs on cream.
 */
export default function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[#1c1a17]" />
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          initial={{ x: b.from.x, y: b.from.y }}
          animate={{ x: b.to.x, y: b.to.y }}
          transition={{
            duration: 22 + i * 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            background: b.color,
            width: b.size,
            height: b.size,
            filter: `blur(${b.blur}px)`,
            opacity: b.opacity,
          }}
          className="absolute rounded-full will-change-transform"
        />
      ))}
      {/* readability wash — keeps text clean over the gradient (warm graphite) */}
      <div className="absolute inset-0 bg-[#1c1a17]/64" />
      {/* warm vignette — slight ember glow at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.58)_100%)]" />
    </div>
  );
}

const BLOBS = [
  {
    color: "#e8702c", // ember orange (hero focal warmth)
    size: "55vw",
    blur: 120,
    opacity: 0.34,
    from: { x: "-10vw", y: "-15vh" },
    to: { x: "20vw", y: "10vh" },
  },
  {
    color: "#b87545", // copper
    size: "42vw",
    blur: 125,
    opacity: 0.28,
    from: { x: "65vw", y: "55vh" },
    to: { x: "50vw", y: "30vh" },
  },
  {
    color: "#d8c9a6", // sand (cool light counterpoint)
    size: "32vw",
    blur: 115,
    opacity: 0.14,
    from: { x: "75vw", y: "5vh" },
    to: { x: "55vw", y: "20vh" },
  },
  {
    color: "#3a2418", // burnt umber (depth)
    size: "48vw",
    blur: 100,
    opacity: 0.46,
    from: { x: "5vw", y: "60vh" },
    to: { x: "30vw", y: "45vh" },
  },
  {
    color: "#c25620", // ember-deep
    size: "26vw",
    blur: 90,
    opacity: 0.24,
    from: { x: "82vw", y: "70vh" },
    to: { x: "65vw", y: "55vh" },
  },
];
