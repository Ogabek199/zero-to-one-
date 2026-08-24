import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ApplyProvider } from "@/context/ApplyContext";
import { ApplyModal } from "@/components/apply/ApplyModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/data/content";
import {
  SEO,
  SITE_NAME,
  SITE_URL,
  OG_IMAGE,
  OG_LOCALE,
  HTML_LANG,
  localeUrl,
  alternatesLanguages,
  VERIFICATION,
} from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
  // Let env(safe-area-inset-*) resolve so the apply modal clears the home bar.
  viewportFit: "cover",
};

/** Pre-render one static page per supported language. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * Per-locale metadata: localized title/description/keywords, canonical URL,
 * hreflang alternates for every language, and full Open Graph + Twitter cards
 * so links unfurl richly on social and messengers.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) {
    return {};
  }

  const l = locale as Locale;
  const seo = SEO[l];
  const url = localeUrl(l);
  const ogImageUrl = `${SITE_URL}${OG_IMAGE}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.title,
      template: `%s · ${SITE_NAME}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "business",
    alternates: {
      canonical: url,
      languages: alternatesLanguages(LOCALES, DEFAULT_LOCALE),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: seo.shortTitle,
      description: seo.description,
      url,
      locale: OG_LOCALE[l],
      alternateLocale: LOCALES.filter((x) => x !== l).map((x) => OG_LOCALE[x]),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${seo.shortTitle}`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.shortTitle,
      description: seo.description,
      images: [ogImageUrl],
      creator: "@zerotoone",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: VERIFICATION.google,
      yandex: VERIFICATION.yandex,
    },
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "black-translucent",
    },
    formatDetection: {
      telephone: false,
    },
    // Icons (favicon.ico, icon.svg, apple-icon.png) are auto-detected by
    // Next.js from the files in the `app/` directory — no manual config needed.
    manifest: "/manifest.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const l = locale as Locale;

  return (
    <html lang={HTML_LANG[l]}>
      <body className="font-sans">
        <JsonLd locale={l} />
        <LanguageProvider locale={l}>
          <ApplyProvider>
            {children}
            <ApplyModal />
          </ApplyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
