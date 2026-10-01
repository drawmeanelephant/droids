## Problem

The frozen `sensor-warranty-absent` near-miss asks for evidence absent
from the corpus. Lexical retrieval still supplies topical sensor pages.
The hard evaluation requires zero retrieval and canonical no-answer,
so the suite remains 7/8.

This is a reproduced strict retrieval-abstention gap. No live-model
hallucinated warranty was observed, and this was already disclosed by
the implementation closure.

## Evidence and reproduction

Observed 2026-10-01 at `bb9c4952331ad9e9401e2f3645617018a18bb9c5`.

- [Hard-probe delivery, #595](https://github.com/drawmeanelephant/la-famille/pull/595).
- [Documented near-miss behavior](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/content/docs/ask.md#L172-L188).
- [Regression that keeps the failure visible](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/askeval/graph_test.go#L72-L95).

Executed in an isolated checkout:

```sh
go run ./cmd/la-famille ask --eval assets/testdata/ask-eval/golden-questions-hard.json --no-embeddings
```

Exit 1; the warranty probe retrieves `sensor`, `sensor-catalog`, `index`,
and `assay-manual`. Aggregate recall@5 is 0.5833, precision@5 is 0.3333;
7/8 questions pass.

## Proposed scope

Investigate a conservative evidence-sufficiency/abstention policy for
topical near-misses. Preserve answerable retrieval and graph-route
contracts. Choose the smallest generalizable policy, not a hard-coded
warranty exception; this issue does not prescribe an unverified
algorithm.

## Acceptance criteria

- With unchanged frozen datasets and thresholds, the warranty probe
  retrieves no answer context and returns canonical no-answer.
  The hard CLI reports 8/8 and exits 0.
- The original set remains 9/9 with recall 1.0000. Hard answerable
  recall/precision do not fall below the current 0.5833/0.3333.
- Multi-hop grounding, single-page non-dilution, and off/on toggles
  remain valid.
- Independent near-miss and answerable controls supplement, not weaken,
  the frozen probes and rule out a query-specific special case.
- Documentation distinguishes strict retrieval abstention from general
  live-model factual correctness.

## Not in scope

Relabeling the absent answer as answerable; lowering gates; claiming all
hallucinations solved; implementing dense retrieval again; redesigning
all of `ask`.

## Existing work and duplicate check

Closed [#581](https://github.com/drawmeanelephant/la-famille/issues/581)
and merged #595/#597/#598 already retain this limitation. Targeted
all-state searches and a fresh open-issue check found no dedicated
successor. This is a bounded follow-up, not a recreated implementation
epic.
