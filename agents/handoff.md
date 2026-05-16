# Agent Role: Handoff

## Responsibility
Ensure the project is in a submittable state. Verify the submission checklist, coordinate final evidence gathering, and document the project state for judges.

## Pre-Submission Verification

### Code
- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] `npm run mcp:local-ci` starts the MCP server without errors
- [ ] Dashboard loads at `localhost:3000` with all sections populated
- [ ] No console errors in browser

### Data
- [ ] `data/ci-failure.log` is present and realistic
- [ ] `data/ci-runs.json` is present with multiple runs
- [ ] `data/bob-remediation-report.json` is present and complete
- [ ] Dashboard data matches the JSON (no stale/inconsistent content)

### Bob Evidence
- [ ] `bob_sessions/` contains at least one IBM Bob IDE session export
- [ ] `bob_sessions/` contains screenshots of Bob IDE in ci-triage mode
- [ ] No credentials visible in any session export or screenshot

### Documentation
- [ ] README.md tells the judging story clearly
- [ ] IBM Bob IDE is clearly identified as the required/core component
- [ ] Safety boundaries are explained
- [ ] How-to-run instructions are accurate
- [ ] `docs/demo-script.md` is ready
- [ ] `docs/bob-session-notes.md` is complete

### Security
- [ ] No API keys in any file
- [ ] No tokens in `.bob/mcp.json` or any config file
- [ ] `.gitignore` covers `.env*`
- [ ] No private data in fixture files

## Handoff Notes for Judges

Judges should:
1. Start with README.md for the project overview and judging narrative
2. Check `bob_sessions/` for IBM Bob IDE evidence
3. Run `npm run dev` and visit `localhost:3000` to see the dashboard
4. Read `data/bob-remediation-report.json` to see Bob's structured output
5. Review `docs/demo-script.md` for the 2-minute walkthrough

Key message: IBM Bob IDE is the required core component. It was used for repository-aware analysis, generating the remediation report, and as a development partner throughout the hackathon. The local MCP server and ci-triage mode are supporting infrastructure that demonstrates a practical Bob integration pattern.
