/**
 * Site content. Ported from the Katha Visuals design project
 * (claude.ai/design — "Katha Visuals Website.dc.html") so copy, services and
 * contact details live in one place.
 *
 * Strings in [SQUARE BRACKETS] are deliberate placeholders carried over from
 * the design system: missing facts render as explicit placeholders rather than
 * invented copy. Replace them with real answers before promoting the site.
 */

export const site = {
  name: "Katha Visuals",
  tagline: "For Your Moments, Spaces and Stories.",
  eyebrow: "Photography & Videography",
  domain: "kathavisuals.com.au",
  url: "https://www.kathavisuals.com.au",
  email: "kathavisualscbr@gmail.com",
  phone: "0426 369 124",
  phoneHref: "+61426369124",
  phoneAlt: "0410 494 321",
  location: "Canberra, ACT",
  description:
    "Katha Visuals is a Canberra photography and video studio working across weddings, events, real estate and social media content.",
  instagram: "https://www.instagram.com/_katha_visuals_",
  facebook: "https://www.facebook.com/profile.php?id=100076007284082",
  /** No channel yet — the footer hides any social link left null. */
  youtube: null,
} as const;

/**
 * The portfolio grid currently repeats the four service names with staging
 * imagery, so it is hidden until there is real client work to show. Flip this
 * to true and the section and its nav link both come back.
 */
export const showPortfolio = false;

export const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  ...(showPortfolio ? [{ label: "Portfolio", href: "#portfolio" }] : []),
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export type IconName = "camera" | "users" | "home" | "video";

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  anchorId: string;
  name: string;
  icon: IconName;
  /** Set to a path under /public once real photography is supplied. */
  image: string | null;
  copy: string;
  audience: string;
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "weddings",
    anchorId: "svc-weddings",
    name: "Weddings",
    icon: "camera",
    image: "/design/service-weddings.jpg",
    copy: "Photography and video documenting the people, emotions and moments of your wedding day, from getting ready through to the reception.",
    audience:
      "Couples who want their wedding day told as one honest story, not a checklist of poses.",
    faqs: [
      {
        question: "How do we check availability?",
        answer:
          "Send an enquiry with your date and we'll get back to you quickly to confirm.",
      },
      {
        question: "Do you offer photography and video together?",
        answer:
          "Yes. We shoot stills and motion as one coordinated team so nothing is missed.",
      },
      {
        question: "Do you travel outside Canberra?",
        answer: "[SERVICE AREA PLACEHOLDER]",
      },
    ],
  },
  {
    slug: "events",
    anchorId: "svc-events",
    name: "Events",
    icon: "users",
    image: "/design/service-events.jpg",
    copy: "Photography and video for private celebrations, business events and community gatherings, capturing the atmosphere as it happens.",
    audience:
      "Businesses and hosts who want a clean, usable record of their event for marketing or memory.",
    faqs: [
      {
        question: "How far in advance should we book?",
        answer: "The earlier the better, especially for weekend dates.",
      },
      {
        question: "Can you deliver same day highlights?",
        answer: "[TURNAROUND PLACEHOLDER]",
      },
    ],
  },
  {
    slug: "real-estate",
    anchorId: "svc-real-estate",
    name: "Real Estate",
    icon: "home",
    image: "/design/service-real-estate.jpg",
    copy: "Property photography and video built for property marketing, showing spaces at their best.",
    audience:
      "Agents and owners who want listings that stand out and photograph well online.",
    faqs: [
      { question: "Do you shoot drone footage?", answer: "[DRONE AVAILABILITY PLACEHOLDER]" },
      { question: "How quickly can we get images?", answer: "[TURNAROUND PLACEHOLDER]" },
    ],
  },
  {
    slug: "social",
    anchorId: "svc-social",
    name: "Social Media Content",
    icon: "video",
    image: "/design/service-social.jpg",
    copy: "Photography, short-form video and reels for businesses, products and personal brands.",
    audience: "Brands and creators who need a steady supply of platform-ready content.",
    faqs: [
      {
        question: "Do you offer ongoing content packages?",
        answer: "[PACKAGE OPTIONS PLACEHOLDER]",
      },
      {
        question: "Can you edit for specific platforms?",
        answer: "Yes, we can format content for the platforms you use most.",
      },
    ],
  },
];

export const processSteps = [
  {
    icon: "camera" as IconName,
    title: "Clear Communication",
    description: "We keep you informed from first enquiry to final delivery.",
  },
  {
    icon: "clock" as const,
    title: "Thoughtful Preparation",
    description: "We plan ahead so the day runs smoothly.",
  },
  {
    icon: "video" as IconName,
    title: "Photography & Video",
    description: "Stills and motion captured together, shaped as one story.",
  },
  {
    icon: "heart" as const,
    title: "A Consistent Visual Style",
    description: "A considered look and feel across every project.",
  },
];

export const portfolioFilters = [
  "All",
  "Weddings",
  "Events",
  "Real Estate",
  "Social Media Content",
] as const;

export type Project = {
  title: string;
  category: string;
  image: string | null;
};

export const projects: Project[] = [
  { title: "Weddings", category: "Weddings", image: "/design/portfolio-weddings.jpg" },
  { title: "Events", category: "Events", image: "/design/portfolio-events.jpg" },
  { title: "Real Estate", category: "Real Estate", image: "/design/portfolio-real-estate.jpg" },
  { title: "Social Media Content", category: "Social Media Content", image: "/design/portfolio-social.jpg" },
];

/** Shown above the portfolio grid while the grid holds sample entries. */
export const showSampleNote = true;

export const serviceOptions = [
  "Weddings",
  "Events",
  "Real Estate",
  "Social Media Content",
  "Not sure yet",
] as const;
