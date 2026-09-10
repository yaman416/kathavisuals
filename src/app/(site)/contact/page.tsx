import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about wedding, event, real estate or brand photography and video with Katha Visuals in Canberra.",
  alternates: { canonical: "/contact" },
};

const detailLabel = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-2xs)",
  fontWeight: 600,
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--color-ink-muted)",
  margin: 0,
} as const;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a project."
        lede="Tell us about your wedding, event, property or creative project. We reply within two business days."
      />

      <section className="kv-section" style={{ paddingTop: 0 }}>
        <div className="kv-wrap kv-split" style={{ alignItems: "start" }}>
          <div>
            <EnquiryForm />
          </div>

          <aside style={{ display: "grid", gap: "var(--space-8)" }}>
            <div>
              <p style={detailLabel}>Email</p>
              <a href={`mailto:${site.email}`} className="kv-link">
                {site.email}
              </a>
            </div>
            <div>
              <p style={detailLabel}>Phone</p>
              <a href={`tel:${site.phoneHref}`} className="kv-link">
                {site.phone}
              </a>
            </div>
            <div>
              <p style={detailLabel}>Based in</p>
              <p className="kv-muted" style={{ margin: "var(--space-2) 0 0" }}>
                {site.location}. Available across Australia, with travel quoted on top.
              </p>
            </div>
            <div>
              <p style={detailLabel}>Response time</p>
              <p className="kv-muted" style={{ margin: "var(--space-2) 0 0" }}>
                Within two business days, always with a real answer on availability.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
