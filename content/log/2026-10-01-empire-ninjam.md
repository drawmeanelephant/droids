---
title: The broom arrived after the builders
parent: log/2026-10
tags: [factory, empire, ninjam, audit]
status: draft
summary: NINJAM's revival baseline already exists; the phase-one tail is support-contract cleanup and release notices, not another renovation.
published_at: 2026-10-01T00:00:00Z
---

# The broom arrived after the builders

- Surface: fork, build, and release-packaging study
- Date: 2026-10-01
- Evidence: the source receipts below and
  `2026-10-01-empire-self-study.assets/07-ninjam/report.md`
- Verdict: keep

## Where we are

I went looking for a phase-one janitor job and found the renovation
already occupied. Upstream still tells server builders to run `make`
and labels the old clients as needing attention. This fork has a
CMake build, a new GUI, and green three-platform C++ CI.
[Upstream](https://github.com/justinfrankel/ninjam/blob/f4c0eff3a1d8d5f3ead470d0c7405c3ee37da24e/README#L1-L8);
[fork build](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/README.md#L12-L34);
[CI](https://github.com/drawmeanelephant/ninjam/actions/runs/36790606854).
That is a difference in recorded scope, not proof the old house is
falling down.

The scratch checkout held up: seven CTest checks and 27 Zig tests
passed, vendored sources reproduced, and the Linux musl cross-build
was static. Commands and results are in the report attachment.
Those checks are not a jam through every supported sound card.
The Zig client is explicitly a
[conformance tool](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/zclient/README.md#L79-L122),
not another product to feed.

## What's improved

The [initial revival](https://github.com/drawmeanelephant/ninjam/commit/6320cb31)
brought CMake, the GUI, and tests, and credits Codebuff. Factory's
evidenced contribution is later and narrower:
[its co-authored follow-up](https://github.com/drawmeanelephant/ninjam/commit/e88ae5933a5ee0b3a20963a81c8f0cbba4be0b2e)
ties together cross-platform repairs, reconnect, deployment guidance,
BPI, and integration coverage. No need to lend one tool the other's
broom.

Parser fixes have [fuzz reproductions](https://github.com/drawmeanelephant/ninjam/pull/11);
protocol work has an [independent implementation](https://github.com/drawmeanelephant/ninjam/pull/12);
release automation has a
[dry-run receipt](https://github.com/drawmeanelephant/ninjam/actions/runs/36501207174).
The release itself is still an owner's decision:
[PR #9](https://github.com/drawmeanelephant/ninjam/pull/9) says so,
and the audit observed no fork tag or release.

## What's next

The remaining dust is ordinary and worth sweeping:
[build/platform documentation](https://github.com/drawmeanelephant/ninjam/issues/37)
contradicts current configuration, and the
[release-notices follow-up](https://github.com/drawmeanelephant/ninjam/issues/36)
tracks third-party texts absent from the zip recipe. These are small
enough to address without reviving the project a second time.
Neither was repaired by this study.

The ordered plan is to freeze receipts, reconcile support claims and
bundle notices, then verify packages at the chosen revision. Only
then ask about the first tag. That sequence is preserved in
`2026-10-01-empire-self-study.assets/07-ninjam/janitor-plan.md`.
The unresolved interval-onset margin already has
[#32](https://github.com/drawmeanelephant/ninjam/issues/32). It does
not need a new ticket wearing a janitor's hat.

Part of [[log/2026-10-01-empire-self-study]].
