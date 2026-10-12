"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";

type Plan = {
  name: string;
  price: number;
  popular?: boolean;
  includes: string[];
};

/** Sample prices and inclusions: replace with your real ones. */
const PLANS: Plan[] = [
  {
    name: "Standard Clean",
    price: 250,
    includes: [
      "Dusting of all surfaces",
      "Vacuuming and mopping of floors",
      "Kitchen surfaces and sink wiped down",
      "Bathroom and toilet cleaned",
      "Bins emptied",
    ],
  },
  {
    name: "Deep Clean",
    price: 450,
    popular: true,
    includes: [
      "Everything in Standard Clean",
      "Inside of oven, fridge and cabinets",
      "Scrubbing of tiles, grout and fixtures",
      "Baseboards, doors and window sills",
      "Behind and under movable furniture",
    ],
  },
  {
    name: "Move-In / Move-Out",
    price: 600,
    includes: [
      "Full deep clean of every room",
      "Inside of all cupboards and wardrobes",
      "Interior windows and frames",
      "Appliances cleaned inside and out",
      "Floors scrubbed and polished",
    ],
  },
  {
    name: "Office Clean",
    price: 350,
    includes: [
      "Desks, chairs and shared surfaces",
      "Floors vacuumed and mopped",
      "Restrooms cleaned and restocked",
      "Kitchenette and breakroom",
      "Bins emptied and liners replaced",
    ],
  },
  {
    name: "Carpet & Upholstery",
    price: 300,
    includes: [
      "Vacuuming of carpets and sofas",
      "Stain and spot treatment",
      "Hot water extraction wash",
      "Deodorising",
      "Fast drying finish",
    ],
  },
  {
    name: "Post-Construction Clean",
    price: 900,
    includes: [
      "Removal of dust, debris and residue",
      "Paint and cement splatter removal",
      "Windows, frames and glass polished",
      "Fixtures and fittings wiped down",
      "Floors scrubbed to a move-in finish",
    ],
  },
];

const formatPrice = (n: number) => `₵ ${n.toLocaleString("en-GH")}`;

/**
 * Large screens (3-column grid): only the first 3 cards show until "View All" is pressed.
 * Small screens (carousel): every card is in the carousel, so nothing is hidden.
 */
function collapsedClass(index: number) {
  return index < 3 ? "" : "lg:hidden";
}

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-[#0E7C3A]"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="m8 12.5 3 3 5-6" />
    </svg>
  );
}

export default function Pricing() {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const trackRef = useRef<HTMLUListElement>(null);

  // Work out which card is at the left edge of the carousel (small screens only)
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      setActive(PLANS.length - 1);
      return;
    }
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const target = el.scrollLeft + pad;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const dist = Math.abs((child as HTMLElement).offsetLeft - target);
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    });
    setActive(best);
  };

  const scrollToCard = (i: number) => {
    const el = trackRef.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.scrollTo({ left: child.offsetLeft - pad, behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-20 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="text-center">
        <h2 id="pricing-heading" className="text-2xl font-bold text-neutral-800 sm:text-3xl">
          Service Pricing
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-700 sm:text-base">
          Clear, upfront prices for every clean, so you know exactly what you are paying for.
        </p>
      </div>

      {/* Small screens: swipeable carousel. Large screens: 3-column grid. */}
      <div className="-mx-4 mt-8 sm:-mx-6 lg:mx-0">
      <ul
        id={listId}
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-label="Service prices"
        className="relative mx-auto flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-px-4 sm:scroll-px-6 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:py-0"
      >
        {PLANS.map((plan, i) => (
          <li
            key={plan.name}
            className={`flex w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-auto ${
              showAll ? "" : collapsedClass(i)
            }`}
          >
            <article
              className={`relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-black/5 ${
                plan.popular
                  ? "border-2 border-[#0E7C3A]"
                  : "border border-neutral-200"
              }`}
            >
              {/* Price at the top */}
              <header className="bg-[#E3F4E8] px-6 pb-5 pt-6 text-center">
                {plan.popular && (
                  <span className="mb-3 inline-block rounded-full bg-[#0E7C3A] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                )}
                <p className="text-sm text-neutral-600">
                  from
                </p>
                <p className="text-4xl font-extrabold text-[#0E7C3A]">{formatPrice(plan.price)}</p>
                <h3 className="mt-2 text-lg font-bold text-neutral-800">{plan.name}</h3>
              </header>

              {/* Breakdown */}
              <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  What&apos;s included
                </p>
                <ul className="mt-3 space-y-2.5">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-neutral-700">
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Link
                    href={`/book?service=${encodeURIComponent(plan.name)}`}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[#0E7C3A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B6430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
                  >
                    <span className="text-white" >Book {plan.name}</span>
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      </div>

      {/* Carousel dots: small screens only */}
      <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
        {PLANS.map((plan, i) => (
          <button
            key={plan.name}
            type="button"
            onClick={() => scrollToCard(i)}
            aria-label={`Go to ${plan.name}`}
            aria-current={i === active}
            className={`h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2 ${
              i === active ? "bg-[#0E7C3A]" : "bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>

      <div className="mt-6 text-center lg:mt-8">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          aria-controls={listId}
          className="hidden items-center lg:inline-flex gap-2 rounded-full border-2 border-[#0E7C3A] px-8 py-3 text-sm font-bold text-[#0E7C3A] transition-colors hover:bg-[#0E7C3A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
        >
          {showAll ? "Show Less" : "View All"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`transition-transform ${showAll ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <p className="mt-4 text-xs text-neutral-500">
          Prices are starting rates and may vary with the size of your space.
        </p>
      </div>
    </section>
  );
}