"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

function formatPostedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function joinMeta(role: string, city: string) {
  return [role, city].filter(Boolean).join(" | ");
}

function wrapIndex(index: number, length: number) {
  if (length === 0) return 0;
  return (index + length) % length;
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl text-[var(--foreground)] sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function SliderControls({
  count,
  activeIndex,
  onPrevious,
  onNext,
  onSelect,
}: {
  count: number;
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  if (count <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={onPrevious}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_92%,transparent)] text-[var(--foreground)]"
        aria-label="Show previous testimonial"
      >
        <ArrowIcon direction="left" />
      </button>

      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelect(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                isActive
                  ? "bg-[var(--foreground)]"
                  : "bg-[color:color-mix(in_srgb,var(--foreground)_24%,transparent)]"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_92%,transparent)] text-[var(--foreground)]"
        aria-label="Show next testimonial"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

function TestimonialMeta({ item }: { item: Testimonial }) {
  const meta = joinMeta(item.role, item.city);

  return (
    <div>
      <h3 className="text-base font-semibold text-[var(--foreground)]">
        {item.name}
      </h3>
      {meta ? (
        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
          {meta}
        </p>
      ) : null}
    </div>
  );
}

function TextTestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = wrapIndex(activeIndex, testimonials.length);
  const activeItem = testimonials[safeIndex];

  if (!activeItem) {
    return null;
  }

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="What They Said"
        title="Text-first testimonials"
      />

      <article className="mx-auto flex w-full max-w-3xl flex-col items-center rounded-[2rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_92%,transparent)] px-6 py-8 text-center shadow-[var(--shadow)] backdrop-blur-sm sm:px-10 sm:py-10">
        <p className="text-lg leading-8 text-[var(--foreground)] sm:text-2xl sm:leading-10">
          &ldquo;{activeItem.quote || activeItem.statusText}&rdquo;
        </p>

        <div className="mt-6 space-y-2">
          <TestimonialMeta item={activeItem} />
          <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
            {formatPostedAt(activeItem.publishedAt)}
          </p>
        </div>
      </article>

      <SliderControls
        count={testimonials.length}
        activeIndex={safeIndex}
        onPrevious={() =>
          setActiveIndex((current) => wrapIndex(current - 1, testimonials.length))
        }
        onNext={() =>
          setActiveIndex((current) => wrapIndex(current + 1, testimonials.length))
        }
        onSelect={setActiveIndex}
      />
    </section>
  );
}

function ImageTestimonialsSlider({
  testimonials,
  onOpen,
}: {
  testimonials: Testimonial[];
  onOpen: (index: number) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOverlayText, setShowOverlayText] = useState(true);
  const safeIndex = wrapIndex(activeIndex, testimonials.length);
  const activeItem = testimonials[safeIndex];

  if (!activeItem) {
    return null;
  }

  return (
    <section className="space-y-6 pt-4 sm:pt-8">
      <SectionHeader eyebrow="With Photos" title="Image testimonials" />

      <article className="group mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_88%,transparent)] shadow-[var(--shadow)] backdrop-blur-sm">
        <div className="block w-full text-left">
          <div className="relative aspect-[4/5] overflow-hidden">
            {activeItem.image ? (
              <Image
                src={activeItem.image}
                alt={`${activeItem.name} testimonial`}
                fill
                sizes="(max-width: 640px) 100vw, 420px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : null}

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.05)_20%,rgba(8,8,8,0.8)_100%)]" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
              <div className="rounded-full border border-white/18 bg-black/30 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-white/84 backdrop-blur-md">
                {activeItem.city || activeItem.name}
              </div>
              <div className="rounded-full border border-white/18 bg-black/30 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                {formatPostedAt(activeItem.publishedAt)}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowOverlayText((current) => !current)}
              className="absolute inset-0 z-10"
              aria-label={
                showOverlayText ? "Hide testimonial text" : "Show testimonial text"
              }
            />

            <div
              className={`absolute inset-x-0 bottom-0 z-20 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.28)_24%,rgba(0,0,0,0.86)_100%)] px-5 pb-5 pt-12 text-white transition duration-300 ${
                showOverlayText
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <div className="space-y-3">
                {activeItem.statusText ? (
                  <p className="max-w-[24ch] text-lg leading-7">
                    {activeItem.statusText}
                  </p>
                ) : null}

                {activeItem.quote ? (
                  <p className="max-w-[28ch] text-sm leading-6 text-white/84">
                    &ldquo;{activeItem.quote}&rdquo;
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-3 px-5 pb-5 pt-4 text-center text-[var(--foreground)]">
            <TestimonialMeta item={activeItem} />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => onOpen(safeIndex)}
                className="inline-flex min-h-[38px] items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--foreground)]"
                aria-label={`Open ${activeItem.name}'s testimonial`}
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </article>

      <SliderControls
        count={testimonials.length}
        activeIndex={safeIndex}
        onPrevious={() => {
          setShowOverlayText(true);
          setActiveIndex((current) => wrapIndex(current - 1, testimonials.length));
        }}
        onNext={() => {
          setShowOverlayText(true);
          setActiveIndex((current) => wrapIndex(current + 1, testimonials.length));
        }}
        onSelect={(index) => {
          setShowOverlayText(true);
          setActiveIndex(index);
        }}
      />
    </section>
  );
}

