# Project mascots

Small supporting marks, not replacements for Manila's folder robot,
Factory-related branding, favicon, or Geist text faces.

The owner approved serving these artwork/font assets on
**droids.filed.fyi only**, on 2026-10-03. Virelai Sans has no published
redistribution licence; this approval is not a general reuse or commercial
licence, and it does not place these assets under Geist's SIL OFL.
They are also explicitly excluded from the site's MIT software licence;
see `../fonts/VIRELAI-NOTICE.txt` and the repository's `LICENSING.md`.
Serving WOFF2 makes the font retrievable. No other hosting target is
approved by this record. The owner also approved including these assets
in the `drawmeanelephant/droids.filed.fyi` GitHub repository and its
site-polish PR on the same date.

`mascots.json` pins Virelai Sans commit
`644ae7cea7c9b91db50eafee303d4a1011df2afd`, source/artifact hashes, and
every normalized source-font table. Oliver and the Filed robot SVGs are
byte-identical to the approved masters in that revision; their Muse
counterparts at `d8dfdc197ecf29eb64708bae8a221bd351e12ba8` match as well.
Sexiburger's SVG is exported from the native Sans `U+E001` COLR layers.
No artwork was redrawn.

The WOFF2 files contain the complete source OTF tables, including CFF
outlines, COLR v0/CPAL, metrics, names and shaping. Nothing is subsetted,
renamed, synthesized or added. CSS limits their use to private-use mascot
characters, and only the icon spans select these faces. A monochrome-only
renderer can use the source font's silhouette.

Normal Boris builds require no conversion tools or access to the private
source repository. To regenerate with Python 3.10+:

```sh
python3 -m venv /tmp/droids-mascot-venv
/tmp/droids-mascot-venv/bin/pip install -r tools/requirements-mascots.txt
/tmp/droids-mascot-venv/bin/python tools/build-mascots.py \
  --source-repo /absolute/path/to/virelai-sans
/tmp/droids-mascot-venv/bin/python tools/build-mascots.py --check
```

The converter reads the pinned Git blobs and fails if that revision is
missing. It never fetches, edits the source checkout, changes the upstream
web specimen's pin, or regenerates fonts. Repeated conversion must produce
the same bytes. Only the SFNT container checksum and WOFF2-required
`head.flags` bit 11 are normalized for table comparison.
