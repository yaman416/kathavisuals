import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { process, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & pricing",
  description:
    "Wedding, portrait, event and commercial photography and film packages from Katha Visuals, Canberra.",
  alternates: { canonical: "/services" },
};

const faqs = [
  {
    q: "How far ahead should we book?",
    a: "Weddings: six to twelve months, and peak weekends go first. Portraits and brand shoots usually need two to three weeks.",
  },
  {
    q: "Do you travel?",
    a: "Yes. Regional NSW is included within 100km of Canberra. Beyond that we quote travel at cost, with no markup.",
  },
  {
    q: "When do we get everything?",
    a: "Preview selects within 72 hours, full galleries in two to three weeks, and films within six weeks. Peak season adds a week.",
  },
  {
    q: "What do you need to hold a date?",
    a: "A signed agreement and a 25% retainer. The balance is due the week before the shoot.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-ink-line py-20 sm:py-28">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.28em] text-sand">Services</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-balance sm:text-5xl">
            Clear packages. Honest pricing. No surprise line items.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone-dim">
            Every quote is written before anything is booked, and it is the number you
            pay. Add-ons are priced up front.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-px overflow-hidden border border-ink-line bg-ink-line lg:grid-cols-2">
            {services.map((service) => (
              <div key={service.slug} id={service.slug} className="bg-ink p-8 sm:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl">{service.title}</h2>
                  <span className="font-mono text-sm text-sand">from {service.from}</span>
                </div>
                <p className="mt-4 leading-relaxed text-bone-dim">{service.summary}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-bone-dim">
                      <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-sand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/contact?service=${service.slug}`}
                  className="mt-8 inline-block text-sm text-sand underline-offset-4 hover:underline"
                >
                  Enquire about {service.title.toLowerCase()} →
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-bone-dim">
            Prices are indicative starting points in AUD and include GST. Final quotes
            depend on hours, crew and travel.
          </p>
        </Container>
      </section>

      <section className="border-y border-ink-line bg-ink-soft py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Process" title="From first email to final gallery" />
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

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="FAQ" title="The questions we get most" />
          <dl className="mt-12 divide-y divide-ink-line border-y border-ink-line">
            {faqs.map((faq) => (
              <div key={faq.q} className="grid gap-3 py-7 lg:grid-cols-3 lg:gap-8">
                <dt className="font-display text-lg">{faq.q}</dt>
                <dd className="leading-relaxed text-bone-dim lg:col-span-2">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