export default function TestimonialsClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const textTestimonials = useMemo(
    () => testimonials.filter((item) => !item.image),
    [testimonials]
  );
  const imageTestimonials = useMemo(
    () => testimonials.filter((item) => Boolean(item.image)),
    [testimonials]
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const activeImageTestimonial =
    activeImageIndex === null ? null : imageTestimonials[activeImageIndex];

  const closeViewer = () => {
    setActiveImageIndex(null);
  };

  const showPrevious = () => {
    setActiveImageIndex((current) => {
      if (current === null) {
        return current;
      }

      return wrapIndex(current - 1, imageTestimonials.length);
    });
  };

  const showNext = () => {
    setActiveImageIndex((current) => {
      if (current === null) {
        return current;
      }

      return wrapIndex(current + 1, imageTestimonials.length);
    });
  };

  useEffect(() => {
    if (activeImageIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
      }

      if (event.key === "ArrowLeft") {
        setActiveImageIndex((current) => {
          if (current === null) {
            return current;
          }

          return wrapIndex(current - 1, imageTestimonials.length);
        });
      }

      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) => {
          if (current === null) {
            return current;
          }

          return wrapIndex(current + 1, imageTestimonials.length);
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImageIndex, imageTestimonials.length]);

  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_34%),linear-gradient(180deg,color-mix(in_srgb,var(--background)_78%,#20180a)_0%,var(--background)_56%,color-mix(in_srgb,var(--background)_92%,#000)_100%)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--foreground)_6%,transparent),transparent)]" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
          {textTestimonials.length > 0 ? (
            <TextTestimonialsSlider testimonials={textTestimonials} />
          ) : null}

          {imageTestimonials.length > 0 ? (
            <ImageTestimonialsSlider
              testimonials={imageTestimonials}
              onOpen={setActiveImageIndex}
            />
          ) : null}

          {testimonials.length === 0 ? <div className="h-10" /> : null}
        </div>
      </section>

      {activeImageTestimonial ? (
        <div
          className="fixed inset-0 z-[140] bg-black/88"
          role="dialog"
          aria-modal="true"
          aria-label="Testimonial viewer"
          onClick={closeViewer}
        >
          <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center px-3 py-4 sm:px-6 sm:py-6">
            <div
              className="relative flex h-full w-full items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeViewer}
                className="absolute right-2 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/30 text-sm uppercase tracking-[0.18em] text-white/88 backdrop-blur-md sm:right-8"
                aria-label="Close testimonial viewer"
              >
                X
              </button>

              {imageTestimonials.length > 1 ? (
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-2 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-black/35 text-white backdrop-blur-md sm:left-8"
                  aria-label="View previous testimonial"
                >
                  <ArrowIcon direction="left" />
                </button>
              ) : null}

              <div className="relative h-full w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:max-w-lg">
                {activeImageTestimonial.image ? (
                  <>
                    <Image
                      src={activeImageTestimonial.image}
                      alt={`${activeImageTestimonial.name} testimonial`}
                      fill
                      sizes="100vw"
                      preload
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.08)_35%,rgba(0,0,0,0.84)_100%)]" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_16%,#111),#111)]" />
                )}

                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-6 sm:px-6">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {activeImageTestimonial.name}
                    </p>
                    {joinMeta(
                      activeImageTestimonial.role,
                      activeImageTestimonial.city
                    ) ? (
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
                        {joinMeta(
                          activeImageTestimonial.role,
                          activeImageTestimonial.city
                        )}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/54">
                    {formatPostedAt(activeImageTestimonial.publishedAt)}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-10 space-y-4 px-5 pb-6 sm:px-6">
                  {activeImageTestimonial.statusText ? (
                    <p className="max-w-[28ch] text-xl leading-7 text-white sm:text-2xl">
                      {activeImageTestimonial.statusText}
                    </p>
                  ) : null}
                  {activeImageTestimonial.quote ? (
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/28 p-4 backdrop-blur-md">
                      <p className="text-sm leading-7 text-white/78">
                        &ldquo;{activeImageTestimonial.quote}&rdquo;
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              {imageTestimonials.length > 1 ? (
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-2 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-black/35 text-white backdrop-blur-md sm:right-8"
                  aria-label="View next testimonial"
                >
                  <ArrowIcon direction="right" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
