import { config, fields, singleton } from "@keystatic/core";

/**
 * Content editing for Katha Visuals.
 *
 * The admin lives at /keystatic. Saving writes a JSON file under `content/`,
 * commits it, and Vercel rebuilds, so a change is live in about a minute.
 *
 * Everything is a singleton holding an array rather than a collection of one
 * file per entry. That is deliberate: a singleton is a single JSON file, which
 * `src/lib/site.ts` can import directly. A collection would need Keystatic's
 * async reader, which cannot be used from the client components that render the
 * header, hero and enquiry form. This way the content is plain data and every
 * existing import keeps working.
 *
 * Structure, layout and colour stay in code. This is for words and pictures.
 */

const richText = (label: string, description: string) =>
  fields.text({ label, description, multiline: true });

export default config({
  /*
   * GitHub mode once the GitHub App exists, local mode until then.
   *
   * The switch reads a NEXT_PUBLIC_ variable on purpose: this config is
   * imported by both the admin page (client) and the API route (server), and
   * only NEXT_PUBLIC_ values reach the browser. Gating on a server-only secret
   * would leave the two halves disagreeing about which mode they are in.
   *
   * Local mode writes to the filesystem, so it works in development but not on
   * Vercel, where the filesystem is read only. Setting the four env vars
   * switches production to GitHub, where saving commits to the repo.
   *
   * NEXT_PUBLIC_KEYSTATIC_STORAGE=github forces GitHub mode before those vars
   * exist. That is how the App gets created in the first place: without it the
   * config would stay in local mode and Keystatic would never offer its setup
   * wizard, so the App could never be made.
   */
  storage:
    process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG ||
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
      ? { kind: "github", repo: { owner: "yaman416", name: "kathavisuals" } }
      : { kind: "local" },

  ui: {
    brand: { name: "Katha Visuals" },
    navigation: {
      // "Our Work" is not its own entry: that page is built from each
      // service's photographs, so they are edited inside the service they
      // belong to rather than kept in a second list that could drift.
      "Services and Our Work": ["services"],
      "About the studio": ["people", "principles"],
      Site: ["settings", "enquiry"],
    },
  },

  singletons: {
    /* ------------------------------------------------------------------ */
    settings: singleton({
      label: "Site details",
      path: "content/settings",
      format: { data: "json" },
      schema: {
        tagline: fields.text({ label: "Tagline" }),
        location: fields.text({ label: "Location", description: "e.g. Canberra, ACT" }),
        email: fields.text({ label: "Enquiry email address" }),
        phone: fields.text({ label: "Phone, as displayed", description: "e.g. 0426 369 124" }),
        phoneHref: fields.text({
          label: "Phone, for the dial link",
          description: "International format, no spaces. e.g. +61426369124",
        }),
        instagram: fields.url({ label: "Instagram URL" }),
        facebook: fields.url({ label: "Facebook URL" }),
        youtube: fields.url({ label: "YouTube URL", description: "Leave empty to hide it" }),
        description: richText(
          "Search description",
          "One or two sentences. Shown in Google results and when the site is shared.",
        ),
        imageryIsPlaceholder: fields.checkbox({
          label: "Imagery is still placeholder",
          description:
            "While ticked, a note appears above the work saying the photographs are placeholders. Untick once real client work is published.",
        }),
      },
    }),

    /* ------------------------------------------------------------------ */
    services: singleton({
      label: "Services and Our Work",
      path: "content/services",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            slug: fields.text({
              label: "Slug",
              description: "Used in the web address. Lowercase, hyphens, no spaces.",
            }),
            name: fields.text({ label: "Name" }),
            summary: richText("Summary", "One sentence, shown on the home page card."),
            intro: richText("Introduction", "Opening paragraph on the services page."),
            includes: fields.array(fields.text({ label: "Item" }), {
              label: "What is included",
              itemLabel: (item) => item.value,
            }),
            audience: richText("Who it is for", "One sentence."),
            process: fields.array(fields.text({ label: "Step" }), {
              label: "How it works",
              itemLabel: (item) => item.value,
            }),
            faqs: fields.array(
              fields.object({
                question: fields.text({ label: "Question" }),
                answer: richText("Answer", ""),
              }),
              { label: "Questions", itemLabel: (item) => item.fields.question.value },
            ),
            image: fields.image({
              label: "Card image",
              directory: "public/design",
              publicPath: "/design/",
            }),
            gallery: fields.array(
              fields.object({
                src: fields.image({
                  label: "Photograph",
                  directory: "public/design",
                  publicPath: "/design/",
                }),
                alt: fields.text({
                  label: "Description",
                  description:
                    "Describe the photograph for someone who cannot see it. Read aloud by screen readers.",
                }),
              }),
              {
                label: "Our Work photographs",
                description:
                  "These appear on the Our Work page, in this service's section, and the first two also show under this service on the Services page.",
                itemLabel: (item) => item.fields.alt.value || "Photograph",
              },
            ),
          }),
          { label: "Services", itemLabel: (item) => item.fields.name.value },
        ),
      },
    }),

    /* ------------------------------------------------------------------ */
    people: singleton({
      label: "Team",
      path: "content/people",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            role: fields.text({ label: "Role" }),
            bio: richText("Biography", "A short paragraph."),
            portrait: fields.image({
              label: "Portrait",
              description: "A real photograph only. Leave empty rather than using a stock image.",
              directory: "public/design",
              publicPath: "/design/",
            }),
          }),
          { label: "People", itemLabel: (item) => item.fields.name.value },
        ),
      },
    }),

    /* ------------------------------------------------------------------ */
    principles: singleton({
      label: "Why work with us",
      path: "content/principles",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            body: richText("Body", "One or two sentences."),
          }),
          { label: "Points", itemLabel: (item) => item.fields.title.value },
        ),
      },
    }),

    /* ------------------------------------------------------------------ */
    enquiry: singleton({
      label: "Enquiry form options",
      path: "content/enquiry",
      format: { data: "json" },
      schema: {
        coverageOptions: fields.array(fields.text({ label: "Option" }), {
          label: "Coverage choices",
          itemLabel: (item) => item.value,
        }),
        budgetOptions: fields.array(fields.text({ label: "Option" }), {
          label: "Budget ranges",
          itemLabel: (item) => item.value,
        }),
      },
    }),
  },
});
