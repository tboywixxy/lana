"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/products";

function QuickViewContent({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: () => void;
}) {
  const [activeImage, setActiveImage] = useState(product.gallery[0] || product.image);

  return (
    <div className="p-4 md:p-5">
      <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black">
        <div className="relative aspect-[4/4.2] w-full">
          <Image
            src={activeImage || product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 620px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {product.gallery.slice(0, 4).map((image, index) => {
          const isActive = activeImage === image;

          return (
            <button
              key={`${product.id}-${index}`}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`overflow-hidden rounded-2xl border ${
                isActive ? "border-[#d9a441]" : "border-white/10"
              } bg-black`}
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9a441]">
          {product.category}
        </p>

        <h2 className="mt-2 text-2xl font-semibold sm:text-[1.9rem]">
          {product.name}
        </h2>

        <p className="mt-3 text-lg font-semibold">
          ₦{product.price.toLocaleString()}
        </p>

        <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
          {product.description}
        </p>

        <button
          type="button"
          onClick={onAddToCart}
          className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9a441] px-6 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default function ProductQuickView({
  products,
  selectedIndex,
  open,
  onClose,
  onChangeIndex,
}: {
  products: Product[];
  selectedIndex: number;
  open: boolean;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}) {
  const { addToCart } = useCart();

  const product = products[selectedIndex];
  const isVisible = open && Boolean(product);

  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const prevIndex = useMemo(() => {
    if (!products.length) return 0;
    return selectedIndex === 0 ? products.length - 1 : selectedIndex - 1;
  }, [products.length, selectedIndex]);

  const nextIndex = useMemo(() => {
    if (!products.length) return 0;
    return selectedIndex === products.length - 1 ? 0 : selectedIndex + 1;
  }, [products.length, selectedIndex]);

  if (!product) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-black/60 transition-opacity duration-300 ${
          isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={isVisible ? onClose : undefined}
      />

      <aside
        className={`fixed right-0 top-0 z-[100] h-screen w-full max-w-[620px] overflow-y-auto border-l border-white/10 bg-[#0a0a0a] shadow-2xl transition-transform duration-300 ease-out will-change-transform ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isVisible}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a0a0a]/95 px-4 py-4 backdrop-blur md:px-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChangeIndex(prevIndex)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:bg-white/10"
              aria-label="Previous item"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => onChangeIndex(nextIndex)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:bg-white/10"
              aria-label="Next item"
            >
              →
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <QuickViewContent
          key={product.id}
          product={product}
          onAddToCart={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
        />
      </aside>
    </>
  );
}