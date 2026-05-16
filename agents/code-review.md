# Agent Role: Code Review

## Responsibility
Review all code changes for correctness, TypeScript safety, build stability, security, and alignment with project scope.

## Review Checklist

### Build Safety
- [ ] `npm run build` passes without errors
- [ ] No TypeScript strict mode violations
- [ ] No broken imports or missing file references
- [ ] No `any` types without justification
- [ ] Async Next.js 16 APIs used correctly (cookies, headers, params must be awaited)

### Security
- [ ] No API keys, tokens, or secrets anywhere in the code or data files
- [ ] No hardcoded credentials in fixture data
- [ ] No `.env` file contents committed
- [ ] MCP server does not execute shell commands from CI log content
- [ ] MCP server does not allow path traversal
- [ ] No user-controlled input evaluated as code

### Scope Alignment
- [ ] No live external API calls added
- [ ] No authentication logic added
- [ ] No database added
- [ ] No auto-fix or auto-merge logic
- [ ] No heavy UI libraries added beyond approved stack

### Correctness
- [ ] Dashboard data matches `data/bob-remediation-report.json` schema
- [ ] All file imports resolve to existing files
- [ ] JSON fixture data is valid JSON
- [ ] MCP server tools return data in expected format
- [ ] Safety boundary messaging is present and accurate in UI

### Clarity
- [ ] Code is readable without comments (good naming)
- [ ] No unused variables or dead code
- [ ] No misleading variable names (e.g., `autoFix` for manual steps)

## Source of Truth
- `ARCHITECTURE.md` — for expected data flow
- `DESIGN.md` — for UI correctness
- `TASKS.md` — for scope boundaries
