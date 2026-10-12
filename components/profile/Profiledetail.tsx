"use client";

import { useEffect, useState, type FormEvent } from "react";
import { SubmitButton, TextField } from "@/components/auth/AuthFields";
import { focusFirstError, isEmail, isGhanaPhone } from "../../lib/auth/validation";
import { USER } from "../../lib/profile/data";
import { Notice, SectionCard, secondaryBtn } from "./Ui";

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function ProfileDetails({ onNameChange }: { onNameChange: (name: string) => void }) {
  const [values, setValues] = useState({ name: USER.name, email: USER.email, phone: USER.phone });
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");

  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo); }, [photo]);

  const set = (key: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
    setSaved(false);
  };

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPhotoError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) return setPhotoError("Please choose an image file.");
    if (file.size > 2 * 1024 * 1024) return setPhotoError("Image must be smaller than 2 MB.");
    // TODO: upload the file to your storage and save the returned URL on the user
    setPhoto(URL.createObjectURL(file));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!isEmail(values.email)) next.email = "Enter a valid email address.";
    if (!isGhanaPhone(values.phone)) next.phone = "Use a valid number, e.g. 024 123 4567 or +233 24 123 4567.";
    setErrors(next);
    if (Object.keys(next).length) return focusFirstError(Object.keys(next));

    setSaving(true);
    // TODO: save to your API, e.g. await fetch("/api/profile", { method: "PATCH", body: JSON.stringify(values) })
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    setSaved(true);
    onNameChange(values.name.trim());
  }

  return (
    <SectionCard title="Personal details" description="Keep your details up to date so we can reach you about your bookings.">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="Your profile photo" className="h-20 w-20 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0E7C3A] text-2xl font-extrabold text-white">
            {initials(values.name) || "?"}
          </span>
        )}
        <div>
          <div className="flex flex-wrap gap-3">
            <label className={`${secondaryBtn} cursor-pointer focus-within:ring-2 focus-within:ring-[#0E7C3A]`}>
              Change photo
              <input type="file" accept="image/*" onChange={onPhoto} className="sr-only" />
            </label>
            {photo && (
              <button type="button" onClick={() => setPhoto(null)} className={secondaryBtn}>
                Remove
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-neutral-500">JPG or PNG, up to 2 MB.</p>
          {photoError && <p className="mt-1 text-xs font-medium text-red-600">{photoError}</p>}
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        {saved && <Notice>Your details have been saved.</Notice>}

        <TextField id="name" label="Full name" autoComplete="name" value={values.name} onChange={set("name")} error={errors.name} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id="email" label="Email address" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set("email")} error={errors.email} />
          <TextField id="phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} error={errors.phone} />
        </div>

        <div className="sm:max-w-[220px]">
          <SubmitButton loading={saving}>{saving ? "Saving..." : "Save changes"}</SubmitButton>
        </div>
      </form>
    </SectionCard>
  );
}