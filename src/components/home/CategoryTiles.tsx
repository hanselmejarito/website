import Image from "next/image";
import Link from "next/link";
import { categoryTiles } from "@/lib/data";

export function CategoryTiles() {
  return (
    <section className="py-12 lg:py-16 bg-chrome-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-center text-xl lg:text-2xl font-black uppercase tracking-tight mb-8">
          Made for What&apos;s Ahead. Since 1995.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categoryTiles.map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className="group relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <span className="absolute bottom-6 left-6 text-chrome-white text-lg font-black uppercase tracking-tight">
                {tile.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
