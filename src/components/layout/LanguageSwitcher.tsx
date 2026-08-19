"use client";

import { useLanguage } from "@/context/LanguageContext";
import { clsx } from "@/lib/clsx";
import type { Locale } from "@/data/content";

const LABELS: Record<Locale, string> = {
  ru: "RU",
  uz: "UZ",
  en: "EN",
};

interface LanguageSwitcherProps {
  /** Colour scheme relative to the surface it sits on. */
  tone?: "onDark" | "onRed";
  className?: string;
}

export function LanguageSwitcher({
  tone = "onDark",
  className,
}: LanguageSwitcherProps) {
  const { locale, locales, setLocale } = useLanguage();

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-1 border p-0.5",
        tone === "onDark"
          ? "border-white bg-white"
          : "border-white bg-white",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={clsx(
              "px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors",
              active
                ? "bg-black text-white"
                : "bg-white text-black",
            )}
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
