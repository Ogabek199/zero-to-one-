"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CONTENT,
  LOCALES,
  type Content,
  type Locale,
} from "@/data/content";

interface LanguageContextValue {
  locale: Locale;
  locales: Locale[];
  setLocale: (locale: Locale) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * The active locale now comes from the URL segment (`/uz`, `/ru`, `/en`),
 * passed in by the `[locale]` layout. Switching language navigates to the
 * same path under the new locale prefix, so the choice lives in the URL and
 * is shareable / SEO-friendly.
 */
export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (next: Locale) => {
      if (!LOCALES.includes(next) || next === locale) return;

      // Replace the first path segment (the locale) and keep the rest.
      const segments = pathname.split("/");
      segments[1] = next;
      const nextPath = segments.join("/") || `/${next}`;

      router.push(nextPath);
      if (typeof document !== "undefined") {
        document.documentElement.lang = next;
      }
    },
    [locale, pathname, router],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      locales: LOCALES,
      setLocale,
      t: CONTENT[locale],
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
