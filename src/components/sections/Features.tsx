"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";

export function Features() {
  const { t } = useLanguage();

  return (
    <section className="bg-brand-gray">
      <Container className="py-16 sm:py-24">
        <div className="md:ml-auto md:w-1/2">
          <div className="flex flex-col gap-10">
            {t.features.map((f) => (
              <article
                key={f.index}
                className="border-b border-brand-black pb-8"
              >
                <span className="font-sans text-[16px] font-bold leading-[90%] tracking-[-4%] text-brand-red">
                  {f.index}
                </span>
                <h3 className="display mt-3 mb-2 font-bold text-[32px] leading-[90%] tracking-[-4%] text-brand-black sm:text-3xl">
                  {f.title}
                </h3>
                  <p className="font-sans text-[24px] font-medium leading-[110%] tracking-[-2%] text-[#666666]">
                  {f.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
