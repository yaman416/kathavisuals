"use server";

import { site } from "@/lib/site";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "details" | "privacy", string>>;
};

export const initialEnquiryState: EnquiryState = { status: "idle", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot: real people leave this empty. Accept silently so bots do not retry.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thanks — your enquiry has been sent." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();
  const privacy = formData.get("privacy");

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Enter your name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter your email address.";
  if (details.length < 10) fieldErrors.details = "Tell us a little about the project.";
  if (!privacy) fieldErrors.privacy = "Please agree to the privacy policy.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the fields below.", fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL ?? site.email;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      status: "error",
      message: `Our enquiry form is not connected yet. Please email ${site.email} or call ${site.phone}.`,
    };
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Service: ${service || "Not specified"}`,
    `Preferred date: ${date || "—"}`,
    `Location: ${location || "—"}`,
    "",
    details,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry — ${service || "General"} — ${name}`,
        text: body,
      }),
    });

    if (!response.ok) {
      console.error("Enquiry send failed", response.status, await response.text());
      return {
        status: "error",
        message: `Something went wrong sending that. Please email ${site.email}.`,
      };
    }
  } catch (error) {
    console.error("Enquiry send threw", error);
    return {
      status: "error",
      message: `Something went wrong sending that. Please email ${site.email}.`,
    };
  }

  return {
    status: "success",
    message: "Thanks — your enquiry has been sent. We'll be in touch soon.",
  };
}
