import Link from "next/link";
import { Container } from "@/components/Container";
import { nav, services, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-line bg-ink-soft">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone-dim">
              {site.tagline}. Photography and film out of {site.location}.
            </p>
          </div>

          <div>
            <h2 className="text-[11px] uppercase tracking-[0.28em] text-sand">Explore</h2>
            <ul className="mt-4 space-y-2 text-sm text-bone-dim">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] uppercase tracking-[0.28em] text-sand">Get in touch</h2>
            <ul className="mt-4 space-y-2 text-sm text-bone-dim">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-bone">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-bone"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="transition-colors hover:text-bone"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-line pt-6 text-xs text-bone-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            {services.map((service) => (
              <span key={service.slug}>{service.title}</span>
            ))}
          </p>
        </div>
      </Container>
    </footer>
  );
}
