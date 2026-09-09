/**
 * The enquiry notification email.
 *
 * Email clients are not browsers. Gmail strips <style> blocks, Outlook renders
 * through Word, and flexbox, grid and CSS custom properties are all unreliable.
 * So this is a table layout with inline styles and web-safe fonts, which is the
 * one approach that renders the same everywhere.
 *
 * Both an HTML and a plain text part are produced. Resend sends them together
 * and the client picks; the text part is what shows in notification previews
 * and in clients where images and HTML are blocked.
 */

export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  coverage: string;
  date: string;
  location: string;
  budget: string;
  details: string;
};

/* Cinematic Earth, hard-coded: custom properties do not survive email. */
const INK = "#1f2824";
const INK_SOFT = "#3d4a44";
const INK_MUTED = "#58655e";
const PAPER = "#f4f0e8";
const WHITE = "#ffffff";
const SAND = "#c8b99f";
const EMBER = "#9c5637";

const DISPLAY = "Georgia, 'Times New Roman', serif";
const BODY = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

const NOT_PROVIDED = "Not provided";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * "2027-03-14" becomes "14 March 2027". The parts are read directly because
 * `new Date("2027-03-14")` parses as UTC and can render as the previous day
 * once a local timezone is applied.
 */
function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return value;
  const [, year, month, day] = match;
  const name = MONTHS[Number(month) - 1];
  if (!name) return value;
  return `${Number(day)} ${name} ${year}`;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] as string,
  );
}

function row(label: string, value: string, isLink: "email" | "tel" | null = null): string {
  const provided = value.trim().length > 0;
  const safe = escapeHtml(provided ? value : NOT_PROVIDED);
  const colour = provided ? INK : INK_MUTED;

  let rendered = safe;
  if (provided && isLink === "email") {
    rendered = `<a href="mailto:${safe}" style="color:${EMBER};text-decoration:underline;">${safe}</a>`;
  }
  if (provided && isLink === "tel") {
    rendered = `<a href="tel:${escapeHtml(value.replace(/\s+/g, ""))}" style="color:${EMBER};text-decoration:underline;">${safe}</a>`;
  }

  return `<tr>
  <td style="padding:0 0 4px;font-family:${BODY};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${INK_MUTED};">${escapeHtml(label)}</td>
</tr>
<tr>
  <td style="padding:0 0 18px;font-family:${BODY};font-size:15px;line-height:1.5;color:${colour};border-bottom:1px solid ${PAPER};">${rendered}</td>
</tr>
<tr><td style="height:18px;line-height:18px;font-size:0;">&nbsp;</td></tr>`;
}

export function renderEnquiryEmail(fields: EnquiryFields): { html: string; text: string } {
  const { name, email, phone, service, coverage, date, location, budget, details } = fields;

  const headline = "New enquiry";
  const preheader = `${name || "Someone"} enquired about ${service || "your work"}. Reply to reach them directly.`;

  const detailParagraphs = details
    .split(/\n{2,}/)
    .map((block) => escapeHtml(block).replace(/\n/g, "<br />"))
    .filter(Boolean)
    .map(
      (block) =>
        `<p style="margin:0 0 12px;font-family:${BODY};font-size:15px;line-height:1.65;color:${INK_SOFT};">${block}</p>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>${escapeHtml(headline)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${PAPER};">
<tr>
<td align="center" style="padding:32px 16px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:${WHITE};border:1px solid ${SAND};">

<!-- Masthead -->
<tr>
<td style="padding:28px 32px 24px;border-bottom:1px solid ${SAND};">
  <p style="margin:0;font-family:${BODY};font-size:12px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:${INK};">Katha Visuals</p>
  <p style="margin:6px 0 0;font-family:${DISPLAY};font-size:13px;font-style:italic;color:${INK_MUTED};">When moments become stories.</p>
</td>
</tr>

<!-- Headline -->
<tr>
<td style="padding:32px 32px 8px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="width:28px;height:2px;background:${EMBER};font-size:0;line-height:0;">&nbsp;</td>
  </tr></table>
  ${
    service
      ? `<p style="margin:16px 0 0;font-family:${BODY};font-size:11px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${EMBER};">${escapeHtml(service)}</p>`
      : ""
  }
  <h1 style="margin:${service ? "6px" : "16px"} 0 0;font-family:${DISPLAY};font-size:28px;line-height:1.2;font-weight:normal;color:${INK};">${escapeHtml(headline)}</h1>
  <p style="margin:10px 0 0;font-family:${BODY};font-size:14px;line-height:1.6;color:${INK_MUTED};">Sent from the enquiry form on kathavisuals.com.au. Replying to this email goes straight to ${escapeHtml(name || "the sender")}.</p>
</td>
</tr>

<!-- Reply button -->
<tr>
<td style="padding:24px 32px 8px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="background:${INK};">
      <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: your enquiry with Katha Visuals`)}"
         style="display:inline-block;padding:13px 26px;font-family:${BODY};font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${PAPER};text-decoration:none;">Reply to ${escapeHtml(name.split(" ")[0] || "sender")}</a>
    </td>
  </tr></table>
</td>
</tr>

<!-- Details -->
<tr>
<td style="padding:28px 32px 4px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${row("Name", name)}
    ${row("Email", email, "email")}
    ${row("Phone", phone, "tel")}
    ${row("Service", service)}
    ${row("Coverage", coverage)}
    ${row("Preferred date", formatDate(date))}
    ${row("Location", location)}
    ${row("Budget", budget)}
  </table>
</td>
</tr>

<!-- Message -->
<tr>
<td style="padding:8px 32px 32px;">
  <p style="margin:0 0 10px;font-family:${BODY};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${INK_MUTED};">Their message</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="padding:16px 18px;background:${PAPER};border-left:2px solid ${EMBER};">${detailParagraphs}</td></tr>
  </table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:20px 32px 24px;border-top:1px solid ${SAND};">
  <p style="margin:0;font-family:${BODY};font-size:12px;line-height:1.6;color:${INK_MUTED};">Katha Visuals, Canberra ACT. This notification was generated automatically, so it is not a reply to the sender.</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`;

  const text = [
    headline.toUpperCase(),
    "Sent from the enquiry form on kathavisuals.com.au.",
    "Replying to this email goes straight to the sender.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || NOT_PROVIDED}`,
    `Service: ${service || "Not specified"}`,
    `Coverage: ${coverage || "Not specified"}`,
    `Preferred date: ${date ? formatDate(date) : NOT_PROVIDED}`,
    `Location: ${location || NOT_PROVIDED}`,
    `Budget: ${budget || "Not stated"}`,
    "",
    "THEIR MESSAGE",
    details,
  ].join("\n");

  return { html, text };
}
