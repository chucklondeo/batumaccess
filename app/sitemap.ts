import type { MetadataRoute } from "next";
import { localePath, locales, pageSlugs } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://batumaccess.com";
  const now = new Date();
  const publicRoutes = locales.flatMap((locale) => [
    localePath(locale.key),
    ...pageSlugs.map((slug) => localePath(locale.key, slug))
  ]);

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route === "/" ? "" : route.replace(/\/$/, "")}`,
    lastModified: now,
    changeFrequency: route.includes("seo-hub") ? "daily" : "weekly",
    priority: route === "/" ? 1 : route.includes("products") ? 0.9 : 0.75
  }));
}
