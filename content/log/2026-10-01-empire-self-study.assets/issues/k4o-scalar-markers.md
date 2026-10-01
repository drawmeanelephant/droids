## Problem

A scalar list item containing `"1. numbered"` becomes a nested ordered
list instead of literal item text. Knap does this too: byte parity with
the oracle would preserve the structural problem.

This conflicts with the documented intent that data not silently turn
list items into other node types.

## Evidence and reproduction boundary

Observed 2026-10-01 at `59f88233589d2643ba5b4f380e3db70664bba2b3`,
using pinned Oliver `a45aa5ede557ea7cf7de727bdba61c1f80af544b`
and `knap@0.6.0`.

The executed `list-block-starts` corpus case included this scalar under
`{{ items | list }}`. K4o emitted `- 1. numbered`; Oliver's resulting
outer list item contains a nested `<ol><li>numbered</li></ol>`.
The same combined case correctly escaped headings, quotes, thematic
breaks, and HTML.

The singleton JSON `{"items":["1. numbered"]}` is a minimal extracted
reproduction, **not a separately executed invocation**.

- [Escaper](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/filters.zig#L315-L330).
- [Scalar list emission](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/filters.zig#L424-L442).
- [Structural contract](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/README.md#L393-L397).

## Proposed scope

Context-aware escaping of scalar list text, with structural tests
separating text-driven markers from genuine array-driven nesting.
Keep this in the structural lane, not a byte-parity lane.

## Acceptance criteria

- `"1. numbered"` renders as one literal scalar item without a nested
  ordered list.
- Add `1)` and multi-digit marker controls; these variants were not
  executed by this study.
- Genuine nested arrays still nest.
- Previously escaped headings, quotes, thematic breaks, and HTML stay
  literal.
- Textile stays unchanged; Markdown/GFM non-table parity and existing
  checks remain valid.

## Not in scope

Raw-interpolation sanitization; CommonMark parser changes; an upstream
knap change; a general security claim.

## Duplicate check

The complete all-state issue/PR inventory and a fresh open-issue check
found no dedicated task. #7's URL scheme validation is unrelated.
