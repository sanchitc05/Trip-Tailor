import { usePageTitle } from "@/hooks/usePageTitle";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import DestinationsPreview from "@/components/DestinationsPreview";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import FAQSection from "@/components/FAQSection";

export default function HomePage() {
  usePageTitle("Home");

  return (
    <div className="space-y-8 py-4 sm:space-y-12 sm:py-6">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <DestinationsPreview />
      <ReviewsCarousel />
      <FAQSection />
    </div>
  );
}
