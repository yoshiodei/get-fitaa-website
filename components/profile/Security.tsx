"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { SubmitButton, TextField } from "@/components/auth/AuthFields";
import { focusFirstError } from "../../lib/auth/validation";
import { Notice, SectionCard, inputClass } from "./Ui";

type Errors = Partial<Record<"current" | "next" | "confirm", string>>;

export default function Security() {
  const router = useRouter();
  const [v, setV] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    setErrors((p) => ({ ...p, [k]: undefined }));
    setSaved(false);
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!v.current) next.current = "Enter your current password.";
    if (v.next.length < 8) next.next = "New password must be at least 8 characters.";
    else if (v.next === v.current) next.next = "Choose a password different from your current one.";
    if (v.confirm !== v.next) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length) return focusFirstError(["current", "next", "confirm"].filter((k) => k in next));

    setSaving(true);
    // TODO: call your API to change the password
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setV({ current: "", next: "", confirm: "" });
  }

  async function deleteAccount() {
    setDeleting(true);
    // TODO: call your API to delete the account, then sign the user out
    await new Promise((r) => setTimeout(r, 900));
    router.push("/");
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Change password" description="Use a strong password you do not use anywhere else.">
        <form onSubmit={onSubmit} noValidate className="max-w-md space-y-5">
          {saved && <Notice>Your password has been updated.</Notice>}
          <TextField id="current" label="Current password" type="password" autoComplete="current-password" value={v.current} onChange={set("current")} error={errors.current} />
          <TextField id="next" label="New password" type="password" autoComplete="new-password" hint="Use at least 8 characters." value={v.next} onChange={set("next")} error={errors.next} />
          <TextField id="confirm" label="Confirm new password" type="password" autoComplete="new-password" value={v.confirm} onChange={set("confirm")} error={errors.confirm} />
          <div className="sm:max-w-[220px]">
            <SubmitButton loading={saving}>{saving ? "Updating..." : "Update password"}</SubmitButton>
          </div>
        </form>
      </SectionCard>

      <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5 sm:p-7">
        <h2 className="text-xl font-bold text-red-700">Delete account</h2>
        <p className="mt-1 text-sm text-neutral-700">
          This permanently removes your account and personal details. Upcoming bookings will be cancelled. This cannot be undone.
        </p>
        <div className="mt-5 max-w-md">
          <label htmlFor="delete-confirm" className="mb-1.5 block text-sm font-semibold text-neutral-800">
            Type <span className="font-mono font-bold">DELETE</span> to confirm
          </label>
          <input id="delete-confirm" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} autoComplete="off" className={inputClass} />
          <button
            type="button"
            onClick={deleteAccount}
            disabled={confirmText !== "DELETE" || deleting}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete my account"}
          </button>
        </div>
      </div>
    </div>
  );
}