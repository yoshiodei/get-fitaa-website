"use client";

import Link from "next/link";
import { useState } from "react";
import { BOOKINGS, type Booking, type BookingStatus } from "../../lib/profile/data";
import { SectionCard, primaryBtn, secondaryBtn } from "./Ui";

const BADGE: Record<BookingStatus, string> = {
  upcoming: "bg-[#E3F4E8] text-[#0B3D22]",
  completed: "bg-neutral-100 text-neutral-700",
  cancelled: "bg-red-50 text-red-700",
};

const LABEL: Record<BookingStatus, string> = {
  upcoming: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
};

const formatPrice = (n: number) => `₵ ${n.toLocaleString("en-GH")}`;

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const visible = bookings.filter((b) => (filter === "upcoming" ? b.status === "upcoming" : b.status !== "upcoming"));

  function cancel(id: string) {
    // TODO: call your API to cancel the booking
    setBookings((list) => list.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)));
    setConfirmId(null);
  }

  return (
    <SectionCard title="My bookings" description="See your upcoming cleans and your booking history.">
      <div role="group" aria-label="Filter bookings" className="inline-flex rounded-full bg-[#F1F8F0] p-1">
        {(["upcoming", "past"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7C3A] ${
              filter === f ? "bg-[#0E7C3A] text-white" : "text-neutral-700 hover:text-[#0E7C3A]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-xl bg-[#F7FCF7] px-6 py-10 text-center">
          <p className="font-semibold text-neutral-800">
            {filter === "upcoming" ? "You have no upcoming bookings." : "No past bookings yet."}
          </p>
          <Link href="/book" className={`${primaryBtn} mt-4`}>Book a Clean</Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((b) => (
            <li key={b.id} className="rounded-xl border border-neutral-200 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">{b.service}</h3>
                  <p className="text-xs text-neutral-500">Booking {b.id}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${BADGE[b.status]}`}>{LABEL[b.status]}</span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
                <div><dt className="text-xs text-neutral-500">Date</dt><dd className="font-semibold text-neutral-800">{b.date}</dd></div>
                <div><dt className="text-xs text-neutral-500">Time</dt><dd className="font-semibold text-neutral-800">{b.time}</dd></div>
                <div><dt className="text-xs text-neutral-500">Area</dt><dd className="font-semibold text-neutral-800">{b.zone}</dd></div>
                <div><dt className="text-xs text-neutral-500">Price</dt><dd className="font-semibold text-neutral-800">{formatPrice(b.price)}</dd></div>
              </dl>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {b.status === "upcoming" &&
                  (confirmId === b.id ? (
                    <div role="alertdialog" aria-label="Confirm cancellation" className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-medium text-neutral-800">Cancel this booking?</p>
                      <button type="button" onClick={() => cancel(b.id)} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2">
                        Yes, cancel
                      </button>
                      <button type="button" onClick={() => setConfirmId(null)} className={secondaryBtn}>Keep it</button>
                    </div>
                  ) : (
                    <>
                      <Link href={`/book?reschedule=${b.id}`} className={secondaryBtn}>Reschedule</Link>
                      <button type="button" onClick={() => setConfirmId(b.id)} className="text-sm font-semibold text-red-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded">
                        Cancel booking
                      </button>
                    </>
                  ))}
                {b.status !== "upcoming" && (
                  <Link href={`/book?service=${encodeURIComponent(b.service)}`} className={secondaryBtn}>Book again</Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}