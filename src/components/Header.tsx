"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/Container";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Collapse the mobile menu whenever navigation lands on a new route.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/80 bg-ink/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="font-display text-lg tracking-wide text-bone sm:text-xl"
          >
            {site.name}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm transition-colors hover:text-bone ${
                    active ? "text-sand" : "text-bone-dim"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="rounded-full bg-sand px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-bone"
            >
              Check a date
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 p-2 text-bone md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" fill="none">
              {open ? (
                <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-ink-line bg-ink md:hidden"
      >
        <Container>
          <nav aria-label="Mobile" className="flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink-line/60 py-3 text-base text-bone-dim last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 rounded-full bg-sand px-5 py-3 text-center text-sm font-medium text-ink"
            >
              Check a date
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
