"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
 * Where the scroll offset is parked across a language switch.
 *
 * Switching locale changes the `[locale]` segment, which re-renders the whole
 * tree (and on some navigations reloads the document outright). `scroll: false`
 * covers the soft-navigation case; this key covers the rest, so the visitor
 * stays exactly where they were reading instead of being thrown back up to the
 * header.
 */
const SCROLL_KEY = "zto:lang-switch-scroll";

/**
 * The active locale comes from the URL segment (`/uz`, `/ru`, `/en`), passed
 * in by the `[locale]` layout. Switching language navigates to the same path
 * under the new locale prefix, so the choice lives in the URL and is
 * shareable / SEO-friendly.
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
      // The hash is deliberately dropped: re-applying it would scroll the
      // page to that anchor, which is exactly what we're trying to avoid.
      const segments = pathname.split("/");
      segments[1] = next;
      const nextPath = segments.join("/") || `/${next}`;

      if (typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
        } catch {
          // Private mode / storage disabled — `scroll: false` still holds.
        }
      }

      // `scroll: false` keeps Next.js from resetting the window to the top on
      // navigation.
      router.push(nextPath, { scroll: false });

      if (typeof document !== "undefined") {
        document.documentElement.lang = next;
      }
    },
    [locale, pathname, router],
  );

  // Restore the parked offset after the new locale has rendered. Runs on every
  // locale change (and after a full reload, if the browser took that path).
  useEffect(() => {
    if (typeof window === "undefined") return;

    let saved: string | null = null;
    try {
      saved = window.sessionStorage.getItem(SCROLL_KEY);
      if (saved !== null) window.sessionStorage.removeItem(SCROLL_KEY);
    } catch {
      return;
    }
    if (saved === null) return;

    const y = Number(saved);
    if (!Number.isFinite(y) || y <= 0) return;

    // Two passes: once synchronously, once after the browser has laid the new
    // translation out (line counts differ between languages, so the document
    // height can change slightly).
    window.scrollTo(0, y);
    const raf = window.requestAnimationFrame(() => window.scrollTo(0, y));
    return () => window.cancelAnimationFrame(raf);
  }, [locale]);

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
