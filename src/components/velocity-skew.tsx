"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { type ReactNode } from "react";

/**
 * VelocitySkew — children shear and stretch with scroll velocity, then
 * spring back to rest. Wrap big display headings with it.
 */
export default function VelocitySkew({
  children,
  className = "",
  maxSkew = 5,
}: {
  children: ReactNode;
  className?: string;
  maxSkew?: number;
}) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 90, damping: 16, mass: 0.3 });
  const skewY = useTransform(smooth, [-2400, 0, 2400], [maxSkew, 0, -maxSkew]);
  const scaleY = useTransform(smooth, [-2400, 0, 2400], [1.06, 1, 1.06]);

  return (
    <motion.div style={{ skewY, scaleY }} className={`origin-left will-change-transform ${className}`}>
      {children}
    </motion.div>
  );
}
