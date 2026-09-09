import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "monthly"],
    ["/portfolio", 0.9, "monthly"],
    ["/services", 0.8, "monthly"],
    ["/about", 0.6, "yearly"],
    ["/contact", 0.7, "yearly"],
    ["/privacy", 0.2, "yearly"],
  ];

  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
