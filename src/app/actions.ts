"use server";

import type { EnquiryState } from "@/lib/enquiry";
import { site } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Resend's own sender. It needs no verified domain, and it delivers to the
 * address that owns the Resend account. Used when ENQUIRY_FROM_EMAIL is unset,
 * and as the fallback when the configured sender is rejected.
 */
const RESEND_TEST_SENDER = "Katha Visuals <onboarding@resend.dev>";

/**
 * Mailbox providers, as opposed to domains someone can own. Resend only sends
 * from a domain verified on the account, and nobody can verify gmail.com, so a
 * `from` here is rejected every time. Receiving at a Gmail address is fine and
 * unrelated: that is ENQUIRY_TO_EMAIL.
 */
const MAILBOX_PROVIDERS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "live.com.au",
  "yahoo.com",
  "yahoo.com.au",
  "icloud.com",
  "me.com",
  "aol.com",
  "bigpond.com",
  "optusnet.com.au",
]);

/** Accepts either "a@b.com" or "Name <a@b.com>". */
function senderDomain(address: string): string {
  const match = address.match(/<([^>]+)>/);
  return (match ? match[1] : address).split("@").pop()?.trim().toLowerCase() ?? "";
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot: real people leave this empty. Accept silently so bots do not retry.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thanks, your enquiry has been sent." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const coverage = String(formData.get("coverage") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim();
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

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = (process.env.ENQUIRY_TO_EMAIL ?? site.email).trim();
  const configuredFrom = process.env.ENQUIRY_FROM_EMAIL?.trim();

  if (!apiKey) {
    return {
      status: "error",
      message: `Our enquiry form is not connected yet. Please email ${site.email} or call ${site.phone}.`,
    };
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Service: ${service || "Not specified"}`,
    `Coverage: ${coverage || "Not specified"}`,
    `Preferred date: ${date || "Not provided"}`,
    `Location: ${location || "Not provided"}`,
    `Budget: ${budget || "Not stated"}`,
    "",
    details,
  ].join("\n");

  const subject = `New enquiry: ${service || "General"}${coverage ? ` (${coverage})` : ""} from ${name}`;

  const send = async (sender: string) => {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [to],
        reply_to: email,
        subject,
        text: body,
      }),
    });
    // Read the body either way: Resend explains rejections here, and that text
    // is the only thing that says which of several config mistakes it was.
    return { ok: response.ok, status: response.status, detail: await response.text() };
  };

  let sender = configuredFrom || RESEND_TEST_SENDER;
  if (configuredFrom && MAILBOX_PROVIDERS.has(senderDomain(configuredFrom))) {
    console.error(
      `Enquiry: ENQUIRY_FROM_EMAIL is "${configuredFrom}", which is a mailbox provider, ` +
        `not a domain that can be verified on Resend. Sending as ${RESEND_TEST_SENDER} instead. ` +
        `Set it to an address on kathavisuals.com.au once that domain is verified. ` +
        `This does not affect where enquiries are delivered.`,
    );
    sender = RESEND_TEST_SENDER;
  }

  try {
    let result = await send(sender);

    /*
     * Resend refuses a `from` address whose domain is not verified on the
     * account, which is the usual reason a working key still sends nothing.
     * Rather than lose the enquiry, fall back to Resend's own sender, which
     * needs no domain and delivers to the account owner. The enquiry arrives;
     * the log below says the domain still needs fixing.
     */
    if (!result.ok && sender !== RESEND_TEST_SENDER && (result.status === 403 || result.status === 422)) {
      console.error(
        `Enquiry: Resend rejected from="${sender}" (${result.status}): ${result.detail}. ` +
          `Retrying as ${RESEND_TEST_SENDER}. Verify the domain in Resend to send under your own address.`,
      );
      result = await send(RESEND_TEST_SENDER);
    }

    if (!result.ok) {
      console.error(`Enquiry send failed (${result.status}): ${result.detail}`);
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
    message: "Thanks, your enquiry has been sent. We'll be in touch soon.",
  };
}
