"use client";

import { memo } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/products";

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

  function handleAddToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  }

  return (
    <article
      className="group overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03] transition hover:border-white/20 hover:bg-white/[0.05]"
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="block w-full text-left"
      >
        <div className="relative aspect-[4/3.3] w-full overflow-hidden bg-black">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            {product.category}
          </p>

          <h3 className="line-clamp-1 text-[15px] font-medium sm:text-base">
            {product.name}
          </h3>

          <p className="mt-2 text-sm font-semibold sm:text-base">
            ₦{product.price.toLocaleString()}
          </p>
        </div>
      </button>

      <div className="flex gap-2 px-4 pb-4">
        <button
          type="button"
          onClick={() => onOpen(index)}
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full border border-white/10 px-4 text-xs font-semibold text-white/85 transition hover:bg-white/5 sm:text-sm"
        >
          View item
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex min-h-10 flex-1 items-center justify-center rounded-full bg-[#d9a441] px-4 text-xs font-semibold text-white transition hover:opacity-90 sm:text-sm"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default memo(ProductCard);