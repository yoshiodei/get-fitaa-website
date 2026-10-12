import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us | getFitaa",
  description:
    "Learn about getFitaa: our story, mission, vision and the values behind every clean.",
};

/**
 * Add these photos to /public/images/about/ :
 *   story.jpg  -> a cleaner at work in a home (landscape or square)
 *   team.jpg   -> your team working together (wide, landscape)
 */
const IMAGES = {
  story: "/images/about/story.jpg",
  team: "/images/about/team.jpg",
};

/** Sample numbers: replace with your real figures (or delete the section). */
const STATS = [
  { value: "500+", label: "Homes & offices cleaned" },
  { value: "50+", label: "Certified cleaners" },
  { value: "5", label: "Areas served" },
  { value: "4.9/5", label: "Average client rating" },
];

const icon = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const VALUES: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Trust & Safety",
    text: "Every cleaner is vetted, certified and trained, so you can welcome them into your space with confidence.",
    icon: (
      <svg {...icon}>
        <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Quality First",
    text: "We follow a detailed checklist for every service, so the standard is the same on every visit.",
    icon: (
      <svg {...icon}>
        <path d="M9 3c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
        <path d="M18 14c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3Z" />
      </svg>
    ),
  },
  {
    title: "Honest Pricing",
    text: "Clear prices up front with no hidden fees. What we quote is what you pay.",
    icon: (
      <svg {...icon}>
        <path d="M20 12 12 20a2 2 0 0 1-3 0l-5-5a2 2 0 0 1 0-3l8-8h6v6Z" />
        <circle cx="15.5" cy="8.5" r="1" />
      </svg>
    ),
  },
  {
    title: "Care for People",
    text: "We treat our cleaners fairly and our clients kindly, because good service starts with respect.",
    icon: (
      <svg {...icon}>
        <path d="M12 21s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.2-8 11-8 11Z" />
      </svg>
    ),
  },
];

const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#0E7C3A] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B6430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2";

