import type { ReactNode } from "react";
import reportData from "@/data/bob-remediation-report.json";
import ciRunsData from "@/data/ci-runs.json";

function Badge({
  children,
  variant = "neutral",
}: {
  children: ReactNode;
  variant?: "neutral" | "failure" | "warning" | "success" | "info";
}) {
  const styles = {
    neutral: "bg-zinc-800 text-zinc-300 border-zinc-700",
    failure: "bg-red-950 text-red-300 border-red-800",
    warning: "bg-yellow-950 text-yellow-300 border-yellow-800",
    success: "bg-green-950 text-green-300 border-green-800",
    info: "bg-blue-950 text-blue-300 border-blue-800",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const dotColor =
    status === "failed"
      ? "bg-red-400"
      : status === "passed"
        ? "bg-green-400"
        : "bg-blue-400";
  const variant =
    status === "failed"
      ? "failure"
      : status === "passed"
        ? "success"
        : ("neutral" as const);
  return (
    <Badge variant={variant}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${dotColor}`} />
      {status.toUpperCase()}
    </Badge>
  );
}

function RiskBadge({ level }: { level: string }) {
  const variant =
    level === "high"
      ? "failure"
      : level === "medium"
        ? "warning"
        : ("success" as const);
  return <Badge variant={variant}>{level.toUpperCase()}</Badge>;
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-lg p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({
  label,
  tag,
}: {
  label: string;
  tag?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-zinc-100 font-mono font-semibold text-xs tracking-widest uppercase shrink-0">
        {label}
      </h2>
      {tag && (
        <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-500 text-xs font-mono">
          {tag}
        </span>
      )}
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-zinc-500 text-xs mb-1 uppercase tracking-wide">{label}</p>
      <div className="text-zinc-200 text-sm">{children}</div>
    </div>
  );
}

export default function Home() {
  const report = reportData;
  const ciRuns = ciRunsData;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200 font-mono">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="border-b border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-950/95 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-lg font-bold leading-none shadow-lg shadow-cyan-500/10">
              !
            </div>
            <div>
              <h1 className="text-zinc-100 font-bold text-lg tracking-tight">
                Bob Pipeline Doctor
              </h1>
              <p className="text-zinc-400 text-xs">
                CI/CD failure triage powered by <span className="text-cyan-400">IBM Bob</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="info">IBM Bob IDE — core workflow</Badge>
            <Badge variant="neutral">Local read-only MCP</Badge>
            <Badge variant="neutral">Controlled CI fixture</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-8 space-y-10">

        {/* ── How This Works ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader label="How This Works" />
          <Card className="bg-gradient-to-br from-blue-950/30 to-violet-950/20 border-blue-900/40">
            <div className="space-y-4">
              <p className="text-zinc-300 text-sm leading-relaxed">
                This dashboard renders a structured CI failure analysis produced by <span className="text-cyan-400 font-semibold">IBM Bob IDE</span> using repository context and a local read-only MCP server.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg shrink-0">1</span>
                  <div>
                    <p className="text-zinc-200 text-sm font-semibold mb-1">CI Failure Captured</p>
                    <p className="text-zinc-400 text-xs">Controlled GitHub Actions failure fixture stored locally</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg shrink-0">2</span>
                  <div>
                    <p className="text-zinc-200 text-sm font-semibold mb-1">Local MCP Exposes Artifacts</p>
                    <p className="text-zinc-400 text-xs">Read-only MCP server provides CI data to Bob IDE</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg shrink-0">3</span>
                  <div>
                    <p className="text-zinc-200 text-sm font-semibold mb-1">IBM Bob Analyzes Context</p>
                    <p className="text-zinc-400 text-xs">Bob correlates log, repo files, and test output</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold text-lg shrink-0">4</span>
                  <div>
                    <p className="text-zinc-200 text-sm font-semibold mb-1">Dashboard Renders Plan</p>
                    <p className="text-zinc-400 text-xs">Structured remediation with human review required</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-blue-900/40 pt-4 mt-4">
                <p className="text-blue-300 text-xs font-semibold mb-2">📋 For Judging</p>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Exported IBM Bob IDE task reports and screenshots must be added to <span className="text-cyan-400 font-mono">/bob_sessions</span> before final submission. See <span className="text-blue-300">docs/bob-session-notes.md</span> for capture instructions.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ── Pipeline Failure Summary ───────────────────────────────────── */}
        <section>
          <SectionHeader label="Pipeline Failure" tag={report.run.id} />
          <Card>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              <Field label="Provider">{report.run.provider}</Field>
              <Field label="Workflow">
                <span className="text-zinc-200">{report.run.workflow}</span>
              </Field>
              <Field label="Status">
                <StatusBadge status={report.run.status} />
              </Field>
              <Field label="Branch">
                <span className="text-yellow-300 font-mono">{report.run.branch}</span>
              </Field>
              <Field label="Commit">
                <span className="text-blue-300 font-mono">{report.run.commit}</span>
              </Field>
              <Field label="Failed Step">
                <span className="text-red-300 font-mono">{report.run.failedStep}</span>
              </Field>
              <div className="col-span-2 md:col-span-3">
                <Field label="Timestamp">
                  <span className="text-zinc-400 font-mono text-xs">
                    {report.run.timestamp}
                  </span>
                </Field>
              </div>
            </div>
          </Card>
        </section>

        {/* ── Failure Diagnosis ─────────────────────────────────────────── */}
        <section>
          <SectionHeader label="Failure Diagnosis" />
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="failure">{report.failure.type.toUpperCase()}</Badge>
              <span className="text-zinc-500 text-xs">Failure type</span>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed mb-5">
              {report.failure.summary}
            </p>
            <div className="mb-5">
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
                Probable Root Cause
              </p>
              <div className="bg-yellow-950/20 border border-yellow-900/40 rounded p-3">
                <p className="text-yellow-200 text-sm leading-relaxed">
                  {report.failure.probableRootCause}
                </p>
              </div>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
                Evidence
              </p>
              <ul className="space-y-2">
                {report.failure.evidence.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-zinc-600 mt-0.5 shrink-0">→</span>
                    <span className="text-zinc-400 text-xs font-mono">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </section>

        {/* ── Impacted Files ────────────────────────────────────────────── */}
        <section>
          <SectionHeader
            label="Impacted Files"
            tag={`${report.impact.files.length} files · risk: ${report.impact.riskLevel}`}
          />
          <div className="grid gap-3 md:grid-cols-2">
            {report.impact.files.map((file, i) => (
              <Card key={i} className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-blue-300 text-xs font-mono break-all">{file.path}</p>
                  <RiskBadge level={file.risk} />
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">{file.reason}</p>
              </Card>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-zinc-500 text-xs">Affected systems:</span>
            {report.impact.systems.map((sys, i) => (
              <Badge key={i} variant="neutral">{sys}</Badge>
            ))}
          </div>
        </section>

        {/* ── Safe Remediation Plan ─────────────────────────────────────── */}
        <section>
          <SectionHeader label="Safe Remediation Plan" />
          <Card>
            <div className="flex items-center gap-2 mb-5 px-3 py-2 bg-orange-950/20 border border-orange-900/40 rounded">
              <span className="text-orange-400 text-xs font-mono">
                ⚠ HUMAN REVIEW REQUIRED BEFORE MERGE / DEPLOY
              </span>
            </div>
            <ol className="space-y-3 mb-6">
              {report.remediation.plan.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-zinc-600 font-mono text-xs mt-0.5 w-5 shrink-0">
                    {i + 1}.
                  </span>
                  <span className="text-zinc-300 text-sm leading-relaxed">
                    {step.replace(/^\d+\.\s/, "")}
                  </span>
                </li>
              ))}
            </ol>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
                Safe Commands — Read-Only Investigation
              </p>
              <div className="bg-zinc-950 border border-zinc-800 rounded p-4 space-y-1.5">
                {report.remediation.safeCommands.map((cmd, i) => (
                  <p key={i} className="text-green-300 text-xs font-mono">
                    $ {cmd}
                  </p>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* ── Recommended Tests ─────────────────────────────────────────── */}
        <section>
          <SectionHeader label="Recommended Tests" />
          <div className="grid md:grid-cols-2 gap-3">
            <Card>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">
                Add These Tests
              </p>
              <ul className="space-y-2.5">
                {report.tests.recommended.map((test, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 text-xs mt-0.5 shrink-0">+</span>
                    <span className="text-zinc-300 text-xs leading-relaxed">{test}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">
                Missing Coverage
              </p>
              <ul className="space-y-2.5">
                {report.tests.missingCoverage.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 text-xs mt-0.5 shrink-0">✗</span>
                    <span className="text-zinc-300 text-xs leading-relaxed">{gap}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* ── Merge Confidence ──────────────────────────────────────────── */}
        <section>
          <SectionHeader label="Merge Confidence / Release Readiness" />
          <Card>
            <div className="flex items-start gap-5 mb-5">
              <div className="shrink-0 text-center">
                <div className="w-16 h-16 rounded-full border-4 border-red-700/70 bg-red-950/30 flex items-center justify-center">
                  <span className="text-red-300 text-2xl font-bold font-mono">
                    {report.mergeConfidence.score}
                  </span>
                </div>
                <p className="text-zinc-600 text-xs mt-1">/ 10</p>
              </div>
              <div className="flex-1">
                <p className="text-red-300 font-mono font-semibold text-sm mb-2">
                  {report.mergeConfidence.label}
                </p>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {report.mergeConfidence.reasoning}
                </p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
                Unknowns
              </p>
              <ul className="space-y-2">
                {report.mergeConfidence.unknowns.map((unknown, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-600 text-xs mt-0.5 shrink-0">?</span>
                    <span className="text-zinc-400 text-xs">{unknown}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-zinc-600 text-xs italic border-t border-zinc-800 pt-3 mt-3">
              Score is an informed estimate, not a guarantee. Human review determines merge readiness.
            </p>
          </Card>
        </section>

        {/* ── IBM Bob Evidence ──────────────────────────────────────────── */}
        <section>
          <SectionHeader label="IBM Bob Evidence" />
          <Card>
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <Field label="Bob Mode">
                <Badge variant="info">{report.bobEvidence.mode}</Badge>
              </Field>
              <Field label="Session Report">
                {report.bobEvidence.sessionReportExpected ? (
                  <Badge variant="warning">Expected → bob_sessions/</Badge>
                ) : (
                  <Badge variant="neutral">Not required</Badge>
                )}
              </Field>
            </div>
            <div className="mb-5">
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
                MCP Tools Used
              </p>
              <div className="flex flex-wrap gap-2">
                {report.bobEvidence.mcpToolsUsed.map((tool, i) => (
                  <Badge key={i} variant="neutral">{tool}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">
                Notes
              </p>
              <ul className="space-y-2">
                {report.bobEvidence.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 text-xs mt-0.5 shrink-0">→</span>
                    <span className="text-zinc-400 text-xs leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </section>

        {/* ── Recent CI Runs ────────────────────────────────────────────── */}
        <section>
          <SectionHeader label="Recent CI Runs" tag={`${ciRuns.length} runs`} />
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-left">
                    <th className="px-5 py-3 font-medium">Run ID</th>
                    <th className="px-5 py-3 font-medium">Branch</th>
                    <th className="px-5 py-3 font-medium">Commit</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Duration</th>
                    <th className="px-5 py-3 font-medium">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {ciRuns.map((run, i) => (
                    <tr
                      key={i}
                      className={`border-b border-zinc-900 last:border-0 ${
                        run.status === "failed" ? "bg-red-950/10" : ""
                      }`}
                    >
                      <td className="px-5 py-3 text-zinc-400">{run.id}</td>
                      <td className="px-5 py-3 text-yellow-300 max-w-[160px] truncate">
                        {run.branch}
                      </td>
                      <td className="px-5 py-3 text-blue-300">{run.commit}</td>
                      <td className="px-5 py-3">
                        <StatusBadge status={run.status} />
                      </td>
                      <td className="px-5 py-3 text-zinc-400">{run.duration}</td>
                      <td className="px-5 py-3 text-zinc-500">{run.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* ── Architecture Strip ────────────────────────────────────────── */}
        <section>
          <SectionHeader label="Architecture" />
          <Card>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">
              Data Flow
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {(
                [
                  {
                    label: "CI failure log",
                    color: "bg-red-950/40 border-red-800/60 text-red-300",
                  },
                  {
                    label: "Local read-only MCP",
                    color: "bg-zinc-800 border-zinc-700 text-zinc-300",
                  },
                  {
                    label: "IBM Bob IDE / Shell",
                    color: "bg-blue-950/60 border-blue-800/60 text-blue-300",
                  },
                  {
                    label: "Structured report",
                    color: "bg-zinc-800 border-zinc-700 text-zinc-300",
                  },
                  {
                    label: "Dashboard",
                    color: "bg-green-950/40 border-green-800/60 text-green-300",
                  },
                ] as { label: string; color: string }[]
              ).map((step, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`px-3 py-1.5 rounded border ${step.color}`}>
                    {step.label}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-zinc-600">→</span>
                  )}
                </div>
              ))}
            </div>
            <ul className="mt-4 space-y-1 text-zinc-600 text-xs">
              <li>→ All data sourced from controlled local fixtures — no external API calls</li>
              <li>→ Reproducible, credential-free, safe for public repositories</li>
              <li>→ Architecture maps cleanly to future real CI integrations</li>
            </ul>
          </Card>
        </section>

        {/* ── Safety Boundaries ─────────────────────────────────────────── */}
        <section>
          <SectionHeader label="Safety Boundaries" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {(
              [
                {
                  label: "No credentials",
                  desc: "No API keys, tokens, or secrets anywhere in the repo",
                },
                {
                  label: "No live API access",
                  desc: "No external GitHub Actions, CircleCI, or Buildkite API calls",
                },
                {
                  label: "No auto-fix",
                  desc: "All code changes require a human engineer decision",
                },
                {
                  label: "No auto-deploy",
                  desc: "No deployment automation of any kind",
                },
                {
                  label: "Read-only MCP",
                  desc: "MCP server reads local fixture files only — no write operations",
                },
                {
                  label: "Human review required",
                  desc: "Merge confidence is an estimate. Human review determines readiness.",
                },
              ] as { label: string; desc: string }[]
            ).map((b, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded p-3"
              >
                <p className="text-zinc-200 text-xs font-mono font-semibold mb-1">
                  ✓ {b.label}
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer className="border-t border-zinc-800 pt-5 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <p className="text-zinc-600 text-xs font-mono">
              Bob Pipeline Doctor — IBM Bob Hackathon MVP
            </p>
            <p className="text-zinc-600 text-xs font-mono">
              IBM Bob IDE is the core required component ·{" "}
              <span className="text-zinc-500">bob_sessions/ for evidence</span>
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}
