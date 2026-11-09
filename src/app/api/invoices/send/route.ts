/**
 * Sends a Katha Invoices email (an invoice or a payment reminder) straight to
 * the client, with the PDF attached, from an address on kathavisuals.com.au.
 *
 * Only someone signed in to Katha Invoices can use it: the request carries the
 * app's Supabase session, which is checked against Supabase and the members
 * list before anything is sent. Replies go to the Katha Gmail, and a copy of
 * every email is sent there too so there is a record of what went out.
 */

const SUPABASE_URL = (process.env.KATHA_SUPABASE_URL ?? "https://ivnagsroxbvjzuoudqfx.supabase.co").replace(/\/$/, "");
// Publishable key: safe to ship, it only identifies the project. Access is
// decided by the signed-in user's token and the database's row security.
const SUPABASE_KEY = process.env.KATHA_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_j9cctvSN4ZiWhD7l5K0pbA_Of9_sDqm";
const FROM = process.env.INVOICE_FROM_EMAIL?.trim() || "Katha Visuals <invoices@kathavisuals.com.au>";
const REPLY_TO = process.env.INVOICE_REPLY_TO_EMAIL?.trim() || "kathavisualscbr@gmail.com";
const LOGO_URL = "https://www.kathavisuals.com.au/email/katha-logo.png";

const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/;
const NUMBER_RE = /^[A-Za-z0-9-]{1,40}$/;
const MAX_PDF_BYTES = 3_000_000;

type Body = {
  number?: unknown;
  to?: unknown;
  subject?: unknown;
  text?: unknown;
  pdfBase64?: unknown;
  kind?: unknown;
};

function fail(status: number, code: string, message: string) {
  return Response.json({ ok: false, code, message }, { status });
}

/** Who is asking, and are they on the Katha members list? */
async function signedInMember(request: Request): Promise<string | null> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${token}` };
  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers, cache: "no-store" });
  if (!userRes.ok) return null;
  const user = (await userRes.json()) as { email?: string };
  const email = (user.email ?? "").toLowerCase();
  if (!email) return null;
  // Row security only returns the row to a signed-in member, so an empty
  // answer means "not allowed", whatever the reason.
  const memberRes = await fetch(
    `${SUPABASE_URL}/rest/v1/members?select=email&email=eq.${encodeURIComponent(email)}`,
    { headers, cache: "no-store" },
  );
  if (!memberRes.ok) return null;
  const rows = (await memberRes.json()) as unknown[];
  return Array.isArray(rows) && rows.length > 0 ? email : null;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Turns the plain message into a tidy HTML email with the Katha signature. */
function renderHtml(text: string) {
  const ink = "#141516";
  const muted = "#5E6062";
  const red = "#A3261F";
  const rule = "#D9D6D0";
  const blocks = text.trim().split(/\n{2,}/);
  const body = blocks
    .map((block) => {
      const lines = block.split("\n");
      // "Label: value" blocks (invoice summary, bank details) read best as a table.
      const pairs = lines.map((l) => l.match(/^([A-Za-z][A-Za-z ().]{1,30}):\s+(.+)$/));
      const intro = pairs[0] ? null : lines[0];
      const rest = pairs[0] ? pairs : pairs.slice(1);
      if (rest.length >= 2 && rest.every(Boolean)) {
        const rows = rest
          .map(
            (m) =>
              `<tr><td style="padding:4px 18px 4px 0;color:${muted};font-size:14px;white-space:nowrap">${escapeHtml(m![1])}</td>` +
              `<td style="padding:4px 0;color:${ink};font-size:14px;font-weight:bold">${escapeHtml(m![2])}</td></tr>`,
          )
          .join("");
        return (
          (intro ? `<p style="margin:0 0 6px;font-size:14px;line-height:22px;color:${ink}">${escapeHtml(intro)}</p>` : "") +
          `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 18px;background:#F3F2EF;border-left:3px solid ${ink}">` +
          `<tr><td style="padding:12px 18px"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">${rows}</table></td></tr></table>`
        );
      }
      return `<p style="margin:0 0 16px;font-size:14px;line-height:22px;color:${ink}">${lines.map(escapeHtml).join("<br>")}</p>`;
    })
    .join("");

  const corner = (sides: string[]) =>
    `<td width="14" height="14" style="width:14px;min-width:14px;height:14px;${sides
      .map((s) => `border-${s}:2px solid ${ink}`)
      .join(";")};font-size:0;line-height:0;padding:0"><div style="width:12px;height:12px;font-size:0;line-height:0"></div></td>`;
  const gap = `<td style="font-size:0;line-height:0;padding:0">&nbsp;</td>`;
  const link = (href: string, label: string, color: string, bold: boolean) =>
    `<a href="${href}" style="color:${color};text-decoration:none;${bold ? "font-weight:bold;" : ""}">${label}</a>`;
  const signature =
    `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:8px;font-family:Arial,Helvetica,sans-serif;color:${ink}">` +
    `<tr>${corner(["top", "left"])}${gap}${corner(["top", "right"])}</tr>` +
    `<tr><td style="padding:0"></td><td style="padding:8px 14px"><table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse"><tr>` +
    `<td valign="middle" style="padding:0 18px 0 0;border-right:1px solid ${rule}"><a href="https://www.kathavisuals.com.au"><img src="${LOGO_URL}" width="108" height="76" alt="Katha Visuals" style="display:block;width:108px;height:76px;border:0"></a></td>` +
    `<td valign="middle" style="padding:0 0 0 18px;white-space:nowrap">` +
    `<div style="font-size:15px;font-weight:bold;letter-spacing:3px;line-height:20px">KATHA VISUALS</div>` +
    `<div style="font-size:12px;color:${muted};line-height:18px">Where moments become stories</div>` +
    `<div style="font-size:11px;font-weight:bold;letter-spacing:1.5px;line-height:16px;padding-top:10px"><span style="color:${red};font-size:12px">&#9679;</span>&nbsp; PHOTO + VIDEO, CANBERRA</div>` +
    `<div style="font-size:12px;color:${muted};line-height:19px;padding-top:6px">Yaman&nbsp; ${link("tel:+61410494321", "0410 494 321", ink, true)}<br>Prakash&nbsp; ${link("tel:+61426369124", "0426 369 124", ink, true)}</div>` +
    `<div style="font-size:12px;line-height:18px;padding-top:6px">${link("https://www.kathavisuals.com.au", "kathavisuals.com.au", red, true)}<span style="color:${rule}">&nbsp;&nbsp;|&nbsp;&nbsp;</span>${link("https://www.instagram.com/_katha_visuals_/", "Instagram", ink, false)}<span style="color:${rule}">&nbsp;&nbsp;|&nbsp;&nbsp;</span>${link("https://www.facebook.com/kathavisuals.au", "Facebook", ink, false)}</div>` +
    `</td></tr></table></td><td style="padding:0"></td></tr>` +
    `<tr>${corner(["bottom", "left"])}${gap}${corner(["bottom", "right"])}</tr></table>`;

  return (
    `<!doctype html><html><body style="margin:0;padding:0;background:#ffffff">` +
    `<div style="max-width:600px;padding:24px 20px;font-family:Arial,Helvetica,sans-serif;color:${ink}">${body}${signature}</div>` +
    `</body></html>`
  );
}

