"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/site";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {open ? (
        <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.6" />
      ) : (
        <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.6" />
      )}
    </svg>
  );
}

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

  // Escape closes it, and the page behind must not scroll while it is covering
  // the screen.
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

  return (
    <header className="kv-header">
      <div className="kv-wrap kv-header__inner">
        <Link href="/" aria-label={`${site.name} home`} style={{ textDecoration: "none" }}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="kv-nav kv-desktop-only">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="kv-desktop-only">
          <Link href="/contact" className="kv-btn kv-btn--accent">
            Enquire Now
          </Link>
        </div>

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

      {open ? (
        <div className="kv-drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <Logo />
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

          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            <Link href="/contact" className="kv-btn kv-btn--accent" onClick={close}>
              Enquire Now
            </Link>
            <a href={`tel:${site.phoneHref}`} className="kv-link" style={{ justifyContent: "center" }}>
              {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
