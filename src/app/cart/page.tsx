"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9a441]">
            Cart
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your selected items
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Review your order before checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center sm:px-8">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-3 text-white/60">Add items from the store to continue.</p>
            <Link
              href="/"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#d9a441] px-6 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_360px]">
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-black sm:h-[120px] sm:w-[120px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="mt-2 text-white/60">₦{item.price.toLocaleString()}</p>

                    <div className="mt-4 inline-flex items-center gap-3">
                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>

                      <span className="min-w-5 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col gap-3 sm:min-w-[110px] sm:items-end">
                    <p className="text-base font-semibold">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      type="button"
                      className="text-sm text-red-400 transition hover:text-red-300"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold">Order summary</h2>

              <div className="mt-5 flex items-center justify-between border-b border-white/10 py-3 text-sm">
                <span className="text-white/70">Total items</span>
                <span>{cartCount}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 py-4 text-base font-semibold">
                <span>Total</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href="/checkout"
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9a441] px-6 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Proceed to checkout
                </Link>
                <Link
                  href="/"
                  className="flex min-h-12 w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Keep shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}