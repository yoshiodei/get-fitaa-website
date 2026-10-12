import { Fragment, type ReactNode } from "react";

const icon = {
  width: 52,
  height: 52,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const STEPS: { label: string; icon: ReactNode }[] = [
  {
    label: "1. Choose Your Service",
    icon: (
      // Broom + dust pile
      <svg {...icon}>
        <path d="M30 6v22" />
        <path d="M26 28h8l4 12H22l4-12Z" />
        <path d="M27 40l2-9M31 40l1-9M35 40l-1-9" />
        <path d="M6 40h14M9 40c0-4 3-6 6-6s5 2 5 6" />
        <circle cx="12" cy="28" r="1.2" />
        <circle cx="19" cy="24" r="1.2" />
      </svg>
    ),
  },
  {
    label: "2. Pick a Date & Time",
    icon: (
      // Calendar
      <svg {...icon}>
        <rect x="6" y="9" width="36" height="33" rx="5" />
        <path d="M6 19h36M15 5v8M33 5v8" />
        <path d="M14 26h.01M20 26h.01M26 26h.01M32 26h.01M14 32h.01M20 32h.01M26 32h.01M32 32h.01M14 38h.01M20 38h.01M26 38h.01" strokeWidth="3.2" />
      </svg>
    ),
  },
  {
    label: "3. Confirm Your Booking",
    icon: (
      // Phone
      <svg {...icon}>
        <rect x="14" y="4" width="20" height="40" rx="3" />
        <path d="M14 10h20M14 36h20M22 40h4" />
      </svg>
    ),
  },
  {
    label: "4. Enjoy a Spotless Space",
    icon: (
      // Check in circle
      <svg {...icon}>
        <circle cx="24" cy="24" r="19" strokeWidth="3" />
        <path d="m15 25 6 6 12-13" strokeWidth="3.2" />
      </svg>
    ),
  },
];

function Arrow() {
  return (
    <li
      aria-hidden="true"
      className="hidden h-24 shrink-0 items-center justify-center px-2 text-white md:flex lg:h-28 lg:px-4"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </li>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-20 bg-[#16591B] px-4 py-10 text-white sm:px-6 sm:py-12 lg:px-10 lg:py-14"
    >
      <div className="text-center">
        <h2 id="how-it-works-heading" className="text-2xl font-bold sm:text-3xl">
          How It Works
        </h2>
        <p className="mt-2 text-sm sm:text-base">
          Book in very simple steps and enjoy a spotless space
        </p>
      </div>

      {/* Mobile: 2 per row, no arrows. md and up: 4 in a row with arrows */}
      <ol className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-10 md:flex md:items-start md:justify-between md:gap-0">
        {STEPS.map((step, i) => (
          <Fragment key={step.label}>
            <li className="flex flex-col items-center text-center md:flex-1">
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#17B917] lg:h-28 lg:w-28">
                {step.icon}
              </span>
              <span className="mt-4 max-w-[10rem] text-sm font-medium leading-snug sm:text-base">
                {step.label}
              </span>
            </li>
            {i < STEPS.length - 1 && <Arrow />}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}