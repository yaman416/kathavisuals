/**
 * Reads the shared Photoshoot/Events calendar and writes only the booked
 * dates (YYYY-MM-DD, Canberra time, today onwards) to content/booked-dates.json.
 *
 * Runs in GitHub Actions on a schedule. The calendar address comes from the
 * AVAILABILITY_ICS_URL repository secret and is never written anywhere. No
 * event names, times or places leave this script.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { bookedDates, todayInCanberra } from "../src/lib/availability.ts";

const FILE = new URL("../content/booked-dates.json", import.meta.url);

const raw = process.env.AVAILABILITY_ICS_URL?.trim();
if (!raw) {
  console.error("AVAILABILITY_ICS_URL is not set.");
  process.exit(1);
}

const res = await fetch(raw.replace(/^webcal:\/\//i, "https://"));
if (!res.ok) {
  console.error(`Calendar returned ${res.status}.`);
  process.exit(1);
}

const today = todayInCanberra();
const booked = bookedDates(await res.text()).filter((d) => d >= today);

const previous = JSON.parse(readFileSync(FILE, "utf8")) as {
  updated: string | null;
  booked: string[];
};
// The first successful read always writes, even with no bookings, so the site
// knows the calendar is connected.
if (previous.updated && JSON.stringify(previous.booked) === JSON.stringify(booked)) {
  console.log(`No change (${booked.length} booked dates).`);
} else {
  writeFileSync(FILE, JSON.stringify({ updated: new Date().toISOString(), booked }, null, 2) + "\n");
  console.log(`Updated: ${booked.length} booked dates.`);
}
