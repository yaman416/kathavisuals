"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
/** Below this the still image is used — a frame set is not worth mobile data. */
const MIN_WIDTH = 900;

function subscribe(onChange: () => void) {
  const motion = window.matchMedia(REDUCED_MOTION);
  const width = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
  motion.addEventListener("change", onChange);
  width.addEventListener("change", onChange);
  return () => {
    motion.removeEventListener("change", onChange);
    width.removeEventListener("change", onChange);
  };
}

function wantsFrames() {
  if (window.matchMedia(REDUCED_MOTION).matches) return false;
  if (!window.matchMedia(`(min-width: ${MIN_WIDTH}px)`).matches) return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /^(slow-)?[23]g$/.test(connection.effectiveType)) return false;

  return true;
}

/**
 * A hero that advances with the scrollbar instead of playing on its own.
 *
 * Frames are drawn to a canvas rather than seeking a <video>: seeking is only
 * smooth when every frame is a keyframe, and iOS Safari is unreliable about it
 * regardless. Drawing decoded images behaves the same everywhere.
 *
 * The still image behind the canvas is always rendered, so the hero is complete
 * before any of this loads and simply stays still if it never does.
 */
export function ScrollFrames({
  count,
  basePath,
  scrubHeight = 640,
}: {
  count: number;
  /** Directory holding 001.jpg … NNN.jpg. A string, not a function, so the
      preload effect does not restart on every render. */
  basePath: string;
  /** Scroll distance the sequence is spread across, in pixels. */
  scrubHeight?: number;
}) {
  const wanted = useSyncExternalStore(subscribe, wantsFrames, () => false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!wanted) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let cancelled = false;
    const images = Array.from({ length: count }, () => new Image());

    /** Frames arrive out of order, so fall back to the closest one that has. */
    const nearestLoaded = (index: number) => {
      for (let step = 0; step < count; step++) {
        const back = images[index - step];
        if (back?.naturalWidth) return back;
        const forward = images[index + step];
        if (forward?.naturalWidth) return forward;
      }
      return null;
    };

    const draw = () => {
      raf = 0;
      if (cancelled) return;

      const progress = Math.min(1, Math.max(0, window.scrollY / scrubHeight));
      const index = Math.min(count - 1, Math.round(progress * (count - 1)));
      const frame = images[index]?.naturalWidth ? images[index] : nearestLoaded(index);
      if (!frame) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }

      // Cover fit: fill the box, crop the overflow, never distort.
      const scale = Math.max(w / frame.naturalWidth, h / frame.naturalHeight);
      const dw = frame.naturalWidth * scale;
      const dh = frame.naturalHeight * scale;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(frame, (w - dw) / 2, (h - dh) / 2, dw, dh);
      canvas.style.opacity = "1";
    };

    const schedule = () => {
      if (!raf && !cancelled) raf = requestAnimationFrame(draw);
    };

    images.forEach((img, i) => {
      img.decoding = "async";
      // Handlers must be attached before src: a cached image can fire load
      // before the next statement runs, and the frame would never be drawn.
      img.onload = schedule;
      img.src = `${basePath}/${String(i + 1).padStart(3, "0")}.jpg`;
    });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      images.forEach((img) => {
        img.onload = null;
      });
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [wanted, count, basePath, scrubHeight]);

  if (!wanted) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        transition: "opacity 600ms var(--ease-out)",
        pointerEvents: "none",
      }}
    />
  );
}
