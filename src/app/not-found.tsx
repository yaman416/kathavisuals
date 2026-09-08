import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-sand">404</p>
        <h1 className="mt-5 font-display text-4xl text-balance sm:text-5xl">
          That page is out of frame.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-bone-dim">
          The link is broken or the page has moved. The work is still where you left it.
        </p>
        <Link
          href="/"
          className="mt-9 inline-block rounded-full bg-sand px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-bone"
        >
          Back home
        </Link>
      </Container>
    </section>
  );
}
