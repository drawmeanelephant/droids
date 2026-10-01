# Card 7 — NINJAM phase-1 janitor audit

Observation: 2026-10-01. Explore-only; recommendations below are not changes.

## Scope and sources

Owner premise: audit a fork revival and order phase-1 janitor work toward a trustworthy baseline, not a new client design.

- Fork `drawmeanelephant/ninjam`, main: `5b5f266d49d836b5700c09bea149cc88c11bd4b7` (2026-09-30).
- Parent `justinfrankel/ninjam`, HEAD: `f4c0eff3a1d8d5f3ead470d0c7405c3ee37da24e` (2025-06-01).
- Fresh detached snapshot: `/tmp/ninjam-audit.uKqgK7/snapshot`; out-of-tree CMake build: `/tmp/ninjam-audit.uKqgK7/build`. Read the study contract first. No `AGENTS.md` exists in this snapshot. No existing project checkout was used or altered; final snapshot `git status --short` was empty.
- Read-only `gh` repository/commit/issue/PR/run/job/release/tag queries; both open and closed fork issues and PRs, upstream issues and relevant PRs inspected. All inventories refer to the observation date, not permanent states.
- Source inspection, executed local checks, historical CI and repository documentation are distinguished below. No implementation, external state, tag, release or issue was changed.

## Where we are

**Phase-1 premise: substantially already completed, with a small baseline/documentation/distribution tail.** This is not an abandoned tree awaiting its first build system. The fork has a CMake GUI/core/server build, tests, a three-OS CI matrix, protocol documentation, parser regression fixtures and a separately maintained Zig conformance client. Current CI is green and the fresh local build passed. [Build instructions][readme], [test registration][tests], [current run][ci-run].

### Fork versus upstream

`git merge-base fork upstream` equals the upstream SHA above; `git rev-list --left-right --count upstream...fork` returned `0 58`: no missing commits from the inspected upstream HEAD, 58 fork-only commits including merges. Diff: 510 files, 597,817 additions, 46 deletions (includes vendored sources and evidence). Upstream's README directs server users to `make`, describes historical clients as needing attention, and points to the VST2-dependent REAPER plug-in. It was not built in this audit; its age is not a demonstrated failure. [Upstream README][upstream].

WDL and the top-level LICENSE have no diff against upstream. Core differences include signed pan parsing, API const-correctness, parser bounds fixes, relayed-text sanitization, BPI 128, disconnect diagnostics, and experimental delay/loss instrumentation. `ninjam/netmsg.cpp` has 249 added/9 removed lines: timing experiments are already part of the fork's transport, not merely prose beside it. [Revival notes][scope], [parser-fix PR][pr11], [Factory-coauthored follow-up commit][factory], [diagnostics PR #31](https://github.com/drawmeanelephant/ninjam/pull/31).

### Build/toolchain/vendor/platform state

