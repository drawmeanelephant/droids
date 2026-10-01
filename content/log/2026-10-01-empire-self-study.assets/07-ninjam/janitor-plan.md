# Dependency-ordered phase-1 janitor plan

Baseline: fork `5b5f266d49d836b5700c09bea149cc88c11bd4b7`, upstream `f4c0eff3a1d8d5f3ead470d0c7405c3ee37da24e`, observed 2026-10-01. **Recommended, not implemented.** Build/CI revival is already delivered; phase 1 should certify and tidy that baseline, not repeat it.

Dependency graph: `J0 → (J1 || J2) → J3 → J4`. J4 is optional and owner-controlled. The two issue candidates correspond to J1 and J2; J0/J3 are acceptance work, not invented product bugs.

## J0 — Freeze the baseline and bound the maintenance surface

**State:** audit performed here; owner can adopt these receipts. **Depends on:** nothing.

**Evidence:** upstream is the merge base; fork 58 commits ahead/0 behind. [Upstream instructions][upstream], [maintained/excluded paths][scope], [current CI][ci-run], [Zig maintenance contract][zreadme].

**Task:** record fork/upstream SHAs, actual dependency commits, compiler versions and current CI/job URLs. State which targets are maintained (C++ server/core/new GUI; Zig conformance client) and which are excluded (historical ports/tools/VST2 plugin). Keep the frozen protocol and distinguish test-only delay/loss experiments from supported runtime controls. No mass deletion of legacy code.

**Acceptance:** an immutable revision pair; clean fresh checkout; exact build/test commands and results; known excluded surfaces; open/closed issue inventory reconciled; no claim that upstream builds fail or all clients are supported. Local audit already supplies 7/7 CTest, 27/27 Zig, vendor equality and static cross-build evidence.

## J1 — Repair the small documentation/support-contract mismatches

**Depends on:** J0. **Evidence:** [README][readme]/[CI][ci]; [Zig Linux prose][zlinux]/[backend flags][zbuild]/[runtime gate][zgate]; [tree map][scope].

**Task:** align Linux dependencies with the chosen GLFW backend; accurately describe live option/backend/defaults and macOS-only verified audio; remove absent `clients/` reference; distinguish CI smoke from interop/device testing. Retain explicitly anecdotal deployment sizing.

**Acceptance:** documentation-only diff; exact paths/packages/options checked against source; default CI remains green; no promised untested Linux audio or claimed load capacity. See issue draft 2.

## J2 — Close the pre-release notice/provenance packaging gap

**Depends on:** J0; may run beside J1. **Evidence:** [release recipe][release], [MIT][imgui-license], [Xiph Ogg][ogg-license]/[Vorbis][vorbis-license].

**Task:** inventory linked components and their required notices; deterministically include notice texts in all release zips. Record actual fetched dependency identities. Account for pkg-config selection: `BUILD_SHARED_LIBS=OFF` does not automatically force imported system packages static. First inspect package linkage; fix only an evidenced portability problem, not hypothetical dynamic breakage.

**Acceptance:** extracted macOS/Linux/Windows packages contain required notices and accurate component/source provenance; a packaging assertion checks notice presence; dependency/linkage manifest distinguishes system runtime requirements from bundled code. Same C++ tests remain green. See issue draft 1. No need to upgrade everything merely because libvorbis is old.

## J3 — Re-certify the current package baseline, not just old dry runs

**Depends on:** J1 and J2. **Evidence:** latest [CI][ci-run] is green; [release dispatch][dry-run] is green but at an older SHA; [PR #9][pr9] describes unsigned macOS and dynamic MSVC runtime constraints. [Registered tests][tests] identify actual coverage.

**Task:** in a future authorized follow-up, use a nonpublishing release dry run for the chosen revision. Extract manifests, verify SHA256SUMS, inspect architecture/linkage and launch the server/help path on matching OS runners. Capture prerequisite/runtime support expectations. Keep default CTest and Zig CI; optionally rerun the opt-in Zig demo on an explicitly permitted Core Audio machine if interop/live claims are being refreshed.

**Acceptance:** three-OS build/test/package receipts tied to one SHA; notice inclusion and checksum verification; advertised artifacts/architectures match manifests; launch/runtime requirements documented. Do not count a cross-built Linux binary as executed. Record sanitizer availability and non-Windows regression scope. For a refreshed live claim, need microphone permission plus real signal-energy/negative-control evidence—not just compiling Core Audio.

**Audit constraint:** no workflow was dispatched, no release artifact uploaded, no microphone accessed. Darwin scratch default C++ and Zig builds passed; other OS C++ execution rests on existing CI. This task requests future authorization, not covert remote writes.

## J4 — Owner decides whether to cut the first revival release

**Depends on:** J3. **Evidence:** [closed #5][issue5], [PR #9 owner tag boundary][pr9]; observed tags/releases empty.

**Task:** owner either approves a tag on the certified SHA or explicitly leaves distribution pending. If approved, use existing release automation; verify the actual published assets and source/version match. Do not turn the absence of a tag into a new automation issue.

**Acceptance:** recorded decision. If released, tag/SHA/assets/checksums/notices receipts; if deferred, accurate “automation ready; no release yet” status. This audit does neither tagging nor publication.

## Explicit non-goals and not-gates

- No protocol/framing redesign, new resynchronization protocol, transport replacement, authentication redesign or streaming/latency feature work.
- No new GUI/mixer, device routing, Linux live backend, Android client, Windows Zig support, or legacy/VST2 revival.
- No dependency churn, blanket warning cleanup, repository reshuffle, Docker, signing/notarization or server sizing benchmark in phase 1.
- Open [#32][issue32] remains its own measurement investigation; it is not a phase-1 gate or a duplicate issue candidate. Do not reopen the already resolved interval/drift/residual/RTT/truncation/diagnosis issues.
- No new CI scaffolding: CI already exists and passes. Broader coverage is a recommendation only where a specific supported claim needs evidence.

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
