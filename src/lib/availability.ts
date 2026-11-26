/**
 * Booked dates from the shared "Photoshoot/Events" calendar.
 *
 * The calendar's published iCal address lives in the AVAILABILITY_ICS_URL
 * environment variable, never in this public repository. Only the dates leave
 * the server: no event names, places, times or client details.
 *
 * A date counts as booked when any event touches it in Canberra time. Repeating
 * events are not expanded, so a one-off booking should be its own event.
 */

export const TIME_ZONE = "Australia/Sydney";

type Stamp = { date: string; time: string | null; utc: boolean };

/** Undo iCal line folding: a line starting with a space continues the last. */
function unfold(ics: string): string[] {
  return ics.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "").split("\n");
}

function parseStamp(value: string): Stamp | null {
  const m = value.trim().match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return null;
  return {
    date: `${m[1]}-${m[2]}-${m[3]}`,
    time: m[4] ? `${m[4]}:${m[5]}:${m[6]}` : null,
    utc: Boolean(m[7]),
  };
}

/** The Canberra calendar date for a stamp. Local times are taken as written. */
function localDate(stamp: Stamp): string {
  if (!stamp.utc || !stamp.time) return stamp.date;
  const instant = new Date(`${stamp.date}T${stamp.time}Z`);
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(instant);
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Every booked date in the feed, as YYYY-MM-DD in Canberra time. */
export function bookedDates(ics: string): string[] {
  const booked = new Set<string>();
  let start: Stamp | null = null;
  let end: Stamp | null = null;
  let cancelled = false;
  let inEvent = false;

  for (const line of unfold(ics)) {
    if (line.startsWith("BEGIN:VEVENT")) {
      inEvent = true;
      start = end = null;
      cancelled = false;
      continue;
    }
    if (!inEvent) continue;

    if (line.startsWith("END:VEVENT")) {
      inEvent = false;
      if (!start || cancelled) continue;
      const first = localDate(start);
      let last = first;
      if (end) {
        const endDate = localDate(end);
        // An all-day end, or a timed end at midnight, is the morning after the
        // last day, so it does not count as a booked day itself.
        const exclusive = !end.time || end.time === "00:00:00";
        last = exclusive ? addDays(endDate, -1) : endDate;
        if (last < first) last = first;
      }
      // Guard against a runaway event filling the whole calendar.
      for (let d = first, n = 0; d <= last && n < 60; d = addDays(d, 1), n++) booked.add(d);
      continue;
    }

    const colon = line.indexOf(":");
    if (colon < 0) continue;
    const name = line.slice(0, colon).split(";")[0].toUpperCase();
    const value = line.slice(colon + 1);
    if (name === "DTSTART") start = parseStamp(value);
    else if (name === "DTEND") end = parseStamp(value);
    else if (name === "STATUS" && value.trim().toUpperCase() === "CANCELLED") cancelled = true;
  }

  return [...booked].sort();
}

/** Today's date in Canberra, as YYYY-MM-DD. */
export function todayInCanberra(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(now);
}
