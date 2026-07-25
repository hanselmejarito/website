"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/store";
import { formatPrice } from "@/lib/store";
import { useCart } from "@/components/cart/CartProvider";

export function ProductCard({
  product,
  className = "",
  featured = false,
  index,
}: {
  product: Product;
  className?: string;
  featured?: boolean;
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const primaryImage = product.featuredImage ?? product.images[0];
  const secondaryImage = product.images[1];
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange.minVariantPrice;
  const hasCompareAt = parseFloat(compareAt.amount) > parseFloat(price.amount);
  const colorCount =
    product.options.find((o) => o.name === "Color")?.values.length ?? 0;
  // Shorts promo art: contain + slight scale so it fills the card evenly
  const isShorts = product.tags.includes("shorts");
  const fitClass = isShorts
    ? "object-contain object-center scale-[1.12]"
    : "object-cover";

  const sizes = product.options.find((o) => o.name === "Size")?.values ?? [];

  const handleQuickAdd = async (e: React.MouseEvent, size?: string) => {
    e.preventDefault();
    e.stopPropagation();
    const variant = product.variants.find(
      (v) =>
        v.availableForSale &&
        (!size || v.selectedOptions.some((o) => o.name === "Size" && o.value === size))
    );
    if (variant) {
      await addItem(variant.id);
    }
  };

  return (
    <div className={`group w-full min-w-0 ${className}`}>
      <Link
        href={`/products/${product.handle}`}
        className="block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`relative mb-3 overflow-hidden bg-canvas-deep sm:mb-4 ${
            featured ? "aspect-[4/5]" : "aspect-square sm:aspect-[4/5]"
          }`}
        >
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText ?? product.title}
              fill
              className={`${fitClass} transition-all duration-700 ease-outExpo ${
                hovered && secondaryImage ? "opacity-0" : "opacity-100"
              } ${
                isShorts
                  ? ""
                  : hovered && secondaryImage
                    ? "scale-105"
                    : "scale-100"
              }`}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 220px"
              quality={90}
            />
          )}
          {secondaryImage && (
            <Image
              src={secondaryImage.url}
              alt={secondaryImage.altText ?? product.title}
              fill
              className={`${fitClass} transition-opacity duration-700 ease-outExpo ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 220px"
              quality={90}
            />
          )}

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />

          {typeof index === "number" && (
            <span className="absolute left-3 top-3 z-10 font-display text-xs tracking-[0.14em] text-ink/40 sm:left-4 sm:top-4">
              {String(index).padStart(2, "0")}
            </span>
          )}

          {product.availableForSale && sizes.length > 0 && (
            <div className="absolute inset-x-3 bottom-3 z-10 hidden translate-y-2 bg-ink/95 opacity-0 backdrop-blur-sm transition-all duration-500 ease-outExpo group-hover:translate-y-0 group-hover:opacity-100 sm:inset-x-4 sm:bottom-4 sm:block">
              <p className="pt-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-canvas-white/60">
                Quick add
              </p>
              <div className="flex items-center justify-center gap-1 px-2 pb-2.5 pt-1.5">
                {sizes.map((size) => {
                  const available = product.variants.some(
                    (v) =>
                      v.availableForSale &&
                      v.selectedOptions.some((o) => o.name === "Size" && o.value === size)
                  );
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={(e) => handleQuickAdd(e, size)}
                      disabled={!available}
                      className="min-w-9 py-1.5 text-xs font-semibold text-canvas-white transition-colors hover:bg-signal disabled:cursor-not-allowed disabled:text-canvas-white/30"
                      aria-label={`Quick add size ${size}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {product.availableForSale && sizes.length === 0 && (
            <button
              type="button"
              onClick={(e) => handleQuickAdd(e)}
              className="absolute inset-x-3 bottom-3 z-10 hidden translate-y-2 bg-ink py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-canvas-white opacity-0 transition-all duration-500 ease-outExpo group-hover:translate-y-0 group-hover:opacity-100 hover:bg-signal sm:inset-x-4 sm:bottom-4 sm:block"
            >
              Quick add
            </button>
          )}
          {!product.availableForSale ? (
            <span className="absolute right-3 top-3 z-10 bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-canvas-white">
              Sold out
            </span>
          ) : hasCompareAt ? (
            <span className="absolute right-3 top-3 z-10 bg-signal px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-canvas-white">
              Sale
            </span>
          ) : product.tags.includes("new") ? (
            <span className="absolute right-3 top-3 z-10 bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-canvas-white">
              New
            </span>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-signal sm:text-[15px] text-balance">
            {product.title}
          </h3>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {hasCompareAt && (
              <span className="text-xs text-ink-faint line-through sm:text-sm">
                {formatPrice(compareAt)}
              </span>
            )}
            <span className="text-sm font-medium text-ink">
              {formatPrice(price)}
            </span>
            {colorCount > 1 && (
              <span className="text-xs text-ink-faint">{colorCount} colors</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
