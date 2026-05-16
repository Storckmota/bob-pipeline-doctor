# Bob Session Notes — IBM Bob IDE Workflow

## What to Capture in IBM Bob IDE

Before final submission, the following must be captured and saved to `bob_sessions/`:

### Required Exports
- [ ] Bob IDE task session report (exported from IBM Bob IDE)
- [ ] Screenshot: Bob IDE with `ci-triage` mode active
- [ ] Screenshot: Bob IDE analyzing the CI failure log via MCP tools
- [ ] Screenshot: Bob IDE producing the structured remediation report
- [ ] Screenshot: Bob IDE correlating impacted files with repo context

### Optional (strongly recommended)
- [ ] Bob Shell session showing safe investigation commands
- [ ] Screenshot: local MCP server connection in Bob IDE settings
- [ ] Short screen recording of the triage workflow (if allowed by submission format)

## Screenshot Requirements

For each screenshot:
1. IBM Bob IDE must be clearly visible (not just a terminal)
2. The `ci-triage` mode should be active or visible in the UI
3. Remove any personally identifiable information before saving
4. **Never save screenshots containing API keys, tokens, or credentials**
5. File naming convention: `bob-session-YYYY-MM-DD-NNN.png`

## Reminder: Remove Credentials Before Upload

Before adding any Bob session export or screenshot to `bob_sessions/`:

- Check that no API keys, IBM Cloud keys, GitHub tokens, or personal access tokens are visible
- Check that no internal org names, private URLs, or confidential data are visible
- Check that no `.env` file contents are captured in screenshots
- When in doubt, redact or re-capture

## Suggested Bob Prompt for Generating the Remediation Report

Use this prompt in IBM Bob IDE with `ci-triage` mode active:

```
You are acting as a CI/CD remediation engineer. Analyze this repository and the CI failure artifacts exposed through the local read-only MCP tools. Identify the likely failure type, impacted files, probable root cause, safe remediation plan, recommended tests, merge confidence, risks, and unknowns. Do not auto-apply fixes. Produce a structured report compatible with data/bob-remediation-report.json.
```

## Setting Up the Local MCP Server for Bob IDE

1. Start the local MCP server: `npm run mcp:local-ci`
2. Bob IDE should pick up the MCP config from `.bob/mcp.json`
3. Verify Bob can access these tools: `list_ci_runs`, `get_ci_log`, `get_remediation_report`, `get_repo_context_summary`
4. Activate `ci-triage` mode from `.bob/custom_modes.yaml`

Note: If Bob IDE uses a different MCP config path or format, see `docs/mcp-design.md` for alternatives.

## Task Export Instructions

1. Complete the triage session in IBM Bob IDE
2. Export the task session report from Bob IDE (File → Export Session or equivalent)
3. Save the export file to `bob_sessions/` with a descriptive name:
   - `bob-session-ci-triage-[date].json` or `.html` depending on export format
4. Commit to the repository before final submission

## What Bob Analyzed

Bob IDE was used to:
- Develop the CI failure fixture scenario (payment status regression)
- Analyze the impacted files (`validatePaymentStatus.ts`, `checkout/route.ts`)
- Generate the structured remediation report (`data/bob-remediation-report.json`)
- Design the `ci-triage` custom mode instructions
- Review the dashboard UI for clarity and correctness
- Document the architecture and safety boundaries

This session history is the core evidence of IBM Bob IDE being used as a required project component.
