import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { CallToAction } from "@/components/ui/CallToAction";
import { Media } from "@/components/ui/Media";
import { PageHeader } from "@/components/ui/PageHeader";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding, event, real estate and brand photography and videography in Canberra. What is included, who it is for, and how we work.",
  alternates: { canonical: "/services" },
};

const listItem = {
  display: "flex",
  gap: "var(--space-3)",
  fontSize: "var(--text-sm)",
  color: "var(--color-ink-soft)",
  marginBottom: "var(--space-3)",
} as const;

const columnHeading = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-2xs)",
  fontWeight: 600,
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--color-ink-muted)",
  margin: "0 0 var(--space-4)",
} as const;

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Photography and film, planned around your day."
        lede={`Book stills, film, or both. Whichever you choose, it is shot by the same team with the same eye, in ${site.location} and beyond.`}
      >
        <nav aria-label="Services" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-8)" }}>
          {services.map((service) => (
            <a key={service.slug} href={`#${service.slug}`} className="kv-btn kv-btn--ghost">
              {service.name}
            </a>
          ))}
        </nav>
      </PageHeader>

      {services.map((service, index) => {
        // Each service carries its own gallery, so related work comes from there.
        const related = service.gallery.slice(0, 2);
        return (
          <section
            key={service.slug}
            id={service.slug}
            className="kv-section"
            style={{
              scrollMarginTop: "88px",
              background: index % 2 === 1 ? "var(--color-surface)" : undefined,
            }}
          >
            <div className="kv-wrap">
              <div className="kv-split kv-split--wide-media">
                <Media
                  src={service.image}
                  alt={`${service.name} photography by ${site.name}`}
                  ratio="4 / 3"
                  sizes="(min-width: 900px) 50vw, 100vw"
                />
                <div>
                  <p className="kv-eyebrow">Service</p>
                  <h2>{service.name}</h2>
                  <p className="kv-lede" style={{ marginTop: "var(--space-4)" }}>
                    {service.summary}
                  </p>
                  <p className="kv-muted">{service.intro}</p>
                  <Link href="/contact" className="kv-btn kv-btn--primary" style={{ marginTop: "var(--space-4)" }}>
                    Enquire about {service.name.toLowerCase()}
                  </Link>
                </div>
              </div>

              <div className="kv-grid kv-grid--3" style={{ marginTop: "var(--space-16)" }}>
                <div>
                  <h3 style={columnHeading}>What is included</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {service.includes.map((item) => (
                      <li key={item} style={listItem}>
                        <span
                          aria-hidden="true"
                          style={{
                            flexShrink: 0,
                            width: 14,
                            height: 1,
                            marginTop: "0.7em",
                            background: "var(--color-accent-text)",
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 style={columnHeading}>Who it is for</h3>
                  <p className="kv-muted" style={{ fontSize: "var(--text-sm)" }}>
                    {service.audience}
                  </p>
                </div>

                <div>
                  <h3 style={columnHeading}>How it works</h3>
                  <ol style={{ listStyle: "none", padding: 0, margin: 0, counterReset: "step" }}>
                    {service.process.map((step, i) => (
                      <li key={step} style={listItem}>
                        <span aria-hidden="true" style={{ color: "var(--color-accent-text)", fontVariantNumeric: "tabular-nums" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="kv-split" style={{ marginTop: "var(--space-16)", alignItems: "start" }}>
                <div>
                  <h3 style={columnHeading}>Common questions</h3>
                  <Accordion items={service.faqs} />
                </div>

                {related.length > 0 ? (
                  <div>
                    <h3 style={columnHeading}>From our work</h3>
                    <div className="kv-grid kv-grid--2">
                      {related.map((item) => (
                        <Link
                          key={item.src}
                          href={`/portfolio#${service.slug}`}
                          className="kv-card"
                          style={{ textDecoration: "none" }}
                        >
                          <Media src={item.src} alt={item.alt} ratio="4 / 3" sizes="(min-width: 900px) 22vw, 45vw" />
                          <p className="kv-muted" style={{ fontSize: "var(--text-xs)", marginTop: "var(--space-2)" }}>
                            {service.name}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      <CallToAction />
    </>
  );
}
