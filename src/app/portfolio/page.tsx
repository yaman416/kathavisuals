import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CallToAction } from "@/components/ui/CallToAction";
import { PageHeader } from "@/components/ui/PageHeader";
import { pending, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Wedding, event, real estate and brand photography and video by Katha Visuals in Canberra.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Work from weddings, events, properties and brands."
        lede={`The work we make in ${site.location} and beyond. Filter by the kind of project you are planning.`}
      />
      <section className="kv-section kv-section--tight" style={{ paddingTop: 0 }}>
        <div className="kv-wrap">
          {pending.imageryIsPlaceholder ? (
            <p className="kv-muted" style={{ fontSize: "var(--text-sm)" }}>
              Placeholder imagery is shown while our client galleries are prepared.
            </p>
          ) : null}
          <PortfolioGrid />
        </div>
      </section>
      <CallToAction />
    </>
  );
}
