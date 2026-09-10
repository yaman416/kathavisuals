import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // The admin is never worth indexing, and stays out of search results even
    // once it is switched on and sitting behind a GitHub sign-in.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/keystatic"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
