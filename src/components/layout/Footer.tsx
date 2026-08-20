"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white">
      <Container className="py-16 sm:py-24">
        <div className="md:ml-auto md:w-1/2 text-left">
          <Reveal>
          <h2 className="display max-w-lg text-[32px] leading-[90%] tracking-[-4%] text-brand-black sm:text-4xl">
            {t.footer.tagline}
          </h2>
          </Reveal>

          <Reveal delay={100}>
          <nav className="mt-12 flex flex-col items-start gap-2">
            <a
              href="https://instagram.com/zerotoone.uz"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[16px] text-[#000000] transition-colors hover:text-brand-black"
            >
              {t.footer.instagram}
            </a>
            <a
              href="http://facebook.com/@zerotoone.uz"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[16px] text-[#000000] transition-colors hover:text-brand-black"
            >
              {t.footer.facebook}
            </a>
            <a
              href="http://linkedin.com/company/zerotooneuz"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[16px] text-[#000000] transition-colors hover:text-brand-black"
            >
              {t.footer.linkedin}
            </a>
            <a
              href="https://t.me/@zerotoone_official"
              target="_blank"
              rel="noreferrer"
              className="font-sans text-[16px] text-[#000000] transition-colors hover:text-brand-black"
            >
              {t.footer.telegram}
            </a>
          </nav>
          </Reveal>

          <Reveal delay={180} className="mt-14 w-full">
            {/* The lockup stretches the full width of its column (mobile: gutter-to-gutter, desktop: the right half). */}
            <Logo variant="dark" fluid className="max-w-[86%]" />
          </Reveal>
        </div>
      </Container>

      <div className="bg-brand-black">
        <Container className="py-[32px]">
        <p className="text-left font-sans leading-[110%] tracking-[-4%] text-[16px] text-[#FFFFFF] sm:text-center">
            {t.footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}
