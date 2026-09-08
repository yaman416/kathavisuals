import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MediaFrame } from "@/components/MediaFrame";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected weddings, portraits, events and brand work from Katha Visuals in Canberra and across Australia.",
  alternates: { canonical: "/work" },
};

const categories = Array.from(new Set(projects.map((project) => project.category)));

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-ink-line py-20 sm:py-28">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.28em] text-sand">Portfolio</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-balance sm:text-5xl">
            The work, in the order it happened.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone-dim">
            A public sample. Full galleries and films are shared privately — ask and we
            will send the ones closest to your day.
          </p>
          <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.2em] text-bone-dim">
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group border border-ink-line transition-colors hover:border-sand-dim"
              >
                <MediaFrame
                  src={project.image}
                  alt={project.title}
                  label={`/public/work/${project.slug}.jpg`}
                  className="aspect-4/5"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-sand">
                      {project.category}
                    </p>
                    <p className="font-mono text-xs text-bone-dim">{project.year}</p>
                  </div>
                  <h2 className="mt-2 font-display text-xl">{project.title}</h2>
                  <p className="mt-1 text-xs text-bone-dim">{project.location}</p>
                  <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                    {project.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 border border-ink-line p-8 text-center">
            <h2 className="font-display text-2xl">Want to see a full gallery?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-bone-dim">
              Tell us what you are planning and we will send two or three complete
              galleries that match it.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-full bg-sand px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-bone"
            >
              Ask for galleries
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
