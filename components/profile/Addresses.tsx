"use client";

import { useState, type FormEvent } from "react";
import { TextField } from "@/components/auth/AuthFields";
import { ADDRESSES, ZONES, type Address } from "../../lib/profile/data";
import { SectionCard, inputClass, primaryBtn, secondaryBtn } from "./Ui";

export default function Addresses() {
  const [list, setList] = useState<Address[]>(ADDRESSES);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ label: "", zone: "", line: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  function onAdd(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.label.trim()) next.label = "Give this address a name, e.g. Home.";
    if (!form.zone) next.zone = "Choose your area.";
    if (form.line.trim().length < 5) next.line = "Enter a street or landmark.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: save to your API
    setList((l) => [
      ...l,
      { id: `a${Date.now()}`, label: form.label.trim(), zone: form.zone, line: form.line.trim(), isDefault: l.length === 0 },
    ]);
    setForm({ label: "", zone: "", line: "" });
    setAdding(false);
  }

  const makeDefault = (id: string) => setList((l) => l.map((a) => ({ ...a, isDefault: a.id === id })));
  const remove = (id: string) =>
    setList((l) => {
      const rest = l.filter((a) => a.id !== id);
      return rest.length && !rest.some((a) => a.isDefault) ? rest.map((a, i) => ({ ...a, isDefault: i === 0 })) : rest;
    });

  return (
    <SectionCard title="Saved addresses" description="Save the places you clean most often to book faster.">
      {list.length === 0 && !adding && (
        <p className="rounded-xl bg-[#F7FCF7] px-6 py-8 text-center text-sm text-neutral-700">You have not saved any addresses yet.</p>
      )}

      <ul className="space-y-3">
        {list.map((a) => (
          <li key={a.id} className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-neutral-200 p-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                {a.label}
                {a.isDefault && <span className="rounded-full bg-[#E3F4E8] px-2.5 py-0.5 text-[11px] font-bold text-[#0B3D22]">Default</span>}
              </p>
              <p className="mt-1 text-sm text-neutral-700">{a.line}</p>
              <p className="text-sm text-neutral-500">{a.zone}</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-semibold">
              {!a.isDefault && (
                <button type="button" onClick={() => makeDefault(a.id)} className="rounded text-[#0E7C3A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A]">
                  Make default
                </button>
              )}
              <button type="button" onClick={() => remove(a.id)} aria-label={`Remove ${a.label}`} className="rounded text-red-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {adding ? (
        <form onSubmit={onAdd} noValidate className="mt-5 space-y-4 rounded-xl bg-[#F7FCF7] p-4 sm:p-5">
          <TextField id="addr-label" label="Name" placeholder="Home, Office..." value={form.label}
            onChange={(e) => { setForm((f) => ({ ...f, label: e.target.value })); setErrors((p) => ({ ...p, label: undefined })); }} error={errors.label} />

          <div>
            <label htmlFor="addr-zone" className="mb-1.5 block text-sm font-semibold text-neutral-800">Area</label>
            <select id="addr-zone" value={form.zone} aria-invalid={errors.zone ? true : undefined}
              onChange={(e) => { setForm((f) => ({ ...f, zone: e.target.value })); setErrors((p) => ({ ...p, zone: undefined })); }}
              className={inputClass}>
              <option value="" disabled>Select area</option>
              {ZONES.map((z) => <option key={z}>{z}</option>)}
            </select>
            {errors.zone && <p className="mt-1.5 text-xs font-medium text-red-600">{errors.zone}</p>}
          </div>

          <TextField id="addr-line" label="Street or landmark" placeholder="House number, street, nearest landmark" value={form.line}
            onChange={(e) => { setForm((f) => ({ ...f, line: e.target.value })); setErrors((p) => ({ ...p, line: undefined })); }} error={errors.line} />

          <div className="flex gap-3">
            <button type="submit" className={primaryBtn}>Save address</button>
            <button type="button" onClick={() => { setAdding(false); setErrors({}); }} className={secondaryBtn}>Cancel</button>
          </div>
        </form>
      ) : (
        <button type="button" onClick={() => setAdding(true)} className={`${secondaryBtn} mt-5`}>
          + Add an address
        </button>
      )}
    </SectionCard>
  );
}