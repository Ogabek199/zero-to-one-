"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useApply } from "@/context/ApplyContext";
import { Button } from "@/components/ui/Button";
import { StepBlock } from "@/components/ui/StepBlock";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  const { t } = useLanguage();
  const { openApply } = useApply();

  return (
    <section id="top" className="relative bg-[#DE2A41]">
      <Container className="relative pb-14 pt-10 sm:pb-20 sm:pt-16">
        {/* White stepped background graphic (swap /public/zero_to_one.svg) */}
        <div className="relative min-h-[210px] sm:min-h-[440px] lg:min-h-[520px]">
          <div className="absolute inset-0 block">
            <StepBlock src="/zero_to_one1.jpg" />
          </div>

          {/* Headlines sit on crimson backing boxes so they stay readable
              wherever they overlap the white shape (poster style). */}
          <Reveal className="relative z-10 max-w-4xl">
            <h1 className="display whitespace-pre-line text-[7vw] leading-[1.02] text-white sm:whitespace-normal sm:text-6xl md:text-7xl lg:text-[86px]">
              <span className="box-decoration-clone bg-[#DE2A41] px-2 py-0.5">
                {t.hero.titleTop}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120} className="relative z-10 mt-12 flex justify-start sm:mt-28 sm:justify-end lg:mt-40">
            <h2 className="display mt-0 max-w-[764px] whitespace-pre-line text-left text-[7vw] leading-[1.02] text-white sm:mt-12 sm:whitespace-normal sm:text-right sm:text-5xl md:text-6xl lg:text-[68px]">
              <span className="box-decoration-clone bg-[#DE2A41] px-2 py-0.5">
                {t.hero.titleBottom}
              </span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={240} className="relative z-10 mt-10 sm:mt-14 md:w-1/2 md:ml-auto">
          <div className="flex justify-start">
            <p className="w-full max-w-[510px] font-sans text-[20px] leading-[115%] tracking-[-2%] text-[#FFFFFF] sm:text-[32px] sm:leading-[90%] sm:tracking-[-4%] sm:text-start">
              {t.hero.body}
            </p>
          </div>

          <Button
            variant="light"
            fullWidth
            className="mt-6"
            href="#ariza"
            onClick={(e) => {
              e.preventDefault();
              openApply();
            }}
          >
            {t.hero.cta}
          </Button>

          <div className="mt-4 flex justify-start sm:justify-end">
            <p className="w-full font-sans text-[14px] tracking-[-2%] leading-[110%] text-[#FFFFFF] sm:text-[16px] sm:text-center">
              {t.hero.note}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
