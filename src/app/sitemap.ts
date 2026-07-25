import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/store";
import { collectionMeta } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getProducts().map((product) => ({
    url: `${siteUrl}/products/${product.handle}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const collections = Object.keys(collectionMeta).map((handle) => ({
    url: `${siteUrl}/collections/${handle}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    ...collections,
    ...products,
  ];
}
