import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Renders supplied photography, or a design-system-styled placeholder frame
 * naming the file it expects. The design project's own imagery was generated
 * staging content, so every slot ships as a placeholder until real photos land.
 */
export function Media({
  src,
  alt,
  label,
  style,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  label: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`kv-card-media ${className}`}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      ) : (
        // The file path is a note to whoever adds the photo, so it is shown
        // while developing and hidden on the live site.
        <div className="kv-placeholder" role="img" aria-label={`${alt} — image pending`}>
          {process.env.NODE_ENV === "production" ? null : <span>{label}</span>}
        </div>
      )}
    </div>
  );
}
