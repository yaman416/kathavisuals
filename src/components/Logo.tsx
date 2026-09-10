import Image from "next/image";

/**
 * The studio's own logo.
 *
 * Supplied as two PNGs of identical artwork in two colourways: `logo-ink.png`
 * is near-black for light ground, `logo-original.png` is white for dark. They
 * are the same 1562x1074 image with the same 379,748 opaque pixels, so they can
 * be swapped without anything shifting.
 *
 * `tone` picks the colourway. Everything on the site sits on Story Paper except
 * the footer, so ink is the default and the footer asks for the light one.
 * Using ink on the dark footer is what once painted the mark at 1.00 contrast,
 * which is to say invisibly.
 *
 * `size` is the rendered height in pixels; width follows the 1.454:1 ratio.
 */

export function Logo({
  size = 44,
  tone = "ink",
  className = "",
}: {
  size?: number;
  tone?: "ink" | "light";
  className?: string;
}) {
  const width = Math.round(size * (1562 / 1074));
  return (
    <Image
      src={tone === "light" ? "/design/logo-original.png" : "/design/logo-ink.png"}
      alt=""
      aria-hidden="true"
      width={1562}
      height={1074}
      priority
      className={`kv-logo ${className}`}
      style={{ display: "block", height: size, width }}
    />
  );
}
