import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ApplyProvider } from "@/context/ApplyContext";
import { ApplyModal } from "@/components/apply/ApplyModal";
import { LOCALES, type Locale } from "@/data/content";

export const metadata: Metadata = {
  title: "Zero to One — Biz startaplarga o'qitmaymiz",
  description:
    "40 kun davomida loyihangizni MVP va birinchi sotuvlargacha olib boramiz. Eng yaxshilari $10 000 dan $100 000 gacha investitsiya oladi.",
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

/** Pre-render one static page per supported language. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
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

  return (
    <html lang={locale}>
      <body className="font-sans">
        <LanguageProvider locale={locale as Locale}>
          <ApplyProvider>
            {children}
            <ApplyModal />
          </ApplyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
