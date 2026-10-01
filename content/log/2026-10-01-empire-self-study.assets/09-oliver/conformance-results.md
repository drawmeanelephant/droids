# Card 9 — executed conformance results

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/09-oliver/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Observation: 2026-10-01, receipts captured by 12:50:40 UTC. Explore-only; no implementation changes.

## Pins and dialect contracts

- Oliver **1.1.0**, commit [`3615e6253f0e17b410cf1b987507d30bfcde537c`](https://github.com/drawmeanelephant/oliver/tree/3615e6253f0e17b410cf1b987507d30bfcde537c); built in `/tmp/oliver-card09.pzZJqg/source`, Zig **0.16.0**, Darwin arm64, Python **3.14.7**. Owner checkout `/Users/tbuddy/t3/zig/oliver` was not used, modified, built, or fetched.
- Textile: actual [`textile/python-textile` implementation](https://github.com/textile/python-textile/tree/bb2d1191c432a8923e88edf6e114ecb5da3f3e98), commit **bb2d1191c432a8923e88edf6e114ecb5da3f3e98**, reports **4.0.4**. Textile organization implementation, not a universal normative oracle. Unrestricted parser, images enabled, `get_sizes=False` (no image fetch), `html_type='html5'`; Oliver `render --from textile --to html`. Oliver targets a documented hybrid Hobix/Textile 2 dialect, not Python Textile byte parity. In particular, line attributes and big/small phrases are deliberate Oliver features; bracket forcing, raw HTML recognition, multiline inline handling, and block interruptions differ by documented policy. [Oliver's audit](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/TEXTILE-PARITY.md).
- Cooklang: actual official **cooklang-rs 0.18.7**, SHA **1a05061db31fbbdb2ce4af6a96502fc3ff86c65d**, through third-party Python bindings **cooklang-bindings 0.6.0**, source SHA **43ee020d931c683794235b3cc2e2beb35ebe35d3**. [Binding pin](https://github.com/destos/cooklang-bindings/tree/43ee020d931c683794235b3cc2e2beb35ebe35d3/vendor), [official entry point](https://github.com/cooklang/cooklang-rs/blob/1a05061db31fbbdb2ce4af6a96502fc3ff86c65d/bindings/src/lib.rs#L21-L29): canonical parser, extensions **off**, scale **1.0**. This is not the WIP cooklang-py C parser. Rust/Cargo was not needed: trusted PyPI macOS arm64 binary wheel executed the official Rust parser.
- Isolated wheel dependencies: **nh3 0.3.6**, **regex 2026.9.29**, **PyYAML 6.0.3** (last unused by final campaign). No AGENTS.md existed inside any of the four snapshots. Source reviewed before the campaign: Oliver parsers/serializer/build definition, Python Textile core, binding adapter, Rust canonical entry point and component parser. `source-integrity.json` confirms every original archive file unchanged: 947 Oliver, 44 Textile, 65 binding, 108 Rust files.
- Cooklang HTML is explicitly Oliver-owned; comparing reference HTML bytes would be a false conformance test. Instead compare ordered steps, notes, sections and ingredient/cookware/timer occurrences via `serialize --json`. Normalize numbers/default absent amounts and text-part segmentation. Recipe-reference tokens deliberately become text in Oliver's JSON contract ([#101](https://github.com/drawmeanelephant/oliver/issues/101)); such differences do **not** prove the underlying parser failed to parse a reference.

## Primary deterministic campaign

Seed **9001**, 400 Textile + 400 Cooklang inputs: curated seeds followed by bounded insertion/wrapping/composition/name mutations. At most five seconds per Oliver invocation. Corpus includes duplicates deliberately; these are **800 case executions**, not 800 distinct inputs. Input digest **77db9e2dcdacbb7fa261ec07e316c52d50873d5c74d126272c40c7838b45d94b**. `corpus.jsonl`, `results.jsonl`, `summary.json` are the final campaign artifacts.

| Dialect | Cases | Normalized agreement | Unequal outputs | Reference rejected | Execution errors |
|---|---:|---:|---:|---:|---:|
| Textile | 400 | 240 | 160 | 0 | 0 |
| Cooklang | 400 | 296 | 88 | 16 | 0 |

These are **agreement counts, not spec pass/fail rates**. Unequal output is a triage queue, not a bug count. Textile raw-byte agreement was 0/400 because reference pretty-printing differs. Cooklang's `raw_equal` field in the script refers to already-projected structures, not raw JSON bytes.

HTML normalization decodes entities, sorts attributes, normalizes simple style declaration spelling/order, ignores block-only formatting whitespace, canonicalizes reference footnote prefixes, and ignores its extra reverse-reference id. It preserves inline whitespace and pre/code payloads. Reference UUID generation is fixed to zero in the harness, without editing the reference sources, to make raw results deterministic. Cooklang normalization joins adjacent text and turns explicit line-break parts into newline text, compares absent/default amounts alike, and compares `=1` numerically as 1. The binding loses fixed-scaling provenance; no scaling equivalence claim is made. CSS normalization is not a general CSS semantic equivalence checker.

## Triage: separate the kinds of difference

| Receipt | Classification | Interpretation |
|---|---|---|
| Textile case 18; minimized `bc. >` | Serializer policy | Oliver adds terminal newline inside code; reference does not. Preserved by comparator, not an unimplemented code-block claim. |
| Textile case 25 | Formatting whitespace | Nested-list indentation/newline differs; event comparator conservatively retains some `li` text whitespace. Not a semantic list failure. |
| Textile cases 30, 31 | Reference decoration | Footnote UUID/backref id normalizes; acronym adds a `span.caps` in reference. Not missing acronym semantics. |
| Textile cases 37–39 | Legitimate dialect extensions | Oliver line attributes, `++big++`, `--small--` are documented; reference lacks them. |
| Textile case 40; minimized `c[*o*]l` | Documented deferral | Oliver leaves forcing brackets; reference removes them. Already recorded in audit §2, not new regression. |
| Textile cases 41–42 | Documented policy differences | Raw HTML escaped, marker interrupts unseparated paragraph in Oliver. Neither is a new accidental defect. |
| Cooklang case 18; minimized `@t,{}` | Documented name grammar choice | Punctuation terminates Oliver name; reference accepts it in braced names. Do not silently replace Oliver's recorded grammar with the reference dialect. |
| Cooklang case 37; minimized `@t {}` | Documented adjacency choice | Oliver treats detached braces as text. [Implementation contract](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/src/cooklang.zig#L832-L864). |
| Cooklang case 20 | Wire/view contract | Oliver JSON emits recipe reference as text; Rust binding canonical view shortens path. Library reference semantics not adjudicated here. |
| Cooklang case 24 | Representation only | Explicit break vs newline text; final normalization agrees. |
| Cooklang case 25; minimized `[-\n\n-]` | High-confidence semantic divergence | Oliver leaks a complete block comment into two steps; reference emits no steps. New draft warranted. |
| Cooklang case 350; minimized `>--` | Observed comment/dialect question | Oliver notes retain comments; reference removes them. Needs explicit note/comment contract decision; not a separate high-confidence issue draft. |
| 16 Cooklang rejections | Oracle acceptance/error-policy difference | Official UniFFI entry point unwraps parse errors; binding catches panic as ParseError. Not Oliver crashes, and literal degradation may be Oliver policy. |

Remaining mutated unequal cases are **not individually adjudicated**; no claim that the table exhaustively assigns all 248 unequal cases to semantic bug families. Malformed delimiter/boundary cases and reference quirks remain a gap. No new Textile defect is asserted from this bounded run.

## Serializer follow-up executed on the same 400 Cooklang inputs

Exact original model vs reparsed canonical output, excluding spans only: **397/400 semantic fixed points; 397/400 byte-idempotent**. Failures at indices **71, 242, 331**, all one multiline-token normalization family. `roundtrip-results.jsonl` preserves original/reparsed models and serialized text.

Character-deletion minimization performed **74 comparisons** across six differential exemplars plus one fixed-point failure. Family predicates preserve the targeted construct; resulting inputs are 1-minimal under those predicates, not a proof of globally shortest counterexamples. `minimized.json` and `minimized-roundtrip.json` preserve exact results.

Smallest fixed-point receipt found: `@x{\n}`. First parse yields text `@x{ }`; first serialization is `@x{ }\n`; reparse yields an ingredient `x`; second serialization is `@x{}\n`. This independently violates Oliver's own [semantic/idempotence contract](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/COOKLANG.md#L374-L388), regardless of which reference dialect accepts multiline tokens. New draft warranted.

## Baselines, commands and limits

Executed `zig build cooklang-conformance`: **60/60 passed**. Owner-supplied CommonMark **652/652** was neither rerun nor changed. No general `zig build test`/CommonMark campaign was run. Compile includes the existing library but did not modify its CommonMark code.

Exact successful commands (isolated scratch):

```sh
cd /tmp/oliver-card09.pzZJqg/source
zig build -Dcommit=3615e6253f0e17b410cf1b987507d30bfcde537c
zig-out/bin/oliver --version
zig build cooklang-conformance
PYTHONPATH=/tmp/oliver-card09.pzZJqg/textile /tmp/oliver-card09.pzZJqg/venv/bin/python /Users/tbuddy/.factory/worktrees/727ce942/droidsblog/content/log/2026-10-01-empire-self-study.assets/09-oliver/campaign.py /tmp/oliver-card09.pzZJqg/source/zig-out/bin/oliver /Users/tbuddy/.factory/worktrees/727ce942/droidsblog/content/log/2026-10-01-empire-self-study.assets/09-oliver
PYTHONPATH=/tmp/oliver-card09.pzZJqg/textile /tmp/oliver-card09.pzZJqg/venv/bin/python /Users/tbuddy/.factory/worktrees/727ce942/droidsblog/content/log/2026-10-01-empire-self-study.assets/09-oliver/minimize.py /tmp/oliver-card09.pzZJqg/source/zig-out/bin/oliver /Users/tbuddy/.factory/worktrees/727ce942/droidsblog/content/log/2026-10-01-empire-self-study.assets/09-oliver
```

`reproduce.sh` records exact snapshot-download/venv/install/build commands and reruns the final scripts into an explicitly supplied output directory. Requires Python 3.14 and Zig 0.16.0; no claims for other PRNG/interpreter versions.

During harness development, an invalid guessed regex version (2026.9.18) failed installation; resolved to available pinned 2026.9.29. A probe attempted to JSON-encode an opaque reference metadata class and failed; final adapter projects only relevant blocks. Initial XHTML campaign encountered 13 documented Oliver raw-HTML policy rejections, so final campaign explicitly uses HTML/HTML5 on both sides. Initial adapters also overcounted line-break/fixed-amount/footnote differences; final results above replace those preliminary scores. Two unsuccessful GitHub path lookups (`Cargo.lock` in bindings root and `spec.md` in spec root) are not evidence of missing parsers/spec. No reference/toolchain execution blocker remained.

Bounds: no sanitizers, exhaustive fuzzing, arbitrary byte corpus, alternative Textile engine, whole Rust default-extension comparison, metadata/frontmatter comparison, or broad semantic coverage claim. Binding artifact reports upstream 0.18.7 and its source pin, but wheel reproducible-build equivalence was not independently rebuilt/attested. No model-routing history is claimed.
