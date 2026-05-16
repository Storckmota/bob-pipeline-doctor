# Agent Role: UX / UI Review

## Responsibility
Review the dashboard UI for visual correctness, demo readiness, and alignment with the DESIGN.md spec.

## Review Checklist

### Design Alignment
- [ ] Background is dark (zinc-950) — not white, not gray-100
- [ ] Cards use zinc-900 bg with zinc-800 borders
- [ ] Text hierarchy: primary zinc-100, secondary zinc-400, muted zinc-500/600
- [ ] Failure states use red palette
- [ ] Warnings and unknowns use yellow palette
- [ ] Safe commands and passing states use green palette
- [ ] IBM Bob / info uses blue palette
- [ ] All text is legible against dark backgrounds
- [ ] No white sections, no bright gradients, no marketing-style sections

### Content Completeness
- [ ] Header shows title, subtitle, and 3 badge pills
- [ ] Pipeline Failure section shows all run metadata fields
- [ ] Failure Diagnosis shows type, summary, root cause, evidence
- [ ] Impacted Files shows all files with risk badges and reasons
- [ ] Safe Remediation Plan has HUMAN REVIEW REQUIRED banner
- [ ] Remediation plan shows ordered steps and safe commands code block
- [ ] Recommended Tests shows both recommended and missing coverage
- [ ] Merge Confidence shows score, label, reasoning, and unknowns
- [ ] IBM Bob Evidence shows mode, tools used, session reminder, notes
- [ ] Recent CI Runs table shows all runs
- [ ] Architecture Strip shows data flow
- [ ] Safety Boundaries section present

### Demo Readiness
- [ ] Dashboard is scannable at a glance (judges can see key info quickly)
- [ ] Most important info (failure, root cause) is above the fold
- [ ] Human review required is communicated prominently
- [ ] IBM Bob IDE is mentioned as the core required component
- [ ] No placeholder text ("Lorem ipsum", "TODO", "Coming soon")
- [ ] No broken layout on desktop viewport

### Anti-Pattern Check
- [ ] No chart libraries used
- [ ] No external images required
- [ ] No animations or transitions
- [ ] No rounded-full large CTAs
- [ ] No marketing copy
- [ ] No "Learn more" or "Get started" links
- [ ] Does not look like create-next-app default template
