"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * "Check your date": a month calendar showing which dates are open and which
 * are booked, read from the shared Photoshoot/Events calendar.
 *
 * Choosing an open date fills the date field in the enquiry form below. If the
 * calendar cannot be read, the section stays hidden and the form works as
 * before, so a client never sees a broken widget.
 */

const MONTHS_AHEAD = 18;
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Data = { ok: boolean; today?: string; booked: string[] };

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function longDate(iso: string) {
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d={direction === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function AvailabilityCalendar() {
  const [data, setData] = useState<Data | null>(null);
  const [offset, setOffset] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/availability")
      .then((res) => res.json() as Promise<Data>)
      .then((json) => live && setData(json))
      .catch(() => live && setData({ ok: false, booked: [] }));
    return () => {
      live = false;
    };
  }, []);

  const booked = useMemo(() => new Set(data?.booked ?? []), [data]);

  if (!data?.ok || !data.today) {
    // Hidden while loading and if the calendar is unavailable. Space is kept
    // while loading so the form below does not jump.
    return data === null ? <div className="kv-avail kv-avail--loading" aria-hidden="true" /> : null;
  }

  const today = data.today;
  const [ty, tm] = today.split("-").map(Number);
  const first = new Date(Date.UTC(ty, tm - 1 + offset, 1));
  const year = first.getUTCFullYear();
  const month = first.getUTCMonth();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const lead = (first.getUTCDay() + 6) % 7; // Monday first
  const title = new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric", timeZone: "UTC" }).format(first);

  const choose = (iso: string) => {
    setPicked(iso);
    const input = document.getElementById("date") as HTMLInputElement | null;
    if (input) {
      input.value = iso;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const cells = [];
  for (let i = 0; i < lead; i++) cells.push(<span key={`b${i}`} aria-hidden="true" />);
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${year}-${pad(month + 1)}-${pad(day)}`;
    const past = iso < today;
    const isBooked = booked.has(iso);
    const state = past ? "past" : isBooked ? "booked" : "open";
    cells.push(
      <button
        key={iso}
        type="button"
        className={`kv-avail__day kv-avail__day--${state}${picked === iso ? " is-picked" : ""}`}
        disabled={state !== "open"}
        onClick={() => choose(iso)}
        aria-label={`${longDate(iso)}, ${past ? "past" : isBooked ? "booked" : "open"}`}
        aria-pressed={picked === iso}
      >
        {day}
      </button>,
    );
  }

  return (
    <div className="kv-avail" role="region" aria-labelledby="availability-title">
      <p className="kv-eyebrow" style={{ textAlign: "center", margin: 0 }}>
        Availability
      </p>
      <h2 id="availability-title" style={{ textAlign: "center", margin: "var(--space-2) 0 var(--space-8)" }}>
        Check your date
      </h2>
      <div className="kv-avail__head">
        <button
          type="button"
          className="kv-round"
          onClick={() => setOffset((o) => o - 1)}
          disabled={offset === 0}
          aria-label="Previous month"
        >
          <Chevron direction="left" />
        </button>
        <p className="kv-avail__title" aria-live="polite">
          {title}
        </p>
        <button
          type="button"
          className="kv-round"
          onClick={() => setOffset((o) => o + 1)}
          disabled={offset >= MONTHS_AHEAD - 1}
          aria-label="Next month"
        >
          <Chevron direction="right" />
        </button>
      </div>

      <div className="kv-avail__grid" role="group" aria-label={`Dates in ${title}`}>
        {WEEKDAYS.map((d) => (
          <span key={d} className="kv-avail__weekday" aria-hidden="true">
            {d}
          </span>
        ))}
        {cells}
      </div>

      <div className="kv-avail__legend">
        <span>
          <i className="kv-avail__key kv-avail__key--open" aria-hidden="true" /> Open
        </span>
        <span>
          <i className="kv-avail__key kv-avail__key--booked" aria-hidden="true" /> Booked
        </span>
      </div>

      <p className="kv-avail__note" aria-live="polite">
        {picked
          ? `${longDate(picked)} is open. We have added it to the form below.`
          : "Choose an open date to add it to your enquiry. We confirm every date by reply."}
      </p>
    </div>
  );
}
