"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useApply } from "@/context/ApplyContext";
import { Button } from "@/components/ui/Button";
import { StepBlock } from "@/components/ui/StepBlock";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const { t } = useLanguage();
  const { openApply } = useApply();

  return (
    <section id="top" className="relative bg-brand-red">
      <Container className="relative pb-14 pt-10 sm:pb-20 sm:pt-16">
        {/* White stepped background graphic (swap /public/zero_to_one.svg) */}
        <div className="relative min-h-[340px] sm:min-h-[440px] lg:min-h-[520px]">
          <div className="absolute inset-0 block">
            <StepBlock src="/zero_to_one1.jpg" />
          </div>

          {/* Headlines sit on crimson backing boxes so they stay readable
              wherever they overlap the white shape (poster style). */}
          <div className="relative z-10 max-w-4xl">
            <h1 className="display text-[12vw] leading-[1.02] text-white sm:text-6xl md:text-7xl lg:text-[86px]">
              <span className="box-decoration-clone bg-brand-red px-2 py-0.5">
                {t.hero.titleTop}
              </span>
            </h1>
          </div>

          <div className="relative z-10 mt-16 flex justify-end sm:mt-28 lg:mt-40">
            <h2 className="display max-w-[764px] mt-12 text-right leading-[1.02] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
              <span className="box-decoration-clone bg-brand-red px-2 py-0.5">
                {t.hero.titleBottom}
              </span>
            </h2>
          </div>
        </div>

        {/* Supporting copy + CTA, right aligned like the design */}
        <div className="relative z-10 mt-10 flex flex-col items-start gap-6 sm:mt-14 sm:items-end">
          <p className="max-w-md font-sans text-lg leading-snug text-white sm:text-right">
            {t.hero.body}
          </p>

          <div className="w-full max-w-md">
            <Button
              variant="light"
              fullWidth
              href="#ariza"
              onClick={(e) => {
                e.preventDefault();
                openApply();
              }}
            >
              {t.hero.cta}
            </Button>
            <p className="mt-4 text-center font-sans text-sm text-white/85">
              {t.hero.note}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
