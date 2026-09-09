import type { ReactNode } from "react";

/** Consistent opening block for the inner pages. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="kv-section kv-section--tight">
      <div className="kv-wrap">
        <p className="kv-eyebrow">{eyebrow}</p>
        <h1 style={{ maxWidth: "18ch" }}>{title}</h1>
        {lede ? (
          <p className="kv-lede" style={{ marginTop: "var(--space-6)" }}>
            {lede}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
