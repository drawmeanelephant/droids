# k4o — compact oracle corpus / manifest

Observed 2026-10-01; k4o
`59f88233589d2643ba5b4f380e3db70664bba2b3`.
This is an **explore-only** corpus, not new backend code and not a proposed
full-language parity gate.

## Reference and rendering identities

- Oracle: Obsidian npm **`knap@0.6.0`**, Node `v22.23.2`.
  Tarball: `https://registry.npmjs.org/knap/-/knap-0.6.0.tgz`.
  Integrity:
  `sha512-FpuNFQ67rrgbZu3prheLA05/ND0gdHchRBC43Abn5CmROwn8XdYdar5+fRcylN/jrDnSNKj3aFdg92qvQJbYZA==`.
  Dependency: locked `dayjs@1.11.23`.
  [Immutable lockfile receipt](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/tools/differential/package-lock.json).
- Reference operation: `knap render TEMPLATE --data JSON`, stdout only.
  CLI success requires exit 0 and empty stderr; error evidence includes status,
  empty stdout and diagnostic, not an invented rendered output.
- HTML observation: freshly built **Oliver 1.1.0** at
  `a45aa5ede557ea7cf7de727bdba61c1f80af544b`;
  `render --from markdown --raw-html allowed`.
  This is CommonMark 0.31.2, **not GFM table parsing**. Raw HTML was intentionally
  allowed to observe raw/interpolated data, not to endorse it as safe.
- The upstream doc SHA `6395cb8b5432b3c3495eab43c10b0d637e021592`
  identifies k4o's clean-room documentation source. No upstream implementation
  source was read and no npm-package-to-Git-source identity is asserted.

## Files and evidence levels

| Artifact | Contents | Evidence level |
|---|---|---|
| `baseline-cases.json` | 34 original compatible inputs, JSON context, committed oracle stdout/status | Reverified by the unchanged upstream harness |
| `measured-cases.json` | 52 exploratory inputs, context, oracle source/version, exact stdout/stderr/status, actual Oliver HTML from both programs, classifications | Executed locally, no invented expectations |
| `proposed-cases.json` | 8 future probes, context, purpose; null expected output | Proposed only, not executed |
| `evidence.json` | Current SHA, issue inventory, merged PR records, current CI observation, measured accounting | Read-only GitHub + local execution |
| `replay-corpus.py` | Snapshot reproduction using explicit pinned binary paths | Research-only harness, not project code |

