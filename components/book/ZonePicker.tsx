"use client";

import { ZONE_FEES, money } from "./data";

type Props = { value: string; onChange: (zone: string) => void };

export default function ZonePicker({ value, onChange }: Props) {
  return (
    <div role="radiogroup" aria-label="Service location" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {Object.entries(ZONE_FEES).map(([zone, fee]) => {
        const on = zone === value;
        return (
          <label key={zone} className="flex cursor-pointer">
            <input type="radio" name="zone" value={zone} checked={on} onChange={() => onChange(zone)} className="peer sr-only" />
            <span className={`flex w-full items-center gap-3 rounded-xl border p-3.5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#0E7C3A] peer-focus-visible:ring-offset-2 ${on ? "border-[#0E7C3A] bg-[#F1F8F0] ring-2 ring-[#0E7C3A]" : "border-neutral-200 bg-white hover:border-[#0E7C3A]"}`}>
              <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${on ? "bg-[#0E7C3A] text-white" : "bg-[#E3F4E8] text-[#0E7C3A]"}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-neutral-900">{zone}</span>
                <span className="block text-xs text-neutral-600">{fee ? `+${money(fee)} travel` : "No extra charge"}</span>
              </span>
              {on && (
                <span aria-hidden="true" className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0E7C3A] text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}