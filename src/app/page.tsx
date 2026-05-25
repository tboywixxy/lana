import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <ProductGrid products={products} />
    </>
  );
}
