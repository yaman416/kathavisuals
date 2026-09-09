import { Accordion } from "@/components/ds/Accordion";
import { ProcessStep, ServiceCard } from "@/components/ds/cards";
import { icons } from "@/components/ds/Icons";
import { Media } from "@/components/ds/Media";
import { ButtonLink, Divider, Eyebrow, SectionHeading } from "@/components/ds/primitives";
import { ContactSection } from "@/components/ContactSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { processSteps, services, showPortfolio, site } from "@/lib/site";

const bodyText = {
  fontFamily: "var(--font-body)",
  color: "var(--color-text-secondary)",
  lineHeight: "var(--leading-body)",
} as const;

export default function HomePage() {
  return (
    <div style={{ background: "var(--color-bg)" }}>
      {/* Hero ------------------------------------------------------------ */}
      <section
        id="home"
        className="kv-on-dark kv-hero"
        style={{
          position: "sticky",
          minHeight: "min(88vh, 760px)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          scrollMarginTop: "88px",
        }}
      >
        <Media
          src="/design/hero-scroll-poster.jpg"
          alt=""
          label="Hero image — /public/design/hero-scroll-poster.jpg"
          className="kv-hero-media"
          style={{ position: "absolute", inset: 0 }}
          sizes="100vw"
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(5,6,7,0.96) 0%, rgba(5,6,7,0.6) 55%, rgba(5,6,7,0.2) 100%)",
          }}
        />
        <div
          className="kv-hero-content"
          style={{ position: "relative", padding: "0 var(--page-gutter)", maxWidth: "640px" }}
        >
          <Eyebrow>{site.eyebrow}</Eyebrow>
          <SectionHeading as="h1" size="h1" style={{ margin: "16px 0" }}>
            {site.tagline}
          </SectionHeading>
          <Divider width="60px" />
          <p style={{ ...bodyText, fontSize: "var(--text-base)", maxWidth: "48ch", margin: "20px 0 32px" }}>
            Photography and video for weddings, events, real estate and social media content. One
            studio, one considered visual style, across stills and motion.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <ButtonLink href="#contact" variant="primary">
              Enquire Now
            </ButtonLink>
            <ButtonLink href={showPortfolio ? "#portfolio" : "#services"} variant="outline">
              View Our Work
            </ButtonLink>
          </div>
        </div>
      </section>

      <div className="kv-over-hero">
      {/* Service cards --------------------------------------------------- */}
      <section className="kv-reveal" style={{ padding: "var(--section-space) var(--page-gutter)" }}>
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            letterSpacing: "var(--tracking-eyebrow)",
            textTransform: "uppercase",
            color: "var(--color-text-secondary)",
            margin: "0 0 32px",
          }}
        >
          Four Services, One Studio
        </p>
        <div
          className="kv-grid-4"
          style={{
            border: "1px solid var(--color-border)",
            maxWidth: "var(--content-width)",
            margin: "0 auto",
          }}
        >
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <ServiceCard
                key={service.slug}
                index={i}
                image={service.image}
                label={service.name}
                icon={<Icon width={20} height={20} />}
                href={`#${service.anchorId}`}
                placeholderLabel={`/public/design/service-${service.slug}.jpg`}
              />
            );
          })}
        </div>
      </section>

      {/* Process --------------------------------------------------------- */}
      <section
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          className="kv-grid-4"
          style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}
        >
          {processSteps.map((step) => {
            const Icon = icons[step.icon];
            return (
              <ProcessStep
                key={step.title}
                icon={<Icon width={20} height={20} />}
                title={step.title}
                description={step.description}
              />
            );
          })}
        </div>
      </section>

      {/* Services -------------------------------------------------------- */}
      <section
        id="services"
        style={{
          padding: "var(--section-space) var(--page-gutter)",
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          scrollMarginTop: "88px",
        }}
      >
        <Eyebrow>Services</Eyebrow>
        <SectionHeading style={{ margin: "12px 0 40px" }}>
          Four Ways We Tell Your Story.
        </SectionHeading>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            border: "1px solid var(--color-border)",
          }}
        >
          {services.map((service) => (
            <div
              key={service.slug}
              id={service.anchorId}
              className="kv-service-row kv-reveal"
              style={{
                background: "var(--color-bg-secondary)",
                borderBottom: "1px solid var(--color-border)",
                padding: "32px",
                scrollMarginTop: "96px",
              }}
            >
              <Media
                src={service.image}
                alt=""
                label={`/public/design/service-${service.slug}.jpg`}
                style={{ height: "160px", borderRadius: "var(--radius-card)" }}
                sizes="(min-width: 900px) 220px, 100vw"
              />
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    color: "var(--color-text-strong)",
                    fontSize: "var(--text-h3)",
                    margin: "0 0 8px",
                  }}
                >
                  {service.name}
                </h3>
                <p style={{ ...bodyText, fontSize: "var(--text-sm)", margin: "0 0 16px" }}>
                  {service.copy}
                </p>
                <p style={{ ...bodyText, fontSize: "var(--text-sm)", margin: "0 0 20px" }}>
                  <strong style={{ color: "var(--color-text-primary)" }}>Who it&apos;s for: </strong>
                  {service.audience}
                </p>
                <Accordion items={service.faqs} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio — hidden until there is real client work to show ------ */}
      {showPortfolio ? <PortfolioSection /> : null}

      {/* About ----------------------------------------------------------- */}
      <section
        id="about"
        className="kv-split kv-reveal"
        style={{
          maxWidth: "var(--content-width)",
          margin: "0 auto",
          padding: "var(--section-space) var(--page-gutter)",
          scrollMarginTop: "88px",
        }}
      >
        <Media
          src="/design/about-landscape.jpg"
          alt="Landscape near Canberra, ACT"
          label="/public/design/about-landscape.jpg"
          style={{ aspectRatio: "4/3", borderRadius: "var(--radius-card)" }}
        />
        <div>
          <Eyebrow>About Katha Visuals</Eyebrow>
          <SectionHeading style={{ margin: "12px 0 20px" }}>Our Approach.</SectionHeading>
          <p style={{ ...bodyText, marginBottom: "16px" }}>
            Katha Visuals is a Canberra based photography and video studio working across weddings,
            events, real estate and social media content.
          </p>
          <p style={{ ...bodyText, marginBottom: "24px" }}>
            Book photography, video, or both. Whichever you choose, it is shot by the same team
            with the same eye, so a project never looks like two suppliers stitched together.
            Every one gets clear communication, thoughtful preparation on the day and a
            consistent, considered look across the final delivery.
          </p>
          <ButtonLink href="#contact" variant="primary">
            Enquire Now
          </ButtonLink>
        </div>
      </section>

      {/* Contact --------------------------------------------------------- */}
      <ContactSection />
      </div>
    </div>
  );
}
