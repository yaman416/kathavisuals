"use client";

import { useState, useSyncExternalStore } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function wantsVideo() {
  if (window.matchMedia(REDUCED_MOTION).matches) return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  // 530KB is fine on 3g; only genuinely slow links and Data Saver skip it.
  if (connection?.effectiveType && /^(slow-)?2g$/.test(connection.effectiveType)) return false;

  return true;
}

/**
 * Motion layer for the hero. The still image underneath is always rendered, so
 * the hero is complete before this decides anything and is never blank if it
 * opts out. At 530KB it loads on phones too — only Data Saver, a 2g link or a
 * reduced-motion preference skips it.
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
      onCanPlay={() => setReady(true)}
      onError={() => setFailed(true)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: ready ? 1 : 0,
        transition: "opacity 900ms var(--ease-out)",
        pointerEvents: "none",
      }}
    />
  );
}
