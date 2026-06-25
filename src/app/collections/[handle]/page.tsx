import { notFound } from "next/navigation";
import { getCollection } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  return { title: `${handle.replace(/-/g, " ")} | Chrome Industries` };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const { title, products } = getCollection(handle);

  if (!products.length) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-8 capitalize">
        {title}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard product={product} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
