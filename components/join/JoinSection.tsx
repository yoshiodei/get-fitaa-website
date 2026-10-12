"use client";

import { useRef, useState, type FormEvent } from "react";
import { FormAlert, SubmitButton, TextField } from "@/components/auth/AuthFields";
import { focusFirstError, isEmail, isGhanaPhone } from "../../lib/auth/validation";
import { POSITIONS } from "../../lib/join/positions";

const ZONES = ["Spintex", "Nungua", "Klagon", "Tema", "Lashibi", "Other"];
const EXPERIENCE = ["No experience yet", "Less than 1 year", "1 to 3 years", "More than 3 years"];
const GENERAL = "general";
const MAX_CV = 5 * 1024 * 1024;

const fieldBase =
  "block w-full rounded-lg border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors focus:ring-2";
const ok = "border-neutral-300 focus:border-[#0E7C3A] focus:ring-[#0E7C3A]/20";
const bad = "border-red-500 focus:ring-red-200";

type Errors = Partial<Record<"name" | "email" | "phone" | "area" | "position" | "experience" | "cv" | "consent", string>>;

function SelectField({
  id, label, value, onChange, options, placeholder, error,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder: string; error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-neutral-800">{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldBase} ${error ? bad : ok}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export default function JoinSection() {
  const openPositions = POSITIONS.filter((p) => p.openings > 0);

  const [selected, setSelected] = useState("");
  const [values, setValues] = useState({ name: "", email: "", phone: "", area: "", experience: "", message: "" });
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const selectedTitle =
    selected === GENERAL ? "General application" : openPositions.find((p) => p.id === selected)?.title;

  const clear = (k: keyof Errors) => setErrors((p) => ({ ...p, [k]: undefined }));
  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    clear(k as keyof Errors);
  };

  function choosePosition(id: string) {
    setSelected(id);
    clear("position");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("join-name")?.focus({ preventScroll: true }), 400);
  }

  function onCv(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    clear("cv");
    if (!file) return setCv(null);
    if (!/\.(pdf|docx?|DOCX?|PDF)$/.test(file.name)) {
      setCv(null);
      return setErrors((p) => ({ ...p, cv: "Upload a PDF or Word document." }));
    }
    if (file.size > MAX_CV) {
      setCv(null);
      return setErrors((p) => ({ ...p, cv: "File must be smaller than 5 MB." }));
    }
    setCv(file);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!isEmail(values.email)) next.email = "Enter a valid email address.";
    if (!isGhanaPhone(values.phone)) next.phone = "Use a valid number, e.g. 024 123 4567 or +233 24 123 4567.";
    if (!values.area) next.area = "Choose the area you live in.";
    if (!selected) next.position = "Choose the position you are applying for.";
    if (!values.experience) next.experience = "Tell us about your experience.";
    if (errors.cv) next.cv = errors.cv;
    if (!consent) next.consent = "Please agree so we can process your application.";
    setErrors(next);
    if (Object.keys(next).length) {
      const order = ["name", "email", "phone", "area", "position", "experience", "cv", "consent"];
      return focusFirstError(order.filter((k) => k in next).map((k) => `join-${k}`));
    }

    setLoading(true);
    try {
      // TODO: send to your API / email service. Use FormData so the CV file is included:
      // const data = new FormData();
      // Object.entries({ ...values, position: selectedTitle }).forEach(([k, v]) => data.append(k, v));
      // if (cv) data.append("cv", cv);
      // const res = await fetch("/api/apply", { method: "POST", body: data });
      // if (!res.ok) throw new Error("We could not send your application.");
      await new Promise((r) => setTimeout(r, 1000));
      setDone(true);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ---------- Open positions ---------- */}
      <section id="positions" aria-labelledby="positions-heading" className="scroll-mt-20 bg-[#F1F8F0] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#0E7C3A]">We are hiring</p>
          <h2 id="positions-heading" className="mt-2 text-2xl font-bold text-neutral-800 sm:text-3xl lg:text-4xl">Open positions</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-700 sm:text-base">
            Pick the role that suits you and apply in a few minutes.
          </p>
        </div>

        {openPositions.length === 0 ? (
          <p className="mx-auto mt-8 max-w-xl rounded-2xl bg-white p-8 text-center text-neutral-700">
            We have no open positions right now, but you can still send a general application below.
          </p>
        ) : (
          <ul className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {openPositions.map((p) => {
              const on = selected === p.id;
              return (
                <li key={p.id} className="flex">
                  <article className={`flex w-full flex-col rounded-2xl bg-white p-6 shadow-sm shadow-black/5 transition-shadow ${on ? "ring-2 ring-[#0E7C3A]" : "ring-1 ring-neutral-200 hover:shadow-md"}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#E3F4E8] px-3 py-1 text-xs font-bold text-[#0B3D22]">{p.type}</span>
                      <span className="text-xs font-semibold text-neutral-500">
                        {p.openings} {p.openings === 1 ? "opening" : "openings"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-neutral-900">{p.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[#0E7C3A]">
                        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {p.area}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700">{p.summary}</p>
                    <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-neutral-700 marker:text-[#0E7C3A]">
                      {p.requirements.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                    <button
                      type="button"
                      onClick={() => choosePosition(p.id)}
                      aria-pressed={on}
                      className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2 sm:mt-auto ${
                        on ? "bg-[#0B6430] text-white" : "bg-[#0E7C3A] text-white hover:bg-[#0B6430]"
                      }`}
                    >
                      {on ? "Selected: continue below" : `Apply for ${p.title}`}
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-8 text-center text-sm text-neutral-700">
          Do not see the right role?{" "}
          <button type="button" onClick={() => choosePosition(GENERAL)} className="rounded font-bold text-[#0E7C3A] underline underline-offset-4 hover:text-[#0B6430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A]">
            Send a general application
          </button>
        </p>
      </section>

      {/* ---------- Application form ---------- */}
      <section id="apply" aria-labelledby="apply-heading" className="scroll-mt-20 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div ref={formRef} className="mx-auto max-w-3xl scroll-mt-24">
          {done ? (
            <div role="status" className="rounded-2xl bg-[#E3F4E8] px-6 py-12 text-center sm:px-10">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0E7C3A] text-white">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
              </span>
              <h2 className="mt-5 text-2xl font-bold text-[#0B3D22] sm:text-3xl">Application received!</h2>
              <p className="mx-auto mt-3 max-w-md text-neutral-700">
                Thank you, {values.name.trim().split(" ")[0]}. We have received your application for{" "}
                <span className="font-semibold">{selectedTitle}</span> and will contact you on {values.phone.trim()} or by email if we would like to take things further.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-wide text-[#0E7C3A]">Apply now</p>
                <h2 id="apply-heading" className="mt-2 text-2xl font-bold text-neutral-800 sm:text-3xl lg:text-4xl">Application form</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-700 sm:text-base">Tell us a little about yourself. It takes about five minutes.</p>
              </div>

              <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm shadow-black/5 sm:p-8">
                {formError && <FormAlert>{formError}</FormAlert>}

                <SelectField
                  id="join-position"
                  label="Position you are applying for"
                  value={selected}
                  onChange={(v) => { setSelected(v); clear("position"); }}
                  placeholder="Select a position"
                  options={[
                    ...openPositions.map((p) => ({ value: p.id, label: `${p.title} (${p.type})` })),
                    { value: GENERAL, label: "General application" },
                  ]}
                  error={errors.position}
                />

                <TextField id="join-name" label="Full name" autoComplete="name" placeholder="Ama Serwaa" value={values.name} onChange={set("name")} error={errors.name} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField id="join-email" label="Email address" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={set("email")} error={errors.email} />
                  <TextField id="join-phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" placeholder="024 123 4567" value={values.phone} onChange={set("phone")} error={errors.phone} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField id="join-area" label="Area you live in" value={values.area} onChange={(v) => { setValues((x) => ({ ...x, area: v })); clear("area"); }} placeholder="Select area" options={ZONES.map((z) => ({ value: z, label: z }))} error={errors.area} />
                  <SelectField id="join-experience" label="Cleaning experience" value={values.experience} onChange={(v) => { setValues((x) => ({ ...x, experience: v })); clear("experience"); }} placeholder="Select experience" options={EXPERIENCE.map((x) => ({ value: x, label: x }))} error={errors.experience} />
                </div>

                <div>
                  <label htmlFor="join-cv" className="mb-1.5 block text-sm font-semibold text-neutral-800">
                    CV or resume <span className="font-normal text-neutral-500">(optional, PDF or Word, up to 5 MB)</span>
                  </label>
                  <input
                    id="join-cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={onCv}
                    aria-invalid={errors.cv ? true : undefined}
                    aria-describedby={errors.cv ? "join-cv-error" : undefined}
                    className="block w-full cursor-pointer rounded-lg border border-neutral-300 bg-white text-sm text-neutral-700 file:mr-4 file:cursor-pointer file:border-0 file:bg-[#E3F4E8] file:px-4 file:py-3 file:text-sm file:font-semibold file:text-[#0B3D22] hover:file:bg-[#D9F7D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A]"
                  />
                  {cv && !errors.cv && <p className="mt-1.5 text-xs text-neutral-600">Selected: {cv.name}</p>}
                  {errors.cv && <p id="join-cv-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.cv}</p>}
                </div>

                <div>
                  <label htmlFor="join-message" className="mb-1.5 block text-sm font-semibold text-neutral-800">
                    Why would you like to join getFitaa? <span className="font-normal text-neutral-500">(optional)</span>
                  </label>
                  <textarea id="join-message" rows={4} maxLength={600} value={values.message} onChange={set("message")} placeholder="Tell us a bit about yourself and what you are looking for..." className={`${fieldBase} ${ok} resize-y placeholder:text-neutral-400`} />
                  <p className="mt-1 text-right text-xs text-neutral-500">{values.message.length}/600</p>
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm text-neutral-700">
                    <input
                      id="join-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => { setConsent(e.target.checked); clear("consent"); }}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? "join-consent-error" : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 accent-[#0E7C3A]"
                    />
                    <span>
                      I agree that getFitaa may store and use my details to process this application, as explained in the{" "}
                      <a href="/privacy" className="font-semibold text-[#0E7C3A] hover:underline">Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.consent && <p id="join-consent-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.consent}</p>}
                </div>

                <SubmitButton loading={loading}>
                  {loading ? "Sending..." : selectedTitle ? `Submit application for ${selectedTitle}` : "Submit application"}
                </SubmitButton>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
}