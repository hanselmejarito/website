import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/lib/data";

export function HeroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {heroSlides.map((slide) => (
        <Link
          key={slide.id}
          href={slide.href}
          className="group relative aspect-[4/5] lg:aspect-auto lg:min-h-[70vh] overflow-hidden"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 text-chrome-white">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
              {slide.subtitle}
            </p>
            <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-tight mb-4 max-w-md">
              {slide.title}
            </h2>
            <span className="inline-block text-sm font-bold uppercase tracking-wider underline underline-offset-4 group-hover:no-underline">
              {slide.cta}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
