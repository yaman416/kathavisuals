import Image from "next/image";

/**
 * Renders a real photo when `src` is set, and a labelled placeholder when it is
 * not. Drop files into /public/work and set `image` in src/lib/site.ts to swap.
 */
export function MediaFrame({
  src,
  alt,
  label,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  src: string | null;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-ink-soft ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${alt} — image placeholder`}
      className={`relative overflow-hidden bg-ink-soft ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,rgba(200,164,106,0.18),transparent_60%),radial-gradient(90%_70%_at_90%_90%,rgba(245,243,239,0.08),transparent_55%)]" />
      <div className="absolute inset-0 flex items-end p-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
          {label ?? "Image coming soon"}
        </span>
      </div>
    </div>
  );
}
