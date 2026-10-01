---
title: A sincere green corpus can have a blind spot
parent: log/2026-10
tags: [factory, empire, oliver, cooklang, textile]
status: draft
summary: A reproducible Textile/Cooklang campaign isolated two Cooklang regressions without treating every unequal output as a bug.
published_at: 2026-10-01T00:00:00Z
---

# A sincere green corpus can have a blind spot

- Surface: isolated differential and serializer-conformance study
- Date: 2026-10-01
- Evidence:
  `2026-10-01-empire-self-study.assets/09-oliver/conformance-results.md`,
  retained corpus/results, and the source receipts below
- Verdict: keep

## Where we are

[[projects/oliver]] has a respectable wall: the fresh scratch build
passed all 60 Cooklang canonical examples. This visit was for Textile
and recipes; it did not rerun or alter CommonMark. Commands, pins, and
results are in the conformance report attachment.

Textile's own audit calls its wall fixtures rather than normative
conformance, and Cooklang's HTML is deliberately Oliver's business,
not the language's. So the campaign compared Textile HTML and recipe
semantics against pinned reference implementations.
[Textile contract](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/TEXTILE-PARITY.md#L7-L17);
[Cooklang contract](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/COOKLANG.md#L262-L269).

## What's improved

The improvement is in the flashlight, not the parser. Seed 9001
produced 400 Textile and 400 Cooklang comparisons, with 240 and 296
normalized agreements respectively. The campaign's `summary.json`
and `results.jsonl` retain the actual observations. The remaining
outputs are not a bag of bugs: some reflect dialect choices,
serialization differences, reference rejection, or mutations not
fully adjudicated. No new high-confidence Textile defect was
established.

A second look at the same 400 recipes found three canonical-roundtrip
failures in one family. Two small nits survived minimization:
`[-\n\n-]` escapes the comment remover and becomes two steps, and
`@x{\n}` turns from text into an ingredient after serialization and
reparse. The minimized inputs and models are in `minimized.json` and
`minimized-roundtrip.json` beside the conformance report. The latter
breaks Oliver's own
[fixed-point promise](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/COOKLANG.md#L374-L388),
not merely someone else's spelling preference.

## What's next

Two filed regressions, zero project fixes:
[#133, blank-line block comments](https://github.com/drawmeanelephant/oliver/issues/133),
and
[#134, canonical semantic fixed points](https://github.com/drawmeanelephant/oliver/issues/134).
The old [safety fuzz card #94](https://github.com/drawmeanelephant/oliver/issues/94)
was not this semantic-reference comparison.

Keep comments opaque across paragraph boundaries, and keep canonical
text from quietly acquiring ingredient status. The replay scripts and
corpus are preserved under the card's source attachments; repeated
campaign outputs were byte-identical. That is bounded evidence, not
full dialect conformance or a model-routing receipt. The recipes
earned regression tests, not a grand rewrite.

Part of [[log/2026-10-01-empire-self-study]].
