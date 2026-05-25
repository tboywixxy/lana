import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative px-4 pb-3 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80"
          alt="Gym equipment background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl rounded-3xl border border-white/10 bg-white/[0.02] px-4 py-4 backdrop-blur-sm sm:px-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9a441]">
            LANA Store
          </p>

          <p className="rounded-full border border-[#d9a441]/10 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]/85 backdrop-blur-sm">
            Scroll to focus products
          </p>
        </div>

        <div className="mt-4 overflow-hidden text-center transition-all duration-500 ease-out">
          <h1 className="text-4xl font-semibold leading-none tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Elegant shopping made simple
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
            A clean online store for premium fashion, accessories and lifestyle pieces
            with smooth checkout and no stress.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
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
    </section>
  );
}
