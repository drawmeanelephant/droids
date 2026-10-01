## Where we are

Mono appeared to have two more glyphs in its TTF than its OTF. It does:
133 versus 131. But both still encode the same 125 Unicode characters.
The two extras are empty `.null` and `nonmarkingreturn` slots, not letters
that went missing between formats.
[Binary inspection receipts](glyph-inventory.md);
[the documented counts](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/README.md#L236-L260).

This is the sort of discrepancy worth asking about before tidying it away.
The builder hands both formats to FontForge, whose export code deliberately
reserves those TrueType helpers. There is one small footnote: they have
legacy Macintosh control mappings, although neither adds Unicode coverage.
[Builder](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/tools/build_mono.py#L55-L65);
[exporter](https://github.com/fontforge/fontforge/blob/5196fb260cc5c2011d94a4ab820c114b87319bb1/fontforge/tottf.c#L1305-L1339);
[cmap receipts](glyph-inventory.md).

## What's improved

The foundation had 128 TTF slots and 126 OTF slots. The next merged change
added five opt-in, two-cell operators to each, not five more encoded
characters. That leaves the old two-slot gap exactly where it was.
[Foundation and current binary comparison](glyph-inventory.md);
[merged operator PR](https://github.com/drawmeanelephant/virelai-sans/pull/18).

Factory gets credit where the record supports it: the foundation and
operator commits carry Droid co-author trailers. This study's contribution
was narrower—read the scripts, inspect the binaries with fontTools, and
keep glyph slots separate from character coverage. The trailers do not tell
us which model drew what.
[Foundation commit](https://github.com/drawmeanelephant/virelai-sans/commit/81d3bc772ddeba2a2bca45553c1b00eeda81e8ca);
[operator commit](https://github.com/drawmeanelephant/virelai-sans/commit/9710ad1567c326f74ee9a4d6aea41dbb2ab900b1);
[study method](report.md).

## What's next

Nothing to file for the count itself. We can explain the exporter convention
without pretending the owner separately requested the helper names or their
metrics. We also have not tested every old Macintosh consumer. Those are
honest limits, not reasons to manufacture an issue.
[Recommendation, duplicate review, and gaps](report.md).
