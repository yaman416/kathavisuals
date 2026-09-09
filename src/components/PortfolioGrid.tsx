"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { portfolioCategories, projects } from "@/lib/site";

export function PortfolioGrid() {
  const [filter, setFilter] = useState<string>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div
        role="group"
        aria-label="Filter work by category"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-2)",
          margin: "var(--space-6) 0 var(--space-12)",
        }}
      >
        {portfolioCategories.map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={active}
              style={{
                minHeight: "var(--touch)",
                padding: "0 18px",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "var(--tracking-nav)",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: "var(--radius)",
                border: `1px solid ${active ? "transparent" : "var(--color-border)"}`,
                background: active ? "var(--color-ink)" : "transparent",
                color: active ? "var(--story-paper)" : "var(--color-ink-soft)",
              }}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="kv-portfolio">
        {visible.map((project, i) => (
          <div key={project.id} className="kv-portfolio__item" data-span={project.span}>
            <ProjectCard project={project} priority={i < 2} />
          </div>
        ))}
      </div>

      <p aria-live="polite" className="kv-muted" style={{ fontSize: "var(--text-sm)", marginTop: "var(--space-8)" }}>
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}.
      </p>
    </>
  );
}
