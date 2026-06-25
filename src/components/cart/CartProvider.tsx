"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Cart, CartLine } from "@/types/store";
import { findVariant } from "@/lib/store";
import { CartDrawer } from "./CartDrawer";

const CART_KEY = "local_cart";

type CartContextType = {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

function emptyCart(): Cart {
  return {
    totalQuantity: 0,
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
    },
    lines: [],
  };
}

function recalculate(lines: CartLine[]): Cart {
  const activeLines = lines.filter((l) => l.quantity > 0);
  const subtotal = activeLines.reduce(
    (sum, line) => sum + parseFloat(line.merchandise.price.amount) * line.quantity,
    0
  );
  const amount = subtotal.toFixed(2);
  const currencyCode = activeLines[0]?.merchandise.price.currencyCode ?? "USD";

  return {
    lines: activeLines,
    totalQuantity: activeLines.reduce((sum, l) => sum + l.quantity, 0),
    cost: {
      subtotalAmount: { amount, currencyCode },
      totalAmount: { amount, currencyCode },
    },
  };
}

function toCartLine(variantId: string, quantity: number): CartLine | null {
  const match = findVariant(variantId);
  if (!match) return null;

  const { product, variant } = match;
  return {
    id: variant.id,
    quantity,
    merchandise: {
      id: variant.id,
      title: variant.title,
      product: {
        title: product.title,
        handle: product.handle,
        featuredImage: product.featuredImage,
      },
      price: variant.price,
      selectedOptions: variant.selectedOptions,
    },
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const persist = useCallback((next: Cart) => {
    setCart(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      setCart(saved ? (JSON.parse(saved) as Cart) : emptyCart());
    } catch {
      setCart(emptyCart());
    }
  }, []);

  const addItem = async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      const current = cart ?? emptyCart();
      const existing = current.lines.find((l) => l.id === variantId);

      let lines: CartLine[];
      if (existing) {
        lines = current.lines.map((l) =>
          l.id === variantId ? { ...l, quantity: l.quantity + quantity } : l
        );
      } else {
        const line = toCartLine(variantId, quantity);
        if (!line) return;
        lines = [...current.lines, line];
      }

      persist(recalculate(lines));
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const current = cart ?? emptyCart();
      const lines = current.lines.map((l) =>
        l.id === lineId ? { ...l, quantity } : l
      );
      persist(recalculate(lines));
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    await updateItem(lineId, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}
