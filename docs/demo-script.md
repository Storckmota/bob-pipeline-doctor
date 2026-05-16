# Demo Script — Bob Pipeline Doctor (2 minutes)

## 0:00–0:20 — Problem

"Every developer has seen this: CI fails on main. The logs are dense, it's unclear which files are affected, and you have no structured path from 'something broke' to 'here's the safe fix.' Manually triaging CI failures is slow, error-prone, and risky — especially when payment logic is involved."

*[Show the CI failure log from data/ci-failure.log or dashboard Pipeline Failure section]*

## 0:20–0:40 — The CI Failure Fixture

"We have a controlled GitHub Actions failure. A checkout test is failing because a confirmed payment transaction is being returned as 'pending' instead of 'approved'. This is a regression in `lib/payments/validatePaymentStatus.ts`. One test is failing, four are passing — but this one failure blocks merge to main."

*[Show the Pipeline Failure Summary section of the dashboard]*
*[Point out: provider, workflow, branch, failed step, timestamp]*

## 0:40–1:05 — IBM Bob IDE as the Core Triage Partner

"IBM Bob IDE is the core required component of this project. Using Bob's `ci-triage` custom mode and a local read-only MCP server, Bob can ingest the CI failure log, correlate it with repository context — the actual source files, the test, the workflow — and produce a structured remediation report."

*[Show IBM Bob IDE with ci-triage mode active]*
*[Show the local MCP server providing CI artifact data to Bob]*
*[Show Bob generating the structured report]*

"Bob Shell supports the workflow for running safe read-only investigation commands from the remediation plan."

## 1:05–1:35 — Dashboard Walkthrough

"The structured report Bob produces is rendered in this diagnostic dashboard."

*[Walk through dashboard sections in order]*

- **Failure Diagnosis** — "Regression type. The probable root cause: 'confirmed' is missing from APPROVED_STATUSES. Evidence from the CI log."
- **Impacted Files** — "Four files identified with risk levels. Two high-risk: the validation function and the checkout route."
- **Safe Remediation Plan** — "Six ordered steps. Safe read-only investigation commands only."
- **Recommended Tests** — "Four tests to add, three coverage gaps identified."
- **Merge Confidence** — "Score: 2 out of 10. Not ready to merge. Bob flags unknowns — like whether 'confirmed' is actually in the payment provider's API contract."

## 1:35–1:50 — Safety Boundaries

"A critical design principle: Bob does not auto-fix anything. The dashboard makes this explicit."

*[Show the Safety Boundaries section]*
*[Show the orange 'HUMAN REVIEW REQUIRED' banner in the remediation plan]*
*[Show the merge confidence disclaimer]*

"No credentials anywhere in the repo. No live API calls. Read-only MCP only. Every step requires a human decision."

## 1:50–2:00 — Evidence and Future Work

*[Show bob_sessions/ folder and its contents]*

"Before submission, we export IBM Bob IDE session reports and screenshots into this folder for judges to review. That's the required evidence of Bob IDE being used as a core development partner."

"Future work: real GitHub Actions webhook integration, live CI data via authenticated MCP, multi-pipeline support. This 12-hour MVP proves the architecture. The foundation is intentionally extensible."

---

## Key Talking Points

- IBM Bob IDE is the core required component — not optional
- Bob Shell is a supporting component in the workflow
- Local MCP is a safe, credential-free ingestion pattern
- The dashboard renders Bob's structured output — not a generic template
- Human review is always required — Bob assists, not replaces, the engineer
- This architecture maps directly to real CI integrations in future iterations
