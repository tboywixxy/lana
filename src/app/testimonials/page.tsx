"use client";

import { useState } from "react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amaka O.",
    role: "Lagos",
    quote:
      "I ordered a bag and sandals from LANA and the quality was honestly better than I expected. Delivery was quick too.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Sade K.",
    role: "Abuja",
    quote:
      "The product looked exactly like the pictures. Packaging was neat and customer support responded really fast.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Temi A.",
    role: "Port Harcourt",
    quote:
      "Love the simple checkout process. I tracked my order easily and got updates without stress.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Femi D.",
    role: "Ibadan",
    quote:
      "Bought a watch as a gift and it looked premium in person. Definitely ordering again for myself.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function TestimonialsPage() {
  const [activeImage, setActiveImage] = useState<null | {
    src: string;
    alt: string;
  }>(null);

  return (
    <>
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-8">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d9a441]">
              Testimonials
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What customers are saying
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Real feedback from shoppers who have ordered from LANA Store.
              Tap any photo to view it in full size.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
              >
                <button
                  type="button"
                  className="block w-full"
                  onClick={() =>
                    setActiveImage({
                      src: item.image,
                      alt: `${item.name} testimonial photo`,
                    })
                  }
                  aria-label={`View ${item.name} image`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <Image
                      src={item.image}
                      alt={`${item.name} testimonial photo`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition duration-300 hover:scale-[1.03]"
                    />
                  </div>
                </button>

                <div className="p-4">
                  <h2 className="text-base font-semibold">{item.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#d9a441]">
                    {item.role}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70">“{item.quote}”</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[120] bg-black/85 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Testifier image preview"
          onClick={() => setActiveImage(null)}
        >
          <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-center">
            <button
              type="button"
              className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl text-white"
              aria-label="Close image preview"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            <div className="relative h-[75vh] w-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
