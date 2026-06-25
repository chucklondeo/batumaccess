const { existsSync } = require("node:fs");
const { join } = require("node:path");
const { spawnSync } = require("node:child_process");

const buildIdPath = join(process.cwd(), ".next", "BUILD_ID");

if (existsSync(buildIdPath)) {
  console.log("Production build found. Starting Next.js.");
  process.exit(0);
}

console.log("Production build missing. Running next build before start.");

const result = spawnSync("npx", ["next", "build"], {
  cwd: process.cwd(),
  stdio: "inherit",
  shell: process.platform === "win32"
});

process.exit(result.status || 1);
