# ARCHITECTURE.md — Bob Pipeline Doctor

## Overview

Bob Pipeline Doctor is a single-page Next.js dashboard backed by local fixture data and a read-only MCP server. It demonstrates how IBM Bob IDE can be used as a repository-aware CI/CD triage partner.

## Data Flow

```
1. Controlled CI failure fixture
         ↓
2. Local read-only MCP adapter
         ↓
3. IBM Bob IDE / Bob Shell triage workflow
         ↓
4. Structured remediation report
         ↓
5. Next.js dashboard
```

### Step 1 — Controlled CI Failure Fixture

Files: `data/ci-failure.log`, `data/ci-runs.json`

A realistic GitHub Actions failure log is stored as a local file. The scenario: a payment validation function (`validatePaymentStatus`) returns `pending` instead of `approved` for confirmed payment transactions, causing checkout tests to fail on main.

Supporting context files:
- `lib/payments/validatePaymentStatus.ts` — the payment validation function under investigation
- `app/api/checkout/route.ts` — the checkout API route that depends on this validation
- `tests/checkout.test.ts` — the failing test fixture (no test framework installed in MVP)
- `.github/workflows/ci.yml` — the workflow definition that triggered the failure

### Step 2 — Local Read-Only MCP Adapter

File: `mcp/local-ci-server.mjs`

A lightweight Node.js MCP server implementing the MCP JSON-RPC protocol over stdio. It exposes four read-only tools to IBM Bob IDE:

| Tool | Returns |
|------|---------|
| `list_ci_runs` | Recent CI run history from `data/ci-runs.json` |
| `get_ci_log` | Full CI failure log from `data/ci-failure.log` |
| `get_remediation_report` | Structured Bob report from `data/bob-remediation-report.json` |
| `get_repo_context_summary` | Summary from `PROJECT.md` + `ARCHITECTURE.md` |

Rules enforced by the MCP server:
- No external API calls
- No credentials or tokens required
- No writing files
- No executing shell commands
- Read-only, always

Config: `.bob/mcp.json`

### Step 3 — IBM Bob IDE / Bob Shell Triage Workflow

Config: `.bob/custom_modes.yaml` (mode: `ci-triage`)

IBM Bob IDE is the core required component. A developer using Bob IDE activates the `ci-triage` custom mode, which instructs Bob to:

1. Use the local MCP tools to ingest CI failure data
2. Analyze the log and classify the failure type
3. Identify impacted files using repository context
4. Identify the probable root cause with evidence
5. Produce safe remediation steps and commands
6. Recommend missing tests and coverage gaps
7. Assess merge confidence with explicit unknowns
8. Never auto-apply fixes — always require human review

Bob Shell (optional) can be used to run safe read-only investigation commands from the remediation plan.

### Step 4 — Structured Remediation Report

File: `data/bob-remediation-report.json`

Bob's analysis is saved as a structured JSON report. This is the single source of truth for the dashboard. The report schema covers:

- `run` — CI run metadata
- `failure` — type, summary, root cause, evidence
- `impact` — impacted files with risk levels, affected systems
- `remediation` — ordered plan, safe commands, humanReviewRequired flag
- `tests` — recommended tests, missing coverage
- `mergeConfidence` — score (0–10), label, reasoning, unknowns
- `bobEvidence` — mode used, MCP tools called, session report status, notes

### Step 5 — Next.js Dashboard

File: `app/page.tsx`

A single-page server-rendered React component that imports `data/bob-remediation-report.json` and `data/ci-runs.json` directly (via `resolveJsonModule: true`) and renders them as a dark command-center diagnostic dashboard.

No client-side state, no API calls, no authentication.

## Why Local Artifacts?

| Reason | Explanation |
|--------|-------------|
| Reproducible | Any developer can clone and run the demo without setup |
| No credentials | No GitHub tokens, CI API keys, or secrets required |
| Safe for public repo | All data is controlled fixture data — no private info |
| Clean demo | The failure scenario is intentional and well-understood |
| Future-ready | The architecture maps directly to real CI integrations when ready |

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Language | TypeScript 5 (strict) |
| MCP server | Node.js (no external SDK needed) |
| Data | Local JSON fixtures |
| Bob integration | IBM Bob IDE + custom mode + local MCP |

## File Structure

```
bob-pipeline-doctor/
├── app/
│   ├── api/checkout/route.ts   # Checkout API (CI failure context)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Main dashboard
├── data/
│   ├── ci-failure.log          # Controlled CI failure log
│   ├── ci-runs.json            # Recent CI run history
│   └── bob-remediation-report.json  # Bob's structured analysis
├── lib/
│   └── payments/
│       └── validatePaymentStatus.ts  # The function under investigation
├── tests/
│   └── checkout.test.ts        # Failing test fixture
├── mcp/
│   └── local-ci-server.mjs     # Local read-only MCP server
├── .bob/
│   ├── mcp.json                # MCP server config for Bob IDE
│   └── custom_modes.yaml       # ci-triage custom mode
├── .github/
│   └── workflows/ci.yml        # CI workflow definition
├── bob_sessions/               # IBM Bob IDE session exports (required for judging)
├── agents/                     # Agent role documentation
├── docs/                       # Demo script, Bob session notes, MCP design
└── [discipline docs]           # TASKS.md, PROJECT.md, ARCHITECTURE.md, DESIGN.md
```

## Security Boundaries

- No credentials, API keys, or tokens anywhere in the repo
- MCP server is read-only with no shell execution
- No auto-fix, no auto-PR, no auto-deploy
- Human review is required before any fix is applied
- `.env*` files are gitignored
