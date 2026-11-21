import Link from "next/link";
import { site } from "@/lib/site";

/** Closing prompt, shared by every page so the ask is never more than a scroll away. */
export function CallToAction() {
  return (
    <section className="kv-statement" style={{ borderTop: "1px solid var(--color-border-soft)" }}>
      <p className="kv-eyebrow" style={{ margin: 0 }}>
        Get in touch
      </p>
      <h2>Tell us about your day</h2>
      <p>
        Send us your date, venue and what you have planned. We reply within two business days with
        availability and a quote.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", justifyContent: "center" }}>
        <Link href="/contact" className="kv-btn kv-btn--primary">
          Check your date
        </Link>
        <a href={`tel:${site.phoneHref}`} className="kv-btn kv-btn--ghost">
          Call {site.phone}
        </a>
      </div>
    </section>
  );
}
