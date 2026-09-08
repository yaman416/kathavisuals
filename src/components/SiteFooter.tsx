import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  YoutubeIcon,
} from "@/components/ds/Icons";
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

const contactLink = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  color: "var(--color-text-primary)",
  textDecoration: "none",
  display: "flex",
  gap: "8px",
  alignItems: "center",
} as const;

const socialLink = {
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid var(--color-border)",
  borderRadius: "50%",
  color: "var(--color-text-primary)",
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
            src="/design/logo-white.png"
            alt={site.name}
            width={64}
            height={64}
            style={{ height: "64px", width: "64px", objectFit: "contain" }}
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

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={columnHeading}>Quick Links</p>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-primary)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={columnHeading}>Follow Us</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href={site.instagram} aria-label="Instagram" style={socialLink}>
              <InstagramIcon width={16} height={16} />
            </a>
            <a href={site.facebook} aria-label="Facebook" style={socialLink}>
              <FacebookIcon width={16} height={16} />
            </a>
            <a href={site.youtube} aria-label="Youtube" style={socialLink}>
              <YoutubeIcon width={16} height={16} />
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={columnHeading}>Get In Touch</p>
          <a href={`tel:${site.phoneHref}`} style={contactLink}>
            <PhoneIcon width={16} height={16} />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} style={contactLink}>
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
