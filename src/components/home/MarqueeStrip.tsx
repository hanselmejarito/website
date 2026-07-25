import { marqueeItems } from "@/lib/data";

export function MarqueeStrip() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="relative overflow-hidden bg-ink py-4">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-canvas-white/15 to-transparent" aria-hidden />

      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-7 inline-flex items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-canvas-white/75 sm:mx-10 sm:text-xs"
          >
            <span className={/[\u3040-\u30ff]/.test(item) ? "font-jp normal-case tracking-[0.2em]" : undefined}>
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-signal" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
