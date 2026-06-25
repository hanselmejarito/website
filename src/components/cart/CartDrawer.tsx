"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { buildOrderMailto, formatPrice } from "@/lib/store";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCart();

  if (!isOpen) return null;

  const orderLink = cart && cart.lines.length > 0 ? buildOrderMailto(cart) : "#";

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
        aria-hidden
      />
      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-chrome-white z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-chrome-gray-200">
          <h2 className="text-lg font-black uppercase tracking-tight">
            Cart {cart ? `(${cart.totalQuantity})` : ""}
          </h2>
          <button onClick={closeCart} aria-label="Close cart" className="p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!cart || cart.lines.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-chrome-gray-600 mb-6">Your cart is empty</p>
              <Link
                href="/collections/all"
                onClick={closeCart}
                className="text-sm font-bold uppercase tracking-wider underline"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div className="relative w-20 h-24 bg-chrome-gray-100 flex-shrink-0">
                    {line.merchandise.product.featuredImage && (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${line.merchandise.product.handle}`}
                      onClick={closeCart}
                      className="text-sm font-semibold hover:underline"
                    >
                      {line.merchandise.product.title}
                    </Link>
                    <p className="text-xs text-chrome-gray-400 mt-0.5">
                      {line.merchandise.selectedOptions
                        .map((o) => o.value)
                        .join(" / ")}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      {formatPrice(line.merchandise.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                        disabled={isLoading}
                        className="w-7 h-7 border border-chrome-gray-200 text-sm"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-sm">{line.quantity}</span>
                      <button
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        className="w-7 h-7 border border-chrome-gray-200 text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        className="text-xs text-chrome-gray-400 hover:text-chrome-black ml-auto"
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
          <div className="border-t border-chrome-gray-200 px-6 py-6 space-y-4">
            <div className="flex justify-between text-sm font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cart.cost.subtotalAmount)}</span>
            </div>
            <p className="text-xs text-chrome-gray-400">
              Orders via email — no payment gateway needed. Update your email in{" "}
              <code className="text-chrome-gray-600">NEXT_PUBLIC_CONTACT_EMAIL</code>.
            </p>
            <a
              href={orderLink}
              className="block w-full bg-chrome-black text-chrome-white text-center py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-chrome-gray-900 transition-colors"
            >
              Request Order
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
