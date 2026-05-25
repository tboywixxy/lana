"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
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

function CarouselShell({
  children,
  onPrevious,
  onNext,
  showControls,
}: {
  children: React.ReactNode;
  onPrevious: () => void;
  onNext: () => void;
  showControls: boolean;
}) {
  return (
    <section className="space-y-4">
      <div className="flex justify-center gap-2">
        {showControls ? (
          <>
            <button
              type="button"
              onClick={onPrevious}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_90%,transparent)] text-[var(--foreground)] shadow-sm transition duration-300 hover:-translate-x-0.5 hover:bg-[var(--card)]"
              aria-label="Show previous testimonials"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_90%,transparent)] text-[var(--foreground)] shadow-sm transition duration-300 hover:translate-x-0.5 hover:bg-[var(--card)]"
              aria-label="Show next testimonials"
            >
              <ArrowIcon direction="right" />
            </button>
          </>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function InfiniteTrack({
  items,
  cloneCount,
  cardClassName,
  renderItem,
}: {
  items: Testimonial[];
  cloneCount: number;
  cardClassName: string;
  renderItem: (item: Testimonial, logicalIndex: number) => React.ReactNode;
}) {
  const normalizedCloneCount = Math.min(cloneCount, Math.max(items.length, 1));
  const leadItems = items.slice(-normalizedCloneCount);
  const tailItems = items.slice(0, normalizedCloneCount);
  const displayItems = [...leadItems, ...items, ...tailItems];
  const [currentIndex, setCurrentIndex] = useState(normalizedCloneCount);
  const [stepWidth, setStepWidth] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;

      const sampleCard = track.querySelector<HTMLElement>("[data-carousel-card]");
      if (!sampleCard) return;

      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
      setStepWidth(sampleCard.offsetWidth + gap);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  useEffect(() => {
    if (!transitionEnabled) {
      const frame = window.requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, [transitionEnabled]);

  const showControls = items.length > 1;

  function handlePrevious() {
    if (!showControls) return;
    setCurrentIndex((current) => current - 1);
  }

  function handleNext() {
    if (!showControls) return;
    setCurrentIndex((current) => current + 1);
  }

  function handleTransitionEnd() {
    if (items.length === 0) return;

    if (currentIndex < normalizedCloneCount) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex + items.length);
      return;
    }

    if (currentIndex >= items.length + normalizedCloneCount) {
      setTransitionEnabled(false);
      setCurrentIndex(currentIndex - items.length);
    }
  }

  return (
    <CarouselShell
      onPrevious={handlePrevious}
      onNext={handleNext}
      showControls={showControls}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className={`flex gap-3 will-change-transform ${
            transitionEnabled ? "duration-500 ease-out" : "duration-0"
          } transition-transform`}
          style={{
            transform: `translateX(-${currentIndex * stepWidth}px)`,
          }}
        >
          {displayItems.map((item, index) => {
            const logicalIndex = wrapIndex(index - normalizedCloneCount, items.length);

            return (
              <div
                key={`${item.id}-${index}`}
                data-carousel-card
                className={`shrink-0 ${cardClassName}`}
              >
                {renderItem(item, logicalIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </CarouselShell>
  );
}

function TestimonialMeta({ item }: { item: Testimonial }) {
  const meta = joinMeta(item.role, item.city);

  return (
    <div>
      <h3 className="text-sm font-semibold text-[var(--foreground)]">
        {item.name}
      </h3>
      {meta ? (
        <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
          {meta}
        </p>
      ) : null}
    </div>
  );
}

function TextTestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <InfiniteTrack
      items={testimonials}
      cloneCount={4}
      cardClassName="w-[220px] sm:w-[205px] lg:w-[215px]"
      renderItem={(item) => (
        <article className="flex min-h-[170px] h-full flex-col justify-between rounded-[1.15rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_92%,transparent)] p-3 shadow-[var(--shadow)] backdrop-blur-sm">
          <p className="text-[12px] leading-5 text-[var(--foreground)]">
            &ldquo;{item.quote || item.statusText}&rdquo;
          </p>

          <div className="mt-3 space-y-1.5 border-t border-[color:color-mix(in_srgb,var(--border)_72%,transparent)] pt-3">
            <TestimonialMeta item={item} />
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
              {formatPostedAt(item.publishedAt)}
            </p>
          </div>
        </article>
      )}
    />
  );
}

function ImageTestimonialsCarousel({
  testimonials,
  onOpen,
}: {
  testimonials: Testimonial[];
  onOpen: (index: number) => void;
}) {
  const [hiddenOverlayIds, setHiddenOverlayIds] = useState<string[]>([]);

  function toggleOverlay(id: string) {
    setHiddenOverlayIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }

  return (
    <InfiniteTrack
      items={testimonials}
      cloneCount={4}
      cardClassName="w-[210px] sm:w-[200px] lg:w-[205px]"
      renderItem={(item, logicalIndex) => {
        const showOverlayText = !hiddenOverlayIds.includes(item.id);

        return (
          <article className="group overflow-hidden rounded-[1.15rem] border border-[var(--border)] bg-[color-mix(in_srgb,var(--card)_88%,transparent)] shadow-[var(--shadow)] backdrop-blur-sm">
            <div className="block w-full text-left">
              <div className="relative aspect-[4/5.1] overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`${item.name} testimonial`}
                    fill
                    sizes="210px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : null}

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.05)_20%,rgba(8,8,8,0.82)_100%)]" />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-2.5">
                  <div className="rounded-full border border-white/18 bg-black/30 px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-white/84 backdrop-blur-md">
                    {item.city || item.name}
                  </div>
                  <div className="rounded-full border border-white/18 bg-black/30 px-2 py-1 text-[8px] uppercase tracking-[0.14em] text-white/70 backdrop-blur-md">
                    {formatPostedAt(item.publishedAt)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleOverlay(item.id)}
                  className="absolute inset-0 z-10"
                  aria-label={
                    showOverlayText ? "Hide testimonial text" : "Show testimonial text"
                  }
                />

                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.34)_24%,rgba(0,0,0,0.92)_100%)] px-3 pb-3 pt-9 text-white transition-all duration-300 ${
                    showOverlayText
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <div className="space-y-2">
                    {item.statusText ? (
                      <p className="max-w-[18ch] text-[13px] leading-5">
                        {item.statusText}
                      </p>
                    ) : null}

                    {item.quote ? (
                      <p className="max-w-[18ch] text-[10px] leading-4 text-white/84">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="space-y-2 px-3 pb-3 pt-2.5 text-center text-[var(--foreground)]">
                <TestimonialMeta item={item} />
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => onOpen(logicalIndex)}
                    className="inline-flex min-h-[28px] items-center justify-center rounded-full border border-[var(--border)] px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[var(--foreground)]"
                    aria-label={`Open ${item.name}'s testimonial`}
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      }}
    />
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

        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10">
          {textTestimonials.length > 0 ? (
            <TextTestimonialsCarousel testimonials={textTestimonials} />
          ) : null}

          {imageTestimonials.length > 0 ? (
            <ImageTestimonialsCarousel
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
