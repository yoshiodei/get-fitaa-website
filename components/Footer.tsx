import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
];

const CONTACT = {
  email: "getFitaa@email.com",
  phone: "+233 419 419 419",
  phoneHref: "+233419419419",
};

// Placeholder: replace with your real address
const ADDRESS = "Community 18, Tema, Greater Accra, Ghana";

export default function Footer() {
  return (
    <div className="">
        {/* bg-[#FDFFFB] FBFEF9  */}
        <div className="bg-[#FBFEF9]">
          <div className="flex flex-col xl:flex-row gap-10 xl:gap-4 px-6 py-14 text-neutral-800 sm:px-6 lg:px-10">
            <div className="flex-3">
              <div className="flex flex-col gap-5">  
                <Image
                    src="/images/get-fitaa-logo.png"
                    alt="getFitaa logo"
                    // sizes="(min-width: 672px) 672px, 100vw"
                    height={160}
                    width={330}
                    className="object-cover"
                />  
                <p className="w-[330px] text-sm font-bold leading-snug text-neutral-800">
                    Trusted, certified cleaners for homes and offices, with fair prices and easy online
                    booking.
                </p>
                <div>
                    <Link
                        href="/join"
                        className="inline-block rounded-md bg-[#0E7C3A] px-5 py-2 text-md font-bold text-white transition-colors hover:bg-[#3AB24F]"
                    >
                        <p className="text-white">Join the Team</p>
                    </Link>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 flex-2 gap-y-6 ">
            <div className="flex-1">
                <h3 className="text-xl font-bold text-neutral-800">Navigation</h3>
                <ul className="mt-4 space-y-1.5">
                    {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="transition-colors hover:text-[#0E7C3A]">
                            {link.label}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-neutral-800">Contact</h3>
                <ul className="mt-4 space-y-1.5">
                    <li key={CONTACT.email}>
                        <p className="transition-colors hover:text-[#0E7C3A]">
                            {CONTACT.email}
                        </p>
                    </li>
                    <li key={CONTACT.phone}>
                        <p className="transition-colors hover:text-[#0E7C3A]">
                            {CONTACT.phone}
                        </p>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-bold text-neutral-800">Address</h3>
                <div className="mt-4">
                        <p className="transition-colors hover:text-[#0E7C3A]">
                            {ADDRESS}
                        </p>
                </div>
            </div>
            </div>
          </div>  
        </div>    

      <div className="bg-[#F3FAF1]">
        {/* bg-[#F1F8F0] */}
        <div className="flex flex-col gap-3 px-4 py-8 text-sm font-semibold text-neutral-800 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p className="text-gray-700">© {new Date().getFullYear()} Clean Go. All Rights Reserved</p>
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/terms" className="transition-colors hover:text-[#0E7C3A]">
                <span className="text-gray-700 hover:text-[#0E7C3A]">Terms of Service</span>
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition-colors text-gray-100 hover:text-[#0E7C3A]">
                <span className="text-gray-700 hover:text-[#0E7C3A]">Privacy Policy</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}