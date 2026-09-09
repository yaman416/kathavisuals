import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { CallToAction } from "@/components/ui/CallToAction";
import { Media } from "@/components/ui/Media";
import { pending, people, principles, projects, services, site } from "@/lib/site";

const featured = projects.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="kv-below-hero">
        {/* Introduction ------------------------------------------------- */}
        <section className="kv-section">
          <div className="kv-wrap kv-split kv-split--wide-media">
            <div>
              <p className="kv-eyebrow">Introduction</p>
              <h2 style={{ maxWidth: "16ch" }}>Every story begins with a moment.</h2>
              <p className="kv-lede" style={{ marginTop: "var(--space-6)" }}>
                {site.name} is a Canberra-based photography and videography team founded by
                Prakash Khanal, with Yaman Gurung as partner.
              </p>
              <p className="kv-muted">
                Drawing on years of independent creative experience, we now work together under
                one brand to document people, celebrations, places and businesses with honesty
                and intention.
              </p>
              <Link href="/about" className="kv-link">
                Read our story →
              </Link>
            </div>
            <Media
              src="/design/about-landscape.jpg"
              alt="Open grassland and gum trees outside Canberra"
              ratio="5 / 4"
              sizes="(min-width: 900px) 50vw, 100vw"
            />
          </div>
        </section>

        {/* Featured work ------------------------------------------------ */}
        <section className="kv-section kv-section--tight">
          <div className="kv-wrap">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-6)",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "var(--space-12)",
              }}
            >
              <div>
                <p className="kv-eyebrow">Selected work</p>
                <h2 style={{ maxWidth: "18ch" }}>Weddings, events, properties and brands.</h2>
              </div>
              <Link href="/portfolio" className="kv-link">
                View the full portfolio →
              </Link>
            </div>

            {pending.imageryIsPlaceholder ? (
              <p className="kv-muted" style={{ fontSize: "var(--text-sm)", marginBottom: "var(--space-6)" }}>
                Placeholder imagery is shown while our client galleries are prepared.
              </p>
            ) : null}

            <div className="kv-portfolio">
              {featured.map((project, i) => (
                <div key={project.id} className="kv-portfolio__item" data-span={project.span}>
                  <ProjectCard project={project} priority={i < 2} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services ----------------------------------------------------- */}
        <section className="kv-section" style={{ background: "var(--color-surface)" }}>
          <div className="kv-wrap">
            <p className="kv-eyebrow">Services</p>
            <h2 style={{ maxWidth: "16ch" }}>Four ways we work.</h2>

            <div className="kv-grid kv-grid--4" style={{ marginTop: "var(--space-12)" }}>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services#${service.slug}`}
                  className="kv-card"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <Media
                    src={service.image}
                    alt={`${service.name} photography by ${site.name}`}
                    ratio="4 / 5"
                    sizes="(min-width: 900px) 25vw, 50vw"
                  />
                  <h3 style={{ fontSize: "var(--text-lg)", marginTop: "var(--space-4)" }}>
                    {service.name}
                  </h3>
                  <p className="kv-muted" style={{ fontSize: "var(--text-sm)" }}>
                    {service.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why work with us --------------------------------------------- */}
        <section className="kv-section">
          <div className="kv-wrap">
            <p className="kv-eyebrow">Why work with us</p>
            <h2 style={{ maxWidth: "20ch" }}>What you can expect, on every project.</h2>

            <div className="kv-grid kv-grid--4" style={{ marginTop: "var(--space-12)" }}>
              {principles.map((principle) => (
                <div key={principle.title} style={{ borderTop: "2px solid var(--color-accent)", paddingTop: "var(--space-4)" }}>
                  <h3 style={{ fontSize: "var(--text-lg)" }}>{principle.title}</h3>
                  <p className="kv-muted" style={{ fontSize: "var(--text-sm)", margin: "var(--space-2) 0 0" }}>
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About preview ------------------------------------------------ */}
        <section className="kv-section" style={{ background: "var(--color-surface)" }}>
          <div className="kv-wrap kv-split">
            <Media
              src={pending.teamPhotograph}
              alt={`${people[0].name} and ${people[1].name} of ${site.name}`}
              ratio="4 / 5"
              sizes="(min-width: 900px) 45vw, 100vw"
              placeholder="Photograph of Prakash and Yaman required"
            />
            <div>
              <p className="kv-eyebrow">About</p>
              <h2 style={{ maxWidth: "16ch" }}>The people behind {site.name}</h2>
              <p className="kv-muted" style={{ marginTop: "var(--space-6)" }}>
                {site.name} brings together the creative experience of founder Prakash Khanal and
                partner Yaman Gurung. Based in Canberra and connected by our Nepalese background,
                we approach every project with cultural awareness, preparation and respect for the
                people whose stories we document.
              </p>
              <Link href="/about" className="kv-link">
                Meet the team →
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials stay unpublished until genuine ones exist. */}

        <CallToAction />
      </div>
    </>
  );
}
