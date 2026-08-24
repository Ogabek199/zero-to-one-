"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useLanguage();

  // The drawer is rendered through a portal straight into <body>. It used to
  // live inside the sticky <header>, and Safari/WebKit treats a `position:
  // sticky` ancestor as the containing block for `position: fixed` children —
  // so the drawer was pushed down by the height of the header instead of
  // covering the viewport, leaving the header poking out above it on mobile.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Lock body scroll while the drawer is open. `overflow: hidden` alone does
  // not hold on iOS Safari, so pin the body and restore the scroll offset.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // The scroll lock restores the pre-open scroll offset on unlock, which would
  // otherwise cancel a hash jump. So close first, then scroll once unlocked.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      window.setTimeout(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    });
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ height: "100dvh" }}
      aria-hidden={!open}
    >
      <div className="flex h-full flex-col bg-[#DE2A41]">
        <div className="flex items-center justify-between bg-brand-black px-5 py-3.5 pt-[max(0.875rem,calc(0.875rem+env(safe-area-inset-top,0px)))]">
          <Logo variant="light" size="md" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-white"
          >
            <svg
              width="52"
              height="40"
              viewBox="0 0 52 40"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M11.8613 5.8584L40.1456 34.1427"
                stroke="currentColor"
                strokeLinecap="round"
              />
              <path
                d="M11.8535 34.1426L40.1378 5.85831"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-8 px-5 pt-40">
          <a
            href="#dastur"
            onClick={(e) => goTo(e, "dastur")}
            className="display text-4xl text-white"
          >
            {t.menu.program}
          </a>
          <a
            href="#shartlar"
            onClick={(e) => goTo(e, "shartlar")}
            className="display text-4xl text-white"
          >
            {t.menu.terms}
          </a>
        </nav>

        <div className="flex flex-col items-start gap-24 px-5 pb-12">
          <LanguageSwitcher tone="onRed" />
          <span className="font-sans text-sm text-white/80">
            {t.footer.rights}
          </span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
