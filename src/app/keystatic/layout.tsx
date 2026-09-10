import { notFound } from "next/navigation";
import { adminIsAvailable } from "@/lib/keystatic-enabled";

/**
 * The admin renders on its own, without the site header, footer or fonts.
 * Keystatic ships its own chrome.
 *
 * It is also hidden entirely unless it can actually work. Without the GitHub
 * App the admin falls back to local storage, which cannot read or write on
 * Vercel because the filesystem is read only. That left a public page showing
 * empty forms and a save button that could never succeed: no data exposed, but
 * an admin surface open to anyone and misleading to anyone who found it.
 */
export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  if (!adminIsAvailable) notFound();
  return children;
}
