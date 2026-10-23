import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function readEncoded(rel) {
  const single = join(root, "media-b64", `${rel}.b64`);
  if (existsSync(single)) return readFileSync(single, "utf8");

  const partPrefix = join(root, "media-b64", `${rel}.b64.part`);
  const parent = dirname(partPrefix);
  const stem = partPrefix.slice(parent.length + 1);
  if (!existsSync(parent)) {
    throw new Error(`missing base64 for ${rel}`);
  }
  const parts = readdirSync(parent)
    .filter((name) => name.startsWith(stem))
    .sort();
  if (parts.length === 0) throw new Error(`missing base64 for ${rel}`);
  return parts.map((name) => readFileSync(join(parent, name), "utf8")).join("");
}

const manifest = JSON.parse(readFileSync(join(root, "media-b64", "manifest.json"), "utf8"));

for (const rel of manifest) {
  const encoded = readEncoded(rel);
  const bytes = Buffer.from(encoded.replace(/\s+/g, ""), "base64");
  const target = join(root, rel);
  if (existsSync(target) && statSync(target).size === bytes.length) continue;
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, bytes);
}
