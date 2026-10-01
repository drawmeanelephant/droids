# Follow-up drafts — not filed

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Coordinator disposition, 2026-10-01: after a fresh duplicate check,
the measurement successor was filed as
[#602](https://github.com/drawmeanelephant/la-famille/issues/602)
and strict abstention as
[#603](https://github.com/drawmeanelephant/la-famille/issues/603).
The original research drafts below were unfiled at worker completion.
Exact posted bodies are in `../issues/`. No existing issue was closed
or reopened.

Observed 2026-10-01. Target repository for both candidates: **drawmeanelephant/la-famille**. These are proposed narrow follow-ups, not implemented changes or reasons to reopen the implementation epic.

## Duplication check

Read #581 (closed), implementing PRs #587/#595/#597/#598 (merged), all-state recent issue list (150 maximum), and all-state repository issue searches for `embeddings`, `retrieval`, `Ollama`, `abstention`, `warranty`, `no-answer`, `dense`, and `graph ask`. Search results are archived under `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/search-*.json`; this is targeted deduplication, not a claim to exhaustively read every issue. Dense/abstention searches found **closed #581 only**. Ollama additionally found open [#579](https://github.com/drawmeanelephant/la-famille/issues/579) and [#583](https://github.com/drawmeanelephant/la-famille/issues/583); their full bodies were read. #579 concerns real destination sites; #583 concerns versioned corpus packs. Neither has the specific measurement or abstention task below. No dedicated open duplicate was found. Closed #581 already discloses both limitations: acknowledge that provenance and do not file them as newly discovered defects. Re-run searches before authorized filing.

## Candidate 1 — measurement follow-up

**Title:** Measure opt-in Ollama retrieval against frozen hard probes and real cache timings

**Problem:** #597 shipped embeddings, RRF and reuse but explicitly could not establish a real-model recall lift or production Ollama cache timings. Frozen Phase 1 recall is 1.0000, so the original strict improvement criterion cannot be met on that dataset. This is missing empirical acceptance evidence, not evidence that embeddings are broken.

**Evidence:** [#597](https://github.com/drawmeanelephant/la-famille/pull/597), [#581 closure](https://github.com/drawmeanelephant/la-famille/issues/581#issuecomment-5922450008), [measurement limits](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/content/docs/ask.md#L179-L194), and this card's `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/targeted-tests.log`. The 157.381208 ms / 56.084 µs reuse result used a deliberately delayed synthetic embedder.

**Proposed scope:** On an owner-authorized machine with a local Ollama embedding model, run lexical-off, true dense-on, and unavailable-embedding comparisons against unchanged original and hard datasets. Record model/version, corpus fingerprint, actual ranker mode, per-question retrieval and abstention, recall/precision, first-build and cache-hit timings, index digests and chunk embed counts. Keep completion and embedding measurements separate. Report all probes, including misses, rather than selecting favorable questions.

**Acceptance criteria:**
- Frozen questions, thresholds, labels and lexical scorer remain unchanged.
- Genuine hybrid runs are distinguishable from lexical fallback; frozen off recall remains 1.0000 and hard off recall remains 0.5833.
- A reproducible measured comparison establishes uplift, no change, or regression honestly; a documented no-uplift result is acceptable completion of this measurement follow-up, **not satisfaction of the original strict-uplift Done clause**.
- Real-provider cache reuse has identical index bytes/no re-embedded chunks and recorded timings under specified conditions; timings are not synthetic delay claims.
- The known warranty gate remains separately visible until addressed; no relabeling to make the report green.

**Non-goals:** Vector database, remote embedding endpoint, default-on embeddings, scorer retuning, new benchmark questions chosen to manufacture uplift, or a general live-model reasoning benchmark.

**Duplication disposition:** Related limitation already disclosed in closed #581 and merged #597; no open dedicated issue found. Optional bounded measurement successor, not a duplicate implementation epic.

## Candidate 2 — evidenced strict abstention gap

**Title:** Preserve strict no-answer for the frozen sensor warranty near-miss probe

**Problem:** `sensor-warranty-absent` asks for absent warranty evidence but lexical retrieval supplies topical sensor pages. The hard eval deliberately requires zero retrieval and canonical no-answer, so it fails 7/8 even though broad-topic lexical matches exist. This is a strict retrieval-abstention failure; no live-model hallucinated warranty was observed.

**Evidence:** [#595](https://github.com/drawmeanelephant/la-famille/pull/595), [documented near-miss behavior](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/content/docs/ask.md#L172-L188), [regression keeping failure honest](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/internal/askeval/graph_test.go#L72-L95), `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/06-la-famille/evidence/hard-cli.log`. Fresh reproduction:

```sh
go run ./cmd/la-famille ask --eval assets/testdata/ask-eval/golden-questions-hard.json --no-embeddings
# exits 1; sensor-warranty-absent retrieves sensor, sensor-catalog, index, assay-manual
# recall@5 0.5833, precision@5 0.3333; 7/8 questions pass
```

**Proposed scope:** Investigate a conservative evidence-sufficiency/abstention policy for this kind of topical near-miss; preserve existing answerable retrieval and graph route contracts. Choose the smallest generalizable policy, not a hard-coded warranty exception. This draft does not prescribe an unverified algorithm.

**Acceptance criteria:**
- With unchanged frozen datasets and thresholds, the warranty question retrieves no answer context and returns the canonical no-answer; hard CLI reports 8/8 and exits 0.
- Original frozen dataset remains 9/9 with recall 1.0000; hard answerable recall/precision do not fall below 0.5833/0.3333.
- Graph multi-hop grounding and all single-page non-dilution gates continue passing; off/on toggles remain valid.
- New independent near-miss and answerable controls demonstrate the policy is not a query-specific special case. They supplement rather than weaken frozen probes.
- Documentation distinguishes strict retrieval abstention from general live-model factual correctness.

**Non-goals:** Relabeling the absent answer as answerable, lowering gates, claiming all hallucinations solved, implementing dense retrieval again, or a general redesign of `ask`.

**Duplication disposition:** Known concern explicitly retained by closed #581 and merged #595/#597/#598; no dedicated open issue found. Candidate is a bounded successor for the surviving gap, not reopening or recreating #581.

## Not proposed

No issue for incomplete historical CDP smoke alone: automated route DOM and HTTP contracts passed again, and a disappearing tool target is not evidence of a shipped UI defect. Visual smoke remains a validation limitation. No separate issue for saturated original recall: the harder dataset already exists. No separate paraphrase implementation issue is inferred from zero-floor measurement misses before dense measurements are performed.
