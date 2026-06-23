"use client";

import { useEffect, useState } from "react";

/**
 * useIsTouch — true on touch / coarse-pointer devices (phones, tablets).
 * Used to switch off scroll-linked parallax and backdrop blur there, where
 * those effects cost the most and help the least.
 */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  }, []);
  return touch;
}
