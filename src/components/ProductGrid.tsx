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
      <section id="products" className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9a441]">
              Products
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Available items
            </h2>
          </div>

          {products.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
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
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center">
              <h3 className="text-2xl font-semibold">No products yet</h3>
              <p className="mt-3 text-sm text-white/65 sm:text-base">
                Add and publish products in Sanity Studio to show them here.
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
        onChangeIndex={setSelectedIndex}
      />
    </>
  );
}