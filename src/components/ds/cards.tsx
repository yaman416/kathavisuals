/**
 * Marketing cards ported from components/marketing/*.jsx.
 * Image scale-on-hover and gold label tint are handled by .kv-card in globals.css.
 */
import type { CSSProperties, ReactNode } from "react";
import { Media } from "@/components/ds/Media";

/* ServiceCard -------------------------------------------------------------- */

export function ServiceCard({
  image,
  label,
  icon,
  href,
  placeholderLabel,
  index = 0,
}: {
  image: string | null;
  label: string;
  icon: ReactNode;
  href: string;
  placeholderLabel: string;
  /** Position in the row, used to stagger the entrance. */
  index?: number;
}) {
  return (
    <a
      href={href}
      className="kv-card kv-rise"
      style={
        {
          display: "block",
          textDecoration: "none",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          background: "var(--color-bg-secondary)",
          "--kv-delay": `${index * 90}ms`,
        } as CSSProperties
      }
    >
      <Media
        src={image}
        alt={label}
        label={placeholderLabel}
        style={{ aspectRatio: "4/5" }}
        sizes="(min-width: 900px) 25vw, 50vw"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "16px 12px",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <span
          aria-hidden="true"
          className="kv-service-card__label"
          style={{ display: "flex" }}
        >
          {icon}
        </span>
        <span
          className="kv-service-card__label"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            letterSpacing: "var(--tracking-nav)",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
    </a>
  );
}

/* PortfolioCard ------------------------------------------------------------ */

export function PortfolioCard({
  image,
  title,
  category,
  href = "#portfolio",
  placeholderLabel,
}: {
  image: string | null;
  title: string;
  category: string;
  href?: string;
  placeholderLabel: string;
}) {
  return (
    <a href={href} className="kv-card" style={{ display: "block", textDecoration: "none" }}>
      <Media
        src={image}
        alt={title}
        label={placeholderLabel}
        style={{
          aspectRatio: "4/3",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-card)",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "12px",
          marginTop: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-lg)",
            color: "var(--color-text-primary)",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            letterSpacing: "var(--tracking-nav)",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
          }}
        >
          {category}
        </span>
      </div>
    </a>
  );
}

/* ProcessStep -------------------------------------------------------------- */

export function ProcessStep({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="kv-process-step"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "24px",
      }}
    >
      <span aria-hidden="true" style={{ color: "var(--color-accent)" }}>
        {icon}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          letterSpacing: "var(--tracking-nav)",
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          lineHeight: "var(--leading-body)",
          color: "var(--color-text-secondary)",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}
