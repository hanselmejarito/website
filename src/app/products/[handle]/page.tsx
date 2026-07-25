import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/store";
import { siteUrl, siteName } from "@/lib/site";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCarousel } from "@/components/product/ProductCarousel";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: handle.replace(/-/g, " ") };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${siteUrl}/products/${product.handle}`,
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : undefined,
    },
  };
}

export function generateStaticParams() {
  return getProducts().map((product) => ({ handle: product.handle }));
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProduct(handle);

  if (!product) {
    notFound();
  }

  const related = getProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) => `${siteUrl}${img.url}`),
    url: `${siteUrl}/products/${product.handle}`,
    brand: { "@type": "Brand", name: siteName },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      highPrice: product.priceRange.maxVariantPrice.amount,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
      {related.length > 0 && (
        <ProductCarousel
          title="You may also wear"
          subtitle="More from the latest Honest Mistake drop."
          products={related}
        />
      )}
    </>
  );
}
