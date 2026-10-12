"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FormAlert, SubmitButton, TextField } from "./AuthFields";
import { isEmail } from "../../lib/auth/validation";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!email.trim()) return setError("Enter your email address.");
    if (!isEmail(email)) return setError("Enter a valid email address.");
    setError("");

    setLoading(true);
    try {
      // TODO: replace with your real reset-link request, e.g.
      // await fetch("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
      await new Promise((r) => setTimeout(r, 800));
      setSent(true);
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="rounded-2xl bg-[#E3F4E8] p-6 text-center sm:p-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0E7C3A] text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </span>
        <h2 className="mt-4 text-xl font-bold text-[#0B3D22]">Check your email</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">
          If an account exists for <span className="font-semibold">{email.trim()}</span>, we have sent a link to reset your password.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-[#0E7C3A] hover:underline"
        >
          Use a different email
        </button>
        <div className="mt-3">
          <Link href="/login" className="text-sm font-semibold text-neutral-700 hover:text-[#0E7C3A]">
            Back to log in
          </Link>
        </div>
      </div>
    );
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
          setError("");
        }}
        error={error}
      />

      <SubmitButton loading={loading}>{loading ? "Sending..." : "Send Reset Link"}</SubmitButton>
    </form>
  );
}