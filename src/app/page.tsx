import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CategorySection } from "@/components/home/CategorySection";
import { EditorialSection } from "@/components/home/EditorialSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <CategorySection/>
        <FeaturedProducts/>
        <EditorialSection/>
        <BenefitsSection/>
      </main>
    </>
  );
}
