import assets from "portfolio:assets";
import { forwardContact } from "./contact";

import { getProjectRedirect } from "../src/lib/portfolio";

const portfolioWorker = {
  async fetch(request) {
    const path = new URL(request.url).pathname;
    if (path.replace(/\/$/, "") === "/api/send-mail")
      return forwardContact(request);
    if (!["GET", "HEAD"].includes(request.method))
      return new Response(null, { status: 405 });
    let key = path;
    try {
      key = decodeURIComponent(path);
    } catch {
      return new Response(null, { status: 400 });
    }
    if (key === "/images/portfolio.png")
      return Response.redirect(
        new URL("/images/portfolio.webp", request.url),
        308,
      );
    const project = /^\/projects\/([^/]+)\/?$/.exec(key);
    const redirect = project && getProjectRedirect(project[1]);
    if (redirect)
      return Response.redirect(
        new URL(`/projects/${redirect}/`, request.url),
        308,
      );
    const page = key.replace(/\/$/, "") + "/index.html";
    const asset = assets[key] ?? assets[page];
    const [type, data] =
      asset ?? assets["/404.html"] ?? assets["/404/index.html"];
    const headers = {
      "Content-Type": type,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": key.startsWith("/_next/static/")
        ? "public, max-age=31536000, immutable"
        : "no-cache",
    };
    return new Response(
      request.method === "HEAD"
        ? null
        : Uint8Array.from(atob(data), (character) => character.charCodeAt(0)),
      { headers, status: asset ? 200 : 404 },
    );
  },
};
export default portfolioWorker;
