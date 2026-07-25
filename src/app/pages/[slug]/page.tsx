import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@honestmistake.ph";

const pages: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: "Shipping",
    body: [
      "Free nationwide shipping on orders ₱1,500 and above. Orders under ₱1,500 ship at a flat rate confirmed before payment.",
      "Most orders leave within 1–2 business days. You’ll get tracking as soon as it moves.",
    ],
  },
  returns: {
    title: "Returns",
    body: [
      "Changed your mind? Unworn items with original tags can be returned within 7 days.",
      "Start a return through Contact and include your order details.",
      "Sale items may be final — we’ll call that out clearly on the product page.",
    ],
  },
  warranty: {
    title: "Quality Promise",
    body: [
      "Every Honest Mistake piece is checked before it ships.",
      "If something arrives defective, hit us up with photos — we’ll make it right.",
    ],
  },
  contact: {
    title: "Contact",
    body: [
      "Questions about sizing, drops, or bulk orders? Email us — we reply fast.",
      "For order status, include your name and what you requested.",
    ],
  },
  about: {
    title: "Our Story",
    body: [
      "Honest Mistake is streetwear built from the ones we own — the noise, grit, and pride of Manila streets.",
      "We take race energy, mesh that breathes, and limited runs, then press them into pieces that hold their own anywhere.",
      "From jerseys to everyday essentials, every release is a limited drop. When it’s gone, it’s gone.",
    ],
  },
  materials: {
    title: "Size & Materials",
    body: [
      "Jerseys: breathable mesh with a slightly roomy race cut. True to size; size up for oversized.",
      "Shorts: elastic waist, mesh body. Size up for a baggier street fit.",
      "Wash cold, hang dry. Don’t bleach the print.",
    ],
  },
  careers: {
    title: "Careers",
    body: [
      "Small team. Loud ideas. If you care about craft and culture, send a short note with your work.",
      `Email ${contactEmail} with the subject “Honest Mistake careers”.`,
    ],
  },
  privacy: {
    title: "Privacy",
    body: [
      "We only collect what we need to fulfill orders and reply to you.",
      "Your cart is stored in your browser. We don’t sell personal information.",
    ],
  },
  terms: {
    title: "Terms",
    body: [
      "By requesting an order, you agree that availability and pricing are confirmed before payment.",
      "All products follow our shipping and returns policies on this site.",
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = pages[slug];
  return { title: page?.title ?? "Page" };
}

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  const paragraphs =
    slug === "contact"
      ? [...page.body, `Email ${contactEmail} and we’ll reply within one business day.`]
      : page.body;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
        Honest Mistake
      </p>
      <h1 className="mt-3 font-display text-display-md text-ink text-balance">
        {page.title}
      </h1>
      <div className="mt-8 space-y-5">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-ink-muted sm:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
      {slug === "contact" && (
        <a
          href={`mailto:${contactEmail}`}
          className="mt-8 inline-flex text-sm font-semibold text-signal transition-colors hover:text-signal-deep"
        >
          {contactEmail}
        </a>
      )}
      <div className="mt-12">
        <Button href="/collections/all" variant="link">
          Shop the collection <span aria-hidden>→</span>
        </Button>
      </div>
    </div>
  );
}
