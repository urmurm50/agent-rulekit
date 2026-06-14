#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const templatesRoot = join(root, "templates");

const help = `agent-rulekit

Usage:
  agent-rulekit init [--target <dir>] [--force]
  agent-rulekit list

Commands:
  init    Install Codex and Cursor project rules into a target directory.
  list    Show bundled rule templates.

Options:
  --target <dir>  Destination project directory. Defaults to current directory.
  --force         Overwrite existing rule files.
  -h, --help      Show this help.
`;

function parseArgs(argv) {
  const parsed = { command: argv[2] || "help", target: process.cwd(), force: false };
  for (let index = 3; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--target") {
      parsed.target = argv[index + 1];
      index += 1;
    } else if (arg === "--force") {
      parsed.force = true;
    } else if (arg === "-h" || arg === "--help") {
      parsed.command = "help";
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

function walk(dir) {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      entries.push(...walk(fullPath));
    } else {
      entries.push(fullPath);
    }
  }
  return entries;
}

function relativeTemplatePath(filePath) {
  return filePath.slice(templatesRoot.length + 1).replaceAll("\\", "/");
}

function destinationPath(target, templatePath) {
  if (templatePath.startsWith("codex/")) {
    return join(target, templatePath.replace(/^codex\//, ""));
  }
  if (templatePath.startsWith("cursor/")) {
    return join(target, templatePath.replace(/^cursor\//, ".cursor/"));
  }
  return join(target, templatePath);
}

function appendCursorrules(target, force) {
  const cursorRulesFiles = walk(join(templatesRoot, "cursor", "rules"));
  const sections = cursorRulesFiles
    .map((file) => readFileSync(file, "utf8").replace(/^---[\s\S]*?---\s*/, "").trim())
    .join("\n\n");
  const targetPath = join(target, ".cursorrules");
  if (existsSync(targetPath) && !force) {
    return { path: targetPath, skipped: true };
  }
  writeFileSync(targetPath, `${sections}\n`, "utf8");
  return { path: targetPath, skipped: false };
}

export function install(targetInput, force = false) {
  const target = resolve(targetInput);
  mkdirSync(target, { recursive: true });
  const files = walk(templatesRoot);
  const results = [];

  for (const file of files) {
    const templatePath = relativeTemplatePath(file);
    const dest = destinationPath(target, templatePath);
    if (existsSync(dest) && !force) {
      results.push({ path: dest, skipped: true });
      continue;
    }
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(file, dest);
    results.push({ path: dest, skipped: false });
  }

  results.push(appendCursorrules(target, force));
  return results;
}

export function listTemplates() {
  return walk(templatesRoot).map(relativeTemplatePath);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = parseArgs(process.argv);
    if (args.command === "help") {
      process.stdout.write(help);
    } else if (args.command === "list") {
      process.stdout.write(`${listTemplates().join("\n")}\n`);
    } else if (args.command === "init") {
      const results = install(args.target, args.force);
      for (const result of results) {
        const action = result.skipped ? "skipped" : "wrote";
        process.stdout.write(`${action} ${result.path}\n`);
      }
    } else {
      throw new Error(`Unknown command: ${args.command}`);
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n\n${help}`);
    process.exitCode = 1;
  }
}
