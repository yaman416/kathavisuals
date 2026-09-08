/**
 * Core primitives ported from the design system's components/core/*.jsx.
 * Hover states live in globals.css so these stay server components.
 */
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";

/* Badge -------------------------------------------------------------------- */

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "gold";
}) {
  const tones = {
    neutral: { color: "var(--color-text-secondary)", borderColor: "var(--color-border)" },
    gold: { color: "var(--color-accent)", borderColor: "var(--color-border-accent)" },
  };

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-xs)",
        fontWeight: 600,
        letterSpacing: "var(--tracking-nav)",
        textTransform: "uppercase",
        padding: "6px 12px",
        border: "1px solid",
        borderRadius: "var(--radius-pill)",
        ...tones[tone],
      }}
    >
      {children}
    </span>
  );
}

/* Button ------------------------------------------------------------------- */

export type ButtonVariant = "primary" | "outline" | "outline-gold";

export function Button({
  variant = "primary",
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"button"> & { variant?: ButtonVariant }) {
  return <button className={`kv-btn kv-btn--${variant} ${className}`} {...rest} />;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"a"> & { variant?: ButtonVariant }) {
  return <a className={`kv-btn kv-btn--${variant} ${className}`} {...rest} />;
}

/* Divider ------------------------------------------------------------------ */

export function Divider({
  color = "gold",
  width = "64px",
}: {
  color?: "gold" | "subtle";
  width?: string;
}) {
  return (
    <div
      style={{
        width,
        height: "1px",
        background: color === "gold" ? "var(--color-accent)" : "var(--color-border)",
        margin: "20px 0",
      }}
    />
  );
}

/* Eyebrow ------------------------------------------------------------------ */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-xs)",
        fontWeight: 600,
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase",
        color: "var(--color-accent)",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

/* SectionHeading ----------------------------------------------------------- */

export function SectionHeading({
  children,
  size = "h2",
  as: Tag = "h2",
  style,
}: {
  children: ReactNode;
  size?: "h1" | "h2" | "h3";
  as?: "h1" | "h2" | "h3";
  style?: CSSProperties;
}) {
  return (
    <Tag
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        fontSize:
          size === "h1"
            ? "var(--text-h1)"
            : size === "h3"
              ? "var(--text-h3)"
              : "var(--text-h2)",
        lineHeight: "var(--leading-heading)",
        color: "var(--color-text-strong)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
