#!/bin/sh
# Requires authenticated gh, Zig 0.16.0, Python 3.14, trusted PyPI access.
# Run: sh reproduce.sh /absolute/output/directory
set -eu
HERE=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
OUT=${1:?Supply an output directory for generated campaign results}
PYTHON=${PYTHON:-python3}
SCRATCH=$(mktemp -d /tmp/oliver-card09-repro.XXXXXX)
echo "Scratch: $SCRATCH"
[ "$(zig version)" = 0.16.0 ]
"$PYTHON" -c 'import sys; assert sys.version_info[:2] == (3,14)'
fetch_snapshot() {
 repo=$1; sha=$2; name=$3
 gh api "repos/$repo/tarball/$sha" > "$SCRATCH/$name.tar.gz"
 mkdir "$SCRATCH/$name"
 tar -xzf "$SCRATCH/$name.tar.gz" -C "$SCRATCH/$name" --strip-components=1
}
fetch_snapshot drawmeanelephant/oliver 3615e6253f0e17b410cf1b987507d30bfcde537c source
fetch_snapshot textile/python-textile bb2d1191c432a8923e88edf6e114ecb5da3f3e98 textile
# No AGENTS.md existed at these pins. Stop if an archive unexpectedly contains one.
if find "$SCRATCH/source" "$SCRATCH/textile" -name AGENTS.md | grep -q .; then
 echo 'Unexpected instructions: read them before proceeding' >&2; exit 1
fi
"$PYTHON" -m venv "$SCRATCH/venv"
"$SCRATCH/venv/bin/pip" install --only-binary=:all: cooklang-bindings==0.6.0 nh3==0.3.6 regex==2026.9.29 PyYAML==6.0.3
(cd "$SCRATCH/source" && zig build -Dcommit=3615e6253f0e17b410cf1b987507d30bfcde537c && zig-out/bin/oliver --version && zig build cooklang-conformance)
PYTHONPATH="$SCRATCH/textile" "$SCRATCH/venv/bin/python" "$HERE/campaign.py" "$SCRATCH/source/zig-out/bin/oliver" "$OUT"
PYTHONPATH="$SCRATCH/textile" "$SCRATCH/venv/bin/python" "$HERE/minimize.py" "$SCRATCH/source/zig-out/bin/oliver" "$OUT"
# Only scratch/build output and explicitly requested result files were written.