- CMake >=3.20, C++17; local CMake 4.4.3, Apple clang 21.0.0, Darwin arm64. C++ Ogg 1.3.6/Vorbis 1.3.7 are found through pkg-config if available, otherwise fetched. GUI fetches GLFW 3.5.1, ImGui v1.92.9, miniaudio 0.11.25; snapshot renderer uses stb commit `2c980bb59875b0d32144a71867fbdebb2f77cd20`. Versions are specified but most CMake pins are tags, not immutable hashes. This is a provenance limitation, not observed drift. [CMake][cmake], [GUI pins][gui-deps], [tests][tests].
- Resolved fresh-build dependency commits: ogg `be05b13e98b048f0b5a0f5fa8ce514d56db5f822`; vorbis `0657aee69dec8508a0011f47f3b69d7538e9d262`; glfw `d9d6f0f1f967807ffade6598ea9a631ebaf37a56`; imgui `01380c579715e62fb9a8d6ec0502c4ea83bfde6e`; miniaudio `9634bedb5b5a2ca38c1ee7108a9358a4e233f14d`; stb as above. The local fetched-code client links only macOS system dylibs/frameworks according to `otool -L`; this does not prove every pkg-config build is self-contained.
- Zig 0.16.0 is pinned. Vendored Xiph/stb/miniaudio downloads are SHA-256 checked and reproducible; `--check` passed locally. Latest CI installs Zig via commit-pinned zig-zouave. PR #35 explicitly says archive checks use the HTTPS download index, not minisign verification. Do not recast that disclosed tradeoff as a discovered compromise. [Vendor][vendor], [CI][ci], [PR #35][pr35].
- Current CI has successful C++ build/test jobs on macOS/Linux/Windows and Zig test/build/vendor/smoke jobs on macOS/Linux; Linux Zig also cross-builds static musl. This is not equivalent to GUI interaction, real-device audio, Windows Zig support or end-to-end Zig interop. [Run][ci-run], [CI scope][ci].
- Legacy ports/tools and VST2-dependent ReaNINJAM are explicitly excluded from the CMake build. README/CMake also mention `clients/`, but that directory is absent from both inspected Git trees. Do not turn those exclusions into modernization work. [Tree map][scope].

### Real janitor concerns

1. **Documentation does not entirely match the current build.** Root README's Linux prerequisite list omits Wayland development/scanner/protocol/xkb packages present in CI after resolved #3. zclient README says Linux live needs ALSA headers and describes `-Dlive=false` as removing device compilation, whereas build.zig unconditionally disables ALSA/Pulse/JACK and always adds the miniaudio TU; `live` is a runtime gate. Correct the support contract, do not implement Linux audio to match the prose. [README][readme], [CI][ci], [Linux prose][zlinux], [backend flags][zbuild], [compile/runtime gate][zgate]. The absent `clients/` row is a minor same-pass correction.
2. **Release zip recipes omit third-party license notices.** The workflow copies only two binaries, README.md and the top-level GPL LICENSE. README's license paragraph is not the actual ImGui MIT notice or the Xiph notices; their license texts require inclusion/reproduction. Add an audited notices bundle and packaging check before publishing binaries. This is a concrete source-inspected packaging gap, not an allegation about an already shipped release. [Recipe][release], [ImGui terms][imgui-license], [Ogg terms][ogg-license], [Vorbis terms][vorbis-license]. Review all linked components, including WDL/GLFW/miniaudio, without pretending they have identical terms.
3. **Automation exists; a published release does not.** `gh api .../tags` returned `[]`, releases count `0`. Closed #5 is not proof v0.1.0 shipped: PR #9 explicitly leaves tagging to the owner. Two successful historical dispatch dry runs exist, latest at `39b7401f9b0115ef2f71be76a3044d92e61c3d79`, not current HEAD. Retain this as an existing release follow-through item, not a duplicate new ticket. [Closed #5][issue5], [owner boundary in PR #9][pr9], [historical dry run][dry-run].

## What's improved

The earlier upstream state is evidenced by its README/tree, not a story about presumed breakage. The first fork revival commit added CMake, the GUI and tests; its commit explicitly credits Codebuff, not Factory. [Commit][revival]. The later `e88ae593...` follow-up credits `factory-droid[bot]` and includes cross-platform fixes, reconnect, deployment documentation, BPI and integration coverage. Factory attribution is confined to that evidenced record; no model or routing claim follows from it. [Commit][factory].

Completed fork issues #1–#4, #6–#7 cover sanitization, Windows linking, Linux configure dependencies, reconnect, deployment guidance and BPI 128. #5 delivered release automation but delegated the tag. PR #11 added protocol-aware fuzzing and fixed four parser bounds errors plus two remote memory leaks; CTest replays checked-in regression fixtures (non-Windows). [Issue inventory](https://github.com/drawmeanelephant/ninjam/issues?q=is%3Aissue+is%3Aclosed), [PR #11][pr11], [tests][tests].

