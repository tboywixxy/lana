"use client";

import { memo, useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/products";

function CartIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6l-1-2H2" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: Product;
  index: number;
  onOpen: (index: number) => void;
}) {
  const { addToCart } = useCart();

  const [showSizePopup, setShowSizePopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");

  const sizes = useMemo(() => {
    return product.sizes?.length ? product.sizes : ["S", "M", "L"];
  }, [product.sizes]);

  function closePopup() {
    setShowSizePopup(false);
    setSelectedSize(null);
    setQuantity(1);
    setAddedMessage("");
  }

  function addSelectedToCart() {
    if (!selectedSize) {
      setAddedMessage("Select a size first");
      return;
    }

    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    });

    setAddedMessage("Added to cart");

    window.setTimeout(() => {
      closePopup();
    }, 900);
  }

  return (
    <>
      <article className="relative border-b border-dashed border-[var(--foreground)]/20 animate-in slide-in-from-bottom-4 fade-in duration-500">
        <div className="group relative overflow-hidden px-0 py-3">
          <div className="pointer-events-none absolute inset-x-6 top-0 h-24 rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] blur-3xl" />

          <button
            type="button"
            onClick={() => onOpen(index)}
            className="block w-full cursor-pointer text-left"
          >
            <div className="relative overflow-hidden bg-[linear-gradient(180deg,color-mix(in_srgb,var(--card-soft)_72%,white),color-mix(in_srgb,var(--surface)_92%,black))] pb-2">

              <div className="relative mx-auto aspect-[4/4.2] w-full overflow-hidden">
                <div className="absolute inset-x-[12%] bottom-[7%] h-8 rounded-full bg-black/12 blur-2xl dark:bg-black/40" />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_42%,rgba(0,0,0,0.08)_100%)]" />
              </div>
            </div>

            <div className="space-y-3 px-1 pb-1 pt-4">
              <div className="space-y-2">
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)]">
                  {product.name}
                </h3>

                <div className="flex items-end justify-between gap-3">
                  <p className="text-base font-semibold text-[var(--foreground)]">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setShowSizePopup(true)}
            className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-[var(--foreground)] hover:opacity-92"
            aria-label="Open size selection"
          >
            <CartIcon className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </article>

      {showSizePopup && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/10 px-4">
          <button
            type="button"
            onClick={closePopup}
            className="absolute inset-0"
            aria-label="Close size popup"
          />

          <div className="relative z-10 w-full max-w-[320px] rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)] px-5 py-5 shadow-[var(--shadow)]">
            <button
              type="button"
              onClick={closePopup}
              className="absolute left-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[24px] font-semibold leading-none text-[var(--foreground)]"
              aria-label="Back"
            >
              ‹
            </button>

            <div className="pt-8 text-center">
              <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--foreground)]">
                {product.name}
              </p>

              <p className="mt-2 text-[11px] text-[var(--foreground)]">Select size</p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {sizes.map((size) => {
                  const active = selectedSize === size;

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setAddedMessage("");
                      }}
                      className={`min-w-[38px] rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.05em] ${
                        active
                          ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                          : "border-[var(--border)] text-[var(--foreground)]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[18px] text-[var(--foreground)]"
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <div className="inline-flex min-w-[44px] items-center justify-center rounded-full border border-[var(--border)] px-3 py-2 text-[11px] text-[var(--foreground)]">
                  {quantity}
                </div>

                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[18px] text-[var(--foreground)]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={addSelectedToCart}
                className="mt-4 inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2 text-[11px] uppercase tracking-[0.08em] text-[var(--background)]"
              >
                <CartIcon className="h-4 w-4" />
                Cart
              </button>

              {addedMessage ? (
                <p className="mt-3 text-[11px] text-[var(--foreground)]">{addedMessage}</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(ProductCard);
