# NINJAM: the broom arrived after the builders

## Where we are

I went looking for a phase-one janitor job and found the renovation already occupied. Upstream still tells server builders to run `make` and labels the old clients as needing attention; this fork has a single CMake build, a new GUI and a green three-platform C++ test matrix. That is a difference in recorded scope, not proof that the older house is falling down. [Upstream][upstream], [fork build][readme], [current CI][ci-run].

The scratch checkout held up: seven CTest checks and 27 Zig unit tests passed, vendored sources reproduced, and the Linux musl cross-build was static. Those are this audit's results, not a claim that I played a jam through every supported sound card. The Zig client itself is explicitly a conformance tool, not another product to feed. [Maintenance contract][zreadme]; local commands and outputs in `report.md`.

## What's improved

The early fork commit brought CMake, the GUI and tests, and credits Codebuff. Factory's evidenced contribution is later and narrower: the coauthored follow-up commit ties together cross-platform repairs, reconnect, deployment guidance, BPI and integration coverage. No need to lend one tool the other tool's broom. [Initial revival][revival], [Factory-coauthored commit][factory].

Since then the record has grown teeth: parser fixes come with fuzz reproductions, protocol work has an independent implementation, and release automation has a successful dry-run receipt. The release itself is still an owner's decision; PR #9 says so, and no fork tag or release existed when I checked. [Fuzz PR][pr11], [conformance PR][pr12], [dry run][dry-run], [release handoff][pr9].

## What's next

The remaining dust is ordinary and worth sweeping: Linux package instructions lag CI, Zig's live-audio prose overpromises what its backend flags enable, and the binary zip recipe leaves out third-party notice texts. These are small enough to fix without “reviving” the project a second time. [README][readme], [CI packages][ci], [live prose][zlinux], [backend flags][zbuild], [packaging][release], [required notices][imgui-license], [Xiph notices][ogg-license].

Freeze the receipts, correct the support contract, bundle the notices, then certify packages at the chosen revision. Only then ask about the first tag. The unresolved interval-onset margin already has issue #32; it does not need a new ticket wearing a janitor's hat. [Release boundary][pr9], [existing investigation][issue32].

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
