"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Media } from "@/components/ui/Media";
import type { GallerySlot } from "@/lib/site";

/**
 * A horizontal gallery for one service.
 *
 * The track is a native scroll-snap container, so touch, trackpad and keyboard
 * scrolling all work without a library and without JavaScript running at all.
 * The arrows are a convenience on top of that, not the mechanism.
 *
 * Selecting a photograph opens it in a lightbox built on the native `dialog`
 * element, which brings its own focus trap, inertness and Escape handling.
 */
export function WorkCarousel({
  slots,
  label,
  priority = false,
}: {
  slots: GallerySlot[];
  /** Names the region for screen readers, e.g. "Weddings". */
  label: string;
  /** Set on the first gallery only, so there is one LCP candidate. */
  priority?: boolean;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  /** Only real photographs are viewable, so the lightbox indexes these. */
  const images = slots.filter((slot): slot is NonNullable<GallerySlot> => slot !== null);

  const syncArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncArrows();
    track.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    return () => {
      track.removeEventListener("scroll", syncArrows);
      window.removeEventListener("resize", syncArrows);
    };
  }, [syncArrows]);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector("li");
    const step = slide ? slide.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: step * direction, behavior: reduce ? "auto" : "smooth" });
  };

  /*
   * Opening and closing are imperative rather than driven by a state change.
   * Deriving `dialog.open` from `open` looks tidier but desyncs: reopening the
   * same photograph sets the index to the value it already holds, React bails
   * out of the render, the effect never runs and the lightbox stays shut.
   */
  const openAt = (index: number) => {
    setOpen(index);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  };

  const close = () => {
    setOpen(null);
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  };

  const step = (direction: 1 | -1) =>
    setOpen((current) => {
      if (current === null) return current;
      return (current + direction + images.length) % images.length;
    });

  const current = open === null ? null : images[open];

  return (
    <div className="kv-carousel">
      <div className="kv-carousel__head">
        <p className="kv-muted kv-carousel__count">
          {images.length} {images.length === 1 ? "photograph" : "photographs"}
        </p>
        <div className="kv-carousel__nav">
          <button
            type="button"
            className="kv-round"
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label={`Scroll ${label} back`}
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            className="kv-round"
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label={`Scroll ${label} forward`}
          >
            <Arrow direction="right" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="kv-track"
        tabIndex={0}
        role="region"
        aria-label={`${label} gallery`}
      >
        {slots.map((slot, i) => (
          <li key={`${label}-${i}`} className="kv-slide">
            {slot ? (
              <button
                type="button"
                className="kv-slide__button"
                onClick={() => openAt(images.indexOf(slot))}
                aria-label={`View larger: ${slot.alt}`}
              >
                <Media
                  src={slot.src}
                  alt={slot.alt}
                  ratio="3 / 2"
                  sizes="(min-width: 900px) 62vw, 88vw"
                  priority={priority && i === 0}
                />
              </button>
            ) : (
              <Media
                src={null}
                alt={`${label} photograph`}
                ratio="3 / 2"
                sizes="(min-width: 900px) 62vw, 88vw"
                placeholder="Image to come"
              />
            )}
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="kv-lightbox"
        onClose={() => setOpen(null)}
        onClick={(event) => {
          // Clicking the backdrop lands on the dialog itself, not its contents.
          if (event.target === dialogRef.current) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
        }}
      >
        {current ? (
          <div className="kv-lightbox__inner">
            <div className="kv-lightbox__frame">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="92vw"
                quality={90}
                style={{ objectFit: "contain" }}
              />
            </div>

            <div className="kv-lightbox__bar">
              <p className="kv-lightbox__caption">{current.alt}</p>
              <div className="kv-carousel__nav">
                <button
                  type="button"
                  className="kv-round kv-round--invert"
                  onClick={() => step(-1)}
                  disabled={images.length < 2}
                  aria-label="Previous photograph"
                >
                  <Arrow direction="left" />
                </button>
                <span className="kv-lightbox__count" aria-live="polite">
                  {open! + 1} of {images.length}
                </span>
                <button
                  type="button"
                  className="kv-round kv-round--invert"
                  onClick={() => step(1)}
                  disabled={images.length < 2}
                  aria-label="Next photograph"
                >
                  <Arrow direction="right" />
                </button>
                <button
                  type="button"
                  className="kv-round kv-round--invert"
                  onClick={close}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
                    <path
                      d="M1 1L13 13M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="square"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" aria-hidden="true" focusable="false">
      <g
        transform={direction === "left" ? "translate(15 0) scale(-1 1)" : undefined}
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      >
        <path d="M0 6H13.5" />
        <path d="M8.5 1L13.5 6L8.5 11" strokeLinecap="square" />
      </g>
    </svg>
  );
}
