# Issue drafts — NINJAM phase-1 tail

Coordinator disposition, 2026-10-01: after a fresh duplicate check,
candidate 1 was filed as
[#36](https://github.com/drawmeanelephant/ninjam/issues/36)
and candidate 2 as
[#37](https://github.com/drawmeanelephant/ninjam/issues/37).
The research drafts below were unfiled at worker completion.
Exact posted bodies are in `../issues/`; no release was published.

Observed 2026-10-01 at fork `5b5f266d49d836b5700c09bea149cc88c11bd4b7`. Drafts only; nothing posted.

## Candidate 1 — Include third-party notices in release archives before the first tag

- **Target:** `drawmeanelephant/ninjam`.
- **Problem:** release.yml builds statically incorporated third-party components but packages only binaries, README and the top-level GPL LICENSE. README names licenses without reproducing required texts. ImGui MIT and libogg/libvorbis BSD explicitly require retained/reproduced notices. There are no published fork releases yet; this is a packaging gap to fix before distribution, not a claim of a shipped violation.
- **Evidence:** [zip contents recipe][release], [linked GUI dependencies][gui-deps], [Ogg/Vorbis selection][cmake], [ImGui requirement][imgui-license], [Ogg requirement][ogg-license], [Vorbis requirement][vorbis-license].
- **Proposed scope:** inventory actual linked components/pins; collect their copyright/license texts in a deterministic notices bundle; include it in every binary zip; add an archive-content acceptance assertion to dry-run packaging. Check that source/provenance information corresponds to the packaged revision. No legal-certification claim.
- **Acceptance:** all three platform zip manifests include readable notices for linked third-party components; tests fail if mandatory notice files disappear; existing builds/CTest pass; a nonpublishing release dry run provides manifest and SHA256SUMS receipts. Notices cover actual linkage, not merely every directory in the repository.
- **Non-goals:** license changes, dependency upgrades, client redesign, external legal assurance, signing/notarization, Docker, tag/publish action.
- **Duplication check:** reviewed all fork issues/PRs (open and closed). #5/PR #9 concern release automation and describe the current four-file archive layout; neither tracks a third-party notice bundle. Upstream #14/#4/PR #9 concern release availability/automation, not this notice gap. Distinct pre-release follow-up, link #5/PR #9 rather than reopening the whole automation project.

## Candidate 2 — Align build and platform documentation with current CMake/Zig behavior

- **Target:** `drawmeanelephant/ninjam`.
- **Problem:** root README Linux packages lag CI's resolved GLFW Wayland prerequisites. zclient README describes Linux live audio as requiring ALSA headers while build.zig defines `MA_NO_ALSA`, `MA_NO_PULSEAUDIO`, `MA_NO_JACK`; it also says `live=false` removes live compilation whereas miniaudio is always compiled and the option gates runtime behavior. Root tree map mentions a nonexistent `clients/` directory.
- **Evidence:** [Linux README][readme] versus [CI packages][ci]; [Linux live prose][zlinux] and [Zig maintenance contract][zreadme] versus [backend flags][zbuild] and [always-added sources/runtime gate][zgate]; [tree map][scope]. No fresh Linux configure failure is asserted by this Darwin audit.
- **Proposed scope:** documentation-only reconciliation to the supported default build and backend behavior; remove phantom path; distinguish compiled code, runtime capability, verified hardware, opt-in demo and CI coverage. Preserve macOS-only verified live scope; no adding ALSA to satisfy stale prose.
- **Acceptance:** README prerequisites match CI or explicitly document an alternative X11-only configure; Zig option text matches build.zig; Linux live is not presented as working merely after installing headers; tree paths exist; normal macOS/Linux CI remains green; no implementation/backend/feature changes in this patch.
- **Non-goals:** Linux live audio, Windows Zig support, legacy-port revival, feature/UI work, CMake redesign, full documentation rewrite.
- **Duplication check:** #3 is closed for the actual Ubuntu configure fix and latest Ubuntu CI passes. This draft updates prose only, not a reopening of that failure. #12/PR #12 established zclient maintenance documentation; PR #33 has completed live work, but no open issue tracks these current doc contradictions. Upstream #18/#5 request Linux/build help, not this fork's contradictory support text. Link prior work.

## Existing items — do not create duplicates

- **First release:** closed [#5][issue5] / [PR #9][pr9] already own automation and explicitly leave tagging to the owner. No tags/releases observed. Recommend owner-approved follow-through after notices and current dry-run checks; no new “add releases” issue.
- **Interval onset:** open [#32][issue32] already tracks the remaining marginal formula discrepancy. Do not file a duplicate, reinterpret it as core brokenness or require its resolution for phase-1 baseline.
- Sanitization, MSVC linking, Ubuntu configure, reconnect, deployment and BPI changes already landed (#1–#4/#6/#7); no replacement tickets.

[upstream]: https://github.com/justinfrankel/ninjam/blob/f4c0eff3a1d8d5f3ead470d0c7405c3ee37da24e/README#L1-L8
[readme]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/README.md#L12-L34
[deployment]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/README.md#L47-L97
[scope]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/README.md#L122-L162
[cmake]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/CMakeLists.txt#L43-L104
[gui-deps]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/ninjam/imguiclient/CMakeLists.txt#L9-L21
[tests]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/ninjam/tests/CMakeLists.txt#L15-L133
[ci]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/.github/workflows/ci.yml#L7-L73
[release]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/.github/workflows/release.yml#L60-L97
[zreadme]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/README.md#L79-L122
[zlinux]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/README.md#L154-L174
[zbuild]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/build.zig#L3-L15
[zgate]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/build.zig#L45-L88
[vendor]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/vendor/refresh-vendor.sh#L23-L42
[zverify]: https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/README.md#L176-L213
[ci-run]: https://github.com/drawmeanelephant/ninjam/actions/runs/36790606854
[dry-run]: https://github.com/drawmeanelephant/ninjam/actions/runs/36501207174
[revival]: https://github.com/drawmeanelephant/ninjam/commit/6320cb31
[factory]: https://github.com/drawmeanelephant/ninjam/commit/e88ae5933a5ee0b3a20963a81c8f0cbba4be0b2e
[pr9]: https://github.com/drawmeanelephant/ninjam/pull/9
[pr11]: https://github.com/drawmeanelephant/ninjam/pull/11
[pr12]: https://github.com/drawmeanelephant/ninjam/pull/12
[pr33]: https://github.com/drawmeanelephant/ninjam/pull/33
[pr35]: https://github.com/drawmeanelephant/ninjam/pull/35
[issue5]: https://github.com/drawmeanelephant/ninjam/issues/5
[issue32]: https://github.com/drawmeanelephant/ninjam/issues/32
[imgui-license]: https://github.com/ocornut/imgui/blob/01380c579715e62fb9a8d6ec0502c4ea83bfde6e/LICENSE.txt#L3-L13
[ogg-license]: https://github.com/xiph/ogg/blob/be05b13e98b048f0b5a0f5fa8ce514d56db5f822/COPYING#L1-L12
[vorbis-license]: https://github.com/xiph/vorbis/blob/0657aee69dec8508a0011f47f3b69d7538e9d262/COPYING#L1-L12
