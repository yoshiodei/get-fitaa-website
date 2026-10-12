"use client";

import { useState, type FormEvent } from "react";
import { Notice, SectionCard, primaryBtn, secondaryBtn, inputClass } from "./Ui";

const LABELS = ["Poor", "Fair", "Good", "Very good", "Excellent"];
const TAGS = ["Easy to use", "Fast booking", "Great cleaners", "Fair prices", "Clear information", "Needs improvement"];
const MAX = 500;

function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true" fill={filled ? "#F5B800" : "none"} stroke={filled ? "#F5B800" : "#9CA3AF"} strokeWidth="1.5" strokeLinejoin="round">
      <path d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z" />
    </svg>
  );
}

export default function RateApp() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const shown = hover || rating;

  const toggleTag = (t: string) =>
    setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!rating) return setError("Please choose a star rating before sending.");
    setError("");
    setLoading(true);
    // TODO: send to your API, e.g. await fetch("/api/feedback", { method: "POST", body: JSON.stringify({ rating, tags, comment }) })
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SectionCard title="Rate getFitaa">
        <div role="status" className="rounded-2xl bg-[#E3F4E8] px-6 py-10 text-center">
          <div className="flex justify-center gap-1" aria-label={`You rated us ${rating} out of 5`} role="img">
            {[1, 2, 3, 4, 5].map((n) => (<Star key={n} filled={n <= rating} />))}
          </div>
          <h3 className="mt-4 text-xl font-bold text-[#0B3D22]">Thank you for your feedback!</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-700">
            Your rating helps us make getFitaa better for everyone.
          </p>
          <button type="button" onClick={() => setSubmitted(false)} className={`${secondaryBtn} mt-5`}>
            Edit my rating
          </button>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Rate getFitaa" description="Tell us how we are doing. It only takes a moment.">
      <form onSubmit={onSubmit} noValidate className="space-y-6">
        {error && <Notice tone="error">{error}</Notice>}

        <fieldset>
          <legend className="text-sm font-semibold text-neutral-800">How would you rate your experience?</legend>
          <div className="mt-3 flex items-center gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => { setRating(n); setError(""); }}
                  className="peer sr-only"
                />
                <span className="block rounded-md p-0.5 transition-transform hover:scale-110 peer-focus-visible:ring-2 peer-focus-visible:ring-[#0E7C3A] peer-focus-visible:ring-offset-2">
                  <Star filled={n <= shown} />
                </span>
                <span className="sr-only">{n} out of 5, {LABELS[n - 1]}</span>
              </label>
            ))}
            <span aria-live="polite" className="ml-3 text-sm font-semibold text-[#0E7C3A]">
              {shown ? LABELS[shown - 1] : ""}
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-neutral-800">What stood out? <span className="font-normal text-neutral-500">(optional)</span></legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {TAGS.map((t) => {
              const on = tags.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleTag(t)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2 ${
                    on ? "border-[#0E7C3A] bg-[#0E7C3A] text-white" : "border-neutral-300 bg-white text-neutral-700 hover:border-[#0E7C3A]"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="feedback" className="mb-1.5 block text-sm font-semibold text-neutral-800">
            Anything else you would like to tell us? <span className="font-normal text-neutral-500">(optional)</span>
          </label>
          <textarea
            id="feedback"
            rows={4}
            maxLength={MAX}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share what you liked or how we can improve..."
            className={`${inputClass} resize-y`}
          />
          <p className="mt-1 text-right text-xs text-neutral-500">{comment.length}/{MAX}</p>
        </div>

        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? "Sending..." : "Submit rating"}
        </button>
      </form>
    </SectionCard>
  );
}