"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";

export function Timeline() {
  const { t } = useLanguage();

  return (
    <section id="shartlar" className="bg-white">
      <Container className="py-16 sm:py-24">
        <div className="flex flex-col">
          {t.timeline.map((item) => (
            <div
              key={item.index}
              className="flex items-center gap-6 border-b border-brand-black py-6 first:border-t sm:gap-12"
            >
              <span className="display shrink-0 text-4xl text-brand-red sm:text-6xl">
                {item.index}
              </span>
              <div className="w-full md:ml-auto md:w-1/2">
                <h3 className="display text-xl text-brand-black sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 font-sans text-sm text-brand-muted sm:text-base">
                  {item.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
