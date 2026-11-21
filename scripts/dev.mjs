import { spawn } from "node:child_process";
import { createRequire } from "node:module";

// Accept both Next.js and generic preview-runner development flags.
const require = createRequire(import.meta.url);
const forwarded = process.argv.slice(2).flatMap((argument) => {
  if (argument === "--strictPort") return [];
  if (argument === "--host") return ["--hostname"];
  return [argument];
});
const child = spawn(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "dev", ...forwarded],
  {
    stdio: "inherit",
    env: process.env,
  },
);
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("error", (error) => {
  process.stderr.write(error.message + "\n");
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code ?? 0;
});
