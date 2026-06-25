"use client";

import { useState } from "react";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-12 lg:py-16 bg-chrome-black text-chrome-white">
      <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-chrome-gray-400 mb-4">
          9K+ reviews that prove the gear lives up to the hype
        </p>
        <blockquote className="text-xl lg:text-2xl font-medium leading-relaxed mb-6 min-h-[120px]">
          &ldquo;{testimonials[active].quote}&rdquo;
        </blockquote>
        <cite className="text-sm text-chrome-gray-400 not-italic">
          {testimonials[active].author}
        </cite>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === active ? "bg-chrome-white" : "bg-chrome-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
