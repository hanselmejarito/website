"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/types/store";
import { formatPrice } from "@/lib/store";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { SizeGuide } from "./SizeGuide";

const details = [
  {
    title: "Shipping",
    body: "Free nationwide shipping on orders ₱1,500+. Most orders leave within 1–2 business days.",
  },
  {
    title: "Returns",
    body: "Unworn items with tags can be returned within 7 days. Start a return through Contact.",
  },
  {
    title: "Fit notes",
    body: "Jerseys run true to size with a slightly roomy race cut. Shorts have an elastic waist — size up for a baggier look.",
  },
];

export function ProductDetail({ product }: { product: Product }) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        product.options.map((opt) => [
          opt.name,
          product.variants[0]?.selectedOptions.find((o) => o.name === opt.name)?.value ??
            opt.values[0],
        ])
      )
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState<string | null>("Shipping");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { addItem, isLoading } = useCart();

  const isShorts = product.tags.includes("shorts");
  const breadcrumb = isShorts
    ? { label: "Shorts", href: "/collections/shorts" }
    : { label: "Jerseys", href: "/collections/jerseys" };

  useEffect(() => {
    const button = addButtonRef.current;
    if (!button) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goToImage(selectedImage + 1);
      if (e.key === "ArrowLeft") goToImage(selectedImage - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- navigate by index only
  }, [lightboxOpen, selectedImage]);

  const selectedVariant = useMemo(() => {
    return (
      product.variants.find((variant) =>
        variant.selectedOptions.every(
          (opt) => selectedOptions[opt.name] === opt.value
        )
      ) ?? product.variants[0]
    );
  }, [product.variants, selectedOptions]);

  const images =
    product.images.length > 0
      ? product.images
      : product.featuredImage
        ? [product.featuredImage]
        : [];

  const goToImage = (index: number) => {
    if (images.length === 0) return;
    const next = ((index % images.length) + images.length) % images.length;
    setSelectedImage(next);
    setImageKey((k) => k + 1);
    thumbRefs.current[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const handleAddToCart = async () => {
    if (selectedVariant) {
      await addItem(selectedVariant.id);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-12 lg:pb-28 lg:pt-8">
      <nav aria-label="Breadcrumb" className="mb-6 lg:mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-faint">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={breadcrumb.href} className="transition-colors hover:text-ink">
              {breadcrumb.label}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="truncate text-ink-muted">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative mb-3 block w-full aspect-[4/5] overflow-hidden bg-canvas-deep text-left lg:aspect-[5/6]"
            aria-label="Open image gallery"
          >
            {images[selectedImage] && (
              <Image
                key={imageKey}
                src={images[selectedImage].url}
                alt={images[selectedImage].altText ?? product.title}
                fill
                className="object-cover gallery-fade transition-transform duration-700 ease-outExpo group-hover:scale-[1.02]"
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={92}
              />
            )}
            <span className="absolute bottom-4 right-4 border border-white/20 bg-ink/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-canvas-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              View
            </span>
          </button>

          {images.length > 1 && (
            <div
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
              role="listbox"
              aria-label="Product images"
            >
              {images.map((img, i) => (
                <button
                  key={`${img.url}-${i}`}
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={i === selectedImage}
                  onClick={() => goToImage(i)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border transition-all duration-300 sm:h-24 sm:w-24 ${
                    i === selectedImage
                      ? "border-ink opacity-100"
                      : "border-transparent opacity-55 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText ?? ""}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
            Honest Mistake
          </p>
          <h1 className="mt-3 font-display text-display-md text-ink text-balance">
            {product.title}
          </h1>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-xl font-medium text-ink">
              {formatPrice(selectedVariant?.price ?? product.priceRange.minVariantPrice)}
            </span>
            {selectedVariant?.compareAtPrice &&
              parseFloat(selectedVariant.compareAtPrice.amount) >
                parseFloat(selectedVariant.price.amount) && (
                <span className="text-ink-faint line-through">
                  {formatPrice(selectedVariant.compareAtPrice)}
                </span>
              )}
          </div>

          {product.description && (
            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              {product.description}
            </p>
          )}

          {product.options.map((option) => (
            <div key={option.id} className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  {option.name}
                </p>
                {option.name === "Size" && (
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(true)}
                    className="text-[11px] font-semibold uppercase tracking-[0.14em] text-signal underline-offset-4 transition-colors hover:text-signal-deep hover:underline"
                  >
                    Size guide
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const next = { ...selectedOptions, [option.name]: value };
                  const match = product.variants.find((variant) =>
                    variant.selectedOptions.every(
                      (opt) => next[opt.name] === opt.value
                    )
                  );
                  const isSelected = selectedOptions[option.name] === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelectedOptions(next)}
                      disabled={!match?.availableForSale}
                      className={`border px-4 py-2.5 text-sm transition-colors ${
                        isSelected
                          ? "border-ink bg-ink text-canvas-white"
                          : "border-chrome-gray-200 text-ink hover:border-ink"
                      } ${!match?.availableForSale ? "cursor-not-allowed opacity-40" : ""}`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <Button
            ref={addButtonRef}
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale || isLoading}
            className={`mt-10 w-full ${justAdded ? "!bg-ink hover:!bg-ink" : ""}`}
            wipe={!justAdded}
          >
            {justAdded
              ? "Added to cart ✓"
              : isLoading
                ? "Adding…"
                : selectedVariant?.availableForSale
                  ? "Add to cart"
                  : "Sold out"}
          </Button>

          <p className="mt-4 text-center text-xs text-ink-faint">
            Free shipping on orders ₱1,500+ · Limited drop
          </p>

          <div className="mt-10 border-t border-chrome-gray-200">
            {details.map((item) => {
              const open = openDetail === item.title;
              return (
                <div key={item.title} className="border-b border-chrome-gray-200">
                  <button
                    type="button"
                    onClick={() => setOpenDetail(open ? null : item.title)}
                    className="flex w-full items-center justify-between py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">
                      {item.title}
                    </span>
                    <span className="text-lg leading-none text-ink-faint" aria-hidden>
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && (
                    <p className="pb-4 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                  )}
                </div>
              );
            })}
          </div>

          {product.descriptionHtml && (
            <div
              className="mt-8 space-y-3 text-sm leading-relaxed text-ink-muted [&_p+p]:mt-3"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}
        </div>
      </div>

      {showStickyBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-chrome-gray-200 bg-canvas-white/95 px-5 py-3 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{product.title}</p>
              <p className="text-sm text-ink-muted">
                {formatPrice(selectedVariant?.price ?? product.priceRange.minVariantPrice)}
                {selectedOptions.Size ? ` · ${selectedOptions.Size}` : ""}
              </p>
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale || isLoading}
              className={`shrink-0 !px-6 !py-3 !text-xs ${justAdded ? "!bg-ink" : ""}`}
              wipe={!justAdded}
            >
              {justAdded ? "Added ✓" : "Add to cart"}
            </Button>
          </div>
        </div>
      )}

      {lightboxOpen && images[selectedImage] && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Product image gallery"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 z-10 p-2 text-canvas-white/70 transition-colors hover:text-canvas-white"
            aria-label="Close gallery"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(selectedImage - 1);
                }}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-3 text-canvas-white/70 transition-colors hover:text-canvas-white sm:left-6"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(selectedImage + 1);
                }}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 p-3 text-canvas-white/70 transition-colors hover:text-canvas-white sm:right-6"
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}

          <div
            className="relative h-[75vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={`lb-${imageKey}`}
              src={images[selectedImage].url}
              alt={images[selectedImage].altText ?? product.title}
              fill
              className="object-contain gallery-fade"
              sizes="100vw"
              quality={95}
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.18em] text-canvas-white/50">
            {selectedImage + 1} / {images.length}
          </p>
        </div>
      )}

      {showSizeGuide && (
        <SizeGuide
          type={isShorts ? "shorts" : "jersey"}
          onClose={() => setShowSizeGuide(false)}
        />
      )}
    </div>
  );
}
