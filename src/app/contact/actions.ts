"use server";

import { services, site } from "@/lib/site";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

export const initialEnquiryState: EnquiryState = { status: "idle", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot: real people leave this empty. Silently accept so bots do not retry.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thanks — we will be in touch shortly." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email address.";
  if (message.length < 10) fieldErrors.message = "A sentence or two is plenty.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the fields below.", fieldErrors };
  }

  const serviceLabel =
    services.find((item) => item.slug === service)?.title ?? service ?? "Not specified";

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL ?? site.email;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      status: "error",
      message: `Our enquiry form is not connected yet. Please email ${site.email} directly — we reply within two business days.`,
    };
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Service: ${serviceLabel}`,
    `Date: ${date || "—"}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry — ${serviceLabel} — ${name}`,
        text: body,
      }),
    });

    if (!response.ok) {
      console.error("Enquiry send failed", response.status, await response.text());
      return {
        status: "error",
        message: `Something went wrong sending that. Please email ${site.email} directly.`,
      };
    }
  } catch (error) {
    console.error("Enquiry send threw", error);
    return {
      status: "error",
      message: `Something went wrong sending that. Please email ${site.email} directly.`,
    };
  }

  return {
    status: "success",
    message: "Thanks — your enquiry is in. We reply within two business days.",
  };
}
