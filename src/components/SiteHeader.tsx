"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/ds/primitives";
import { MenuIcon, XIcon } from "@/components/ds/Icons";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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
        padding: "16px var(--page-gutter)",
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <a href="#home" style={{ display: "flex", alignItems: "center" }} aria-label={site.name}>
        <Image
          src="/design/logo-white.png"
          alt={site.name}
          width={84}
          height={84}
          priority
          style={{ height: "64px", width: "64px", objectFit: "contain" }}
        />
      </a>

      <nav aria-label="Primary" className="kv-nav-desktop" style={{ display: "flex", gap: "36px" }}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="kv-nav-link">
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
            gap: "28px",
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "none",
              border: "none",
              color: "var(--color-text-primary)",
              cursor: "pointer",
            }}
          >
            <XIcon width={24} height={24} />
          </button>

          <Image
            src="/design/logo-white.png"
            alt={site.name}
            width={72}
            height={72}
            style={{ height: "72px", width: "72px", objectFit: "contain" }}
          />

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.75rem",
                color: "var(--color-text-primary)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}

          <ButtonLink href="#contact" variant="primary" onClick={() => setOpen(false)}>
            Enquire Now
          </ButtonLink>
        </div>
      ) : null}
    </header>
  );
}
