import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and stores the information you send through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const UPDATED = "9 September 2026";

const body = { color: "var(--color-ink-soft)" } as const;

const h2 = { margin: "40px 0 14px" } as const;

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ ...body, margin: "0 0 10px" }}>
      {children}
    </li>
  );
}

export default function PrivacyPage() {
  return (
    <section className="kv-section">
      <div className="kv-wrap kv-wrap--narrow">
      <p className="kv-eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <p
        className="kv-muted"
        style={{ fontSize: "var(--text-xs)", margin: "var(--space-4) 0 var(--space-12)" }}
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
        <a href={`mailto:${site.email}`} className="kv-link">
          {site.email}
        </a>{" "}
        or call{" "}
        <a href={`tel:${site.phoneHref}`} className="kv-link">
          {site.phone}
        </a>
        . We answer privacy requests within 30 days.
      </p>

        <div style={{ marginTop: "var(--space-12)" }}>
          <Link href="/" className="kv-btn kv-btn--ghost">
            Back to the site
          </Link>
        </div>
      </div>
    </section>
  );
}
