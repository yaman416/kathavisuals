# Katha Visuals

Website for [kathavisuals.com.au](https://www.kathavisuals.com.au) — a Canberra
photography and video studio. Next.js 16 (App Router) + TypeScript, deployed on Vercel.

The site is a single page with anchor navigation, implemented from the Claude Design
project **"Katha Visuals Website"** and its design system
(`katha-visuals-design-system-6c1d6873`).

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Structure

| Path | What it holds |
| --- | --- |
| `src/app/page.tsx` | The whole page: hero, service cards, about preview, process, services, portfolio, about, contact |
| `src/lib/site.ts` | All copy and data — contact details, services, FAQs, portfolio items |
| `src/app/globals.css` | Design tokens ported verbatim from the design system, plus hover/focus/responsive rules |
| `src/components/ds/` | Design system components: primitives, fields, cards, Accordion, Icons, Media |
| `src/components/Site*.tsx` | Header (with mobile menu) and footer |
| `src/components/PortfolioSection.tsx` | Portfolio grid with service filters |
| `src/components/ContactSection.tsx` | Enquiry form |
| `src/app/actions.ts` | Server action that validates and sends enquiries |

Design tokens live only in `globals.css`. Components reference them as CSS variables
(`var(--color-accent)`), never as hard-coded values.

## Adding real photography

Every image slot renders a placeholder frame. In development the frame shows the file
path it expects; in production it renders as a plain dark panel.

1. Put the file in `public/design/` (e.g. `public/design/service-weddings.png`).
2. Set `image: "/design/service-weddings.png"` on that entry in `src/lib/site.ts`.

For the hero and the about photo, set the `src` prop on the `<Media>` call in
`src/app/page.tsx`.

The design project's own imagery was AI-generated staging content and was not imported.
`public/design/logo-white.png` is the real supplied logo and is in use.

## Contact form

`src/app/actions.ts` validates the enquiry, then sends it through Resend. Without
credentials it tells the visitor to email or call instead. Set these in Vercel →
Settings → Environment Variables:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `ENQUIRY_FROM_EMAIL` | Verified sender, e.g. `website@kathavisuals.com.au` |
| `ENQUIRY_TO_EMAIL` | Inbox that receives enquiries (defaults to `site.email`) |

See `.env.example`.

## Deployment

Pushes to `main` deploy to production via the Vercel GitHub integration. Pull requests
get their own preview URL.

DNS is at VentraIP: apex `A` → Vercel, `www` → `CNAME` → Vercel. `www` is the primary
domain; the apex 308-redirects to it.

## Before promoting the site

- [ ] Replace the four `[PLACEHOLDER]` FAQ answers in `src/lib/site.ts`
- [ ] Add real photography (7 slots)
- [ ] Point the footer's Instagram / Facebook / YouTube links at real profiles
- [ ] Write the privacy policy the contact form's checkbox refers to
- [ ] Add a favicon and an OG share image
- [ ] Set the Resend environment variables so the form sends
