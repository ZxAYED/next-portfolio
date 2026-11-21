// Run from the project root to regenerate the three synchronized GIFs per stage.
import { mkdir } from "node:fs/promises";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as icons from "lucide-react";
import sharp from "sharp";

const stages = {
  discussion: ["MessagesSquare", "Users", "Target"],
  requirements: ["Users", "Route", "ListChecks"],
  proposal: ["Map", "CalendarDays", "Handshake"],
  architecture: ["Database", "Cable", "Layers3"],
  development: ["Code2", "GitPullRequest", "FlaskConical"],
  delivery: ["ClipboardCheck", "Rocket", "BookOpen"],
  support: ["MessageSquare", "Wrench", "PackageCheck"],
};
const size = 80;
const framesPerBeat = 16;
const group = (body, transform) => `<g transform="${transform}">${body}</g>`;
const dot = (x, y, radius) =>
  `<circle cx="${x}" cy="${y}" r="${radius}" fill="#975cb6" stroke="none"/>`;

function paint(icon, pieces, t) {
  const lift = Math.sin(Math.PI * t) ** 2;
  const body = pieces.join("");
  switch (icon) {
    case "MessageSquare":
    case "MessagesSquare": {
      const x = icon === "MessageSquare" ? 8 : 5;
      const y = icon === "MessageSquare" ? 10 : 6;
      return body + [0, 1, 2].map(i => dot(x + 2.6 * i, y,
        Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, 1.7 * t - .24 * i)))))).join("");
    }
    case "Wrench":
      return group(body, `rotate(${-26 * Math.sin(2 * Math.PI * t) * lift} 6 18)`);
    case "PackageCheck":
    case "ClipboardCheck":
    case "ListChecks":
      return pieces.map(part => part.includes('d="m') && !part.includes("7.5") ?
        `<g stroke-dasharray="10 10" stroke-dashoffset="${10 * lift}">${part}</g>` : part).join("");
    case "Rocket":
      return group(body, `translate(${2.3 * lift} ${-2.3 * lift})`);
    case "Route":
    case "GitPullRequest":
      return body + dot(6 + 12 * t, icon === "Route" ? 19 - 14 * t : 6 + 12 * t, 2.1 * lift);
    case "Target":
    case "Database":
    case "CalendarDays":
      return body + dot(12, icon === "Target" ? 12 : 7 + 9 * t, 3.1 * lift);
    case "FlaskConical":
      return body + dot(12, 17 - 6 * t, 1.7 * lift) + dot(14, 19 - 3 * t, lift);
    case "Layers3":
    case "Users":
    case "Code2":
    case "Cable":
      return pieces.map((part, i) => group(part, icon === "Layers3" ?
        `translate(0 ${(i - 1) * 2.3 * lift})` : `translate(${(i % 2 ? -1 : 1) * 1.6 * lift} 0)`)).join("");
    case "BookOpen":
    case "Map":
      return group(body, `translate(12 0) scale(${1 - .26 * lift} 1) translate(-12 0)`);
    case "Handshake":
      return group(body, `rotate(${9 * Math.sin(2 * Math.PI * t) * lift} 12 12) translate(0 ${lift})`);
    default: throw new Error(`Missing motion for ${icon}`);
  }
}

await mkdir("public/images/process", { recursive: true });
for (const [stage, names] of Object.entries(stages)) {
  for (const [slot, name] of names.entries()) {
    const markup = renderToStaticMarkup(createElement(icons[name]));
    const pieces = markup.slice(markup.indexOf(">") + 1, markup.lastIndexOf("</svg>")).match(/<(?:path|circle|ellipse|polyline|line|rect|polygon)\b[^>]*>/g)
      .map(tag => tag.replace(/\/?\s*>$/, "/>"));
    const frames = [];
    for (let i = 0; i < 3 * framesPerBeat; i++) {
      const beat = Math.floor(i / framesPerBeat);
      const t = beat === slot ? (i % framesPerBeat) / (framesPerBeat - 1) : 0;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="-3 -3 30 30"><rect x="-3" y="-3" width="30" height="30" fill="#eae6ef"/><g fill="none" stroke="#69438c" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paint(name,pieces,t)}</g></svg>`;
      frames.push(await sharp(Buffer.from(svg)).removeAlpha().raw().toBuffer());
    }
    await sharp(Buffer.concat(frames), {raw:{width:size, height:size * frames.length, channels:3, pageHeight:size}})
      .gif({loop:0, delay:frames.map(() => 80), colours:48, dither:0}).toFile(`public/images/process/${stage}-${slot + 1}.gif`);
  }
}
