/**
 * Structured data (schema.org JSON-LD).
 *
 * Rendered once per page inside the localized layout. It emits three linked
 * entities that help Google understand the site and unlock rich results:
 *   • Organization / EducationalOrganization — the brand + social profiles
 *   • WebSite — enables the sitelinks search box and name in results
 *   • Course — describes the 40-day program (eligible for course rich cards)
 *
 * This is a Server Component: it renders a plain <script> tag with no client
 * JS. `dangerouslySetInnerHTML` is safe here because the payload is built from
 * our own trusted constants, not user input.
 */

import type { Locale } from "@/data/content";
import { SEO, SITE_NAME, SITE_URL, SOCIAL, OG_IMAGE, localeUrl } from "@/lib/seo";

export function JsonLd({ locale }: { locale: Locale }) {
  const seo = SEO[locale];
  const url = localeUrl(locale);
  const logo = `${SITE_URL}${OG_IMAGE}`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "EducationalOrganization"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo,
        image: logo,
        description: seo.description,
        sameAs: [
          SOCIAL.telegram,
          SOCIAL.instagram,
          SOCIAL.facebook,
          SOCIAL.linkedin,
        ],
        areaServed: "UZ",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url,
        name: seo.title,
        description: seo.description,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "Course",
        "@id": `${SITE_URL}/#course`,
        name: SITE_NAME,
        description: seo.description,
        url,
        inLanguage: locale,
        provider: { "@id": `${SITE_URL}/#organization` },
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "UZS",
          availability: "https://schema.org/InStock",
          category: "Free",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "onsite",
          courseWorkload: "P40D",
          location: {
            "@type": "Place",
            name: "Toshkent, Oʻzbekiston",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tashkent",
              addressCountry: "UZ",
            },
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
