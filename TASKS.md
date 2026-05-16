# TASKS.md — Bob Pipeline Doctor

## Completed

- [x] Repository initialized with Next.js 16 + Tailwind CSS 4
- [x] AGENTS.md and CLAUDE.md base files
- [x] bob_sessions/.gitkeep created
- [x] Project discipline docs (TASKS, PROJECT, ARCHITECTURE, DESIGN)
- [x] Data fixtures (ci-failure.log, ci-runs.json, bob-remediation-report.json)
- [x] Representative source files for CI failure context
- [x] Local read-only MCP server (`mcp/local-ci-server.mjs`)
- [x] Bob custom mode: `ci-triage` (`.bob/custom_modes.yaml`)
- [x] Dashboard UI (`app/page.tsx`) — dark command-center style with blue/cyan accents
- [x] README for judges with Quick Start section
- [x] "How This Works" section added to dashboard
- [x] bob_sessions/ reminder callout added to dashboard
- [x] bob_sessions/ README evidence guide added

## Next — Critical for Submission

- [ ] Export IBM Bob IDE session reports → `bob_sessions/`
- [ ] Capture Bob IDE screenshots → `bob_sessions/`
- [x] Test `npm run build` — verify no TypeScript errors
- [ ] Test dashboard at `localhost:3000` — verify all sections render
- [ ] Practice 2-minute demo following `docs/demo-script.md`
- [ ] Final submission checklist review

## Later / Out of Scope

The following are intentionally excluded from this 12-hour MVP:

- Live GitHub Actions API integration
- OAuth / authentication
- Database persistence
- Real CircleCI / Buildkite integration
- Auto-fix or auto-PR on CI failure
- Auto-deployment pipeline
- Email or Slack notifications
- Multi-user support
- Chart libraries or heavy UI dependencies
- Heavy backend / background workers
- Live MCP connection to external CI systems

**Note:** The local read-only MCP server (`mcp/local-ci-server.mjs`) IS in scope.
It reads controlled local fixtures only — no external APIs, no credentials required.

## Submission Checklist

- [x] `npm run build` passes with no TypeScript errors
- [ ] `data/bob-remediation-report.json` populated with credible fixture content
- [ ] `data/ci-failure.log` and `data/ci-runs.json` present
- [ ] Local MCP server is documented and runnable (`npm run mcp:local-ci`)
- [ ] `.bob/custom_modes.yaml` defines `ci-triage` mode
- [ ] `.bob/mcp.json` configures local MCP server for Bob IDE
- [ ] README tells the judging story clearly
- [ ] **IBM Bob IDE session exports added to `bob_sessions/`** (required for judging)
- [ ] **Screenshots of Bob IDE triage workflow in `bob_sessions/`**
- [ ] Demo script at `docs/demo-script.md`
- [ ] `agents/` folder contains agent role docs
- [ ] No credentials, API keys, or private data committed
- [ ] All TypeScript errors resolved
- [ ] Safety boundaries messaging visible in dashboard
- [ ] Human-review-required indicators present throughout UI
