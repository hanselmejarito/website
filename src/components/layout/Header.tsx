"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/lib/data";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { cart, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-chrome-white border-b border-chrome-gray-200">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/" className="text-xl font-black uppercase tracking-tight">
            Chrome
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className="text-sm font-semibold uppercase tracking-wide hover:underline underline-offset-4"
              >
                {item.label}
              </Link>

              {"groups" in item && item.groups && activeMenu === item.label && (
                <div className="absolute top-full left-0 pt-4">
                  <div className="bg-chrome-white border border-chrome-gray-200 shadow-lg p-6 min-w-[240px]">
                    {item.groups.map((group) => (
                      <div key={group.title}>
                        <p className="text-xs font-bold uppercase tracking-widest text-chrome-gray-400 mb-3">
                          {group.title}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="text-sm hover:underline"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="p-2 hidden sm:block">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link href="/account" aria-label="Account" className="p-2 hidden sm:block">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="p-2 relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart && cart.totalQuantity > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-chrome-black text-chrome-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-chrome-gray-200 px-4 py-4 space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-sm font-semibold uppercase tracking-wide py-2"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
