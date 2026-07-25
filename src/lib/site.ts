function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  // Vercel production domain (stable)
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) {
    return `https://${production.replace(/^https?:\/\//, "")}`;
  }

  // Preview / branch deployments
  const preview = process.env.VERCEL_URL?.trim();
  if (preview) {
    return `https://${preview.replace(/^https?:\/\//, "")}`;
  }

  // Live storefront — keeps Open Graph / sitemap off localhost in builds
  return "https://hm-worldwide.vercel.app";
}

export const siteUrl = resolveSiteUrl();

export const siteName = "Honest Mistake";

export const siteDescription =
  "Honest Mistake — Manila race-street jerseys, mesh shorts, and limited drops. Wear the mistake.";
