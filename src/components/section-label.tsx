"use client";

/**
 * SectionLabel — the small eyebrow that names a section. It sticks just
 * under the nav while its section is on screen, so the reader always knows
 * where they are. It sits in an opaque pill so headings scrolling past
 * pass cleanly behind it instead of colliding with the text.
 */
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-[76px] z-20 mb-2 flex py-3">
      <div className="flex items-center gap-3 rounded-full border border-ink/10 bg-cream/90 py-2 pl-4 pr-5 backdrop-blur-sm">
        <span className="h-px w-8 bg-ink/40" />
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
          {children}
        </span>
      </div>
    </div>
  );
}
