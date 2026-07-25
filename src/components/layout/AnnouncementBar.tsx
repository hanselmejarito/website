"use client";

const messages = [
  "Free shipping on orders ₱1,500+",
  "Akira Project — out now",
  "Limited drops — when it’s gone, it’s gone",
  "Honest Mistake — wear it loud",
];

export function AnnouncementBar() {
  const content = [...messages, ...messages, ...messages, ...messages];

  return (
    <div className="relative z-40 overflow-hidden bg-ink text-canvas-white">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {content.map((msg, i) => (
          <span
            key={i}
            className="mx-10 text-[11px] font-semibold uppercase tracking-[0.18em]"
          >
            {msg}
            <span className="ml-10 inline-block h-1 w-1 rounded-full bg-signal align-middle" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
