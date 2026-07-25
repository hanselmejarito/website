import Image from "next/image";
import { featuredSpotlight } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function FeaturedSpotlight() {
  const spot = featuredSpotlight;

  return (
    <section id="drop" className="relative overflow-hidden bg-ink">
      <div className="grid lg:grid-cols-12 lg:min-h-[88vh]">
        <div className="relative flex min-h-[56vh] items-center justify-center bg-canvas-white lg:col-span-7 lg:min-h-full">
          <div className="relative h-full w-full max-h-[88vh] min-h-[56vh] lg:min-h-[88vh]">
            <Image
              src={spot.image}
              alt={spot.imageAlt}
              fill
              className="object-contain object-center p-4 sm:p-6 lg:p-8"
              sizes="(max-width: 1024px) 100vw, 58vw"
              quality={100}
              priority
            />
          </div>
        </div>

        <div className="relative flex flex-col justify-end px-5 py-14 sm:px-8 lg:col-span-5 lg:justify-center lg:px-12 lg:py-24 xl:px-16">
          <div className="race-line mb-8 w-16" aria-hidden />

          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-signal-bright">
            {spot.eyebrow}
          </p>

          <h2 className="mt-4 font-display text-display-lg text-canvas-white text-balance">
            {spot.title}
          </h2>
          <p className="mt-2 font-jp text-xl tracking-[0.18em] text-canvas-white/45 sm:text-2xl">
            {spot.titleJp}
          </p>

          <p className="mt-6 max-w-md text-base leading-relaxed text-canvas-white/70 sm:text-lg">
            {spot.body}
          </p>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <span className="font-display text-2xl text-canvas-white">
              {spot.price}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas-white/40">
              {spot.meta}
            </span>
          </div>

          <div className="mt-10">
            <Button href={spot.href} variant="outline">
              {spot.cta}
              <span
                aria-hidden
                className="transition-transform duration-300 ease-outExpo group-hover:translate-x-1"
              >
                →
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
