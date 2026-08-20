"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useApply } from "@/context/ApplyContext";
import { Button } from "@/components/ui/Button";
import { StepBlock } from "@/components/ui/StepBlock";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  const { t } = useLanguage();
  const { openApply } = useApply();

  return (
    <section id="ariza" className="relative bg-[#DE2A41]">
      <Container className="relative py-16 sm:py-24">
        <div className="relative min-h-[200px] sm:min-h-[400px]">
          {/* Mirrored stepped block */}
          <div className="absolute inset-0 block">
            <StepBlock src="/zero_to_one2.jpg" flipX flipY />
          </div>

          <Reveal className="relative z-10">
            <h2 className="display max-w-xl whitespace-pre-line text-[7vw] leading-[1.02] text-white sm:whitespace-normal sm:text-5xl md:text-6xl lg:text-[68px]">
              <span className="box-decoration-clone bg-[#DE2A41] px-2 py-0.5">
                {t.cta.titleTop}
              </span>
            </h2>

            <div className="mt-12 flex justify-end sm:mt-24">
              <h3 className="display mt-0 max-w-[550px] whitespace-pre-line text-right text-[7vw] leading-[1.02] text-white sm:mt-12 sm:whitespace-normal sm:text-4xl md:text-5xl lg:text-[58px]">
                <span className="box-decoration-clone bg-[#DE2A41] px-2 py-0.5">
                  {t.cta.titleBottom}
                </span>
              </h3>
            </div>
          </Reveal>
        </div>

        {/* Same single-column treatment as the hero: copy and CTA share
            one set of edges. */}
        <Reveal delay={140} className="relative z-10 mt-10 flex justify-start sm:justify-end">
          <div className="w-full md:w-1/2 md:ml-auto">
            <p className="max-w-[510px] font-sans text-[20px] leading-[115%] tracking-[-2%] text-white sm:text-[32px] sm:leading-[90%] sm:tracking-[-4%] sm:text-left">
              {t.cta.body}
            </p>

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
              {t.cta.button}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
