"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "./ui";

const NAV = [
  { href: "/admin", label: "Overview", d: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" },
  { href: "/admin/bookings", label: "Bookings", d: "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14H3zM3 10h18M8 2v4M16 2v4" },
  { href: "/admin/customers", label: "Customers", d: "M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM21 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" },
  { href: "/admin/cleaners", label: "Cleaners", d: "M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6zM9 12l2 2 4-4" },
  { href: "/admin/applications", label: "Applications", d: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6" },
  { href: "/admin/vacancies", label: "Vacancies", d: "M3 8h18v12H3zM8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3M3 13h18" },
  { href: "/admin/services", label: "Services & pricing", d: "M20 12 12 20a2 2 0 0 1-3 0l-5-5a2 2 0 0 1 0-3l8-8h6z" },
  { href: "/admin/reviews", label: "Ratings & reviews", d: "m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z" },
  { href: "/admin/settings", label: "Site settings", d: "M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M14 4v4M8 10v4M16 16v4" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  function logOut() {
    // TODO: call your sign-out, then leave the admin area
    router.push("/login");
  }

  const nav = (
    <nav aria-label="Admin" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {NAV.map((n) => {
        const on = isActive(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={on ? "page" : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              on ? "bg-[#17B917] text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon d={n.d} />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );

  const sidebarBody = (
    <>
      <div className="flex h-16 shrink-0 items-center gap-2 px-5">
        <span className="text-xl font-extrabold tracking-tight text-white"><span className="text-[#7BE08F]">get</span>Fitaa</span>
        <span className="rounded bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Admin</span>
      </div>
      {nav}
      <div className="shrink-0 border-t border-white/10 p-3">
        <Link href="/" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">View website</Link>
        <button type="button" onClick={logOut} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          Log out
        </button>
      </div>
    </>
  );

  const current = NAV.find((n) => isActive(n.href))?.label ?? "Admin";

  // Covers the public navbar and footer so the dashboard has its own full-screen layout
  return (
    <div className="fixed inset-0 z-[100] flex bg-[#F4F7F4]">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-[#0B3D22] lg:flex">{sidebarBody}</aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[110] lg:hidden">
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/50" />
          <aside className="relative flex h-full w-72 max-w-[85%] flex-col bg-[#0B3D22]">{sidebarBody}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-neutral-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} className="rounded-lg p-2 text-neutral-800 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] lg:hidden">
              <Icon d="M4 7h16M4 12h16M4 17h16" size={24} />
            </button>
            <p className="text-sm font-bold text-neutral-900 sm:text-base">{current}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden text-sm font-semibold text-neutral-700 hover:text-[#0E7C3A] sm:block">View website</Link>
            <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E7C3A] text-sm font-bold text-white">AD</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}