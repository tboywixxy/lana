"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<null | {
    orderId: string;
    trackingCode: string;
  }>(null);

  const orderItems = useMemo(() => {
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));
  }, [items]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!items.length) return;

    try {
      setLoading(true);

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          items: orderItems,
          amountPaid: cartTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to place order");
      }

      setSuccess({
        orderId: data.orderId,
        trackingCode: data.trackingCode,
      });

      clearCart();
      setForm({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        note: "",
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!items.length && !success) {
    return (
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center sm:px-8">
            <h2 className="text-2xl font-semibold">No items in cart</h2>
            <p className="mt-3 text-white/60">Add products first before checkout.</p>
            <Link
              href="/"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#d9a441] px-6 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Go to products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9a441]">
            Checkout
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Complete your order
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            No account needed. Just enter your details and place your order.
          </p>
        </div>

        {success ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center sm:px-8">
            <h2 className="text-2xl font-semibold">Order placed successfully</h2>
            <p className="mt-3 text-white/60">Your order has been received.</p>

            <div className="mt-6 space-y-2 text-sm sm:text-base">
              <p>
                <strong>Order ID:</strong> {success.orderId}
              </p>
              <p>
                <strong>Tracking Code:</strong> {success.trackingCode}
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/track-order"
                className="flex min-h-12 items-center justify-center rounded-full bg-[#d9a441] px-6 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Track order
              </Link>
              <Link
                href="/"
                className="flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Back to store
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_360px]">
            <form
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#d9a441]/60"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#d9a441]/60"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#d9a441]/60"
                  />
                </div>

              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  rows={4}
                  required
                  value={form.address}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, address: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#d9a441]/60"
                />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <label htmlFor="note" className="text-sm font-medium">
                  Order Note (Optional)
                </label>
                <textarea
                  id="note"
                  rows={3}
                  value={form.note}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, note: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#d9a441]/60"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-[#d9a441] px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Processing..." : "Place order"}
              </button>
            </form>

            <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold">Order summary</h2>

              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-white/75">
                      {item.name} × {item.quantity}
                    </span>
                    <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold">
                <span>Total</span>
                <span>₦{cartTotal.toLocaleString()}</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}