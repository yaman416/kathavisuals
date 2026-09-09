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

/** Only the profiles that exist — a dead social link costs trust. */
type Social = { label: string; href: string; Icon: typeof InstagramIcon };

const socials: Social[] = [];
if (site.instagram) socials.push({ label: "Instagram", href: site.instagram, Icon: InstagramIcon });
if (site.facebook) socials.push({ label: "Facebook", href: site.facebook, Icon: FacebookIcon });
if (site.youtube) socials.push({ label: "YouTube", href: site.youtube, Icon: YoutubeIcon });

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
            src="/design/logo-ink.png"
            alt={site.name}
            width={1562}
            height={1074}
            quality={90}
            /* The column stretches its children by default, which pulls a
               width:auto image out to the full column width. */
            style={{ height: "56px", width: "auto", alignSelf: "flex-start" }}
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
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="kv-social-link"
                target="_blank"
                rel="noopener noreferrer me"
              >
                <Icon width={18} height={18} />
              </a>
            ))}
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
          © {new Date().getFullYear()} {site.name}. All rights reserved.{" "}
          <a href="/privacy" style={{ color: "var(--color-text-secondary)" }}>
            Privacy policy
          </a>
        </p>
      </div>
    </footer>
  );
}
