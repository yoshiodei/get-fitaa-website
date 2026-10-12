import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: { default: "Admin | getFitaa", template: "%s | getFitaa Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  // TODO: PROTECT THIS AREA. Only signed-in users with an admin role should reach /admin.
  // Do it on the server (middleware or here), never only in the browser.
  return <AdminShell>{children}</AdminShell>;
}