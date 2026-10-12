import Image from "next/image";
import Link from "next/link";

/**
 * Add two photos to /public/images/ :
 *   mission-mobile.jpg   -> portrait photo, used below 1024px (mobile + tablet)
 *   mission-desktop.jpg  -> wide photo, used from 1024px up
 */
const MISSION_IMAGES = {
  mobile: "/images/mission-mobile.png",
  tablet: "/images/mission-desktop.png",
  desktop: "/images/mission-desktop.png",
};

const MISSION_TEXT =
  "To make every home and workplace in our community cleaner, healthier and more welcoming by connecting people with trusted, certified cleaners, with fair prices, reliable service and real care in every detail.";

function LeafIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M20 3c-9 0-15 4-15 11 0 2 .7 3.8 2 5C8.2 12.5 12 9.5 17 8c-4 2.5-6.5 6-7.5 11.3.8.4 1.7.7 2.5.7 7 0 10-6 8-18Z" />
      <path d="M5 21c1-4 3-7 6-9.5" />
    </svg>
  );
}

export default function Mission() {
  return (
    <section
      id="about"
      aria-labelledby="mission-heading"
      className="scroll-mt-20 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14"
    >
      <div className="relative isolate mx-auto max-w-2xl overflow-hidden rounded-2xl lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:rounded-none">
        {/* Mobile + tablet: photo fills the whole card */}
        <div className="absolute inset-0 sm:hidden">
          <Image
            src={MISSION_IMAGES.mobile}
            alt=""
            fill
            sizes="(min-width: 672px) 672px, 100vw"
            className="object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 hidden sm:hidden md:block lg:hidden">
          <Image
            src={MISSION_IMAGES.tablet}
            alt=""
            fill
            sizes="(min-width: 672px) 672px, 100vw"
            className="object-cover object-top "
          />
        </div>
        {/* Mobile + tablet: green fade from the bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-[#2E9A3E]/85 via-62% to-[#2A8A38] lg:hidden"
        />

        {/* Text card (overlay on mobile/tablet, green panel on desktop) */}
        <div className="relative z-10 flex min-h-[580px] flex-col justify-end p-6 text-white sm:min-h-[640px] sm:p-8 lg:min-h-[320px] lg:justify-start lg:rounded-2xl lg:bg-gradient-to-b lg:from-[#4CAF50] lg:to-[#1B6B2A] lg:p-10 xl:p-12">
          <div className="flex items-center gap-3">
            <LeafIcon />
            <h2 id="mission-heading" className="text-2xl font-bold sm:text-3xl">
              Our Mission
            </h2>
          </div>

          <p className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg lg:mt-5 lg:text-base xl:text-lg">
            {MISSION_TEXT}
          </p>

          <Link
            href="/about"
            className="group mt-6 inline-flex w-full max-w-[14rem] items-center justify-between rounded-full bg-[#43C45A] px-5 py-2 text-lg font-bold text-white transition-colors hover:bg-[#3AB24F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B6B2A] lg:mt-6 lg:self-start"
          >
            About Us
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Desktop: separate photo on the right */}
        <div className="relative hidden min-h-[320px] overflow-hidden rounded-2xl bg-neutral-100 lg:block">
          <Image
            src={MISSION_IMAGES.desktop}
            alt="getFitaa cleaners tidying a living room"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}