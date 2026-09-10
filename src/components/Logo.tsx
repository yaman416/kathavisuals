import Image from "next/image";

/**
 * The Katha Visuals lockup.
 *
 * The artwork is a KV monogram with a metallic emboss, so it carries tonal
 * gradients rather than one flat colour. That rules out the mask-and-tint
 * approach used for a single-colour mark: masking would flatten it to a
 * silhouette and throw the emboss away. It is drawn as an image instead.
 *
 * Being near-black it measures 14.17:1 on Story Paper and 1.06:1 on Forest
 * Ink, so on dark ground it is inverted, which reads as silver rather than
 * disappearing. `.kv-section--dark` and the footer do that in globals.css.
 *
 * `size` is the rendered height in pixels; width follows the 1.069:1 ratio.
 */

export function Logo({ size = 52, className = "" }: { size?: number; className?: string }) {
  const width = Math.round(size * (954 / 892));
  return (
    <Image
      src="/design/logo.svg"
      alt=""
      aria-hidden="true"
      width={width}
      height={size}
      priority
      className={`kv-logo ${className}`}
      style={{ display: "block", width, height: size }}
    />
  );
}
