"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { nav, site } from "@/lib/site";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {open ? (
        <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.2" />
      ) : (
        <path d="M3 8h16M3 14h16" stroke="currentColor" strokeWidth="1.2" />
      )}
    </svg>
  );
}

/*
 * Light gallery header: the wordmark sits in the centre with the pages split
 * either side of it, the way a gallery or a magazine sets its masthead.
 * Home is the wordmark itself, so it is not repeated as a link.
 */
const pages = nav.filter((item) => item.href !== "/");
const left = pages.slice(0, 2);
const right = pages.slice(2);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const close = useCallback(() => setOpen(false), []);

  // Collapse the drawer whenever navigation lands on a new route.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape closes it, and the page behind must not scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links = (items: typeof pages) =>
    items.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isCurrent(item.href) ? "page" : undefined}
      >
        {item.label}
      </Link>
    ));

  // The drawer is a sibling of the header so `position: fixed` resolves
  // against the viewport, not the sticky header's box.
  return (
    <>
      <header className="kv-header">
        <div className="kv-header__inner">
          <nav aria-label="Primary" className="kv-nav kv-desktop-only">
            {links(left)}
          </nav>

          <Link href="/" aria-label={`${site.name} home`} className="kv-header__mark">
            <Wordmark />
          </Link>

          <nav aria-label="More pages" className="kv-nav kv-nav--end kv-desktop-only">
            {links(right)}
          </nav>

          <button
            type="button"
            className="kv-menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </header>

      {open ? (
        <div className="kv-drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Wordmark />
            <button
              type="button"
              className="kv-menu-btn"
              style={{ display: "flex" }}
              aria-label="Close menu"
              onClick={close}
            >
              <MenuIcon open />
            </button>
          </div>

          <nav aria-label="Mobile" className="kv-drawer__links">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "grid", gap: "var(--space-2)", justifyItems: "center" }}>
            <Link href="/contact#availability" className="kv-btn kv-btn--primary" style={{ width: "100%" }} onClick={close}>
              Check your date
            </Link>
            <a href={`tel:${site.phoneHref}`} className="kv-muted" style={{ fontSize: "var(--text-sm)", textDecoration: "none", padding: "12px" }}>
              {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
