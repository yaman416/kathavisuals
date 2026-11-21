import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction } from "@/components/ui/CallToAction";

export const metadata: Metadata = {
  title: "About",
  description:
    "Katha Visuals is Prakash Khanal and Yaman Gurung, Canberra photographers and filmmakers with Nepalese roots.",
  alternates: { canonical: "/about" },
};

/* Short and warm on purpose. No photos here: a client photo under "We're Prakash and Yaman"
   would read as a picture of the founders. */
export default function AboutPage() {
  return (
    <>
      <section className="kv-statement kv-page-header">
        <p className="kv-eyebrow" style={{ margin: 0 }}>
          About us
        </p>
        <h1>We&apos;re Prakash and Yaman</h1>
        <p>
          Two Canberra photographers and filmmakers with Nepalese roots. We photograph and film the
          days families hold onto: weddings, Pasni, birthdays and everything in between.
        </p>
        <p>
          We know the rituals and the timing, so we can stay quiet and let the moments happen. Then
          we give you photos and films that feel just like the day did.
        </p>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", color: "var(--color-ink)" }}>
          Katha means story. Yours is the one we&apos;re here to tell.
        </p>
        <Link href="/portfolio" className="kv-link">
          See our work
        </Link>
      </section>

      <CallToAction />
    </>
  );
}
