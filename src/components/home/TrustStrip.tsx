import { trustItems } from "@/lib/data";

export function TrustStrip() {
  return (
    <section
      aria-label="Why shop Honest Mistake"
      className="border-y border-ink/10 bg-canvas-white"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-ink/10 sm:grid-cols-4">
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="bg-canvas-white px-5 py-8 sm:px-6 sm:py-10 lg:px-8"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-signal">
              {item.label}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
