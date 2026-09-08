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
| `src/components/PortfolioSection.tsx` | Portfolio grid with service filters (hidden — see `showPortfolio`) |
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

## Logo

`src/components/Logo.tsx` holds the mark and lockup as stroked SVG geometry —
no image files, crisp at every size, and it takes its colour from the theme.

The mark is a six-blade aperture: six chords of a circle, each spanning 120°, at
60° intervals, drawn to two thirds of their length. Six lines tangent to a
circle of radius R/2 necessarily meet as a regular hexagon, so the opening is
exact rather than eyeballed. Drawing them full length produces a hexagram
instead — that is the one thing to be careful of if you edit the geometry. Four
gold L-brackets frame it. One blade carries the accent colour.

| Variant | Where | Notes |
| --- | --- | --- |
| `LogoLockup` | Header, footer | Mark plus the wordmark set in the display face as real text — selectable, and never needs re-exporting when the font changes |
| `LogoMark` | Mobile menu | `frame={false}` below ~24px |
| `src/app/icon.svg` | Favicon | No brackets, heavier stroke, on a rounded dark tile |
| `public/design/logo-mark.svg` | Print, watermarks | Standalone, fixed colours |

`public/design/logo-white.png` is the original supplied badge. It is no longer
used on the site — its detail disappeared at header size — but it is kept for
print and photo watermarks, where it works well.

## Fonts

| Role | Face | How it is served |
| --- | --- | --- |
| Headings (`--font-display`) | **Times** | System font. `"Times New Roman", Times, Tinos, Georgia, serif` |
| Body, UI, nav (`--font-body`) | **Inter** | Google Fonts via `next/font/google`, self-hosted at build |

Times New Roman is a Monotype licence we do not hold, so it is never served —
only referenced, which needs no licence because the visitor already has it.
macOS, iOS and Windows all ship it.

Android and Linux do not. **Tinos** (Apache 2.0, metrically identical to Times
New Roman) sits last in the stack for them. It is declared with `preload: false`
so browsers fetch it only when everything ahead of it is missing — most visitors
never download it.

Both faces are referenced only through `--font-display` and `--font-body` in
`globals.css`, so changing either is a one-line edit.

## Interaction and motion

- **Hero video** — `public/design/hero.mp4` plays behind the headline. The still
  image renders underneath it always, so the hero is complete before any script
  runs. `HeroVideo` skips the download entirely on reduced-motion, Data Saver,
  and connections the browser reports as 2g/3g, and removes itself if the file
  fails.
- **Scroll motion** — CSS `animation-timeline: view()` only. Service rows and the
  About block rise into place; the hero drifts slightly slower than the page.
  There is no observer to fail and no state where content sits invisible waiting
  for JavaScript. Unsupported browsers render the page static. All of it is
  inside `prefers-reduced-motion: no-preference`.
- **Scroll spy** — the header marks the section you are in.
- **Mobile menu** — locks page scroll while open, closes on Escape, and carries
  the phone number.

Touch targets are 44px throughout (`--touch-target`), and `--text-xs` has a 12px
floor below 900px — 11px uppercase is fine on a monitor and marginal on a phone.

## Page length

The design stitched a five-page UI kit into one scroll, which duplicated each
page's intro block. The duplicate About section and the portfolio grid (which
just repeated the four service names) were removed, along with the gold badge
that restated each service heading and the four per-row "Enquire Now" buttons —
the sticky header carries a permanent CTA.

Desktop went from 7,747px to 5,628px, mobile from 12,099px to 9,293px.

`showPortfolio` in `src/lib/site.ts` brings the portfolio section and its nav
link back in one flip, once there is real client work to put in it.

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
