"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { initialEnquiryState, submitEnquiry } from "@/app/contact/actions";
import { services } from "@/lib/site";

const field =
  "mt-2 w-full border border-ink-line bg-ink-soft px-4 py-3 text-sm text-bone placeholder:text-bone-dim/60 focus:border-sand focus:outline-none";
const label = "text-[11px] uppercase tracking-[0.24em] text-bone-dim";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-sand px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send enquiry"}
    </button>
  );
}

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [state, formAction] = useActionState(submitEnquiry, initialEnquiryState);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(state.fieldErrors?.name)}
            className={field}
            placeholder="Your name"
          />
          {state.fieldErrors?.name ? (
            <p className="mt-2 text-xs text-sand">{state.fieldErrors.name}</p>
          ) : null}
        </div>

        <div>
          <label className={label} htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(state.fieldErrors?.email)}
            className={field}
            placeholder="you@example.com"
          />
          {state.fieldErrors?.email ? (
            <p className="mt-2 text-xs text-sand">{state.fieldErrors.email}</p>
          ) : null}
        </div>

        <div>
          <label className={label} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
            placeholder="Optional"
          />
        </div>

        <div>
          <label className={label} htmlFor="date">
            Date
          </label>
          <input id="date" name="date" type="date" className={field} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="service">
          What is it for?
        </label>
        <select
          id="service"
          name="service"
          defaultValue={defaultService}
          className={field}
        >
          <option value="">Not sure yet</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="message">
          Tell us about it *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(state.fieldErrors?.message)}
          className={field}
          placeholder="Where, roughly how many people, and what matters most to you."
        />
        {state.fieldErrors?.message ? (
          <p className="mt-2 text-xs text-sand">{state.fieldErrors.message}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <SubmitButton />
        {state.message ? (
          <p
            role="status"
            className={`text-sm ${state.status === "success" ? "text-bone" : "text-sand"}`}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
