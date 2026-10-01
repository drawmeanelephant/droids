# Card 4 — k4o oracle map

Observation: 2026-10-01. Explore-only; no implementation, project-documentation,
issue, PR, or external writes. The only retained changes are this card's research
artifacts. Fresh snapshots lived in `/tmp/k4o-study.D6RccH`.

## Where we are

**The planned backend has already shipped.** The inspected main snapshot is
[`59f88233589d2643ba5b4f380e3db70664bba2b3`](https://github.com/drawmeanelephant/k4o/commit/59f88233589d2643ba5b4f380e3db70664bba2b3).
CommonMark merged in [PR #18](https://github.com/drawmeanelephant/k4o/pull/18)
at `c31abbfb3122941954b8c6ba77116ec5664c1f97` (03:18:47Z);
opt-in GFM tables merged in [PR #20](https://github.com/drawmeanelephant/k4o/pull/20)
at the inspected SHA (11:02:51Z), closing
[#19](https://github.com/drawmeanelephant/k4o/issues/19).
Creating another backend/GFM issue would duplicate completed work.

**Reference identity — source inspection and executed version check.**
This is npm **`knap@0.6.0` from Obsidian's `obsidianmd/knap`**, not an unrelated
similarly named package and not an unpinned `npx` installation. Its published
manifest names Obsidian and that repository. The project's
[lockfile](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/tools/differential/package-lock.json#L21-L36)
pins the tarball, integrity digest, and `dayjs@1.11.23`; the harness
[requires CLI version 0.6.0](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/tools/differential/run.py#L142-L149).
Local execution printed `0.6.0` on Node `v22.23.2`.
The documented upstream source revision
`6395cb8b5432b3c3495eab43c10b0d637e021592` is a **documentation pin**, not a
claim that this study established the npm tarball's exact source commit.
See [upstream README](https://github.com/obsidianmd/knap/blob/6395cb8b5432b3c3495eab43c10b0d637e021592/README.md)
and the [clean-room record](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/README.md#L404-L420).

**How Textile is emitted — source inspection.**
One parser/data evaluator dispatches a shared fifteen-name filter registry.
The normal engine default remains Textile; the CLI also explicitly defaults
to Textile. Format-specific emitters produce `hN.`, `*bold*`, `_italic_`,
`@code@`, `bc.`, `bq.`, `"label":url`, repeated list markers, and first-row
`_.` table cells. Textile input remains fragment-oriented; Markdown/GFM phrase
filters escape data while preserving earlier filter markup.
Receipts: [engine defaults and API](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/engine.zig#L14-L57),
[filter emitters](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/filters.zig#L60-L175),
[registry and format contract](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/README.md#L213-L249).

## What's improved

**Evidenced earlier state:** at
[`942ebf32ed89eca8d195b04068118a9ee62706c6`](https://github.com/drawmeanelephant/k4o/blob/942ebf32ed89eca8d195b04068118a9ee62706c6/README.md#L5-L20),
the product was Textile-only. PR #18 added runtime CommonMark, a pinned oracle,
Markdown fixtures, Oliver structural checks, and differential CI. PR #20
moved two tables into GFM parity, reducing documented fixture exclusions from
13 to 11. GFM intentionally follows the measured empty-header, single-hyphen
oracle form, not the initial issue's requested first-row header. These are
merged changes, not this card's recommendations.

**Executed checks in fresh scratch:**

- Built the inspected k4o and CI-pinned Oliver
  `a45aa5ede557ea7cf7de727bdba61c1f80af544b` with Zig `0.16.0`, ReleaseSafe.
  Oliver printed `1.1.0` with that exact embedded commit.
- Installed locked trusted npm packages with lifecycle scripts disabled.
  Reviewed the project build files, execution harness, emitters, CLI, and
  published package manifest before execution. Did **not** read Knap's
  TypeScript/compiled implementation; preserved the project's black-box
  clean-room boundary.
- Unmodified differential harness: **99 cases passed; 75 byte-identical
  oracle checks, including two GFM tables; 11 documented fixture
  incompatibilities**. This is the harness's measured accounting, not
  whole-language parity.
- Additional exploratory corpus: **52 executions per program; 25 matching
  stdout/exit-status pairs; 27 differing pairs**. All 52 oracle calls
  succeeded; k4o succeeded on 48 and rejected four documented subset inputs.
  All 100 successful outputs were rendered by pinned Oliver with raw HTML
  allowed. The 27 differences are **not** 27 defects.
- GitHub [current-SHA CI](https://github.com/drawmeanelephant/k4o/actions/runs/36852901288)
  reported success for both OS differential jobs, both build/test jobs, and
  verification. This is API-observed CI evidence, separate from local checks.

`measured-cases.json` records exact inputs, context data, both templates when
adaptation is required, stdout/stderr/status, and actual Oliver HTML. Original
compatible cases are separately retained in `baseline-cases.json`.

## What's next

Three deduplicated, reproduced candidates, drafted but **not filed**:

1. Code-boundary rendering: empty `code` emits visible backticks; all-space
   `code` grows three spaces to five; a terminal-newline `codeblock` adds an
   extra rendered blank line.
2. Ordered-list child indentation after parent item 10 is too narrow:
   Oliver renders eleven siblings instead of nesting the child under item 10.
3. Escaping misses ordered-list markers inside scalar list items:
   `"1. numbered"` becomes an actual nested ordered list, unlike escaped
   heading/blockquote/thematic-break text.

See `issue-drafts.md` for executable inputs, exact outputs, source anchors,
acceptance criteria, and non-goals. All ten non-PR issues and ten PRs returned
by the complete one-page inventory were inspected; all were closed. No open
issues were returned by a separate fresh query. Existing #19/#20 cover shipped
GFM work, #18 covers the backend, and #6 covers structured interpolation;
none covers these three rendering defects. `evidence.json` retains the
inventory and relevant PR/CI receipts.

Other differences must stay explicitly classified: phrase/newline rejection,
three-level list depth, link direction and filter aliases, raw markup versus
escaped filter data, HTML versus pipe tables, and loop whitespace. In
particular, exact oracle output can itself render undesirable structure.
Do not expand the compatible-byte gate by silently normalizing inputs.

### Gaps and attribution

- Eight additional cases are **proposed, unexecuted**, with null expectations
  in `proposed-cases.json`. No GFM-aware renderer was run; Oliver checks here
  establish strict CommonMark behavior only. Raw HTML was allowed for the
  exploratory parse, not a safety certification.
- This is a bounded corpus map, not full Knap/CommonMark conformance or a
  production security review. No independent Textile renderer was run.
- No `AGENTS.md` existed anywhere in either fresh project snapshot. The
  parent study contract and k4o's documented clean-room boundary governed.
- Factory co-authorship is explicit on the
  [CommonMark commit](https://github.com/drawmeanelephant/k4o/commit/1a8761fb5d3166c8629d04542587aa6b78ee9771)
  and [GFM commit](https://github.com/drawmeanelephant/k4o/commit/31dc815375a4a3b1e6e405fe92884a7b21206422).
  That establishes recorded collaboration, not which model did those runs.
  This card was a Factory research worker; no Luna/Sol historical routing,
  owner experience, or backend implementation is inferred.
