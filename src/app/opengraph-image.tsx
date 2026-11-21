export const dynamic = "force-static";
import { ImageResponse } from "next/og";
export const alt =
  "Zayed Iqbal — Full stack developer. Next.js, TypeScript, and NestJS.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#101014",
        color: "#f0edf4",
        display: "flex",
        flexDirection: "column",
        padding: "70px",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#c3a3ef" }}>
        Zayed Iqbal.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 85,
          letterSpacing: "-5px",
          lineHeight: 1.05,
        }}
      >
        <span>Full stack developer.</span>
        <span style={{ color: "#c3a3ef", fontSize: 64, letterSpacing: "-3px" }}>
          Next.js. TypeScript. NestJS.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#aaa4b2",
          fontSize: 20,
        }}
      >
        <span>Open to full-stack developer opportunities</span>
        <span>Dhaka, Bangladesh</span>
      </div>
    </div>,
    size,
  );
}
