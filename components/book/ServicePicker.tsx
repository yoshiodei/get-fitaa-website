"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { money, type ServiceOption } from "./data";

type Props = { services: ServiceOption[]; value: string; onChange: (id: string) => void };

export default function ServicePicker({ services, value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // bring a pre-selected service (e.g. from a "Book Now" link) into view
    const selected = el.querySelector<HTMLElement>('[data-selected="true"]');
    if (selected) el.scrollTo({ left: Math.max(0, selected.offsetLeft - 8) });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollBy = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition-colors hover:border-[#0E7C3A] hover:text-[#0E7C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs text-neutral-500 sm:text-sm">Swipe or use the arrows to see all {services.length} services.</p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => scrollBy(-1)} disabled={!canLeft} aria-label="Scroll services left" className={arrow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
          </button>
          <button type="button" onClick={() => scrollBy(1)} disabled={!canRight} aria-label="Scroll services right" className={arrow}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <div className="relative">
        {canLeft && <div aria-hidden="true" className="pointer-events-none absolute -left-px bottom-3 top-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />}
        {canRight && <div aria-hidden="true" className="pointer-events-none absolute -right-px bottom-3 top-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />}

        <div
          ref={ref}
          onScroll={update}
          role="radiogroup"
          aria-label="Service"
          className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-3 pt-1 [scrollbar-width:thin]"
        >
          {services.map((s) => {
            const on = s.id === value;
            return (
              <label key={s.id} data-selected={on} className="flex w-[44%] min-w-[9.5rem] max-w-[12rem] shrink-0 cursor-pointer snap-start sm:w-44">
                <input type="radio" name="service" value={s.id} checked={on} onChange={() => onChange(s.id)} className="peer sr-only" />
                <span className={`flex w-full flex-col overflow-hidden rounded-xl border bg-white transition-shadow peer-focus-visible:ring-2 peer-focus-visible:ring-[#0E7C3A] peer-focus-visible:ring-offset-2 ${on ? "border-[#0E7C3A] ring-2 ring-[#0E7C3A]" : "border-neutral-200 hover:border-[#0E7C3A]"}`}>
                  <span className="relative block aspect-[4/3] w-full bg-neutral-200">
                    <Image src={s.image} alt="" fill sizes="192px" className="object-cover" />
                    {on && (
                      <span aria-hidden="true" className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#0E7C3A] text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                      </span>
                    )}
                  </span>
                  <span className="flex flex-1 flex-col p-3">
                    <span className="text-sm font-bold text-neutral-900">{s.name}</span>
                    <span className="mt-1 text-xs leading-snug text-neutral-600">{s.description}</span>
                    <span className="mt-auto pt-3 text-[10px] font-bold uppercase tracking-wide text-[#0E7C3A]">Starting from</span>
                    <span className="text-base font-extrabold text-[#0E7C3A]">{money(s.price)}</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}