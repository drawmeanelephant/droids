# Execution ledger

The research-phase record below predates PR packaging. Its no-commit
and no-push statements describe that phase, not a prohibition after
the owner subsequently requested a PR.

## Method

The owner supplied eleven cards on 2026-10-01. All eleven workers were
launched in one dispatch, independently, with no cross-card prerequisites.
The coordinating agent reserved issue creation and blog integration.
The workers received the [study contract](00-study-contract.md).

The requested portfolio was two design cards and nine bounded audits.
The session model is GPT-6.1 Sol; the workers inherit that session model.
Task shape is not evidence of a Luna run. This study records no measured
token cost, savings, comparative benchmark, or historical model routing.

## Dispatch

| Card | Concern | Worker session |
|---|---|---|
| 1 | Boris social-card design | `301cf4ec-6532-4e32-95cc-71981f3af8ce` |
| 2 | VirelaiOS identity-proof design | `318cc6d3-08a8-4a7d-8866-df1c150f058a` |
| 3 | fart-app demo-e2e audit | `0e5d37a6-2e79-44a7-a748-7617bff1ab03` |
| 4 | k4o oracle corpus | `8ab16db3-31dd-46bc-8c22-12b7d70ff878` |
| 5 | Virelai Sans glyph inventory | `1b04dab8-8ab5-463a-ad1b-f9c0b53d2fa4` |
| 6 | la-famille retrieval closure | `4fa65527-3828-4d95-84c6-1dace52da619` |
| 7 | NINJAM janitor audit | `7dd871df-d34a-45ad-a629-4ad49a6b5b39` |
| 8 | BANAL Command-Delete survey | `ff5d37d8-ab4b-47b3-ab7c-0143eef9a6b3` |
| 9 | Oliver conformance fuzzing | `f0ca9974-cdde-4d70-9e1b-b1218d93c3be` |
| 10 | atmosplorer vendor diagnosis | `572acef5-689c-40c3-af5d-ff82e99e8d23` |
| 11 | Empire documentation and issue hygiene | `fea00cbf-7120-47a1-810b-21c12d711097` |

## Coordinator preflight

- The GitHub connector was not among the organization's offered
  connectors. Authenticated GitHub CLI access was available.
- The repository inventory was captured in
  [repos-2026-10-01.json](repos-2026-10-01.json).
- All ten files listed in the Boris agent kit's `SHA256SUMS` passed
  checksum verification.
- The unmodified site corpus was exported with
  `./boris-agent-kit/bin/boris build --input content --rag --complete`:
  23 content pages and 27 catalog entries. The retrieval map and
  relevant source pages were read before series integration.
- Boris 0.8.2 passed the zero-write validation command after the study
  contract was added. Markdown evidence inside the page's `.assets`
  directory did not become content-graph pages.

These are coordinator observations, not upstream product test results.

## Completed integration

All eleven workers returned their required reports, issue decisions,
and three-act drafts. The two design cards also returned substantive
design documents. The source [findings map](README.md) links each card.

The coordinator filed fifteen deduplicated follow-ups across ten
repositories. Each posted issue was read back: title, URL, open state,
and full body matched its prepared source. Receipts:
[filing ledger](filed-issues.json),
[verification](issue-verification.json), and [posted bodies](issues/).
No existing issue was closed, reopened, or commented on.

Twelve narrative posts and one October month hub are explicitly draft.
No commit, push, implementation PR, merge, remote CI rerun, deployment,
or publication was performed. The existing tracked files and Git index
remain unchanged; only new study source is present.

## Final validation

The repository's full commands exited 0:

```sh
boris validate --input content --theme lab \
  --layout-rule default id:index lab/layouts/trunk.html --static-dir static

boris build --input content --html-dir dist \
  --theme lab --sitemap --site-url https://droids.filed.fyi/ \
  --layout-rule default id:index lab/layouts/trunk.html --static-dir static

./boris-agent-kit/bin/boris check --input content
```

- All thirteen new page outputs exist at their expected `dist/log/`
  paths. Local HTML previews include drafts; they are not approved
  deployment artifacts.
- The twelve posts have legal frontmatter and all three acts.
- The study is absent from search and sitemap. Twenty-one existing
  non-draft page outputs contain no study links.
- An initial isolation assertion failed because optional draft
  `relations` appeared in existing project-page backlinks. Those seven
  relations were removed, ordinary project wiki links retained, and the
  build and isolation checks rerun successfully. No compiler change was
  made.
- Graph check reports 36 pages, zero hotspots, and three pre-existing
  unreferenced pages: `index` and the two September empty-repo drafts.
  They remain unchanged.
- Retained replay scripts passed Python AST parsing, shell syntax, and
  CLI-help checks. All attachment JSON/JSONL parses; corpus schemas and
  local Markdown destinations were checked. Executed corpus campaigns
  and project tests are detailed in the card reports, not rerun wholesale
  by the coordinator.
- Raw support moved only to the ignored
  `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/` subtree. All moved
  files retain their recorded SHA256 values. No raw support is staged
  or tracked.
- A bounded credential-pattern scan found no private-key, GitHub-token,
  or AWS-access-key-shaped values in the retained attachments/posts.
  This is not a full security audit.
- No edits to the kit, its checksums/manifest, theme, CI, or publication
  configuration. No publication dates or status values were flipped
  on existing pages.

[Machine-readable validation](validation.json) records the output,
discovery, deliverable, and filing assertions.

## Remaining limits

M87 physical placement is still unverified. Real-model dense uplift and
production timings, live-browser/app behavior, and unexecuted corpus
proposals remain gaps where their reports say so. The social-card
design's X-specific numeric constraints need confirmation. No limitation
was turned into a claimed success or silently retested by inference.

## Owner-requested PR packaging

After the study, the owner requested a PR and a cutesy, performative
work-in-public frame. The overview now proposes a small recurring
report-card ritual without inventing a publishing cadence or changing
the measured findings.

The owner explicitly approved including findings from private
`virelai-sans` and `redesigned-dollop` in this public source PR.
Private source links are labeled; repository visibility is unchanged.
Raw captures remain ignored and excluded.

The branch was brought up to `main` at
`399e93109108990772b5da0ff4b2fbc2d01bb7bf`, preserving its existing
Manila theme, workflows, and instructions. This is branch synchronization,
not a redesign by the study. The draft PR targets `main`; it must not
enable auto-merge, merge, dispatch deployment, or change draft statuses.
Updated-theme validation belongs to the PR packaging record.

[PR validation](pr-validation.json) records fresh Manila validation,
full HTML build, RSS build, and graph check, all exit 0. All thirteen
draft outputs exist and remain absent from search, sitemap, RSS, and
the 26 existing non-draft pages' links. Graph health reports 44 pages,
zero hotspots, and eight pre-existing unreferenced pages; no study
page is unreferenced. Raw-support exclusions, replay syntax, and
bounded credential checks also passed.

The deploy workflow runs on `main` pushes or explicit dispatch, not
this draft PR. However, its normal build emits draft HTML too: draft
status removes discovery, not access control. Publication remains an
owner decision before any merge/deploy; this session will do neither.
