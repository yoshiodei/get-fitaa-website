"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Sample reviews: replace with your real client feedback. */
const REVIEWS = [
  {
    name: "Ama Serwaa",
    text: "CleanGo transformed my apartment in one afternoon. The cleaners arrived on time, were polite, and left every corner spotless. I booked a second visit before they even left.",
  },
  {
    name: "Kwame Mensah",
    text: "Booking was quick and the price was exactly what I was quoted. No surprises, no hidden fees.",
  },
  {
    name: "Efua Boateng",
    text: "I used the move-out clean before handing back my flat and got my full deposit back. The team was thorough and professional from start to finish.",
  },
  {
    name: "Kofi Asante",
    text: "Our office has never looked better. The team works around our schedule and we no longer have to think about cleaning.",
  },
  {
    name: "Naana Owusu",
    text: "The deep clean was worth every cedi. My kitchen and bathrooms look brand new, and the cleaners were friendly and careful with our things.",
  },
];

const AUTOPLAY_MS = 6000;

/** Slides visible at once: 1 (mobile), 2 (tablet), 3 (desktop). Must match the CSS classes below. */
function getPerView() {
  if (typeof window === "undefined") return 3;
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

function Star() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#F5B800" aria-hidden="true">
      <path d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z" />
    </svg>
  );
}

function LeafWatermark() {
  return (
    <svg
      width="110"
      height="130"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="pointer-events-none absolute bottom-2 right-3 text-white/60"
    >
      <path d="M20 3c-9 0-15 4-15 11 0 2 .7 3.8 2 5C8.2 12.5 12 9.5 17 8c-4 2.5-6.5 6-7.5 11.3.8.4 1.7.7 2.5.7 7 0 10-6 8-18Z" />
      <path d="M5 21c1-4 3-7 6-9.5" />
    </svg>
  );
}

export default function Testimonials() {
  const [perView, setPerView] = useState(3);
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const maxIndex = Math.max(0, REVIEWS.length - perView);

  // Track screen size
  useEffect(() => {
    const update = () => setPerView(getPerView());
    update();
    setMounted(true);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Keep the index valid when the screen size changes
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(i, maxIndex))),
    [maxIndex]
  );

  // Autoplay (pauses on hover/focus, off for reduced motion)
  useEffect(() => {
    if (paused || maxIndex === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  // Swipe support for touch screens
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    goTo(dx < 0 ? index + 1 : index - 1);
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-20 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="text-center">
        <h2 id="testimonials-heading" className="text-2xl font-bold text-neutral-800 sm:text-3xl">
          Inspiring Client Experiences
        </h2>
        <p className="mt-2 text-sm text-neutral-700 sm:text-base">
          Hear from the homes and businesses we have helped keep spotless.
        </p>
      </div>

      <div
        className="mx-auto mt-8 max-w-6xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client reviews"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <ul
            style={{ ["--i" as string]: index }}
            className="flex items-stretch transition-transform duration-500 ease-out motion-reduce:transition-none [transform:translateX(calc(var(--i)*-100%))] sm:[transform:translateX(calc(var(--i)*-50%))] lg:[transform:translateX(calc(var(--i)*-33.3333%))]"
          >
            {REVIEWS.map((r, i) => (
              <li
                key={r.name}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${REVIEWS.length}`}
                className="flex w-full flex-none basis-full px-2 sm:basis-1/2 lg:basis-1/3"
              >
                <figure className="relative flex w-full flex-col overflow-hidden rounded-xl bg-[#D9F7D5] p-6">
                  <blockquote className="text-[15px] leading-relaxed text-neutral-800">
                    “{r.text}”
                  </blockquote>

                  <figcaption className="relative z-10 mt-auto pt-6">
                    <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} />
                      ))}
                    </div>
                    <p className="mt-4 text-sm font-bold text-[#0E7C3A]">- {r.name}</p>
                  </figcaption>

                  <LeafWatermark />
                </figure>
              </li>
            ))}
          </ul>
        </div>

        {/* Dots: one per possible position, so the count changes with screen size */}
        <div className="mt-6 flex min-h-[10px] items-center justify-center gap-2">
          {mounted &&
            Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to review position ${i + 1}`}
                aria-current={i === index}
                className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2 ${
                  i === index ? "bg-[#0E7C3A]" : "bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
        </div>
      </div>
    </section>
  );
}