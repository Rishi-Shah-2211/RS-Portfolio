"use client";

import { motion } from "motion/react";

/**
 * Soft, low-contrast animated mesh — sits behind editorial type
 * without competing for attention. Five drifting blobs on ivory.
 */
export default function MeshGradient({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      
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
      <div className="absolute inset-0 bg-[#fbfaf7]/62" />
      {/* gallery vignette — barely-there warm edge */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(110,39,70,0.035)_100%)]" />
    </div>
  );
}

const BLOBS = [
  {
    color: "#6e2746", // oxblood (hero focal warmth)
    size: "50vw",
    blur: 130,
    opacity: 0.07,
    from: { x: "-10vw", y: "-15vh" },
    to: { x: "20vw", y: "10vh" },
  },
  {
    color: "#ad8754", // antique gold
    size: "42vw",
    blur: 125,
    opacity: 0.08,
    from: { x: "65vw", y: "55vh" },
    to: { x: "50vw", y: "30vh" },
  },
  {
    color: "#d8bccb", // champagne
    size: "34vw",
    blur: 115,
    opacity: 0.06,
    from: { x: "75vw", y: "5vh" },
    to: { x: "55vw", y: "20vh" },
  },
  {
    color: "#6d6675", // olive sage (cool counterpoint)
    size: "44vw",
    blur: 110,
    opacity: 0.06,
    from: { x: "5vw", y: "60vh" },
    to: { x: "30vw", y: "45vh" },
  },
  {
    color: "#4e1a31", // oxblood-deep
    size: "26vw",
    blur: 100,
    opacity: 0.05,
    from: { x: "82vw", y: "70vh" },
    to: { x: "65vw", y: "55vh" },
  },
];
