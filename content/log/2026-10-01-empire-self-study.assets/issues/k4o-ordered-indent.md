## Problem and executed reproduction

Template:

```text
{{ items | numbered }}
```

JSON:

```json
{"items":["1","2","3","4","5","6","7","8","9","10",["child"]]}
```

Current Markdown ends:

```text
9. 9
10. 10
   1. child
```

Oliver renders the child as an eleventh top-level item, not a nested
ordered list under item 10. Knap's adapted `{{ items | list:numbered }}`
emits a tab-indented child that renders under item 10.

## Evidence

Observed 2026-10-01 at `59f88233589d2643ba5b4f380e3db70664bba2b3`
against pinned Oliver `a45aa5ede557ea7cf7de727bdba61c1f80af544b`
and `knap@0.6.0`. Corpus case `numbered-ten-nested` was executed.
[Constant three-space indentation](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/filters.zig#L397-L442)
does not reach the parent content column once its marker becomes `10.`.

## Proposed scope

Compute child indentation relative to the actual parent marker width.
Assert the rendered tree at marker-width transitions rather than
requiring literal parity with knap's tab bytes.

## Acceptance criteria

- Children after items 9, 10, and 100 attach to their preceding parent,
  not as new siblings; cover deeper supported nesting.
- Checks assert actual parent/child structure, not merely an `<ol>`.
- Sibling numbering stays correct; Textile remains byte-identical;
  Markdown/GFM non-table parity and existing checks remain intact.

## Not in scope

Increasing the documented three-level limit; filter aliases; global list
format redesign; CommonMark parser changes.

## Duplicate check

The complete all-state issue/PR inventory and a fresh open-issue check
found no dedicated task. #18's `numbered` exclusion concerns an oracle
alias difference, not malformed nesting.
