"use client";

import { useEffect } from "react";

/**
 * JellyHover — the site-wide signature interaction. Every interactive
 * element (links, buttons, chips, anything tagged data-jelly) does an
 * elastic squash-and-stretch wobble the moment the cursor lands on it,
 * like poking a block of jelly. One global listener, WAAPI keyframes,
 * zero per-element wiring. Desktop pointers only.
 *
 * Oversized targets (full-screen panels, image frames) are skipped so the
 * wobble stays a micro-interaction; opt out anywhere with data-nojelly.
 */
export default function JellyHover() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !motionOk) return;

    const wobble = (el: HTMLElement) => {
      if (el.dataset.jellying) return;
      el.dataset.jellying = "1";
      const anim = el.animate(
        [
          { transform: "scale(1, 1)" },
          { transform: "scale(1.08, 0.9)", offset: 0.25 },
          { transform: "scale(0.95, 1.06)", offset: 0.5 },
          { transform: "scale(1.03, 0.98)", offset: 0.72 },
          { transform: "scale(0.99, 1.01)", offset: 0.88 },
          { transform: "scale(1, 1)" },
        ],
        { duration: 560, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
      );
      anim.onfinish = anim.oncancel = () => delete el.dataset.jellying;
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>(
        "a, button, [role=button], [data-jelly]",
      );
      if (!el || el.closest("[data-nojelly]")) return;
      // only wobble compact elements — buttons, chips, links, small cards
      const r = el.getBoundingClientRect();
      if (r.width > 560 || r.height > 320) return;
      // ignore re-entry from child to child of the same element
      if (el.contains(e.relatedTarget as Node)) return;
      wobble(el);
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    return () => document.removeEventListener("pointerover", onOver);
  }, []);

  return null;
}
