# Empire self-study: research contract

Date: 2026-10-01. Owner: `drawmeanelephant`.

The owner requested eleven independent, concurrent, explore-only cards.
The two design cards are Boris social metadata and VirelaiOS machine
identity proof. The other nine are bounded audits. No card depends on
another card finishing.

## Boundaries

- Read and map. Do not modify any project's implementation, workflows,
  configuration, documentation, issue state, or pull requests.
- Do not merge, push, publish, or post comments. The coordinating agent
  handles authorized follow-up issue creation after checking duplicates.
- Treat local checkouts and untracked files as the owner's work.
  Prefer fresh, immutable GitHub snapshots in your own temporary directory.
  Never fetch, reset, switch, clean, or build inside an existing checkout.
- Read applicable `AGENTS.md` files before working in a project snapshot.
- GitHub has no offered connector in this environment; authenticated `gh`
  is the fallback. Use read-only GitHub calls. Do not print credentials.
- Do not delegate again. Stay within your assigned card and output folder.
- Do not write under `dist/`, `boris-agent-kit/`, or
  `SUPPORT-DO-NOT-TRACK/`.

## Evidence standard

Record the exact commit SHA, issue/PR state, and observation date. Cite
immutable file URLs with line anchors where feasible, and issue, commit,
or CI-run URLs for claims. Label source inspection, executed checks,
upstream documentation, and owner-supplied premises separately.

An already-fixed premise is a finding, not a reason to invent work.
Absence of verification is not evidence of failure. Do not call an issue
stale just because it is old. Inspect existing open and closed issues
before suggesting follow-ups.

Never invent shipped features, metrics, attribution, benchmark results,
or experience. In particular, do not infer a Luna or Sol run from task
shape, a bot author, or a green check. These research workers inherit
the coordinating session's model; the two-design/nine-grind allocation
is a requested portfolio, not proof of historical model routing.

## Required output in your assigned folder

1. `report.md`: scope and sources; findings with receipts; what changed
   compared with an evidenced earlier state; verification and gaps.
   Include three short sections titled **Where we are**,
   **What's improved**, and **What's next**.
2. `issue-drafts.md`: only real, deduplicated concerns. For each candidate,
   include target repo, title, problem, evidence, proposed scope,
   acceptance criteria, explicit non-goals, and duplication check.
   If no new issue is warranted, explain why.
3. `narrative.md`: a short, affectionate but unsycophantic blog draft
   in those same three acts. Cite each factual claim; no frontmatter is
   needed. Credit Factory only when the cited record establishes it.
4. Any card-specific deliverable: design, corpus, closure summary, ordered
   task list, conformance results, or diagnosis. Keep reproducible commands
   and compact non-sensitive outputs beside the report when useful.

Reports must distinguish a recommendation from an implemented change.
Do not post or close an existing issue merely to make the study look done.

## Coordinating output

Findings live beside the owning log entry, under
`content/log/2026-10-01-empire-self-study.assets/`.
Narratives will enter `content/log/` as drafts. The coordinator will
deduplicate and file warranted follow-up issues, retain clean drafts for
anything blocked, then run Boris validation and the complete HTML build.
There will be no commit or publication without the owner's instruction.
