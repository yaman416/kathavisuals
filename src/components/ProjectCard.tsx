import Link from "next/link";
import { Media } from "@/components/ui/Media";
import type { Project } from "@/lib/site";

const ratios: Record<Project["span"], string> = {
  wide: "16 / 10",
  tall: "3 / 4",
  standard: "4 / 3",
};

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/portfolio#${project.id}`}
      id={project.id}
      className="kv-card"
      style={{ display: "block", textDecoration: "none", scrollMarginTop: "96px" }}
    >
      <Media
        src={project.image}
        alt={project.alt}
        ratio={ratios[project.span]}
        priority={priority}
        sizes="(min-width: 900px) 45vw, 100vw"
      />
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          marginTop: "var(--space-3)",
        }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: 600 }}>
          {project.title}
        </span>
        <span
          className="kv-muted"
          style={{
            fontSize: "var(--text-2xs)",
            letterSpacing: "var(--tracking-nav)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {project.category}
        </span>
      </div>
    </Link>
  );
}
