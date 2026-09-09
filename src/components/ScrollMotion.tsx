"use client";

import { useEffect } from "react";

/** Linear ramp from 0 to 1 between two points, clamped at both ends. */
function ramp(value: number, from: number, to: number) {
  if (to === from) return value >= to ? 1 : 0;
  return Math.min(1, Math.max(0, (value - from) / (to - from)));
}

/** Fade shapes matching the kv-layer-* keyframes in globals.css. */
function fadeOut(p: number) {
  return 1 - ramp(p, 0.55, 1);
}
function fadeThrough(p: number) {
  return Math.min(ramp(p, 0, 0.28), 1 - ramp(p, 0.62, 1));
}
function fadeIn(p: number) {
  return ramp(p, 0, 0.55);
}

/** Fade window per layer, as a fraction of the viewport height. */
const WINDOWS: [number, number][] = [
  [0, 0.3],
  [0.1, 0.54],
  [0.34, 0.76],
  [0.56, 0.88],
];

const SHAPES = [fadeOut, fadeThrough, fadeThrough, fadeIn];

/** Drift per layer: [fromScale, toScale, fromY%, toY%] — mirrors the CSS. */
const DRIFTS: [number, number, number, number][] = [
  [1.16, 1.02, -1.5, 5],
  [1.02, 1.18, -5, 3],
  [1.2, 1.04, 4, -3],
  [1.16, 1.02, -1.5, 5],
];

/**
 * Drives the hero motion in browsers without CSS scroll-driven animation.
 *
 * Chrome, Edge and Safari 26+ run the whole thing on the compositor from
 * `globals.css` and this returns immediately. Firefox and Safari before 26 have
 * no `animation-timeline` at all, so without this the hero sits completely
 * still — which is exactly what a visitor on those browsers reports.
 *
 * It stays cheap: no layout reads in the scroll handler, one rAF per frame, and
 * it writes only transform and opacity.
 */
export function ScrollMotion() {
  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = [...document.querySelectorAll<HTMLElement>(".kv-hero-layer")];
    const content = document.querySelector<HTMLElement>(".kv-hero-content");
    if (layers.length === 0 && !content) return;

    const root = document.documentElement;
    root.dataset.motionFallback = "on";
    let raf = 0;

    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const driftAcross = Math.min(1, Math.max(0, y / (vh * 0.88)));

      layers.forEach((layer, i) => {
        const [from, to] = WINDOWS[i] ?? WINDOWS[WINDOWS.length - 1];
        const shape = SHAPES[i] ?? fadeIn;
        layer.style.opacity = shape(ramp(y, from * vh, to * vh)).toFixed(3);

        const [s0, s1, y0, y1] = DRIFTS[i] ?? DRIFTS[0];
        const scale = s0 + (s1 - s0) * driftAcross;
        const shift = y0 + (y1 - y0) * driftAcross;
        layer.style.transform = `scale(${scale.toFixed(4)}) translate3d(0, ${shift.toFixed(2)}%, 0)`;
      });

      if (content) {
        const lift = Math.min(1, Math.max(0, y / (vh * 0.78)));
        content.style.transform = `translateY(${(-64 * lift).toFixed(1)}px)`;
        content.style.opacity = (1 - lift).toFixed(3);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      delete root.dataset.motionFallback;
    };
  }, []);

  return null;
}
