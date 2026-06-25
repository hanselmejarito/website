"use client";

const messages = [
  "FREE US SHIPPING ON ORDERS $110+",
  "CARRY WHAT YOU NEED FOR EVERY MATCH-DAY MEETUP",
];

export function AnnouncementBar() {
  const content = [...messages, ...messages, ...messages];

  return (
    <div className="bg-chrome-black text-chrome-white overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2.5">
        {content.map((msg, i) => (
          <span key={i} className="mx-8 text-xs font-semibold uppercase tracking-widest">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
