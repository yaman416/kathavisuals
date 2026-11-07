import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 defaults this allowlist to [75] and silently coerces anything
     * else down to it, so a higher `quality` prop does nothing until the value
     * is listed here. 90 is where the photography stops showing compression in
     * skies and skin tones.
     */
    qualities: [75, 90],
  },

  /**
   * Next blocks cross-origin requests to its dev-only resources, and a browser
   * that resolves localhost to 127.0.0.1 trips that check: hot reload fails and
   * the page never hydrates. Development only, no effect on a build.
   */
  allowedDevOrigins: ["127.0.0.1", "localhost"],

  /**
   * Katha Invoices is a separate single-page app kept in public/invoices. Next
   * doesn't serve a folder's index.html on its own, so map the clean address
   * to it. Its data and sign-in live in Supabase, not in this site.
   */
  rewrites() {
    return [{ source: "/invoices", destination: "/invoices/index.html" }];
  },

  headers() {
    return [
      {
        source: "/invoices/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/invoices",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
    ];
  },
};

export default nextConfig;
