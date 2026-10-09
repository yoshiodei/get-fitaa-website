import { getImageProps } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import BookingCard from "./BookingCard";

const svg = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const TRUST_POINTS: { icon: ReactNode; lines: [string, string] }[] = [
  {
    icon: (
      <svg {...svg}>
        <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    lines: ["Trusted &", "Certified Cleaners"],
  },
  {
    icon: (
      <svg {...svg}>
        <path d="M20 12 12 20a2 2 0 0 1-3 0l-5-5a2 2 0 0 1 0-3l8-8h6v6Z" />
        <circle cx="15.5" cy="8.5" r="1" />
      </svg>
    ),
    lines: ["Transparent Pricing", "(No Hidden Fees)"],
  },
  {
    icon: (
      <svg {...svg}>
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
    lines: ["Easy Online Booking", "& Secure Payments"],
  },
];

export default function Hero() {
  // Art direction: a portrait photo below 1024px, the wide photo from 1024px up.
  // Needs Next.js 14.1+ (getImageProps).
  const common = { alt: "", fill: true, sizes: "100vw", priority: true };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: "/images/hero.jpg" });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: "/images/hero.png" });

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
      {/* Background photo */}
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 1023px)" srcSet={mobileSrcSet} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...imgProps}
          alt=""
          className="-z-20 object-cover object-top lg:object-center"
        />
      </picture>

      {/* Overlay: fades up from the bottom on mobile/tablet, fades from the left on desktop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-35% via-white/75 via-70% to-white lg:bg-gradient-to-r lg:from-white lg:from-30% lg:via-white/60 lg:via-50% lg:to-transparent lg:to-75%"
      />

      <div className="flex min-h-[680px] flex-col justify-end px-4 pb-8 pt-10 sm:min-h-[780px] sm:px-6 sm:pb-12 lg:grid lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-10 lg:px-10 lg:py-14 xl:grid-cols-[minmax(0,1fr)_400px]">
        {/* Copy + trust points + CTAs */}
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-wide text-[#0E7C3A] lg:text-[11px] lg:tracking-wider">
            On-demand cleaning service
          </p>

          <h1
            id="hero-heading"
            className="mt-2 text-4xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-5xl lg:mt-3 lg:text-[#0B2A1A] xl:text-6xl"
          >
            A Cleaner Home,
            <span className="block text-[#0E7C3A]">Made Easy.</span>
          </h1>

          {/* Short line on mobile/tablet, full paragraph on desktop */}
          <p className="mt-4 text-base text-neutral-900 lg:hidden">
            Trusted cleaners, fair prices, easy booking.
          </p>
          <p className="mt-5 hidden max-w-md text-base leading-relaxed text-neutral-700 lg:block">
            Book trusted, certified cleaners in Tema, Spintex, Nungua, Ashaiman, Klagon and
            Lashibi. Quality cleaning, transparent pricing, and flexible scheduling — all at your
            fingertips.
          </p>

          {/* Trust points: 3 white cards on mobile/tablet, inline with dividers on desktop */}
          <ul className="mt-6 grid grid-cols-3 gap-3 sm:gap-4 lg:mt-7 lg:flex lg:items-stretch lg:gap-0">
            {TRUST_POINTS.map((point, i) => (
              <li
                key={point.lines[0]}
                className={`flex flex-col items-center gap-3 rounded-xl bg-white text-center shadow-md shadow-black/10 p-1 sm:p-2 lg:flex-1 lg:flex-row lg:gap-2.5 lg:rounded-none lg:bg-transparent lg:p-0 lg:text-left lg:shadow-none ${
                  i === 0 ? "lg:pr-4" : "lg:border-l lg:border-neutral-300 lg:pl-4"
                } ${i === 1 ? "lg:pr-4" : ""}`}
              >
                <span className="flex h-8 w-8 p-1 shrink-0 items-center justify-center rounded-lg bg-[#0E7C3A] text-white sm:h-7 sm:w-7 lg:h-auto lg:w-auto lg:bg-transparent lg:text-[#0E7C3A]">
                  {point.icon}
                </span>
                <span className="text-[11px] font-semibold leading-snug text-neutral-800 sm:text-[11px] lg:text-[11px] lg:font-medium">
                  {point.lines[0]}
                  <br className="hidden lg:block" /> {point.lines[1]}
                </span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-4 lg:mt-8">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-[#0E7C3A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B6430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
            >
              <p className="text-white">Book a Clean</p>
              <svg color="white" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <Link
              href="/#how-it-works"
              className="group inline-flex items-center gap-2.5 rounded-full text-sm font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-900 transition-colors group-hover:border-[#0E7C3A] group-hover:text-[#0E7C3A]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5Z" />
                </svg>
              </span>
              How It Works
            </Link>
          </div>
        </div>

        {/* Booking card: desktop only */}
        <div className="hidden w-full lg:block lg:justify-self-end">
          <BookingCard />
        </div>
      </div>
    </section>
  );
}





// import Image from "next/image";
// import Link from "next/link";
// import type { ReactNode } from "react";
// import BookingCard from "./BookingCard";

// const svg = {
//   width: 28,
//   height: 28,
//   viewBox: "0 0 24 24",
//   fill: "none",
//   stroke: "currentColor",
//   strokeWidth: 2,
//   strokeLinecap: "round" as const,
//   strokeLinejoin: "round" as const,
//   "aria-hidden": true,
// };

// const TRUST_POINTS: { icon: ReactNode; lines: string[] }[] = [
//   {
//     icon: (
//       <svg {...svg}>
//         <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6l-8-3Z" />
//         <path d="m9 12 2 2 4-4" />
//       </svg>
//     ),
//     lines: ["Trusted &", "Certified Cleaners"],
//   },
//   {
//     icon: (
//       <svg {...svg}>
//         <path d="M20 12 12 20a2 2 0 0 1-3 0l-5-5a2 2 0 0 1 0-3l8-8h6v6Z" />
//         <circle cx="15.5" cy="8.5" r="1" />
//       </svg>
//     ),
//     lines: ["Transparent Pricing", "(No Hidden Fees)"],
//   },
//   {
//     icon: (
//       <svg {...svg}>
//         <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
//       </svg>
//     ),
//     lines: ["Easy Online Booking", "& Secure Payments"],
//   },
// ];

// export default function Hero() {
//   return (
//     <section className="relative isolate overflow-hidden bg-green-400" aria-labelledby="hero-heading">
//       {/* Background photo — export the photo WITHOUT the text/card baked in */}
//       <Image
//         src="/images/hero.png"
//         alt=""
//         fill
//         priority
//         sizes="100vw"
//         className="-z-20 object-cover object-[65%_center] lg:object-center"
//       />
//       {/* Readability overlay: strong on mobile/tablet, fades to the right on desktop */}
//       <div
//         className="absolute inset-0 -z-10 lg:bg-gradient-to-r lg:from-white lg:from-30% lg:via-white/60 lg:via-50% lg:to-transparent lg:to-75%"
//         aria-hidden="true"
//       />

//       <div className="grid items-center gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10 lg:px-10 lg:py-14 xl:grid-cols-[minmax(0,1fr)_400px]">
//         {/* Left: copy + CTAs */}
//         <div className="max-w-xl">
//           <p className="text-[11px] font-bold uppercase tracking-wider text-[#0E7C3A]">
//             On-demand cleaning service
//           </p>

//           <h1
//             id="hero-heading"
//             className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0B2A1A] sm:text-5xl xl:text-6xl"
//           >
//             A Cleaner Home,
//             <span className="block text-[#0E7C3A]">Made Easy.</span>
//           </h1>

//           <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-700 sm:text-base">
//             Book trusted, certified cleaners in Tema, Spintex, Nungua, Ashaiman, Klagon and
//             Lashibi. Quality cleaning, transparent pricing, and flexible scheduling — all at your
//             fingertips.
//           </p>

//           {/* Trust points */}
//           <ul className="mt-7 flex flex-wrap items-stretch gap-x-5 gap-y-4 sm:flex-nowrap sm:gap-0">
//             {TRUST_POINTS.map((point, i) => (
//               <li
//                 key={point.lines[0]}
//                 className={`flex items-center gap-2.5 sm:flex-1 ${
//                   i > 0 ? "sm:border-l sm:border-neutral-300 sm:pl-4" : "sm:pr-4"
//                 } ${i === 1 ? "sm:pr-4" : ""}`}
//               >
//                 <span className="shrink-0 text-[#0E7C3A]">{point.icon}</span>
//                 <span className="text-[11px] font-medium leading-snug text-neutral-800">
//                   {point.lines[0]}
//                   <br />
//                   {point.lines[1]}
//                 </span>
//               </li>
//             ))}
//           </ul>

//           {/* CTAs */}
//           <div className="mt-8 flex flex-wrap items-center gap-4">
//             <Link
//               href="/book"
//               className="inline-flex items-center gap-2 rounded-full bg-[#0E7C3A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B6430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
//             >
//               Book a Clean
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//                 <path d="M5 12h14M13 6l6 6-6 6" />
//               </svg>
//             </Link>

//             <Link
//               href="/#how-it-works"
//               className="group inline-flex items-center gap-2.5 text-sm font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2 rounded-full"
//             >
//               <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-900 transition-colors group-hover:border-[#0E7C3A] group-hover:text-[#0E7C3A]">
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//                   <path d="M8 5v14l11-7L8 5Z" />
//                 </svg>
//               </span>
//               How It Works
//             </Link>
//           </div>
//         </div>

//         {/* Right: booking card */}
//         <div className="w-full lg:justify-self-end">
//           <BookingCard />
//         </div>
//       </div>
//     </section>
//   );
// }