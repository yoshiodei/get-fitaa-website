/**
 * SAMPLE PRICING for the booking calculator: replace with your real rates.
 *
 * How the estimate works:
 *  - each service has a starting price that covers 1 bedroom and 1 bathroom
 *  - every extra bedroom / bathroom adds the per-room rate for that service
 *  - optional extras and a zone (travel) fee are added on top
 */
export type ServiceOption = {
  id: string;
  name: string;
  price: number; // starting price
  perBedroom: number; // added for each bedroom beyond the first
  perBathroom: number; // added for each bathroom beyond the first
  description: string;
  image: string;
  office?: boolean;
};

export const SERVICE_OPTIONS: ServiceOption[] = [
  { id: "standard", name: "Standard Clean", price: 250, perBedroom: 50, perBathroom: 40, description: "Regular upkeep for your home.", image: "/images/services/standard-clean.jpg" },
  { id: "deep", name: "Deep Clean", price: 450, perBedroom: 90, perBathroom: 70, description: "A top-to-bottom scrub.", image: "/images/services/deep-clean.jpg" },
  { id: "move", name: "Move-In / Move-Out", price: 600, perBedroom: 120, perBathroom: 90, description: "Spotless before or after a move.", image: "/images/services/move-in-out.jpg" },
  { id: "office", name: "Office Clean", price: 350, perBedroom: 60, perBathroom: 50, description: "Keep your workspace tidy.", image: "/images/services/office-clean.jpg", office: true },
  { id: "carpet", name: "Carpet & Upholstery", price: 300, perBedroom: 40, perBathroom: 0, description: "Stain treatment and deep wash.", image: "/images/services/carpet.jpg" },
  { id: "construction", name: "Post-Construction Clean", price: 900, perBedroom: 150, perBathroom: 100, description: "Dust and debris removal.", image: "/images/services/post-construction.jpg" },
];

export const ZONE_FEES: Record<string, number> = {
  Spintex: 0,
  Tema: 20,
  Nungua: 20,
  Lashibi: 25,
  Klagon: 30,
};

export type Extra = {
  id: string;
  label: string;
  description: string;
  price: number;
  group: "area" | "task";
  icon: string;
};

export const EXTRAS: Extra[] = [
  // Parts of the home that are not rooms
  { id: "corridor", label: "Corridors & hallways", description: "Floors, skirting and walls", price: 40, group: "area", icon: "corridor" },
  { id: "stairs", label: "Staircase", description: "Steps, railings and landings", price: 50, group: "area", icon: "stairs" },
  { id: "balcony", label: "Balcony, patio or veranda", description: "Sweep, mop and wipe railings", price: 50, group: "area", icon: "balcony" },
  { id: "garage", label: "Garage or store room", description: "Sweep, dust and tidy", price: 70, group: "area", icon: "garage" },
  { id: "compound", label: "Compound & outdoor tiles", description: "Sweeping and washing", price: 90, group: "area", icon: "yard" },
  // Appliances and extra tasks
  { id: "fridge", label: "Inside fridge", description: "Shelves, drawers and seals", price: 40, group: "task", icon: "fridge" },
  { id: "oven", label: "Inside oven", description: "Degrease racks and walls", price: 40, group: "task", icon: "oven" },
  { id: "windows", label: "Interior windows", description: "Glass, frames and sills", price: 60, group: "task", icon: "window" },
  { id: "cabinets", label: "Inside cabinets", description: "Wipe shelves and doors", price: 50, group: "task", icon: "cabinet" },
  { id: "fans", label: "Ceiling fans & vents", description: "Dust blades and covers", price: 45, group: "task", icon: "vent" },
  { id: "upholstery", label: "Sofa & mattress refresh", description: "Vacuum and freshen up", price: 120, group: "task", icon: "sofa" },
  { id: "laundry", label: "Laundry & ironing", description: "Wash, dry and iron", price: 80, group: "task", icon: "laundry" },
];

export const PROPERTY_TYPES = ["Apartment", "House", "Townhouse"];

export const TIME_SLOTS = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

export const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

export const money = (n: number) => `₵ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export function calcPrice(input: { service: ServiceOption; bedrooms: number; bathrooms: number; zone: string; extras: string[] }) {
  const { service, bedrooms, bathrooms, zone, extras } = input;
  const serviceAmount =
    service.price + Math.max(0, bedrooms - 1) * service.perBedroom + Math.max(0, bathrooms - 1) * service.perBathroom;
  const chosenExtras = EXTRAS.filter((e) => extras.includes(e.id));
  const zoneFee = zone ? ZONE_FEES[zone] ?? 0 : 0;
  const total = serviceAmount + chosenExtras.reduce((sum, e) => sum + e.price, 0) + zoneFee;
  return { serviceAmount, extras: chosenExtras, zoneFee, total };
}

export const formatLongDate = (iso: string) =>
  iso
    ? new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    : "";

/* ---------------- Availability (sample rules: replace with your real ones) ---------------- */
export const CLOSED_WEEKDAYS = [0]; // 0 = Sunday
export const LEAD_DAYS = 1; // earliest bookable day is tomorrow
export const MAX_MONTHS_AHEAD = 3; // how many months after this one can be booked

/** Dates that cannot be booked, with the reason shown to the customer. */
export const BLOCKED_DATES: Record<string, string> = {
  "2026-10-16": "Fully booked",
  "2026-10-17": "Fully booked",
  "2026-10-23": "Fully booked",
  "2026-10-24": "Fully booked",
  "2026-10-30": "Fully booked",
  "2026-11-06": "Fully booked",
  "2026-11-07": "Fully booked",
  "2026-12-04": "Public holiday",
  "2026-12-25": "Public holiday",
  "2026-12-26": "Public holiday",
  "2027-01-01": "Public holiday",
};

export const addDaysIso = (iso: string, n: number) =>
  new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);

/** Returns the reason a date can't be booked, or null when it is available. */
export function dateStatus(iso: string, today: string): string | null {
  if (iso < today) return "Past date";
  if (iso < addDaysIso(today, LEAD_DAYS)) return "Too soon to book";
  const weekday = new Date(`${iso}T00:00:00Z`).getUTCDay();
  if (CLOSED_WEEKDAYS.includes(weekday)) return "Closed on Sundays";
  if (BLOCKED_DATES[iso]) return BLOCKED_DATES[iso];
  return null;
}