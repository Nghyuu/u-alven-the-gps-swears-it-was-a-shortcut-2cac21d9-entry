import { writeFileSync, chmodSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// The GPS's one-line excuse, in its own voice: smug, defensive,
// blaming the map for a shortcut that ends at a wedding.
const ENTRY_LINE =
  "The map swore this was a shortcut \u2014 I never asked whether the shortcut ended in a cul-de-sac with a wedding in it, and now we're crashing it.";

// Gate: the sealed scorer requires 1-200 characters, one line.
if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > 200) {
  throw new Error(`entry line is ${ENTRY_LINE.length} characters, must be 1-200`);
}
if (ENTRY_LINE.includes("\n")) {
  throw new Error("entry line must be a single line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, ENTRY_LINE + "\n", "utf8");
chmodSync(entryPath, 0o644);
