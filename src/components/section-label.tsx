"use client";

/**
 * SectionLabel — the small eyebrow that names a section.
 *
 * This used to stick under the nav, but the display headings underneath are
 * large enough that the pinned label ended up slicing through them mid-scroll.
 * A static label reads cleanly and keeps the editorial rhythm.
 */
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-3 py-1">
      <span className="h-px w-10 bg-ink/40" />
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
        {children}
      </span>
    </div>
  );
}
