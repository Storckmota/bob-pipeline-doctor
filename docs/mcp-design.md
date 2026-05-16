# MCP Design — Local Read-Only CI Server

## Overview

Bob Pipeline Doctor uses a local read-only MCP (Model Context Protocol) server to expose controlled CI fixture data to IBM Bob IDE without requiring any external API calls, credentials, or network access.

## Implementation

**File:** `mcp/local-ci-server.mjs`
**Runtime:** Node.js (ES modules)
**Protocol:** MCP JSON-RPC 2.0 over stdio
**Dependencies:** None (no external packages required)

The server implements the MCP protocol manually over stdio using Node.js built-ins only. This avoids dependency complexity and keeps the server lightweight.

## Available Tools

| Tool Name | Description | Source File |
|-----------|-------------|-------------|
| `list_ci_runs` | Recent CI pipeline run history | `data/ci-runs.json` |
| `get_ci_log` | Full CI failure log output | `data/ci-failure.log` |
| `get_remediation_report` | Bob's structured remediation report | `data/bob-remediation-report.json` |
| `get_repo_context_summary` | Project and architecture summary | `PROJECT.md` + `ARCHITECTURE.md` |

## Running the Server

```bash
npm run mcp:local-ci
```

Or directly:

```bash
node mcp/local-ci-server.mjs
```

The server listens on stdin and responds to stdout. It is designed to be launched by Bob IDE via the MCP server config.

## Bob IDE Configuration

**File:** `.bob/mcp.json`

```json
{
  "mcpServers": {
    "local-ci": {
      "command": "node",
      "args": ["mcp/local-ci-server.mjs"]
    }
  }
}
```

This tells Bob IDE to launch the MCP server as a subprocess and communicate via stdio.

## Security Rules (enforced in implementation)

- No external API calls — all data comes from local files
- No credentials, tokens, or environment variables required
- No file writes — all tools are read-only
- No shell command execution from log content
- No arbitrary code evaluation
- All file paths are resolved relative to the project root
- No path traversal — only pre-defined data files are accessible

## Protocol Notes

The server implements the MCP protocol (version `2024-11-05`) with:

- `initialize` — handshake with capability negotiation
- `tools/list` — returns the four available tools with their schemas
- `tools/call` — executes the named tool and returns text content
- Notifications are accepted but produce no response (as per spec)
- Unknown methods return a JSON-RPC `-32601` error

## Alternative: Official MCP SDK

If IBM Bob IDE requires stricter MCP protocol compliance, the official `@modelcontextprotocol/sdk` package can be added:

```bash
npm install @modelcontextprotocol/sdk
```

And the server can be rewritten using the SDK's `Server` class. The tool definitions and read-only data access logic remain identical. The SDK is the only additional dependency allowed for MCP in this project.

The current manual implementation was chosen to avoid installation complexity and keep the demo runnable without additional setup.

## Uncertainty Notes

The exact MCP config format expected by IBM Bob IDE may differ from the `.bob/mcp.json` shown above. If Bob IDE uses a different config path or JSON structure, check the Bob IDE documentation for the correct MCP server configuration format.

Known uncertainties:
- Whether Bob IDE uses `.bob/mcp.json` or a global MCP config location
- Whether Bob IDE expects SSE (HTTP) or stdio transport for local MCP servers
- Whether the `initialize` handshake response format is compatible with Bob IDE's MCP client

If the stdio transport does not work with Bob IDE, an HTTP/SSE version of the server can be created. The tool logic (file reads) remains identical regardless of transport.

## Future: Real CI Integration

When extending beyond the MVP, the MCP server can be updated to:

1. Add authenticated tools that call GitHub Actions API
2. Add a `get_live_run_log` tool with a GitHub token from environment
3. Add CircleCI or Buildkite adapters using the same tool interface
4. The dashboard and Bob triage workflow require no changes — only the MCP server changes

The local fixture architecture was specifically designed to make this extension straightforward.
