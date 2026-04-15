import HeroCarousel from "@/components/HeroCarousel";
import QuickEntry from "@/components/QuickEntry";
import BentoGrid from "@/components/BentoGrid";
import ActivitiesSection from "@/components/ActivitiesSection";
import NewsSection from "@/components/NewsSection";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <QuickEntry />
      <BentoGrid />
      <ActivitiesSection />
      <NewsSection />
    </>
  );
}
