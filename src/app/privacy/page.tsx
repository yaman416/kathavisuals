import type { Metadata } from "next";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/ds/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and stores the information you send through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const UPDATED = "9 September 2026";

const body = {
  fontFamily: "var(--font-body)",
  color: "var(--color-text-secondary)",
  lineHeight: "var(--leading-body)",
  margin: "0 0 16px",
} as const;

const h2 = {
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  fontSize: "var(--text-h3)",
  color: "var(--color-text-strong)",
  margin: "40px 0 14px",
} as const;

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ ...body, margin: "0 0 10px" }}>
      {children}
    </li>
  );
}

export default function PrivacyPage() {
  return (
    <section
      style={{
        maxWidth: "var(--content-width-narrow)",
        margin: "0 auto",
        padding: "var(--section-space) var(--page-gutter)",
      }}
    >
      <Eyebrow>Legal</Eyebrow>
      <SectionHeading as="h1" style={{ margin: "12px 0 8px" }}>
        Privacy Policy
      </SectionHeading>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-nav)",
          textTransform: "uppercase",
          color: "var(--color-accent)",
          margin: "0 0 32px",
        }}
      >
        Last updated {UPDATED}
      </p>

      <p style={body}>
        {site.name} is a photography and video studio based in {site.location}. This policy
        explains what we do with the information you send us through this website. We handle
        personal information in line with the Australian Privacy Principles.
      </p>

      <h2 style={h2}>What we collect</h2>
      <p style={body}>
        The enquiry form on this site asks for your name, email address, and optionally your
        phone number, the service and coverage you want, a preferred date, a project location,
        and whatever you write in the project details box. Nothing else is collected. There is
        no analytics, no advertising pixel, and no tracking cookie on this website.
      </p>

      <h2 style={h2}>How we use it</h2>
      <p style={body}>
        We use what you send to reply to your enquiry, quote your project, and if you book us,
        to plan and deliver the work. We do not send marketing email, and we do not sell,
        rent or trade your information to anyone.
      </p>

      <h2 style={h2}>Who else sees it</h2>
      <p style={body}>
        Your enquiry is delivered to our inbox by Resend, an email service provider, and is
        stored in our email account. This website is hosted by Vercel, whose servers process
        the form submission in transit. Both are third parties acting on our instructions, and
        both may store data outside Australia.
      </p>

      <h2 style={h2}>Photographs</h2>
      <p style={body}>
        Photographs and video we take on a job are covered by your booking agreement, not by
        this policy. We do not publish images of a client, their guests, or their property on
        this website or on social media without permission. If an image of yours is already
        published and you want it removed, email us and we will take it down.
      </p>

      <h2 style={h2}>How long we keep it</h2>
      <p style={body}>
        Enquiries that do not turn into a booking are kept for two years and then deleted.
        Records for completed work are kept for seven years, which is what Australian tax law
        requires of us.
      </p>

      <h2 style={h2}>Your rights</h2>
      <ul style={{ padding: "0 0 0 20px", margin: "0 0 16px" }}>
        <Li>Ask what personal information we hold about you.</Li>
        <Li>Ask us to correct anything that is wrong.</Li>
        <Li>Ask us to delete it, unless we are legally required to keep it.</Li>
        <Li>Complain to us, and to the Office of the Australian Information Commissioner if you are not satisfied with our response.</Li>
      </ul>

      <h2 style={h2}>Contact</h2>
      <p style={body}>
        Email{" "}
        <a href={`mailto:${site.email}`} style={{ color: "var(--color-accent)" }}>
          {site.email}
        </a>{" "}
        or call{" "}
        <a href={`tel:${site.phoneHref}`} style={{ color: "var(--color-accent)" }}>
          {site.phone}
        </a>
        . We answer privacy requests within 30 days.
      </p>

      <div style={{ marginTop: "48px" }}>
        <ButtonLink href="/" variant="outline">
          Back to the site
        </ButtonLink>
      </div>
    </section>
  );
}
