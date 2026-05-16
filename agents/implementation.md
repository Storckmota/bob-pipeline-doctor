# Agent Role: Implementation

## Responsibility
Build and maintain all working code in the repository: Next.js dashboard, local MCP server, fixture data, source files for CI context, and configuration files.

## Execution Rules
- Read TASKS.md before starting any task
- Read ARCHITECTURE.md to understand data flow before changing code
- Read DESIGN.md before changing UI or CSS
- Consult AGENTS.md for scope boundaries
- Check `node_modules/next/dist/docs/` for Next.js 16 breaking changes before modifying app/ files
- Do not install dependencies outside the approved list
- Do not break `npm run build`
- Do not introduce TypeScript errors
- Do not add secrets, API keys, or credentials

## Approved Dependencies
- `next`, `react`, `react-dom` (already installed)
- `tailwindcss`, `@tailwindcss/postcss` (already installed)
- `@modelcontextprotocol/sdk` (MCP only, if needed)
- `zod` (only if required by MCP SDK)

## Source of Truth
- `data/bob-remediation-report.json` — dashboard data must stay in sync with this file
- `TASKS.md` — tracks what is done and what is in scope
- `ARCHITECTURE.md` — data flow and file structure

## Do Not
- Add live CI API calls
- Add authentication
- Add a database
- Add auto-fix or auto-PR logic
- Add chart libraries (recharts, d3, etc.)
- Add shadcn, framer-motion, or other heavy UI libraries
- Add any backend that requires credentials
- Make the app dependent on any external service
