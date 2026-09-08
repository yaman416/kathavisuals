export const site = {
  name: "Katha Visuals",
  tagline: "Every frame is a story",
  domain: "kathavisuals.com.au",
  url: "https://www.kathavisuals.com.au",
  email: "hello@kathavisuals.com.au",
  phone: "+61 400 000 000",
  location: "Canberra, ACT — available Australia-wide",
  instagram: "https://instagram.com/kathavisuals",
  description:
    "Katha Visuals is a Canberra photography and video studio crafting cinematic wedding films, portraits, events and brand content across Australia.",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  from: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "weddings",
    title: "Weddings",
    summary:
      "Full-day photo and film coverage, shot quietly and edited with restraint. You get the day as it felt, not as it was posed.",
    from: "$3,200",
    includes: [
      "8–10 hours coverage, two shooters",
      "400+ edited photos in a private gallery",
      "3–5 minute cinematic highlight film",
      "Engagement session included",
    ],
  },
  {
    slug: "portraits",
    title: "Portraits",
    summary:
      "Individuals, couples, families and graduations. One location, natural light, an hour that does not feel like work.",
    from: "$450",
    includes: [
      "60–90 minute session",
      "Location scouting and styling notes",
      "35+ edited photos",
      "Print-ready files",
    ],
  },
  {
    slug: "events",
    title: "Events",
    summary:
      "Cultural celebrations, corporate functions, conferences and milestone parties — documented end to end.",
    from: "$700",
    includes: [
      "Half or full-day coverage",
      "Next-day preview selects",
      "Full edited gallery in 10 days",
      "Optional recap film",
    ],
  },
  {
    slug: "brand",
    title: "Brand & Commercial",
    summary:
      "Product, team, venue and social content for businesses that need to look like themselves, only better.",
    from: "$900",
    includes: [
      "Creative direction and shot list",
      "Half-day studio or on-location shoot",
      "Stills plus vertical video cutdowns",
      "Commercial usage licence",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  blurb: string;
  /** Drop a file in /public/work and set the path here, e.g. "/work/aashish-priya.jpg" */
  image: string | null;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "riverside-vows",
    title: "Riverside Vows",
    category: "Wedding",
    location: "Lake Burley Griffin, ACT",
    year: "2025",
    blurb: "A two-culture ceremony that ran from sunrise tea to a very late dance floor.",
    image: null,
    featured: true,
  },
  {
    slug: "the-long-table",
    title: "The Long Table",
    category: "Event",
    location: "Braddon, ACT",
    year: "2025",
    blurb: "Two hundred guests, one street, and a caterer who never stopped moving.",
    image: null,
    featured: true,
  },
  {
    slug: "first-light",
    title: "First Light",
    category: "Portrait",
    location: "Namadgi National Park",
    year: "2025",
    blurb: "A family session shot in the forty minutes either side of sunrise.",
    image: null,
    featured: true,
  },
  {
    slug: "made-in-fyshwick",
    title: "Made in Fyshwick",
    category: "Brand",
    location: "Fyshwick, ACT",
    year: "2024",
    blurb: "Product and workshop stills for a furniture maker rebuilding their site.",
    image: null,
  },
  {
    slug: "mehendi-nights",
    title: "Mehendi Nights",
    category: "Wedding",
    location: "Gungahlin, ACT",
    year: "2024",
    blurb: "Colour, noise and family — the pre-wedding events given equal weight.",
    image: null,
  },
  {
    slug: "the-graduate",
    title: "The Graduate",
    category: "Portrait",
    location: "ANU, Acton",
    year: "2024",
    blurb: "Graduation portraits that look like a person, not a stock photo.",
    image: null,
  },
];

export const testimonials = [
  {
    quote:
      "They were somehow everywhere and nowhere. We did not notice a camera all day, and then the gallery arrived and every moment was in it.",
    name: "Priya & Aashish",
    detail: "Wedding, 2025",
  },
  {
    quote:
      "The turnaround was faster than quoted and the vertical cutdowns outperformed everything else we ran that quarter.",
    name: "Dan Whitfield",
    detail: "Marketing Lead, Fyshwick Furniture Co.",
  },
  {
    quote:
      "Warm, calm, unhurried. Our parents adored them, which is the highest compliment available in our family.",
    name: "The Karki family",
    detail: "Portrait session, 2025",
  },
];

export const process = [
  {
    step: "01",
    title: "Talk it through",
    body: "A short call or coffee. We work out what the day actually looks like and whether we are the right fit for it.",
  },
  {
    step: "02",
    title: "Plan the coverage",
    body: "A written run sheet, locations, light timings and a shot list of the things you cannot afford to miss.",
  },
  {
    step: "03",
    title: "Shoot",
    body: "We stay out of the way. Direction only where it helps, and never at the cost of the moment in front of us.",
  },
  {
    step: "04",
    title: "Deliver",
    body: "Previews within 72 hours, the full gallery in two to three weeks, films within six. Yours to download and keep.",
  },
];
