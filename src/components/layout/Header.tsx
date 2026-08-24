"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/context/LanguageContext";
import { useApply } from "@/context/ApplyContext";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { t } = useLanguage();
  const { isOpen: applyOpen } = useApply();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Eng tepada doim ko'rinadi
      if (currentScrollY <= 0) {
        setShowHeader(true);
      }
      // Tepaga scroll qilinsa — ko'rsat
      else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }
      // Pastga scroll qilinsa — yashir
      else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full bg-brand-black transition-transform duration-300 pt-[env(safe-area-inset-top,0px)] before:absolute before:bottom-full before:left-0 before:right-0 before:h-[100vh] before:bg-brand-black ${
        showHeader || applyOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Container className="flex items-center justify-between py-3.5">
        <a href="#top" aria-label="Zero to One — home" className="flex items-center transition-opacity duration-200 hover:opacity-80 active:opacity-60">
          <Logo variant="light" size="md" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 lg:flex">
          <a
            href="#dastur"
            className="font-sans text-[15px] text-white/80 transition-all duration-200 hover:text-white hover:translate-y-[-1px]"
          >
            {t.nav.program}
          </a>

          <a
            href="#shartlar"
            className="font-sans text-[15px] text-white/80 transition-all duration-200 hover:text-white hover:translate-y-[-1px]"
          >
            {t.nav.terms}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <LanguageSwitcher tone="onDark" />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="p-1.5 text-white lg:hidden"
          >
            <svg
              width="52"
              height="40"
              viewBox="0 0 52 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12H46"
                stroke="white"
                strokeLinecap="round"
              />
              <path
                d="M6 28H46"
                stroke="white"
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