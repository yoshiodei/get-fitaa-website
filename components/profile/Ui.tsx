import type { ReactNode } from "react";

export const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#0E7C3A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B6430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:border-[#0E7C3A] hover:text-[#0E7C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2";

export const inputClass =
  "block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-colors focus:border-[#0E7C3A] focus:ring-2 focus:ring-[#0E7C3A]/20";

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm shadow-black/5 sm:p-7">
      <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-neutral-600">{description}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export function Notice({ children, tone = "success" }: { children: ReactNode; tone?: "success" | "error" }) {
  const styles =
    tone === "success"
      ? "border-[#0E7C3A]/30 bg-[#E3F4E8] text-[#0B3D22]"
      : "border-red-200 bg-red-50 text-red-700";
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-lg border px-4 py-3 text-sm font-medium ${styles}`}>
      {children}
    </div>
  );
}

export function Toggle({
  id,
  checked,
  onChange,
  label,
  description,
}: {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <p id={`${id}-label`} className="text-sm font-semibold text-neutral-900">{label}</p>
        {description && <p id={`${id}-desc`} className="mt-0.5 text-sm text-neutral-600">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={description ? `${id}-desc` : undefined}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2 ${
          checked ? "bg-[#0E7C3A]" : "bg-neutral-300"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform motion-reduce:transition-none ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}