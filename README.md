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

## Imagery

**Every photo on the site is an AI-generated placeholder**, generated with Higgsfield
(Nano Banana Pro) and stored in `public/design/`. They exist so the layout reads
correctly until real work replaces them. `logo-white.png` is the one real supplied
asset.

The portfolio grid keeps a visible line — *"Sample projects shown while we build out
our portfolio with real client work"* — controlled by `showSampleNote` in
`src/lib/site.ts`. Leave it on until the grid holds real client work.

| Slot | File | Crop |
| --- | --- | --- |
| Hero background | `hero-camera.jpg` | 21:9, dark left third for the headline |
| About (used twice) | `about-landscape.jpg` | 4:3 |
| Service cards + detail rows | `service-{weddings,events,real-estate,social}.jpg` | 4:5 |
| Portfolio grid | `portfolio-{weddings,events,real-estate,social}.jpg` | 4:3 |

To swap in a real photo: drop the file in `public/design/` and point the matching
`image:` field in `src/lib/site.ts` at it. The hero and about images are set on the
`<Media>` calls in `src/app/page.tsx`.

Source files were resized and converted to JPEG (quality 76) — hero 2400px wide,
portfolio 1400px, service cards 1000px tall. Next.js re-encodes to WebP per viewport.

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
- [ ] Replace the 10 AI-generated placeholder images with real work
- [ ] Point the footer's Instagram / Facebook / YouTube links at real profiles
- [ ] Write the privacy policy the contact form's checkbox refers to
- [ ] Add a favicon and an OG share image
- [ ] Set the Resend environment variables so the form sends
