"use client";

import { useId, useState } from "react";
import type { Faq } from "@/lib/site";

/** Disclosure list. Keyboard operable, one panel open at a time. */
export function Accordion({ items, openFirst = true }: { items: Faq[]; openFirst?: boolean }) {
  const [open, setOpen] = useState(openFirst ? 0 : -1);
  const id = useId();

  return (
    <div>
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.question} style={{ borderTop: "1px solid var(--color-border-soft)" }}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={`${id}-t${i}`}
                aria-expanded={expanded}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(expanded ? -1 : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-4)",
                  minHeight: "var(--touch)",
                  padding: "var(--space-4) 0",
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  fontWeight: 500,
                  color: "var(--color-ink)",
                }}
              >
                {item.question}
                <span aria-hidden="true" style={{ color: "var(--color-accent-text)", fontSize: "1.25em" }}>
                  {expanded ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div id={`${id}-p${i}`} role="region" aria-labelledby={`${id}-t${i}`} hidden={!expanded}>
              <p className="kv-muted" style={{ fontSize: "var(--text-sm)", paddingBottom: "var(--space-4)" }}>
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
