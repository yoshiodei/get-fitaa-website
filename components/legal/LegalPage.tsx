import Link from "next/link";
import type { ReactNode } from "react";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type LegalPageProps = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  /** The other legal page, shown at the bottom */
  related: { href: string; label: string };
};

/* Small building blocks for the text of each section */
export function P({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700 marker:text-[#0E7C3A] sm:text-base">
      {children}
    </ul>
  );
}

export default function LegalPage({ title, intro, lastUpdated, sections, related }: LegalPageProps) {
  return (
    <>
      {/* ---------- Header ---------- */}
      <section
        aria-labelledby="legal-heading"
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
            <li aria-current="page" className="font-semibold text-white">{title}</li>
          </ol>
        </nav>

        <h1 id="legal-heading" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">{intro}</p>
        <p className="mt-4 text-sm font-semibold text-white/80">Last updated: {lastUpdated}</p>
      </section>

      {/* ---------- Content ---------- */}
      <div className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {/* Mobile / tablet: collapsible */}
            <details className="group rounded-xl border border-neutral-200 bg-[#F7FCF7] lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-5 py-4 text-sm font-bold text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] [&::-webkit-details-marker]:hidden">
                On this page
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#0E7C3A] transition-transform group-open:rotate-180">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <ol className="space-y-2 px-5 pb-5 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-neutral-700 hover:text-[#0E7C3A]">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {/* Desktop: always visible */}
            <nav aria-label="On this page" className="hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
              <p className="text-xs font-bold uppercase tracking-wide text-[#0E7C3A]">On this page</p>
              <ol className="mt-3 space-y-2 border-l-2 border-[#E3F4E8] text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-0.5 block border-l-2 border-transparent py-0.5 pl-4 text-neutral-600 transition-colors hover:border-[#0E7C3A] hover:text-[#0E7C3A]"
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Sections */}
          <article>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24 border-b border-neutral-100 py-8 first:pt-0 last:border-b-0">
                <h2 id={`${s.id}-title`} className="text-xl font-bold text-neutral-900 sm:text-2xl">
                  <span className="text-[#0E7C3A]">{i + 1}.</span> {s.title}
                </h2>
                {s.body}
              </section>
            ))}

            <div className="mt-6 rounded-2xl bg-[#E3F4E8] p-6 text-sm text-[#0B3D22] sm:text-base">
              Also see our{" "}
              <Link href={related.href} className="font-bold underline underline-offset-4 hover:text-[#0E7C3A]">
                {related.label}
              </Link>
              .
            </div>
          </article>
        </div>
      </div>
    </>
  );
}