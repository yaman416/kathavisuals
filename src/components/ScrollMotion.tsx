"use client";

import { useEffect } from "react";

/**
 * Fallback for browsers without CSS scroll-driven animation.
 *
 * Where `animation-timeline` is supported (Chrome, Edge, Safari 26+) the motion
 * is pure CSS on the compositor and this does nothing at all. Firefox and older
 * Safari have no support, so the whole site renders motionless — this drives the
 * same effects from script for those browsers only.
 *
 * It is deliberately cheap: no layout reads inside the scroll handler, one
 * rAF per frame, and it only ever writes transform and opacity, which the
 * compositor handles without re-layout. Elements are revealed by an
 * IntersectionObserver rather than by measuring positions on every frame.
 */
export function ScrollMotion() {
  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.dataset.motionFallback = "on";

    // --- reveals ----------------------------------------------------------
    const targets = document.querySelectorAll<HTMLElement>(
      ".kv-reveal, .kv-rise, .kv-service-row, h2, .kv-service-row h3, .kv-card-media",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => {
      if (el.closest(".kv-hero")) return; // the hero headline reads on load
      el.dataset.shown = "false";
      observer.observe(el);
    });

    // --- pinned hero ------------------------------------------------------
    const media = document.querySelector<HTMLElement>(".kv-hero-media");
    const content = document.querySelector<HTMLElement>(".kv-hero-content");
    let raf = 0;

    const apply = () => {
      raf = 0;
      const span = window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / span));

      if (media) {
        const scale = 1.14 - 0.14 * p;
        media.style.transform = `scale(${scale.toFixed(4)}) translateY(${(p * 4).toFixed(2)}%)`;
        media.style.filter = `saturate(${(1.06 - 0.06 * p).toFixed(3)}) brightness(${(1.04 - 0.04 * p).toFixed(3)})`;
      }
      if (content) {
        content.style.transform = `translateY(${(-64 * p).toFixed(1)}px)`;
        content.style.opacity = String(1 - p);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      delete root.dataset.motionFallback;
    };
  }, []);

  return null;
}
