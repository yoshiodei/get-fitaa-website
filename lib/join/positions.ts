/**
 * SAMPLE VACANCIES: replace with your real open roles.
 * To close a role, delete it or set openings to 0 (it will be hidden).
 */
export type Position = {
  id: string;
  title: string;
  type: "Full-time" | "Part-time" | "Weekends";
  area: string;
  openings: number;
  summary: string;
  requirements: string[];
};

export const POSITIONS: Position[] = [
  {
    id: "home-cleaner",
    title: "Home Cleaner",
    type: "Full-time",
    area: "Spintex, Tema, Nungua",
    openings: 6,
    summary: "Clean homes to our high standard, from regular upkeep to deep cleans.",
    requirements: ["Attention to detail and a friendly attitude", "Reliable and punctual", "Cleaning experience is a plus, training provided"],
  },
  {
    id: "deep-clean-specialist",
    title: "Deep Clean Specialist",
    type: "Full-time",
    area: "All service areas",
    openings: 3,
    summary: "Handle deep, move-in/move-out and post-construction cleaning jobs.",
    requirements: ["At least 1 year of professional cleaning experience", "Comfortable with heavy-duty equipment", "Able to work on your feet for long periods"],
  },
  {
    id: "office-cleaner",
    title: "Office Cleaner",
    type: "Part-time",
    area: "Tema, Lashibi",
    openings: 4,
    summary: "Keep offices tidy and professional, with flexible early-morning or evening shifts.",
    requirements: ["Available early mornings or evenings", "Trustworthy and discreet", "Basic cleaning knowledge"],
  },
  {
    id: "team-supervisor",
    title: "Team Supervisor",
    type: "Full-time",
    area: "Spintex, Klagon",
    openings: 1,
    summary: "Lead a small team of cleaners, check quality and support clients on site.",
    requirements: ["2+ years of cleaning or team-lead experience", "Strong communication skills", "Own smartphone for scheduling and reports"],
  },
  {
    id: "customer-support",
    title: "Customer Support Agent",
    type: "Part-time",
    area: "Remote / Tema office",
    openings: 2,
    summary: "Answer client questions by phone and chat and help them book and reschedule.",
    requirements: ["Clear, polite communication in English", "Comfortable using a computer and phone", "Patient and good at solving problems"],
  },
];