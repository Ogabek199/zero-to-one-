"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  const { t } = useLanguage();

  return (
    <section id="dastur" className="bg-white" aria-label="Dastur haqida raqamlar">
      <Container className="py-16 sm:py-24">
        <h2 className="sr-only">Dastur ko'rsatkichlari va raqamlar</h2>
        {/* Right-aligned column on desktop, full width on mobile */}
        <div className="md:ml-auto md:w-1/2">
          <dl className="flex flex-col">
            {t.stats.map((s, i) => (
              <Reveal key={s.value} variant="fade-up" delay={i * 90} duration={750}>
                <div
                  className={`group border-b border-brand-black transition-all duration-300 hover:border-[#DE2A41] ${
                    i === 0 ? "" : "pt-8 sm:pt-4"
                  }`}
                >
                  <dt className="display text-[32px] leading-[90%] tracking-[-4%] text-brand-black transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#DE2A41] sm:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 mb-8 sm:mb-4 font-normal font-sans text-xl sm:text-2xl leading-[110%] tracking-[-2%] text-[#666666] transition-colors duration-300 group-hover:text-brand-black">
                    {s.label}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
