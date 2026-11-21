import Image from "next/image";
import Link from "next/link";
import { CallToAction } from "@/components/ui/CallToAction";
import { site } from "@/lib/site";

/*
 * Light gallery homepage. The photographs lead and the words stay out of their
 * way: a three-photo opening, one centred line, then pairs of pictures with
 * small captions. Every photo here is real Katha Visuals work.
 */

const occasions = [
  { name: "Weddings", body: "Nepali, Hindu and modern weddings, from Haldi and Mehndi to the reception." },
  { name: "Pasni", body: "Weaning ceremonies and first rice feeding, with family on every side of the frame." },
  { name: "Birthdays", body: "First birthdays, milestone birthdays and the whole family around the cake." },
  { name: "Puja and community", body: "Puja, cultural programmes and community gatherings across Canberra." },
  { name: "Pre-wedding", body: "Proposals, engagements and pre-wedding shoots, planned around the light." },
  { name: "Maternity", body: "Soft, natural sessions outdoors or at home, for the two of you." },
];

function Photo({
  src,
  alt,
  sizes,
  position,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  position?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={90}
      priority={priority}
      style={{ objectFit: "cover", objectPosition: position }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      {/* Opening: three photographs ------------------------------------- */}
      <section aria-label="Recent work" className="kv-triptych">
        <div>
          <Photo
            src="/work/pasni.jpg"
            alt="A family seated on stage at their son's Pasni"
            sizes="(min-width: 900px) 44vw, 100vw"
            position="50% 45%"
            priority
          />
        </div>
        <div>
          <Photo
            src="/work/nepali-wedding.jpg"
            alt="A Nepali bride and groom smiling at each other in front of a thangka"
            sizes="(min-width: 900px) 28vw, 50vw"
            priority
          />
        </div>
        <div>
          <Photo
            src="/work/maternity.jpg"
            alt="A couple at a maternity session among roses"
            sizes="(min-width: 900px) 28vw, 50vw"
            priority
          />
        </div>
      </section>

      {/* One line ------------------------------------------------------- */}
      <section className="kv-statement">
        <p className="kv-eyebrow" style={{ margin: 0 }}>
          Photography and film | {site.location}
        </p>
        <h1>Where moments become stories</h1>
        <p>
          We photograph and film weddings, Pasni, family celebrations and the quiet moments in
          between, for families in Canberra and across Australia.
        </p>
        <Link href="/contact" className="kv-link">
          Check your date
        </Link>
      </section>

      {/* A pair of photographs ----------------------------------------- */}
      <section aria-label="More of our work" className="kv-pair kv-pair--offset">
        <figure className="kv-figure">
          <div className="kv-media" style={{ aspectRatio: "4 / 3" }}>
            <Photo
              src="/work/proposal.jpg"
              alt="A couple looking at each other moments after a proposal"
              sizes="(min-width: 560px) 50vw, 100vw"
            />
          </div>
          <figcaption>The proposal</figcaption>
        </figure>
        <figure className="kv-figure">
          <div className="kv-media" style={{ aspectRatio: "4 / 3" }}>
            <Photo
              src="/work/family.jpg"
              alt="Parents holding their baby in a red topi at his Pasni"
              sizes="(min-width: 560px) 50vw, 100vw"
              position="50% 25%"
            />
          </div>
          <figcaption>First rice feeding</figcaption>
        </figure>
      </section>

      {/* What we photograph -------------------------------------------- */}
      <section className="kv-section" style={{ paddingInline: "var(--gutter)" }}>
        <div className="kv-statement" style={{ paddingTop: 0, paddingBottom: "var(--space-12)" }}>
          <p className="kv-eyebrow" style={{ margin: 0 }}>
            What we photograph
          </p>
          <h2>Every kind of family story</h2>
        </div>
        <ul className="kv-occasions">
          {occasions.map((item) => (
            <li key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
        <p style={{ textAlign: "center", margin: "var(--space-12) auto 0" }}>
          <Link href="/services" className="kv-link">
            Services and what is included
          </Link>
        </p>
      </section>

      {/* About, in a few lines ------------------------------------------ */}
      <section className="kv-statement" style={{ background: "var(--color-surface-alt)" }}>
        <p className="kv-eyebrow" style={{ margin: 0 }}>
          About us
        </p>
        <h2>Prakash and Yaman</h2>
        <p>
          Two Canberra photographers and filmmakers with a shared Nepalese background. We know
          the rituals, the family moments and the timing, so we can stay quiet and catch them as
          they happen. Both of us shoot photo and video.
        </p>
        <Link href="/about" className="kv-link">
          Our story
        </Link>
      </section>

      <CallToAction />
    </>
  );
}
