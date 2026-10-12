"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FormAlert, SubmitButton, TextField } from "./AuthFields";
import { focusFirstError, isEmail } from "../../lib/auth/validation";

type Errors = Partial<Record<"email" | "password", string>>;

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    const next: Errors = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!isEmail(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return focusFirstError(Object.keys(next));

    setLoading(true);
    try {
      // TODO: replace with your real sign-in call, e.g.
      // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password, remember }) });
      // if (!res.ok) throw new Error("Invalid email or password.");
      await new Promise((r) => setTimeout(r, 800));
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

      <TextField
        id="email"
        label="Email address"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setErrors((p) => ({ ...p, email: undefined }));
        }}
        error={errors.email}
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrors((p) => ({ ...p, password: undefined }));
        }}
        error={errors.password}
        labelAction={
          <Link href="/forgot-password" className="text-xs font-semibold text-[#0E7C3A] hover:underline">
            Forgot password?
          </Link>
        }
      />

      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 accent-[#0E7C3A]"
        />
        Keep me signed in
      </label>

      <SubmitButton loading={loading}>{loading ? "Logging in..." : "Log In"}</SubmitButton>
    </form>
  );
}