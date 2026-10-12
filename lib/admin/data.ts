/**
 * SAMPLE DATA: every table in the dashboard reads from here.
 * Replace these arrays with real data from your database/API.
 */
export const ZONES = ["Spintex", "Nungua", "Klagon", "Tema", "Lashibi"];

/* ---------- Bookings ---------- */
export type BookingStatus = "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
export const BOOKING_STATUSES: BookingStatus[] = ["pending", "confirmed", "in-progress", "completed", "cancelled"];

export type Booking = {
  id: string;
  customer: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  zone: string;
  price: number;
  status: BookingStatus;
  cleaner: string;
  paid: boolean;
};

export const BOOKINGS: Booking[] = [
  { id: "CG-1048", customer: "Ama Serwaa", phone: "024 123 4567", service: "Deep Clean", date: "24 Oct 2026", time: "10:00 AM", zone: "Spintex", price: 450, status: "confirmed", cleaner: "Efua Mensah", paid: true },
  { id: "CG-1047", customer: "Kwame Boateng", phone: "020 555 0192", service: "Standard Clean", date: "23 Oct 2026", time: "9:00 AM", zone: "Tema", price: 250, status: "pending", cleaner: "", paid: false },
  { id: "CG-1046", customer: "Naana Owusu", phone: "055 321 8890", service: "Move-In / Move-Out", date: "22 Oct 2026", time: "1:00 PM", zone: "Lashibi", price: 600, status: "confirmed", cleaner: "Kofi Asante", paid: true },
  { id: "CG-1045", customer: "Mensah & Co.", phone: "030 276 1100", service: "Office Clean", date: "21 Oct 2026", time: "6:00 PM", zone: "Tema", price: 350, status: "in-progress", cleaner: "Abena Ofori", paid: true },
  { id: "CG-1044", customer: "Yaw Darko", phone: "024 889 7765", service: "Standard Clean", date: "20 Oct 2026", time: "11:00 AM", zone: "Nungua", price: 250, status: "completed", cleaner: "Efua Mensah", paid: true },
  { id: "CG-1043", customer: "Esi Quaye", phone: "027 440 6612", service: "Deep Clean", date: "19 Oct 2026", time: "9:00 AM", zone: "Klagon", price: 450, status: "completed", cleaner: "Kofi Asante", paid: true },
  { id: "CG-1042", customer: "Selorm Agbo", phone: "050 118 2299", service: "Carpet & Upholstery", date: "18 Oct 2026", time: "3:00 PM", zone: "Spintex", price: 300, status: "cancelled", cleaner: "", paid: false },
  { id: "CG-1041", customer: "Adwoa Frimpong", phone: "024 700 3341", service: "Standard Clean", date: "17 Oct 2026", time: "10:00 AM", zone: "Spintex", price: 250, status: "completed", cleaner: "Abena Ofori", paid: true },
  { id: "CG-1040", customer: "Prince Tetteh", phone: "020 912 4408", service: "Post-Construction Clean", date: "15 Oct 2026", time: "8:00 AM", zone: "Tema", price: 900, status: "completed", cleaner: "Kofi Asante", paid: true },
  { id: "CG-1039", customer: "Akosua Pinto", phone: "055 603 7712", service: "Deep Clean", date: "14 Oct 2026", time: "2:00 PM", zone: "Nungua", price: 450, status: "completed", cleaner: "Efua Mensah", paid: true },
];

export const WEEKLY = [
  { label: "Aug 24", value: 14 }, { label: "Aug 31", value: 18 }, { label: "Sep 7", value: 16 }, { label: "Sep 14", value: 22 },
  { label: "Sep 21", value: 25 }, { label: "Sep 28", value: 21 }, { label: "Oct 5", value: 29 }, { label: "Oct 12", value: 33 },
];

