"use client";

import Link from "next/link";
import { useRef } from "react";
import { HeroScrub } from "@/components/HeroScrub";
import { site } from "@/lib/site";

/**
 * The hero holds a film that advances with the scrollbar.
 *
 * The section is a runway taller than the viewport; a sticky frame inside it
 * stays put while that runway scrolls past, and the film's position is mapped to
 * how far through the runway you are. Scroll up and it plays backwards.
 */
export function Hero() {
  const runway = useRef<HTMLElement>(null);

  return (
    <section ref={runway} style={{ position: "relative", height: "180vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <HeroScrub
          src="/design/hero-film.mp4"
          poster="/design/hero-film-poster.jpg"
          runway={runway}
        />

        {/* Scrim, eased so no seam resolves where the slope changes. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: [
              "linear-gradient(90deg,",
              "rgba(244,240,232,0.96) 0%,",
              "rgba(244,240,232,0.93) 12%,",
              "rgba(244,240,232,0.87) 22%,",
              "rgba(244,240,232,0.78) 31%,",
              "rgba(244,240,232,0.66) 40%,",
              "rgba(244,240,232,0.53) 49%,",
              "rgba(244,240,232,0.40) 58%,",
              "rgba(244,240,232,0.28) 68%,",
              "rgba(244,240,232,0.18) 78%,",
              "rgba(244,240,232,0.10) 88%,",
              "rgba(244,240,232,0.05) 100%)",
            ].join(" "),
          }}
        />

        <div className="kv-wrap" style={{ position: "relative" }}>
          <p className="kv-eyebrow">Photography &amp; Videography — {site.location}</p>
          <h1 style={{ maxWidth: "14ch" }}>{site.tagline}</h1>
          <hr className="kv-rule" />
          <p className="kv-lede" style={{ maxWidth: "44ch" }}>
            Photography and films for weddings, events, properties and brands across Canberra.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-4)",
              marginTop: "var(--space-8)",
            }}
          >
            <Link href="/portfolio" className="kv-btn kv-btn--primary">
              View Our Work
            </Link>
            <Link href="/contact" className="kv-btn kv-btn--ghost">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
