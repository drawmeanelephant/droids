## Problem

Cooklang canonical serialization violates its semantic fixed-point
promise for line-split near-tokens. A token falls back to literal text;
normalizing its newline to a space makes that text a valid ingredient
or cookware token on reparse.

## Evidence and executed reproduction

Observed 2026-10-01 at `3615e6253f0e17b410cf1b987507d30bfcde537c`.
Three of the 400 retained Cooklang inputs failed semantic fixed points
and byte idempotence. Minimized case:

```sh
printf '@x{\n}' | oliver serialize --from cooklang
```

The original model is text `@x{ }`. Canonical output is `@x{ }\n`.
Reparsing that output yields ingredient `x` with empty quantity;
serializing again yields different bytes, `@x{}\n`.

- [Fixed-point contract](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/COOKLANG.md#L374-L388).
- [Line-local fallback](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L880-L887).

## Proposed scope

Choose a parser/serializer strategy that preserves semantic text through
canonicalization. Supporting multiline components is one possible
language-contract decision, not a mandatory fix; preserving literal
fallback semantics is also valid.

## Acceptance criteria

- `parse(serialize(parse(x)))` equals the original semantic model,
  source spans excepted, and a second serialization is byte-identical.
- Cover the minimized case and ingredient/cookware/timer near-tokens
  split at name, quantity, units, and closing brace.
- The official 60-example corpus and all 400 retained roundtrip cases
  pass.
- Invalid-token diagnostics remain intentional and tested.

## Not in scope

Byte-identical source roundtripping; CST/trivia preservation; arbitrary
Rust dialect adoption; metadata or HTML changes; recipe-reference JSON
changes; CommonMark implementation or its campaign.

## Duplicate check

The all-state 37-issue/95-PR inventory and a fresh open-state check found
no dedicated duplicate. #101 concerns the JSON-pane contract and #94
safety fuzzing; neither resolves this canonical-text promise.
