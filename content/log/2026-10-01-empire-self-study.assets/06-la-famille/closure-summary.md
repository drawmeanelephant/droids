# Paste-ready implementation-closure confirmation

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Independent verification on **2026-10-01**, pinned to `master` commit **`bb9c4952331ad9e9401e2f3645617018a18bb9c5`**: [#581](https://github.com/drawmeanelephant/la-famille/issues/581) is **already CLOSED** since **2026-10-01T00:48:24Z**. Recommendation: retain the existing implementation closure; no issue-state change is needed.

- Phase 1: [#587](https://github.com/drawmeanelephant/la-famille/pull/587) delivered the original eval harness; [#595](https://github.com/drawmeanelephant/la-famille/pull/595) added harder probes and precision/regression gates. Fresh frozen eval: **9/9**, recall@5 **1.0000**, precision@5 **0.4375**; the original absent-answer control returns the canonical fallback.
- Phase 2: [#597](https://github.com/drawmeanelephant/la-famille/pull/597) delivered optional loopback-only embeddings, RRF, private fingerprinted vector cache, off switch and unavailable-embedding lexical fallback. Scratch tests verified exact lexical restoration, cache byte reuse/invalidation and no re-embedding on a hit. Cache timing **157.381208 ms → 56.084 µs** used a deliberately delayed synthetic embedder, **not real Ollama**.
- Phase 3: [#598](https://github.com/drawmeanelephant/la-famille/pull/598) delivered lexical graph expansion, bridge-grounded paths and same-server toggle. Fresh graph off/on eval reproduced recall@5 **0.8667 → 1.0000**, precision@5 **0.4867 → 0.6067**, and all **three** named/cited multi-hop routes, including bridges. Two new single-page controls and eight frozen answerable controls retained precision/recall. HTTP and minimal-DOM UI off/on/off and ordered-route checks passed.
- Original/hard golden files and lexical/hybrid scorers are byte-identical to their implementing merge commits. Each implementing PR has successful Go Test Suite and lint checks; [pinned master CI](https://github.com/drawmeanelephant/la-famille/actions/runs/36801886467) is successful. Targeted fresh tests across retrieval, LLM adapters, eval, server and CLI exited 0; this was not a full-suite/race/vet rerun.

**Retained limitations:** no live-model dense recall lift or production Ollama timing is established; frozen recall 1.0000 cannot strictly improve. RRF does not guarantee uplift. Hard lexical eval still exits 1 on the pre-existing absent-warranty near-miss (**7/8**, recall **0.5833**, precision **0.3333**), freshly reproduced without invoking a completion model. Graph answer checks use synthetic deterministic providers, not live-model reasoning; minimal-DOM route checks do not replace a completed real-browser visual smoke.

Thus “implementation merged” is supported, but “all original empirical Done conditions satisfied” is not. Consider narrowly scoped successors for real-model measurement and strict near-miss abstention after rechecking duplicates; neither was filed by this verification.

Evidence: [current docs](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/content/docs/ask.md#L162-L221), [graph gates](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/askeval/graph_test.go#L12-L95), [cache test](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/retrieval/hybrid_test.go#L43-L103), [#581 existing closure](https://github.com/drawmeanelephant/la-famille/issues/581#issuecomment-5922450008).
