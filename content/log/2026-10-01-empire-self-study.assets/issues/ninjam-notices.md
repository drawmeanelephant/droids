## Problem

The release workflow statically incorporates third-party components but
packages binaries, README, and the top-level GPL license without the
third-party notice texts. ImGui's MIT and libogg/libvorbis's BSD licenses
require retained or reproduced notices.

No fork release was published when checked. This is a packaging gap to
resolve before distribution, not a claim of a shipped license violation
or a legal certification.

## Evidence

Observed 2026-10-01 at `5b5f266d49d836b5700c09bea149cc88c11bd4b7`.

- [Zip recipe](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/.github/workflows/release.yml#L60-L97).
- [GUI linkage](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/ninjam/imguiclient/CMakeLists.txt#L9-L21)
  and [Ogg/Vorbis selection](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/CMakeLists.txt#L43-L104).
- [ImGui license](https://github.com/ocornut/imgui/blob/01380c579715e62fb9a8d6ec0502c4ea83bfde6e/LICENSE.txt#L3-L13),
  [Ogg license](https://github.com/xiph/ogg/blob/be05b13e98b048f0b5a0f5fa8ce514d56db5f822/COPYING#L1-L12),
  [Vorbis license](https://github.com/xiph/vorbis/blob/0657aee69dec8508a0011f47f3b69d7538e9d262/COPYING#L1-L12).

## Proposed scope

Inventory the actual linked components and pins. Collect their required
copyright/license texts in a deterministic notices bundle, include it
in each binary archive, and assert its presence during dry-run packaging.
Keep source/provenance information aligned with the packaged revision.

## Acceptance criteria

- All three platform archive manifests include readable notices for
  their actual linked components.
- Packaging checks fail if required notices disappear.
- Existing builds and CTest remain green.
- A nonpublishing release dry run supplies manifests and checksum
  receipts.

## Not in scope

License changes; dependency upgrades; client redesign; external legal
assurance; signing/notarization; Docker; creating a tag or publishing a
release.

## Existing work and duplicate check

[#5](https://github.com/drawmeanelephant/ninjam/issues/5) and
[PR #9](https://github.com/drawmeanelephant/ninjam/pull/9) own release
automation and leave tagging to the owner. They describe the current
archive layout, not a notices bundle. All fork issue/PR records were
reviewed; a fresh open-issue check found only the unrelated #32 interval
investigation.
