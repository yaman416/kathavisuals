import Link from "next/link";

/** Closing prompt, shared by every page so the ask is never more than a scroll away. */
export function CallToAction() {
  return (
    <section className="kv-section kv-section--dark">
      <div className="kv-wrap">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-8)",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ maxWidth: "16ch" }}>Have a story worth capturing?</h2>
            <p className="kv-lede" style={{ marginTop: "var(--space-4)" }}>
              Tell us about your wedding, event, property or creative project.
            </p>
          </div>
          <Link href="/contact" className="kv-btn kv-btn--accent">
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