Further work is already beyond janitor phase: protocol spec PR #10; independent implementation PR #12; Zig live/conformance work PR #33; interval experiments PRs #19/#24/#26/#27/#28/#30/#34; disconnect diagnosis PR #31. Issues #20/#21/#22/#23/#25/#29 are closed. Only #32 is open: the marginal onset formula does not predict all pair directions. It explicitly says the headline result is unaffected and is not evidence of a user-facing revival failure. Keep it in the existing experimental workstream. [PR #12][pr12], [PR #33][pr33], [open #32][issue32].

## What's next

Dependency order: **J0 freeze receipts → J1 correct support docs / J2 audit distribution notices → J3 package-and-platform baseline verification → J4 owner release decision**. J1/J2 can run in parallel after J0. No new build-system replacement, client rewrite, protocol redesign or feature backlog. See `janitor-plan.md` for per-task evidence and checks; two new concern drafts only, with release follow-through and #32 explicitly deduplicated.

## Executed verification and limits

All commands below used the fresh detached snapshot and scratch outputs, not the owner's working tree:

```sh
cmake -S /tmp/ninjam-audit.uKqgK7/snapshot -B /tmp/ninjam-audit.uKqgK7/build -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/ninjam-audit.uKqgK7/build -j 4
ctest --test-dir /tmp/ninjam-audit.uKqgK7/build --output-on-failure
# From /tmp/ninjam-audit.uKqgK7/snapshot/zclient:
zig build test --cache-dir /tmp/ninjam-audit.uKqgK7/zig-cache --global-cache-dir /tmp/ninjam-audit.uKqgK7/zig-global --summary all
zig build -Doptimize=ReleaseSafe --cache-dir /tmp/ninjam-audit.uKqgK7/zig-cache --global-cache-dir /tmp/ninjam-audit.uKqgK7/zig-global --prefix /tmp/ninjam-audit.uKqgK7/zig-out
/tmp/ninjam-audit.uKqgK7/zig-out/bin/zclient --help
/tmp/ninjam-audit.uKqgK7/zig-out/bin/zclient check-wav demo/evidence/20260930-181136/sample-decoded-peer-1s.wav --min-rms 0.05
TMPDIR=/tmp bash vendor/refresh-vendor.sh --check
zig build -Dtarget=x86_64-linux-musl -Doptimize=ReleaseSafe -Dlive=false --cache-dir /tmp/ninjam-audit.uKqgK7/zig-cache --global-cache-dir /tmp/ninjam-audit.uKqgK7/zig-global --prefix /tmp/ninjam-audit.uKqgK7/zig-musl
file /tmp/ninjam-audit.uKqgK7/zig-musl/bin/zclient
```

All exited 0. CTest **7/7**: unit, fuzz regression, two-client e2e, detector self-test, empty/mixer/chat snapshots. Zig **27/27** unit tests; help smoke passed; committed WAV RMS `0.355397`, peak `0.517792`, pass=true; vendor matches upstream pins; cross-built x86-64 Linux ELF reported statically linked (not executed on Darwin). Source remained clean. Logs retained in `/tmp/ninjam-audit.uKqgK7/` (`configure.log`, `build.log`, `ctest.log`, `zig-test.log`, `zig-build.log`, `zig-help.log`, `zig-wav.log`, `vendor-check.log`, `zig-musl.log`). These are local audit results, not GitHub CI receipts.

Warnings did not fail the build (e.g. member-initialization order); ASan probe succeeded, UBSan probe failed, so local regression is not proof of combined ASan+UBSan coverage. No broad warning cleanup proposed. No long fuzz campaign, upstream legacy build, load test, real mic/speaker session, GUI interaction, Linux native execution, Windows local build, or fresh release workflow was run. The Zig live/demo evidence is committed historical evidence and the demo intentionally is not a CI gate [maintenance contract][zreadme], [verification/limits][zverify]. No live microphone access was attempted. Root README's server sizing is explicitly anecdotal, not a measured capacity guarantee [deployment][deployment].

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