/* ---------- Customers ---------- */
export type Customer = {
  id: string; name: string; email: string; phone: string; zone: string;
  bookings: number; spent: number; joined: string; blocked: boolean;
};
export const CUSTOMERS: Customer[] = [
  { id: "u1", name: "Ama Serwaa", email: "ama@example.com", phone: "024 123 4567", zone: "Spintex", bookings: 6, spent: 1650, joined: "Mar 2026", blocked: false },
  { id: "u2", name: "Kwame Boateng", email: "kwame.b@example.com", phone: "020 555 0192", zone: "Tema", bookings: 2, spent: 500, joined: "Aug 2026", blocked: false },
  { id: "u3", name: "Naana Owusu", email: "naana@example.com", phone: "055 321 8890", zone: "Lashibi", bookings: 4, spent: 1900, joined: "May 2026", blocked: false },
  { id: "u4", name: "Mensah & Co.", email: "office@mensahco.com", phone: "030 276 1100", zone: "Tema", bookings: 11, spent: 3850, joined: "Feb 2026", blocked: false },
  { id: "u5", name: "Yaw Darko", email: "yaw.d@example.com", phone: "024 889 7765", zone: "Nungua", bookings: 3, spent: 750, joined: "Jun 2026", blocked: false },
  { id: "u6", name: "Esi Quaye", email: "esi.q@example.com", phone: "027 440 6612", zone: "Klagon", bookings: 1, spent: 450, joined: "Sep 2026", blocked: false },
  { id: "u7", name: "Selorm Agbo", email: "selorm@example.com", phone: "050 118 2299", zone: "Spintex", bookings: 2, spent: 300, joined: "Jul 2026", blocked: true },
  { id: "u8", name: "Prince Tetteh", email: "prince.t@example.com", phone: "020 912 4408", zone: "Tema", bookings: 5, spent: 2700, joined: "Apr 2026", blocked: false },
];

/* ---------- Cleaners / staff ---------- */
export type CleanerStatus = "active" | "on-leave" | "inactive";
export type Cleaner = {
  id: string; name: string; phone: string; role: string; zone: string;
  rating: number; jobs: number; status: CleanerStatus;
};
export const CLEANERS: Cleaner[] = [
  { id: "c1", name: "Efua Mensah", phone: "024 300 1122", role: "Home Cleaner", zone: "Spintex", rating: 4.9, jobs: 142, status: "active" },
  { id: "c2", name: "Kofi Asante", phone: "020 710 4455", role: "Deep Clean Specialist", zone: "Tema", rating: 4.8, jobs: 118, status: "active" },
  { id: "c3", name: "Abena Ofori", phone: "055 902 3344", role: "Office Cleaner", zone: "Tema", rating: 4.7, jobs: 96, status: "active" },
  { id: "c4", name: "Kojo Adjei", phone: "027 118 9087", role: "Team Supervisor", zone: "Klagon", rating: 4.9, jobs: 74, status: "active" },
  { id: "c5", name: "Akua Danso", phone: "050 664 2210", role: "Home Cleaner", zone: "Nungua", rating: 4.6, jobs: 61, status: "on-leave" },
  { id: "c6", name: "Nii Armah", phone: "024 455 8801", role: "Home Cleaner", zone: "Lashibi", rating: 4.5, jobs: 38, status: "inactive" },
];

/* ---------- Job applications (from the Join Our Team page) ---------- */
export type AppStatus = "new" | "reviewing" | "interview" | "hired" | "rejected";
export const APP_STATUSES: AppStatus[] = ["new", "reviewing", "interview", "hired", "rejected"];
export type Application = {
  id: string; name: string; email: string; phone: string; position: string; zone: string;
  experience: string; date: string; status: AppStatus; cv: boolean; message: string;
};
export const APPLICATIONS: Application[] = [
  { id: "a1", name: "Grace Ampofo", email: "grace.a@example.com", phone: "024 811 2200", position: "Home Cleaner", zone: "Spintex", experience: "1 to 3 years", date: "11 Oct 2026", status: "new", cv: true, message: "I have worked as a domestic cleaner for two years and enjoy helping families keep tidy homes." },
  { id: "a2", name: "Emmanuel Tagoe", email: "e.tagoe@example.com", phone: "055 270 9931", position: "Deep Clean Specialist", zone: "Tema", experience: "More than 3 years", date: "10 Oct 2026", status: "reviewing", cv: true, message: "Experienced with post-construction and move-out cleaning. Own transport." },
  { id: "a3", name: "Juliet Nartey", email: "juliet.n@example.com", phone: "020 336 7741", position: "Customer Support Agent", zone: "Nungua", experience: "Less than 1 year", date: "9 Oct 2026", status: "interview", cv: false, message: "Previously worked at a call centre and I am comfortable on the phone." },
  { id: "a4", name: "Samuel Lartey", email: "sam.l@example.com", phone: "027 902 1156", position: "Office Cleaner", zone: "Lashibi", experience: "No experience yet", date: "7 Oct 2026", status: "new", cv: false, message: "Available for evening shifts and eager to learn." },
  { id: "a5", name: "Rita Obeng", email: "rita.o@example.com", phone: "050 774 6603", position: "Home Cleaner", zone: "Klagon", experience: "1 to 3 years", date: "3 Oct 2026", status: "hired", cv: true, message: "" },
  { id: "a6", name: "Daniel Sowah", email: "daniel.s@example.com", phone: "024 530 8814", position: "General application", zone: "Tema", experience: "Less than 1 year", date: "1 Oct 2026", status: "rejected", cv: false, message: "Open to any role." },
];

