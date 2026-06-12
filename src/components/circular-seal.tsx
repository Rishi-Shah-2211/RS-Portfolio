"use client";

import { motion } from "motion/react";

/**
 * Editorial maker's seal — circular text orbiting a soft brass halo.
 * Premium, smooth, rich; doesn't compete with headline type.
 */
export default function CircularSeal({
  text = "RISHI SHAH · SOFTWARE ENGINEER · BASED IN INDIA · AVAILABLE FOR FREELANCE · ",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const repeated = text.repeat(1);
  const chars = repeated.split("");

  return (
    <div className={`relative ${className}`} aria-hidden>
      {/* Soft oxblood/gold halos — wash on ivory base */}
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(35,58,114,0.12)_0%,rgba(176,141,68,0.1)_45%,transparent_70%)] blur-2xl" />
      <div className="absolute inset-[28%] rounded-full bg-[radial-gradient(circle,rgba(217,199,156,0.22)_0%,rgba(35,58,114,0.1)_55%,transparent_80%)] blur-xl" />

      {/* Concentric hairlines */}
      <div className="absolute inset-0 rounded-full border border-ink/15" />
      <div className="absolute inset-[6%] rounded-full border border-ink/10" />
      <div className="absolute inset-[14%] rounded-full border border-brass/40" />

      {/* Rotating type ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <path
              id="seal-circle"
              d="M 200,200 m -170,0 a 170,170 0 1,1 340,0 a 170,170 0 1,1 -340,0"
            />
          </defs>
          <text
            fontSize="13"
            letterSpacing="6"
            fill="currentColor"
            className="fill-ink/60 font-mono uppercase"
          >
            <textPath href="#seal-circle">{chars.join("")}</textPath>
          </text>
        </svg>
      </motion.div>

      {/* Counter-rotating inner ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
        className="absolute inset-[18%]"
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <path
              id="seal-inner"
              d="M 200,200 m -140,0 a 140,140 0 1,1 280,0 a 140,140 0 1,1 -280,0"
            />
          </defs>
          <text
            fontSize="11"
            letterSpacing="4"
            fill="currentColor"
            className="fill-terracotta/85 font-mono uppercase"
          >
            <textPath href="#seal-inner">
              ✦ EST. 2025 · CRAFTED IN PETLAD, GUJARAT · ✦ EST. 2025 · CRAFTED IN PETLAD, GUJARAT ·
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center jewel — oxblood cabochon on ivory */}
      <div className="absolute left-1/2 top-1/2 h-[14%] w-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full">
        <div className="absolute -inset-2 rounded-full bg-terracotta/25 blur-xl" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-peach via-terracotta to-terracotta-deep shadow-[inset_-6px_-8px_18px_rgba(10,16,35,0.5),inset_6px_8px_18px_rgba(235,238,248,0.5),0_25px_50px_-12px_rgba(35,58,114,0.4)]" />
        <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-white/55 to-transparent opacity-70" />
      </div>

      {/* Tiny orbiting dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        className="absolute inset-[10%]"
      >
        <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-terracotta shadow-[0_0_14px_rgba(35,58,114,0.6)]" />
      </motion.div>
    </div>
  );
}
