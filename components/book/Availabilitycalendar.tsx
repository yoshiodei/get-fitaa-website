"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { MAX_MONTHS_AHEAD, addDaysIso, dateStatus, formatLongDate } from "./data";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pad = (n: number) => String(n).padStart(2, "0");
const toIso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

type Props = { value: string; onSelect: (iso: string) => void; today: string };

export default function AvailabilityCalendar({ value, onSelect, today }: Props) {
  // `today` is only known in the browser, so show a placeholder until then
  if (!today) return <div aria-hidden="true" className="h-[24rem] animate-pulse rounded-xl bg-neutral-100" />;
  return <Calendar value={value} onSelect={onSelect} today={today} />;
}

function Calendar({ value, onSelect, today }: Props) {
  const ty = Number(today.slice(0, 4));
  const tm = Number(today.slice(5, 7)) - 1;

  const [offset, setOffset] = useState(() => {
    if (value) {
      const o = (Number(value.slice(0, 4)) - ty) * 12 + (Number(value.slice(5, 7)) - 1 - tm);
      if (o >= 0 && o <= MAX_MONTHS_AHEAD) return o;
    }
    return 0;
  });
  const [pendingFocus, setPendingFocus] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const year = ty + Math.floor((tm + offset) / 12);
  const month = (tm + offset) % 12;
  const lead = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7; // Monday first
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  // The one day that is reachable with Tab (arrow keys move between days)
  const monthPrefix = `${year}-${pad(month + 1)}`;
  const firstFree = Array.from({ length: daysInMonth }, (_, i) => toIso(year, month, i + 1)).find((d) => !dateStatus(d, today));
  const tabDate = value.startsWith(monthPrefix) ? value : firstFree ?? toIso(year, month, 1);

  useEffect(() => {
    if (!pendingFocus) return;
    gridRef.current?.querySelector<HTMLElement>(`[data-date="${pendingFocus}"]`)?.focus();
    setPendingFocus(null);
  }, [pendingFocus, offset]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const current = (document.activeElement as HTMLElement | null)?.dataset.date;
    if (!current) return;
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!step) return;
    e.preventDefault();
    const target = addDaysIso(current, step);
    const off = (Number(target.slice(0, 4)) - ty) * 12 + (Number(target.slice(5, 7)) - 1 - tm);
    if (off < 0 || off > MAX_MONTHS_AHEAD) return;
    setOffset(off);
    setPendingFocus(target);
  }

  const navBtn =
    "flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-700 transition-colors hover:border-[#0E7C3A] hover:text-[#0E7C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between">
        <button type="button" onClick={() => setOffset((o) => o - 1)} disabled={offset <= 0} aria-label="Previous month" className={navBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
        </button>
        <p aria-live="polite" className="text-base font-bold text-neutral-900">{MONTHS[month]} {year}</p>
        <button type="button" onClick={() => setOffset((o) => o + 1)} disabled={offset >= MAX_MONTHS_AHEAD} aria-label="Next month" className={navBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center" aria-hidden="true">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1 text-xs font-bold uppercase tracking-wide text-neutral-500">{d}</span>
        ))}
      </div>

      <div ref={gridRef} role="group" aria-label={`Choose a date in ${MONTHS[month]} ${year}`} onKeyDown={onKeyDown} className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <span key={`blank-${i}`} aria-hidden="true" />;
          const iso = toIso(year, month, day);
          const reason = dateStatus(iso, today);
          const selected = iso === value;
          const isToday = iso === today;

          return (
            <button
              key={iso}
              type="button"
              data-date={iso}
              tabIndex={iso === tabDate ? 0 : -1}
              aria-pressed={selected}
              aria-disabled={reason ? true : undefined}
              aria-label={`${formatLongDate(iso)}${reason ? `, unavailable: ${reason}` : ""}`}
              title={reason ?? undefined}
              onClick={() => { if (!reason) onSelect(iso); }}
              className={`relative flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-1 sm:h-11 ${
                selected
                  ? "bg-[#0E7C3A] text-white"
                  : reason
                  ? "cursor-not-allowed bg-neutral-100 text-neutral-400 line-through decoration-neutral-300"
                  : "bg-white text-neutral-900 hover:bg-[#E3F4E8]"
              } ${isToday && !selected ? "ring-1 ring-[#0E7C3A]" : ""}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-600">
        <li className="flex items-center gap-2"><span aria-hidden="true" className="h-4 w-4 rounded border border-neutral-300 bg-white" />Available</li>
        <li className="flex items-center gap-2"><span aria-hidden="true" className="h-4 w-4 rounded bg-[#0E7C3A]" />Selected</li>
        <li className="flex items-center gap-2"><span aria-hidden="true" className="h-4 w-4 rounded bg-neutral-100 ring-1 ring-neutral-200" />Unavailable</li>
      </ul>
      <p className="mt-2 text-xs text-neutral-500">Greyed-out dates are fully booked, public holidays, Sundays or too soon to book.</p>
    </div>
  );
}