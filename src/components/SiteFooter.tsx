import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  YoutubeIcon,
} from "@/components/ds/Icons";
import Image from "next/image";
import { navLinks, site } from "@/lib/site";

const columnHeading = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-xs)",
  fontWeight: 600,
  letterSpacing: "var(--tracking-nav)",
  textTransform: "uppercase",
  color: "var(--color-text-secondary)",
  margin: "0 0 8px",
} as const;

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        padding: "var(--space-16) var(--page-gutter) var(--space-8)",
      }}
    >
      <div
        className="kv-footer-grid"
        style={{ maxWidth: "var(--content-width)", margin: "0 auto" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Image
            src="/design/logo-original.png"
            alt={site.name}
            width={1562}
            height={1074}
            style={{ height: "56px", width: "auto" }}
          />
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              maxWidth: "32ch",
              margin: 0,
            }}
          >
            Photography and video for weddings, events, real estate and social media content.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={columnHeading}>Quick Links</p>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="kv-footer-link">
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={columnHeading}>Follow Us</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href={site.instagram} aria-label="Instagram" className="kv-social-link">
              <InstagramIcon width={18} height={18} />
            </a>
            <a href={site.facebook} aria-label="Facebook" className="kv-social-link">
              <FacebookIcon width={18} height={18} />
            </a>
            <a href={site.youtube} aria-label="Youtube" className="kv-social-link">
              <YoutubeIcon width={18} height={18} />
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={columnHeading}>Get In Touch</p>
          <a href={`tel:${site.phoneHref}`} className="kv-footer-link" style={{ gap: "8px" }}>
            <PhoneIcon width={16} height={16} />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="kv-footer-link" style={{ gap: "8px" }}>
            <MailIcon width={16} height={16} />
            {site.email}
          </a>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--color-text-secondary)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              minHeight: "var(--touch-target)",
            }}
          >
            <MapPinIcon width={16} height={16} />
            {site.location}
          </span>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          marginTop: "48px",
          paddingTop: "24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-secondary)",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
