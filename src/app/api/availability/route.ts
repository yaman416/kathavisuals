import bookedFile from "../../../../content/booked-dates.json";
import { bookedDates, todayInCanberra } from "@/lib/availability";

/**
 * Booked dates for the "Check your date" calendar on the contact page.
 *
 * Reads the shared iCloud calendar on the server and returns dates only, from
 * today forward. Vercel's edge cache keeps a copy for 15 minutes, so a new
 * booking shows on the site within about that long.
 */

export const dynamic = "force-dynamic";

const CACHE = "public, s-maxage=900, stale-while-revalidate=3600";

export async function GET() {
  const raw = process.env.AVAILABILITY_ICS_URL?.trim();
  if (!raw) {
    // No live feed on this deployment: use the dates the scheduled GitHub
    // workflow copied into content/booked-dates.json, if it has run.
    const today = todayInCanberra();
    const synced = Boolean(bookedFile.updated);
    return Response.json(
      { ok: synced, today, booked: (bookedFile.booked as string[]).filter((d) => d >= today) },
      { headers: { "Cache-Control": synced ? CACHE : "no-store" } },
    );
  }

  // Calendar apps share the address as webcal://, which is plain https.
  const url = raw.replace(/^webcal:\/\//i, "https://");

  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Calendar returned ${res.status}`);
    const today = todayInCanberra();
    const booked = bookedDates(await res.text()).filter((d) => d >= today);
    return Response.json({ ok: true, today, booked }, { headers: { "Cache-Control": CACHE } });
  } catch (error) {
    console.error("Availability calendar could not be read", error);
    return Response.json({ ok: false, today: todayInCanberra(), booked: [] }, { headers: { "Cache-Control": "no-store" } });
  }
}
