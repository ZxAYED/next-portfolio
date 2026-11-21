import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join, resolve, relative, extname } from "node:path";
import { build } from "esbuild";

mkdirSync(".cache", { recursive: true });
const stage = mkdtempSync(resolve(".cache/sites-export-"));
try {
  for (const file of [
    "src",
    "public",
    "tsconfig.json",
    "package.json",
    "global.d.ts",
  ]) {
    cpSync(file, join(stage, file), {
      recursive: true,
      filter: (path) =>
        !["src/app/api", "public/images/portfolio.png"].includes(
          path.replaceAll("\\", "/"),
        ),
    });
  }
  writeFileSync(
    join(stage, "next.config.mjs"),
    'export default {output:"export", trailingSlash:true, images:{unoptimized:true,qualities:[75,90]},devIndicators:false};',
  );
  execFileSync(
    process.execPath,
    [resolve("node_modules/next/dist/bin/next"), "build", "--webpack"],
    {
      cwd: stage,
      stdio: "inherit",
      env: {
        ...process.env,
        NEXT_PUBLIC_SITE_URL:
          "https://zayed-iqbal-techquell-portfolio.flowy-bun-1694.chatgpt.site",
      },
    },
  );
  const out = join(stage, "out");
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "text/javascript",
    ".txt": "text/plain",
    ".json": "application/json",
    ".xml": "application/xml",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".mp3": "audio/mpeg",
  };
  const assets = {};
  for (const file of readdirSync(out, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (!file.isFile()) continue;
    const path = join(file.parentPath, file.name);
    const key = "/" + relative(out, path).split("\\").join("/");
    assets[key] = [
      types[extname(key)] ??
        (key.includes("opengraph-image")
          ? "image/png"
          : "application/octet-stream"),
      readFileSync(path).toString("base64"),
    ];
  }
  const dest = resolve("dist");
  mkdirSync(join(dest, "server"), { recursive: true });
  mkdirSync(join(dest, ".openai"), { recursive: true });
  cpSync(".openai/hosting.json", join(dest, ".openai/hosting.json"));
  // The Worker ESM format is self-contained, including all original local media.
  await build({
    entryPoints: ["sites/worker.js"],
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    minify: true,
    outfile: join(dest, "server/index.js"),
    plugins: [
      {
        name: "exported-pages",
        setup(builder) {
          builder.onResolve({ filter: /^portfolio:assets$/ }, () => ({
            path: "assets",
            namespace: "portfolio",
          }));
          builder.onLoad({ filter: /.*/, namespace: "portfolio" }, () => ({
            contents: JSON.stringify(assets),
            loader: "json",
          }));
        },
      },
    ],
  });
  if (!existsSync(join(out, "index.html"))) throw new Error("Missing homepage");
  console.log("Packaged", Object.keys(assets).length, "portfolio assets.");
} finally {
  rmSync(stage, { recursive: true, force: true });
}
