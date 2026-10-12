import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  /** Headline and text on the green panel (large screens only) */
  panelTitle: string;
  panelText: string;
  children: ReactNode;
  footer?: ReactNode;
};

const PERKS = [
  "Book a clean in a few easy steps",
  "Trusted, certified cleaners",
  "Clear prices with no hidden fees",
];

export default function AuthShell({
  title,
  subtitle,
  panelTitle,
  panelText,
  children,
  footer,
}: AuthShellProps) {
  return (
    <section className="grid min-h-[calc(100vh-72px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Brand panel: large screens only */}
      <aside className="relative isolate hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#16591B] to-[#0E7C3A] p-12 text-white lg:flex">
        <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 h-80 w-80 rounded-full bg-white/10" />
        <div aria-hidden="true" className="absolute -bottom-24 -left-16 -z-10 h-72 w-72 rounded-full bg-white/5" />

        <Link href="/" className="text-3xl font-extrabold tracking-tight">
          <span className="text-[#7BE08F]">get</span>Fitaa
        </Link>

        <div>
          <h2 className="text-4xl font-extrabold leading-tight xl:text-5xl">{panelTitle}</h2>
          <p className="mt-4 max-w-md text-base text-white/90">{panelText}</p>

          <ul className="mt-8 space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm font-medium">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-white/80">Clean Homes. Brighter Lives.</p>
      </aside>

      {/* Form area */}
      <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">{subtitle}</p>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-8 text-center text-sm text-neutral-600">{footer}</div>}
        </div>
      </div>
    </section>
  );
}