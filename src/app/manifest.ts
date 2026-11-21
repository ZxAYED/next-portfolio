export const dynamic = "force-static";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zayed Iqbal — Full Stack Developer",
    short_name: "Zayed Iqbal",
    description:
      "Personal portfolio of Zayed Iqbal, full-stack developer specializing in Next.js, TypeScript, and NestJS.",
    start_url: "/",
    display: "standalone",
    background_color: "#101014",
    theme_color: "#c3a3ef",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/brand/zayed-mark-dark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
