# Reproducible glyph inventory

Executed on 2026-10-01 with Python 3 and fontTools 4.65.0. Only read shipped
font bytes; did not regenerate or save a font.

Current SHA: `e023614728579b59f20298d333e8b5a8d989c199`.
Earlier merged foundation SHA: `2f2eacdfd08edd22e2725e824b717b165c478ecc`.

## Compact observations

| Property | Current TTF | Current OTF |
|---|---:|---:|
| name ID 5 | Version 0.15.0 | Version 0.15.0 |
| maxp.numGlyphs / glyph-order length | 133 / 133 | 131 / 131 |
| Unicode best-cmap entries | 125 | 125 |
| Unicode mapped glyph advance values | {620} | {620} |
| Unicode 0/3 format-4 mappings | 125 | 125 |
| Unicode 3/1 format-4 mappings | 125 | 125 |
| Macintosh 1/0 format-0 mappings | 100 | 96 |
| Distinct glyph targets across *all* cmaps | 127 | 125 |
| GSUB feature tags | ss01 | ss01 |

Unicode best-cmap dictionaries are exactly equal. Current glyph-name set
difference: TTF minus OTF = `{.null, nonmarkingreturn}`; OTF minus TTF = `{}`.
The SFD has 131 glyph records and neither helper. AFM: `StartCharMetrics 131`.

```text
TTF order starts: .notdef, .null, nonmarkingreturn, space, exclam
OTF order starts: .notdef, space, exclam, quotedbl, numbersign

name                TTF GID   OTF GID   hmtx (advance, lsb)   outline bounds
.notdef             0         0         (620, 50)            (50, 0, 570, 533)
.null               1         absent    (0, 0)               none
nonmarkingreturn    2         absent    (333, 0)             none
space               3         1         (620, 0)             none
```

Glyphs outside the Unicode best cmap:

```text
Both: .notdef
      program.arrow          (1240, 100)
      program.doublearrow    (1240, 100)
      program.notequal       (1240, 160)
      program.lessequal      (1240, 207)
      program.greaterequal   (1240, 207)
TTF additionally: .null (0, 0), nonmarkingreturn (333, 0)
```

Legacy Macintosh cmap keys below 32 (these are **not** Unicode mappings):

```text
TTF: 0x00 -> .null
     0x08 -> .null
     0x09 -> nonmarkingreturn
     0x0D -> nonmarkingreturn
     0x1D -> .null
OTF: 0x00 -> space
Both Unicode subtables: no keys below 32
```

All common glyph advances agree between formats. Full hmtx tuples do not:
17 common glyph left-side bearings differ. No outline-equality or complete
metric-parity claim is made; investigating bearing conversion is outside
this inventory card and no defect was demonstrated.

Baseline v0.14.0 inspection:

```text
TTF: 128 slots, 125 Unicode mappings
OTF: 126 slots, 125 Unicode mappings
Each -> current: added the same five program.* glyphs listed above;
                removed none; Unicode cmap unchanged.
```

SHA-256 of current shipped files:

```text
fonts/VirelaiMono-Regular.ttf
3a42ec1b325e4596a5718c2c0fb4e827351e8dbefbb15e7f4e5068c9da056a8e
fonts/VirelaiMono-Regular.otf
77b6b8bc441c87beb543ac2586a0f2244c1c3658acd454fed31f693661d875e1
```

## Reproduction

Use a new scratch directory, never an owner checkout. `gh api` calls below
are read-only; local redirections write only the new scratch files. A trusted
fontTools installation is required. The original check used an existing
installation rather than installing anything.

```sh
set -o pipefail
SCRATCH=$(mktemp -d /tmp/virelai-inventory.XXXXXX)
export SCRATCH
SHA=e023614728579b59f20298d333e8b5a8d989c199
BASE=2f2eacdfd08edd22e2725e824b717b165c478ecc
gh api "repos/drawmeanelephant/virelai-sans/tarball/$SHA" > "$SCRATCH/source.tar.gz"
mkdir "$SCRATCH/source" "$SCRATCH/baseline"
tar -xzf "$SCRATCH/source.tar.gz" -C "$SCRATCH/source" --strip-components=1
find "$SCRATCH/source" -name AGENTS.md
# Observed: no AGENTS.md in the archive.
for ext in ttf otf; do
  gh api "repos/drawmeanelephant/virelai-sans/contents/fonts/VirelaiMono-Regular.$ext?ref=$BASE" \
    --jq .content | tr -d '\n' | base64 -D > "$SCRATCH/baseline/VirelaiMono-Regular.$ext"
done
```

`base64 -D` is the Darwin decode flag; use `base64 --decode` on GNU systems.
Then:

