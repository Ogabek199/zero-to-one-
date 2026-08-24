"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Timeline() {
  const { t } = useLanguage();

  return (
    <section id="shartlar" className="bg-white">
      <Container className="py-16 sm:py-24">
        <div className="flex flex-col">
          {t.timeline.map((item, i) => (
            <Reveal key={item.index} variant="fade-up" delay={i * 100} duration={750}>
              <div
                className={`group flex items-center gap-14 border-b border-brand-black pt-3 pb-6 transition-all duration-300 hover:border-[#DE2A41] sm:gap-12 sm:pb-6 ${
                  i === 0 ? "border-t" : ""
                }`}
              >
                <span className="display inline-block w-16 shrink-0 sm:w-auto text-[40px] leading-[90%] tracking-[-4%] text-[#DE2A41] transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1 sm:text-6xl">
                  {item.index}
                </span>
                <div className="w-full transition-transform duration-300 group-hover:translate-x-1 md:ml-auto md:w-1/2">
                  <h3 className="display text-[20px] leading-[95%] tracking-[-4%] text-brand-black transition-colors duration-300 group-hover:text-[#DE2A41] sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-sans font-normal text-sm leading-[110%] tracking-[-1%] text-[#666666] transition-colors duration-300 group-hover:text-brand-black sm:text-base">
                    {item.meta}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
