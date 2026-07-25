import type { Product } from "@/types/store";

const php = (amount: string) => ({ amount, currencyCode: "PHP" as const });
const zero = php("0");

export const products: Product[] = [
  {
    id: "product-1",
    handle: "race-jersey-black",
    title: "Akira Project V1 — Black",
    description:
      "Motocross-inspired mesh jersey with racing trim. Lightweight, breathable, built for the daily grind.",
    descriptionHtml:
      "<p>Akira Project V1 Black — full racing trim, SUPREMACY back hit, and mesh that breathes when the city doesn’t.</p><p>Race cut with room through the shoulders. Sublimated graphics that hold after washes. Limited run — when it’s gone, it’s gone.</p>",
    availableForSale: true,
    tags: ["jersey", "new"],
    priceRange: {
      minVariantPrice: php("850.00"),
      maxVariantPrice: php("850.00"),
    },
    compareAtPriceRange: {
      minVariantPrice: zero,
      maxVariantPrice: zero,
    },
    featuredImage: {
      url: "/products/jersey-grid.jpg",
      altText: "Honest Mistake Akira Project V1 Black — front and back",
    },
    images: [
      {
        url: "/products/jersey-grid.jpg",
        altText: "Akira Project V1 Black front and back views",
      },
      {
        url: "/products/jersey-closeup.jpg",
        altText: "Akira Project V1 Black mesh and print detail",
      },
    ],
    variants: [
      {
        id: "variant-1-s",
        title: "S",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "S" },
        ],
        image: null,
      },
      {
        id: "variant-1-m",
        title: "M",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "M" },
        ],
        image: null,
      },
      {
        id: "variant-1-l",
        title: "L",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "L" },
        ],
        image: null,
      },
      {
        id: "variant-1-xl",
        title: "XL",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "XL" },
        ],
        image: null,
      },
    ],
    options: [
      { id: "1", name: "Color", values: ["Black"] },
      { id: "2", name: "Size", values: ["S", "M", "L", "XL"] },
    ],
  },
  {
    id: "product-2",
    handle: "race-jersey-white",
    title: "Akira Project V1 — White",
    description:
      "Same race DNA in a clean white shell. Mesh body, contrast trim, made to move loud.",
    descriptionHtml:
      "<p>White doesn’t mean quiet. Akira Project V1 White keeps the racing trim and mesh build — louder under city lights.</p><p>Same race cut as Black. Limited run only.</p>",
    availableForSale: true,
    tags: ["jersey", "new"],
    priceRange: {
      minVariantPrice: php("850.00"),
      maxVariantPrice: php("850.00"),
    },
    compareAtPriceRange: {
      minVariantPrice: zero,
      maxVariantPrice: zero,
    },
    featuredImage: {
      url: "/products/akira-v1-white.jpg",
      altText: "Honest Mistake Akira Project V1 White — front and back",
    },
    images: [
      {
        url: "/products/akira-v1-white.jpg",
        altText: "Akira Project V1 White front and back views",
      },
    ],
    variants: [
      {
        id: "variant-2-s",
        title: "S",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "White" },
          { name: "Size", value: "S" },
        ],
        image: null,
      },
      {
        id: "variant-2-m",
        title: "M",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "White" },
          { name: "Size", value: "M" },
        ],
        image: null,
      },
      {
        id: "variant-2-l",
        title: "L",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "White" },
          { name: "Size", value: "L" },
        ],
        image: null,
      },
      {
        id: "variant-2-xl",
        title: "XL",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "White" },
          { name: "Size", value: "XL" },
        ],
        image: null,
      },
    ],
    options: [
      { id: "1", name: "Color", values: ["White"] },
      { id: "2", name: "Size", values: ["S", "M", "L", "XL"] },
    ],
  },
  {
    id: "product-3",
    handle: "mesh-jersey-red-white",
    title: "Manila Mesh Jersey — Red / White",
    description:
      "Best-seller mesh jersey with bold color blocking. Breathable, loud, built for the streets.",
    descriptionHtml:
      "<p>The Manila Mesh Jersey is the piece people come back for — red and white that reads from across the barangay court.</p><p>Soft mesh, clean finish, everyday rotation ready. Wash cold, hang dry.</p>",
    availableForSale: true,
    tags: ["jersey", "bestseller"],
    priceRange: {
      minVariantPrice: php("850.00"),
      maxVariantPrice: php("850.00"),
    },
    compareAtPriceRange: {
      minVariantPrice: zero,
      maxVariantPrice: zero,
    },
    featuredImage: {
      url: "/products/jersey-closeup.jpg",
      altText: "Honest Mistake Manila Mesh Jersey — race mesh detail",
    },
    images: [
      {
        url: "/products/jersey-closeup.jpg",
        altText: "Manila Mesh Jersey Red / White mesh close-up",
      },
      {
        url: "/products/jersey-grid.jpg",
        altText: "Manila Mesh Jersey race trim and print detail",
      },
    ],
    variants: [
      {
        id: "variant-3-s",
        title: "S",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "Red / White" },
          { name: "Size", value: "S" },
        ],
        image: null,
      },
      {
        id: "variant-3-m",
        title: "M",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "Red / White" },
          { name: "Size", value: "M" },
        ],
        image: null,
      },
      {
        id: "variant-3-l",
        title: "L",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "Red / White" },
          { name: "Size", value: "L" },
        ],
        image: null,
      },
      {
        id: "variant-3-xl",
        title: "XL",
        availableForSale: true,
        price: php("850.00"),
        compareAtPrice: null,
        selectedOptions: [
          { name: "Color", value: "Red / White" },
          { name: "Size", value: "XL" },
        ],
        image: null,
      },
    ],
    options: [
      { id: "1", name: "Color", values: ["Red / White"] },
      { id: "2", name: "Size", values: ["S", "M", "L", "XL"] },
    ],
  },
  {
    id: "product-4",
    handle: "chainlink-mesh-shorts",
    title: "Chainlink Mesh Shorts",
    description:
      "Chainlink print mesh shorts — black and red, light on the body, heavy on the look.",
    descriptionHtml:
      "<p>Hot item for a reason. Mesh short with chainlink print, elastic comfort, and enough attitude for the court or the commute.</p><p>Elastic waist. Size up for a baggier street fit.</p>",
    availableForSale: true,
    tags: ["shorts", "sale"],
    priceRange: {
      minVariantPrice: php("499.00"),
      maxVariantPrice: php("499.00"),
    },
    compareAtPriceRange: {
      minVariantPrice: php("650.00"),
      maxVariantPrice: php("650.00"),
    },
    featuredImage: {
      url: "/products/shorts.jpg",
      altText: "Honest Mistake Chainlink Mesh Shorts — black and red",
    },
    images: [
      {
        url: "/products/shorts.jpg",
        altText: "Honest Mistake Chainlink Mesh Shorts flat lay",
      },
    ],
    variants: [
      {
        id: "variant-4-s",
        title: "S",
        availableForSale: true,
        price: php("499.00"),
        compareAtPrice: php("650.00"),
        selectedOptions: [
          { name: "Color", value: "Black / Red" },
          { name: "Size", value: "S" },
        ],
        image: null,
      },
      {
        id: "variant-4-m",
        title: "M",
        availableForSale: true,
        price: php("499.00"),
        compareAtPrice: php("650.00"),
        selectedOptions: [
          { name: "Color", value: "Black / Red" },
          { name: "Size", value: "M" },
        ],
        image: null,
      },
      {
        id: "variant-4-l",
        title: "L",
        availableForSale: true,
        price: php("499.00"),
        compareAtPrice: php("650.00"),
        selectedOptions: [
          { name: "Color", value: "Black / Red" },
          { name: "Size", value: "L" },
        ],
        image: null,
      },
      {
        id: "variant-4-xl",
        title: "XL",
        availableForSale: true,
        price: php("499.00"),
        compareAtPrice: php("650.00"),
        selectedOptions: [
          { name: "Color", value: "Black / Red" },
          { name: "Size", value: "XL" },
        ],
        image: null,
      },
    ],
    options: [
      { id: "1", name: "Color", values: ["Black / Red"] },
      { id: "2", name: "Size", values: ["S", "M", "L", "XL"] },
    ],
  },
];
