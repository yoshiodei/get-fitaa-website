import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import JoinSection from "@/components/join/JoinSection";

export const metadata: Metadata = {
  title: "Join Our Team | getFitaa",
  description: "Work with getFitaa. See our open positions and apply to join our team of professional cleaners and staff.",
};

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

/** Sample benefits: edit these so they match what you really offer. */
const BENEFITS: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Fair, reliable pay",
    text: "Clear rates and on-time payment for the work you do.",
    icon: (<svg {...icon}><circle cx="12" cy="12" r="9" /><path d="M14.5 9.5c-.4-1-1.3-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.2 0-2.1-.5-2.5-1.5M12 6v2m0 8v2" /></svg>),
  },
  {
    title: "Flexible schedules",
    text: "Choose roles and shifts that fit around your life.",
    icon: (<svg {...icon}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  },
  {
    title: "Training provided",
    text: "Learn professional cleaning techniques and safe equipment use.",
    icon: (<svg {...icon}><path d="M3 9 12 4l9 5-9 5-9-5Z" /><path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" /></svg>),
  },
  {
    title: "Room to grow",
    text: "Move up to deep-clean specialist or team supervisor roles.",
    icon: (<svg {...icon}><path d="M4 17 10 11l4 4 6-7" /><path d="M15 8h5v5" /></svg>),
  },
  {
    title: "Equipment & uniform",
    text: "We supply the tools, products and uniform you need.",
    icon: (<svg {...icon}><path d="M8 3 4 6l2 3 2-1v13h8V8l2 1 2-3-4-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3Z" /></svg>),
  },
  {
    title: "Respectful team",
    text: "A supportive workplace where every person is valued.",
    icon: (<svg {...icon}><path d="M12 21s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.2-8 11-8 11Z" /></svg>),
  },
];

const PROCESS = [
  { title: "Apply online", text: "Choose a position and send your application." },
  { title: "Quick chat", text: "We call you to learn more about you and answer questions." },
  { title: "Interview or trial", text: "Meet the team and show us your skills." },
  { title: "Training & start", text: "Complete your onboarding and begin your first jobs." },
];

export default function JoinPage() {
  return (
    <>
      {/* ---------- Header ---------- */}
      <section
        aria-labelledby="join-heading"
        className="relative isolate overflow-hidden bg-gradient-to-br from-[#16591B] to-[#0E7C3A] px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div aria-hidden="true" className="absolute -right-16 -top-16 -z-10 h-64 w-64 rounded-full bg-white/10 sm:h-80 sm:w-80" />
        <div aria-hidden="true" className="absolute -bottom-20 right-1/4 -z-10 h-48 w-48 rounded-full bg-white/5 sm:h-64 sm:w-64" />

        <nav aria-label="Breadcrumb" className="text-sm text-white/80">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">Join our team</li>
          </ol>
        </nav>

        <h1 id="join-heading" className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Build a career that makes homes brighter
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
          Join getFitaa&apos;s team of trusted professionals. Pick an open position, tell us about
          yourself and start your application today.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#positions" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold transition-colors hover:bg-[#D9F7D5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E7C3A]">
            <span className="text-[#0E7C3A]">View open positions</span>
          </a>
          <a href="#apply" className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E7C3A]">
            Apply now
          </a>
        </div>
      </section>

      {/* ---------- Why join ---------- */}
      <section aria-labelledby="why-heading" className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#0E7C3A]">Why getFitaa</p>
          <h2 id="why-heading" className="mt-2 text-2xl font-bold text-neutral-800 sm:text-3xl lg:text-4xl">Why work with us</h2>
        </div>
        <ul className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {BENEFITS.map((b) => (
            <li key={b.title} className="rounded-2xl bg-[#F7FCF7] p-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D9F7D5] text-[#0E7C3A]">{b.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-neutral-800">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Open positions + application form ---------- */}
      <JoinSection />

      {/* ---------- Hiring process ---------- */}
      <section aria-labelledby="process-heading" className="bg-[#16591B] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="text-center">
          <h2 id="process-heading" className="text-2xl font-bold sm:text-3xl lg:text-4xl">What happens after you apply</h2>
        </div>
        <ol className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s, i) => (
            <li key={s.title} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#17B917] text-xl font-extrabold">{i + 1}</span>
              <h3 className="mt-4 text-base font-bold sm:text-lg">{s.title}</h3>
              <p className="mx-auto mt-1 max-w-[16rem] text-sm text-white/85">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}