# Issue recommendation — none

Target reviewed: `drawmeanelephant/virelai-sans`.
Observation: 2026-10-01; main `e023614728579b59f20298d333e8b5a8d989c199`.

No actionable, deduplicated concern was established. The 133 TTF / 131 OTF
inventory is accurate, with identical 125-character Unicode coverage.
The two TTF-only empty helper slots match demonstrated FontForge export
logic, rather than a lost or extra designed character.

The 333-unit `nonmarkingreturn` advance is not a 620-unit Unicode source-cell
violation: that helper has no Unicode mapping in this font. It does have
legacy Macintosh control mappings; no runtime malfunction was demonstrated.
Do not turn an untested compatibility question into a bug.

Duplicate check: read all 19 open/closed issue and PR records. #7 is closed;
foundation #17 and operators #18 are merged and explicitly document the
format-specific counts. #19 remains open for unrelated sharp-s work.
No existing Virelai count-defect issue was found. Upstream FontForge #796
is open, but is a historical naming/order discussion, not a demonstrated
Virelai defect.

Optional follow-up, not an issue draft: the owner may choose a README
sentence explaining the two exporter slots and the legacy-cmap qualification.
No edit is proposed as necessary for acceptance; no issue was posted.

Receipts and exact reproducible inventory: [report.md](report.md) and
[glyph-inventory.md](glyph-inventory.md).
