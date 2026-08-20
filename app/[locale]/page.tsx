import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { Timeline } from "@/components/sections/Timeline";
import { NotACourse } from "@/components/sections/NotACourse";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <Stats />
        <Features />
        <Timeline />
        <NotACourse />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
