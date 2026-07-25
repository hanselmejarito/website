import Image from "next/image";
import { craft } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function EditorialSection() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden bg-ink lg:min-h-[85vh]">
      <div className="absolute inset-0">
        <Image
          src={craft.image}
          alt=""
          fill
          aria-hidden
          className="object-cover object-[70%_35%] opacity-40 saturate-[0.9] contrast-[1.05] animate-slow-drift"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/60" />
        <div className="noise-layer" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-[78vh] flex-col justify-end px-5 pb-16 pt-24 sm:px-8 lg:min-h-[85vh] lg:justify-center lg:px-12 lg:pb-24">
        <div className="max-w-xl">
          <div className="race-line mb-8 w-16" aria-hidden />
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-signal-bright">
            The brand
          </p>
          <h2 className="mt-5 font-display text-display-lg text-canvas-white text-balance">
            {craft.title}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-canvas-white/70 sm:text-lg">
            {craft.body}
          </p>

          <div className="mt-10">
            <Button
              href={craft.href}
              variant="link"
              className="border-canvas-white/40 pb-1 text-canvas-white hover:border-signal hover:text-signal"
            >
              {craft.cta}
              <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
