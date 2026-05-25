"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductQuickView from "@/components/ProductQuickView";
import { useSearch } from "@/components/SearchContext";
import type { Product } from "@/lib/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const { setProducts, filteredProducts, query } = useSearch();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  const displayedProducts = useMemo(
    () => (query ? filteredProducts : products),
    [filteredProducts, products, query]
  );

  const handleOpen = useCallback((index: number) => {
    setSelectedIndex(index);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <section id="products" className="px-3 py-5 sm:px-5 lg:px-6 lg:py-8">
        <div className="mx-auto w-full max-w-[1500px]">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Shop the Lana
              </p>
              {query ? (
                <p className="mt-2 text-xs text-[var(--muted)]">
                  {displayedProducts.length > 0
                    ? `Found ${displayedProducts.length} product${
                        displayedProducts.length !== 1 ? "s" : ""
                      }`
                    : `No products found for "${query}"`}
                </p>
              ) : null}
            </div>
          </div>

          {displayedProducts.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {displayedProducts.map((product, index) => (
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
        products={displayedProducts}
        selectedIndex={selectedIndex}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
