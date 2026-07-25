"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProducts, formatPrice } from "@/lib/store";
import type { Product } from "@/types/store";

const quickLinks = [
  { label: "Jerseys", href: "/collections/jerseys" },
  { label: "Shorts", href: "/collections/shorts" },
  { label: "New Drop", href: "/collections/new" },
  { label: "Sale", href: "/collections/sale" },
];

function matches(product: Product, query: string) {
  const q = query.toLowerCase();
  return (
    product.title.toLowerCase().includes(q) ||
    product.description.toLowerCase().includes(q) ||
    product.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      // Wait for the overlay to mount before focusing
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return getProducts().filter((p) => matches(p, query.trim()));
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110]">
      <div
        className="drawer-backdrop absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="search-panel relative mx-auto mt-0 max-h-full w-full overflow-y-auto bg-canvas-white shadow-[0_40px_80px_-30px_rgba(11,22,34,0.5)] sm:mt-16 sm:max-w-2xl">
        <div className="flex items-center gap-3 border-b border-chrome-gray-200 px-5 py-4 sm:px-6">
          <svg
            className="h-5 w-5 shrink-0 text-ink-faint"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
          <label className="sr-only" htmlFor="site-search">
            Search products
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jerseys, shorts, drops…"
            className="w-full bg-transparent text-base text-ink placeholder:text-ink-faint focus:outline-none"
            autoComplete="off"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 border border-chrome-gray-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint transition-colors hover:border-ink hover:text-ink"
          >
            Esc
          </button>
        </div>

        <div className="px-5 py-6 sm:px-6">
          {!query.trim() ? (
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                Browse
              </p>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="border border-chrome-gray-200 px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center">
              <p className="font-display text-xl text-ink">Nothing found</p>
              <p className="mt-2 text-sm text-ink-muted">
                Try “jersey”, “shorts”, or browse the full drop.
              </p>
              <Link
                href="/collections/all"
                onClick={onClose}
                className="mt-6 inline-block bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-canvas-white transition-colors hover:bg-signal"
              >
                Shop all pieces
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-chrome-gray-100">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.handle}`}
                    onClick={onClose}
                    className="group flex items-center gap-4 py-3"
                  >
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-canvas-deep">
                      {product.featuredImage && (
                        <Image
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText ?? product.title}
                          fill
                          className="object-cover transition-transform duration-500 ease-outExpo group-hover:scale-105"
                          sizes="56px"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink transition-colors group-hover:text-signal">
                        {product.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-ink-faint">
                        {product.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-ink">
                      {formatPrice(product.priceRange.minVariantPrice)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
