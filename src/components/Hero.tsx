import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The hero cross-fades through several frames against the scrollbar. All of it
 * is CSS bound to a ScrollTimeline, so nothing moves on its own and scrolling
 * back up runs it in reverse. The first layer is painted at full opacity, so
 * the hero is complete before any animation applies.
 */
const frames = [
  { src: "/design/hero-woodland.jpg", alt: "Eucalypt woodland near Canberra on a spring morning" },
  { src: "/design/hero-blossom.jpg", alt: "" },
  { src: "/design/hero-hills.jpg", alt: "" },
];

export function Hero() {
  return (
    <section
      className="kv-hero"
      style={{
        position: "sticky",
        minHeight: "min(86vh, 760px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
        {frames.map((frame, i) => (
          <div key={frame.src} className="kv-hero-layer" data-layer={i}>
            <Image
              src={frame.src}
              alt={i === 0 ? frame.alt : ""}
              fill
              sizes="100vw"
              quality={90}
              priority={i === 0}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Scrim, so the headline holds its contrast over any frame. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            [
              // Eased falloff. Even stops leave a visible seam where the slope
              // changes; these follow a curve so the edge never resolves.
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

      <div className="kv-wrap kv-hero-content" style={{ position: "relative" }}>
        <p className="kv-eyebrow">Photography &amp; Videography — {site.location}</p>
        <h1 style={{ maxWidth: "14ch" }}>{site.tagline}</h1>
        <hr className="kv-rule" />
        <p className="kv-lede" style={{ maxWidth: "44ch" }}>
          Photography and films for weddings, events, properties and brands across Canberra.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", marginTop: "var(--space-8)" }}>
          <Link href="/portfolio" className="kv-btn kv-btn--primary">
            View Our Work
          </Link>
          <Link href="/contact" className="kv-btn kv-btn--ghost">
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
