# Bob Pipeline Doctor

**CI/CD failure triage powered by IBM Bob**

> IBM Bob Hackathon MVP — 12-hour scope

---

## Quick Start for Judges

```bash
# Install dependencies
npm install

# Start the dashboard
npm run dev
# → Open http://localhost:3000

# (Optional) Start local MCP server for Bob IDE integration
npm run mcp:local-ci
```

**What you'll see:** A dark command-center diagnostic dashboard rendering Bob's structured CI failure analysis. All data comes from controlled local fixtures — no external APIs, no credentials required.

**IBM Bob IDE evidence:** Session exports and screenshots must be in `bob_sessions/` before final submission (see [Bob Session Notes](docs/bob-session-notes.md)).

---

## Problem

When a CI/CD pipeline fails, developers face a cascade of manual work: parsing dense logs, manually identifying impacted files, guessing at root cause, and deciding whether it is safe to merge. This process is slow, error-prone, and risky — especially when payment flows or critical paths are involved.

## Solution

Bob Pipeline Doctor uses IBM Bob IDE as a repository-aware development partner to transform a CI failure into a structured, human-reviewed remediation plan.

The workflow:
1. A CI failure is ingested via a **local read-only MCP server**
2. **IBM Bob IDE** (in `ci-triage` mode) analyzes the failure using repo context
3. Bob produces a **structured remediation report**: failure type, impacted files, root cause, safe commands, recommended tests, merge confidence, and explicit unknowns
4. A **Next.js diagnostic dashboard** renders the report for team visibility
5. A **human engineer** reviews and acts — Bob assists, it does not auto-fix

## Why IBM Bob

IBM Bob IDE is the **core required component** of this project. It is not just a code editor in this workflow — it is the repository-aware analysis partner that bridges the gap between raw CI output and actionable developer guidance.

Bob understands the full repository context: which files changed, how they relate to each other, what the test failure means in terms of the codebase, and what safe investigation steps look like. This is why Bob is used as the triage engine, not a generic LLM.

## How IBM Bob IDE Is Core to the Project

| Usage | Details |
|-------|---------|
| Triage analysis | Bob IDE (ci-triage mode) analyzes CI failure log + repo context |
| Report generation | Bob produces the structured `data/bob-remediation-report.json` |
| Repository correlation | Bob identifies impacted files beyond what the log explicitly mentions |
| Safe planning | Bob recommends read-only investigation commands and missing tests |
| Development partner | Bob IDE was used throughout the hackathon to build this project |
| Judging evidence | Exported session reports and screenshots must be added to `bob_sessions/` before final submission |

## How Bob Shell Supports the Workflow

Bob Shell is an optional supporting component. It is used to:
- Run safe read-only investigation commands from the remediation plan
- Correlate shell output with Bob IDE's structured analysis
- Demonstrate the end-to-end developer triage workflow in the demo

## Local Read-Only MCP Flow

```
CI failure log → Local MCP server → IBM Bob IDE → Structured report → Dashboard
```

The local MCP server (`mcp/local-ci-server.mjs`) exposes four read-only tools:

| Tool | Returns |
|------|---------|
| `list_ci_runs` | Recent CI run history |
| `get_ci_log` | Full CI failure log |
| `get_remediation_report` | Bob's structured analysis |
| `get_repo_context_summary` | Project + architecture docs |

**No external API calls. No credentials. No tokens required.**

Run the MCP server: `npm run mcp:local-ci`

## MVP Architecture

```
bob-pipeline-doctor/
├── app/page.tsx                     # Dashboard (single page)
├── app/api/checkout/route.ts        # Checkout API (CI failure context)
├── data/
│   ├── ci-failure.log               # Controlled GitHub Actions failure log
│   ├── ci-runs.json                 # Recent CI run history
│   └── bob-remediation-report.json  # Bob's structured analysis output
├── lib/payments/validatePaymentStatus.ts  # The function under investigation
├── tests/checkout.test.ts           # Failing test fixture
├── mcp/local-ci-server.mjs          # Local read-only MCP server
├── .bob/
│   ├── mcp.json                     # MCP server config for Bob IDE
│   └── custom_modes.yaml            # ci-triage custom mode definition
├── .github/workflows/ci.yml         # CI workflow definition
└── bob_sessions/                    # IBM Bob IDE session exports (required)
```

