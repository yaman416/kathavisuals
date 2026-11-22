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
            src="/work/nirvan-family.jpg"
            alt="Parents in sage green seated on stage with their son at his Pasni"
            sizes="(min-width: 900px) 44vw, 100vw"
            position="50% 55%"
            priority
          />
        </div>
        <div>
          <Photo
            src="/work/birthday-boy.jpg"
            alt="A baby boy in a red topi and vest at his first birthday"
            sizes="(min-width: 900px) 28vw, 50vw"
            priority
          />
        </div>
        <div>
          <Photo
            src="/work/maternity-couple.jpg"
            alt="An expecting couple forehead to forehead on a Canberra lawn"
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
        <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", color: "var(--color-ink)" }}>
          Anyone can take photos. We make memories with you, like family, on the days that matter
          most.
        </p>
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
              src="/work/nirvan-kiss.jpg"
              alt="Parents kissing their son in his topi at his Pasni"
              sizes="(min-width: 560px) 50vw, 100vw"
            />
          </div>
          <figcaption>Pasni</figcaption>
        </figure>
        <figure className="kv-figure">
          <div className="kv-media" style={{ aspectRatio: "4 / 3" }}>
            <Photo
              src="/work/maternity-family.jpg"
              alt="Parents kissing their toddler on both cheeks at a maternity session"
              sizes="(min-width: 560px) 50vw, 100vw"
              position="50% 35%"
            />
          </div>
          <figcaption>Maternity</figcaption>
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
