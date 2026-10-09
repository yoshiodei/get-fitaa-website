"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = { label: string; href: string };

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="CleanGo home">
      {/* Swap this SVG for <Image src="/logo.svg" ... /> once you have the real asset */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M4 17 18 5l14 12v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V17Z"
          fill="#0E7C3A"
        />
        <path
          d="m11 21 4 4 10-9"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-[#0E7C3A]">
          Clean<span className="text-[#0B3D22]">Go</span>
        </span>
        <span className="mt-0.5 hidden text-[8px] font-medium text-neutral-500 sm:block">
          Clean Homes, Brighter Lives.
        </span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change and when Escape is pressed
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => href === pathname;

  return (
    <header className="w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav
        aria-label="Main"
        className="flex h-16 items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-10"
      >
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-xs font-semibold uppercase tracking-wide transition-colors hover:text-[#0E7C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-4 rounded-sm ${
                  isActive(link.href) ? "text-[#0E7C3A]" : "text-neutral-800"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/login"
            className="text-xs font-semibold text-neutral-800 transition-colors hover:text-[#0E7C3A]"
          >
            Login
          </Link>
          <Link
            href="/book"
            className="rounded-md bg-[#0E7C3A] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#0B6430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2"
          >
            Book a Clean
          </Link>
        </div>

        {/* Mobile / tablet toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-800 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] lg:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile / tablet panel */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none lg:hidden ${
          open ? "grid-rows-[1fr] border-t border-neutral-100" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block py-3 text-sm font-semibold uppercase tracking-wide ${
                    isActive(link.href) ? "text-[#0E7C3A]" : "text-neutral-800"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-4 border-t border-neutral-100 py-4">
              <Link
                href="/login"
                tabIndex={open ? 0 : -1}
                className="text-sm font-semibold text-neutral-800"
              >
                Login
              </Link>
              <Link
                href="/book"
                tabIndex={open ? 0 : -1}
                className="flex-1 rounded-md bg-[#0E7C3A] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#0B6430]"
              >
                Book a Clean
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}