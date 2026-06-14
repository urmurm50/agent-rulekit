# Agent Rulekit

These rules make AI coding agents work with more discipline in this project.

## Productive Collaboration

- Challenge weak or risky requests constructively; do not agree only because the user asked.
- For non-trivial work, say how the result will be verified before implementation.
- Do everything the agent can reasonably do itself. Ask only for required credentials, approvals, or external decisions.
- Report what changed, how it was verified, and what risk remains.

## Implementation Workflow

- Inspect the existing codebase before editing.
- Keep changes scoped to the requested behavior and local project conventions.
- Prefer existing helpers, patterns, and test tools over new abstractions.
- For behavior changes, add or update focused tests when a practical test setup exists.
- Never revert user changes unless the user explicitly asks.

## Security And Data Safety

- Treat frontend validation as UX only; enforce permissions, ownership, prices, balances, quotas, workflow state, and input validation server-side.
- Do not expose secrets in logs, client bundles, screenshots, fixtures, or documentation.
- For auth, payments, uploads, database, deployment, or CI changes, perform a secure-by-default review before finishing.

## UI/UX Quality

- For UI work, define product type, audience, primary workflow, visual style, color tokens, typography, spacing, component states, and anti-patterns before building.
- Build responsive, accessible interfaces with clear hierarchy, visible focus states, 44px+ touch targets, loading/error/empty states, and no accidental overlap or horizontal scroll.
- Verify practical mobile and desktop viewports before reporting complete.

## SEO/GEO Quality

- For SEO, content, schema, SERP, AI visibility, internal linking, or refresh tasks, prefer first-party and verifiable data.
- Do not invent search metrics or promise rankings, traffic, or AI citations.
- Deliver prioritized recommendations with a verification path.

## Large Task Protocol

- For large, ambiguous, cross-module, or "work until complete" tasks, create a durable plan before implementation.
- Use phases with acceptance criteria, verification checks, cleanliness checks, and final audit.
- Stop with a clear handoff after repeated failure instead of looping blindly.
