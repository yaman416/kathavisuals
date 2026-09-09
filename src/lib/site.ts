/**
 * Site content.
 *
 * Accuracy rules for anything added here:
 *  - never state a number of years of experience
 *  - no awards, qualifications, client names, testimonials, statistics or results
 *  - the brand is newer than the founders' individual freelance experience; do
 *    not blur the two
 *  - Australian English
 *
 * Facts that are not yet confirmed live in `pending` below rather than being
 * invented, and nothing in `pending` is rendered.
 */

export const site = {
  name: "Katha Visuals",
  tagline: "When moments become stories.",
  location: "Canberra, ACT",
  region: "Australian Capital Territory",
  country: "Australia",
  url: "https://www.kathavisuals.com.au",
  email: "kathavisualscbr@gmail.com",
  phone: "0426 369 124",
  phoneHref: "+61426369124",
  instagram: "https://www.instagram.com/_katha_visuals_",
  facebook: "https://www.facebook.com/profile.php?id=100076007284082",
  youtube: null as string | null,
  description:
    "Katha Visuals is a Canberra photography and videography team documenting weddings, events, properties and brands across the ACT.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* People                                                                     */
/* -------------------------------------------------------------------------- */

export type Person = {
  name: string;
  role: string;
  bio: string;
  /** Set once a genuine photograph exists. Never a stock or generated portrait. */
  portrait: string | null;
};

/**
 * Prakash and Yaman hold the same role. The bios are deliberately parallel:
 * differentiating them would mean inventing detail neither has confirmed.
 */
export const people: Person[] = [
  {
    name: "Prakash Khanal",
    role: "Founder, Photographer & Videographer",
    bio: "Prakash co-founded Katha Visuals and shoots both photography and video across the studio's work, from weddings and events through to property and brand projects.",
    portrait: null,
  },
  {
    name: "Yaman Gurung",
    role: "Founder, Photographer & Videographer",
    bio: "Yaman co-founded Katha Visuals and shoots both photography and video across the studio's work, sharing creative direction and delivery on every project.",
    portrait: null,
  },
];

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  summary: string;
  /** Longer introduction for the services page. */
  intro: string;
  includes: string[];
  audience: string;
  process: string[];
  faqs: Faq[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "weddings",
    name: "Weddings",
    summary:
      "Honest and thoughtfully composed photography and films that preserve the atmosphere, relationships and meaningful details of your celebration.",
    intro:
      "We cover a wedding the way it actually unfolds. That means arriving early enough to understand the room, staying close to the people who matter, and directing only where it genuinely helps.",
    includes: [
      "Photography, videography, or both",
      "Coverage planned around your run sheet",
      "Preview images within 48 hours",
      "Full edited gallery in one to two weeks",
    ],
    audience:
      "Couples who want their day told as one honest story rather than a checklist of poses.",
    process: [
      "A conversation about the day, the people and what matters most to you",
      "A written plan covering locations, timings and the moments you cannot miss",
      "Coverage on the day, working quietly around the celebration",
      "Previews within 48 hours, then the full gallery",
    ],
    faqs: [
      {
        question: "How do we check availability?",
        answer:
          "Send an enquiry with your date and we will get back to you quickly to confirm.",
      },
      {
        question: "Do you offer photography and video together?",
        answer:
          "Yes. You can book stills, film, or both. Whichever you choose, it is shot by the same team with the same eye.",
      },
      {
        question: "Do you travel outside Canberra?",
        answer:
          "Yes, anywhere in Australia. Travel and accommodation are quoted on top of your package so you can see exactly what they add.",
      },
    ],
    image: "/design/service-weddings.jpg",
  },
  {
    slug: "events",
    name: "Events",
    summary:
      "Professional coverage for private celebrations, community gatherings, cultural occasions and corporate events.",
    intro:
      "Events move quickly and rarely repeat themselves. We plan the coverage in advance so the moments that matter are photographed as they happen rather than reconstructed afterwards.",
    includes: [
      "Half or full day coverage",
      "Photography, videography, or both",
      "Preview images within 48 hours",
      "Full edited gallery in one to two weeks",
    ],
    audience:
      "Organisers and hosts who need a clean, usable record of their event for marketing or for memory.",
    process: [
      "A short brief covering the run sheet, the venue and who needs to be photographed",
      "Coverage planned around the parts of the programme that matter most",
      "Discreet shooting through the event",
      "Previews within 48 hours, then the full gallery",
    ],
    faqs: [
      {
        question: "How far in advance should we book?",
        answer: "The earlier the better, especially for weekend dates.",
      },
      {
        question: "Can you deliver same day highlights?",
        answer:
          "Not on the night itself. You will have a set of preview images within 48 hours, and the full edited gallery in one to two weeks.",
      },
      {
        question: "Do you cover cultural and community events?",
        answer:
          "Yes. We regularly photograph community occasions and take the time to understand the programme and the customs involved beforehand.",
      },
    ],
    image: "/design/service-events.jpg",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    summary:
      "Clean, considered property photography and video created to present spaces accurately and attractively.",
    intro:
      "Property work is a deadline business. We shoot for the listing, deliver quickly, and keep the rooms looking like themselves rather than like a rendering.",
    includes: [
      "Interior and exterior photography",
      "Walkthrough video on request",
      "Aerial stills and video, flown in-house",
      "Delivery within 24 to 48 hours",
    ],
    audience:
      "Agents and owners who want listings that stand out and photograph well online.",
    process: [
      "Confirm the property, access and the listing deadline",
      "Shoot the rooms and exterior in the best available light",
      "Edit for accurate colour and straight verticals",
      "Deliver within 24 to 48 hours",
    ],
    faqs: [
      {
        question: "Do you shoot drone footage?",
        answer:
          "Yes. We fly our own drone, so aerial stills and video can be added to any property shoot.",
      },
      {
        question: "How quickly can we get images?",
        answer:
          "Property images are delivered within 24 to 48 hours, so you can list without waiting.",
      },
    ],
    image: "/design/service-real-estate.jpg",
  },
  {
    slug: "brand-content",
    name: "Brand Content",
    summary:
      "Photography and short-form video for businesses, products, campaigns and social media.",
    intro:
      "Content that has to work on a feed has different rules to a gallery. We plan the shoot around where it will actually be published and deliver it in the formats you need.",
    includes: [
      "Creative direction and a shot list",
      "Stills and short-form video",
      "Formats cut for the platforms you use",
      "Commercial usage licence",
    ],
    audience:
      "Businesses and creators who need a steady supply of images and video that look like their brand.",
    process: [
      "A brief covering the product, the audience and where the work will run",
      "A shot list agreed before the day",
      "The shoot, on location or at your premises",
      "Delivery in the crops and formats you asked for",
    ],
    faqs: [
      {
        question: "Do you offer ongoing content packages?",
        answer:
          "Not yet. We book shoots individually at the moment, so tell us what you need and we will quote that piece of work.",
      },
      {
        question: "Can you edit for specific platforms?",
        answer: "Yes, we can format content for the platforms you use most.",
      },
    ],
    image: "/design/service-social.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/* Portfolio                                                                  */
/* -------------------------------------------------------------------------- */

export const portfolioCategories = [
  "All",
  "Weddings",
  "Events",
  "Real Estate",
  "Brand Content",
] as const;

export type Project = {
  id: string;
  /** Factual category label until real project titles are confirmed. */
  title: string;
  category: Exclude<(typeof portfolioCategories)[number], "All">;
  image: string;
  alt: string;
  /** Editorial grid weighting — tall frames break the rhythm of a plain grid. */
  span: "wide" | "tall" | "standard";
};

export const projects: Project[] = [
  {
    id: "wedding-ceremony",
    title: "Wedding ceremony",
    category: "Weddings",
    image: "/design/portfolio-weddings.jpg",
    alt: "An outdoor wedding ceremony on a lawn in bright daylight",
    span: "wide",
  },
  {
    id: "wedding-portraits",
    title: "Wedding portraits",
    category: "Weddings",
    image: "/design/service-weddings.jpg",
    alt: "A couple laughing together in a sunlit garden",
    span: "tall",
  },
  {
    id: "celebration",
    title: "Private celebration",
    category: "Events",
    image: "/design/portfolio-events.jpg",
    alt: "Guests seated at a long outdoor table under a white canopy",
    span: "standard",
  },
  {
    id: "garden-event",
    title: "Garden event",
    category: "Events",
    image: "/design/service-events.jpg",
    alt: "Guests laughing together at an outdoor garden party",
    span: "standard",
  },
  {
    id: "residential-interior",
    title: "Residential interior",
    category: "Real Estate",
    image: "/design/service-real-estate.jpg",
    alt: "A white living room filled with morning daylight",
    span: "tall",
  },
  {
    id: "residential-exterior",
    title: "Residential exterior",
    category: "Real Estate",
    image: "/design/portfolio-real-estate.jpg",
    alt: "A contemporary home exterior in clear morning light",
    span: "standard",
  },
  {
    id: "cafe-content",
    title: "Hospitality content",
    category: "Brand Content",
    image: "/design/service-social.jpg",
    alt: "Coffee and pastries on a marble counter beside a sunlit window",
    span: "standard",
  },
  {
    id: "product-flat-lay",
    title: "Product flat lay",
    category: "Brand Content",
    image: "/design/portfolio-social.jpg",
    alt: "An overhead arrangement of plates, fruit and flowers on pale marble",
    span: "wide",
  },
];

/* -------------------------------------------------------------------------- */
/* Homepage supporting content                                                */
/* -------------------------------------------------------------------------- */

export const principles = [
  {
    title: "Clear communication",
    body: "You know who is coming, what we are covering and when the work lands, from the first reply onwards.",
  },
  {
    title: "Thoughtful preparation",
    body: "We learn the run sheet, the venue and the light before the day, so nothing important is left to chance.",
  },
  {
    title: "Photography and video",
    body: "Book stills, film, or both. Whichever you choose, it is shot by the same team with the same eye.",
  },
  {
    title: "Consistent visual storytelling",
    body: "A considered look across the whole delivery, so a gallery reads as one piece of work rather than a collection.",
  },
];

export const coverageOptions = [
  "Photography only",
  "Videography only",
  "Photography and video",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Prefer not to say",
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "Over $5,000",
] as const;

/* -------------------------------------------------------------------------- */
/* Not yet confirmed — nothing here is rendered                               */
/* -------------------------------------------------------------------------- */

export const pending = {
  /** Genuine client testimonials. The section stays unpublished while empty. */
  testimonials: [] as { quote: string; name: string; detail: string }[],
  /** A real photograph of Prakash and Yaman. No stock or generated portraits. */
  teamPhotograph: null as string | null,
  /**
   * Every image currently on the site is placeholder imagery, not client work.
   * Setting this to false removes the notice shown above the portfolio grid.
   */
  imageryIsPlaceholder: true,
  /** Confirmed detail still needed before it can be written into a bio. */
  bioDetailNeeded: [
    "Any detail either founder wants published to distinguish their bios — the two are currently parallel because the roles are identical",
    "Whether an ABN should appear in the footer",
  ],
};
