"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useApply } from "@/context/ApplyContext";
import { Button } from "@/components/ui/Button";
import { StepBlock } from "@/components/ui/StepBlock";
import { Container } from "@/components/ui/Container";

export function CTA() {
  const { t } = useLanguage();
  const { openApply } = useApply();

  return (
    <section id="ariza" className="relative bg-brand-red">
      <Container className="relative py-16 sm:py-24">
        <div className="relative min-h-[300px] sm:min-h-[400px]">
          {/* Mirrored stepped block */}
          <div className="absolute inset-0 hidden sm:block">
            <StepBlock flipX flipY />
          </div>

          <div className="relative z-10">
            <h2 className="display max-w-xl text-[11vw] leading-[1.02] text-white sm:text-5xl md:text-6xl lg:text-[68px]">
              <span className="box-decoration-clone bg-brand-red px-2 py-0.5">
                {t.cta.titleTop}
              </span>
            </h2>

            <div className="mt-16 flex justify-end sm:mt-24">
              <h3 className="display max-w-lg text-right text-[10vw] leading-[1.02] text-white sm:text-4xl md:text-5xl lg:text-[58px]">
                <span className="box-decoration-clone bg-brand-red px-2 py-0.5">
                  {t.cta.titleBottom}
                </span>
              </h3>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-10 flex flex-col items-start gap-6 sm:items-end">
          <p className="max-w-md font-sans text-lg leading-snug text-white sm:text-right">
            {t.cta.body}
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
              {t.cta.button}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
