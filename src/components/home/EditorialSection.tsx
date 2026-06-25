import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function EditorialSection() {
  return (
    <section className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1485217988980-11786ced9454?w=1920&q=80"
        alt="Editorial"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] lg:min-h-[500px] text-center text-chrome-white px-4">
        <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">
          Chrome x J. Prince
        </p>
        <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight mb-6">
          Ride With Pride
        </h2>
        <Button href="/collections/pride" variant="outline">
          Shop Collection
        </Button>
      </div>
    </section>
  );
}
