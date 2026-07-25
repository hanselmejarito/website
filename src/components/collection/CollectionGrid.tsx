"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/store";
import { ProductCard } from "@/components/product/ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const tagLabels: Record<string, string> = {
  jersey: "Jerseys",
  shorts: "Shorts",
  new: "New",
  sale: "Sale",
  bestseller: "Best seller",
};

function price(product: Product) {
  return parseFloat(product.priceRange.minVariantPrice.amount);
}

export function CollectionGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  const tags = useMemo(() => {
    const seen = new Set<string>();
    for (const p of products) for (const t of p.tags) seen.add(t);
    return Object.keys(tagLabels).filter((t) => seen.has(t));
  }, [products]);

  const sizes = useMemo(() => {
    const seen = new Set<string>();
    for (const p of products) {
      const sizeOption = p.options.find((o) => o.name === "Size");
      for (const v of sizeOption?.values ?? []) seen.add(v);
    }
    const order = ["XS", "S", "M", "L", "XL", "XXL"];
    return order.filter((s) => seen.has(s));
  }, [products]);

  const visible = useMemo(() => {
    let list = products;
    if (activeTag) list = list.filter((p) => p.tags.includes(activeTag));
    if (activeSize) {
      list = list.filter((p) =>
        p.variants.some(
          (v) =>
            v.availableForSale &&
            v.selectedOptions.some((o) => o.name === "Size" && o.value === activeSize)
        )
      );
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => price(a) - price(b));
    if (sort === "price-desc") list = [...list].sort((a, b) => price(b) - price(a));
    return list;
  }, [products, sort, activeTag, activeSize]);

  const showTagFilters = tags.length > 1;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 border-b border-chrome-gray-200 pb-6 lg:mb-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {showTagFilters && (
            <>
              <button
                onClick={() => setActiveTag(null)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                  activeTag === null
                    ? "bg-ink text-canvas-white"
                    : "border border-chrome-gray-200 text-ink-muted hover:border-ink hover:text-ink"
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                    activeTag === tag
                      ? "bg-ink text-canvas-white"
                      : "border border-chrome-gray-200 text-ink-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {tagLabels[tag]}
                </button>
              ))}
              <span className="mx-2 hidden h-5 w-px bg-chrome-gray-200 sm:block" aria-hidden />
            </>
          )}
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setActiveSize(activeSize === size ? null : size)}
              className={`min-w-9 px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                activeSize === size
                  ? "bg-ink text-canvas-white"
                  : "border border-chrome-gray-200 text-ink-muted hover:border-ink hover:text-ink"
              }`}
              aria-pressed={activeSize === size}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-ink-faint">
            {visible.length} {visible.length === 1 ? "piece" : "pieces"}
          </span>
          <label className="sr-only" htmlFor="collection-sort">
            Sort by
          </label>
          <select
            id="collection-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-chrome-gray-200 bg-canvas-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-ink focus:border-ink focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-2xl text-ink">Nothing matches</p>
          <p className="mt-2 text-sm text-ink-muted">
            Try clearing a filter — the drop is limited, not invisible.
          </p>
          <button
            onClick={() => {
              setActiveTag(null);
              setActiveSize(null);
            }}
            className="mt-6 border border-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-canvas-white"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
