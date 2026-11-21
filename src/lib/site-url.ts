const fallback = "https://zayed-portfolio-app.netlify.app";
function resolveSiteUrl() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || fallback);
    return ["http:", "https:"].includes(url.protocol) ? url.origin : fallback;
  } catch {
    return fallback;
  }
}
export const siteUrl = resolveSiteUrl();
