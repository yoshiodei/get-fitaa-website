"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { FormAlert, SubmitButton, TextField } from "@/components/auth/AuthFields";
import { focusFirstError, isEmail, isGhanaPhone } from "@/lib/auth/validation";
import {
  PROPERTY_TYPES, SERVICE_OPTIONS, TIME_SLOTS, ZONE_FEES,
  calcPrice, dateStatus, formatLongDate, money, normalize,
} from "./data";
import AvailabilityCalendar from "./Availabilitycalendar";
import ExtrasPicker from "./ExtrasPicker";
import ServicePicker from "./ServicePicker";
import ZonePicker from "./ZonePicker";
import SummaryCard from "./SummaryCard";

const ZONES = Object.keys(ZONE_FEES);

const fieldCls =
  "block w-full rounded-lg border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors focus:ring-2";
const okCls = "border-neutral-300 focus:border-[#0E7C3A] focus:ring-[#0E7C3A]/20";

type Errors = Partial<Record<"zone" | "address" | "date" | "time" | "name" | "phone" | "email", string>>;

function Step({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="border-b border-neutral-200 py-7 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 rounded-full bg-[#0E7C3A]" />
        <div>
          <h2 className="text-lg font-bold text-neutral-900">{title}</h2>
          <p className="text-sm text-neutral-600">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Counter({ id, label, value, min, max, onChange }: { id: string; label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const btn =
    "flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300 bg-white text-lg font-bold text-neutral-800 transition-colors hover:border-[#0E7C3A] hover:text-[#0E7C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div>
      <p id={`${id}-label`} className="mb-1.5 text-sm font-semibold text-neutral-800">{label}</p>
      <div role="group" aria-labelledby={`${id}-label`} className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label.toLowerCase()}`} className={btn}>−</button>
        <output aria-live="polite" className="w-8 text-center text-lg font-bold text-neutral-900">{value}</output>
        <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`More ${label.toLowerCase()}`} className={btn}>+</button>
      </div>
    </div>
  );
}

const chipBase =
  "block cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-semibold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#0E7C3A] peer-focus-visible:ring-offset-2";
const chipOff = "border-neutral-300 bg-white text-neutral-700 hover:border-[#0E7C3A]";
const chipOn = "border-[#0E7C3A] bg-[#0E7C3A] text-white";

export default function BookingPage() {
  const params = useSearchParams();

  const initialService =
    SERVICE_OPTIONS.find((s) => normalize(s.name) === normalize(params.get("service") ?? ""))?.id ?? SERVICE_OPTIONS[0].id;
  const initialZone = ZONES.includes(params.get("zone") ?? "") ? (params.get("zone") as string) : "";
  const initialTime = TIME_SLOTS.includes(params.get("time") ?? "") ? (params.get("time") as string) : "";

  const [serviceId, setServiceId] = useState(initialService);
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [extras, setExtras] = useState<string[]>([]);
  const [pets, setPets] = useState(false);
  const [zone, setZone] = useState(initialZone);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(params.get("date") ?? "");
  const [time, setTime] = useState(initialTime);
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");
  const [today, setToday] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  // If a link pre-filled a date that can't be booked, clear it
  useEffect(() => {
    if (today && date && dateStatus(date, today)) setDate("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);

  const service = SERVICE_OPTIONS.find((s) => s.id === serviceId) ?? SERVICE_OPTIONS[0];
  const office = !!service.office;
  const bedLabel = office ? "Rooms / offices" : "Bedrooms";
  const bathLabel = office ? "Restrooms" : "Bathrooms";
  const price = calcPrice({ service, bedrooms, bathrooms, zone, extras });

  const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
  const sizeLabel = office
    ? `${plural(bedrooms, "room", "rooms")}, ${plural(bathrooms, "restroom", "restrooms")}`
    : `${plural(bedrooms, "Bedroom", "Bedrooms")}, ${plural(bathrooms, "Bathroom", "Bathrooms")}`;
  const details = office ? `Office • ${sizeLabel.replace(", ", " • ")}` : `${propertyType} • ${sizeLabel.replace(", ", " • ")}`;

  const clear = (k: keyof Errors) => setErrors((p) => ({ ...p, [k]: undefined }));
  const toggleExtra = (id: string) => setExtras((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    const next: Errors = {};
    if (!zone) next.zone = "Choose your area.";
    if (address.trim().length < 5) next.address = "Enter your street, house number or nearest landmark.";
    if (!date) next.date = "Pick an available date.";
    else if (today && dateStatus(date, today)) next.date = "That date is unavailable. Please pick another.";
    if (!time) next.time = "Pick a time slot.";
    if (contact.name.trim().length < 2) next.name = "Enter your full name.";
    if (!isGhanaPhone(contact.phone)) next.phone = "Use a valid number, e.g. 024 123 4567 or +233 24 123 4567.";
    if (!isEmail(contact.email)) next.email = "Enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length) {
      const order = ["zone", "address", "date", "time", "name", "phone", "email"];
      return focusFirstError(order.filter((k) => k in next).map((k) => `bk-${k}`));
    }

    setLoading(true);
    try {
      // TODO: send the booking to your API (and start payment if you take it online), e.g.
      // const res = await fetch("/api/bookings", { method: "POST", body: JSON.stringify({
      //   service: service.name, propertyType, bedrooms, bathrooms, extras, pets,
      //   zone, address, date, time, notes, contact, estimate: price.total,
      // }) });
      // if (!res.ok) throw new Error("We could not place your booking.");
      await new Promise((r) => setTimeout(r, 1000));
      setReference(`CG-${Math.floor(1000 + Math.random() * 9000)}`);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const summaryProps = {
    service, details, zone, dateLabel: formatLongDate(date), time, sizeLabel,
    serviceAmount: price.serviceAmount, extras: price.extras, zoneFee: price.zoneFee, total: price.total,
  };

  /* ---------- Confirmation ---------- */
  if (reference) {
    return (
      <div ref={topRef} className="mx-auto max-w-2xl scroll-mt-24 rounded-2xl bg-white p-6 text-center shadow-sm shadow-black/5 sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0E7C3A] text-white">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
        </span>
        <h2 role="status" className="mt-5 text-2xl font-extrabold text-neutral-900 sm:text-3xl">Booking request received!</h2>
        <p className="mt-2 text-neutral-700">
          Thank you, {contact.name.trim().split(" ")[0]}. Your reference is <span className="font-bold text-[#0E7C3A]">{reference}</span>. We will confirm your booking shortly using the details you gave us.
        </p>
        <dl className="mx-auto mt-6 max-w-sm space-y-2 rounded-xl bg-[#F7FCF7] p-5 text-left text-sm">
          <div className="flex justify-between gap-4"><dt className="text-neutral-600">Service</dt><dd className="font-semibold">{service.name}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-neutral-600">When</dt><dd className="font-semibold">{formatLongDate(date)}, {time}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-neutral-600">Area</dt><dd className="font-semibold">{zone}</dd></div>
          <div className="flex justify-between gap-4 border-t border-neutral-200 pt-2"><dt className="font-bold">Total estimate</dt><dd className="font-extrabold text-[#0E7C3A]">{money(price.total)}</dd></div>
        </dl>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/profile" className="inline-flex items-center justify-center rounded-lg bg-[#0E7C3A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0B6430]">View my bookings</Link>
          <Link href="/" className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-[#0E7C3A] hover:text-[#0E7C3A]">Back to home</Link>
        </div>
      </div>
    );
  }

  /* ---------- Booking form ---------- */
  return (
    <div ref={topRef} className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:grid-cols-[minmax(0,1fr)_380px]">
      <form onSubmit={onSubmit} noValidate className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm shadow-black/5 sm:p-7">
        {/* 1. Service */}
        <Step title="Choose your service" description="Pick the clean that fits your space.">
          <ServicePicker
            services={SERVICE_OPTIONS}
            value={serviceId}
            onChange={(id) => {
              setServiceId(id);
              if (SERVICE_OPTIONS.find((x) => x.id === id)?.office && bedrooms < 1) setBedrooms(1);
            }}
          />
        </Step>

        {/* 2. Property */}
        <Step title="Property information" description="Tell us about your space so we can estimate accurately.">
          <div className="space-y-6">
            {!office && (
              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-neutral-800">Property type</legend>
                <div className="grid grid-cols-3 gap-3">
                  {PROPERTY_TYPES.map((t) => (
                    <label key={t}>
                      <input type="radio" name="propertyType" value={t} checked={propertyType === t} onChange={() => setPropertyType(t)} className="peer sr-only" />
                      <span className={`${chipBase} ${propertyType === t ? chipOn : chipOff}`}>{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="flex flex-wrap gap-8">
              <Counter id="beds" label={bedLabel} value={bedrooms} min={office ? 1 : 0} max={10} onChange={setBedrooms} />
              <Counter id="baths" label={bathLabel} value={bathrooms} min={1} max={8} onChange={setBathrooms} />
            </div>

            <div>
              <p className="mb-1 text-sm font-semibold text-neutral-800">Add extras <span className="font-normal text-neutral-500">(optional)</span></p>
              <p className="mb-4 text-xs text-neutral-500">
                Tap to add. {extras.length > 0 ? `${extras.length} selected.` : "None selected yet."}
              </p>
              <ExtrasPicker selected={extras} onToggle={toggleExtra} />
            </div>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700">
              <input type="checkbox" checked={pets} onChange={(e) => setPets(e.target.checked)} className="h-4 w-4 rounded border-neutral-300 accent-[#0E7C3A]" />
              There are pets at the property
            </label>
          </div>
        </Step>

        {/* 3. Schedule & location */}
        <Step title="Schedule & location" description="Where and when should our cleaner arrive?">
          <div className="space-y-7">
            <fieldset id="bk-zone" tabIndex={-1} className="outline-none">
              <legend className="mb-2 text-sm font-semibold text-neutral-800">Service location</legend>
              <ZonePicker value={zone} onChange={(z) => { setZone(z); clear("zone"); }} />
              {errors.zone && <p className="mt-2 text-xs font-medium text-red-600">{errors.zone}</p>}
            </fieldset>

            <TextField id="bk-address" label="Street address or landmark" placeholder="House number, street, nearest landmark" autoComplete="street-address" value={address} onChange={(e) => { setAddress(e.target.value); clear("address"); }} error={errors.address} />

            <div className="grid gap-6 md:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
              <div id="bk-date" tabIndex={-1} className="outline-none">
                <p className="mb-2 text-sm font-semibold text-neutral-800">Choose a date</p>
                <AvailabilityCalendar value={date} today={today} onSelect={(d) => { setDate(d); clear("date"); }} />
                {errors.date && <p className="mt-2 text-xs font-medium text-red-600">{errors.date}</p>}
              </div>

              <fieldset id="bk-time" tabIndex={-1} className="outline-none">
                <legend className="mb-2 text-sm font-semibold text-neutral-800">Arrival time</legend>
                <p className="mb-3 text-xs text-neutral-500">
                  {date ? `Available times on ${formatLongDate(date)}` : "Pick a date to see times."}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-2">
                  {TIME_SLOTS.map((t) => (
                    <label key={t}>
                      <input type="radio" name="time" value={t} checked={time === t} onChange={() => { setTime(t); clear("time"); }} className="peer sr-only" />
                      <span className={`${chipBase} px-2 ${time === t ? chipOn : chipOff}`}>{t}</span>
                    </label>
                  ))}
                </div>
                {errors.time && <p className="mt-2 text-xs font-medium text-red-600">{errors.time}</p>}
              </fieldset>
            </div>
          </div>
        </Step>

        {/* 4. Contact */}
        <Step title="Your details" description="So we can confirm your booking.">
          <div className="space-y-5">
            <TextField id="bk-name" label="Full name" autoComplete="name" placeholder="Ama Serwaa" value={contact.name} onChange={(e) => { setContact((c) => ({ ...c, name: e.target.value })); clear("name"); }} error={errors.name} />
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField id="bk-phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" placeholder="024 123 4567" value={contact.phone} onChange={(e) => { setContact((c) => ({ ...c, phone: e.target.value })); clear("phone"); }} error={errors.phone} />
              <TextField id="bk-email" label="Email address" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={contact.email} onChange={(e) => { setContact((c) => ({ ...c, email: e.target.value })); clear("email"); }} error={errors.email} />
            </div>
            <div>
              <label htmlFor="bk-notes" className="mb-1.5 block text-sm font-semibold text-neutral-800">Notes for your cleaner <span className="font-normal text-neutral-500">(optional)</span></label>
              <textarea id="bk-notes" rows={3} maxLength={400} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Access instructions, areas to focus on, anything we should know..." className={`${fieldCls} ${okCls} resize-y placeholder:text-neutral-400`} />
            </div>
          </div>
        </Step>

        {/* Summary on small screens (large screens use the sticky sidebar) */}
        <div className="mt-2 lg:hidden">
          <SummaryCard {...summaryProps} />
        </div>

        <div className="mt-6 space-y-4">
          {formError && <FormAlert>{formError}</FormAlert>}
          <SubmitButton loading={loading}>{loading ? "Placing booking..." : `Confirm booking • ${money(price.total)}`}</SubmitButton>
          <p className="text-center text-xs text-neutral-500">
            By booking you agree to our <Link href="/terms" className="font-semibold text-[#0E7C3A] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="font-semibold text-[#0E7C3A] hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </form>

      {/* Live price calculator: large screens */}
      <aside className="hidden lg:sticky lg:top-24 lg:block">
        <SummaryCard {...summaryProps} />
      </aside>
    </div>
  );
}