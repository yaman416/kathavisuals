"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry } from "@/app/actions";
import { initialEnquiryState } from "@/lib/enquiry";
import { budgetOptions, coverageOptions, services, site } from "@/lib/site";

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  fontWeight: 500,
  color: "var(--color-ink)",
  marginBottom: "6px",
} as const;

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "var(--space-6)" }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" style={{ color: "var(--color-error)", fontSize: "var(--text-xs)", margin: "6px 0 0" }}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="kv-muted" style={{ fontSize: "var(--text-xs)", margin: "6px 0 0" }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="kv-btn kv-btn--accent" disabled={pending} aria-busy={pending || undefined}>
      {pending ? "Sending…" : "Send Enquiry"}
    </button>
  );
}

export function EnquiryForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialEnquiryState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        style={{
          border: "1px solid var(--color-success)",
          borderRadius: "var(--radius)",
          padding: "var(--space-8)",
          background: "var(--color-surface)",
        }}
      >
        <h2 style={{ fontSize: "var(--text-h3)" }}>Thank you.</h2>
        <p className="kv-muted" style={{ marginTop: "var(--space-3)", marginBottom: 0 }}>
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      {/* Honeypot. Real people leave this empty. */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="kv-grid kv-grid--2" style={{ gap: "0 var(--space-6)" }}>
        <Field id="name" label="Name" error={state.fieldErrors?.name}>
          <input
            id="name"
            name="name"
            className="kv-field"
            autoComplete="name"
            required
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
        </Field>

        <Field id="email" label="Email" error={state.fieldErrors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            className="kv-field"
            autoComplete="email"
            required
            aria-invalid={state.fieldErrors?.email ? true : undefined}
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          />
        </Field>

        <Field id="phone" label="Phone" hint="Optional">
          <input id="phone" name="phone" type="tel" className="kv-field" autoComplete="tel" />
        </Field>

        <Field id="service" label="Service required">
          <select id="service" name="service" className="kv-field" defaultValue="">
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </Field>

        <Field id="date" label="Event or preferred date" hint="Optional">
          <input id="date" name="date" type="date" className="kv-field" />
        </Field>

        <Field id="location" label="Location" hint="Suburb or venue">
          <input id="location" name="location" className="kv-field" />
        </Field>

        <Field id="coverage" label="Photography, video or both">
          <select id="coverage" name="coverage" className="kv-field" defaultValue="">
            <option value="" disabled>
              Choose coverage
            </option>
            {coverageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id="budget" label="Approximate budget" hint="Optional">
          <select id="budget" name="budget" className="kv-field" defaultValue="">
            <option value="" disabled>
              Choose a range
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="details" label="Project details" error={state.fieldErrors?.details}>
        <textarea
          id="details"
          name="details"
          rows={6}
          className="kv-field"
          required
          aria-invalid={state.fieldErrors?.details ? true : undefined}
          aria-describedby={state.fieldErrors?.details ? "details-error" : undefined}
        />
      </Field>

      <label
        htmlFor="privacy"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          minHeight: "var(--touch)",
          fontSize: "var(--text-sm)",
          color: "var(--color-ink-soft)",
          cursor: "pointer",
        }}
      >
        <input
          id="privacy"
          name="privacy"
          type="checkbox"
          style={{ width: 20, height: 20, flexShrink: 0, accentColor: "var(--color-accent)" }}
          aria-invalid={state.fieldErrors?.privacy ? true : undefined}
        />
        <span>
          I agree to the{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>
        </span>
      </label>
      {state.fieldErrors?.privacy ? (
        <p role="alert" style={{ color: "var(--color-error)", fontSize: "var(--text-xs)", margin: "6px 0 0" }}>
          {state.fieldErrors.privacy}
        </p>
      ) : null}

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-6)", marginTop: "var(--space-8)" }}>
        <SubmitButton />
        {state.status === "error" ? (
          <p role="alert" style={{ color: "var(--color-error)", fontSize: "var(--text-sm)", margin: 0 }}>
            {state.message || `Something went wrong. Please email ${site.email}.`}
          </p>
        ) : null}
      </div>
    </form>
  );
}
