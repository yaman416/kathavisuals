import type { Metadata } from "next";
import { Italiana, Jost } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* Light gallery: a thin, high-contrast display face for headings and the
   wordmark, and a clean geometric sans for everything else. */
const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Canberra photographer",
    "Canberra videographer",
    "wedding photography Canberra",
    "event photography ACT",
    "Nepali wedding photographer Canberra",
    "Hindu wedding photographer Canberra",
    "Pasni photography Canberra",
    "maternity photographer Canberra",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/design/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/design/og.jpg"],
  },
};

/**
 * Local business data. Only facts we can stand behind: no street address, no
 * opening hours, no price range, no ratings.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phoneHref,
  image: `${site.url}/design/og.jpg`,
  areaServed: { "@type": "City", name: "Canberra" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Canberra",
    addressRegion: "ACT",
    addressCountry: "AU",
  },
  sameAs: [site.instagram, site.facebook].filter(Boolean),
  makesOffer: [
    "Wedding photography and videography",
    "Event photography and videography",
    "Real estate photography and video",
    "Brand and social media content",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

/**
 * Only the document shell, the fonts and the site-wide metadata.
 *
 * The header and footer live in the (site) group instead, so /keystatic can
 * render the admin on its own without the studio's own navigation wrapped
 * around it.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${italiana.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Static, author-controlled object. No user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
