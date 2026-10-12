"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { USER } from "../../lib/profile/data";
import Addresses from "./Addresses";
import Bookings from "./Bookings";
import Notifications from "./Notifications";
import ProfileDetails, { initials } from "./Profiledetail";
import RateApp from "./Rateapp";
import Security from "./Security";

const ic = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const TABS: { id: string; label: string; icon: ReactNode }[] = [
  { id: "profile", label: "Profile", icon: (<svg {...ic}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>) },
  { id: "bookings", label: "My bookings", icon: (<svg {...ic}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>) },
  { id: "addresses", label: "Addresses", icon: (<svg {...ic}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>) },
  { id: "rate", label: "Rate the app", icon: (<svg {...ic}><path d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z" /></svg>) },
  { id: "notifications", label: "Notifications", icon: (<svg {...ic}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8Z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>) },
  { id: "security", label: "Security", icon: (<svg {...ic}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>) },
];

export default function ProfileDashboard() {
  const router = useRouter();
  const [active, setActive] = useState("profile");
  const [name, setName] = useState(USER.name);

  async function logOut() {
    // TODO: call your sign-out (e.g. signOut() from your auth library)
    router.push("/login");
  }

  return (
    <div className="bg-[#F7FCF7]">
      {/* Header */}
      <section aria-labelledby="profile-heading" className="bg-gradient-to-br from-[#16591B] to-[#0E7C3A] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-10">
        <div className="mx-auto flex max-w-6xl items-center gap-4 sm:gap-5">
          <span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-xl font-extrabold text-[#0E7C3A] sm:h-20 sm:w-20 sm:text-2xl">
            {initials(name) || "?"}
          </span>
          <div className="min-w-0">
            <h1 id="profile-heading" className="truncate text-2xl font-extrabold sm:text-3xl">{name}</h1>
            <p className="truncate text-sm text-white/85">{USER.email}</p>
            <p className="mt-0.5 text-xs text-white/75">Member since {USER.memberSince}</p>
          </div>
        </div>
      </section>

      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
          {/* Navigation */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div role="tablist" aria-label="Account sections" aria-orientation="vertical"
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:rounded-2xl lg:border lg:border-neutral-200 lg:bg-white lg:p-3 lg:shadow-sm">
              {TABS.map((t) => {
                const on = active === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={on}
                    aria-controls={`panel-${t.id}`}
                    type="button"
                    onClick={() => setActive(t.id)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] lg:w-full lg:rounded-lg lg:px-4 ${
                      on ? "bg-[#0E7C3A] text-white" : "bg-white text-neutral-700 hover:text-[#0E7C3A] lg:bg-transparent lg:hover:bg-[#F1F8F0]"
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                );
              })}

              <div className="hidden lg:mt-2 lg:block lg:border-t lg:border-neutral-100 lg:pt-3">
                <Link href="/faq" className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-[#F1F8F0] hover:text-[#0E7C3A]">Help & FAQs</Link>
                <button type="button" onClick={logOut} className="block w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600">
                  Log out
                </button>
              </div>
            </div>
          </aside>

          {/* Panels */}
          <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} tabIndex={0} className="min-w-0 focus-visible:outline-none">
            {active === "profile" && <ProfileDetails onNameChange={setName} />}
            {active === "bookings" && <Bookings />}
            {active === "addresses" && <Addresses />}
            {active === "rate" && <RateApp />}
            {active === "notifications" && <Notifications />}
            {active === "security" && <Security />}

            {/* Log out on small screens (the sidebar version is desktop only) */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 lg:hidden">
              <Link href="/faq" className="text-sm font-semibold text-neutral-700 hover:text-[#0E7C3A]">Help & FAQs</Link>
              <button type="button" onClick={logOut} className="rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}