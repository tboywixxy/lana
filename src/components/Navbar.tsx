"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  const linkBase =
    "text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]";
  const activeLink = "text-sm font-medium text-[var(--foreground)]";

  const mobileItemBase =
    "rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] px-4 py-3 text-sm transition-colors";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[78px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" onClick={closeMenu}>
          <Image
            src="/lana-logo-transparent.png"
            alt="LANA logo"
            width={120}
            height={52}
            className="h-10 w-auto rounded-md object-contain sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link href="/" className={pathname === "/" ? activeLink : linkBase}>
            Products
          </Link>

          <Link
            href="/track-order"
            className={pathname === "/track-order" ? activeLink : linkBase}
          >
            Track Order
          </Link>

          <Link
            href="/testimonials"
            className={pathname === "/testimonials" ? activeLink : linkBase}
          >
            Testimonials
          </Link>

          <Link
            href="/cart"
            className={`inline-flex items-center gap-2 ${
              pathname === "/cart" ? activeLink : linkBase
            }`}
          >
            <span>Cart</span>
            <span className="inline-flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-[11px] font-semibold text-[var(--accent-foreground)]">
              {cartCount}
            </span>
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center text-[var(--foreground)] md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <div className="relative flex h-6 w-6 items-center justify-center">
            <span
              className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/45 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 h-screen w-80 transform border-r border-[var(--border)] bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden dark:bg-neutral-950 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full min-h-screen flex-col bg-white px-6 py-6 dark:bg-neutral-950">
          <div className="mb-8">
            <ThemeToggle />
          </div>

          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={closeMenu}
              className={`${mobileItemBase} ${
                pathname === "/"
                  ? "text-[var(--foreground)] ring-1 ring-[var(--foreground)]/10"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Products
            </Link>

            <Link
              href="/track-order"
              onClick={closeMenu}
              className={`${mobileItemBase} ${
                pathname === "/track-order"
                  ? "text-[var(--foreground)] ring-1 ring-[var(--foreground)]/10"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Track Order
            </Link>

            <Link
              href="/testimonials"
              onClick={closeMenu}
              className={`${mobileItemBase} ${
                pathname === "/testimonials"
                  ? "text-[var(--foreground)] ring-1 ring-[var(--foreground)]/10"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Testimonials
            </Link>

            <Link
              href="/cart"
              onClick={closeMenu}
              className={`${mobileItemBase} flex items-center justify-between ${
                pathname === "/cart"
                  ? "text-[var(--foreground)] ring-1 ring-[var(--foreground)]/10"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <span>Cart</span>
              <span className="inline-flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-[11px] font-semibold text-[var(--accent-foreground)]">
                {cartCount}
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}