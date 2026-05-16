# DESIGN.md — Bob Pipeline Doctor

## Brand Direction

**Style:** Dark devtool command-center
**Aesthetic:** Serious engineering diagnostic tool, not a SaaS landing page
**Reference feel:** Terminal output, IDE dark themes, structured incident dashboards

This is NOT a generic Next.js template. It is NOT a marketing page. It IS a tool a real on-call engineer would use at 2am when main is broken.

## Visual Principles

### Hierarchy
- Most critical information (failure status, root cause) is immediately visible
- Details are nested within cards — scannable, not overwhelming
- Color encodes severity: red = failure/high risk, yellow = caution/unknown, green = safe/passing

### Tone
- Technical but readable
- Precise, not verbose
- Every piece of text has a purpose
- No decorative filler content

### Layout
- Single column, max-width 6xl, centered
- Full-width cards for detailed content
- 2-column grid for comparative content (e.g., recommended tests vs. missing coverage)
- Sticky header for context at a glance while scrolling

## Color Palette

```
Background (page):     zinc-950  (#09090b)
Card background:       zinc-900  (#18181b)
Card border:           zinc-800  (#27272a)
Divider:               zinc-800  (#27272a)

Primary text:          zinc-100  (#f4f4f5)
Secondary text:        zinc-400  (#a1a1aa)
Muted text:            zinc-500  (#71717a)
Subtle text:           zinc-600  (#52525b)

Failure / High risk:   red-300   (#fca5a5)  on red-950 bg
Warning / Unknown:     yellow-200 (#fef08a) on yellow-950/20 bg
Safe / Passing:        green-300 (#86efac)  on green-950/40 bg
Info / Bob:            blue-300  (#93c5fd)  on blue-950/60 bg

Code / Commands:       green-300 (#86efac)  on zinc-950 bg
File paths:            blue-300  (#93c5fd)
Branch names:          yellow-300 (#fde047)
```

## Typography

- **Primary font:** Geist Mono (monospace) — everything reads like terminal output
- **Font sizes:** xs (12px) for labels/badges, sm (14px) for body, lg/xl only for the page title
- **Weights:** Regular for body, semibold for section titles and key values
- **Letter spacing:** `tracking-widest` for section label headers (uppercase micro-labels)
- **Line height:** `leading-relaxed` for multi-line descriptions

## Component System

### Cards
```
bg-zinc-900 border border-zinc-800 rounded-lg p-5
```
Primary container for all dashboard sections. No shadows (flat devtool style).

### Section Titles
```
LABEL TEXT ──────────────────
```
Uppercase, tracking-widest, zinc-100, followed by a full-width horizontal rule. Optional tag badge (run ID, count).

### Badges
```
STATUS    → colored bg + border + text, rounded, xs font-mono
RISK      → red/yellow/green based on level
PROVIDER  → zinc bg, zinc text (neutral)
```

### Status Indicators
```
● FAILED  → red dot + red text
● PASSED  → green dot + green text  
● RUNNING → blue dot + blue text
```

### Code Blocks
```
bg-zinc-950 border border-zinc-800 rounded p-3
$ command text in green-300 mono
```
Represents terminal/shell commands. Read-only indicator implied.

### Warning Banners
```
⚠ HUMAN REVIEW REQUIRED → orange-400 text, orange-950/20 bg, orange-900/40 border
```
Appears prominently above any action plan.

### Architecture Flow
```
[CI failure log] → [Local MCP] → [IBM Bob IDE] → [Report] → [Dashboard]
```
Rendered as pill-shaped labeled nodes with arrow separators. Each node has a distinct color matching its domain.

## Layout Sections (in order)

1. **Header** (sticky) — title, subtitle, 3 badge pills
2. **Pipeline Failure** — run metadata grid
3. **Failure Diagnosis** — type badge, summary, root cause highlight, evidence list
4. **Impacted Files** — 2-column file cards with risk badges
5. **Safe Remediation Plan** — warning banner, ordered steps, code block of safe commands
6. **Recommended Tests** — 2-column: recommended vs. missing coverage
7. **Merge Confidence** — circular score indicator, label, reasoning, unknowns
8. **IBM Bob Evidence** — mode, tools, session reminder, notes
9. **Recent CI Runs** — compact table of last N runs
10. **Architecture Strip** — data flow diagram (text-based)
11. **Safety Boundaries** — 6-cell grid of boundary guarantees
12. **Footer** — minimal attribution line

## Anti-Patterns to Avoid

- No gradients except very subtle `bg-opacity` tints for colored sections
- No decorative hero sections or marketing copy
- No random icons — only purposeful indicators (status dots, arrows, check marks)
- No chart libraries or SVG graphs
- No external images
- No animations (this is a diagnostic tool, not a product demo)
- No white backgrounds in any section
- No rounded-full large buttons that look like CTAs
- No "Learn more" links
- No padding that makes content feel like a landing page

## Responsive Behavior

- Mobile: single column, compact spacing
- Tablet: 2-column grids unlock for files, tests sections
- Desktop: full layout as designed
- No horizontal overflow for long file paths (break-all on code text)
- Table for CI runs is horizontally scrollable on small viewports
