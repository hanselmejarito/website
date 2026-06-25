"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/store";
import { formatPrice } from "@/lib/store";
import { useCart } from "@/components/cart/CartProvider";

export function ProductCard({ product, className = "" }: { product: Product; className?: string }) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const primaryImage = product.featuredImage ?? product.images[0];
  const secondaryImage = product.images[1];
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange.minVariantPrice;
  const hasCompareAt = parseFloat(compareAt.amount) > parseFloat(price.amount);
  const colorCount = product.options.find((o) => o.name === "Color")?.values.length ?? 0;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    const variant = product.variants.find((v) => v.availableForSale);
    if (variant) {
      await addItem(variant.id);
    }
  };

  return (
    <div className={`group flex-shrink-0 w-[280px] sm:w-[300px] ${className}`}>
      <Link
        href={`/products/${product.handle}`}
        className="block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-[4/5] bg-chrome-gray-100 overflow-hidden mb-3">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText ?? product.title}
              fill
              className={`object-cover transition-opacity duration-300 ${hovered && secondaryImage ? "opacity-0" : "opacity-100"}`}
              sizes="300px"
            />
          )}
          {secondaryImage && (
            <Image
              src={secondaryImage.url}
              alt={secondaryImage.altText ?? product.title}
              fill
              className={`object-cover transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
              sizes="300px"
            />
          )}
          {product.availableForSale && (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-3 left-3 right-3 bg-chrome-white text-chrome-black py-2.5 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity hover:bg-chrome-gray-100"
            >
              + Quick add
            </button>
          )}
          {!product.availableForSale && (
            <span className="absolute top-3 left-3 bg-chrome-black text-chrome-white text-xs font-bold uppercase px-2 py-1">
              Sold Out
            </span>
          )}
        </div>

        <h3 className="text-sm font-semibold mb-1">{product.title}</h3>

        <div className="flex items-center gap-2 mb-1">
          <div className="flex text-chrome-black">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hasCompareAt && (
            <span className="text-sm text-chrome-gray-400 line-through">
              {formatPrice(compareAt)}
            </span>
          )}
          <span className="text-sm font-medium">{formatPrice(price)}</span>
        </div>

        {colorCount > 1 && (
          <p className="text-xs text-chrome-gray-400 mt-1">+{colorCount - 1} colors</p>
        )}
      </Link>
    </div>
  );
}
