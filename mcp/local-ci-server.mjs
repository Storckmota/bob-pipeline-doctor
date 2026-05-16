#!/usr/bin/env node
/**
 * Local Read-Only MCP Server — Bob Pipeline Doctor
 *
 * Implements the MCP JSON-RPC 2.0 protocol over stdio.
 * Exposes four read-only tools for IBM Bob IDE ci-triage mode.
 *
 * No external dependencies. No API calls. No credentials required.
 * All data is read from local fixture files.
 *
 * Run: node mcp/local-ci-server.mjs
 * Or:  npm run mcp:local-ci
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const DATA = {
  "ci-runs.json": () => readFileSync(join(ROOT, "data", "ci-runs.json"), "utf8"),
  "ci-failure.log": () => readFileSync(join(ROOT, "data", "ci-failure.log"), "utf8"),
  "bob-remediation-report.json": () =>
    readFileSync(join(ROOT, "data", "bob-remediation-report.json"), "utf8"),
};

const TOOLS = [
  {
    name: "list_ci_runs",
    description:
      "Returns a list of recent CI pipeline runs from local fixtures (data/ci-runs.json)",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_ci_log",
    description:
      "Returns the full CI failure log from the controlled fixture (data/ci-failure.log)",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_remediation_report",
    description:
      "Returns the structured Bob remediation report for the current CI failure (data/bob-remediation-report.json)",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_repo_context_summary",
    description:
      "Returns a combined project and architecture summary from PROJECT.md and ARCHITECTURE.md",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
];

function callTool(name) {
  switch (name) {
    case "list_ci_runs":
      return { content: [{ type: "text", text: DATA["ci-runs.json"]() }] };

    case "get_ci_log":
      return { content: [{ type: "text", text: DATA["ci-failure.log"]() }] };

    case "get_remediation_report":
      return {
        content: [{ type: "text", text: DATA["bob-remediation-report.json"]() }],
      };

    case "get_repo_context_summary": {
      let project = "";
      let arch = "";
      try {
        project = readFileSync(join(ROOT, "PROJECT.md"), "utf8");
      } catch {
        project = "(PROJECT.md not found)";
      }
      try {
        arch = readFileSync(join(ROOT, "ARCHITECTURE.md"), "utf8");
      } catch {
        arch = "(ARCHITECTURE.md not found)";
      }
      const summary =
        "# Repo Context Summary\n\n## PROJECT.md\n\n" +
        project +
        "\n\n---\n\n## ARCHITECTURE.md\n\n" +
        arch;
      return { content: [{ type: "text", text: summary }] };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function respond(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
}

function respondError(id, code, message) {
  process.stdout.write(
    JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } }) + "\n"
  );
}

let buffer = "";

process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => {
  buffer += chunk;
  const lines = buffer.split("\n");
  buffer = lines.pop() ?? "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let request;
    try {
      request = JSON.parse(trimmed);
    } catch {
      respondError(null, -32700, "Parse error");
      continue;
    }

    const { id, method, params } = request;

    if (method === "initialize") {
      respond(id, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "local-ci-server", version: "1.0.0" },
      });
    } else if (method === "notifications/initialized") {
      // Notification — no response required
    } else if (method === "tools/list") {
      respond(id, { tools: TOOLS });
    } else if (method === "tools/call") {
      const toolName = params?.name;
      try {
        const result = callTool(toolName);
        respond(id, result);
      } catch (err) {
        respondError(id, -32603, err instanceof Error ? err.message : String(err));
      }
    } else if (typeof method === "string" && method.startsWith("notifications/")) {
      // Other notifications — no response required
    } else {
      respondError(id, -32601, `Method not found: ${method}`);
    }
  }
});

process.stdin.on("end", () => {
  process.exit(0);
});
