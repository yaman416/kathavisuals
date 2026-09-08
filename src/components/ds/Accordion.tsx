"use client";

import { useState } from "react";
import type { Faq } from "@/lib/site";

/** Ported from components/marketing/Accordion.jsx — first item open by default. */
export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((item, i) => (
        <div key={item.question} style={{ borderBottom: "1px solid var(--color-border)" }}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "20px 0",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              fontWeight: 500,
              color: "var(--color-text-primary)",
              textAlign: "left",
            }}
          >
            {item.question}
            <span aria-hidden="true" style={{ color: "var(--color-accent)", fontSize: "1.2em" }}>
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i ? (
            <p
              style={{
                margin: "0 0 20px",
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-body)",
              }}
            >
              {item.answer}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
