"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { LenisRef } from "lenis/react";

/**
 * SmoothScroll — Lenis-smoothed wheel scrolling on desktop. On touch /
 * coarse-pointer devices we skip Lenis entirely and let the phone's own
 * native momentum scrolling take over: it is GPU-driven and buttery, and
 * dropping the extra JS rAF loop removes the main-thread cost that made
 * mobile scrolling feel laggy. No visual effect changes — only the scroll
 * driver differs.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [touch, setTouch] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
    setMounted(true);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    lenis.resize();
    lenis.start();
    const id = window.requestAnimationFrame(() => {
      lenis.resize();
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [touch, mounted]);

  // touch devices: pure native scroll
  if (mounted && touch) return <>{children}</>;

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        wheelMultiplier: 1,
        overscroll: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
