"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/types/store";
import { formatPrice } from "@/lib/store";
import { useCart } from "@/components/cart/CartProvider";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, isLoading } = useCart();

  const images = product.images.length > 0 ? product.images : product.featuredImage ? [product.featuredImage] : [];

  const handleAddToCart = async () => {
    if (selectedVariant) {
      await addItem(selectedVariant.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative aspect-square bg-chrome-gray-100 mb-4">
            {images[selectedImage] && (
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].altText ?? product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 flex-shrink-0 border-2 ${
                    i === selectedImage ? "border-chrome-black" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText ?? ""}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl lg:text-3xl font-black uppercase tracking-tight mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl font-semibold">
              {formatPrice(selectedVariant?.price ?? product.priceRange.minVariantPrice)}
            </span>
            {selectedVariant?.compareAtPrice &&
              parseFloat(selectedVariant.compareAtPrice.amount) >
                parseFloat(selectedVariant.price.amount) && (
                <span className="text-chrome-gray-400 line-through">
                  {formatPrice(selectedVariant.compareAtPrice)}
                </span>
              )}
          </div>

          {product.options.map((option) => (
            <div key={option.id} className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-3">
                {option.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const variant = product.variants.find((v) =>
                    v.selectedOptions.some(
                      (o) => o.name === option.name && o.value === value
                    )
                  );
                  const isSelected = selectedVariant?.selectedOptions.some(
                    (o) => o.name === option.name && o.value === value
                  );

                  return (
                    <button
                      key={value}
                      onClick={() => variant && setSelectedVariant(variant)}
                      disabled={!variant?.availableForSale}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        isSelected
                          ? "border-chrome-black bg-chrome-black text-chrome-white"
                          : "border-chrome-gray-200 hover:border-chrome-black"
                      } ${!variant?.availableForSale ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale || isLoading}
            className="w-full bg-chrome-black text-chrome-white py-4 text-sm font-bold uppercase tracking-wider hover:bg-chrome-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
          </button>

          {product.descriptionHtml && (
            <div
              className="mt-8 prose prose-sm max-w-none text-chrome-gray-600"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
