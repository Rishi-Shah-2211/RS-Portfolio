"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import type { LenisRef } from "lenis/react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

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
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        // Never drive touch scrolling through JS — phones keep their fast
        // native scroll; Lenis only smooths desktop wheel input.
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
