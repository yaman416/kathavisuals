import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * A framed image. Renders a labelled placeholder when no file is supplied, so a
 * missing photograph is obvious in development rather than silently blank.
 */
export function Media({
  src,
  alt,
  ratio = "4 / 3",
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority = false,
  className = "",
  style,
  placeholder = "Photograph required",
}: {
  src: string | null;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
}) {
  return (
    <div className={`kv-media ${className}`} style={{ aspectRatio: ratio, ...style }}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={90}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="kv-placeholder" role="img" aria-label={`${alt}. Image not yet supplied.`}>
          {placeholder}
        </div>
      )}
    </div>
  );
}
