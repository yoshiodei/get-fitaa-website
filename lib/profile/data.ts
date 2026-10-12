/**
 * SAMPLE DATA: replace with your real user, bookings and addresses from your API/database.
 */
export const ZONES = ["Spintex", "Nungua", "Klagon", "Tema", "Lashibi"];

export const USER = {
  name: "Ama Serwaa",
  email: "ama@example.com",
  phone: "024 123 4567",
  memberSince: "March 2026",
};

export type BookingStatus = "upcoming" | "completed" | "cancelled";

export type Booking = {
  id: string;
  service: string;
  date: string;
  time: string;
  zone: string;
  price: number;
  status: BookingStatus;
};

export const BOOKINGS: Booking[] = [
  { id: "CG-1042", service: "Deep Clean", date: "Sat, 24 Oct 2026", time: "10:00 AM", zone: "Spintex", price: 450, status: "upcoming" },
  { id: "CG-1031", service: "Standard Clean", date: "Mon, 5 Oct 2026", time: "9:00 AM", zone: "Spintex", price: 250, status: "completed" },
  { id: "CG-1017", service: "Standard Clean", date: "Mon, 14 Sep 2026", time: "9:00 AM", zone: "Spintex", price: 250, status: "completed" },
  { id: "CG-0998", service: "Office Clean", date: "Fri, 28 Aug 2026", time: "2:00 PM", zone: "Tema", price: 350, status: "cancelled" },
];

export type Address = {
  id: string;
  label: string;
  zone: string;
  line: string;
  isDefault: boolean;
};

export const ADDRESSES: Address[] = [
  { id: "a1", label: "Home", zone: "Spintex", line: "House 14, Baatsona Total, near the pharmacy", isDefault: true },
  { id: "a2", label: "Office", zone: "Tema", line: "Community 18, Suite 3, Anchor Plaza", isDefault: false },
];