# #581 criterion matrix

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Observation: 2026-10-01; immutable source **`bb9c4952331ad9e9401e2f3645617018a18bb9c5`**. Issue is already CLOSED as implementation delivery, not complete empirical validation. Original authority: [#581](https://github.com/drawmeanelephant/la-famille/issues/581); exact current body and comments are in `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/issue-581.json`.

## Exact done criteria

### Phase 1

`go test ./internal/retrieval` (or the eval command) prints a
    per-question pass/fail table and a recall@5 number against a checked-in
    golden file. Running it against the current, unmodified retriever produces
    a recorded baseline number. A deliberately-broken question (answer not
    present in the corpus) is confirmed to return the no-answer fallback, not
    a guess.

### Phase 2

the eval harness shows a **higher recall@5 than the recorded
    Phase 1 baseline** with embeddings on, and returns to exactly the
    baseline number with `--no-embeddings` (proving the lexical path is
    untouched and still correct when embeddings are unavailable — the
    Ollama-not-running case must still work exactly as it does today). A
    per-chunk vector index file is written to the cache and reused across runs
    (second run measurably faster, identical index).

### Phase 3

on a golden question whose answer requires pages A and B
    connected by C, the assistant returns a cited answer naming A, B, and C,
    and the UI shows the A→C→B path. On a single-page question, graph
    expansion does **not** dilute precision — the eval harness shows recall up
    and precision flat-or-better. A graph-expansion toggle exists so the
    behavior can be shown on and off in the same run.

## Requirement-by-requirement verification

**Executed** means this card's scratch checks. **Source** means inspected implementation, not a live-system claim. **Upstream** means PR/issue record only. The phase setup requirements are included as well as the exact Done paragraphs.

| Requirement | Disposition | Evidence and limits |
| --- | --- | --- |
| P1 checked-in golden questions for three existing fixtures and two deep-link fixtures, acceptable page sets and recall floors | Verified: source + execution | #587 original delivery; frozen `golden-questions.json`; TestRunGoldenDataset and TestGoldenFollowUpBaselines pass. #595 adds harder linked twelve-page sites separately. |
| P1 reusable harness supporting fake/provider selection | Verified: source + fake execution | CLI `ask --eval`; [content/docs/ask.md](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/content/docs/ask.md#L162-L177); deterministic fake was exercised, no live provider run here. |
| P1 prints question pass/fail and aggregate recall@5 | Verified: execution | TestGoldenFollowUpBaselines log contains full frozen/hard tables; frozen 9/9, recall 1.0000. Plain non-verbose `go test ./internal/retrieval` itself is not the reporting interface; the allowed eval interface is. |
| P1 recorded original unmodified lexical baseline | Verified: upstream history + current execution + byte comparison | #587 records 1.0000; reproduced current 1.0000; current `ranker.go` and frozen golden file are byte-identical to #587 merge. Hard measurement 0.5833 is separately recorded at #595. |
| P1 absent-answer question gives canonical no-answer, no guess | Verified: deterministic execution, bounded claim | TestRunGoldenDataset checks exact canonical fallback; frozen original unanswerable passes, hard gibberish control passes. Near-miss warranty control still fails; success is not universal abstention. |
| P2 opt-in local dense embeddings with completion-equivalent loopback boundary | Verified: source + mock HTTP execution | TestOllamaEmbedBatchAndLoopback and redirect rejection pass; no live daemon contacted. |
| P2 flat per-chunk private cache next to build cache, same fingerprint invalidation | Verified: source + execution | [internal/retrieval/hybrid.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/retrieval/hybrid.go#L53-L139); tests prove fingerprint/model/corpus changes invalidate; private 0600 cache. Eval fixtures use an explicit private persistent cache, not disposable build paths. |
| P2 reciprocal rank fusion; no vector DB dependency | Verified: source + deterministic execution | TestReciprocalRankFusionAndEmptyLexical; [internal/retrieval/hybrid.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/retrieval/hybrid.go#L244-L269). The phrase “can only help” is not mathematically established; docs expressly disclaim monotonic improvement. |
| P2 higher recall@5 with embeddings than recorded Phase 1 | **Unverified / not claimed** | Frozen baseline 1.0000 makes strict lift impossible there; no real embedding-model measurement against hard baseline 0.5833 exists in #597. Synthetic semantic ranking is not empirical acceptance. |
| P2 embeddings off returns exactly lexical baseline | Verified: execution | CLI flag test passes at 1.0000, including both flags with off winning; eval tests preserve lexical path on hard set. |
| P2 unavailable Ollama embeddings preserve lexical operation | Verified with unavailable-embedder injection, not live daemon execution | TestHybridEvalOfflineFallsBackToHardBaseline deep-compares questions and recall; unavailable embeddings are distinct from unavailable completion provider. |
| P2 index persisted and reused, identical bytes and measurably faster second run | Verified synthetic execution; production timing unmeasured | TestHybridIndexReuseAndInvalidation: 157.381208 ms / 56.084 µs, unchanged bytes and zero chunk re-embedding. Intentional synthetic delay, not a laptop-model benchmark. |
| P3 strongly-linked neighbor expansion and connecting paths using outbound/backlink graph | Verified: source + execution | GraphStrongNeighbor, ConnectingPath and bounded-path tests pass; metadata union implementation is source-inspected. Missing/malformed artifacts are documented optional fallback. |
| P3 golden answer cites and names A, C, B | Verified deterministic contract, not live-model reasoning | TestGraphGoldenComparisonGroundsEveryRoute passes all three routes; TestGraphAnswerContainsEndpointAndBridgeEvidence verifies actual bridge text reaches a checking provider. |
| P3 UI displays ordered A→C→B route | Verified automated DOM/HTTP execution; visual smoke not completed | TestAskGraphUIController ran (not skipped); minimal DOM asserts A, C, B order, arrows, accessible label. Browser layout outside scope. |
| P3 recall improves, precision flat-or-better, single-page non-dilution | Verified execution on frozen labels | Graph off/on 0.8667/0.4867 → 1.0000/0.6067; two new single-page controls unchanged; eight frozen answerable controls unchanged at aggregate recall 1.0000 / precision 0.4375. |
| P3 on/off toggle in same running server | Verified execution | TestGraphToggleHTTPInSameServer and UI controller prove off/on/off; explicit toggle selects lexical comparison even if startup hybrid is enabled. No restart required. |
| Closure says implementation merged and empirical limits retained | Verified read-only GitHub observation | CLOSED 2026-10-01T00:48:24Z; #587/#595/#597/#598 all MERGED; successful PR Go/lint and current master CI. No closing action taken. |

## Interpretation

The original strict dense-lift condition is **not fulfilled by evidence**, but #581's explicit implementation-only closure is internally honest. Its risk section also permits a no-improvement outcome; do not erase the stronger Done wording or imply it passed. Retain closure; use narrow follow-ups to resolve live-model measurement and the measured near-miss gate rather than reopening the whole implementation epic.
