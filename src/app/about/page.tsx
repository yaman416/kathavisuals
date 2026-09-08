import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { MediaFrame } from "@/components/MediaFrame";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Katha Visuals is a Canberra photography and film studio. Here is how we work and what we care about.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Quiet on the day",
    body: "We direct as little as possible. The best frames come from people who have forgotten there is a camera in the room.",
  },
  {
    title: "Honest colour",
    body: "Skin tones stay true. No heavy filters that will look dated in five years — these are documents, not trends.",
  },
  {
    title: "Delivered when promised",
    body: "Dates in the contract, not in the vicinity of the contract. Previews in 72 hours, every time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-ink-line py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-sand">About</p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl">
              “Katha” means story. That is the whole brief.
            </h1>
            <p className="mt-6 leading-relaxed text-bone-dim">
              We started {site.name} in Canberra because the photography we kept seeing
              was technically fine and emotionally empty. Beautiful light, nobody home.
            </p>
            <p className="mt-4 leading-relaxed text-bone-dim">
              So we work the other way around. We learn the day before we shoot it, we
              stay out of it while it happens, and we edit for the moments people will
              actually want to look at in twenty years — the grandmother laughing, the
              hand on a shoulder, the room right before it fills.
            </p>
            <p className="mt-4 leading-relaxed text-bone-dim">
              Multicultural weddings are a large part of what we do, and we take the
              rituals as seriously as the reception. If your family has a tradition that
              matters, tell us, and we will plan the coverage around it.
            </p>
          </div>

          <MediaFrame
            src={null}
            alt="The Katha Visuals team"
            label="/public/about/team.jpg"
            className="aspect-4/5 w-full border border-ink-line"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="How we work" title="Three things we will not trade away" />
          <div className="mt-12 grid gap-px overflow-hidden border border-ink-line bg-ink-line lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="bg-ink p-8">
                <h3 className="font-display text-xl">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-line bg-ink-soft py-16 sm:py-24">
        <Container className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl text-balance">Come and say hello.</h2>
            <p className="mt-3 max-w-lg text-bone-dim">
              Coffee in Canberra, or a call if you are further out. No pressure and no
              sales script.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-sand px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-bone"
          >
            Get in touch
          </Link>
        </Container>
      </section>
    </>
  );
}
