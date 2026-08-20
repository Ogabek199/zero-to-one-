"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  const { t } = useLanguage();

  return (
    <section id="dastur" className="bg-white">
      <Container className="py-16 sm:py-24">
        {/* Right-aligned column on desktop, full width on mobile */}
        <div className="md:ml-auto md:w-1/2">
          <dl className="flex flex-col">
            {t.stats.map((s, i) => (
              <Reveal key={s.value} delay={i * 70}>
              <div
                className={`border-b border-brand-black ${
                  i === 0 ? "" : "pt-8 sm:pt-3"
                }`}
              >
                <dt className="display font-bold text-[32px] leading-[90%] tracking-[-4%] text-brand-black sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 mb-8 sm:mb-3 font-medium font-sans text-2xl leading-[110%] tracking-[-2%] text-[#666666]">
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
