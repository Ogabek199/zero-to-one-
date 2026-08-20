"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
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
        className={`display text-xl sm:text-3xl ${
          isRed ? "text-[#DE2A41]" : "text-white"
        }`}
      >
        {title}
      </h3>
      <div className="mt-8 flex flex-col gap-10 sm:mt-7 sm:gap-7">
        {items.map((item, i) => (
          <Reveal key={item.index} delay={i * 70}>
          <div>
            <span
              className={`font-sans text-[16px] leading-[90%] font-bold tracking-[-4%] ${
              isRed ? "text-[#E5E5E5]" : "text-[#DE2A41]"
              }`}
            >
              {item.index}
            </span>
            <p
              className={`mt-2 max-w-xl font-sans text-2xl leading-[125%] tracking-[-2%] md:text-2xl sm:text-xl sm:leading-[110%] ${
                isRed ? "text-[#DE2A41]" : "text-[#E5E5E5]"
              }`}
            >
              {item.body}
            </p>
          </div>
          </Reveal>
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
        <div className="md:ml-auto md:w-1/2 text-left">
          <Reveal>
          <h2 className="display lg:text-[6xl] md:text-[64px] max-w-md leading-[90%] tracking-[-4%] text-white text-[32px] sm:text-[32px]">
            {n.heading}
          </h2>
          </Reveal>

          <div className="mt-16 flex flex-col gap-16 sm:mt-14 sm:gap-14">
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

          <Reveal>
          <p className="w-full max-w-[510px] mt-16 font-sans text-[24px] sm:text-[32px] font-bold uppercase tracking-[-4%] leading-[95%] sm:leading-[90%] text-white">
            {n.verdictLead}
            <span className="text-[#DE2A41]">{n.verdictAccent}</span>
            {n.verdictTail}
          </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
