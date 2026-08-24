"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Features() {
  const { t } = useLanguage();

  return (
    <section className="bg-brand-gray" aria-label="Afzalliklar / Preimushchestva">
      <Container className="py-16 sm:py-24">
        <h2 className="sr-only">Afzalliklar va imkoniyatlar</h2>
        <div className="md:ml-auto md:w-1/2">
          <div className="flex flex-col gap-10">
            {t.features.map((f, i) => (
              <Reveal key={f.index} variant="fade-up" delay={i * 100} duration={750}>
                <article className="group relative border-b border-brand-black pb-8 pt-2 transition-all duration-300 hover:border-[#DE2A41]">
                  <span className="inline-block font-sans text-[16px] font-bold leading-[90%] tracking-[-4%] text-[#DE2A41] transition-transform duration-300 group-hover:translate-x-1">
                    {f.index}
                  </span>
                  <h3 className="display mt-3 mb-2 text-[32px] leading-[90%] tracking-[-4%] text-brand-black transition-colors duration-300 group-hover:text-brand-black sm:text-3xl">
                    {f.title}
                  </h3>
                  <p className="font-sans text-[18px] sm:text-[22px] font-normal leading-[125%] sm:leading-[110%] tracking-[-1%] text-[#666666] transition-colors duration-300 group-hover:text-[#222222]">
                    {f.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