export default function AboutPage() {
  return (
    <>
      {/* ---------- Page header ---------- */}
      <section
        aria-labelledby="about-heading"
        className="relative isolate overflow-hidden bg-gradient-to-br from-[#16591B] to-[#0E7C3A] px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        {/* decorative circles */}
        <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/10 sm:h-80 sm:w-80" />
        <div aria-hidden="true" className="absolute -bottom-20 right-1/4 -z-10 h-48 w-48 rounded-full bg-white/5 sm:h-64 sm:w-64" />

        <nav aria-label="Breadcrumb" className="text-sm text-white/80">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">About</li>
          </ol>
        </nav>

        <h1 id="about-heading" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          About getFitaa
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
          Clean homes. Brighter lives. We make it simple to book trusted cleaners and enjoy a
          spotless space.
        </p>
      </section>

      {/* ---------- Our story ---------- */}
      <section
        aria-labelledby="story-heading"
        className="overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative isolate">
            <div aria-hidden="true" className="absolute -bottom-3 -left-3 -z-10 h-full w-full rounded-2xl bg-[#D9F7D5] lg:-bottom-4 lg:-left-4" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={IMAGES.story}
                alt="A getFitaa cleaner at work in a home"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 right-4 rounded-xl bg-white px-4 py-3 shadow-lg shadow-black/10 sm:right-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[#0E7C3A]">Vetted & certified</p>
              <p className="text-sm font-semibold text-neutral-800">Cleaners you can trust</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#0E7C3A]">Our story</p>
            <h2 id="story-heading" className="mt-2 text-2xl font-bold text-neutral-800 sm:text-3xl lg:text-4xl">
              Cleaning made simple, reliable and fair
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-700">
              <p>
                getFitaa is an on-demand cleaning service built for busy people across Spintex,
                Nungua, Klagon, Tema and Lashibi. We started with a simple idea: finding a
                trustworthy cleaner should not be stressful, and a spotless home should not be a
                luxury.
              </p>
              <p>
                Today we connect homes and offices with trained, certified cleaners through a
                quick online booking. You choose the service, pick a time that suits you, and we
                take care of the rest, with clear prices and no surprises.
              </p>
              <p>
                Behind every booking is a team that takes pride in the details, because we
                believe a clean space gives you more time, more calm and a brighter day.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/book" className={buttonPrimary}>
                <span className="text-white">Book a Clean</span>
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#0E7C3A] px-7 py-3 text-sm font-semibold text-[#0E7C3A] transition-colors hover:bg-[#0E7C3A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section aria-label="getFitaa in numbers" className="bg-[#16591B] px-4 py-10 text-white sm:px-6 lg:px-10 lg:py-12">
        <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-1 text-sm text-white/85 sm:text-base">{s.label}</dt>
              <dd className="order-1 text-3xl font-extrabold sm:text-4xl lg:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Mission & Vision ---------- */}
      <section
        aria-labelledby="mv-heading"
        className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#0E7C3A]">What drives us</p>
          <h2 id="mv-heading" className="mt-2 text-2xl font-bold text-neutral-800 sm:text-3xl lg:text-4xl">
            Our Mission & Vision
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-[#D9F7D5] p-7 sm:p-9">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0E7C3A] text-white">
              <svg {...icon} width={30} height={30}>
                <path d="M20 3c-9 0-15 4-15 11 0 2 .7 3.8 2 5C8.2 12.5 12 9.5 17 8c-4 2.5-6.5 6-7.5 11.3.8.4 1.7.7 2.5.7 7 0 10-6 8-18Z" />
              </svg>
            </span>
            <h3 className="mt-5 text-xl font-bold text-[#0B3D22] sm:text-2xl">Our Mission</h3>
            <p className="mt-3 leading-relaxed text-neutral-800">
              To make every home and workplace in our community cleaner, healthier and more
              welcoming by connecting people with trusted, certified cleaners, with fair prices,
              reliable service and real care in every detail.
            </p>
          </article>

          <article className="rounded-2xl bg-gradient-to-br from-[#16591B] to-[#0E7C3A] p-7 text-white sm:p-9">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0E7C3A]">
              <svg {...icon} width={30} height={30}>
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <h3 className="mt-5 text-xl font-bold sm:text-2xl">Our Vision</h3>
            <p className="mt-3 leading-relaxed text-white/95">
              To be the most trusted on-demand cleaning service in Ghana, where a spotless home
              or office is always one easy booking away, and where cleaners are respected, skilled
              and proud of their work.
            </p>
          </article>
        </div>
      </section>

      {/* ---------- Team at work ---------- */}
      <section aria-labelledby="team-heading" className="bg-white px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
        <div className="relative isolate flex min-h-[360px] items-end overflow-hidden rounded-2xl bg-neutral-100 sm:min-h-[440px] lg:min-h-[520px]">
          <Image
            src={IMAGES.team}
            alt="The getFitaa team cleaning a living room together"
            fill
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B3D22]/90 via-[#0B3D22]/40 to-transparent" />
          <div className="max-w-2xl p-6 text-white sm:p-10 lg:p-12">
            <h2 id="team-heading" className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Meet the people behind the shine
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
              Our cleaners are trained in modern techniques, equipped with quality products and
              proud of the work they do. Every visit is a promise: on time, thorough and
              respectful of your space.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section
        aria-labelledby="values-heading"
        className="bg-[#F1F8F0] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#0E7C3A]">What we stand for</p>
          <h2 id="values-heading" className="mt-2 text-2xl font-bold text-neutral-800 sm:text-3xl lg:text-4xl">
            Our Core Values
          </h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {VALUES.map((v) => (
            <li key={v.title} className="rounded-2xl bg-white p-6 shadow-sm shadow-black/5 transition-shadow hover:shadow-md">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D9F7D5] text-[#0E7C3A]">
                {v.icon}
              </span>
              <h3 className="mt-4 text-lg font-bold text-neutral-800">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Call to action ---------- */}
      <section aria-labelledby="cta-heading" className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-[#16591B] to-[#0E7C3A] px-6 py-10 text-center text-white sm:px-10 sm:py-14">
          <h2 id="cta-heading" className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Ready for a cleaner, brighter space?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Book in a few easy steps, or join our team of professional cleaners.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#0E7C3A] transition-colors hover:bg-[#D9F7D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E7C3A] sm:w-auto"
            >
              <span className="text-[#0E7C3A]">Book a Clean</span>
            </Link>
            <Link
              href="/join"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E7C3A] sm:w-auto"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}