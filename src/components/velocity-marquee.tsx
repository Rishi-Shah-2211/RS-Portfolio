"use client";

/**
 * VelocityMarquee — an oversized strip of display type that drifts sideways
 * forever. Driven by a pure CSS transform animation so it runs on the
 * compositor thread (off the main thread) — no per-frame JS, which keeps
 * scrolling smooth on phones. Pass `reverse` to run it right-to-left and
 * `accent` to tint it.
 */
export default function VelocityMarquee({
  items,
  baseSpeed = 60,
  reverse = false,
  accent = false,
}: {
  items: string[];
  baseSpeed?: number;
  reverse?: boolean;
  accent?: boolean;
}) {
  const line = items.join("  ·  ") + "  ·  ";
  // higher baseSpeed → shorter duration (faster drift)
  const duration = Math.max(18, Math.round(2600 / baseSpeed));

  return (
    <div className="relative z-20 w-full overflow-hidden border-y border-ink/10 bg-cream py-6 md:py-8">
      <div
        className="marquee-track flex w-max whitespace-nowrap"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        aria-hidden
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`font-display text-[clamp(2.5rem,7vw,6rem)] font-light italic leading-none tracking-[-0.04em] ${
              accent ? "text-terracotta/25" : "text-ink/15"
            }`}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
