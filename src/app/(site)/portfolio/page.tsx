import type { Metadata } from "next";
import { CallToAction } from "@/components/ui/CallToAction";
import { PageHeader } from "@/components/ui/PageHeader";
import { WorkCarousel } from "@/components/WorkCarousel";
import { galleries, pending, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Wedding, event, real estate and brand photography and video by Katha Visuals in Canberra.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Work from weddings, events, properties and brands."
        lede={`The work we make in ${site.location} and beyond, grouped by the kind of project you are planning.`}
      />

      <section className="kv-section kv-section--tight" style={{ paddingTop: 0 }}>
        <div className="kv-wrap">
          <nav aria-label="Jump to a kind of work">
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-2)",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {services.map((service) => (
                <li key={service.slug}>
                  <a href={`#${service.slug}`} className="kv-btn kv-btn--ghost">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {pending.imageryIsPlaceholder ? (
            <p
              className="kv-muted"
              style={{ fontSize: "var(--text-sm)", marginTop: "var(--space-6)" }}
            >
              Placeholder imagery is shown while our client galleries are prepared.
            </p>
          ) : null}
        </div>
      </section>

      {services.map((service, index) => {
        const slots = galleries[service.slug] ?? [];

        return (
          <section
            key={service.slug}
            id={service.slug}
            className="kv-section kv-section--tight"
            style={{
              scrollMarginTop: "96px",
              background: index % 2 === 1 ? "var(--color-surface)" : undefined,
            }}
          >
            <div className="kv-wrap">
              <h2 style={{ maxWidth: "18ch" }}>{service.name}</h2>
              <p className="kv-lede" style={{ marginTop: "var(--space-4)" }}>
                {service.summary}
              </p>

              <div style={{ marginTop: "var(--space-10)" }}>
                <WorkCarousel slots={slots} label={service.name} priority={index === 0} />
              </div>
            </div>
          </section>
        );
      })}

      <CallToAction />
    </>
  );
}
