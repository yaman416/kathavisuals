import Link from "next/link";

export default function NotFound() {
  return (
    <section className="kv-section">
      <div className="kv-wrap kv-wrap--narrow">
        <p className="kv-eyebrow">404</p>
        <h1>That page is out of frame.</h1>
        <p className="kv-lede" style={{ marginTop: "var(--space-6)" }}>
          The link is broken or the page has moved. The work is still where you left it.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", marginTop: "var(--space-8)" }}>
          <Link href="/" className="kv-btn kv-btn--primary">
            Back home
          </Link>
          <Link href="/portfolio" className="kv-btn kv-btn--ghost">
            View the portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
