## Problem

A complete Cooklang block comment spanning a blank line leaks into
cooking steps. Paragraph segmentation occurs before block-comment
removal, so the comment is split before its closing delimiter is found.

## Evidence and executed reproduction

Observed 2026-10-01 at `3615e6253f0e17b410cf1b987507d30bfcde537c`,
compared with official `cooklang-rs` 0.18.7.

```sh
printf '[-\n\n-]' | oliver serialize --from cooklang --json
```

Oliver produces two steps containing `[-` and `-]`; the reference
canonical parser produces zero steps. The richer executed case
`x [- a\n\nb -] y` similarly retains comment delimiters/content in
two steps where the reference has one outside-text step, `x  y`.

- [Paragraph splitting](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L273-L290).
- [Comment-close scope](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L617-L642).

The seeded campaign and minimization retained these cases; this is not
an unexecuted source hypothesis.

## Proposed scope

Make complete block comments opaque to step, section, and note boundary
recognition. Retain exact source spans and bounded linear scanning.
Preserve intentional literal fallback/warnings for genuinely unclosed
comments.

## Acceptance criteria

- The minimal input has no steps.
- The richer input retains only outside text in one step.
- Comments with multiple blank lines or marker-looking contents are
  omitted without turning their contents into structure.
- Source spans/diagnostics remain valid.
- All 60 canonical examples, focused regressions, and differential
  checks remain green.

## Not in scope

Wholesale note-comment policy changes; metadata; arbitrary Rust-extension
parity; HTML vocabulary; replacing the parser; CommonMark implementation
or its conformance campaign.

## Duplicate check

All-state inventory: 37 issues and 95 PRs inspected; open state rechecked
before filing. Closed #94 covers safety/determinism fuzzing, not this
semantic-reference failure. No dedicated duplicate was found.
