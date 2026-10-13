import Image from "next/image";
import { money, type ServiceOption } from "./data";

type Props = {
  service: ServiceOption;
  details: string;
  zone: string;
  dateLabel: string;
  time: string;
  sizeLabel: string;
  serviceAmount: number;
  extras: { id: string; label: string; price: number }[];
  zoneFee: number;
  total: number;
};

const TRUST = [
  { title: "Vetted & certified cleaners", text: "Every cleaner is trained and background checked." },
  { title: "Clear, upfront pricing", text: "Your estimate is shown before you confirm." },
  { title: "Quality you can count on", text: "Every clean follows our detailed checklist." },
];

export default function SummaryCard({ service, details, zone, dateLabel, time, sizeLabel, serviceAmount, extras, zoneFee, total }: Props) {
  return (
    <section aria-label="Booking summary" className="rounded-2xl border border-neutral-200 bg-white shadow-sm shadow-black/5">
      <header className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4">
        <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E3F4E8] text-[#0E7C3A]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4h6l1 2h3v14H5V6h3l1-2Z" /><path d="m9 13 2 2 4-4" /></svg>
        </span>
        <h2 className="text-base font-bold text-neutral-900">Booking Summary</h2>
      </header>

      <div className="p-5">
        {/* Selected service */}
        <div className="flex gap-4">
          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-200">
            <Image src={service.image} alt="" fill sizes="80px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold text-neutral-900">{service.name}</h3>
              <span className="rounded bg-[#E3F4E8] px-2 py-0.5 text-[11px] font-bold text-[#0B3D22]">Selected</span>
            </div>
            <p className="mt-1 text-xs text-neutral-600">{details}</p>
            <dl className="mt-3 space-y-1 text-xs">
              <div className="flex gap-2"><dt className="w-10 text-neutral-500">Area</dt><dd className="font-semibold text-neutral-800">{zone || "Not selected"}</dd></div>
              <div className="flex gap-2"><dt className="w-10 text-neutral-500">Date</dt><dd className="font-semibold text-neutral-800">{dateLabel || "Not selected"}</dd></div>
              <div className="flex gap-2"><dt className="w-10 text-neutral-500">Time</dt><dd className="font-semibold text-neutral-800">{time || "Not selected"}</dd></div>
            </dl>
          </div>
        </div>

        {/* Price estimate */}
        <div className="mt-5 border-t border-neutral-200 pt-5">
          <h3 className="text-sm font-bold text-neutral-900">Price Estimate</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-neutral-600">Service ({sizeLabel})</dt><dd className="font-semibold text-neutral-900">{money(serviceAmount)}</dd></div>
            {extras.map((e) => (
              <div key={e.id} className="flex justify-between gap-3"><dt className="text-neutral-600">{e.label}</dt><dd className="font-semibold text-neutral-900">{money(e.price)}</dd></div>
            ))}
            <div className="flex justify-between gap-3"><dt className="text-neutral-600">Zone {zone ? `(${zone})` : ""}</dt><dd className="font-semibold text-neutral-900">{zone ? money(zoneFee) : "-"}</dd></div>
          </dl>

          <div aria-live="polite" className="mt-4 flex items-center justify-between rounded-lg bg-[#C9F2CE] px-4 py-3">
            <span className="text-sm font-bold text-[#0B3D22]">Total Estimate</span>
            <span className="text-lg font-extrabold text-[#0B3D22]">{money(total)}</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-[#E3F4E8] px-4 py-3 text-center">
          <p className="text-sm font-bold text-[#0E7C3A]">No hidden fees!</p>
          <p className="text-xs text-[#0B3D22]">The price you see is the price you pay.</p>
        </div>

        <ul className="mt-5 space-y-4 border-t border-neutral-200 pt-5">
          {TRUST.map((t) => (
            <li key={t.title} className="flex gap-3">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3F4E8] text-[#0E7C3A]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
              </span>
              <div>
                <p className="text-sm font-bold text-neutral-900">{t.title}</p>
                <p className="text-xs leading-snug text-neutral-600">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}