import type { Metadata } from "next";
import ProfileDashboard from "@/components/profile/ProfileDashboard";

export const metadata: Metadata = {
  title: "My Profile | getFitaa",
  description: "Manage your getFitaa profile, bookings, addresses and settings.",
  robots: { index: false, follow: false },
};

export default function ProfilePage() {
  // TODO: protect this route (redirect to /login when signed out) with middleware or your auth library.
  return <ProfileDashboard />;
}