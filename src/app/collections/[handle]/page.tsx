import Image from "next/image";
import { getCollection } from "@/lib/store";
import { collectionMeta } from "@/lib/data";
import { CollectionGrid } from "@/components/collection/CollectionGrid";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  const meta = collectionMeta[handle];
  const title = meta?.title ?? handle.replace(/-/g, " ");
  return {
    title,
    description: meta?.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const { products } = getCollection(handle);
  const meta = collectionMeta[handle] ?? {
    title: handle.replace(/-/g, " "),
    description: "Honest Mistake pieces — limited drops, race mesh, city heat.",
    image: "/products/jersey-grid.jpg",
  };

  return (
    <div>
      <section className="relative min-h-[42vh] overflow-hidden bg-ink lg:min-h-[50vh]">
        <Image
          src={meta.image}
          alt=""
          fill
          priority
          aria-hidden
          className="object-cover opacity-55 saturate-[0.9] contrast-[1.05]"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/35" />
        <div className="noise-layer" aria-hidden />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[3px] sm:block"
          aria-hidden
        >
          <div className="h-full w-full bg-gradient-to-b from-signal via-canvas-white/70 to-transparent" />
        </div>
        <div className="relative z-10 flex min-h-[42vh] flex-col justify-end px-5 pb-12 pt-24 sm:px-8 lg:min-h-[50vh] lg:px-12 lg:pb-16">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-signal-bright">
              Collection
            </p>
            <h1 className="mt-3 font-display text-display-lg capitalize text-canvas-white text-balance">
              {meta.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-canvas-white/70">
              {meta.description}
            </p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-canvas-white/45">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        {products.length === 0 ? (
          <p className="text-ink-muted">No products in this collection yet.</p>
        ) : (
          <CollectionGrid products={products} />
        )}
      </div>
    </div>
  );
}
