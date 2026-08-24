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

const FAQ_ITEMS: Record<
  Locale,
  Array<{ question: string; answer: string }>
> = {
  uz: [
    {
      question: "Zero to One akseleratori nima?",
      answer:
        "Zero to One — startaplarni 40 kun ichida g'oyadan MVP va birinchi sotuvlargacha olib chiquvchi oflayn akseleratsiya dasturi.",
    },
    {
      question: "Dasturda qatnashish pulllimi?",
      answer:
        "Yo'q, dasturda ishtirok etish mutlaqo bepul. Eng yaxshi startaplarga $10 000 dan $100 000 gacha investitsiya ajratiladi.",
    },
    {
      question: "Dastur necha kun davom etadi va qayerda bo'ladi?",
      answer:
        "Dastur 40 kun davom etadi va Toshkent shahrida oflayn formatda o'tkaziladi.",
    },
  ],
  ru: [
    {
      question: "Что такое акселератор Zero to One?",
      answer:
        "Zero to One — это 40-дневная офлайн программа акселерации, которая помогает стартапам пройти путь от идеи до готового MVP и первых продаж.",
    },
    {
      question: "Участие в программе бесплатное?",
      answer:
        "Да, участие абсолютно бесплатное. Лучшие команды получают инвестиции от $10 000 до $100 000.",
    },
    {
      question: "Сколько длится программа и где она проходит?",
      answer:
        "Программа длится 40 дней и проходит в Ташкенте в офлайн-формате.",
    },
  ],
  en: [
    {
      question: "What is Zero to One accelerator?",
      answer:
        "Zero to One is a 40-day offline startup accelerator that guides founders from idea to MVP and first revenue.",
    },
    {
      question: "Is participation free?",
      answer:
        "Yes, joining the accelerator is 100% free. Top performing teams can secure $10,000 to $100,000 in funding.",
    },
    {
      question: "How long is the program and where is it located?",
      answer:
        "The program runs for 40 days offline in Tashkent, Uzbekistan.",
    },
  ],
};

export function JsonLd({ locale }: { locale: Locale }) {
  const seo = SEO[locale];
  const url = localeUrl(locale);
  const logo = `${SITE_URL}${OG_IMAGE}`;
  const faqs = FAQ_ITEMS[locale] ?? FAQ_ITEMS.uz;

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
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tashkent",
          addressCountry: "UZ",
        },
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
        breadcrumb: { "@id": `${url}/#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale.toUpperCase(),
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
