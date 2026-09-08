import { ButtonLink, Eyebrow, SectionHeading } from "@/components/ds/primitives";

export default function NotFound() {
  return (
    <section
      style={{
        padding: "var(--section-space) var(--page-gutter)",
        maxWidth: "var(--content-width-narrow)",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Eyebrow>404</Eyebrow>
      <SectionHeading as="h1" style={{ margin: "16px 0" }}>
        That page is out of frame.
      </SectionHeading>
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-secondary)",
          lineHeight: "var(--leading-body)",
          margin: "0 0 32px",
        }}
      >
        The link is broken or the page has moved.
      </p>
      <ButtonLink href="/" variant="primary">
        Back Home
      </ButtonLink>
    </section>
  );
}
