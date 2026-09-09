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

## Typography

Running text is capped at `62ch`. It was setting at about 123 characters a line,
which is roughly twice a comfortable measure — past 80 the eye loses its place
returning to the left margin, and it is one of the clearest tells of a page that
was never typeset.

Headings carry `text-wrap: balance` and slight negative tracking; Times sets
loose at display sizes.

## Palette

The site runs the **Warm Ivory** light palette: cream ground `#f5f2ec`, white
surfaces, ink text `#17150f`, gold accent `#7d6838`.

The design system was authored dark and the tokens were re-derived for a light
ground. Two things are worth knowing before changing them:

- **The accent had to darken.** The original `#a99066` sits at 2.6:1 on white,
  which fails WCAG AA and looks washed out. `#7d6838` reaches 4.8:1.
- **The hero stays dark**, because it is a photograph with type over it. It
  carries `.kv-on-dark`, which flips the semantic tokens back to their dark
  values for that subtree only. Put that class on any section laid over dark
  imagery; never hardcode a light colour to work around it.

`public/design/logo-ink.png` is the supplied logo recoloured to the ink value
with its alpha preserved — the white original is unreadable on cream.
`logo-original.png` and `logo-white.png` are kept for dark surfaces and
watermarks.

## Imagery

**Every photo on the site is an AI-generated placeholder**, generated with Higgsfield
(Nano Banana Pro) and stored in `public/design/`.

They are all shot bright: open daylight, blue sky, candid smiles. An earlier set
was prompted for tungsten light and deep shadow, and the page read dark no
matter how light the palette behind it was — the imagery sets the mood, not the
background colour. Keep that in mind when swapping in real work. They exist so the layout reads
correctly until real work replaces them. `logo-white.png` is the one real supplied
asset.

The portfolio grid keeps a visible line — *"Sample projects shown while we build out
our portfolio with real client work"* — controlled by `showSampleNote` in
`src/lib/site.ts`. Leave it on until the grid holds real client work.

| Slot | File | Crop |
| --- | --- | --- |
| Hero background | `hero-woodland`, `hero-blossom`, `hero-hills` | 21:9, cross-faded on scroll. Lead with the frame that has the most content — a near-empty sky reads as a broken page, not a bright one |
| About (used twice) | `about-landscape.jpg` | 4:3 |
| Service cards + detail rows | `service-{weddings,events,real-estate,social}.jpg` | 4:5 |
| Portfolio grid | `portfolio-{weddings,events,real-estate,social}.jpg` | 4:3 |

To swap in a real photo: drop the file in `public/design/` and point the matching
`image:` field in `src/lib/site.ts` at it. The hero and about images are set on the
`<Media>` calls in `src/app/page.tsx`.

Sources are generated at 4K and exported with ffmpeg at high quality — hero
3200px wide, portfolio and about 2200px, service cards 1600px.

**The quality that actually reaches visitors is set in `next.config.ts`.** Next 16
defaults `images.qualities` to `[75]` and silently coerces any other `quality`
prop down to it, so raising source resolution alone changes nothing. The
allowlist is `[75, 90]` and `Media` requests 90; below that, compression shows in
skies and skin tones.

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

- **Browsers without `animation-timeline`** (Firefox, and Safari before 26)
  render the hero motionless, so `ScrollMotion` drives the same cross-fade and
  drift from script for those only. It no-ops entirely where CSS timelines work. It writes
  nothing but transform and opacity, reads no layout inside the scroll handler,
  and reveals elements with an IntersectionObserver rather than measuring
  positions each frame. `document.documentElement.dataset.motionFallback` is set
  when it is active.
- **Only the hero animates.** Nothing else on the page moves on scroll — no
  reveals, wipes or staggers.
- **The hero cross-fades through four Canberra scenes as you scroll**, each
  drifting at its own rate so the change reads as depth rather than a slideshow.
  `HeroLayers` stacks them; `globals.css` owns the ranges. Fully reversible —
  scroll back up and it runs backwards to exactly where it started.

  **Use `scroll(root)`, never bare `scroll()`.** Bare `scroll()` means
  `scroll(nearest)`, and the nearest *scroll container* is any ancestor with
  clipped overflow — the hero has `overflow: hidden`, so the timeline bound to
  the hero itself, which never scrolls. The animations ran, on a timeline whose
  progress was permanently zero, and nothing moved. Check with
  `document.getAnimations()[0].timeline.source`: it must be `<html>`.

  The ranges must finish before the page covers the hero, or the later
  cross-fades happen out of sight. At a 900px viewport the hero is covered at
  829px of scroll and the last fade completes at 792px. If you change the hero
  height, re-check those numbers.
- **Nothing animates on its own.** Every animation on the page is bound to a
  `ScrollTimeline`, never a `DocumentTimeline` — the scrollbar is the clock. Stop
  scrolling and everything stops. There is no video, no autoplay, no loop, and
  no JavaScript on the scroll path. To check this at any time, run
  `document.getAnimations()` in the console: every entry's `timeline` should be
  a `ScrollTimeline`.
- **Pinned hero** — the hero is `position: sticky` and the rest of the page
  (`.kv-over-hero`) scrolls up over it on an opaque ground. As it is covered the
  image pushes in and drifts (`kv-hero-settle`) and the headline lifts away
  (`kv-hero-lift`), both on a `scroll()` timeline.
- **Reveals** — blocks rise in, headings wipe up from their own baseline, images
  uncover from the left, and the four service cards stagger 90ms apart via
  `--kv-delay`. All on `view()` timelines.

  Because these run on the compositor rather than the main thread, they cannot
  stutter. An earlier version scrubbed a 41-frame sequence from a scroll
  listener and was removed: 41 frames across 640px is one frame per 16px, so it
  stepped rather than moved, and a JS scroll handler jitters by nature.

  Unsupported browsers render the page static, and every rule sits inside
  `prefers-reduced-motion: no-preference`.
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
