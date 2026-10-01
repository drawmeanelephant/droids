## Problem

Current documentation contradicts the supported build and audio scope:

- Root Linux prerequisites lag CI's resolved GLFW Wayland packages.
- The Zig README describes Linux live audio as requiring ALSA headers,
  while the build disables ALSA, PulseAudio, and JACK.
- `live=false` is described as removing live compilation, but miniaudio
  is always compiled and the option gates runtime behavior.
- The root tree map names a nonexistent `clients/` directory.

This is source-demonstrated prose drift. The Darwin audit does not claim
a freshly reproduced Linux configure or hardware-audio failure.

## Evidence

Observed 2026-10-01 at `5b5f266d49d836b5700c09bea149cc88c11bd4b7`.

- [Root build prose](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/README.md#L12-L34)
  versus [CI packages](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/.github/workflows/ci.yml#L7-L73).
- [Linux live prose](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/README.md#L154-L174)
  and [option contract](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/README.md#L79-L122)
  versus [backend flags](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/build.zig#L3-L15)
  and [compilation/runtime gate](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/build.zig#L45-L88).
- [Tree map](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/README.md#L122-L162).

## Proposed scope

Documentation-only reconciliation to the current default build and
backend behavior. Distinguish compiled code, runtime capability,
hardware verification, optional demos, and CI coverage. Preserve the
macOS-only verified live scope; do not add an audio backend to make stale
prose true.

## Acceptance criteria

- Linux prerequisites match CI or explicitly describe an alternative
  X11-only configuration.
- Zig option descriptions match `build.zig`.
- Installing ALSA headers alone is not presented as enabling Linux live
  audio.
- Referenced tree paths exist.
- Normal CI stays green without implementation or backend changes.

## Not in scope

Linux live audio; Windows Zig support; legacy-port revival; UI/features;
CMake redesign; a full documentation rewrite.

## Existing work and duplicate check

Closed #3 fixed the actual Ubuntu configure problem. #12/PR #12
established Zig maintenance docs, and PR #33 completed live work.
All fork issue/PR records were reviewed; a fresh open-issue check found
no task for these surviving documentation contradictions.
