"use client";

import { useState } from "react";
import { PortfolioCard } from "@/components/ds/cards";
import { Eyebrow, SectionHeading } from "@/components/ds/primitives";
import { portfolioFilters, projects, showSampleNote } from "@/lib/site";

export function PortfolioSection() {
  const [filter, setFilter] = useState<string>("All");

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="portfolio"
      style={{
        padding: "var(--section-space) var(--page-gutter)",
        maxWidth: "var(--content-width)",
        margin: "0 auto",
        scrollMarginTop: "88px",
      }}
    >
      <Eyebrow>Portfolio</Eyebrow>
      <SectionHeading style={{ margin: "12px 0 32px" }}>Relevant Work.</SectionHeading>

      <div
        role="group"
        aria-label="Filter by service"
        style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}
      >
        {portfolioFilters.map((label) => {
          const active = filter === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setFilter(label)}
              aria-pressed={active}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "var(--tracking-nav)",
                textTransform: "uppercase",
                padding: "10px 18px",
                borderRadius: "var(--radius-pill)",
                cursor: "pointer",
                background: active ? "var(--color-action-primary-bg)" : "transparent",
                color: active ? "var(--color-action-primary-text)" : "var(--color-text-primary)",
                border: active ? "1px solid transparent" : "1px solid var(--color-border-accent)",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {showSampleNote ? (
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-xs)",
            margin: "0 0 20px",
          }}
        >
          Sample projects shown while we build out our portfolio with real client work.
        </p>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
        }}
      >
        {visible.map((project) => (
          <PortfolioCard
            key={project.title}
            image={project.image}
            title={project.title}
            category={project.category}
            placeholderLabel="Portfolio image pending"
          />
        ))}
      </div>
    </section>
  );
}