## Dashboard Features

The dashboard renders Bob's structured report with:

- **Pipeline Failure Summary** — provider, workflow, branch, commit, failed step, timestamp
- **Failure Diagnosis** — type, summary, probable root cause, supporting evidence
- **Impacted Files** — file cards with risk levels (high / medium / low) and reasons
- **Safe Remediation Plan** — ordered steps + read-only investigation commands
- **Recommended Tests** — tests to add and missing coverage gaps
- **Merge Confidence** — score, label, reasoning, and explicit unknowns
- **IBM Bob Evidence** — mode used, MCP tools, session reminder, notes
- **Recent CI Runs** — run history table
- **Architecture Strip** — data flow visualization
- **Safety Boundaries** — explicit list of what this system does not do

## Safety Boundaries

| Boundary | Detail |
|----------|--------|
| No credentials | No API keys, tokens, or secrets in the repo |
| No live API access | No GitHub Actions, CircleCI, or Buildkite API calls |
| No auto-fix | All code changes require human review |
| No auto-deploy | No deployment automation |
| Read-only MCP | MCP server reads local fixture files only |
| Human review required | Merge confidence is an estimate, not a guarantee |

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → Open http://localhost:3000

# Start local MCP server (for Bob IDE integration)
npm run mcp:local-ci

# Production build
npm run build
```

Requirements: Node.js 20+, npm

## Repository Structure

```
/app              Next.js App Router pages and API routes
/data             CI failure fixtures and Bob remediation report
/lib              Shared TypeScript utilities (payment validation)
/tests            Test fixture (failing test from CI run)
/mcp              Local read-only MCP server
/.bob             IBM Bob IDE configuration (MCP, custom modes)
/.github          GitHub Actions CI workflow
/agents           Agent role documentation
/docs             Demo script, Bob session notes, MCP design doc
/bob_sessions     IBM Bob IDE session exports and screenshots (required)
TASKS.md          Execution tracking
PROJECT.md        Project identity and judging narrative
ARCHITECTURE.md   Data flow and system design
DESIGN.md         UI design spec
```

## Bob Session Evidence

The `bob_sessions/` folder must contain the following before final submission:

- [ ] Exported IBM Bob IDE session report (required for judging)
- [ ] Screenshot: Bob IDE with `ci-triage` mode active
- [ ] Screenshot: Bob IDE analyzing CI failure via MCP tools
- [ ] Screenshot: Bob IDE generating the structured remediation report

See `docs/bob-session-notes.md` for detailed capture instructions.

**No credentials should ever appear in session exports or screenshots.**

## Demo Flow

See `docs/demo-script.md` for the full 2-minute script.

Summary:
1. Show the CI failure log — a payment status regression blocking main
2. Show IBM Bob IDE in `ci-triage` mode using local MCP tools to analyze the failure
3. Walk through the dashboard: diagnosis, impacted files, remediation, tests, confidence
4. Show safety boundaries: no auto-fix, no credentials, human review required
5. Show `bob_sessions/` folder with Bob IDE evidence

## Out of Scope

This MVP intentionally excludes:
- Live GitHub Actions API integration
- OAuth / authentication
- Database
- Auto-fix or auto-PR
- Real webhook / event ingestion
- Multi-user features
- Deployment automation

## Future Work

- GitHub Actions webhook integration for live failure ingestion
- Authenticated MCP tools using environment-scoped GitHub tokens
- CircleCI and Buildkite MCP adapters
- Multi-pipeline dashboard view
- Team-shared remediation plan annotations

## Submission Checklist

- [ ] `npm run build` passes with no errors
- [ ] Dashboard loads at `localhost:3000` with all sections populated
- [ ] `bob_sessions/` contains IBM Bob IDE session exports and screenshots
- [ ] README accurately describes the project for judges
- [ ] No credentials, API keys, or private data in the repository
- [ ] `docs/demo-script.md` is ready for the 2-minute demo

---

*Bob Pipeline Doctor — IBM Bob Hackathon MVP*
*IBM Bob IDE is the core required component.*
