/**
 * Site content.
 *
 * The words and pictures live in `content/*.json` and are edited at /keystatic,
 * not here. This file imports that JSON, gives it types, and exposes it under
 * the same names the components already use.
 *
 * They are plain imports rather than Keystatic's reader because the header,
 * hero and enquiry form are client components, and the reader is async and
 * server-only. Importing the JSON keeps the content usable everywhere.
 *
 * Accuracy rules for anything edited in the admin:
 *  - never state a number of years of experience
 *  - no awards, qualifications, client names, testimonials, statistics or
 *    results that are not genuine
 *  - the brand is newer than the founders' individual freelance experience; do
 *    not blur the two
 *  - Australian English
 */

import enquiryData from "../../content/enquiry.json";
import peopleData from "../../content/people.json";
import principlesData from "../../content/principles.json";
import servicesData from "../../content/services.json";
import settingsData from "../../content/settings.json";

/* -------------------------------------------------------------------------- */
/* Site details                                                               */
/* -------------------------------------------------------------------------- */

/** Fixed identity. Changing these is a structural change, not a content edit. */
const identity = {
  name: "Katha Visuals",
  region: "Australian Capital Territory",
  country: "Australia",
  url: "https://www.kathavisuals.com.au",
} as const;

export const site = {
  ...identity,
  tagline: settingsData.tagline,
  location: settingsData.location,
  email: settingsData.email,
  phone: settingsData.phone,
  phoneHref: settingsData.phoneHref,
  instagram: settingsData.instagram as string | null,
  facebook: settingsData.facebook as string | null,
  youtube: settingsData.youtube as string | null,
  description: settingsData.description,
};

/*
 * There is no delivery-days constant any more. The window appears as ordinary
 * words in the service inclusions and FAQs, which is what gets edited in the
 * admin. A constant would have meant editing a number in one place and unrelated
 * prose in another, with no way to see the published wording while doing it.
 */

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

export const people: Person[] = peopleData.items.map((person) => ({
  name: person.name,
  role: person.role,
  bio: person.bio,
  portrait: person.portrait ?? null,
}));

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export type Faq = { question: string; answer: string };

export type GallerySlot = { src: string; alt: string } | null;

export type Service = {
  slug: string;
  name: string;
  summary: string;
  intro: string;
  includes: string[];
  audience: string;
  process: string[];
  faqs: Faq[];
  image: string;
  gallery: { src: string; alt: string }[];
};

export const services: Service[] = servicesData.items.map((service) => ({
  slug: service.slug,
  name: service.name,
  summary: service.summary,
  intro: service.intro,
  includes: [...service.includes],
  audience: service.audience,
  process: [...service.process],
  faqs: service.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  image: service.image,
  gallery: service.gallery.map((item) => ({ src: item.src, alt: item.alt })),
}));

/* -------------------------------------------------------------------------- */
/* Galleries                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Empty slots are added up to this count so a gallery has something to scroll
 * and an obvious place for the next photograph.
 */
export const MIN_SLIDES = 4;

/** Keyed by service slug, padded with nulls that render as placeholders. */
export const galleries: Record<string, GallerySlot[]> = Object.fromEntries(
  services.map((service) => {
    const length = Math.max(MIN_SLIDES, service.gallery.length);
    return [service.slug, Array.from({ length }, (_, i) => service.gallery[i] ?? null)];
  }),
);

/* -------------------------------------------------------------------------- */
/* Homepage supporting content                                                */
/* -------------------------------------------------------------------------- */

export const principles = principlesData.items.map((item) => ({
  title: item.title,
  body: item.body,
}));

export const coverageOptions: string[] = [...enquiryData.coverageOptions];
export const budgetOptions: string[] = [...enquiryData.budgetOptions];

/* -------------------------------------------------------------------------- */
/* Not yet confirmed. Nothing here is rendered                                */
/* -------------------------------------------------------------------------- */

export const pending = {
  /** Genuine client testimonials. The section stays unpublished while empty. */
  testimonials: [] as { quote: string; name: string; detail: string }[],
  /** A real photograph of Prakash and Yaman. No stock or generated portraits. */
  teamPhotograph: null as string | null,
  /** Toggled in the admin under Site details. */
  imageryIsPlaceholder: settingsData.imageryIsPlaceholder,
};
