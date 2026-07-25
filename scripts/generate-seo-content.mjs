import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dataDir = path.dirname(fileURLToPath(import.meta.url)).replace(/scripts$/, "data");
const topicsPath = path.join(dataDir, "seo-topics.json");

// Deterministic keyword bank: product terms x buyer intent x export market.
// Intentionally not free-text generation — every phrase is a factual
// combination of things Batum actually sells and the regions it serves
// (see areaServed in data/seo.ts), so this stays accurate and avoids
// generating thin or misleading SEO content.
const productTerms = [
  "servo barrier gate",
  "low voltage door operator",
  "anti-smash safety radar",
  "access control accessories",
  "direct drive pedestrian gate",
  "platform screen door control",
  "parking barrier controller"
];

const intents = ["manufacturer", "supplier", "factory", "exporter", "OEM"];

const markets = ["Hong Kong", "Singapore", "Vietnam", "Malaysia", "Thailand", "Europe", "Middle East"];

const SEED_COUNT = 6; // hand-written topics at the front of the file are never rotated out
const MAX_TOPICS = 40; // cap total size so the SEO hub page doesn't grow unbounded
const ADD_PER_RUN = 2;

function buildCandidatePool() {
  const pool = [];
  for (const term of productTerms) {
    for (const intent of intents) {
      pool.push(`${term} ${intent}`);
    }
    for (const market of markets) {
      pool.push(`${term} for ${market}`);
    }
  }
  return pool;
}

function main() {
  const current = JSON.parse(readFileSync(topicsPath, "utf8"));
  const seed = current.slice(0, SEED_COUNT);
  const rotating = current.slice(SEED_COUNT);
  const existing = new Set(current.map((topic) => topic.toLowerCase()));

  const pool = buildCandidatePool().filter((candidate) => !existing.has(candidate.toLowerCase()));
  const added = pool.slice(0, ADD_PER_RUN);

  let next = [...rotating, ...added];
  const overflow = seed.length + next.length - MAX_TOPICS;
  if (overflow > 0) next = next.slice(overflow);

  const result = [...seed, ...next];
  writeFileSync(topicsPath, `${JSON.stringify(result, null, 2)}\n`);

  if (added.length > 0) {
    console.log(`Added ${added.length} SEO topic(s): ${added.join(", ")}`);
  } else {
    console.log("No new SEO topics to add this run.");
  }
}

main();
