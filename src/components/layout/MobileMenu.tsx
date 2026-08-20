"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useLanguage();

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 h-screen lg:hidden transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ height: "100dvh" }}
      aria-hidden={!open}
    >
      <div className="flex h-full flex-col bg-brand-red">
        <div className="flex items-center justify-between bg-brand-black px-5 py-3.5">
          <Logo variant="light" size="md" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-white"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M6 6L22 22M22 6L6 22"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-8 px-5 pt-12">
          <a
            href="#dastur"
            onClick={onClose}
            className="display text-4xl text-white"
          >
            {t.menu.program}
          </a>
          <a
            href="#shartlar"
            onClick={onClose}
            className="display text-4xl text-white"
          >
            {t.menu.terms}
          </a>
        </nav>

        <div className="flex flex-col items-start gap-6 px-5 pb-10">
          <LanguageSwitcher tone="onRed" />
          <span className="font-sans text-sm text-white/80">
            {t.footer.rights}
          </span>
        </div>
      </div>
    </div>
  );
}
