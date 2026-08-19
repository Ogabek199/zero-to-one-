/**
 * Central SEO configuration for the whole site.
 *
 * Everything search-engine-facing (titles, descriptions, keywords, social
 * cards, structured data) is sourced from here so there is a single source of
 * truth per language. Components and the App Router metadata files import from
 * this module.
 *
 * IMPORTANT: set `NEXT_PUBLIC_SITE_URL` in your environment (e.g. `.env.local`
 * and your hosting provider) to the real production origin, without a trailing
 * slash — e.g. `https://zerotoone.uz`. The value below is only a fallback.
 */

import type { Locale } from "@/data/content";

/** Production origin, no trailing slash. Override via env in deployment. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zerotoone.uz"
).replace(/\/$/, "");

/** Brand / program name used across metadata and structured data. */
export const SITE_NAME = "Zero to One";

/** Social + contact handles. Update these to your real accounts. */
export const SOCIAL = {
  telegram: "https://t.me/zerotoone",
  instagram: "https://instagram.com/zerotoone",
} as const;

/** Default social-share image (Open Graph / Twitter). 1200×630 recommended. */
export const OG_IMAGE = "/zero_to_one.jpg";

/** Maps our locale codes to full BCP-47 / Open Graph locale tags. */
export const OG_LOCALE: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/** HTML `lang` / hreflang values per locale. */
export const HTML_LANG: Record<Locale, string> = {
  uz: "uz",
  ru: "ru",
  en: "en",
};

export interface LocaleSeo {
  title: string;
  /** Short title used for OG/Twitter and the `<title>` template base. */
  shortTitle: string;
  description: string;
  keywords: string[];
}

/**
 * Per-language SEO copy. Descriptions are kept in the 140–160 character sweet
 * spot and lead with the strongest hook (40 days → MVP → first sales →
 * $10K–$100K investment). Keywords cover branded, category and long-tail
 * intent in each market.
 */
export const SEO: Record<Locale, LocaleSeo> = {
  uz: {
    title:
      "Zero to One — Startapingizni 40 kunda MVP va birinchi sotuvlargacha",
    shortTitle: "Zero to One — Startap akseleratori",
    description:
      "Biz startaplarga o'qitmaymiz — ularni siz bilan birga quramiz. 40 kun oflayn, MVP va birinchi sotuvlar, eng yaxshilariga $10 000–$100 000 investitsiya. Ishtirok bepul.",
    keywords: [
      "startap akselerator",
      "startap O'zbekiston",
      "startap Toshkent",
      "MVP qurish",
      "startapga investitsiya",
      "biznes akselerator",
      "founder dasturi",
      "startap ariza",
      "Zero to One",
      "startap 40 kun",
    ],
  },
  ru: {
    title:
      "Zero to One — стартап-акселератор: MVP и первые продажи за 40 дней",
    shortTitle: "Zero to One — стартап-акселератор",
    description:
      "Мы не учим стартапам — мы строим их вместе с вами. 40 дней офлайн, MVP и первые продажи, лучшим — инвестиции $10 000–$100 000. Участие бесплатное.",
    keywords: [
      "стартап акселератор",
      "акселератор Узбекистан",
      "стартап Ташкент",
      "запуск MVP",
      "инвестиции в стартап",
      "бизнес акселератор",
      "программа для фаундеров",
      "заявка в акселератор",
      "Zero to One",
      "стартап за 40 дней",
    ],
  },
  en: {
    title:
      "Zero to One — Startup Accelerator: MVP and First Sales in 40 Days",
    shortTitle: "Zero to One — Startup Accelerator",
    description:
      "We don't teach startups — we build them with you. 40 days offline, MVP and first revenue, with $10,000–$100,000 in investment for the best teams. Free to join.",
    keywords: [
      "startup accelerator",
      "accelerator Uzbekistan",
      "startup Tashkent",
      "build MVP",
      "startup investment",
      "founder program",
      "pre-seed accelerator",
      "apply to accelerator",
      "Zero to One",
      "40 day startup program",
    ],
  },
};

/** Absolute URL for a given locale's home page. */
export function localeUrl(locale: Locale): string {
  return `${SITE_URL}/${locale}`;
}

/** hreflang alternates map (all locales + x-default) for a given path. */
export function alternatesLanguages(
  locales: Locale[],
  defaultLocale: Locale,
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[HTML_LANG[locale]] = localeUrl(locale);
  }
  languages["x-default"] = localeUrl(defaultLocale);
  return languages;
}
