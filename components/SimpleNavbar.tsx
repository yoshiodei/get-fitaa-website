import Link from "next/link";
import Image from "next/image";

/**
 * Minimal navbar: brand logo on the left, Login + Book a Clean on the right.
 * Same height and styling as the main Navbar so pages feel consistent.
 */
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="getFitaa home">
      <Image 
        src="/get-fitaa-logo-icon.png" 
        alt="getFitaa"
        width={36}
        height={36}
      />
      <span className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-[#0E7C3A]">
          <span className="text-[#0B3D22]">get</span>Fitaa
        </span>
        <span className="mt-0.5 hidden text-[8px] font-medium text-neutral-500 sm:block">
          Clean Homes, Brighter Lives.
        </span>
      </span>
    </Link>
  );
}

export default function SimpleNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav aria-label="Main" className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <Logo />

        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/login"
            className="rounded-sm text-sm font-semibold text-neutral-800 transition-colors hover:text-[#0E7C3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-4"
          >
            Login
          </Link>
          <Link
            href="/book"
            className="whitespace-nowrap rounded-md bg-[#0E7C3A] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0B6430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] focus-visible:ring-offset-2 sm:px-5 sm:py-2.5"
          >
            <span className="text-white">Book a Clean</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}