The baseline harness also covers the 52 existing fixture/example templates:
**99 total checks = 34 dedicated corpus cases + 52 fixture cases + 13
structural probes**. Its **75 byte-parity checks = 34 + (52 − 11)**,
including two GFM-table fixtures. These are executed harness counts; not
99 distinct template-language constructs or 99 oracle-parity checks.
[Harness accounting and exclusions](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/tools/differential/run.py#L142-L238).

Additional exploration: **52 paired cases**, **25 exact stdout/status matches**,
**27 differences**. Knap accepted all 52; k4o accepted 48, rejecting multiline
bold/code/blockquote and four-level lists under its documented subset.
Do not add these counts to the baseline as unique coverage: categories overlap.

## Test lanes: what to compare

1. **Compatible byte oracle.** Existing ordinary headings, phrases, lists,
   missing values, comments, nested loops, and malformed inputs; preserve
   exact bytes, including final newline. Unicode raw and ordinary bold values
   also matched in these probes.
2. **Adapted semantic probes.** Keep both templates in the record:
   k4o `codeblock` → knap `code_block`; k4o `numbered` → knap `list:numbered`;
   k4o `label | link:url` → knap `url | link:label`.
   Never call these same-template parity. Parentheses may differ in emitted
   URL bytes yet render to the same link.
3. **Intentional policy boundaries.** Raw interpolation retains Markdown/HTML
   and entity syntax; phrase filters escape supplied text. Knap bold generally
   retains that markup while its link filter escapes labels. HTML tables versus
   pipe tables, three-level list limits, phrase newlines, leading nested-list
   promotion and loop whitespace require explicit subset/policy annotations.
4. **Structural regressions.** Assert code content and nesting, not just tag
   presence. The executed empty/all-space code, terminal-newline fence,
   item-10 child, and scalar numeric-marker cases support the three drafts.
5. **GFM-only interpretation.** Two basic pipe-table cases matched oracle
   bytes. Escaped table-cell data did not. Oliver reads pipes as paragraphs;
   no GFM HTML expectation was invented.

## Selected exact observations

Strings below use JSON-style escapes; full bytes and context are in the machine
manifest. `K` is k4o and `N` is knap.

| Case | Template/context | Verified output / interpretation |
|---|---|---|
| `raw-html` | `{{ text }}`, `text="<em>raw</em>"` | N=K `"<em>raw</em>"`; both render raw `<em>` |
| `bold-html` | `{{ text \| bold }}`, same text | N `"**<em>raw</em>**"`; K `"**\\<em\\>raw\\</em\\>**"`; differing raw-vs-literal HTML |
| `raw-template-tags` | `{{ text }}`, data contains template-looking tags | N=K retain data verbatim; not recursive template evaluation |
| `bold-entities` | text `"&amp; &#x41; &bogus; &"` | N keeps entity syntax; K emits `"**&amp;amp; &amp;#x41; &amp;bogus; &amp;**"` |
| `raw-unicode` | composed/decomposed accents, Japanese, emoji | N=K `"café é 日本語 🐿️"`; no normalization observed |
| `code-ticks-boundary` | `{{ text \| code }}`, text ``"`a`"`` | N=K `"`` `a` ``"` |
| `code-empty` | code, `text=""` | N `""`; K `"``"` → visible backticks |
| `code-only-spaces` | code, `text="   "` | N `"   "`; K ``"`     `"`` → code with five spaces |
| `code-space-boundaries` | code, `text=" a "` | N `" `a` "`; K ``"`  a  `"``; N trims code content, K preserves it |
| `fence-terminal-newline` | adapted fence names, `text="x\n"` | N `"```\nx\n```\n"`; K `"```\nx\n\n```"` → extra blank content line |
| `list-blank-line` | `items=["one\n\ncontinuation","two"]` | N=K `"- one\n\ncontinuation\n- two"`; **two lists separated by a paragraph**, not one multiline item |
| `numbered-ten-nested` | ten parent items then `["child"]` | N nests via tab; K three spaces produces child as eleventh sibling |
| `list-block-starts` | includes scalar `"1. numbered"` | K escapes heading/quote/rule/HTML but numeric marker becomes nested `<ol>`; N also nests it |
| `loop-empty-bodies` | false conditional in two iterations, framed by A/B | N `"AB"`; K `"A\nB"` |
| `link-parens` | adapted link direction, `url="https://example.com/a(b)"` | N percent-encodes, K backslash-escapes; same Oliver HTML |
| `table-gfm-basic` | `rows=[["H"],["x"]]` | N=K `"|  |\n| - |\n| H |\n| x |"`; strict CommonMark paragraph |

These are witnesses, not normative expected behavior for every backend.
For example, raw entities and tags are legitimate data, so a blanket
`"{{" not in output` assertion would falsely reject the measured tag-data
case. Likewise `list-blank-line` demonstrates byte parity without preserving
the intuitive one-item structure.

## Coverage manifest

The machine corpus supplies full JSON data and both measured outputs for every
row; classifications below keep the map navigable. A successful parse is not
automatically correct structure.

| Case ID | Classification | stdout/status pair | Oliver HTML |
|---|---|---|---|
| `raw-punctuation` | raw-interpolation | match | same |
| `bold-punctuation` | escaping-phrase | different | different / rejected |
| `raw-entities` | raw-interpolation | match | same |
| `bold-entities` | escaping-phrase | different | different / rejected |
| `raw-html` | raw-interpolation | match | same |
| `bold-html` | escaping-phrase | different | different / rejected |
| `raw-unicode` | raw-interpolation | match | same |
| `bold-unicode` | escaping-phrase | match | same |
| `raw-template-tags` | raw-interpolation | match | same |
| `bold-template-tags` | escaping-phrase | match | same |
| `literal-markdown` | literal-template | match | same |
| `bold-star` | emphasis-boundary | different | different / rejected |
| `bold-spaces` | emphasis-boundary | match | same |
| `bold-only-spaces` | emphasis-boundary | match | same |
| `bold-empty` | emphasis-boundary | match | same |
| `bold-newline` | emphasis-boundary | different | different / rejected |
| `chain-italic-heading-punctuation` | chain | different | different / rejected |
| `chain-code-bold` | chain | match | same |
| `code-only-spaces` | code-span | different | different / rejected |
| `code-space-boundaries` | code-span | different | different / rejected |
| `code-ticks-boundary` | code-span | match | same |
| `code-long-ticks` | code-span | match | same |
| `code-empty` | code-span | different | different / rejected |
| `code-newline` | code-span | different | different / rejected |
| `code-entity-html` | code-span | match | same |
| `fence-ticks` | code-fence-adapted | match | same |
| `fence-terminal-newline` | code-fence-adapted | different | different / rejected |
| `fence-empty` | code-fence-adapted | different | different / rejected |
| `fence-html-entity` | code-fence-adapted | match | same |
| `literal-fence` | literal-template | match | same |
| `list-leading-nested` | list-structure | different | different / rejected |
| `list-leading-siblings` | list-structure | different | different / rejected |
| `list-multiline` | list-structure | match | same |
| `list-blank-line` | list-structure | match | same |
| `list-block-starts` | list-structure | different | different / rejected |
| `list-entity-unicode` | list-structure | different | different / rejected |
| `list-four-levels` | list-structure | different | different / rejected |
| `numbered-ten-nested` | ordered-list-adapted | different | different / rejected |
| `loop-blank` | loop-whitespace | match | same |
| `loop-standalone` | loop-whitespace | different | same |
| `loop-adjacent` | loop-whitespace | different | different / rejected |
| `loop-empty-bodies` | loop-whitespace | different | different / rejected |
| `link-parens` | link-direction-adapted | different | different / rejected |
| `link-ampersand` | link-direction-adapted | match | same |
| `link-html-entity` | link-direction-adapted | match | same |
| `link-angle` | link-direction-adapted | different | same |
| `link-unicode` | link-direction-adapted | match | same |
| `table-gfm-basic` | gfm-table | match | same |
| `table-commonmark-basic` | commonmark-html-table | different | different / rejected |
| `table-gfm-escaping` | gfm-table | different | different / rejected |
| `table-commonmark-escaping` | commonmark-html-table | different | different / rejected |
| `blockquote-newline` | phrase-validation | different | different / rejected |


## Proposed, not executed

`proposed-cases.json` enumerates tabs/NBSP in code; CRLF phrase text; ordered
parent width at 100; `1)`/multi-digit scalar list markers; blank-line continuation
blocks; backslash URLs; pipe-cell rejection; structured raw interpolation.
They have **no expected stdout or HTML**. Structured interpolation already
has closed [#6](https://github.com/drawmeanelephant/k4o/issues/6), so that probe
is a compatibility witness, not a new issue proposal.

## Reproduction

Use fresh scratch snapshots, read any snapshot `AGENTS.md`, and inspect build/
harness scripts before execution. No `AGENTS.md` was present in this study's
k4o or Oliver snapshots. The command paths below are the scratch used here:

```sh
gh api repos/drawmeanelephant/k4o/tarball/59f88233589d2643ba5b4f380e3db70664bba2b3 > "$SCRATCH/k4o.tar.gz"
gh api repos/drawmeanelephant/oliver/tarball/a45aa5ede557ea7cf7de727bdba61c1f80af544b > "$SCRATCH/oliver.tar.gz"
# Extract each into its own fresh directory; do not touch an owner's checkout.
npm ci --prefix "$SCRATCH/repo/tools/differential" --ignore-scripts --no-audit --no-fund --cache "$SCRATCH/npm-cache"
cd "$SCRATCH/repo" && zig build -Doptimize=ReleaseSafe --global-cache-dir "$SCRATCH/zig-global-cache"
cd "$SCRATCH/oliver" && zig build -Doptimize=ReleaseSafe \
  -Dcommit=a45aa5ede557ea7cf7de727bdba61c1f80af544b --global-cache-dir "$SCRATCH/zig-global-cache"
cd "$SCRATCH/repo" && python3 tools/differential/run.py --oliver "$SCRATCH/oliver/zig-out/bin/oliver"
```

For retained exploratory captures:

```sh
python3 "/Users/tbuddy/.factory/worktrees/727ce942/droidsblog/content/log/2026-10-01-empire-self-study.assets/04-k4o/replay-corpus.py" \
  --knap /tmp/k4o-study.D6RccH/repo/tools/differential/node_modules/.bin/knap \
  --k4o /tmp/k4o-study.D6RccH/repo/zig-out/bin/k4o \
  --oliver /tmp/k4o-study.D6RccH/oliver/zig-out/bin/oliver
```

The replay checks each program against **its own measured snapshot**, not that
all exploratory cases equal the oracle. Research-output expectations are not
proposed project fixture updates. No package install, project source edit,
or external write is performed by the replay script.
