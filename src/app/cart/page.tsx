"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Cart
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your selected items
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Review your order and move to checkout when you are ready.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] px-6 py-12 text-center shadow-[var(--shadow)] sm:px-8">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-3 text-[var(--muted)]">
              Add items from the store to continue.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--foreground)] px-6 text-sm font-semibold text-[var(--background)] hover:opacity-92"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_360px]">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid h-[112px] gap-3 rounded-[1.1rem] border border-[var(--border)] bg-[var(--card)] p-3 shadow-sm grid-cols-[64px_minmax(0,1fr)]"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-[0.8rem] bg-[var(--surface)]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-medium text-[var(--foreground)]">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          ₦{item.price.toLocaleString()} | {item.size}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="shrink-0 text-[11px] text-red-500 hover:opacity-80"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--background)] px-1.5 py-1">
                        <button
                          type="button"
                          className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-[var(--foreground)] hover:bg-[var(--card-soft)]"
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                        >
                          -
                        </button>

                        <span className="min-w-4 text-center text-xs font-semibold text-[var(--foreground)]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-[var(--foreground)] hover:bg-[var(--card-soft)]"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-[var(--foreground)]">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[1.8rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[var(--shadow)] lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                Order summary
              </h2>

              <div className="mt-5 flex items-center justify-between border-b border-[var(--border)] py-3 text-sm">
                <span className="text-[var(--muted)]">Selected items</span>
                <span className="text-[var(--foreground)]">{cartCount}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--border)] py-4 text-base font-semibold">
                <span>Total</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href="/checkout"
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--foreground)] px-6 text-sm font-semibold text-[var(--background)] hover:opacity-92"
                >
                  Proceed to checkout
                </Link>
                <Link
                  href="/"
                  className="flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] px-6 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--card-soft)]"
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
