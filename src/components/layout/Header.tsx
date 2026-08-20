"use client";

import { useState } from "react";

import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { t } = useLanguage();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand-black">
      <Container className="flex items-center justify-between py-3.5">
        <a href="#top" aria-label="Zero to One — home">
          <Logo variant="light" size="md" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 lg:flex">
          <a
            href="#dastur"
            className="font-sans text-[15px] text-white/85 transition-colors hover:text-white"
          >
            {t.nav.program}
          </a>

          <a
            href="#shartlar"
            className="font-sans text-[15px] text-white/85 transition-colors hover:text-white"
          >
            {t.nav.terms}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LanguageSwitcher tone="onDark" />
          </div>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="p-1.5 text-white lg:hidden"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 10H25M5 19H25"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </Container>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}