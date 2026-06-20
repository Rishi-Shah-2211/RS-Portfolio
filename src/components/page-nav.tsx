"use client";

import Link from "next/link";

/**
 * PageNav — a big "next page" footer that carries the visitor through the
 * site in sequence (About → Work → Contact → Home). Giant hover-coloured
 * label; the route template plays the curtain transition on click.
 */
export default function PageNav({
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: {
  prevHref?: string;
  prevLabel?: string;
  nextHref: string;
  nextLabel: string;
}) {
  return (
    <section className="relative w-full bg-cream">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 border-t border-ink/10 px-6 py-16 md:px-10 md:py-24">
        {prevHref && prevLabel ? (
          <Link href={prevHref} data-cursor="back" className="group">
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-mute">
              ← Previous
            </span>
            <span className="mt-2 block font-display text-2xl font-light text-ink-soft transition-colors duration-500 group-hover:text-ink md:text-4xl">
              {prevLabel}
            </span>
          </Link>
        ) : (
          <span />
        )}

        <Link href={nextHref} data-cursor="open" className="group text-right">
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-mute">
            Next →
          </span>
          <span className="mt-2 block font-display text-[clamp(2rem,6vw,5rem)] font-light leading-none tracking-[-0.03em] text-ink transition-colors duration-500 group-hover:text-terracotta">
            {nextLabel}
          </span>
        </Link>
      </div>
    </section>
  );
}
