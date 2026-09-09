import type { Metadata } from "next";
import { Inter, Tinos } from "next/font/google";
import { ScrollMotion } from "@/components/ScrollMotion";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Headings are set in Times, which ships with macOS, iOS and Windows, so it is
 * referenced as a system font rather than served — Times New Roman is a
 * Monotype licence we do not hold and cannot redistribute.
 *
 * Tinos is metrically identical to Times New Roman and free (Apache 2.0). It
 * sits last in the stack for Android and Linux, which have no Times. preload is
 * off deliberately: browsers fetch a family only when everything ahead of it in
 * the stack is missing, so the vast majority of visitors never download it.
 */
const tinos = Tinos({
  variable: "--font-tinos",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  keywords: [
    "Canberra photographer",
    "Canberra videographer",
    "wedding photography Canberra",
    "event photography ACT",
    "real estate photography Canberra",
    "social media content Canberra",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/design/og.jpg",
        width: 1200,
        height: 630,
        alt: "Lake Burley Griffin on a clear morning, Canberra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/design/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${tinos.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-action-primary-text)",
            padding: "8px 16px",
            borderRadius: "var(--radius-control)",
          }}
        >
          Skip to content
        </a>
        <ScrollMotion />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
