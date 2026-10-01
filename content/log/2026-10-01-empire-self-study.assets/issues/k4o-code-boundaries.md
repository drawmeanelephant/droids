## Problem

Markdown code emission changes empty, all-space, and terminal-newline
content. Executed cases at `59f88233589d2643ba5b4f380e3db70664bba2b3`:

- `{{ text | code }}` with `{"text":""}` emits two backticks;
  Oliver renders them as visible paragraph text.
- With `{"text":"   "}`, the emitted span renders five spaces, not three.
- `{{ text | codeblock }}` with `{"text":"x\n"}` renders code content
  `x\n\n`, introducing an extra newline.

## Evidence

Observed 2026-10-01 against pinned Oliver
`a45aa5ede557ea7cf7de727bdba61c1f80af544b` and npm `knap@0.6.0`.
[Emitter source](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/filters.zig#L352-L365).

The all-space span is padded even though CommonMark does not remove
padding from an all-space span. The fence adds a newline even if input
already ends in one. Knap emits empty/plain-space inline output and a
single terminal newline for the corresponding fence. The oracle fence
uses its documented `code_block` name, so this is a semantic-content
comparison, not identical-template parity.

Captured corpus cases: `code-empty`, `code-only-spaces`,
`fence-terminal-newline`.

## Proposed scope

Add boundary-content regressions and make Markdown code emission avoid
invented delimiters or content. Preserve actual nonempty code; do not
adopt knap's trimming of `" a "` merely to obtain byte parity.

## Acceptance criteria

- Empty inline code produces no visible backticks.
- All-space input does not gain two spaces. Document whether it remains
  plain whitespace or code containing exactly the original spaces.
- Fenced `"x\n"` retains that code content; cover zero, one, and multiple
  terminal newlines.
- Boundary-backtick and longest-run delimiter cases still work.
- Markdown/GFM non-table output stays identical; Textile is unchanged;
  existing differential and structural checks pass.

## Not in scope

Filter renaming; multiline phrase support; full oracle trimming parity;
unrelated template/data changes; changes to Oliver or CommonMark parsing.

## Duplicate check

The complete all-state 20-record issue/PR inventory was inspected, and
open issues were rechecked before filing. [#18](https://github.com/drawmeanelephant/k4o/pull/18)
implemented the backend, not these content-boundary regressions; no
dedicated duplicate was found.
