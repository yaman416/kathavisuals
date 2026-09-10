/**
 * Whether the content admin should be reachable.
 *
 * Local storage works on a developer's machine but not on Vercel, where the
 * filesystem is read only, so the admin is only served when it can genuinely
 * function: in development, or once the GitHub App is configured and saving
 * commits to the repository.
 *
 * Authentication comes from GitHub itself. In GitHub mode Keystatic requires a
 * signed-in GitHub account with write access to the repository before it will
 * load or save anything.
 */
export const adminIsAvailable =
  process.env.NODE_ENV === "development" ||
  Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG);
