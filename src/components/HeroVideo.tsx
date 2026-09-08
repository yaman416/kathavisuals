"use client";

import { useState, useSyncExternalStore } from "react";

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Whether this visit should download and play a decorative background video. */
function wantsVideo() {
  if (window.matchMedia(REDUCED_MOTION).matches) return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /^(slow-)?[23]g$/.test(connection.effectiveType)) return false;

  return true;
}

/**
 * Motion layer for the hero. The still image underneath is always rendered, so
 * the hero is complete before this decides anything and is never blank if it
 * opts out. The video is only requested when it is actually wanted:
 *
 *  - not when the visitor asks for reduced motion
 *  - not on Data Saver
 *  - not on a connection the browser reports as 2g or 3g
 *
 * It fades in once the browser has enough of it to play without stalling, and
 * removes itself if the file fails — the still image is already behind it.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const wanted = useSyncExternalStore(subscribe, wantsVideo, () => false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!wanted || failed) return null;

  return (
    <video
      className="kv-hero-media"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onCanPlayThrough={() => setReady(true)}
      onError={() => setFailed(true)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: ready ? 1 : 0,
        transition: "opacity 700ms var(--ease-out)",
        pointerEvents: "none",
      }}
    />
  );
}
