import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQs | getFitaa",
  description:
    "Answers to common questions about booking, pricing, payments, our cleaners and the areas we serve.",
};

/** Sample answers: edit them to match your real policies. */
const CATEGORIES = [
  {
    id: "booking",
    title: "Booking",
    faqs: [
      {
        q: "How do I book a clean?",
        a: "Choose your service, area, date and time in the booking form, review your price estimate and confirm online. It only takes a few minutes.",
      },
      {
        q: "How far ahead should I book?",
        a: "We recommend booking a day or two ahead for the best choice of time slots. The booking form shows the times currently available.",
      },
      {
        q: "Can I change or cancel my booking?",
        a: "Yes. Contact us as early as you can and we will help you reschedule or cancel. Use the phone number or email at the bottom of this page.",
      },
      {
        q: "Do I need to be home during the clean?",
        a: "Not always. Just let us know how our cleaner can access the property when you book, and we will arrange the rest with you.",
      },
    ],
  },
  {
    id: "services",
    title: "Services & Areas",
    faqs: [
      {
        q: "Which services do you offer?",
        a: "We offer Standard Clean, Deep Clean, Move-In / Move-Out and Office Clean, plus carpet and upholstery cleaning and post-construction cleaning. See the pricing section for what each includes.",
      },
      {
        q: "Which areas do you cover?",
        a: "We currently serve Spintex, Nungua, Klagon, Tema and Lashibi, and we are growing. Choose your zone in the booking form to confirm availability.",
      },
      {
        q: "How long does a clean take?",
        a: "It depends on the service and the size of your space. You will see an estimate when you book, and your cleaner will confirm on the day.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Payment",
    faqs: [
      {
        q: "How is the price worked out?",
        a: "Each service has a starting price, which may vary with the size of your space. You will see your price estimate before you confirm.",
      },
      {
        q: "Are there any hidden fees?",
        a: "No. The price you are shown is the price you pay.",
      },
      {
        q: "How do I pay?",
        a: "You can pay securely online when you confirm your booking.",
      },
    ],
  },
  {
    id: "cleaners",
    title: "Our Cleaners",
    faqs: [
      {
        q: "Are your cleaners vetted?",
        a: "Yes. Every cleaner is vetted, certified and trained before they join getFitaa, so you can welcome them into your space with confidence.",
      },
      {
        q: "Do I need to provide cleaning supplies?",
        a: "No. Our cleaners bring their own equipment and cleaning products. If you prefer specific products, let us know when you book.",
      },
      {
        q: "What if I am not happy with the clean?",
        a: "Tell us straight away. We want every visit to meet our standard, and we will work with you to put things right.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      {/* ---------- Page header ---------- */}
      <section
        aria-labelledby="faq-heading"
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
            <li aria-current="page" className="font-semibold text-white">FAQs</li>
          </ol>
        </nav>

        <h1 id="faq-heading" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
          Quick answers about booking, pricing, payments and our cleaners.
        </p>
      </section>

      {/* ---------- Questions ---------- */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Jump links */}
          <nav aria-label="FAQ categories" className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full bg-[#E3F4E8] px-5 py-2 text-sm font-semibold text-[#0B3D22] transition-colors hover:bg-[#0E7C3A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
              >
                {c.title}
              </a>
            ))}
          </nav>

          <div className="mt-12 space-y-12">
            {CATEGORIES.map((c) => (
              <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-24">
                <h2 id={`${c.id}-title`} className="text-xl font-bold text-[#0E7C3A] sm:text-2xl">
                  {c.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {c.faqs.map((f) => (
                    <details
                      key={f.q}
                      className="group rounded-xl border border-neutral-200 bg-white open:border-[#0E7C3A] open:bg-[#F7FCF7]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-base font-semibold text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="shrink-0 text-[#0E7C3A] transition-transform group-open:rotate-180"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </summary>
                      <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-700 sm:text-base">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Still need help ---------- */}
      <section aria-labelledby="help-heading" className="bg-white px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-[#16591B] to-[#0E7C3A] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
          <h2 id="help-heading" className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            We are happy to help. Get in touch, or go ahead and book your clean.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:getFitaa@email.com"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#0E7C3A] transition-colors hover:bg-[#D9F7D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E7C3A] sm:w-auto"
            >
              <span className="text-[#0E7C3A]">Email Us</span>
            </a>
            <a
              href="tel:+233419419419"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E7C3A] sm:w-auto"
            >
              +233 419 419 419
            </a>
          </div>
        </div>
      </section>
    </>
  );
}