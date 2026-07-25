"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { buildOrderMailto, formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/store";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCart();

  if (!isOpen) return null;

  const orderLink = cart && cart.lines.length > 0 ? buildOrderMailto(cart) : "#";
  const freeShipRemaining =
    cart && parseFloat(cart.cost.subtotalAmount.amount) < FREE_SHIPPING_THRESHOLD
      ? FREE_SHIPPING_THRESHOLD - parseFloat(cart.cost.subtotalAmount.amount)
      : 0;

  return (
    <>
      <div
        className="drawer-backdrop fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden
      />
      <aside className="drawer-panel fixed right-0 top-0 z-[100] flex h-full w-full max-w-md flex-col bg-canvas-white shadow-[0_0_80px_-20px_rgba(11,22,34,0.45)]">
        <div className="flex items-center justify-between border-b border-chrome-gray-200 px-6 py-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Honest Mistake
            </p>
            <h2 className="mt-1 font-display text-xl tracking-tight">
              Cart{cart ? ` · ${cart.totalQuantity}` : ""}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 text-ink transition-colors hover:text-signal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!cart || cart.lines.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl text-ink">Empty for now</p>
              <p className="mt-2 text-sm text-ink-muted">Your next piece starts here.</p>
              <Button
                href="/collections/all"
                variant="secondary"
                className="mt-8"
                onClick={closeCart}
              >
                Continue shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-7">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div className="relative h-28 w-24 flex-shrink-0 bg-canvas-deep">
                    {line.merchandise.product.featuredImage && (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${line.merchandise.product.handle}`}
                      onClick={closeCart}
                      className="text-sm font-semibold text-ink transition-colors hover:text-signal"
                    >
                      {line.merchandise.product.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink-faint">
                      {line.merchandise.selectedOptions.map((o) => o.value).join(" / ")}
                    </p>
                    <p className="mt-1.5 text-sm font-medium">
                      {formatPrice(line.merchandise.price)}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                        disabled={isLoading}
                        className="flex h-8 w-8 items-center justify-center border border-chrome-gray-200 text-sm transition-colors hover:border-ink"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="min-w-4 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        className="flex h-8 w-8 items-center justify-center border border-chrome-gray-200 text-sm transition-colors hover:border-ink"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        className="ml-auto text-xs text-ink-faint transition-colors hover:text-signal"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart && cart.lines.length > 0 && (
          <div className="space-y-4 border-t border-chrome-gray-200 px-6 py-6">
            <div>
              {freeShipRemaining > 0 ? (
                <p className="text-xs text-ink-muted">
                  You&apos;re{" "}
                  <span className="font-semibold text-ink">
                    ₱{freeShipRemaining.toFixed(0)}
                  </span>{" "}
                  away from free shipping.
                </p>
              ) : (
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
                  You&apos;ve unlocked free shipping
                </p>
              )}
              <div
                className="mt-2.5 h-1 w-full overflow-hidden bg-chrome-gray-200"
                role="progressbar"
                aria-label="Progress toward free shipping"
                aria-valuemin={0}
                aria-valuemax={FREE_SHIPPING_THRESHOLD}
                aria-valuenow={Math.min(
                  parseFloat(cart.cost.subtotalAmount.amount),
                  FREE_SHIPPING_THRESHOLD
                )}
              >
                <div
                  className="h-full bg-signal transition-all duration-700 ease-outExpo"
                  style={{
                    width: `${Math.min(
                      (parseFloat(cart.cost.subtotalAmount.amount) /
                        FREE_SHIPPING_THRESHOLD) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cart.cost.subtotalAmount)}</span>
            </div>
            <p className="text-xs leading-relaxed text-ink-faint">
              Request an order by email — we&apos;ll confirm availability and payment
              (GCash, Maya, bank, or COD).
            </p>
            <a
              href={orderLink}
              className="group relative block w-full overflow-hidden bg-signal py-3.5 text-center text-sm font-semibold uppercase tracking-[0.14em] text-canvas-white transition-colors hover:bg-signal-deep"
            >
              <span className="relative z-10">Request order</span>
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-signal-bright transition-transform duration-500 ease-outExpo group-hover:translate-y-0"
              />
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
