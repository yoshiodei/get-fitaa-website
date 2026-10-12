import Link from "next/link";
import { APPLICATIONS, BOOKINGS, CLEANERS, REVIEWS, WEEKLY } from "../../lib/admin/data";
import { Card, Icon, PageHeader, StatCard, StatusBadge, btnSecondary, formatPrice, td, th } from "@/components/admin/ui";

export const metadata = { title: "Overview" };

export default function AdminOverviewPage() {
  const revenue = BOOKINGS.filter((b) => b.paid && b.status !== "cancelled").reduce((s, b) => s + b.price, 0);
  const activeBookings = BOOKINGS.filter((b) => ["pending", "confirmed", "in-progress"].includes(b.status)).length;
  const activeCleaners = CLEANERS.filter((c) => c.status === "active").length;
  const newApps = APPLICATIONS.filter((a) => a.status === "new").length;
  const avgRating = REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length;

  const max = Math.max(...WEEKLY.map((w) => w.value));
  const byService = Object.entries(
    BOOKINGS.reduce<Record<string, number>>((acc, b) => ({ ...acc, [b.service]: (acc[b.service] ?? 0) + 1 }), {})
  ).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <PageHeader title="Overview" description="A quick look at how getFitaa is doing." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Revenue" value={formatPrice(revenue)} hint="Paid bookings (sample data)" icon={<Icon d="M12 2v20M17 6.5C16 5 14.2 4 12 4c-2.8 0-5 1.3-5 3.5S9 11 12 12s5 1.5 5 3.8S14.8 20 12 20c-2.2 0-4-1-5-2.5" />} />
        <StatCard label="Active bookings" value={String(activeBookings)} hint="Pending, confirmed or in progress" icon={<Icon d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14H3zM3 10h18M8 2v4M16 2v4" />} />
        <StatCard label="Active cleaners" value={`${activeCleaners}/${CLEANERS.length}`} hint="Available to work" icon={<Icon d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6zM9 12l2 2 4-4" />} />
        <StatCard label="New applications" value={String(newApps)} hint="Waiting for review" icon={<Icon d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5" />} />
        <StatCard label="App rating" value={`${avgRating.toFixed(1)} / 5`} hint={`${REVIEWS.length} ratings`} icon={<Icon d="m12 2.5 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.5l-5.9 3.2 1.2-6.6L2.5 9.5l6.6-.9z" />} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card title="Bookings per week" className="lg:col-span-2">
          <div className="p-5">
            <div role="img" aria-label={`Bookings per week: ${WEEKLY.map((w) => `${w.label} ${w.value}`).join(", ")}`} className="flex h-56 items-end gap-2 sm:gap-4">
              {WEEKLY.map((w) => (
                <div key={w.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-xs font-bold text-neutral-700">{w.value}</span>
                  <div className="w-full max-w-[44px] rounded-t-md bg-gradient-to-t from-[#0E7C3A] to-[#17B917]" style={{ height: `${(w.value / max) * 80}%` }} />
                  <span className="text-[10px] text-neutral-500 sm:text-xs">{w.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Popular services">
          <ul className="space-y-4 p-5">
            {byService.map(([name, count]) => (
              <li key={name}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-neutral-800">{name}</span>
                  <span className="text-neutral-600">{count}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-neutral-100">
                  <div className="h-2 rounded-full bg-[#0E7C3A]" style={{ width: `${(count / byService[0][1]) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Recent bookings" className="mt-6" action={<Link href="/admin/bookings" className={btnSecondary}>View all</Link>}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-neutral-50"><tr><th className={th}>ID</th><th className={th}>Customer</th><th className={th}>Service</th><th className={th}>Date</th><th className={th}>Price</th><th className={th}>Status</th></tr></thead>
            <tbody className="divide-y divide-neutral-100">
              {BOOKINGS.slice(0, 5).map((b) => (
                <tr key={b.id}>
                  <td className={`${td} font-semibold`}>{b.id}</td>
                  <td className={td}>{b.customer}</td>
                  <td className={td}>{b.service}</td>
                  <td className={td}>{b.date}</td>
                  <td className={td}>{formatPrice(b.price)}</td>
                  <td className={td}><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}