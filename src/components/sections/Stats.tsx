"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";

export function Stats() {
  const { t } = useLanguage();

  return (
    <section id="dastur" className="bg-white">
      <Container className="py-16 sm:py-24">
        {/* Right-aligned column on desktop, full width on mobile */}
        <div className="md:ml-auto md:w-1/2">
          <dl className="flex flex-col">
            {t.stats.map((s) => (
              <div
                key={s.value}
                className="border-b border-brand-black py-5 first:pt-0"
              >
                <dt className="display text-2xl text-brand-black sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 font-sans text-base text-brand-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