/** Lets the app know whether automatic email is switched on. */
export async function GET() {
  return Response.json({ configured: Boolean(process.env.RESEND_API_KEY?.trim()) });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return fail(503, "not_configured", "Automatic email isn't switched on yet.");

  let member: string | null = null;
  try {
    member = await signedInMember(request);
  } catch {
    return fail(502, "auth_unreachable", "Couldn't check your sign-in just now. Try again.");
  }
  if (!member) return fail(401, "not_signed_in", "Your sign-in has expired. Sign out and back in, then try again.");

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return fail(400, "bad_request", "The email couldn't be read.");
  }

  const number = typeof body.number === "string" ? body.number.trim() : "";
  const to = typeof body.to === "string" ? body.to.trim().toLowerCase() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 200) : "";
  const text = typeof body.text === "string" ? body.text.slice(0, 20_000) : "";
  const pdfBase64 = typeof body.pdfBase64 === "string" ? body.pdfBase64.replace(/\s/g, "") : "";
  const kind = body.kind === "reminder" ? "reminder" : "invoice";

  if (!NUMBER_RE.test(number)) return fail(400, "bad_number", "The invoice number looks wrong.");
  if (!EMAIL_RE.test(to)) return fail(400, "bad_to", "Check the client's email address.");
  if (!subject || text.trim().length < 10) return fail(400, "bad_message", "The message is empty.");
  if (!pdfBase64 || !/^[A-Za-z0-9+/]+=*$/.test(pdfBase64)) return fail(400, "bad_pdf", "The PDF is missing.");
  if ((pdfBase64.length * 3) / 4 > MAX_PDF_BYTES) return fail(413, "pdf_too_big", "The PDF is too large to email.");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        bcc: to === REPLY_TO.toLowerCase() ? undefined : [REPLY_TO],
        reply_to: REPLY_TO,
        subject,
        text,
        html: renderHtml(text),
        attachments: [{ filename: `${number}.pdf`, content: pdfBase64 }],
        tags: [{ name: "kind", value: kind }],
      }),
    });
    const detail = await res.text();
    if (!res.ok) {
      console.error(`Katha Invoices email failed (${res.status}) for ${number} by ${member}: ${detail}`);
      if (res.status === 403 || res.status === 422) {
        return fail(502, "sender_rejected", "The email service refused the Katha sending address. The domain needs checking in Resend.");
      }
      if (res.status === 429) return fail(429, "rate_limited", "Too many emails at once. Wait a minute and try again.");
      return fail(502, "send_failed", "The email didn't go. Try again in a minute.");
    }
    let id = "";
    try {
      id = (JSON.parse(detail) as { id?: string }).id ?? "";
    } catch {}
    return Response.json({ ok: true, id, to, from: FROM });
  } catch (error) {
    console.error("Katha Invoices email threw", error);
    return fail(502, "send_failed", "The email didn't go. Try again in a minute.");
  }
}
