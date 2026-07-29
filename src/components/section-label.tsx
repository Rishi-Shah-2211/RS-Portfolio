"use client";

/**
 * SectionLabel — the small eyebrow that names a section. It sticks just
 * under the nav while its section is on screen, so the reader always knows
 * where they are, then releases when the next section takes over.
 */
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-[76px] z-20 -mx-6 mb-2 px-6 md:-mx-10 md:px-10">
      <div className="flex items-center gap-3 py-3">
        <span className="h-px w-10 bg-ink/40" />
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-soft">
          {children}
        </span>
      </div>
    </div>
  );
}
