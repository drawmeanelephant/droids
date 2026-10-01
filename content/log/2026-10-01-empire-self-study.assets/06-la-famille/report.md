# Card 6 — retrieval closure verification

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Observed **2026-10-01**. Repository: `drawmeanelephant/la-famille`, default branch `master`.
Snapshot: **`bb9c4952331ad9e9401e2f3645617018a18bb9c5`**, obtained as a fresh SHA-addressed GitHub archive at `/tmp/la-famille-card6.quZuPH/source`; no owner checkout was used. [Commit](https://github.com/drawmeanelephant/la-famille/commit/bb9c4952331ad9e9401e2f3645617018a18bb9c5).

## Where we are

**#581 is already CLOSED**, at **2026-10-01T00:48:24Z**. Its [closure comment](https://github.com/drawmeanelephant/la-famille/issues/581#issuecomment-5922450008) and body explicitly distinguish shipped implementation from unestablished dense-model measurements. Recommendation: **retain implementation closure, do not claim every original empirical criterion passed, and do not reopen or close anything**. No external state was changed.

The owner-supplied implementation-complete premise is supported, not merely repeated. The scope authority is the exact [issue body](https://github.com/drawmeanelephant/la-famille/issues/581), archived in `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/issue-581.json`; `criterion-matrix.md` quotes the original done paragraphs and maps every requirement. Read the study contract and the snapshot's sole applicable [AGENTS.md](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/AGENTS.md#L1-L70). Explore-only authorization takes precedence over implementation-plan/hook instructions; no project plan, hook configuration, code, workflow, documentation, or issue was changed.

## What's improved

| Delivery | Merge commit | Merged UTC | PR-head CI evidence |
| --- | --- | --- | --- |
| [#587](https://github.com/drawmeanelephant/la-famille/pull/587) | `1a54229f9700e64382f50254a72e49de8ecd9a7c` | 2026-09-30T14:20:00Z | [Go tests: SUCCESS](https://github.com/drawmeanelephant/la-famille/actions/runs/36727214801/job/109927067472), [lint: SUCCESS](https://github.com/drawmeanelephant/la-famille/actions/runs/36727214497/job/109927066724) |
| [#595](https://github.com/drawmeanelephant/la-famille/pull/595) | `702001a253d6901302858cdc84cd794806062431` | 2026-09-30T19:54:13Z | [Go tests: SUCCESS](https://github.com/drawmeanelephant/la-famille/actions/runs/36767791211/job/110066223933), [lint: SUCCESS](https://github.com/drawmeanelephant/la-famille/actions/runs/36767791229/job/110066223656) |
| [#597](https://github.com/drawmeanelephant/la-famille/pull/597) | `4c47bb86d2f806fb46bbc20f903e9037be0614e3` | 2026-09-30T22:20:13Z | [Go tests: SUCCESS](https://github.com/drawmeanelephant/la-famille/actions/runs/36784689636/job/110123151475), [lint: SUCCESS](https://github.com/drawmeanelephant/la-famille/actions/runs/36784689681/job/110123151772) |
| [#598](https://github.com/drawmeanelephant/la-famille/pull/598) | `7b93062a1948cb253fba2f9556789e010c59e45d` | 2026-09-30T22:52:44Z | [Go tests: SUCCESS](https://github.com/drawmeanelephant/la-famille/actions/runs/36787705456/job/110132982913), [lint: SUCCESS](https://github.com/drawmeanelephant/la-famille/actions/runs/36787705362/job/110132982145) |

The epic's delivery table starts at #595, but **#587 is the original Phase 1 implementation**, and #595 explicitly strengthens it rather than replacing it. Earlier #587 measured lexical recall@5 **1.0000**, eight answerable questions and nine total passes. #595 added twelve-page harder fixtures, precision, mutation checks and an honest lexical baseline of **0.5833 recall / 0.3333 precision**, with **7/8 gates** passing. This is broader measurement, not a claimed regression in the unchanged lexical scorer. See the two PR descriptions and [content/docs/ask.md](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/content/docs/ask.md#L162-L194).

#597 shipped local embeddings, RRF, fingerprint/model/corpus invalidation, private flat-file cache, disable switch and unavailable-embedder fallback. [internal/retrieval/hybrid.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/retrieval/hybrid.go#L53-L139) and [internal/retrieval/hybrid.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/retrieval/hybrid.go#L192-L269) substantiate the implementation; [internal/llm/embedding_test.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/llm/embedding_test.go#L13-L72) exercises loopback and redirect constraints.

#598 supplies graph retrieval and ordered source routes. Fresh execution reproduced graph-off/on recall **0.8667 → 1.0000** and precision **0.4867 → 0.6067** on the separate graph set; three multi-hop routes are named and cited including their bridges, with **6/6 graph-set gates** passing. Two new single-page controls and all eight frozen answerable controls retain precision/recall. HTTP off/on/off and dependency-free UI-controller route checks pass. [internal/askeval/graph_test.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/askeval/graph_test.go#L12-L95); [internal/ask/graph_test.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/ask/graph_test.go#L50-L139); [internal/ask/ui_graph_test.js](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/ask/ui_graph_test.js#L88-L132).

Byte comparisons against implementing merge commits prove the original golden file, harder golden file, lexical ranker, and hybrid ranker are unchanged at this snapshot. Exact comparison refs and digests: `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/provenance.json`.

## Verification and gaps

**Executed here**, using Go 1.27.1 on Darwin/arm64, exclusively from scratch:

```sh
cd /tmp/la-famille-card6.quZuPH/source
GOCACHE=/tmp/la-famille-card6.quZuPH/go-build go test -v \
  ./internal/retrieval ./internal/llm ./internal/askeval ./internal/ask ./cmd/la-famille \
  -run 'Test(Hybrid|ReciprocalRankFusion|VectorIndex|OllamaEmbed|RunGoldenDataset|GoldenFollowUpBaselines|Graph|RequestGraph|AskGraph|AskEmbedding|AskNoEmbedding)' -count=1
GOCACHE=/tmp/la-famille-card6.quZuPH/go-build go run ./cmd/la-famille ask \
  --eval assets/testdata/ask-eval/golden-questions-hard.json --no-embeddings
```

The targeted test command exits **0** in all five packages; it is not a full-suite/race/vet rerun. The hard CLI exits **1**, as expected, specifically on `sensor-warranty-absent`; baseline recall and precision match the record. The test suite is green because its regression tests assert that known failure, not because the hard eval is green. Reproducible outputs: `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/targeted-tests.log`, `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/hard-cli.log`.

Cache execution with a deliberately delayed synthetic embedder produced **157.381208 ms miss / 56.084 µs hit**, unchanged bytes and no re-embedded chunks. This proves reuse, not production Ollama speed. Unavailable-embedder execution preserved the hard lexical questions exactly. `--no-embeddings`, including overriding `--embeddings`, reproduces frozen recall 1.0000. No actual Ollama daemon/model was contacted or benchmarked by this card. [internal/retrieval/hybrid_test.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/retrieval/hybrid_test.go#L43-L103); [internal/askeval/hybrid_test.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/askeval/hybrid_test.go#L35-L96); [cmd/la-famille/ask_hybrid_test.go](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/cmd/la-famille/ask_hybrid_test.go#L12-L33).

**Unverified empirical requirement:** dense-on recall higher than Phase 1. The frozen 1.0000 baseline cannot increase; the unchanged hard set supplies headroom, but no live-model lift exists in the cited evidence. RRF is not a monotonic-recall guarantee. #597 and the closure already disclose this; source inspection and synthetic embeddings cannot fill that gap.

**Reproduced limitation:** warranty-duration evidence is absent, yet the hard query retrieves `[sensor sensor-catalog index assay-manual]` rather than abstaining. This is an eval/retrieval gate failure; the eval deliberately does not call a completion model, so it is **not evidence of a live-model fabricated warranty answer**. [content/docs/ask.md](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/content/docs/ask.md#L172-L188).

**Validation boundaries:** graph answer quality here uses the explicitly synthetic fake provider; the extra evidence-checking provider verifies bridge text reaches the prompt. UI controller tests run against a minimal DOM, not browser layout. The prior live-browser route smoke was incomplete according to #598; none was attempted here. Full tests/race/vet, 83.3% coverage and prior browser-shell behavior are **upstream-reported**, not rerun measurements. PR Go/lint statuses were freshly read; snapshot CI is [successful](https://github.com/drawmeanelephant/la-famille/actions/runs/36801886467), with [successful deployment](https://github.com/drawmeanelephant/la-famille/actions/runs/36801886423). Skipped `verify-jules-pr` jobs are not test passes and establish no model attribution.

## What's next

Paste-ready `closure-summary.md` is an optional independent confirmation, **not posted paperwork**. Two bounded follow-up candidates are drafted: (1) local-model dense uplift/cache benchmark, allowing an honest no-uplift result; (2) strict near-miss abstention for the frozen warranty probe. Both are already disclosed by closed #581, but no dedicated open issue was found. All-state issue-list and targeted searches are archived; adjacent open #579 and #583 were read and concern real-site rollout and corpus packs, not these specific acceptance gaps. Recheck duplication immediately before any owner-authorized filing. No new issue is proposed for the previous browser-tool interruption alone.
