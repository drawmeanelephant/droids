# Issue drafts — unfiled

Coordinator disposition, 2026-10-01: a fresh open-issue check found no
duplicates. Candidates 1–3 were filed as
[#21](https://github.com/drawmeanelephant/k4o/issues/21),
[#22](https://github.com/drawmeanelephant/k4o/issues/22), and
[#23](https://github.com/drawmeanelephant/k4o/issues/23).
The original research drafts below were unfiled at worker completion.
Exact posted bodies are in `../issues/`; no implementation changed.

Target repository for all three: `drawmeanelephant/k4o`.
Observed at `59f88233589d2643ba5b4f380e3db70664bba2b3`, 2026-10-01.
Repros were executed against knap 0.6.0 and pinned Oliver
`a45aa5ede557ea7cf7de727bdba61c1f80af544b`, not just inferred from source.
Exact captured results are in `measured-cases.json`.

Duplication check for each: inspected all open/closed issues and PRs returned
by the complete 20-item inventory, plus a fresh open-issue query (zero).
No candidate below is covered by any existing title/body. Backend PR #18
and GFM issue #19/PR #20 are completed prerequisites, not duplicates of
these boundary defects. Recheck state before filing.

## 1. Preserve empty/whitespace code values and terminal-newline fence content

**Problem.** The Markdown code emitters introduce visible/content bytes:

| Template and JSON | Actual k4o Markdown | Actual Oliver HTML |
|---|---|---|
| `{{ text \| code }}`, `{"text":""}` | `"``"` | `"<p>``</p>\n"` |
| same, `{"text":"   "}` | ``"`     `"`` | `"<p><code>     </code></p>\n"` |
| `{{ text \| codeblock }}`, `{"text":"x\n"}` | `"```\nx\n\n```"` | `"<pre><code>x\n\n</code></pre>\n"` |

The first two knap `code` outputs were `""` and `"   "` respectively;
knap `code_block` for the third input emitted `"```\nx\n```\n"`, rendering
`"<pre><code>x\n</code></pre>\n"`. The fence oracle uses the documented
different filter name; this is a semantic-content comparison, not identical
template parity.

**Evidence.** Cases `code-empty`, `code-only-spaces`,
`fence-terminal-newline`; [inline/fenced emitter source](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/filters.zig#L352-L365).
The emitter pads every boundary-space string, but CommonMark does not strip
padding from an all-space span. The fence unconditionally adds a newline even
when the source already ends in one.

**Proposed scope.** Add boundary-content regression cases and make the Markdown
code emitters avoid invented delimiters/content for these values. Preserve
actual nonempty code content; do not adopt knap's trimming of `" a "` merely
for byte parity.

**Acceptance criteria.**
- Empty inline code produces no visible backticks (an empty output is
  oracle-compatible).
- All-space input does not acquire two extra spaces; explicitly document
  whether it renders plain whitespace like knap or code containing exactly
  the original spaces.
- Fenced `"x\n"` renders code content `"x\n"`, not `"x\n\n"`; verify zero,
  one, and multiple terminal newlines.
- Boundary-backtick and longest-run delimiter cases remain valid.
- Markdown and GFM non-table output remain identical; Textile unchanged;
  existing differential and structural checks pass.

**Non-goals.** No filter rename, multiline phrase support, full oracle trimming
parity, or unrelated template/data changes.

**Duplication.** No existing issue addresses code-span emptiness/padding or
fence terminal-newline content. #18 provides the backend, not these tests.

## 2. Indent nested ordered lists relative to the actual parent marker width

**Problem/repro.**

Template: `{{ items | numbered }}`.
JSON: `{"items":["1","2","3","4","5","6","7","8","9","10",["child"]]}`.
Actual output ends `"9. 9\n10. 10\n   1. child"`.
Oliver renders the child as an eleventh top-level `<li>`, not a nested `<ol>`
under item 10. With knap's adapted `{{ items | list:numbered }}`, output ends
`"10. 10\n\t1. child"` and the child is nested under item 10.

**Evidence.** Case `numbered-ten-nested`;
[constant three-space indentation](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/filters.zig#L397-L442).
The nested block must reach the parent content column, which widens when the
parent marker becomes `10.`.

**Proposed scope.** Derive child indentation from the actual parent marker
width, and test the width transitions using rendered tree structure.

**Acceptance criteria.**
- Child arrays after items 9, 10, and 100 attach to their preceding parent,
  not as new siblings; test deeper nesting within the supported depth.
- Assert actual nesting (not merely presence of an `<ol>`).
- Keep sibling numbering correct, Textile byte-identical, and Markdown/GFM
  non-table parity intact.
- Do not require knap's literal tab bytes if different indentation renders
  the correct tree.

**Non-goals.** No increase to the documented three-level limit, filter alias
change, or global list-format redesign.

**Duplication.** No existing issue addresses parent-marker width; #18's
`numbered` exclusion records an alias difference, not malformed nesting.

## 3. Escape ordered-list markers in scalar Markdown list-item text

**Problem/repro.**

Template: `{{ items | list }}`.
JSON: `{"items":["1. numbered"]}`.
The executed combined `list-block-starts` case contains this exact item;
k4o emits `"- 1. numbered"` and Oliver renders
`"<li>\n<ol>\n<li>numbered</li>\n</ol>\n</li>"` inside the outer list.
A scalar item becomes another list. The same combined case correctly escapes
`"# heading"`, `"> quote"`, `"---"` and `"<script>"`.

**Evidence.** `list-block-starts` includes full stdout/HTML;
[escaper](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/filters.zig#L315-L330)
does not escape the ordered-marker dot;
[list emission](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/src/filters.zig#L424-L442)
passes scalar text through it. This conflicts with the documented structural
intent that data not silently turn list items into different nodes
([README](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/README.md#L393-L397)).
Knap also emits the nested list here: copying oracle bytes would preserve
the problem, not fix it.

**Proposed scope.** Add context-aware escaping for scalar list-item text and
structural checks that distinguish array-driven nesting from text-driven
nesting. The `"1. numbered"` subcase was executed within the combined case;
the singleton JSON above is a minimal extracted repro, not a separately
executed invocation.

**Acceptance criteria.**
- `"1. numbered"` renders literally as one scalar `<li>` without a nested
  `<ol>`; cover `1)` and multi-digit markers as additional tests (these
  additional marker variants were not executed in this study).
- Genuine nested arrays still produce nested lists.
- Existing escaped headings, quotes, thematic breaks and HTML stay literal.
- Textile unchanged; Markdown/GFM non-table parity preserved.
- Keep this regression in a k4o structural lane, not the byte-parity lane.

**Non-goals.** No raw-interpolation escaping/sanitization, CommonMark parser
changes, or upstream knap behavioral change.

**Duplication.** None of the existing issues concerns numeric marker injection
inside scalar list data. #7's link URL scheme validation is unrelated.

## Not new issues

- CommonMark backend: merged #18.
- Opt-in GFM tables: closed #19, merged #20.
- Structured object/array interpolation: existing closed #6; don't reopen
  solely because raw JSON is surprising.
- GFM tables rendering as paragraphs in Oliver's strict CommonMark mode:
  deliberate, documented format tradeoff.
- Other observed oracle differences: retain corpus evidence; do not file
  blanket "27 divergences" or whole-language parity claims.
