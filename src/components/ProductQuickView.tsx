"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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

export default function ProductQuickView({
  products,
  selectedIndex,
  open,
  onClose,
}: {
  products: Product[];
  selectedIndex: number;
  open: boolean;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const product = products[selectedIndex];

  const images = useMemo(() => {
    if (!product) return [];
    return product.gallery?.length ? product.gallery : [product.image];
  }, [product]);

  const sizes = useMemo(() => {
    if (!product) return [];
    return product.sizes?.length ? product.sizes : ["S", "M", "L"];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    if (open) {
      setActiveImageIndex(0);
      setSelectedSize(null);
      setQuantity(1);
      setAddedMessage("");
    }
  }, [open, selectedIndex]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();

      if (images.length > 1) {
        if (event.key === "ArrowLeft") {
          setActiveImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          );
        }

        if (event.key === "ArrowRight") {
          setActiveImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, images.length]);

  useEffect(() => {
    if (addedMessage !== "Added to cart") return;

    const timer = window.setTimeout(() => setAddedMessage(""), 4000);
    return () => window.clearTimeout(timer);
  }, [addedMessage]);

  if (!product) return null;

  const activeImage = images[activeImageIndex];

  function handlePrevImage() {
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNextImage() {
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function handleAddToCart() {
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
  }

  return (
    <div
      className={`fixed inset-0 z-[120] transition duration-200 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-[color:color-mix(in_srgb,var(--background)_98%,transparent)]"
        aria-label="Close preview"
      />

      <div className="relative z-10 flex h-screen w-full items-center justify-center px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center border border-[var(--border)] text-[24px] font-semibold leading-none text-[var(--foreground)] sm:left-5 sm:top-4"
          aria-label="Back"
        >
          ‹
        </button>

        <div className="flex w-full max-w-[920px] flex-col items-center">
          <div className="relative flex w-full items-center justify-center">
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-0 top-1/2 z-20 -translate-y-1/2 border border-[var(--border)] px-3 py-3 text-[24px] font-semibold leading-none text-[var(--foreground)] sm:left-4"
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            <div className="relative w-full max-w-[170px] sm:max-w-[210px] md:max-w-[250px] lg:max-w-[290px]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 52vw, (max-width: 1024px) 28vw, 290px"
                  className="object-contain object-center"
                />
              </div>
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-0 top-1/2 z-20 -translate-y-1/2 border border-[var(--border)] px-3 py-3 text-[24px] font-semibold leading-none text-[var(--foreground)] sm:right-4"
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {images.map((_, index) => {
                const active = index === activeImageIndex;

                return (
                  <button
                    key={`${product.id}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`h-2 w-2 rounded-full transition ${
                      active
                        ? "bg-[var(--foreground)]"
                        : "bg-[color:color-mix(in_srgb,var(--foreground)_22%,transparent)] hover:bg-[color:color-mix(in_srgb,var(--foreground)_45%,transparent)]"
                    }`}
                  />
                );
              })}
            </div>
          )}

          <div className="mt-5 flex w-full max-w-[360px] flex-col items-center text-center">
            <h2 className="text-[11px] uppercase tracking-[0.08em] text-[var(--foreground)]">
              {product.name}
            </h2>

            <p className="mt-3 text-[11px] text-[var(--foreground)]">
              ₦{product.price.toLocaleString()}
            </p>

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
                    className={`min-w-[38px] border px-3 py-2 text-[11px] uppercase tracking-[0.05em] ${
                      active
                        ? "border-[var(--foreground)] text-[var(--foreground)]"
                        : "border-[var(--border)] text-[var(--foreground)]"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

              {addedMessage ? (
                <p className="mt-3 text-[11px] text-[var(--foreground)]">
                  {addedMessage}
                </p>
              ) : null}
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="inline-flex h-8 w-8 items-center justify-center border border-[var(--border)] text-[18px] text-[var(--foreground)]"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <div className="inline-flex min-w-[44px] items-center justify-center border border-[var(--border)] px-3 py-2 text-[11px] text-[var(--foreground)]">
                {quantity}
              </div>

              <button
                type="button"
                onClick={() => setQuantity((prev) => prev + 1)}
                className="inline-flex h-8 w-8 items-center justify-center border border-[var(--border)] text-[18px] text-[var(--foreground)]"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-4 inline-flex min-h-[38px] items-center justify-center gap-2 border border-[var(--foreground)] px-5 py-2 text-[11px] uppercase tracking-[0.08em] text-[var(--foreground)]"
            >
              <CartIcon className="h-4 w-4" />
              Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}