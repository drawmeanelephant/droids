---
title: A closed moonshot, with the caveats still attached
parent: log/2026-10
tags: [factory, empire, la-famille, retrieval]
status: draft
summary: Retrieval implementation is closed, but strict dense uplift remains unverified and the hard warranty-abstention probe still fails.
published_at: 2026-10-01T00:00:00Z
---

# A closed moonshot, with the caveats still attached

- Surface: repository and deterministic retrieval-evaluation study
- Date: 2026-10-01
- Evidence: [#581](https://github.com/drawmeanelephant/la-famille/issues/581),
  the source receipts below, and
  `2026-10-01-empire-self-study.assets/06-la-famille/criterion-matrix.md`
- Verdict: keep

## Where we are

The family reunion does not need another ribbon-cutting.
[la-famille's retrieval moonshot is already closed](https://github.com/drawmeanelephant/la-famille/issues/581#issuecomment-5922450008).
The closing note says what shipped and what nobody measured: the
harness, optional embeddings, and graph paths are merged.
Real-model dense uplift is not smuggled into that sentence.

Implementation closure is not the same as satisfying every original
Done clause. [#581](https://github.com/drawmeanelephant/la-famille/issues/581)
asked for recall strictly above the Phase 1 baseline. That baseline is
already 1.0000 on the original probes; the record does not establish
the requested uplift. The study's criterion matrix keeps that clause
unfulfilled rather than quietly rewriting it.

## What's improved

The first measuring stick left nowhere for “better” to go. A harder
set gave the lexical scorer a less flattering 0.5833 and kept the
awkward abstention failure visible.
[Original harness](https://github.com/drawmeanelephant/la-famille/pull/587);
[harder probes](https://github.com/drawmeanelephant/la-famille/pull/595).

The graph arm earned a narrower win. Scratch checks reproduced
0.8667 to 1.0000 recall and 0.4867 to 0.6067 precision, with three
cited routes that include their bridges.
[Graph contracts](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/askeval/graph_test.go#L12-L95);
executed output is in
`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/targeted-tests.log`.
These are synthetic-provider contract checks, not a local model
learning wisdom. The distinction is part of the result.

## What's next

Keep the implementation closure; keep the caveats. The absent warranty
still pulls in topical pages and fails the strict no-answer gate.
Dense retrieval still needs a real-model comparison and real cache
timings.
[Known limitations](https://github.com/drawmeanelephant/la-famille/pull/597);
[documented near-miss](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/content/docs/ask.md#L172-L194);
the hard CLI reproduction is in
`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/hard-cli.log`,
retained locally rather than shipped as site source.
Those are two bounded successor jobs, not newly discovered surprises
or evidence that a live model hallucinated a warranty.
They are filed separately as
[#602, real-model measurement](https://github.com/drawmeanelephant/la-famille/issues/602),
and
[#603, strict abstention](https://github.com/drawmeanelephant/la-famille/issues/603).

The paste-ready closure summary is preserved as a source attachment;
this study has not closed, reopened, or commented on #581. The record
also does not establish Luna or Sol routing, so neither gets a cameo
invented after the fact.

Part of [[log/2026-10-01-empire-self-study]] and the
[[projects/la-famille]] shelf.
