import type { MetadataRoute } from "next";
import { LOCALES, DEFAULT_LOCALE } from "@/data/content";
import { localeUrl, alternatesLanguages } from "@/lib/seo";

/**
 * Served at /sitemap.xml. One entry per localized home page, each carrying
 * full hreflang alternates so Google indexes the right language per region.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = alternatesLanguages(LOCALES, DEFAULT_LOCALE);

  return LOCALES.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: "weekly",
    priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
    alternates: { languages },
  }));
}
