export const navigation = [
  {
    label: "Shop",
    href: "/collections/all",
    groups: [
      {
        title: "Collections",
        links: [
          { label: "All Pieces", href: "/collections/all" },
          { label: "Jerseys", href: "/collections/jerseys" },
          { label: "Shorts", href: "/collections/shorts" },
          { label: "New Drop", href: "/collections/new" },
          { label: "Sale", href: "/collections/sale" },
        ],
      },
    ],
  },
  {
    label: "Jerseys",
    href: "/collections/jerseys",
  },
  {
    label: "Shorts",
    href: "/collections/shorts",
  },
  {
    label: "New Drop",
    href: "/#drop",
  },
] as const;

export const footerLinks = {
  support: [
    { label: "Shipping", href: "/pages/shipping" },
    { label: "Returns", href: "/pages/returns" },
    { label: "Size Guide", href: "/pages/materials" },
    { label: "Contact", href: "/pages/contact" },
  ],
  company: [
    { label: "Our Story", href: "/pages/about" },
    { label: "Craft & Materials", href: "/pages/materials" },
    { label: "Careers", href: "/pages/careers" },
  ],
  resources: [
    { label: "Privacy", href: "/pages/privacy" },
    { label: "Terms", href: "/pages/terms" },
  ],
};

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/honestmistake" },
  { label: "TikTok", href: "https://tiktok.com/@honestmistake" },
  { label: "Facebook", href: "https://facebook.com/honestmistake" },
];

export const paymentMethods = ["GCash", "Maya", "Bank Transfer", "COD"];

export const hero = {
  brand: "Honest Mistake",
  kicker: "マニラ · Limited Run",
  headline: "Wear the mistake.",
  support:
    "Race mesh. Bold prints. Built from city heat — when a drop is gone, it’s gone.",
  cta: "Shop the drop",
  href: "/#drop",
  image: "/products/jersey-closeup.jpg",
  imageAlt: "Honest Mistake Akira Project race jersey mesh close-up",
};

export const marqueeItems = [
  "Honest Mistake",
  "マニラ",
  "Akira Project",
  "アキラ プロジェクト",
  "Limited drops",
  "Race mesh",
  "Wear it loud",
  "Run for the title",
];

export const dropLinks = [
  { label: "All", href: "/collections/all" },
  { label: "Jerseys", href: "/collections/jerseys" },
  { label: "Shorts", href: "/collections/shorts" },
  { label: "Sale", href: "/collections/sale" },
];

export const featuredSpotlight = {
  eyebrow: "Latest Drop",
  title: "Akira Project",
  titleJp: "アキラ プロジェクト",
  body: "Motocross-inspired mesh with full racing trim — CHAMP box print, checkered flags, and the SUPREMACY back hit. Lightweight. Breathable. Built for the metro grind.",
  cta: "Shop Akira",
  href: "/products/race-jersey-black",
  price: "₱850",
  meta: "V1 · Black / White",
  image: "/products/jersey-grid.jpg",
  imageAlt: "Akira Project jersey — front and back with Supremacy print",
};

export const craft = {
  title: "Born from the honest ones.",
  body: "Honest Mistake turns street noise into limited pieces that hold their own. No restocks. No filler drops.",
  cta: "Our story",
  href: "/pages/about",
  image: "/products/jersey-grid.jpg",
  imageAlt: "Honest Mistake Akira Project race jersey look",
};

export const trustItems = [
  { label: "Free shipping", detail: "Orders ₱1,500+" },
  { label: "Limited runs", detail: "No restocks" },
  { label: "Pay your way", detail: "GCash · Maya · COD" },
  { label: "PH based", detail: "Ships nationwide" },
];

export const collectionMeta: Record<
  string,
  { title: string; description: string; image: string }
> = {
  all: {
    title: "All pieces",
    description: "Every Honest Mistake drop — jerseys, shorts, and what’s out now.",
    image: "/products/jersey-grid.jpg",
  },
  jerseys: {
    title: "Jerseys",
    description: "Race-inspired mesh built for motion and heat.",
    image: "/products/jersey-closeup.jpg",
  },
  shorts: {
    title: "Shorts",
    description: "Light mesh, loud prints, everyday rotation.",
    image: "/products/shorts.jpg",
  },
  new: {
    title: "New drop",
    description: "Akira Project — out now.",
    image: "/products/akira-v1-white.jpg",
  },
  sale: {
    title: "Sale",
    description: "Marked down while stocks last.",
    image: "/products/shorts.jpg",
  },
};
