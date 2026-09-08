/**
 * Form fields ported from components/core/Input.jsx. Focus and error styling
 * live in globals.css (.kv-field) rather than React state.
 */
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const labelStyle = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  color: "var(--color-text-primary)",
  marginBottom: "8px",
  fontWeight: 500,
} as const;

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ? (
        <label htmlFor={id} style={labelStyle}>
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          style={{ color: "var(--color-error)", fontSize: "var(--text-xs)", marginTop: "6px" }}
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={`${id}-hint`}
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "var(--text-xs)",
            marginTop: "6px",
          }}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type Common = { id: string; label?: string; hint?: string; error?: string };

function describedBy({ id, hint, error }: Common) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export function Input({
  id,
  label,
  hint,
  error,
  ...rest
}: Common & ComponentPropsWithoutRef<"input">) {
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        className="kv-field"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, hint, error })}
        {...rest}
      />
    </Field>
  );
}

export function Textarea({
  id,
  label,
  hint,
  error,
  rows = 5,
  ...rest
}: Common & ComponentPropsWithoutRef<"textarea">) {
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        rows={rows}
        className="kv-field"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, hint, error })}
        {...rest}
      />
    </Field>
  );
}

export function Select({
  id,
  label,
  hint,
  error,
  children,
  ...rest
}: Common & ComponentPropsWithoutRef<"select">) {
  return (
    <Field id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        className="kv-field"
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy({ id, hint, error })}
        {...rest}
      >
        {children}
      </select>
    </Field>
  );
}

export function Checkbox({
  id,
  label,
  ...rest
}: { id: string; label: string } & ComponentPropsWithoutRef<"input">) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        minHeight: "var(--touch-target)",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        color: "var(--color-text-secondary)",
        cursor: "pointer",
      }}
    >
      <input
        id={id}
        type="checkbox"
        style={{
          width: "20px",
          height: "20px",
          flexShrink: 0,
          accentColor: "var(--color-accent)",
        }}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}
