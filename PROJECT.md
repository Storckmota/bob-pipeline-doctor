# PROJECT.md — Bob Pipeline Doctor

## Project Identity

**Name:** Bob Pipeline Doctor
**Tagline:** CI/CD failure triage powered by IBM Bob
**Type:** IBM Bob Hackathon MVP — 12-hour scope
**Status:** Active development

## Problem

When a CI/CD pipeline fails, developers face a compounding set of problems:

1. Raw CI logs are dense and hard to reason about without repository context
2. It is unclear which files are impacted and why the failure matters
3. There is no structured bridge between "the test failed" and "what is the safe next step"
4. Developers must manually correlate logs, code, test output, and deployment risk
5. Without a structured plan, fixes can be rushed, incomplete, or introduce new regressions

The result: CI failures waste disproportionate developer time and create unsafe merge decisions.

## Solution

Bob Pipeline Doctor uses IBM Bob IDE as a repository-aware development partner to transform a failed CI pipeline into a structured, human-reviewed remediation plan.

The workflow:
1. A controlled CI failure fixture is ingested via a local read-only MCP server
2. IBM Bob IDE, using the `ci-triage` custom mode, analyzes the log + repo context
3. Bob produces a structured remediation report covering: failure type, impacted files, root cause, safe commands, recommended tests, merge confidence, and unknowns
4. The Next.js dashboard renders the report as a clear engineering diagnostic tool
5. A human engineer reviews the plan before any fix is applied or merged

**Key framing:** This project is NOT "AI automatically fixes CI failures." It IS "IBM Bob helps developers understand CI/CD failures faster and safer using repo context, structured triage, and human-reviewed remediation planning."

## Target Users

- Developers working on teams with active CI/CD pipelines
- On-call engineers triaging unexpected test regressions
- Engineering leads reviewing pipeline health before deployments
- Teams using IBM Bob IDE as a development partner

## MVP Scope

**In scope:**
- Single-page Next.js dashboard rendering a structured remediation report
- Controlled GitHub Actions failure fixture (payment status regression)
- Local read-only MCP server exposing CI fixtures to Bob IDE
- IBM Bob `ci-triage` custom mode definition
- Project discipline documentation
- Demo script and Bob session evidence folder
- Clean README for hackathon judges

**Out of scope:** See TASKS.md — Later / Out of Scope section.

## Out-of-Scope Items

- Live CI API integrations (GitHub Actions, CircleCI, Buildkite)
- Authentication / login
- Database
- Auto-fix, auto-PR, auto-deploy
- Real webhook/event ingestion
- Multi-user or team features

## Judging Narrative

This project demonstrates that IBM Bob IDE can serve as a repository-aware triage partner for CI/CD failures — not just a code editor. By combining:

- Bob's understanding of the local repository context
- A structured MCP-based data ingestion pattern
- A custom `ci-triage` mode with safe, principled analysis guidelines
- A clean diagnostic dashboard that renders Bob's output

...we show a practical, demo-ready workflow where Bob adds genuine value at a critical developer pain point: the moment a pipeline fails on main.

The architecture is intentionally simple and safe: local fixtures, no credentials, read-only MCP, human review at every step. This makes the demo reproducible, trustworthy, and directly extensible to real CI integrations in future iterations.
