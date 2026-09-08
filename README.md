# Katha Visuals

Website for [kathavisuals.com.au](https://kathavisuals.com.au) — a Canberra photography
and film studio. Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, deployed on
Vercel.

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

## Where to edit things

| What | File |
| --- | --- |
| Business name, email, phone, socials | `src/lib/site.ts` (`site`) |
| Nav links | `src/lib/site.ts` (`nav`) |
| Services + pricing + inclusions | `src/lib/site.ts` (`services`) |
| Portfolio items | `src/lib/site.ts` (`projects`) |
| Testimonials | `src/lib/site.ts` (`testimonials`) |
| Colours, fonts | `src/app/globals.css` (`@theme`) |
| Page copy | `src/app/*/page.tsx` |

### Adding real photos

Every image currently renders a labelled placeholder. To use a real photo:

1. Put the file in `public/work/` (e.g. `public/work/riverside-vows.jpg`).
2. Set `image: "/work/riverside-vows.jpg"` on that entry in `src/lib/site.ts`.

The hero and the about portrait are set the same way — see the `label` text on each
placeholder for the path it expects.

## Contact form

The form posts to a server action in `src/app/contact/actions.ts`. Without email
credentials it validates input and tells the visitor to email directly. To actually
send mail, set these environment variables (Vercel → Settings → Environment Variables):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `ENQUIRY_FROM_EMAIL` | Verified sender, e.g. `website@kathavisuals.com.au` |
| `ENQUIRY_TO_EMAIL` | Inbox that receives enquiries (defaults to `site.email`) |

See `.env.example`.

## Deployment

Pushes to `main` deploy to production via the Vercel GitHub integration. Pull requests
get their own preview URL.

## Before launch

- [ ] Replace the placeholder phone number in `src/lib/site.ts`
- [ ] Swap placeholder images for real photos
- [ ] Confirm pricing in `services`
- [ ] Add a real `public/favicon.ico` and an OG image
- [ ] Set the email environment variables so the form sends
