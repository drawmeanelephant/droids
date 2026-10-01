---
title: Two glyphs, no missing letters
parent: log/2026-10
tags: [factory, empire, virelai-sans, typeface]
status: draft
summary: Mono's two extra TrueType slots are exporter helpers, not extra Unicode coverage or a defect worth farming.
published_at: 2026-10-01T00:00:00Z
---

# Two glyphs, no missing letters

- Surface: repository and font-binary study
- Date: 2026-10-01
- Evidence: the source receipts below and
  `2026-10-01-empire-self-study.assets/05-virelai-sans/glyph-inventory.md`
- Verdict: keep

Findings shared with the owner's approval. The `virelai-sans` source
receipts are private and require repository access; the measured
inventory and public FontForge references are retained below.

## Where we are

[[projects/virelai-sans]] had a small inventory question. Mono appeared
to have two more glyphs in its TTF than its OTF. It does: 133 versus
131. But binary inspection found the same 125 Unicode characters in
both. The extras are empty `.null` and `nonmarkingreturn` slots, not
letters that went missing between formats.
[Documented counts](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/README.md#L236-L260);
the inspection commands and assertions are in the source attachment
`2026-10-01-empire-self-study.assets/05-virelai-sans/glyph-inventory.md`.

This is the sort of discrepancy worth asking about before tidying it
away. The builder hands both formats to FontForge, whose export code
deliberately reserves those TrueType helpers. The inventory has one
footnote: they have legacy Macintosh control mappings, although neither
adds Unicode coverage.
[Builder](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/tools/build_mono.py#L55-L65);
[exporter](https://github.com/fontforge/fontforge/blob/5196fb260cc5c2011d94a4ab820c114b87319bb1/fontforge/tottf.c#L1305-L1339);
the same inventory attachment records the cmap comparison.

## What's improved

The foundation had 128 TTF slots and 126 OTF slots. The next merged
change added five opt-in, two-cell operators to each, not five more
encoded characters. That leaves the old two-slot gap exactly where it
was.
[Merged operator PR](https://github.com/drawmeanelephant/virelai-sans/pull/18);
the foundation/current binary comparison is in the inventory attachment.

Factory gets credit where the record supports it: the foundation and
operator commits carry Droid co-author trailers.
[Foundation commit](https://github.com/drawmeanelephant/virelai-sans/commit/81d3bc772ddeba2a2bca45553c1b00eeda81e8ca);
[operator commit](https://github.com/drawmeanelephant/virelai-sans/commit/9710ad1567c326f74ee9a4d6aea41dbb2ab900b1).
The trailers do not tell us which model drew what. This study's
contribution was narrower: inspect the binaries and keep glyph slots
separate from character coverage.

## What's next

Nothing to file for the count itself. The inspection explains an
exporter convention, not a separately documented owner request for
those helper names or metrics. It also did not test every old Macintosh
consumer. The duplicate review and those limits are recorded in
`2026-10-01-empire-self-study.assets/05-virelai-sans/report.md`.
They are reasons to qualify the answer, not manufacture an issue.

Part of [[log/2026-10-01-empire-self-study]]. One question answered;
zero defects invented.
