<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Bob Pipeline Doctor — Agent Rules

## Source of Truth

- **Repository** is the source of truth for code and architecture
- **TASKS.md** tracks execution — check it before starting any task
- **README.md** tells the judging story — keep it accurate and focused on judges
- **data/bob-remediation-report.json** is the canonical dashboard data source — keep dashboard in sync
- **ARCHITECTURE.md** defines the data flow — do not deviate without updating docs

## IBM Bob Evidence

- `bob_sessions/` contains the required IBM Bob IDE session exports and screenshots
- This folder must be populated before final hackathon submission
- IBM Bob IDE is the **required/core** hackathon component — evidence of its use is mandatory
- Bob Shell is optional/supporting but should be documented if used

## Scope Boundaries

- No agent should expand scope into live CI API integrations unless explicitly requested
- No agent should add authentication, a database, or auto-fix logic
- No agent should add heavy UI dependencies (recharts, framer-motion, shadcn, etc.)
- No agent should commit credentials, API keys, or private data

## Agent Roles

- `agents/implementation.md` — code implementation responsibilities
- `agents/code-review.md` — code review checklist
- `agents/ux-ui-review.md` — UI/UX review checklist
- `agents/bob-workflow.md` — IBM Bob IDE workflow and evidence
- `agents/handoff.md` — pre-submission verification and judge handoff
