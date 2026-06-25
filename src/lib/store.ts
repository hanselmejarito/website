import type { Product } from "@/types/store";
import { products } from "@/lib/products";

export function formatPrice(money: { amount: string; currencyCode: string }) {
  const amount = parseFloat(money.amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(amount);
}

export function getProducts(): Product[] {
  return products;
}

export function getProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function findVariant(variantId: string) {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
}

const collectionFilters: Record<string, (product: Product) => boolean> = {
  all: () => true,
  slings: (p) => p.tags.includes("sling"),
  bags: (p) => p.tags.some((t) => ["sling", "backpack", "messenger"].includes(t)),
  backpacks: (p) => p.tags.includes("backpack"),
  messengers: (p) => p.tags.includes("messenger"),
  accessories: (p) => p.tags.includes("accessory"),
  shoes: (p) => p.tags.includes("shoes"),
  sale: (p) =>
    parseFloat(p.compareAtPriceRange.minVariantPrice.amount) >
    parseFloat(p.priceRange.minVariantPrice.amount),
};

export function getCollection(handle: string): { title: string; products: Product[] } {
  const filter = collectionFilters[handle] ?? ((p: Product) => p.tags.includes(handle));
  const filtered = products.filter(filter);

  return {
    title: handle.replace(/-/g, " "),
    products: filtered.length > 0 ? filtered : products,
  };
}

export function getHomepageProducts(): Product[] {
  return products;
}

export function buildOrderMailto(cart: {
  lines: { quantity: number; merchandise: { product: { title: string }; title: string; selectedOptions: { value: string }[]; price: { amount: string; currencyCode: string } } }[];
  cost: { subtotalAmount: { amount: string; currencyCode: string } };
}): string {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@example.com";
  const lines = cart.lines
    .map((line) => {
      const opts = line.merchandise.selectedOptions.map((o) => o.value).join(", ");
      return `- ${line.merchandise.product.title} (${opts}) x${line.quantity} — ${formatPrice(line.merchandise.price)}`;
    })
    .join("%0A");

  const subtotal = formatPrice(cart.cost.subtotalAmount);
  const body = `Hi, I'd like to order:%0A%0A${lines}%0A%0ASubtotal: ${subtotal}%0A%0APlease confirm availability and payment details.`;

  return `mailto:${email}?subject=${encodeURIComponent("Order inquiry")}&body=${body}`;
}
