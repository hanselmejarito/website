import type { Product } from "@/types/store";

export const products: Product[] = [
  {
    id: "product-1",
    handle: "kadet-max-15l-sling",
    title: "Kadet Max 15L Sling",
    description: "Our most versatile sling bag.",
    descriptionHtml: "<p>Our most versatile sling bag.</p>",
    availableForSale: true,
    tags: ["sling"],
    priceRange: {
      minVariantPrice: { amount: "155.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "155.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "0", currencyCode: "USD" },
      maxVariantPrice: { amount: "0", currencyCode: "USD" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
      altText: "Kadet Max 15L Sling",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
        altText: "Kadet Max 15L Sling front",
      },
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
        altText: "Kadet Max 15L Sling back",
      },
    ],
    variants: [
      {
        id: "variant-1",
        title: "Black Canvas Leather",
        availableForSale: true,
        price: { amount: "155.00", currencyCode: "USD" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Color", value: "Black Canvas Leather" }],
        image: null,
      },
    ],
    options: [{ id: "1", name: "Color", values: ["Black Canvas Leather", "Steel Blue"] }],
  },
  {
    id: "product-2",
    handle: "barrage-22l-pack",
    title: "Barrage 22L Pack",
    description: "Built to carry more.",
    descriptionHtml: "<p>Built to carry more.</p>",
    availableForSale: true,
    tags: ["backpack"],
    priceRange: {
      minVariantPrice: { amount: "170.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "170.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "0", currencyCode: "USD" },
      maxVariantPrice: { amount: "0", currencyCode: "USD" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      altText: "Barrage 22L Pack",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
        altText: "Barrage 22L Pack",
      },
    ],
    variants: [
      {
        id: "variant-2",
        title: "Black",
        availableForSale: true,
        price: { amount: "170.00", currencyCode: "USD" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Color", value: "Black" }],
        image: null,
      },
    ],
    options: [{ id: "1", name: "Color", values: ["Black"] }],
  },
  {
    id: "product-3",
    handle: "kadet-9l-sling",
    title: "Kadet 9L Sling",
    description: "Compact everyday carry.",
    descriptionHtml: "<p>Compact everyday carry.</p>",
    availableForSale: true,
    tags: ["sling"],
    priceRange: {
      minVariantPrice: { amount: "100.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "100.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "0", currencyCode: "USD" },
      maxVariantPrice: { amount: "0", currencyCode: "USD" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&q=80",
      altText: "Kadet 9L Sling",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&q=80",
        altText: "Kadet 9L Sling",
      },
    ],
    variants: [
      {
        id: "variant-3",
        title: "Steel Blue",
        availableForSale: true,
        price: { amount: "100.00", currencyCode: "USD" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Color", value: "Steel Blue" }],
        image: null,
      },
    ],
    options: [{ id: "1", name: "Color", values: ["Steel Blue", "Black"] }],
  },
  {
    id: "product-4",
    handle: "mini-buckle-keychain",
    title: "Mini Buckle Keychain",
    description: "Iconic buckle, pocket-sized.",
    descriptionHtml: "<p>Iconic buckle, pocket-sized.</p>",
    availableForSale: true,
    tags: ["accessory"],
    priceRange: {
      minVariantPrice: { amount: "25.00", currencyCode: "USD" },
      maxVariantPrice: { amount: "25.00", currencyCode: "USD" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "0", currencyCode: "USD" },
      maxVariantPrice: { amount: "0", currencyCode: "USD" },
    },
    featuredImage: {
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
      altText: "Mini Buckle Keychain",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
        altText: "Mini Buckle Keychain",
      },
    ],
    variants: [
      {
        id: "variant-4",
        title: "Black",
        availableForSale: true,
        price: { amount: "25.00", currencyCode: "USD" },
        compareAtPrice: null,
        selectedOptions: [{ name: "Color", value: "Black" }],
        image: null,
      },
    ],
    options: [{ id: "1", name: "Color", values: ["Black", "Silver"] }],
  },
];
