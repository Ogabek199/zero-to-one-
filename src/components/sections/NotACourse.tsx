"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import type { ChecklistItem } from "@/data/content";

function Checklist({
  title,
  items,
  accent,
}: {
  title: string;
  items: ChecklistItem[];
  accent: "white" | "red";
}) {
  const isRed = accent === "red";

  return (
    <div>
      <h3
        className={`display text-2xl sm:text-3xl ${
          isRed ? "text-brand-red" : "text-white"
        }`}
      >
        {title}
      </h3>
      <div className="mt-7 flex flex-col gap-7">
        {items.map((item) => (
          <div key={item.index}>
            <span
              className={`font-sans text-sm font-bold tracking-wider ${
                isRed ? "text-white" : "text-brand-red"
              }`}
            >
              {item.index}
            </span>
            <p
              className={`mt-2 max-w-xl font-sans text-[18px] leading-relaxed sm:text-[20px] ${
                isRed ? "text-brand-red" : "text-white/85"
              }`}
            >
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotACourse() {
  const { t } = useLanguage();
  const n = t.notACourse;

  return (
    <section className="bg-brand-black">
      <Container className="py-16 sm:py-24">
        <div className="md:ml-auto md:w-[46%] md:pl-8 text-left">
          <h2 className="display text-5xl text-white sm:text-6xl">
            {n.heading}
          </h2>

          <div className="mt-14 flex flex-col gap-14">
            <Checklist
              title={n.forYouTitle}
              items={n.forYou}
              accent="white"
            />
            <Checklist
              title={n.notForYouTitle}
              items={n.notForYou}
              accent="red"
            />
          </div>

          <p className="mt-16 max-w-xl font-sans text-xl font-bold uppercase leading-snug text-white sm:text-2xl">
            {n.verdictLead}
            <span className="text-brand-red">{n.verdictAccent}</span>
            {n.verdictTail}
          </p>
        </div>
      </Container>
    </section>
  );
}
