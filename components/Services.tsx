import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Put the four photos in /public/images/services/ :
 *   standard-clean.jpg, deep-clean.jpg, move-in-out.jpg, office-clean.jpg
 * Prices below are placeholders: change them to your real starting prices.
 */
type Service = {
  title: string;
  description: string;
  price: number;
  image: string;
  icon: ReactNode;
};

const icon = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const SERVICES: Service[] = [
  {
    title: "Standard Clean",
    description:
      "Regular upkeep for your home: dusting, vacuuming...",
    price: 250,
    image: "/images/services/standard-clean.png",
    icon: (
      <svg {...icon}>
        <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z" />
        <path d="M10 21v-6h4v6" />
      </svg>
    ),
  },
  {
    title: "Deep Clean",
    description:
      "A top-to-bottom scrub that reaches hidden corners...",
    price: 450,
    image: "/images/services/deep-clean.png",
    icon: (
      <svg {...icon}>
        <path d="M9 3c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6Z" />
        <path d="M18 14c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3Z" />
      </svg>
    ),
  },
  {
    title: "Move-In / Move-Out",
    description:
      "Leave a spotless place behind or start fresh...",
    price: 600,
    image: "/images/services/move-in-move-out.png",
    icon: (
      <svg {...icon}>
        <path d="M21 8 12 3 3 8v8l9 5 4-2.2" />
        <path d="m3 8 9 5 9-5M12 13v8" />
        <circle cx="19" cy="18" r="3.5" />
        <path d="m17.6 18 1 1 1.8-2" />
      </svg>
    ),
  },
  {
    title: "Office Clean",
    description:
      "Keep your workspace tidy and professional...",
    price: 350,
    image: "/images/services/office-clean.png",
    icon: (
      <svg {...icon}>
        <path d="M3 21h18M5 21V9h6v12M11 21V4h8v17" />
        <path d="M8 12h0M8 16h0M14 8h2M14 12h2M14 16h2" />
      </svg>
    ),
  },
];

const formatPrice = (n: number) => `₵ ${n.toLocaleString("en-GH")}`;

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-20 bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14"
    >
      <p className="text-sm font-bold uppercase tracking-wide text-[#0E7C3A]">Our Services</p>
      <h2
        id="services-heading"
        className="mt-2 text-2xl font-bold text-neutral-800 sm:text-3xl"
      >
        Choose The Right Clean for You
      </h2>

      <ul className="mt-6 grid gap-6 grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {SERVICES.map((s) => (
          <li key={s.title} className="flex">
            <article className="flex w-full flex-col">
              {/* Photo with overlapping icon badge */}
              <div className="relative aspect-[16/9] w-full rounded-xl bg-neutral-100 lg:aspect-[16/8]">
                <Image
                  src={s.image}
                  alt={`${s.title} service`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="rounded-xl object-cover"
                />
                <span className="absolute -bottom-7 left-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0E7C3A]">
                  {s.icon}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col px-3 pt-9">
                <h3 className="text-lg font-bold text-neutral-800">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{s.description}</p>

                <div className="mt-auto pt-5 flex flex-col gap-2 items-start justify-end">

                <p className=" text-sm text-neutral-600">
                  from{" "}
                  <span className="text-base font-bold text-neutral-900">
                    {formatPrice(s.price)}
                  </span>
                </p>
                
                <Link
                  href={`/book?service=${encodeURIComponent(s.title)}`}
                  className="group inline-flex items-center gap-2 text-base font-bold text-[#0E7C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
                >
                  Book Now
                  <svg
                    width="18"
                    height="18"
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
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}