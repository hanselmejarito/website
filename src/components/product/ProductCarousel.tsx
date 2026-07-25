"use client";

import { useRef } from "react";
import type { Product } from "@/types/store";
import { ProductCard } from "./ProductCard";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
};

export function ProductCarousel({ title, subtitle, products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-y border-chrome-gray-200/70 bg-canvas-white/55 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
          <div className="max-w-xl">
            <h2 className="font-display text-display-md text-ink text-balance">{title}</h2>
            {subtitle && (
              <p className="mt-3 text-base leading-relaxed text-ink-muted">{subtitle}</p>
            )}
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous products"
              className="flex h-11 w-11 items-center justify-center border border-chrome-gray-200 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next products"
              className="flex h-11 w-11 items-center justify-center border border-chrome-gray-200 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas-white"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-5 flex gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:gap-6 sm:px-8 lg:-mx-12 lg:px-12"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[260px] flex-shrink-0 sm:w-[300px] lg:w-[320px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