/* ---------- App ratings & reviews ---------- */
export type Review = {
  id: string; name: string; rating: number; comment: string; tags: string[]; date: string; published: boolean;
};
export const REVIEWS: Review[] = [
  { id: "r1", name: "Ama Serwaa", rating: 5, comment: "Booking took two minutes and the cleaners were wonderful.", tags: ["Easy to use", "Great cleaners"], date: "11 Oct 2026", published: true },
  { id: "r2", name: "Naana Owusu", rating: 5, comment: "The deep clean was worth every cedi.", tags: ["Fair prices"], date: "9 Oct 2026", published: true },
  { id: "r3", name: "Kwame Boateng", rating: 4, comment: "Great service. Would love more time slots in the evening.", tags: ["Fast booking"], date: "6 Oct 2026", published: false },
  { id: "r4", name: "Yaw Darko", rating: 5, comment: "", tags: ["Easy to use", "Clear information"], date: "4 Oct 2026", published: false },
  { id: "r5", name: "Esi Quaye", rating: 3, comment: "Cleaner arrived 20 minutes late, but the clean itself was good.", tags: ["Needs improvement"], date: "2 Oct 2026", published: false },
  { id: "r6", name: "Prince Tetteh", rating: 5, comment: "Handled our post-construction mess brilliantly.", tags: ["Great cleaners"], date: "29 Sep 2026", published: true },
  { id: "r7", name: "Akosua Pinto", rating: 4, comment: "Good value and easy to rebook.", tags: ["Fair prices", "Easy to use"], date: "25 Sep 2026", published: false },
];

/* ---------- Services & pricing ---------- */
export type Service = { id: string; name: string; description: string; price: number; active: boolean };
export const SERVICES: Service[] = [
  { id: "s1", name: "Standard Clean", description: "Regular upkeep: dusting, vacuuming, mopping, kitchen and bathroom.", price: 250, active: true },
  { id: "s2", name: "Deep Clean", description: "Top-to-bottom scrub including appliances, tiles and hidden corners.", price: 450, active: true },
  { id: "s3", name: "Move-In / Move-Out", description: "Full clean of every room, inside cupboards and appliances.", price: 600, active: true },
  { id: "s4", name: "Office Clean", description: "Desks, floors, restrooms and shared areas.", price: 350, active: true },
  { id: "s5", name: "Carpet & Upholstery", description: "Stain treatment and hot water extraction wash.", price: 300, active: true },
  { id: "s6", name: "Post-Construction Clean", description: "Dust, debris and residue removal after building work.", price: 900, active: false },
];

/* ---------- Vacancies (matches the Join Our Team page) ---------- */
export type Vacancy = { id: string; title: string; type: string; area: string; openings: number; open: boolean };
export const VACANCIES: Vacancy[] = [
  { id: "v1", title: "Home Cleaner", type: "Full-time", area: "Spintex, Tema, Nungua", openings: 6, open: true },
  { id: "v2", title: "Deep Clean Specialist", type: "Full-time", area: "All service areas", openings: 3, open: true },
  { id: "v3", title: "Office Cleaner", type: "Part-time", area: "Tema, Lashibi", openings: 4, open: true },
  { id: "v4", title: "Team Supervisor", type: "Full-time", area: "Spintex, Klagon", openings: 1, open: true },
  { id: "v5", title: "Customer Support Agent", type: "Part-time", area: "Remote / Tema office", openings: 2, open: false },
];