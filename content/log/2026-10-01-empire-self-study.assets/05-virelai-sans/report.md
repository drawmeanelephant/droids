# Card 5 — Virelai Mono glyph inventory

Observed 2026-10-01, starting at 12:40:23Z. Explore-only; no project edits,
builds, font rewrites, GitHub mutations, or owner-checkout operations.

## Where we are

**Verified answer: the premise is current, but it is not a coverage mismatch.**
At main SHA [`e023614728579b59f20298d333e8b5a8d989c199`](https://github.com/drawmeanelephant/virelai-sans/commit/e023614728579b59f20298d333e8b5a8d989c199),
the shipped Virelai Mono Regular v0.15.0 TTF has **133 glyph slots** and
the OTF has **131**. Both have the **same 125-entry Unicode cmap**.
The TTF-only slots are exactly `.null` (GID 1) and `nonmarkingreturn`
(GID 2), both empty, with `(advance, left side bearing)` of `(0, 0)`
and `(333, 0)` respectively. The OTF has neither.

Executed checks used installed fontTools **4.65.0** against a fresh
SHA-pinned GitHub archive. See [glyph-inventory.md](glyph-inventory.md) for
hashes, subtable evidence, assertions, and reproduction.
The counts also match the project's own
[README](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/README.md#L236-L260).

### Why the extras exist

Source inspection separates authored glyphs from export helpers:

- The builder explicitly creates `.notdef`, the approved encoded characters,
  and five unencoded operators, then delegates both formats to
  `FontForge.generate()`. It does **not** explicitly create `.null` or
  `nonmarkingreturn`.
  [Builder, lines 31–60](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/tools/build_mono.py#L31-L60).
- The pre-binary SFD export contains 131 `StartChar` records and neither helper;
  the AFM declares 131 character metrics.
  [SFD](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/src/VirelaiMono-Regular.sfd#L63-L67),
  [AFM](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/src/VirelaiMono-Regular.afm#L20).
- Independently pinned upstream FontForge SHA
  `5196fb260cc5c2011d94a4ab820c114b87319bb1` explicitly calls these
  automatic glyphs, reserves three initial slots for TrueType versus one for
  CFF, and emits blanks for absent slots 1–2.
  [Assignment](https://github.com/fontforge/fontforge/blob/5196fb260cc5c2011d94a4ab820c114b87319bb1/fontforge/tottf.c#L1305-L1339),
  [emission](https://github.com/fontforge/fontforge/blob/5196fb260cc5c2011d94a4ab820c114b87319bb1/fontforge/tottf.c#L1465-L1472).
  Its blank-metric branch explains zero for slot 1 and one-third em for
  slot 2 when no fixed width is supplied: 1000 / 3 becomes 333.
  [Metrics](https://github.com/fontforge/fontforge/blob/5196fb260cc5c2011d94a4ab820c114b87319bb1/fontforge/tottf.c#L1005-L1015).

Thus **intentional exporter convention is demonstrated in code**, not merely
inferred from common font practice. The project also documents the resulting
format-specific counts. This does **not** prove the owner separately chose
those helper names, their legacy mappings, or the 333-unit advance, nor that
every TrueType font must have them. The exact historical FontForge build used
to generate these artifacts was not established; current pinned upstream code
and shipped artifacts agree on the mechanism.

Upstream specification context: Microsoft's
[OpenType 1.7 recommendations](https://learn.microsoft.com/en-us/typography/opentype/otspec170/recom)
recommend an empty, zero-advance glyph 1 and a positive-advance carriage-return
glyph. Those are recommendations, not evidence of this owner's intent.
The [cmap specification](https://learn.microsoft.com/en-us/typography/opentype/spec/cmap)
describes character-code-to-glyph-index mappings; glyph slots and encoded
character coverage are different inventories.

### Important cmap qualification

“125 codepoints” here means **Unicode** coverage. Both Unicode subtables
(platform/encoding 0/3 and 3/1, format 4) have 125 mappings and no U+0000
or U+000D. However, the legacy Macintosh 1/0 format-0 cmap does reference
the TTF helpers: character codes 0, 8, 29 map to `.null`; 9 and 13 map
to `nonmarkingreturn`. Its 100 entries differ from the OTF's 96 entries.
The OTF legacy code 0 maps to `space`.

Do not describe the extras as wholly unmapped: they are **unencoded in the
Unicode cmap**, but referenced by the legacy cmap. Do not count those legacy
control mappings as two extra Unicode characters. All 125 Unicode-mapped
glyphs advance 620 in both formats; all common glyph advances agree.
Left-side bearings are not identical across all common glyphs, so this
check makes no claim of whole-font metric or outline identity.

## What's improved

The evidenced earlier state is merged foundation PR
[#17](https://github.com/drawmeanelephant/virelai-sans/pull/17), merge SHA
[`2f2eacdfd08edd22e2725e824b717b165c478ecc`](https://github.com/drawmeanelephant/virelai-sans/commit/2f2eacdfd08edd22e2725e824b717b165c478ecc),
v0.14.0. Direct inspection of its two binaries finds **128 TTF / 126 OTF**
slots, already with **125 Unicode mappings**.

Merged PR [#18](https://github.com/drawmeanelephant/virelai-sans/pull/18)
adds exactly five glyphs in each format:
`program.arrow`, `program.doublearrow`, `program.notequal`,
`program.lessequal`, `program.greaterequal`. Unicode coverage remains
identical; the persistent two-slot difference predates those additions.
The current arithmetic is:

```text
OTF: 125 Unicode-mapped glyphs + .notdef + 5 operators = 131
TTF: same 131 + .null + nonmarkingreturn               = 133
```

The builder assigns the operators 1240 units and places substitutions under
`ss01`; source cells remain 620.
[Builder, lines 47–65](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/tools/build_mono.py#L47-L65).
The shipped glyph-order/metrics/feature-list inspection agrees. This card
did not rerun shaping, rendering, or the project's full QA; those prior
results remain PR-author receipts rather than newly reproduced results.

Pipeline credit is supported, within limits: the foundation
[commit `81d3bc7`](https://github.com/drawmeanelephant/virelai-sans/commit/81d3bc772ddeba2a2bca45553c1b00eeda81e8ca)
and operator
[commit `9710ad1`](https://github.com/drawmeanelephant/virelai-sans/commit/9710ad1567c326f74ee9a4d6aea41dbb2ab900b1)
carry `factory-droid[bot]` co-author trailers. They establish credited Factory
participation, not a particular model, exclusive authorship, or a verified
allocation between Luna and Sol. This card is a Factory research worker's
read-only fontTools inspection, not another shipped font change.

## What's next

**No new issue recommended.** Answer the count question in the study rather
than normalize away valid exporter helpers or invent a missing character.
An optional explanatory README sentence would be documentation polish,
not a verified defect or implementation performed here.

Duplicate/state review covered all 19 issue/PR records returned by the
all-states GitHub listing. Relevant records: #7 closed; #17 and #18 merged,
respectively 2026-10-01 at 11:47:56Z and 12:04:08Z. #19 is open and concerns
sharp-s curvature, not this inventory. No glyph-count defect issue was found.
The releases API returned **zero release objects**; the tags API returned
only `v0.10.1`. “v0.15.0” here is the binary/README version, not an asserted
GitHub release or tag.

Upstream FontForge [#796](https://github.com/fontforge/fontforge/issues/796)
is still open and discusses `nonmarkingreturn`/CR naming and initial slots.
It is related historical context, not evidence that these Virelai artifacts
are faulty or a duplicate Virelai issue to close.

Verification gaps: no exact historical exporter-version provenance; no new
runtime test of legacy Macintosh control handling; no author statement
specifically choosing the helper metrics. None blocks the verified
slot-versus-Unicode-coverage answer. No project `AGENTS.md` exists anywhere
in the pinned archive; the supplied blog contract and study contract were
read and followed. Scratch files are under `/tmp/virelai-card5.AnUHhR`;
owner checkout `/Users/tbuddy/t3/misc/vir-sans` was untouched.
