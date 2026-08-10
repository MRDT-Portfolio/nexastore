import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CategorySection } from "@/components/home/CategorySection";
import { EditorialSection } from "@/components/home/EditorialSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/NavBar";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main>
        <Hero />
        <CategorySection/>
        <FeaturedProducts/>
        <EditorialSection/>
        <BenefitsSection/>
      </main>
      <Footer/>
    </>
  );
}
