# Oliver — differential references, not another victory lap

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/09-oliver/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Observation date: **2026-10-01**. Explore-only card 9. Scope: Textile rendering and Cooklang semantics/canonical serialization at Oliver **3615e6253f0e17b410cf1b987507d30bfcde537c**. No owner-project edits, build/fetch in owner checkout, external writes, subdelegation, issue posting, or CommonMark campaign. Research files alone are written beside this report. Reproduction details and exact versions are in `conformance-results.md`; original source integrity is in `source-integrity.json`.

## Where we are

Oliver's Textile wall is explicitly a clean-room fixture audit, not a normative parser differential: [Textile audit opening](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/TEXTILE-PARITY.md#L7-L17). Its Cooklang HTML policy is explicitly application-owned, whereas the typed recipe and serializer have stronger semantic contracts: [Cooklang policy](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/COOKLANG.md#L262-L269), [fixed-point promise](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/COOKLANG.md#L374-L388).

**Executed:** fresh immutable source archives, no AGENTS.md within the snapshots, isolated trusted packages. Zig 0.16.0 built Oliver 1.1.0 with exact SHA; the existing official Cooklang corpus passed **60/60**. CommonMark **652/652** remains an owner-supplied premise, untouched and unverified by this card.

**Executed:** seed **9001**, **800 deterministic case executions**, half Textile/Python Textile 4.0.4 and half Cooklang/official cooklang-rs 0.18.7 via pinned bindings. Textile normalized agreement **240/400**; Cooklang **296/400**, plus **88 unequal outputs** and **16 reference rejections**. Final campaign execution errors: **zero**. These are not defect rates: serializers, extensions, documented grammar decisions and malformed-input oracle differences account for many unequal outputs. All exact inputs/outputs are in `corpus.jsonl` and `results.jsonl`.

### High-confidence findings

1. **Complete Cooklang block comments do not survive blank-line paragraph splitting.** Minimized `[-\n\n-]` renders two literal-text steps in Oliver and no steps in the official parser. This is semantic, not HTML prettification. Source cause: [blank-line paragraph flush](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L273-L290) precedes [paragraph-local comment-close discovery](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L617-L642). Corroborating grammar allows any comment content except the closing `-]`, without banning blank lines: [Cooklang EBNF](https://github.com/cooklang/spec/blob/f08832362abec6b16db8eb5ae6b421edd6813989/EBNF.md#L49-L50) (explicitly outdated overall; not treated as sole authority). Receipt: `minimized.json`, first case; original corpus case 25 also retains commented text as cooking instructions. Recommend a regression fix, not implemented here.
2. **Canonical serialization changes literal multiline tokens into ingredients.** On the 400 Cooklang inputs, **three semantic fixed-point failures and three idempotence failures**, all the same family (71, 242, 331). Minimized `@x{\n}` parses as text `@x{ }`, serializes to `@x{ }\n`, reparses as ingredient `x`, and next serializes to `@x{}\n`. Source cause: [line-local brace close](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L880-L887) plus newline-to-space text normalization plus [verbatim text emission](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang_serialize.zig#L109-L114). This contradicts the documented fixed point even if multiline components are deliberately unsupported. Receipt: `minimized-roundtrip.json`, `roundtrip-results.jsonl`. Recommend preserving semantic text during canonicalization or making the parsing strategy converge; not implemented here.

### Differences that are not new defect drafts

- Textile `bc. >` terminal code newline: serializer policy. Forcing `c[*o*]l`: already-documented deferral. Oliver big/small and pipe line attributes: legitimate extensions missing from this Textile reference. Raw HTML and signature interruption: documented Oliver policy. No new high-confidence Textile semantic regression established.
- Cooklang `@t,{}` and `@t {}`: punctuation and brace-adjacency policy explicitly recorded in source/docs; require a dialect decision, not blind oracle adoption.
- Cooklang recipe-reference JSON text: deliberate wire contract for the recipe pane, [closed #101](https://github.com/drawmeanelephant/oliver/issues/101), not proof that the library lost recipe references. Fixed `=quantity` provenance is also lost by the simplified reference binding; numeric agreement is not scaling conformance.
- Note comments (`>--`) differ, but note/comment precedence deserves contract clarification before treating it as a separate regression. Reference rejections are captured, not reported as Oliver crashes.

## What's improved

The evidenced earlier quality bar here is the **published fixture/canonical contract**, not an executed old-version benchmark. The 60-test corpus still passes in this fresh build. This card adds an independent actual-parser differential, ordered semantic projection, 400 serializer checks and **74 deterministic character-deletion comparisons**. It exposes two small counterexamples outside that green corpus. That is improved evidence, **not a shipped improvement to Oliver**. No prior commit was executed, so no claim that either finding is newly introduced, already fixed in another branch, or performance-regressed.

All original files in the four extracted snapshots remained byte-identical to their downloaded archives; hashes/counts are recorded. The owner checkout was left entirely alone.

## What's next

Two issue drafts in `issue-drafts.md`; neither posted. Duplicate check used read-only GitHub API pagination over **132 records: 37 issues and 95 PRs**, open and closed. Inspected titles and issue bodies; no existing issue matched these block-comment/fixed-point bugs. Existing fuzz issue [#94](https://github.com/drawmeanelephant/oliver/issues/94) is **closed** and scoped to no-crash/no-leak/determinism, not reference-semantic equivalence; it is related work, not a duplicate. [#101](https://github.com/drawmeanelephant/oliver/issues/101) is a closed JSON-view feature, not these fixes. Inventory receipt: `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/09-oliver/issue-inventory.json`.

Follow up narrowly: global/comment-aware block boundaries; canonical literal-text fixed points; regressions spanning blank lines and multiline braces. Leave CommonMark alone. Decide whether broader reference parity is desirable before expanding Textile's documented dialect. Reproduce with `sh reproduce.sh /absolute/results/path`.

**Gaps:** not every unequal mutation was individually adjudicated; no fuzz exhaustiveness, sanitizers, metadata comparison, alternative Textile implementations, raw binary-input handling, full Rust extension campaign or independent wheel build attestation. No general tests were run; only build, Cooklang canonical baseline and described campaigns. No project/site build validation was needed for these raw support artifacts; coordinator owns eventual blog filing and Boris validation/build. Source-only analysis and executed counts are separated throughout. No model routing or Factory authorship inferred.
