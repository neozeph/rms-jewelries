import HeroSection from "../components/sections/HeroSection";
import IntroSection from "../components/sections/IntroSection";
import FeaturedCollectionsSection from "../components/sections/FeaturedCollectionsSection";
import FeaturedJewelrySection from "../components/sections/FeaturedJewelrySection";
import ApproachSection from "../components/sections/ApproachSection";
import FinalCtaSection from "../components/sections/FinalCtaSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function HomePage() {
  useDocumentTitle("RMS Jewelries — Custom Jewelry Portfolio");

  return (
    <main>
      <HeroSection />
      <IntroSection />
      <FeaturedCollectionsSection />
      <FeaturedJewelrySection />
      <ApproachSection />
      <FinalCtaSection />
    </main>
  );
}
