"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * RevealImage — a screenshot that wipes into view behind a clip-path
 * curtain the first time it scrolls in, while the image itself eases back
 * from a slight overscale. Same language as the page-curtain transition.
 */
export default function RevealImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  eager = false,
  delay = 0,
}: {
  src: string;
  alt: string;
  /** wrapper — give it the aspect ratio / rounding */
  className?: string;
  /** the <img> itself */
  imgClassName?: string;
  eager?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.1 }}
        animate={
          inView
            ? { clipPath: "inset(0 0 0% 0)", scale: 1 }
            : { clipPath: "inset(0 0 100% 0)", scale: 1.1 }
        }
        transition={{ duration: 1.15, delay, ease: [0.76, 0, 0.24, 1] }}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
