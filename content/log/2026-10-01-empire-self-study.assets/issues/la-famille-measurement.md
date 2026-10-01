## Problem

The retrieval implementation is merged, but real-model dense uplift and
production Ollama cache timings remain unmeasured. The original frozen
Phase 1 recall is already 1.0000, so its strict higher-recall Done clause
cannot be satisfied on that dataset.

This is an empirical-acceptance follow-up, not evidence that embeddings
are broken or a request to reopen the implementation epic.

## Evidence

Observed 2026-10-01 at `bb9c4952331ad9e9401e2f3645617018a18bb9c5`.

- [Merged #597](https://github.com/drawmeanelephant/la-famille/pull/597)
  discloses absent real-model lift and timing measurements.
- [#581's implementation-only closure](https://github.com/drawmeanelephant/la-famille/issues/581#issuecomment-5922450008)
  retains those limits.
- [Measurement contract and limitations](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/content/docs/ask.md#L179-L194).
- [Harder probes, #595](https://github.com/drawmeanelephant/la-famille/pull/595)
  provide a separately frozen lexical baseline of 0.5833.

Synthetic cache-reuse tests pass, but an intentionally delayed fake
embedder is not a production model benchmark.

## Proposed scope

On an owner-authorized machine with a local Ollama embedding model,
compare lexical-off, genuine dense-on, and unavailable-embedding modes
against the unchanged original and hard datasets.

Record model/version, corpus fingerprint, actual ranker mode,
per-question retrieval/abstention, recall/precision, first-build and
cache-hit timings, index digests, and chunk embed counts. Keep completion
and embedding measurements separate. Report every probe, including
misses.

## Acceptance criteria

- Frozen questions, labels, thresholds, and lexical scorer are unchanged.
- Hybrid execution is distinguishable from lexical fallback. Off-mode
  recall remains 1.0000 on the original set and 0.5833 on the hard set.
- A reproducible comparison reports uplift, no change, or regression.
  An honest no-uplift result completes this measurement task, **not the
  original strict-uplift Done clause**.
- Real-provider reuse preserves index bytes and avoids chunk
  re-embedding; timings include stated conditions rather than synthetic
  delay results.
- The known warranty-abstention failure remains separately visible; no
  relabeling or selected-question reporting makes the results green.

## Not in scope

A vector database; remote embedding endpoints; default-on embeddings;
scorer retuning; replacing frozen probes to manufacture uplift; a
general live-model reasoning benchmark.

## Existing work and duplicate check

This limitation is already disclosed by closed #581 and merged #597.
Targeted all-state searches and a fresh open-issue check found no
dedicated successor. Open #579 concerns destination sites and #583
versioned corpus packs, not these retrieval measurements.
