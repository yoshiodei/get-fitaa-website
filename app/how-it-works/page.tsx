import type { Metadata } from "next";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";

export const metadata: Metadata = {
  title: "How It Works | getFitaa",
  description:
    "See how easy it is to book a clean with getFitaa: choose a service, pick a time, confirm online and enjoy a spotless space.",
};

/**
 * Add your video in ONE of these ways (leave the other empty):
 *  - youtubeId: the part after "v=" in a YouTube link
 *  - src: a self-hosted file in /public/videos, e.g. "/videos/how-it-works.mp4"
 * poster: an optional cover image in /public/images/how-it-works/
 */
const VIDEO = {
  title: "How getFitaa works in four easy steps",
  youtubeId: "",
  src: "",
  poster: "",
};

const STEPS = [
  {
    title: "Choose your service",
    text: "Pick the clean that fits your space: Standard, Deep, Move-In / Move-Out or Office. Every service shows a clear starting price and what is included.",
    tip: "Not sure which to choose? A Standard Clean suits regular upkeep, while a Deep Clean is ideal for a first-time visit.",
  },
  {
    title: "Pick a date & time",
    text: "Select your area, then choose the day and time slot that works for you. Our cleaners cover Spintex, Nungua, Klagon, Tema and Lashibi.",
    tip: "Book a day or two ahead for the best choice of time slots.",
  },
  {
    title: "Confirm your booking",
    text: "Review your price estimate, confirm your details and pay securely online. You will receive a confirmation as soon as your booking is placed.",
    tip: "The price you see is the price you pay, with no hidden fees.",
  },
  {
    title: "Enjoy a spotless space",
    text: "Your certified cleaner arrives on time with everything needed, gets to work, and leaves your space fresh and spotless. Sit back and enjoy the difference.",
    tip: "Tell us how it went afterwards. Your feedback helps us keep standards high.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ---------- Page header ---------- */}
      <section
        aria-labelledby="hiw-heading"
        className="relative isolate overflow-hidden bg-gradient-to-br from-[#16591B] to-[#0E7C3A] px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/10 sm:h-80 sm:w-80" />
        <div aria-hidden="true" className="absolute -bottom-20 right-1/4 -z-10 h-48 w-48 rounded-full bg-white/5 sm:h-64 sm:w-64" />

        <nav aria-label="Breadcrumb" className="text-sm text-white/80">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">How it works</li>
          </ol>
        </nav>

        <h1 id="hiw-heading" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          How It Works
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
          Book in very simple steps and enjoy a spotless space. Watch the short video, or follow
          the steps below.
        </p>
      </section>

      {/* ---------- Video ---------- */}
      <section
        aria-labelledby="video-heading"
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#0E7C3A]">Watch the demo</p>
          <h2 id="video-heading" className="mt-2 text-2xl font-bold text-neutral-800 sm:text-3xl lg:text-4xl">
            See getFitaa in action
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-700 sm:text-base">
            A quick walkthrough of how to book your first clean, from start to finish.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <VideoPlayer
            title={VIDEO.title}
            youtubeId={VIDEO.youtubeId || undefined}
            src={VIDEO.src || undefined}
            poster={VIDEO.poster || undefined}
          />
        </div>
      </section>

      {/* ---------- Steps ---------- */}
      <section
        aria-labelledby="steps-heading"
        className="bg-[#F1F8F0] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#0E7C3A]">Step by step</p>
          <h2 id="steps-heading" className="mt-2 text-2xl font-bold text-neutral-800 sm:text-3xl lg:text-4xl">
            Four simple steps to a spotless space
          </h2>
        </div>

        <ol className="mx-auto mt-10 max-w-3xl">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0 sm:gap-6">
              {/* connecting line */}
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="absolute left-6 top-14 h-[calc(100%-3.5rem)] w-0.5 bg-[#0E7C3A]/25 sm:left-7 sm:top-16 sm:h-[calc(100%-4rem)]" />
              )}
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#17B917] text-lg font-extrabold text-white shadow-md shadow-[#17B917]/30 sm:h-14 sm:w-14 sm:text-xl">
                {i + 1}
              </span>
              <div className="flex-1 rounded-2xl bg-white p-5 shadow-sm shadow-black/5 sm:p-6">
                <h3 className="text-lg font-bold text-neutral-800 sm:text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700 sm:text-base">{step.text}</p>
                <p className="mt-4 rounded-lg bg-[#D9F7D5] px-4 py-3 text-sm text-[#0B3D22]">
                  <span className="font-bold">Tip: </span>
                  {step.tip}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- Call to action ---------- */}
      <section aria-labelledby="hiw-cta-heading" className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-[#16591B] to-[#0E7C3A] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
          <h2 id="hiw-cta-heading" className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Ready to book your first clean?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            It takes just a few minutes. Pick a service and we will take care of the rest.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#0E7C3A] transition-colors hover:bg-[#D9F7D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E7C3A] sm:w-auto"
            >
              <span className="text-[#0E7C3A]">Book a Clean</span>
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E7C3A] sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/90">
            Have questions?{" "}
            <Link href="/faq" className="font-bold underline underline-offset-4 hover:text-[#D9F7D5]">
              Read our FAQs
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}