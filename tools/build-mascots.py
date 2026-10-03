"""Lossless, pinned mascot webfonts and matching decorative SVGs.

Normal site builds use the committed assets. Regeneration reads Git blobs,
never working-tree fonts or a network download, and does not change sources.
"""
import argparse
import hashlib
import io
import json
import subprocess
from pathlib import Path
from xml.sax.saxutils import quoteattr

import fontTools
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "manila/assets"
MANIFEST = ASSETS / "icons/mascots.json"
SOURCE = "644ae7cea7c9b91db50eafee303d4a1011df2afd"
FACES = ("VirelaiMascots-Regular", "VirelaiSans-Regular")
MARKS = (
    ("oliver", "Oliver", "VirelaiMascots-Regular", 0xE008, "src/mascots/oliver.svg"),
    ("filed-robot", "Filed robot", "VirelaiMascots-Regular", 0xE009, "src/mascots/filed-robot.svg"),
    ("sexiburger", "Sexiburger", "VirelaiSans-Regular", 0xE001, None),
)


def sha(data):
    return hashlib.sha256(data).hexdigest()


def table_data(font, tag):
    data = font.getTableData(tag)
    if tag == "head":
        data = bytearray(data)
        data[8:12] = b"\0\0\0\0"
        flags = int.from_bytes(data[16:18], "big") & ~0x0800
        data[16:18] = flags.to_bytes(2, "big")
        return bytes(data)
    return data


def tables(font):
    return {str(tag): sha(table_data(font, tag)) for tag in sorted(font.reader.keys())}


def pinned(repo, name):
    return subprocess.check_output(
        ["git", "-C", str(repo), "show", f"{SOURCE}:{name}"], stderr=subprocess.PIPE
    )


def verify(original, web):
    assert tables(original) == tables(web), "A font table changed"
    assert original.getGlyphOrder() == web.getGlyphOrder(), "Glyph order changed"
    assert original.getBestCmap() == web.getBestCmap(), "Character coverage changed"
    assert original["hmtx"].metrics == web["hmtx"].metrics, "Metrics changed"


def glyph_svg(font, codepoint):
    """Export the actual COLR layers for the mark without an SVG master."""
    name = font.getBestCmap()[codepoint]
    glyphs = font.getGlyphSet()
    bounds = BoundsPen(glyphs)
    glyphs[name].draw(bounds)
    left, bottom, right, top = bounds.bounds
    paths = []
    for layer in font["COLR"].ColorLayers[name]:
        pen = SVGPathPen(glyphs)
        glyphs[layer.name].draw(pen)
        if layer.colorID == 0xFFFF:
            paint, opacity = "currentColor", 1
        else:
            color = font["CPAL"].palettes[0][layer.colorID]
            paint = f"#{color.red:02x}{color.green:02x}{color.blue:02x}"
            opacity = color.alpha / 255
        paths.append(
            f'<path d={quoteattr(pen.getCommands())} fill="{paint}" opacity="{opacity:g}"/>'
        )
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{left:g} {-top:g} {right-left:g} {top-bottom:g}">'
        '<g transform="scale(1,-1)">' + "".join(paths) + "</g></svg>\n"
    ).encode()


def build(repo):
    assert fontTools.__version__ == "4.60.1", "Install tools/requirements-mascots.txt before regenerating"
    manifest = {
        "sourceRepository": "drawmeanelephant/virelai-sans",
        "sourceCommit": SOURCE,
        "fonttools": "4.60.1",
        "permission": "Owner approved serving these assets on droids.filed.fyi and including them in the drawmeanelephant/droids.filed.fyi GitHub repository, 2026-10-03. No general redistribution licence is granted.",
        "faces": [],
        "marks": [],
    }
    originals = {}
    (ASSETS / "icons").mkdir(parents=True, exist_ok=True)
    for face in FACES:
        data = pinned(repo, f"fonts/{face}.otf")
        original = TTFont(io.BytesIO(data), recalcTimestamp=False, recalcBBoxes=False)
        originals[face] = original
        font = TTFont(io.BytesIO(data), recalcTimestamp=False, recalcBBoxes=False)
        assert font["COLR"].version == 0 and font["OS/2"].usWeightClass == 400
        font.flavor = "woff2"
        destination = ASSETS / "fonts" / f"{face}.woff2"
        font.save(destination, reorderTables=False)
        web = TTFont(destination, recalcTimestamp=False, recalcBBoxes=False)
        verify(original, web)
        manifest["faces"].append({
            "name": face,
            "file": f"fonts/{face}.woff2",
            "sourceFile": f"fonts/{face}.otf",
            "sourceSha256": sha(data),
            "sha256": sha(destination.read_bytes()),
            "bytes": destination.stat().st_size,
            "tables": tables(original),
        })
        print(f"{destination.name}: {destination.stat().st_size:,} bytes; every table preserved")
    for key, label, face, cp, master in MARKS:
        svg = pinned(repo, master) if master else glyph_svg(originals[face], cp)
        destination = ASSETS / "icons" / f"{key}.svg"
        destination.write_bytes(svg)
        manifest["marks"].append({
            "id": key, "label": label, "face": face,
            "codepoint": f"U+{cp:04X}",
            "file": f"icons/{key}.svg", "sha256": sha(svg),
            "sourceFile": master or f"fonts/{face}.otf#U+{cp:04X}",
        })
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")


def check():
    manifest = json.loads(MANIFEST.read_text())
    assert manifest["sourceCommit"] == SOURCE
    fonts = {}
    for face in manifest["faces"]:
        path = ASSETS / face["file"]
        assert sha(path.read_bytes()) == face["sha256"], f"Changed asset: {path}"
        assert path.stat().st_size == face["bytes"]
        font = TTFont(path, recalcTimestamp=False, recalcBBoxes=False)
        assert font.flavor == "woff2" and font["COLR"].version == 0 and "CPAL" in font
        assert tables(font) == face["tables"], f"Changed font tables: {path}"
        fonts[face["name"]] = font
    for mark in manifest["marks"]:
        assert int(mark["codepoint"][2:], 16) in fonts[mark["face"]].getBestCmap()
        assert sha((ASSETS / mark["file"]).read_bytes()) == mark["sha256"]
    print("PASS: webfont hashes, all original tables, color palettes, glyph coverage and SVG hashes")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-repo", type=Path, help="Local Virelai Sans Git checkout")
    parser.add_argument("--check", action="store_true", help="Verify committed assets without a source checkout")
    args = parser.parse_args()
    if args.check:
        check()
    elif args.source_repo:
        build(args.source_repo.resolve())
        check()
    else:
        parser.error("use --source-repo for regeneration, or --check for offline verification")
