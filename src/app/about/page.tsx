import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction } from "@/components/ui/CallToAction";
import { Media } from "@/components/ui/Media";
import { PageHeader } from "@/components/ui/PageHeader";
import { pending, people, principles, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Katha Visuals is a Canberra photography and videography brand founded by Prakash Khanal with Yaman Gurung as partner.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Two creative journeys, one shared vision."
        lede={`${site.name} is a Canberra-based photography and videography brand founded by Prakash Khanal, with Yaman Gurung as partner.`}
      />

      <section className="kv-section" style={{ paddingTop: 0 }}>
        <div className="kv-wrap kv-split kv-split--wide-media" style={{ alignItems: "start" }}>
          <Media
            src={pending.teamPhotograph}
            alt={`${people[0].name} and ${people[1].name} of ${site.name}`}
            ratio="4 / 5"
            sizes="(min-width: 900px) 50vw, 100vw"
            placeholder="Photograph of Prakash and Yaman required"
          />
          <div>
            <p className="kv-muted">
              Before working together under {site.name}, we built our experience independently
              through freelance photography and videography. Bringing that experience under one
              name allows us to offer a more consistent and collaborative approach across
              weddings, events, real estate and brand content.
            </p>
            <p className="kv-muted">
              Our Nepalese background shapes the way we understand family, community, culture and
              celebration. It helps us approach every story with sensitivity while creating work
              that feels natural, considered and visually enduring.
            </p>
            <p className="kv-lede">
              For us, photography and film are not simply records of what happened. They are a way
              of preserving how a moment felt.
            </p>
          </div>
        </div>
      </section>

      <section className="kv-section" style={{ background: "var(--color-surface)" }}>
        <div className="kv-wrap">
          <p className="kv-eyebrow">The team</p>
          <h2 style={{ maxWidth: "16ch" }}>Who you will be working with.</h2>

          <div className="kv-grid kv-grid--2" style={{ marginTop: "var(--space-12)", gap: "var(--space-12)" }}>
            {people.map((person) => (
              <article key={person.name}>
                <Media
                  src={person.portrait}
                  alt={`${person.name}, ${person.role} at ${site.name}`}
                  ratio="1 / 1"
                  sizes="(min-width: 900px) 45vw, 100vw"
                  placeholder={`Photograph of ${person.name.split(" ")[0]} required`}
                />
                <h3 style={{ marginTop: "var(--space-4)" }}>{person.name}</h3>
                <p
                  className="kv-eyebrow"
                  style={{ margin: "var(--space-2) 0 var(--space-3)" }}
                >
                  {person.role}
                </p>
                <p className="kv-muted" style={{ fontSize: "var(--text-sm)" }}>
                  {person.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kv-section">
        <div className="kv-wrap">
          <p className="kv-eyebrow">How we work</p>
          <h2 style={{ maxWidth: "18ch" }}>Preparation, then presence.</h2>
          <div className="kv-grid kv-grid--4" style={{ marginTop: "var(--space-12)" }}>
            {principles.map((principle) => (
              <div key={principle.title} style={{ borderTop: "2px solid var(--color-accent)", paddingTop: "var(--space-4)" }}>
                <h3 style={{ fontSize: "var(--text-lg)" }}>{principle.title}</h3>
                <p className="kv-muted" style={{ fontSize: "var(--text-sm)", margin: "var(--space-2) 0 0" }}>
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "var(--space-12)" }}>
            <Link href="/portfolio" className="kv-link">
              See the work →
            </Link>
          </p>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
