import { notFound } from "next/navigation";
import { getProduct } from "@/lib/store";
import { ProductDetail } from "@/components/product/ProductDetail";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;
  return { title: `${handle.replace(/-/g, " ")} | Chrome Industries` };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProduct(handle);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
