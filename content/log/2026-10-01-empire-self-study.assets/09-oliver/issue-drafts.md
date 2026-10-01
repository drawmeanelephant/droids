# Two deduplicated drafts — not posted

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/09-oliver/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Coordinator disposition, 2026-10-01: after refreshing HEAD and open
state, candidates 1 and 2 were filed as
[#133](https://github.com/drawmeanelephant/oliver/issues/133) and
[#134](https://github.com/drawmeanelephant/oliver/issues/134).
The research drafts below were unposted at worker completion.
Exact posted bodies are in `../issues/`; CommonMark remains untouched.

Observed 2026-10-01, Oliver SHA **3615e6253f0e17b410cf1b987507d30bfcde537c**. Before filing, coordinator should refresh issue state. Read-only pagination found **37 issues and 95 PRs**, all states; issue titles/bodies inspected and inventory retained in `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/09-oliver/issue-inventory.json`. Neither concern matched an existing issue. Related closed #94 concerns safety/determinism fuzzing, not reference semantics; closed #101 specifies the JSON view, not canonical text preservation. No separate Textile defect draft is warranted: tested differences are documented choices, serializer/decorative differences, or insufficiently adjudicated mutations.

## 1. Cooklang block comments leak into steps when the comment contains a blank line

- **Target repo:** `drawmeanelephant/oliver`.
- **Problem:** paragraph segmentation happens before block-comment removal, so a complete `[- ... -]` spanning an empty line becomes two literal instructions instead of being omitted.
- **Evidence:** executed minimized input `[-\n\n-]`; Oliver semantic dump has two steps containing `[-` and `-]`; official cooklang-rs 0.18.7 canonical parser yields zero steps. `minimized.json` first case and corpus/result index 25 preserve receipts. [Paragraph split](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L273-L290), [comment-close scope](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L617-L642).
- **Repro:** `printf '[-\n\n-]' | oliver serialize --from cooklang --json` at the pin. Richer repro: `x [- a\n\nb -] y`; reference produces one text step `x  y`, Oliver produces two steps with comment delimiters/content.
- **Proposed scope:** make complete block comments opaque to step/section/note boundary recognition; retain exact source spans and bounded linear scanning. Preserve existing literal fallback/warnings for genuinely unclosed comments.
- **Acceptance criteria:** minimized input has no steps; richer repro retains only outside text in one step; variants with multiple empty lines and marker-looking text inside comments are omitted; exact spans/diagnostics remain valid; 60 canonical tests remain green; focused tests and differential regression pass.
- **Non-goals:** changing note-comment policy wholesale, metadata, Rust extension parity, Cooklang HTML vocabulary, CommonMark implementation/campaign, or replacing the parser with the reference.
- **Duplication check:** no matching open/closed issue body or title in the 37-issue inventory. #94 related safety campaign, not duplicate. No issue filed.

## 2. Cooklang canonical serializer violates semantic fixed points for line-split literal tokens

- **Target repo:** `drawmeanelephant/oliver`.
- **Problem:** a multiline near-token falls back to text, whose normalized newline becomes a space. Verbatim canonical output now forms a valid token, so reparse changes text into an ingredient/cookware and serialization is not idempotent.
- **Evidence:** 3/400 executed same-corpus Cooklang inputs fail both semantic fixed point and byte idempotence (indices 71, 242, 331). Minimized `@x{\n}`: original model text `@x{ }`; serialized bytes `@x{ }\n`; reparsed ingredient `x`, empty quantity; second bytes `@x{}\n`. `minimized-roundtrip.json` and `roundtrip-results.jsonl`. [Promised contract](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/COOKLANG.md#L374-L388); [line-local fallback](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L880-L887).
- **Repro:** `printf '@x{\n}' | oliver serialize --from cooklang` produces `@x{ }` plus newline; feed that output through `serialize --json` and observe ingredient instead of text. Feed through canonical serialization again: different bytes.
- **Proposed scope:** choose a parser/serializer strategy that preserves semantic text through canonicalization. Supporting multiline components is one possible language-contract decision, not a mandatory fix; preserving literal fallback semantics is also valid.
- **Acceptance criteria:** `parse(serialize(parse(x)))` equals original model, spans excepted, and second serialization is byte-identical for the minimized case and ingredients/cookware/timers split at name, quantity, units and close brace; official 60-test corpus and all 400 retained roundtrip cases pass; invalid-token diagnostics remain intentional.
- **Non-goals:** byte-identical source roundtripping, CST/trivia preservation, arbitrary Rust dialect adoption, metadata/HTML vocabulary changes, recipe-reference JSON contract changes, CommonMark edits/campaign.
- **Duplication check:** no matching open/closed issue title/body. #101's JSON pane contract and #94's safety fuzzing do not resolve this documented canonical-text promise. No issue filed.
