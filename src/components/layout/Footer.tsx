"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white">
      <Container className="py-16 sm:py-24">
        <div className="md:ml-auto md:w-1/2 text-left">
          <h2 className="display max-w-md text-3xl text-brand-black sm:text-4xl">
            {t.footer.tagline}
          </h2>

          <nav className="mt-12 flex flex-col items-start gap-2">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[15px] text-brand-black/80 transition-colors hover:text-brand-black"
            >
              {t.footer.telegram}
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[15px] text-brand-black/80 transition-colors hover:text-brand-black"
            >
              {t.footer.instagram}
            </a>
          </nav>

          <div className="mt-14 flex justify-start">
            <Logo variant="dark" size="xl" />
          </div>
        </div>
      </Container>

      <div className="bg-brand-black">
        <Container className="py-5">
          <p className="text-center font-sans text-[13px] text-white/70">
            {t.footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}
