# Claude for Open Source application notes

This document helps maintainers describe Agent Rulekit honestly when applying to programs that support open-source contributors.

## Project summary

Agent Rulekit is an open-source rules generator for AI coding agents. It installs reusable project rules for Codex, Cursor, and other file-based AI agent hosts so agentic coding work follows safer defaults: codebase recon before edits, explicit verification, secure-by-default checks, UI/UX quality gates, SEO/GEO evidence discipline, and phase-based execution for larger tasks.

## Why it matters

AI coding tools are powerful, but many teams still operate them with ad hoc prompts. That leads to common failures: agents agreeing too quickly, changing unrelated files, skipping verification, producing generic UI, missing security boundaries, or claiming completion without an audit. Agent Rulekit turns these lessons into portable project files that can be reviewed, versioned, and reused across repositories.

## Current status

- Public repository with MIT license.
- Zero-dependency Node.js CLI.
- Codex `AGENTS.md` template.
- Cursor `.cursor/rules/*.mdc` templates and `.cursorrules` compatibility output.
- Example output tree and documented application notes.

## Roadmap

- Add framework-specific rulepacks for Next.js, Rails, Laravel, and static sites.
- Add a `doctor` command that checks rule presence and drift.
- Add tests for template installation and overwrite behavior.
- Publish to npm once the API stabilizes.
