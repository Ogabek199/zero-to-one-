"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white">
      <Container className="py-16 sm:py-24">
        <div className="md:ml-auto md:w-3/5 text-right">
          <h2 className="display ml-auto max-w-md text-2xl text-brand-black sm:text-3xl">
            {t.footer.tagline}
          </h2>

          <nav className="mt-12 flex flex-col items-end gap-2">
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

          <div className="mt-14 flex justify-end">
            <Logo variant="dark" size="lg" />
          </div>
        </div>
      </Container>

      <div className="bg-brand-black">
        <Container className="py-5">
          <p className="text-center font-sans leading-[110%] tracking-[-4%] text-[16px] text-[#FFFFFF]">
            {t.footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}
