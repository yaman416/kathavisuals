import type { ReactNode } from "react";

/** Consistent opening block for the inner pages: centred, quiet, type only. */
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
    <section className="kv-statement kv-page-header">
      <p className="kv-eyebrow" style={{ margin: 0 }}>
        {eyebrow}
      </p>
      <h1 style={{ maxWidth: "18ch" }}>{title}</h1>
      {lede ? <p>{lede}</p> : null}
      {children}
    </section>
  );
}
