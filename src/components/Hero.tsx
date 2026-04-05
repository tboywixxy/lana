"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setCollapsed(true);
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section className="relative px-4 pb-4 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pt-8">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80"
          alt="Gym equipment background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl rounded-3xl border border-white/10 bg-white/[0.02] px-4 py-4 sm:px-5 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9a441]">
            LANA Store
          </p>

          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#d9a441]/10 bg-white/10 px-4 text-xs font-semibold text-[#d9a441]/85 backdrop-blur-sm transition hover:bg-[#d9a441]/5"
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand hero" : "Collapse hero"}
          >
            {collapsed ? "Show hero" : "Hide hero"}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-out text-center ${
            collapsed
              ? "mt-0 max-h-0 -translate-y-2 opacity-0"
              : "mt-4 max-h-[250px] translate-y-0 opacity-100"
          }`}
        >
          <div>
            <h1 className="text-4xl font-semibold leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Elegant shopping made simple
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-sm leading-7 text-white/90 sm:text-base">
              A clean online store for premium fashion, accessories and lifestyle
              pieces with smooth checkout and no stress.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row justify-center">
              <Link
                href="#products"
                className="flex min-h-12 items-center justify-center rounded-full bg-[#d9a441] px-6 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Shop now
              </Link>
              <Link
                href="/track-order"
                className="flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Track order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}