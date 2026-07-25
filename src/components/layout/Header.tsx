"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/data";
import { useCart } from "@/components/cart/CartProvider";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Opaque light bar when scrolled — translucent glass over dark sections
  // washed out nav contrast (ink on murky dark).
  const solid = !isHome || scrolled || mobileOpen;
  const onDark = !solid;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-outExpo ${
        solid
          ? "border-b border-chrome-gray-200 bg-canvas-white shadow-[0_1px_0_rgba(11,22,34,0.04)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
        <div className="flex items-center gap-3">
          <button
            className={`-ml-2 p-2 transition-colors lg:hidden ${
              onDark ? "text-canvas-white" : "text-ink"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
          <BrandLogo
            variant={onDark ? "onDark" : "color"}
            height={onDark ? 40 : 36}
            priority
          />
        </div>

        <nav className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className={`text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-signal ${
                  onDark ? "text-canvas-white" : "text-ink"
                }`}
              >
                {item.label}
              </Link>

              {"groups" in item && item.groups && activeMenu === item.label && (
                <div className="absolute left-0 top-full pt-3">
                  <div className="min-w-[240px] border border-chrome-gray-200/90 bg-canvas-white/98 p-6 shadow-[0_28px_70px_-32px_rgba(11,22,34,0.45)] backdrop-blur-md">
                    <div className="race-line mb-4 w-10" aria-hidden />
                    {item.groups.map((group) => (
                      <div key={group.title}>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                          {group.title}
                        </p>
                        <ul className="space-y-2.5">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="text-sm text-ink transition-colors hover:text-signal"
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

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className={`p-2 transition-colors ${
              onDark ? "text-canvas-white" : "text-ink"
            }`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>
          </button>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className={`relative p-2 transition-colors ${
              onDark ? "text-canvas-white" : "text-ink"
            }`}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cart && cart.totalQuantity > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-signal px-1 text-[10px] font-bold text-canvas-white">
                {cart.totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="space-y-1 border-t border-chrome-gray-200 bg-canvas-white px-5 py-6 lg:hidden">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-3 font-display text-2xl text-ink"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
