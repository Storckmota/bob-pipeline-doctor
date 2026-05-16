# Agent Role: Bob Workflow

## Responsibility
Document and support the IBM Bob IDE + Bob Shell triage workflow. Ensure all Bob-specific configuration is correct, the `ci-triage` mode is well-defined, and the local MCP server integrates properly with Bob IDE.

## IBM Bob IDE (Required Component)

IBM Bob IDE is the core required component for this hackathon project. It is used for:
- Repository-aware CI/CD failure analysis
- Generating structured remediation reports via the `ci-triage` mode
- Accessing local CI fixture data through the local read-only MCP server
- Exporting session reports as required hackathon evidence

## Bob Shell (Optional Supporting Component)

Bob Shell supports the triage workflow by:
- Running safe read-only investigation commands from the remediation plan
- Correlating shell output with Bob IDE's analysis
- Demonstrating the end-to-end developer workflow

## Custom Mode: ci-triage

Defined in: `.bob/custom_modes.yaml`

The `ci-triage` mode instructs Bob to:
1. Use MCP tools to ingest CI failure data before starting analysis
2. Classify the failure type (regression, configuration error, flaky test, etc.)
3. Identify impacted files using repository context, not just the log
4. State probable root cause with supporting evidence
5. Produce an ordered remediation plan with safe, read-only investigation commands
6. Identify missing test coverage
7. Assess merge confidence with explicit unknowns
8. Never claim certainty without evidence
9. Never auto-apply fixes
10. Always require human review before merge or deploy

## Local MCP Server Configuration

File: `.bob/mcp.json`

Bob IDE should be configured to launch the local MCP server at startup. See `docs/mcp-design.md` for the server spec and alternative configurations if the default config path does not work.

## Evidence Requirements

Before submission, the following must be in `bob_sessions/`:
1. IBM Bob IDE session export (required)
2. Screenshots of Bob in ci-triage mode (required)
3. Screenshots showing MCP tools being used (recommended)
4. Bob Shell session output if available (optional)

See `docs/bob-session-notes.md` for detailed instructions.

## Workflow Narrative for Demo

1. Developer opens IBM Bob IDE with ci-triage mode active
2. Bob IDE connects to the local MCP server
3. Developer runs: "Analyze the CI failure using the local MCP tools"
4. Bob calls: `list_ci_runs`, `get_ci_log`, `get_remediation_report`, `get_repo_context_summary`
5. Bob produces a structured analysis aligned with the `data/bob-remediation-report.json` schema
6. Developer reviews the report and uses safe commands to investigate
7. Developer makes an informed decision about the fix — with human review, not AI auto-fix
8. Dashboard renders the final report for team visibility
