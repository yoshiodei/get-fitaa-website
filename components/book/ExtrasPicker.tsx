"use client";

import type { ReactNode } from "react";
import { EXTRAS, money, type Extra } from "./data";

const p = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

const ICONS: Record<string, ReactNode> = {
  corridor: <svg {...p}><path d="M4 21V5l4-2h8l4 2v16" /><path d="M8 3v18M16 3v18M8 12h8" /></svg>,
  stairs: <svg {...p}><path d="M3 21h5v-5h5v-5h5V6h3" /><path d="M3 21h18" /></svg>,
  balcony: <svg {...p}><path d="M3 12h18M5 12v7M9 12v7M15 12v7M19 12v7M3 19h18M7 12V6h10v6" /></svg>,
  garage: <svg {...p}><path d="M3 21V9l9-5 9 5v12" /><path d="M7 21v-7h10v7M7 17h10" /></svg>,
  yard: <svg {...p}><path d="M12 21v-8" /><path d="M12 13c-4 0-6-3-6-7 4 0 6 3 6 7ZM12 13c4 0 6-3 6-7-4 0-6 3-6 7Z" /></svg>,
  fridge: <svg {...p}><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M7 10h10M10 6v1.5M10 13v3" /></svg>,
  oven: <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><rect x="7" y="12" width="10" height="5" rx="1" /><path d="M7 6.5h.01M10 6.5h.01" /></svg>,
  window: <svg {...p}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M12 3v18M4 12h16" /></svg>,
  cabinet: <svg {...p}><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M12 3v18M9.5 12h.01M14.5 12h.01" /></svg>,
  vent: <svg {...p}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h10M7 14h10" /></svg>,
  sofa: <svg {...p}><path d="M4 13V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" /><path d="M3 13h18v5H3zM5 18v2M19 18v2" /></svg>,
  laundry: <svg {...p}><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="13.5" r="4" /><path d="M8 6.5h.01M11 6.5h.01" /></svg>,
};

const GROUPS: { id: Extra["group"]; title: string; hint: string }[] = [
  { id: "area", title: "Other parts of the home", hint: "Areas that are not counted as rooms" },
  { id: "task", title: "Appliances & extra tasks", hint: "Add-ons for a more thorough clean" },
];

type Props = { selected: string[]; onToggle: (id: string) => void };

export default function ExtrasPicker({ selected, onToggle }: Props) {
  return (
    <div className="space-y-6">
      {GROUPS.map((g) => (
        <fieldset key={g.id}>
          <legend className="text-sm font-semibold text-neutral-800">{g.title}</legend>
          <p className="mb-3 text-xs text-neutral-500">{g.hint}</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {EXTRAS.filter((e) => e.group === g.id).map((e) => {
              const on = selected.includes(e.id);
              return (
                <label key={e.id} className="flex cursor-pointer">
                  <input type="checkbox" checked={on} onChange={() => onToggle(e.id)} className="peer sr-only" />
                  <span className={`relative flex w-full flex-col rounded-xl border p-3.5 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#0E7C3A] peer-focus-visible:ring-offset-2 ${on ? "border-[#0E7C3A] bg-[#F1F8F0] ring-2 ring-[#0E7C3A]" : "border-neutral-200 bg-white hover:border-[#0E7C3A]"}`}>
                    <span aria-hidden="true" className={`flex h-11 w-11 items-center justify-center rounded-full ${on ? "bg-[#0E7C3A] text-white" : "bg-[#E3F4E8] text-[#0E7C3A]"}`}>
                      {ICONS[e.icon]}
                    </span>
                    <span className="mt-3 text-sm font-bold leading-snug text-neutral-900">{e.label}</span>
                    <span className="mt-0.5 text-xs leading-snug text-neutral-600">{e.description}</span>
                    <span className="mt-auto pt-3 text-sm font-extrabold text-[#0E7C3A]">+{money(e.price)}</span>
                    {on && (
                      <span aria-hidden="true" className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#0E7C3A] text-white">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}