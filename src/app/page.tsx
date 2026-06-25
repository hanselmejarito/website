import { HeroSection } from "@/components/home/HeroSection";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { EditorialSection } from "@/components/home/EditorialSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LifestyleSection } from "@/components/home/LifestyleSection";
import { getHomepageProducts } from "@/lib/store";

export default function HomePage() {
  const products = getHomepageProducts();

  return (
    <>
      <HeroSection />
      <CategoryTiles />
      <ProductCarousel
        title="Most Carried"
        subtitle="Proven favorites, carried daily."
        products={products}
      />
      <EditorialSection />
      <TestimonialsSection />
      <LifestyleSection />
      <ProductCarousel
        title="We've got your back"
        subtitle="From the commute to the weekend."
        products={products.slice(0, 8)}
      />
    </>
  );
}
