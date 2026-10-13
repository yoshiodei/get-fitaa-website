import Link from "next/link";

// Placeholder: replace with your real address
const ADDRESS = "Community 18, Tema, Greater Accra, Ghana";

export default function SimpleFooter() {
  return (
    <div className="">
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