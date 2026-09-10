import Link from "next/link";
import { Logo } from "@/components/Logo";
import { nav, services, site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.instagram },
  { label: "Facebook", href: site.facebook },
  { label: "YouTube", href: site.youtube },
].filter((s): s is { label: string; href: string } => Boolean(s.href));

const heading = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-2xs)",
  fontWeight: 600,
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--archive-sand)",
  margin: "0 0 var(--space-4)",
} as const;

const listLink = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: "var(--touch)",
  fontSize: "var(--text-sm)",
  color: "var(--sand-tint)",
  textDecoration: "none",
} as const;

export function SiteFooter() {
  return (
    <footer className="kv-section--dark" style={{ paddingBlock: "var(--section-tight)" }}>
      <div className="kv-wrap">
        <div className="kv-footer-grid">
          <div className="kv-footer-brand">
            <span style={{ color: "var(--story-paper)", display: "inline-block" }}>
              <Logo />
            </span>
            <p className="kv-muted" style={{ marginTop: "var(--space-4)", fontSize: "var(--text-sm)" }}>
              {site.tagline}
            </p>
            <p className="kv-muted" style={{ fontSize: "var(--text-sm)", margin: 0 }}>
              {site.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 style={heading}>Explore</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={listLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 style={heading}>Services</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services#${service.slug}`} style={listLink}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="kv-footer-contact">
            <h2 style={heading}>Get in touch</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href={`tel:${site.phoneHref}`} style={listLink}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} style={listLink}>
                  {site.email}
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer me" style={listLink}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            justifyContent: "space-between",
            marginTop: "var(--space-12)",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid rgb(200 185 159 / 26%)",
            fontSize: "var(--text-xs)",
            color: "var(--archive-sand)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", minHeight: "var(--touch)" }}>
            © {new Date().getFullYear()} {site.name}
          </span>
          <Link
            href="/privacy"
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: "var(--touch)",
              color: "var(--archive-sand)",
              textDecoration: "none",
            }}
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
