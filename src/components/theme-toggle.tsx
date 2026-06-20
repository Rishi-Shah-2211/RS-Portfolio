"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ThemeToggle — flips .dark on <html> and persists to localStorage. On
 * supported browsers the swap rides the View Transitions API as a circular
 * wipe expanding from the button; elsewhere it just toggles instantly.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const apply = (next: boolean) => {
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  const toggle = () => {
    const next = !dark;
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(next);
      return;
    }
    const r = btn.current?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : window.innerWidth - 40;
    const y = r ? r.top + r.height / 2 : 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = doc.startViewTransition(() => apply(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        { duration: 620, easing: "cubic-bezier(0.76,0,0.24,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      ref={btn}
      onClick={toggle}
      data-cursor={dark ? "light" : "dark"}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
    >
      <span className="text-sm">{dark ? "☀" : "☾"}</span>
    </button>
  );
}
