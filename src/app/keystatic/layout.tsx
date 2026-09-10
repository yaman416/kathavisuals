/**
 * The admin renders on its own, without the site header, footer or fonts.
 * Keystatic ships its own styling and chrome.
 */
export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
