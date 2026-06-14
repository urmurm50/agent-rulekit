import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { install } from "../bin/agent-rulekit.mjs";

const target = mkdtempSync(join(tmpdir(), "agent-rulekit-"));

install(target);

const expected = [
  "AGENTS.md",
  ".cursorrules",
  ".cursor/rules/implementation-workflow.mdc",
  ".cursor/rules/large-task-protocol.mdc",
  ".cursor/rules/productive-collaboration.mdc",
  ".cursor/rules/security-data-safety.mdc",
  ".cursor/rules/seo-geo-quality.mdc",
  ".cursor/rules/ui-ux-quality.mdc",
];

for (const file of expected) {
  const path = join(target, file);
  if (!existsSync(path)) {
    throw new Error(`Missing generated file: ${file}`);
  }
}

const cursorrules = readFileSync(join(target, ".cursorrules"), "utf8");
if (!cursorrules.includes("Productive Collaboration") || !cursorrules.includes("Large Task Protocol")) {
  throw new Error(".cursorrules did not include expected sections");
}

rmSync(target, { recursive: true, force: true });
process.stdout.write("cli smoke test passed\n");
