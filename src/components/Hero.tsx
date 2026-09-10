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
 *
 * Below the scrub width the film is not used, so `.kv-hero` collapses the
 * runway to one viewport and HeroScrub moves the still instead. The heights
 * live in CSS so the server and client render the same markup.
 */
export function Hero() {
  const runway = useRef<HTMLElement>(null);

  return (
    <section ref={runway} className="kv-hero">
      <div className="kv-hero__frame">
        <HeroScrub
          src="/design/hero-film.mp4"
          poster="/design/hero-film-poster.jpg"
          runway={runway}
        />

        <div aria-hidden="true" className="kv-hero__scrim" />

        <div className="kv-wrap" style={{ position: "relative" }}>
          <p className="kv-eyebrow">Photography &amp; Videography in {site.location}</p>
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
