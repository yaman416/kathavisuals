import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { nav, site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.instagram },
  { label: "Facebook", href: site.facebook },
  { label: "YouTube", href: site.youtube },
].filter((s): s is { label: string; href: string } => Boolean(s.href));

/** Light, centred footer: wordmark, pages, contact, socials. */
export function SiteFooter() {
  return (
    <footer className="kv-footer">
      <Wordmark size="lg" />
      <p className="kv-footer__tag">
        {site.tagline} | {site.location}
      </p>

      <nav aria-label="Footer">
        <ul className="kv-footer__row">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <ul className="kv-footer__row">
        <li>
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
        </li>
        <li>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noopener noreferrer me">
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="kv-footer__legal">
        © {new Date().getFullYear()} {site.name} | <Link href="/privacy">Privacy policy</Link>
      </p>
    </footer>
  );
}
