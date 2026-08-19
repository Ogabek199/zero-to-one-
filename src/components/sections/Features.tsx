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
                <span className="font-sans text-xs font-bold tracking-wider text-brand-red">
                  {f.index}
                </span>
                <h3 className="display mt-3 text-2xl text-brand-black sm:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-brand-muted">
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
