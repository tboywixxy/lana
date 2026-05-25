"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { useSearch } from "@/components/SearchContext";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";

function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
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

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { products } = useSearch();
  const [open, setOpen] = useState(false);
  const isProductsPage = pathname === "/";

  function closeMenu() {
    setOpen(false);
  }

  const linkBase =
    "text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]";
  const activeLink = "text-sm font-medium text-[var(--foreground)]";

  const mobileItemBase =
    "rounded-2xl border border-[var(--border)] bg-[var(--card-soft)] px-4 py-3 text-sm transition-colors";

  return (
    <header className="navbar-shell sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div
        className="navbar-inner mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="shrink-0" onClick={closeMenu}>
          <Image
            src="/lana-logo-transparent.png"
            alt="LANA logo"
            width={120}
            height={52}
            className="navbar-logo w-auto rounded-md object-contain"
          />
        </Link>

        {isProductsPage && products.length > 0 && (
          <div className="hidden flex-1 md:block md:px-4 animate-in fade-in slide-in-from-left duration-500">
            <SearchBar products={products} onResults={() => {}} />
          </div>
        )}

        <nav className="navbar-nav hidden items-center md:flex">
          <Link href="/" className={pathname === "/" ? activeLink : linkBase}>
            Products
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

        <div className="flex items-center gap-1.5 md:hidden">
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center text-[var(--foreground)]"
            aria-label="Open cart"
          >
            <CartIcon />
            <span className="absolute right-0.5 top-0.5 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-semibold text-[var(--accent-foreground)]">
              {cartCount}
            </span>
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-[var(--foreground)]"
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
      </div>

      {isProductsPage && products.length > 0 && (
        <div className="border-t border-[var(--border)] px-4 py-3 md:hidden animate-in slide-in-from-top duration-500">
          <SearchBar products={products} onResults={() => {}} />
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/45 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 h-screen w-80 transform border-r border-[var(--border)] bg-[var(--card)] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full min-h-screen flex-col bg-[var(--card)] px-6 py-6">
          <div className="mb-8 flex items-center justify-between gap-4">
            <ThemeToggle />

            <button
              type="button"
              onClick={closeMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)]"
              aria-label="Close menu"
            >
              <span className="text-xl leading-none">×</span>
            </button>
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
