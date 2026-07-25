import Link from "next/link";
import type { Product } from "@/types/store";
import { dropLinks } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";

export function DropSection({ products }: { products: Product[] }) {
  return (
    <section id="shop" className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-signal/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-8 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-signal">
              The Lineup
            </p>
            <h2 className="mt-3 font-display text-display-md text-ink text-balance">
              Shop the{" "}
              <span className="font-jp font-semibold text-signal">マニラ</span>{" "}
              collection
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
              Every piece is designed to move — breathable mesh, bold prints, and
              details you only catch up close.
            </p>
          </div>

          <nav
            aria-label="Shop by category"
            className="flex flex-wrap gap-x-7 gap-y-2 border-t border-ink/10 pt-5 lg:border-t-0 lg:pt-0"
          >
            {dropLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-signal"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
