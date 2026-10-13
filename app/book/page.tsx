import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BookingPage from "@/components/book/BookingPage";

export const metadata: Metadata = {
  title: "Book a Clean | CleanGo",
  description: "Choose your service, tell us about your space and book a trusted CleanGo cleaner in minutes.",
};

export default function BookPage() {
  return (
    <>
      {/* ---------- Page header ---------- */}
      <section
        aria-labelledby="book-heading"
        className="relative isolate overflow-hidden bg-gradient-to-br from-[#16591B] to-[#0E7C3A] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      >
        <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/10 sm:h-80 sm:w-80" />
        <div aria-hidden="true" className="absolute -bottom-20 right-1/4 -z-10 h-48 w-48 rounded-full bg-white/5 sm:h-64 sm:w-64" />

        <nav aria-label="Breadcrumb" className="text-sm text-white/80">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">Book a clean</li>
          </ol>
        </nav>

        <h1 id="book-heading" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Book a Clean
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
          Your cleaner space is just a few steps away. Choose your service, tell us about your
          space and pick a time.
        </p>
      </section>

      {/* ---------- Booking form ---------- */}
      <section className="bg-[#F7FCF7] px-3 py-6 sm:px-6 sm:py-10 lg:px-6 lg:py-12 xl:px-10">
        {/* useSearchParams (pre-filling from the hero form) needs a Suspense boundary */}
        <Suspense fallback={<p className="py-20 text-center text-neutral-600">Loading booking form...</p>}>
          <BookingPage />
        </Suspense>
      </section>
    </>
  );
}