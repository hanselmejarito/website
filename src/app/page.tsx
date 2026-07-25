import { HeroSection } from "@/components/home/HeroSection";
import { DropSection } from "@/components/home/DropSection";
import { FeaturedSpotlight } from "@/components/home/FeaturedSpotlight";
import { EditorialSection } from "@/components/home/EditorialSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Reveal } from "@/components/ui/Reveal";
import { getHomepageProducts } from "@/lib/store";

export default function HomePage() {
  const products = getHomepageProducts();

  return (
    <>
      <HeroSection />
      <DropSection products={products} />
      <Reveal>
        <FeaturedSpotlight />
      </Reveal>
      <Reveal>
        <EditorialSection />
      </Reveal>
      <TrustStrip />
    </>
  );
}
