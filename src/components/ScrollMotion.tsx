"use client";

import { useEffect } from "react";

/**
 * Fallback for browsers without CSS scroll-driven animation.
 *
 * Where `animation-timeline` is supported (Chrome, Edge, Safari 26+) the hero
 * motion is pure CSS on the compositor and this does nothing at all. Firefox and
 * Safari before 26 have no support, so the hero would sit still — this drives
 * the same transform from script for those browsers only.
 *
 * Deliberately cheap: no layout reads inside the scroll handler, one rAF per
 * frame, and it writes nothing but transform and opacity, which the compositor
 * handles without re-layout.
 */
export function ScrollMotion() {
  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "scroll()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = document.querySelector<HTMLElement>(".kv-hero-media");
    const content = document.querySelector<HTMLElement>(".kv-hero-content");
    if (!media && !content) return;

    const root = document.documentElement;
    root.dataset.motionFallback = "on";
    let raf = 0;

    const apply = () => {
      raf = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));

      if (media) {
        const scale = 1.14 - 0.14 * progress;
        media.style.transform = `scale(${scale.toFixed(4)}) translateY(${(progress * 4).toFixed(2)}%)`;
      }
      if (content) {
        // The lift finishes at 78vh, matching the CSS animation-range.
        const lift = Math.min(1, progress / 0.78);
        content.style.transform = `translateY(${(-64 * lift).toFixed(1)}px)`;
        content.style.opacity = String(1 - lift);
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
