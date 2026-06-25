export const navigation = [
  {
    label: "New & Featured",
    href: "/collections/new-drops",
    featured: [
      { label: "Watch Party Slings", href: "/collections/slings", image: null },
      { label: "Bag Finder Quiz", href: "/bag-finder", image: null },
    ],
    groups: [
      {
        title: "Collections",
        links: [
          { label: "New Drops", href: "/collections/new-drops" },
          { label: "Reflective Bags & Gear", href: "/collections/reflective" },
          { label: "Waterproof Gear", href: "/collections/waterproof" },
          { label: "Top Sellers", href: "/collections/best-sellers" },
        ],
      },
    ],
  },
  {
    label: "Bags",
    href: "/collections/bags",
    groups: [
      {
        title: "By style",
        links: [
          { label: "All Bags", href: "/collections/bags" },
          { label: "Backpacks", href: "/collections/backpacks" },
          { label: "Messengers", href: "/collections/messengers" },
          { label: "Slings", href: "/collections/slings" },
          { label: "Totes", href: "/collections/totes" },
        ],
      },
    ],
  },
  {
    label: "Slings",
    href: "/collections/slings",
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    groups: [
      {
        title: "By style",
        links: [
          { label: "All Accessories", href: "/collections/accessories" },
          { label: "Organizers & Pouches", href: "/collections/organizers" },
          { label: "Keychains & Buckles", href: "/collections/keychains" },
        ],
      },
    ],
  },
  {
    label: "Shoes",
    href: "/collections/shoes",
    groups: [
      {
        title: "By style",
        links: [
          { label: "All Shoes", href: "/collections/shoes" },
          { label: "Sneakers", href: "/collections/sneakers" },
          { label: "Boots", href: "/collections/boots" },
        ],
      },
    ],
  },
  {
    label: "Sale",
    href: "/collections/sale",
  },
] as const;

export const footerLinks = {
  support: [
    { label: "Shipping", href: "/pages/shipping" },
    { label: "Returns", href: "/pages/returns" },
    { label: "Warranty", href: "/pages/warranty" },
    { label: "FAQs", href: "/pages/faq" },
    { label: "Contact Us", href: "/pages/contact" },
  ],
  company: [
    { label: "Our Story", href: "/pages/about" },
    { label: "Blog Stories", href: "/blog" },
    { label: "Careers", href: "/pages/careers" },
  ],
  resources: [
    { label: "Privacy Statement", href: "/pages/privacy" },
    { label: "Terms of Use", href: "/pages/terms" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};

export const heroSlides = [
  {
    id: "slings",
    title: "Slings Built for Match-Day Meetups",
    subtitle: "Watch Party Ready",
    cta: "Sling It",
    href: "/collections/slings",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1920&q=80",
  },
  {
    id: "barrage",
    title: "Barrage 18L & 22L Packs",
    subtitle: "Built to Carry More",
    cta: "Load it Up",
    href: "/collections/backpacks",
    image:
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=1920&q=80",
  },
];

export const categoryTiles = [
  {
    label: "Slings",
    href: "/collections/slings",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
  },
  {
    label: "Add-Ons",
    href: "/collections/accessories",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
  },
  {
    label: "Pack It Up",
    href: "/collections/backpacks",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
];

export const testimonials = [
  {
    quote:
      "This bag is so dope! Great size, bomber construction, a+ design.",
    author: "Forever O.",
  },
  {
    quote:
      "The lifetime guarantee is the REAL DEAL. I love this new messenger bag. It is perfect!",
    author: "Nancy B.",
  },
  {
    quote:
      "I love the waterproofness and how versatile this bag is. Your back will break before the bag.",
    author: "John H.",
  },
  {
    quote:
      "Super comfy, insane durability, and perfect functionality.",
    author: "Owen E.",
  },
];

export const lifestyleTiles = [
  {
    label: "Reflect",
    href: "/collections/reflective",
    image:
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=800&q=80",
  },
  {
    label: "Commute",
    href: "/collections/backpacks",
    image:
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800&q=80",
  },
  {
    label: "Repel",
    href: "/collections/waterproof",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
];

