import Image from "next/image";
import { hero } from "@/lib/data";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative -mt-16 min-h-[calc(100svh-34px)] overflow-hidden bg-ink lg:-mt-[4.5rem]">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          aria-hidden
          className="object-cover object-[62%_32%] opacity-60 saturate-[0.9] contrast-[1.08] animate-ken-burns"
          sizes="100vw"
          quality={92}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/55" />
        <div className="noise-layer" aria-hidden />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[3px] sm:block"
        aria-hidden
      >
        <div className="h-full w-full bg-gradient-to-b from-signal via-canvas-white/80 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100svh-34px)] flex-col justify-end px-5 pb-14 pt-32 sm:px-8 lg:px-12 lg:pb-20">
        <div className="max-w-2xl">
          <div className="opacity-0 animate-fade-up">
            <span className="block sm:hidden">
              <BrandLogo variant="onDark" href={null} height={68} priority />
            </span>
            <span className="hidden sm:block lg:hidden">
              <BrandLogo variant="onDark" href={null} height={92} priority />
            </span>
            <span className="hidden lg:block">
              <BrandLogo variant="onDark" href={null} height={118} priority />
            </span>
          </div>

          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-signal-bright opacity-0 anim-delay-1 animate-fade-up">
            {hero.kicker}
          </p>

          <h1 className="mt-4 font-display text-display-lg text-canvas-white opacity-0 anim-delay-2 animate-fade-up text-balance">
            {hero.headline}
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-canvas-white/70 opacity-0 anim-delay-3 animate-fade-up sm:text-lg">
            {hero.support}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-7 opacity-0 anim-delay-4 animate-fade-up">
            <Button href={hero.href} variant="onDark">
              {hero.cta}
              <span
                aria-hidden
                className="relative z-10 transition-transform duration-300 ease-outExpo group-hover:translate-x-1"
              >
                →
              </span>
            </Button>
            <span className="font-jp text-sm tracking-[0.12em] text-canvas-white/35">
              アキラ プロジェクト
            </span>
          </div>
        </div>
      </div>

      <p
        className="pointer-events-none absolute bottom-6 right-5 z-10 hidden font-display text-[clamp(4rem,12vw,9rem)] leading-none tracking-[-0.06em] text-canvas-white/[0.04] select-none sm:block lg:right-12"
        aria-hidden
      >
        MANILA
      </p>
    </section>
  );
}
