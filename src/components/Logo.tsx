/**
 * Interim logo.
 *
 * This is a wordmark with a restrained K, not a finished identity. It exists so
 * the site is not carrying a placeholder image, and it is deliberately simple so
 * the real mark can replace it without touching anything else.
 *
 * To swap in the final artwork: drop the SVG into this file (or import it) and
 * replace the contents of `Monogram`. Nothing else in the codebase needs to
 * change — the header, footer and drawer all render this component.
 *
 * The brief rules out camera, aperture, lens, film-reel, mountain and eye
 * imagery. The mark here is an open frame with the K's diagonals reaching out of
 * it: a story opening rather than a device pointed at one.
 */

function Monogram({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Open frame: three sides closed, one left open. */}
      <path
        d="M27 2H4V38H27"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      {/* K, sharing the frame's left edge as its stem. */}
      <path
        d="M13 11V29M13 20.5L21.5 11M13 19.5L22 29"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      {/* The one accent mark: the story leaving the frame. */}
      <path d="M31 20H38" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({
  size = 34,
  showWordmark = true,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        color: "var(--color-ink)",
      }}
    >
      <Monogram size={size} />
      {showWordmark ? (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          Katha Visuals
        </span>
      ) : null}
    </span>
  );
}
