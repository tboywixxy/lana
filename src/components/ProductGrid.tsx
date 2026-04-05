"use client";

import { useCallback, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductQuickView from "@/components/ProductQuickView";
import type { Product } from "@/lib/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback((index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <section id="products" className="px-3 py-4 sm:px-5 lg:px-6">
        <div className="mx-auto w-full max-w-[1600px]">
          {products.length ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onOpen={handleOpen}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                No products yet
              </p>
            </div>
          )}
        </div>
      </section>

      <ProductQuickView
        products={products}
        selectedIndex={selectedIndex}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}