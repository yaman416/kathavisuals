import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl";

  return (
    <div className={alignment}>
      {eyebrow ? (
        <p className="text-[11px] uppercase tracking-[0.28em] text-sand">{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 font-display text-3xl leading-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-base leading-relaxed text-bone-dim">{children}</div>
      ) : null}
    </div>
  );
}
