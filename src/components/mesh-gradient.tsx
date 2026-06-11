"use client";

import { motion } from "motion/react";

/**
 * Soft, low-contrast animated mesh — sits behind editorial type
 * without competing for attention. Five drifting blobs on ivory.
 */
export default function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[#f3f1ec]" />
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
      {/* readability wash — keeps text clean over the gradient (ivory) */}
      <div className="absolute inset-0 bg-[#f3f1ec]/62" />
      {/* gallery vignette — barely-there warm edge */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(20,90,67,0.06)_100%)]" />
    </div>
  );
}

const BLOBS = [
  {
    color: "#145a43", // oxblood (hero focal warmth)
    size: "50vw",
    blur: 130,
    opacity: 0.13,
    from: { x: "-10vw", y: "-15vh" },
    to: { x: "20vw", y: "10vh" },
  },
  {
    color: "#a8853e", // antique gold
    size: "42vw",
    blur: 125,
    opacity: 0.14,
    from: { x: "65vw", y: "55vh" },
    to: { x: "50vw", y: "30vh" },
  },
  {
    color: "#d8c39a", // champagne
    size: "34vw",
    blur: 115,
    opacity: 0.18,
    from: { x: "75vw", y: "5vh" },
    to: { x: "55vw", y: "20vh" },
  },
  {
    color: "#5d6b54", // olive sage (cool counterpoint)
    size: "44vw",
    blur: 110,
    opacity: 0.1,
    from: { x: "5vw", y: "60vh" },
    to: { x: "30vw", y: "45vh" },
  },
  {
    color: "#0c3d2e", // oxblood-deep
    size: "26vw",
    blur: 100,
    opacity: 0.09,
    from: { x: "82vw", y: "70vh" },
    to: { x: "65vw", y: "55vh" },
  },
];
