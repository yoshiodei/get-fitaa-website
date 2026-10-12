"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FormAlert, SubmitButton, TextField } from "./AuthFields";
import { focusFirstError, isEmail, isGhanaPhone } from "../../lib/auth/validation";

const FIELDS = ["name", "email", "phone", "password", "confirm", "terms"] as const;
type Field = (typeof FIELDS)[number];
type Errors = Partial<Record<Field, string>>;

export default function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const set =
    (key: keyof typeof values) => (e: { target: { value: string } }) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: undefined }));
    };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!values.email.trim()) next.email = "Enter your email address.";
    else if (!isEmail(values.email)) next.email = "Enter a valid email address.";
    if (!values.phone.trim()) next.phone = "Enter your phone number.";
    else if (!isGhanaPhone(values.phone)) next.phone = "Use a valid number, e.g. 024 123 4567 or +233 24 123 4567.";
    if (values.password.length < 8) next.password = "Password must be at least 8 characters.";
    if (values.confirm !== values.password) next.confirm = "Passwords do not match.";
    if (!terms) next.terms = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return focusFirstError(Object.keys(next));

    setLoading(true);
    try {
      // TODO: replace with your real sign-up call, e.g.
      // const res = await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(values) });
      // if (!res.ok) throw new Error("We could not create your account.");
      await new Promise((r) => setTimeout(r, 900));
      router.push("/");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {formError && <FormAlert>{formError}</FormAlert>}

      <TextField id="name" label="Full name" autoComplete="name" placeholder="Ama Serwaa"
        value={values.name} onChange={set("name")} error={errors.name} />

      <TextField id="email" label="Email address" type="email" inputMode="email" autoComplete="email"
        placeholder="you@example.com" value={values.email} onChange={set("email")} error={errors.email} />

      <TextField id="phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel"
        placeholder="024 123 4567" value={values.phone} onChange={set("phone")} error={errors.phone} />

      <TextField id="password" label="Password" type="password" autoComplete="new-password"
        placeholder="At least 8 characters" hint="Use at least 8 characters."
        value={values.password} onChange={set("password")} error={errors.password} />

      <TextField id="confirm" label="Confirm password" type="password" autoComplete="new-password"
        placeholder="Re-enter your password" value={values.confirm} onChange={set("confirm")} error={errors.confirm} />

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-neutral-700">
          <input
            id="terms"
            type="checkbox"
            checked={terms}
            onChange={(e) => {
              setTerms(e.target.checked);
              setErrors((p) => ({ ...p, terms: undefined }));
            }}
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? "terms-error" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 accent-[#0E7C3A]"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-semibold text-[#0E7C3A] hover:underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-semibold text-[#0E7C3A] hover:underline">Privacy Policy</Link>.
          </span>
        </label>
        {errors.terms && (
          <p id="terms-error" className="mt-1.5 text-xs font-medium text-red-600">{errors.terms}</p>
        )}
      </div>

      <SubmitButton loading={loading}>{loading ? "Creating account..." : "Create Account"}</SubmitButton>
    </form>
  );
}