"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060606]/85 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" onClick={closeMenu}>
          <Image
            src="/logo.jpg"
            alt="LANA logo"
            width={120}
            height={52}
            className="h-10 w-auto object-contain sm:h-11"
          />
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#d9a441] md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={`text-sm transition ${
              pathname === "/" ? "text-[#d9a441]" : "text-[#d9a441] hover:opacity-80"
            }`}
          >
            Products
          </Link>

          <Link
            href="/track-order"
            className={`text-sm transition ${
              pathname === "/track-order"
                ? "text-[#d9a441]"
                : "text-[#d9a441] hover:opacity-80"
            }`}
          >
            Track Order
          </Link>

          <Link
            href="/testimonials"
            className={`text-sm transition ${
              pathname === "/testimonials"
                ? "text-[#d9a441]"
                : "text-[#d9a441] hover:opacity-80"
            }`}
          >
            Testimonials
          </Link>

          <Link
            href="/cart"
            className={`inline-flex items-center gap-2 text-sm transition ${
              pathname === "/cart"
                ? "text-[#d9a441]"
                : "text-[#d9a441] hover:opacity-80"
            }`}
          >
            <span>Cart</span>
            <span className="inline-flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#d9a441] px-1.5 text-[11px] font-semibold text-white">
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0b0b0b] px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <Link
              href="/"
              onClick={closeMenu}
              className={`rounded-xl px-3 py-3 text-sm transition ${
                pathname === "/" ? "bg-white/5 text-[#d9a441]" : "text-[#d9a441]"
              }`}
            >
              Products
            </Link>

            <Link
              href="/track-order"
              onClick={closeMenu}
              className={`rounded-xl px-3 py-3 text-sm transition ${
                pathname === "/track-order"
                  ? "bg-white/5 text-[#d9a441]"
                  : "text-[#d9a441]"
              }`}
            >
              Track Order
            </Link>

            <Link
              href="/testimonials"
              onClick={closeMenu}
              className={`rounded-xl px-3 py-3 text-sm transition ${
                pathname === "/testimonials"
                  ? "bg-white/5 text-[#d9a441]"
                  : "text-[#d9a441]"
              }`}
            >
              Testimonials
            </Link>

            <Link
              href="/cart"
              onClick={closeMenu}
              className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${
                pathname === "/cart" ? "bg-white/5 text-[#d9a441]" : "text-[#d9a441]"
              }`}
            >
              <span>Cart</span>
              <span className="inline-flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#d9a441] px-1.5 text-[11px] font-semibold text-white">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}