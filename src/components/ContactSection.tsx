"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { initialEnquiryState, submitEnquiry } from "@/app/actions";
import { Checkbox, Input, Select, Textarea } from "@/components/ds/fields";
import { Button, Eyebrow, SectionHeading } from "@/components/ds/primitives";
import { serviceOptions } from "@/lib/site";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending} aria-busy={pending || undefined}>
      {pending ? "…" : "Send Enquiry"}
    </Button>
  );
}

export function ContactSection() {
  const [state, formAction] = useActionState(submitEnquiry, initialEnquiryState);

  return (
    <section
      id="contact"
      style={{
        maxWidth: "var(--content-width-narrow)",
        margin: "0 auto",
        padding: "var(--section-space) var(--page-gutter)",
        scrollMarginTop: "88px",
      }}
    >
      <Eyebrow>Contact</Eyebrow>
      <SectionHeading style={{ margin: "12px 0 8px" }}>Start a Project.</SectionHeading>
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-secondary)",
          marginBottom: "32px",
        }}
      >
        Tell us about your date, event or space and we&apos;ll be in touch to talk through the
        details.
      </p>

      {state.status === "success" ? (
        <div
          role="status"
          style={{
            border: "1px solid var(--color-success)",
            borderRadius: "var(--radius-card)",
            padding: "24px",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-body)",
          }}
        >
          {state.message}
        </div>
      ) : (
        <form action={formAction} noValidate>
          <div aria-hidden="true" style={{ display: "none" }}>
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="kv-form-grid">
            <Input
              id="name"
              name="name"
              label="Name"
              autoComplete="name"
              required
              error={state.fieldErrors?.name}
            />
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              required
              error={state.fieldErrors?.email}
            />
            <Input id="phone" name="phone" label="Phone (optional)" autoComplete="tel" />
            <Select id="service" name="service" label="Service" defaultValue="">
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Input id="date" name="date" type="date" label="Preferred date (optional)" />
            <Input id="location" name="location" label="Project location (optional)" />
          </div>

          <Textarea
            id="details"
            name="details"
            label="Project details"
            required
            error={state.fieldErrors?.details}
          />

          <Checkbox id="privacy" name="privacy" label="I agree to the privacy policy" />
          {state.fieldErrors?.privacy ? (
            <p
              role="alert"
              style={{
                color: "var(--color-error)",
                fontSize: "var(--text-xs)",
                marginTop: "6px",
              }}
            >
              {state.fieldErrors.privacy}
            </p>
          ) : null}

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <SubmitButton />
            {state.status === "error" && !state.fieldErrors ? (
              <p
                role="alert"
                style={{
                  color: "var(--color-error)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  margin: 0,
                }}
              >
                {state.message}
              </p>
            ) : null}
          </div>
        </form>
      )}
    </section>
  );
}