```sh
python3 - <<'PY'
import hashlib, os, fontTools
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.boundsPen import BoundsPen
r = Path(os.environ["SCRATCH"])
print("fontTools", fontTools.__version__)
faces = {}
for ext in ("ttf", "otf"):
    p = r / "source/fonts" / f"VirelaiMono-Regular.{ext}"
    f = faces[ext] = TTFont(p)
    order, cmap = f.getGlyphOrder(), f.getBestCmap()
    print(ext, hashlib.sha256(p.read_bytes()).hexdigest())
    print(f["name"].getDebugName(5), f["maxp"].numGlyphs,
          len(order), len(cmap), order[:5])
    for t in f["cmap"].tables:
        print("cmap", t.platformID, t.platEncID, t.format, len(t.cmap),
              {hex(k): v for k, v in t.cmap.items() if k < 32})
    print("outside Unicode cmap",
          [(n, f["hmtx"][n]) for n in order if n not in cmap.values()])
    gs = f.getGlyphSet()
    for n in (".notdef", ".null", "nonmarkingreturn", "space"):
        if n in order:
            pen = BoundsPen(gs); gs[n].draw(pen)
            print(n, order.index(n), f["hmtx"][n], pen.bounds)
    print("GSUB", [x.FeatureTag for x in f["GSUB"].table.FeatureList.FeatureRecord])
    old = TTFont(r / "baseline" / p.name)
    print("baseline", old["name"].getDebugName(5),
          len(old.getGlyphOrder()), len(old.getBestCmap()))
    print("added", sorted(set(order) - set(old.getGlyphOrder())),
          "removed", sorted(set(old.getGlyphOrder()) - set(order)),
          "Unicode unchanged", old.getBestCmap() == cmap)
a, b = faces["ttf"], faces["otf"]
assert a["maxp"].numGlyphs == len(a.getGlyphOrder()) == 133
assert b["maxp"].numGlyphs == len(b.getGlyphOrder()) == 131
assert a.getBestCmap() == b.getBestCmap() and len(a.getBestCmap()) == 125
assert set(a.getGlyphOrder()) - set(b.getGlyphOrder()) == {".null", "nonmarkingreturn"}
assert not set(b.getGlyphOrder()) - set(a.getGlyphOrder())
assert all(a["hmtx"][n][0] == b["hmtx"][n][0] for n in b.getGlyphOrder())
assert all(a["hmtx"][n][0] == 620 for n in a.getBestCmap().values())
assert a["hmtx"][".null"] == (0, 0)
assert a["hmtx"]["nonmarkingreturn"] == (333, 0)
assert a["glyf"][".null"].numberOfContours == 0
assert a["glyf"]["nonmarkingreturn"].numberOfContours == 0
s = (r / "source/src/VirelaiMono-Regular.sfd").read_text()
assert s.count("StartChar: ") == 131
assert "StartChar: .null\n" not in s
assert "StartChar: nonmarkingreturn\n" not in s
print("PASS: slot counts, Unicode equality, helper metrics/emptiness, source boundary")
PY
```

The underlying assertion set was executed and passed. This reproduction
combines the separately executed current inspection, baseline comparison,
and assertions into one compact command.

## Source and history checks

```sh
gh api --paginate 'repos/drawmeanelephant/virelai-sans/issues?state=all&per_page=100'
gh api --paginate 'repos/drawmeanelephant/virelai-sans/releases?per_page=100'
gh api repos/drawmeanelephant/virelai-sans/tags
gh api repos/drawmeanelephant/virelai-sans/pulls/17
gh api repos/drawmeanelephant/virelai-sans/pulls/18
gh api repos/drawmeanelephant/virelai-sans/pulls/17/commits
gh api repos/drawmeanelephant/virelai-sans/pulls/18/commits
```

Relevant source contracts:

- [Approved encoded character list](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/tools/virelai/mono.py#L12-L14):
  95 printable ASCII characters plus the 30 drawing characters.
- [Builder](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/tools/build_mono.py#L31-L65):
  explicit `.notdef`, encoded cells, five unencoded operators, then exports.
- [Existing QA scope/advance contracts](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/tools/qa.py#L3653-L3683)
  and [operator Unicode guard](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/tools/qa.py#L3728-L3747).
  Inspected, not rerun.
- [Pinned FontForge helper reservation](https://github.com/fontforge/fontforge/blob/5196fb260cc5c2011d94a4ab820c114b87319bb1/fontforge/tottf.c#L1305-L1339),
  [blank emission](https://github.com/fontforge/fontforge/blob/5196fb260cc5c2011d94a4ab820c114b87319bb1/fontforge/tottf.c#L1465-L1472),
  [metric defaults](https://github.com/fontforge/fontforge/blob/5196fb260cc5c2011d94a4ab820c114b87319bb1/fontforge/tottf.c#L1005-L1015).

The upstream source was retrieved through the GitHub contents API at that
immutable SHA. It demonstrates an intentional exporter convention, while
not identifying the historical installed exporter version or personal
author intent. Specification and duplicate context are in [report.md](report.md).
