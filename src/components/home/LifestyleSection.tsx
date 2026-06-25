import Image from "next/image";
import Link from "next/link";
import { lifestyleTiles } from "@/lib/data";

export function LifestyleSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {lifestyleTiles.map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <span className="absolute bottom-6 left-6 text-chrome-white text-2xl font-black uppercase tracking-tight">
                {tile.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
