/**
 * The text wordmark used in the header and footer: KATHA set wide in the
 * display face, with VISUALS small underneath. Real text, so it stays crisp
 * at every size and takes its colour from the surrounding element.
 * The circular badge in `Logo.tsx` stays for print, email and watermarks.
 */
export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span className={`kv-wordmark kv-wordmark--${size}`}>
      <span className="kv-wordmark__main">Katha</span>
      <span className="kv-wordmark__sub">Visuals</span>
    </span>
  );
}
