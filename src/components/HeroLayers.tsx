import Image from "next/image";

/**
 * The hero's moving background.
 *
 * Several photographs are stacked and cross-faded against the scrollbar, each
 * drifting at its own rate so the change reads as depth rather than a slideshow.
 * All of it is CSS bound to a ScrollTimeline — no JavaScript, no autoplay, and
 * fully reversible: scroll back up and it runs backwards to exactly where it
 * started.
 *
 * The first frame is always painted at full opacity, so the hero is complete
 * before any animation applies and stays correct in browsers that support none
 * of this.
 */
export function HeroLayers({
  frames,
}: {
  frames: { src: string; alt: string }[];
}) {
  return (
    <div className="kv-hero-media" aria-hidden="true">
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
  );
}
