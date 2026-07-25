# Chrome Industries Storefront

A free, self-hosted storefront built with Next.js — no Shopify or paid services required.

## Stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS**
- **Local product data** (`src/lib/products.ts`)
- **Browser cart** (localStorage)

## Cost: $0

| Service | Cost |
|---------|------|
| Next.js site | Free (run locally or deploy to Vercel free tier) |
| Products | Edit `src/lib/products.ts` — no database needed |
| Cart | Saved in the browser — no backend |
| Checkout | Email order request — no payment gateway |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Env vars

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_CONTACT_EMAIL=your-email@gmail.com
NEXT_PUBLIC_SITE_URL=https://hm-worldwide.vercel.app
```

When customers click **Request Order**, it opens their email app with the cart details.

Live site: [hm-worldwide.vercel.app](https://hm-worldwide.vercel.app/). On Vercel, set `NEXT_PUBLIC_SITE_URL=https://hm-worldwide.vercel.app` under **Project → Settings → Environment Variables** (Production), then redeploy so Open Graph URLs stop pointing at localhost.

## Project structure

```
src/
├── app/
│   ├── collections/[handle]/   # Product listing pages
│   ├── products/[handle]/        # Product detail pages
│   └── page.tsx                  # Homepage
├── components/
│   ├── cart/                     # Local cart (localStorage)
│   ├── home/                     # Homepage sections
│   ├── layout/                   # Header, Footer
│   └── product/                  # ProductCard, ProductCarousel
├── lib/
│   ├── products.ts               # ← Add/edit your products here
│   ├── store.ts                  # Product & cart helpers
│   └── data.ts                   # Navigation, homepage content
└── types/
    └── store.ts
```

## Adding products

Edit `src/lib/products.ts`. Each product needs a title, price, images, and variants.

## Deploy for free

Push to GitHub and deploy on [Vercel](https://vercel.com) — free tier is enough for a small store.

## Payment options later (still free to start)

| Option | Cost |
|--------|------|
| **GCash / bank transfer** | Manual — customer emails you, you send payment details |
| **Stripe** | No monthly fee — ~3% per sale only when you earn |
| **PayPal.me** | Free link — customer pays you directly |

No rush — the site works as a catalog + inquiry cart right now.
