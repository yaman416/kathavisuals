import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Check your date with ${site.name}. Canberra photography and film enquiries, answered within two business days.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage(props: PageProps<"/contact">) {
  const params = await props.searchParams;
  const raw = params.service;
  const requested = Array.isArray(raw) ? raw[0] : raw;
  const defaultService = services.some((service) => service.slug === requested)
    ? (requested as string)
    : "";

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-sand">Contact</p>
          <h1 className="mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl">
            Check your date.
          </h1>
          <p className="mt-5 leading-relaxed text-bone-dim">
            Send the date and a couple of lines about the day. We reply within two
            business days, always with a real answer on availability.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
                Email
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="text-bone hover:text-sand">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
                Phone
              </dt>
              <dd className="mt-1">
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="text-bone hover:text-sand"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
                Based in
              </dt>
              <dd className="mt-1 text-bone">{site.location}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">
                Studio hours
              </dt>
              <dd className="mt-1 text-bone">Mon–Fri, 9am–6pm AEST. Shoots on weekends.</dd>
            </div>
          </dl>
        </div>

        <div className="border border-ink-line p-6 sm:p-9">
          <ContactForm defaultService={defaultService} />
        </div>
      </Container>
    </section>
  );
}
