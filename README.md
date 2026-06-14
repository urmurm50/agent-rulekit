# Agent Rulekit

Reusable project rules for AI coding agents such as Codex, Cursor, and Claude Code.

Agent Rulekit turns hard-won agent workflow lessons into versioned project files:

- `AGENTS.md` for Codex-style agents
- `.cursor/rules/*.mdc` for Cursor Project Rules
- `.cursorrules` compatibility output

The goal is simple: make AI coding agents more useful, safer, and easier to trust across real projects.

## Why this exists

AI coding agents often fail in predictable ways:

- They agree with weak ideas instead of pushing back.
- They edit before reading the project.
- They skip verification and report "done" too early.
- They produce generic UI that looks unrelated to the product.
- They trust frontend validation for server-side decisions.
- They lose track of multi-phase work.

Agent Rulekit installs lightweight rules that address those failure modes directly.

## Install

Run directly from the repository:

```bash
node ./bin/agent-rulekit.mjs init --target /path/to/project
```

Overwrite existing rule files:

```bash
node ./bin/agent-rulekit.mjs init --target /path/to/project --force
```

List bundled templates:

```bash
node ./bin/agent-rulekit.mjs list
```

## Included rulepacks

- Productive collaboration
- Implementation workflow
- Security and data safety
- UI/UX quality
- SEO/GEO quality
- Large task protocol

## Example output

```text
.
|-- AGENTS.md
|-- .cursorrules
`-- .cursor
    `-- rules
        |-- implementation-workflow.mdc
        |-- large-task-protocol.mdc
        |-- productive-collaboration.mdc
        |-- security-data-safety.mdc
        |-- seo-geo-quality.mdc
        `-- ui-ux-quality.mdc
```

## Verification

```bash
npm run check
npm run demo
```

## Philosophy

Rules should be:

- Reviewable in git
- Specific enough to change behavior
- Short enough to stay readable
- Honest about what cannot be verified
- Safe by default around secrets, user data, and deployments

## Roadmap

- `doctor` command for rule drift checks
- Framework-specific rulepacks
- Template tests
- npm publication

## License

MIT
