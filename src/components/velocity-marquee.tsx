"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

/**
 * VelocityMarquee — an oversized strip of display type that drifts sideways
 * on its own and speeds up / reverses with scroll velocity, with a slight
 * skew while the page is moving. Classic award-site move, zero layout cost.
 */
export default function VelocityMarquee({
  items,
  baseSpeed = 60,
}: {
  items: string[];
  baseSpeed?: number;
}) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 60, damping: 18 });
  const skew = useTransform(smooth, [-2000, 0, 2000], [-6, 0, 6]);
  const trackRef = useRef<HTMLDivElement>(null);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    const v = smooth.get();
    if (v < -50) dir.current = -1;
    else if (v > 50) dir.current = 1;
    const boost = 1 + Math.min(Math.abs(v) / 800, 4);
    let next = x.get() - dir.current * baseSpeed * boost * (delta / 1000);
    const half = (trackRef.current?.scrollWidth ?? 0) / 2;
    if (half > 0) {
      if (next <= -half) next += half;
      if (next > 0) next -= half;
    }
    x.set(next);
  });

  const line = items.join("  ·  ") + "  ·  ";

  return (
    <div className="relative w-full overflow-hidden border-y border-ink/10 bg-cream py-6 md:py-8">
      <motion.div
        ref={trackRef}
        style={{ x, skewX: skew }}
        className="flex w-max whitespace-nowrap will-change-transform"
        aria-hidden
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light italic leading-none tracking-[-0.04em] text-ink/15"
          >
            {line}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
