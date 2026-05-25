"use client";

import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const product = products[selectedIndex];

  if (!product) return null;

  return (
    <ProductQuickViewBody
      key={`${product.id}-${selectedIndex}-${open ? "open" : "closed"}`}
      product={product}
      open={open}
      onClose={onClose}
    />
  );
}

function ProductQuickViewBody({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const { addToCart } = useCart();

  const images = useMemo(() => {
    return product.gallery?.length ? product.gallery : [product.image];
  }, [product]);

  const sizes = useMemo(() => {
    return product.sizes?.length ? product.sizes : ["S", "M", "L"];
  }, [product]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{
    pointerX: number;
    pointerY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const dragMovedRef = useRef(false);

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

  function resetZoom() {
    setIsZoomed(false);
    setPanPosition({ x: 0, y: 0 });
    setDragStart(null);
    dragMovedRef.current = false;
  }

  function handlePrevImage() {
    if (images.length <= 1) return;
    resetZoom();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNextImage() {
    if (images.length <= 1) return;
    resetZoom();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  function handleZoomToggle() {
    if (isZoomed) {
      resetZoom();
      return;
    }

    setIsZoomed(true);
    setPanPosition({ x: 0, y: 0 });
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!isZoomed) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragMovedRef.current = false;
    setDragStart({
      pointerX: event.clientX,
      pointerY: event.clientY,
      originX: panPosition.x,
      originY: panPosition.y,
    });
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!dragStart || !isZoomed) return;

    const deltaX = event.clientX - dragStart.pointerX;
    const deltaY = event.clientY - dragStart.pointerY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      dragMovedRef.current = true;
    }

    const nextX = dragStart.originX + deltaX;
    const nextY = dragStart.originY + deltaY;

    setPanPosition({
      x: Math.max(-150, Math.min(150, nextX)),
      y: Math.max(-180, Math.min(180, nextY)),
    });
  }

  function handlePointerUp() {
    setDragStart(null);
  }

  function handleImageClick() {
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }

    handleZoomToggle();
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

      <div className="relative z-10 flex h-screen items-center justify-center overflow-hidden px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="fixed left-3 top-3 z-20 inline-flex min-h-10 items-center justify-center border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--background)_92%,transparent)] px-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--foreground)] sm:left-5 sm:top-4"
          aria-label="Back"
        >
          Back
        </button>

        <div className="mx-auto grid max-h-[calc(100vh-3.5rem)] w-full max-w-[940px] grid-cols-1 gap-6 overflow-y-auto overflow-x-hidden px-1 py-12 sm:gap-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)] lg:items-center lg:overflow-hidden lg:px-0 lg:py-0">
          <div className="w-full">
            <div className="relative flex w-full items-center justify-center">
              {images.length > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-0 top-1/2 z-20 -translate-y-1/2 border border-[var(--border)] px-3 py-3 text-[24px] font-semibold leading-none text-[var(--foreground)]"
                  aria-label="Previous image"
                >
                  &lt;
                </button>
              ) : null}

              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px]">
                <button
                  type="button"
                  onClick={handleImageClick}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  className={`relative aspect-[4/5] w-full overflow-hidden ${
                    isZoomed ? "cursor-grab touch-none" : "cursor-zoom-in"
                  }`}
                  aria-label={isZoomed ? "Zoom out image" : "Zoom in image"}
                >
                  <Image
                    src={images[activeImageIndex]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 380px"
                    className="object-contain object-center transition duration-300"
                    style={{
                      transform: isZoomed
                        ? `translate(${panPosition.x}px, ${panPosition.y}px) scale(1.7)`
                        : "translate(0px, 0px) scale(1)",
                    }}
                  />
                </button>
              </div>

              {images.length > 1 ? (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-0 top-1/2 z-20 -translate-y-1/2 border border-[var(--border)] px-3 py-3 text-[24px] font-semibold leading-none text-[var(--foreground)]"
                  aria-label="Next image"
                >
                  &gt;
                </button>
              ) : null}
            </div>

            {images.length > 1 ? (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {images.map((_, index) => {
                  const active = index === activeImageIndex;

                  return (
                    <button
                      key={`${product.id}-${index}`}
                      type="button"
                      onClick={() => {
                        resetZoom();
                        setActiveImageIndex(index);
                      }}
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
            ) : null}

            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.08em] text-[var(--muted)]">
              {isZoomed ? "Drag image to explore | tap to zoom out" : "Tap image to zoom in"}
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[360px] flex-col items-center justify-center self-center pb-4 text-center lg:pb-0">
            <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-3 text-[11px] text-[var(--foreground)]">
              <h2 className="uppercase tracking-[0.08em] text-[var(--foreground)]">
                {product.name}
              </h2>
              <span aria-hidden="true" className="text-[var(--border)]">
                |
              </span>
              <p>₦{product.price.toLocaleString()}</p>
            </div>

            <div className="mt-5 flex w-full max-w-[280px] flex-col items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.05em] text-[var(--foreground)]">
                Size
              </span>

              <div className="flex w-full flex-wrap items-center justify-center gap-2">
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
                      className={`min-w-[36px] border px-3 py-2 text-[10px] uppercase tracking-[0.05em] ${
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
            </div>

            <div className="mt-5 flex w-full max-w-[280px] flex-col items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.05em] text-[var(--foreground)]">
                Qty
              </span>

              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="inline-flex h-8 w-8 items-center justify-center border border-[var(--border)] text-[18px] text-[var(--foreground)]"
                  aria-label="Decrease quantity"
                >
                  -
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
            </div>

            {addedMessage ? (
              <p className="mt-4 text-[11px] text-[var(--foreground)]">
                {addedMessage}
              </p>
            ) : null}

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-5 inline-flex min-h-[40px] items-center justify-center gap-2 border border-[var(--foreground)] px-6 py-2 text-[11px] uppercase tracking-[0.08em] text-[var(--foreground)]"
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
