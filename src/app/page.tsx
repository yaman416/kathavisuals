import Link from "next/link";
import { Container } from "@/components/Container";
import { MediaFrame } from "@/components/MediaFrame";
import { SectionHeading } from "@/components/SectionHeading";
import { process, projects, services, site, testimonials } from "@/lib/site";

const featured = projects.filter((project) => project.featured);

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-line">
        <MediaFrame
          src={null}
          alt="Katha Visuals hero"
          label="Hero image — /public/work/hero.jpg"
          className="absolute inset-0"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        <Container className="relative py-28 sm:py-40">
          <p className="text-[11px] uppercase tracking-[0.28em] text-sand">
            {site.location}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
            Every frame is a story worth keeping.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
            {site.name} is a photography and film studio for weddings, portraits,
            events and brands — shot quietly, edited with restraint, delivered on time.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-sand px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-bone"
            >
              Check your date
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-ink-line px-7 py-3 text-sm text-bone transition-colors hover:border-sand hover:text-sand"
            >
              See the work
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Selected work" title="Recent stories">
            <p>
              A short cross-section. The full archive lives on the work page, and there
              is always more we can send privately.
            </p>
          </SectionHeading>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.slug}
                href="/work"
                className="group block border border-ink-line transition-colors hover:border-sand-dim"
              >
                <MediaFrame
                  src={project.image}
                  alt={project.title}
                  label={`/public/work/${project.slug}.jpg`}
                  className="aspect-4/5"
                />
                <div className="p-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-sand">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl">{project.title}</h3>
                  <p className="mt-2 text-sm text-bone-dim">{project.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-ink-line bg-ink-soft py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Services" title="What we take on">
            <p>Packages are a starting point, not a cage. Most work gets tailored.</p>
          </SectionHeading>

          <div className="mt-12 grid gap-px overflow-hidden border border-ink-line bg-ink-line sm:grid-cols-2">
            {services.map((service) => (
              <div key={service.slug} className="bg-ink-soft p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{service.title}</h3>
                  <span className="font-mono text-xs text-sand">from {service.from}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                  {service.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/services"
              className="text-sm text-sand underline-offset-4 hover:underline"
            >
              Full inclusions and pricing →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="How it works" title="Four steps, no surprises" />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <li key={item.step}>
                <span className="font-mono text-xs text-sand">{item.step}</span>
                <h3 className="mt-3 font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-ink-line py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Kind words" title="What clients say" />
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex h-full flex-col justify-between border border-ink-line p-7"
              >
                <blockquote className="font-display text-lg leading-relaxed text-bone">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm text-bone-dim">
                  <span className="text-bone">{testimonial.name}</span> · {testimonial.detail}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-line bg-ink-soft py-20 sm:py-24">
        <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl text-balance sm:text-4xl">
              Dates book out early. Yours might still be open.
            </h2>
            <p className="mt-3 max-w-lg text-bone-dim">
              Tell us the date and the shape of the day. We reply within two business days.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-sand px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-bone"
          >
            Start an enquiry
          </Link>
        </Container>
      </section>
    </>
  );
}
