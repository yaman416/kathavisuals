"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ds/primitives";
import { MenuIcon, XIcon } from "@/components/ds/Icons";
import { navLinks, site } from "@/lib/site";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  const close = useCallback(() => setOpen(false), []);

  // Escape closes the menu, and the page behind it must not scroll while it is
  // covering the screen.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Mark the section currently under the header so the nav says where you are.
  useEffect(() => {
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        padding: "12px var(--page-gutter)",
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <a
        href="#home"
        style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        aria-label={site.name}
      >
        <Image
          src="/design/logo-original.png"
          alt={site.name}
          width={1562}
          height={1074}
          priority
          style={{ height: "44px", width: "auto" }}
        />
      </a>

      <nav aria-label="Primary" className="kv-nav-desktop" style={{ display: "flex", gap: "32px" }}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="kv-nav-link"
            data-active={active === link.href.replace("#", "")}
            aria-current={active === link.href.replace("#", "") ? "true" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="kv-nav-desktop">
        <ButtonLink
          href="#contact"
          variant="outline-gold"
          style={{ borderRadius: "var(--radius-pill)" }}
        >
          Enquire Now
        </ButtonLink>
      </div>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="kv-nav-toggle"
        style={{
          background: "none",
          border: "none",
          color: "var(--color-text-primary)",
          cursor: "pointer",
          display: "none",
        }}
      >
        {open ? <XIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--color-bg)",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "24px",
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="kv-nav-toggle"
            style={{
              position: "absolute",
              top: "12px",
              right: "calc(var(--page-gutter) - 10px)",
              background: "none",
              border: "none",
              color: "var(--color-text-primary)",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <XIcon width={24} height={24} />
          </button>

          <Image
            src="/design/logo-original.png"
            alt=""
            width={1562}
            height={1074}
            style={{ height: "56px", width: "auto", marginBottom: "16px" }}
          />

          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={close} className="kv-menu-link">
              {link.label}
            </a>
          ))}

          <ButtonLink
            href="#contact"
            variant="primary"
            onClick={close}
            style={{ marginTop: "20px" }}
          >
            Enquire Now
          </ButtonLink>

          <a
            href={`tel:${site.phoneHref}`}
            className="kv-footer-link"
            style={{ marginTop: "8px", color: "var(--color-text-secondary)" }}
          >
            {site.phone}
          </a>
        </div>
      ) : null}
    </header>
  );
}
