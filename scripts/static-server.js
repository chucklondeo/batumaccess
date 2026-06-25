const { createServer } = require("node:http");
const { createReadStream, existsSync, statSync } = require("node:fs");
const { extname, join, normalize } = require("node:path");

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8"
};

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const filePath = resolveFile(decodeURIComponent(url.pathname));

  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end("<h1>404</h1>");
    return;
  }

  const ext = extname(filePath);
  response.writeHead(200, {
    "Content-Type": contentTypes[ext] || "application/octet-stream",
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable"
  });
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`Static Batum site running on port ${port}`);
});

function resolveFile(pathname) {
  if (!existsSync(root)) {
    return null;
  }

  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const candidates = [
    join(root, safePath),
    join(root, safePath, "index.html"),
    join(root, `${safePath}.html`),
    join(root, "index.html")
  ];

  for (const candidate of candidates) {
    if (candidate.startsWith(root) && existsSync(candidate) && statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}
