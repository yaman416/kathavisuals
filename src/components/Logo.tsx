/**
 * Katha Visuals logo system.
 *
 * The mark is a six-blade camera aperture: six chords of a circle, each
 * spanning 120°, at 60° intervals. Six lines all tangent to a circle of radius
 * R/2 necessarily meet as a regular hexagon, so the opening is exact rather
 * than eyeballed, and the six arms reaching the rim are identical by
 * construction. Four L-brackets frame it — composition, the other half of what
 * the studio actually does.
 *
 * Everything is stroked geometry in a 100×100 box, so it stays crisp from a
 * 16px favicon to print. The wordmark is real text in the site's display face,
 * not outlines, so it is selectable, accessible and never needs re-exporting.
 */

const R = 36;
const C = 50;

/** Point on the mark's circle, in degrees, clockwise from 3 o'clock. */
function pt(deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [
    +(C + R * Math.cos(rad)).toFixed(3),
    +(C - R * Math.sin(rad)).toFixed(3),
  ];
}

/**
 * Six chords, each spanning 120°, stepped by 60°. Each is drawn to two thirds
 * of its length, which is exactly where it meets the chord after next: the
 * first third is the blade reaching the rim, the second is one edge of the
 * opening. Drawn full length they would cross into a hexagram instead.
 */
const blades = Array.from({ length: 6 }, (_, i) => {
  const [x1, y1] = pt(i * 60);
  const [fx, fy] = pt(i * 60 + 120);
  return {
    x1,
    y1,
    x2: +(x1 + (fx - x1) * (2 / 3)).toFixed(3),
    y2: +(y1 + (fy - y1) * (2 / 3)).toFixed(3),
  };
});

const brackets = [
  "M4,22 V4 H22", // top left
  "M78,4 H96 V22", // top right
  "M96,78 V96 H78", // bottom right
  "M22,96 H4 V78", // bottom left
];

export function LogoMark({
  size = 32,
  frame = true,
  mono = false,
  title,
}: {
  size?: number;
  /** Draw the four framing corner brackets. Turn off below ~24px. */
  frame?: boolean;
  /** Single colour throughout, for print and favicons. */
  mono?: boolean;
  title?: string;
}) {
  const accent = mono ? "currentColor" : "var(--color-accent)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={4.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}

      {frame
        ? brackets.map((d) => (
            <path key={d} d={d} stroke={accent} strokeWidth={4} opacity={mono ? 1 : 0.9} />
          ))
        : null}

      <circle cx={C} cy={C} r={R} />

      {blades.map((b, i) => (
        <line
          key={i}
          x1={b.x1}
          y1={b.y1}
          x2={b.x2}
          y2={b.y2}
          /* One blade carries the accent — the same restraint the palette asks
             for, and a small signature that survives at icon size. */
          stroke={i === 1 ? accent : "currentColor"}
        />
      ))}
    </svg>
  );
}

export function LogoLockup({
  markSize = 34,
  wordSize = "0.9375rem",
  stacked = false,
}: {
  markSize?: number;
  wordSize?: string;
  stacked?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: stacked ? "column" : "row",
        alignItems: "center",
        gap: stacked ? "12px" : "12px",
        color: "var(--color-text-primary)",
      }}
    >
      <LogoMark size={markSize} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: wordSize,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-text-strong)",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        Katha Visuals
      </span>
    </span>
  );
}
