"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
/** Below this the poster is used: seeking video is unreliable on iOS Safari. */
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

function wantsScrub() {
  if (window.matchMedia(REDUCED_MOTION).matches) return false;
  if (!window.matchMedia(`(min-width: ${MIN_WIDTH}px)`).matches) return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /^(slow-)?2g$/.test(connection.effectiveType)) return false;

  return true;
}

/**
 * A hero film that advances with the scrollbar and runs backwards when you
 * scroll up.
 *
 * Two things make this work that were missing from the earlier attempt:
 *
 *  1. The file is encoded with every frame as a keyframe (`-g 1`). A normal MP4
 *     only has a keyframe every couple of seconds, so `currentTime` snaps to the
 *     nearest one and the picture jumps rather than moves.
 *  2. The hero gets a scroll runway taller than the viewport, so the film has
 *     distance to play across instead of a few hundred pixels.
 *
 * Seeking is throttled to one request per frame and skipped when the target is
 * within a frame of where the video already is, which stops the decoder
 * thrashing on fast scrolls.
 */
export function HeroScrub({
  src,
  poster,
  runway,
}: {
  src: string;
  poster: string;
  /** Element whose scroll progress drives playback. */
  runway: React.RefObject<HTMLElement | null>;
}) {
  const wanted = useSyncExternalStore(subscribe, wantsScrub, () => false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!wanted || failed) return;
    const video = videoRef.current;
    const section = runway.current;
    if (!video || !section) return;

    let raf = 0;
    let cancelled = false;

    const apply = () => {
      raf = 0;
      if (cancelled) return;

      const duration = video.duration;
      if (!Number.isFinite(duration) || duration === 0) return;

      // Progress through the runway, from the moment its top hits the viewport
      // top until its bottom does.
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / travel));

      const target = progress * duration;
      // One frame of the 24fps source. Below this the seek is imperceptible and
      // only costs the decoder work.
      if (Math.abs(target - video.currentTime) < 1 / 24) return;
      video.currentTime = target;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLoaded = () => {
      setReady(true);
      schedule();
    };

    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", onLoaded);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [wanted, failed, runway]);

  /*
   * Below the scrub width there is no film, and iOS Safari will not seek one
   * reliably anyway. The still moves instead: it drifts and grows slightly as
   * the hero leaves the viewport. A transform is composited on the GPU, so this
   * costs nothing like decoding frames does, and it works everywhere.
   */
  useEffect(() => {
    if (wanted) return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    const poster = posterRef.current;
    const section = runway.current;
    if (!poster || !section) return;

    let raf = 0;
    let cancelled = false;

    const apply = () => {
      raf = 0;
      if (cancelled) return;
      const rect = section.getBoundingClientRect();
      if (rect.height === 0) return;
      // 0 while the hero fills the viewport, 1 once it has scrolled fully past.
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      const shift = (progress * 6).toFixed(3);
      const zoom = (1 + progress * 0.09).toFixed(4);
      poster.style.transform = `translate3d(0, ${shift}%, 0) scale(${zoom})`;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      poster.style.transform = "";
    };
  }, [wanted, runway]);

  const shared: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  // The poster is always painted. The film fades in over it once it can seek,
  // so the hero is complete from the first frame and stays correct if the video
  // never loads, is declined, or fails.
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- object-fit cover
          at full-bleed with no layout shift; next/image adds nothing here. */}
      <img
        ref={posterRef}
        src={poster}
        alt=""
        aria-hidden="true"
        style={{ ...shared, willChange: "transform" }}
      />
      {wanted && !failed ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setFailed(true)}
          style={{
            ...shared,
            opacity: ready ? 1 : 0,
            transition: "opacity 700ms var(--ease)",
            pointerEvents: "none",
          }}
        />
      ) : null}
    </>
  );
}
