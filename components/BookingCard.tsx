"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent, type ReactNode } from "react";

const SERVICES = ["Standard Clean", "Deep Clean", "Move-in / Move-out", "Office Clean"];
const ZONES = ["Tema", "Spintex", "Nungua", "Ashaiman", "Klagon", "Lashibi"];
const TIMES = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

/* ---------- small inline icons (no extra dependency) ---------- */
const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const BroomIcon = () => (
  <svg {...iconProps}>
    <path d="m14 4 6 6M13 5l-3 5 4 4 5-3M9.5 9.5 4 15l5 5 5.5-5.5" />
  </svg>
);
const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const CalendarIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);
const ClockIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const Chevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/* ---------- field wrapper: icon + small label + control ---------- */
function Field({
  icon,
  label,
  htmlFor,
  chevron = true,
  children,
}: {
  icon: ReactNode;
  label: string;
  htmlFor: string;
  chevron?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-3.5 py-2 transition-colors focus-within:border-[#0E7C3A] focus-within:ring-2 focus-within:ring-[#0E7C3A]/20">
      <span className="shrink-0 text-[#0B3D22]">{icon}</span>
      <div className="min-w-0 flex-1">
        <label htmlFor={htmlFor} className="block text-[10px] font-medium leading-tight text-neutral-500">
          {label}
        </label>
        {children}
      </div>
      {chevron && (
        <span className="pointer-events-none shrink-0 text-neutral-500">
          <Chevron />
        </span>
      )}
    </div>
  );
}

const controlClass =
  "block w-full appearance-none bg-transparent p-0 text-sm font-semibold text-neutral-900 outline-none";

export default function BookingCard() {
  const router = useRouter();
  const uid = useId();
  const [form, setForm] = useState({ service: SERVICES[0], zone: "", date: "", time: "" });

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const today = new Date().toISOString().split("T")[0];

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(form);
    router.push(`/book?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-2xl bg-white p-5 shadow-xl shadow-black/10 sm:p-6"
      aria-labelledby={`${uid}-title`}
    >
      <h2 id={`${uid}-title`} className="mb-4 text-lg font-bold text-[#0B2A1A]">
        Book Your Clean
      </h2>

      <div className="space-y-3">
        <Field icon={<BroomIcon />} label="Service Type" htmlFor={`${uid}-service`}>
          <select id={`${uid}-service`} value={form.service} onChange={set("service")} className={controlClass}>
            {SERVICES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field icon={<PinIcon />} label="Zone" htmlFor={`${uid}-zone`}>
          <select id={`${uid}-zone`} required value={form.zone} onChange={set("zone")} className={controlClass}>
            <option value="" disabled>
              Select zone
            </option>
            {ZONES.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </Field>

        <Field icon={<CalendarIcon />} label="Date" htmlFor={`${uid}-date`} chevron={false}>
          <input
            id={`${uid}-date`}
            type="date"
            required
            min={today}
            value={form.date}
            onChange={set("date")}
            className={`${controlClass} cursor-pointer`}
          />
        </Field>

        <Field icon={<ClockIcon />} label="Time" htmlFor={`${uid}-time`}>
          <select id={`${uid}-time`} required value={form.time} onChange={set("time")} className={controlClass}>
            <option value="" disabled>
              Select time
            </option>
            {TIMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0E7C3A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B6430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
      >
        Get Price Estimate
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>

      <p className="mt-3 text-center text-xs text-neutral-600">Quick • Easy • Secure</p>
    </form>
  );
}