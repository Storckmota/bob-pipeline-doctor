@AGENTS.md

# Bob Pipeline Doctor — Claude Code Guidelines

## Scope Rules

- Keep scope tight — this is a 12-hour hackathon MVP
- Do not add heavy dependencies (no recharts, framer-motion, shadcn, etc.)
- Only approved new dependencies: `@modelcontextprotocol/sdk`, `zod` (MCP only, if needed)
- Prefer static/local data — no live API calls, no external services
- Keep the app buildable at all times (`npm run build` must pass)
- Preserve useful docs — do not delete TASKS.md, PROJECT.md, ARCHITECTURE.md, DESIGN.md, README.md
- Optimize for demo clarity — every UI element should be explainable in the 2-minute demo

## Safety Rules

- Do not include credentials, API keys, tokens, or secrets anywhere
- Do not commit .env files or any file containing real credentials
- Do not claim auto-remediation — Bob assists, it does not auto-fix
- Human review is always required before any fix is merged or deployed
- MCP server must remain read-only — no shell execution from CI log content

## Development Rules

- Check `node_modules/next/dist/docs/` for Next.js 16 breaking changes before modifying app/ files
- Async request APIs (cookies, headers, params, searchParams) must be awaited in Next.js 16
- `data/bob-remediation-report.json` is the source of truth for dashboard content
- `TASKS.md` tracks what is in scope and what is not
- `ARCHITECTURE.md` defines the expected data flow — do not deviate from it
