# Atmosplorer: the vendor blocker is already resolved

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Observed 2026-10-01, approximately 12:42–12:45 UTC. Explore-only card 10.

## Where we are

**The supplied “PR #1, do not merge” premise is superseded.** [PR #1](https://github.com/drawmeanelephant/atmosplorer/pull/1) merged at 12:36:42 UTC into `806db2a711f8a3a2d903f0fafe20d09ffc4a9480`. Its updated head and the default branch both have successful CI. The read-only issue timeline, labels, comments, review comments, and reviews contain no retained do-not-merge instruction; that description is an owner-supplied earlier premise, not a present GitHub restriction.

The old red run was a **project vendor-fetch/pin integration defect exposed by upstream movement**, not evidence of a Zig installer regression or failed project tests. The installer succeeded, then `sync-zat.sh` fetched moving upstream `main` while checking a fixed 0.4.5 package hash. It received 0.5.2 and correctly refused it. Swift tests never ran in that failed job.

### Immutable study inputs

Fresh GitHub clone, SHA-addressed `git archive` snapshots, made read-only; mutable reproduction copies were separate. The owner's `/Users/tbuddy/t3/swift/atmosplorer` was neither read nor modified.

| Input | SHA |
|---|---|
| PR #1 current head | `36261ca72588b5ea91f21d11fd6d1c17113d2799` |
| PR #1 current base | `bfe1c6f9c912633f58f4f4fe06421c388f2dfca7` |
| Current default `main` | `806db2a711f8a3a2d903f0fafe20d09ffc4a9480` |
| Originally failing PR head | `a9119e1e21c54a3f7fc18d4f20091c18b3b4aafd` |
| Original parent/base | `4151079423cfa8a230c60eb8039c8ae02a5b98fb` |

No `AGENTS.md` exists in any of those project snapshots. Study instructions came from `../00-study-contract.md` and the blog's `AGENTS.md`. Exact scratch paths are in `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/snapshots.txt`.

### Receipts and causal chain

1. [Original PR change](https://github.com/drawmeanelephant/atmosplorer/commit/a9119e1e21c54a3f7fc18d4f20091c18b3b4aafd): exactly one workflow line replaces `goto-bus-stop/setup-zig@v2` with pinned `zig-zouave`; requested Zig stays 0.16.0. The vendor code is byte-identical to the original base (`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/original-pr1.diff`, `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/source-observations.txt`).
2. [Failed run, attempt 1](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36787824848/attempts/1): September 30, installer succeeds; at 23:06:27 UTC vendor exits 1 after five attempts, receiving `zat-0.5.2-5PuC7uckDACz4E3MVNk5rN9Gz3N9CdRtSiNoYzuPLiNX` instead of `zat-0.4.5-5PuC7l6sDADAZQOBW-yKi6qnk67spfoYMRNoVpCUkvoC`. Attempt 2 repeats the same mismatch on October 1. Logs and step conclusions are saved for both attempts.
3. [Old vendor script, lines 50–79](https://github.com/drawmeanelephant/atmosplorer/blob/a9119e1e21c54a3f7fc18d4f20091c18b3b4aafd/zat-swift/Scripts/sync-zat.sh#L50-L79): URL was `archive/main`; hash was a post-fetch check, not a constraint on the fetched ref.
4. **Executed upstream comparison:** fresh `git ls-remote` and clone resolve `v0.4.5` to `26946cb8808e5f9805bae178a180d3e0856c7115`, `v0.5.2` to `13f2d40e1d5f5c510d9a28afd9f9a0305e6da146`, and `main` to `38cfb0248dc0591613b76d53767eedfefb0e715a`. Fresh Zig fetches reproduce exactly the expected 0.4.5 hash for `archive/v0.4.5`, and exactly the old unexpected 0.5.2 hash for `archive/main` (`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/upstream-fetch.log`, `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/upstream-source.txt`).
5. Upstream `main` now declares 0.5.2 and adds the `zttp` dependency absent from 0.4.5. Thus “just update the hash” would be a dependency upgrade, not a neutral repair. No such upgrade or compatibility test was performed.

**Date precision:** the failure was observed September 30; upstream's release commit dates 0.5.2 to September 8 and current main's latest commit to September 18. The fix's comment describing upstream “rolling” on September 30 should not be treated as proof of that upstream event date.

## What's improved

[PR #2](https://github.com/drawmeanelephant/atmosplorer/pull/2), merged at 12:04:32 UTC, already supplies the bounded repair:

- Fetch `v0.4.5`, retain the existing hash, and reject mismatched version/ref settings before fetching.
- Stop retrying a definitive package mismatch; retain transport retries.
- Only use cached source when present; add job timeout and manual workflow dispatch.

See [current script lines 58–119](https://github.com/drawmeanelephant/atmosplorer/blob/806db2a711f8a3a2d903f0fafe20d09ffc4a9480/zat-swift/Scripts/sync-zat.sh#L58-L119) and [current workflow](https://github.com/drawmeanelephant/atmosplorer/blob/806db2a711f8a3a2d903f0fafe20d09ffc4a9480/.github/workflows/ci.yml#L15-L74).

| CI evidence | Result |
|---|---|
| [PR #2 run](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36858239995) | Fresh tag fetch, vendor/build/test success |
| [Updated PR #1 run](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36861068893) | Success after incorporating main |
| [Default-branch run](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36862919546) | Success on merge SHA |

Default-branch CI reports **29 wrapper tests, 9 skipped, zero failures; 123 app tests, 13 skipped, zero failures**. These are counts including skips, not 152 passing executed assertions. The PR #2 run proves a fresh tag fetch; later cache-assisted green runs are not independently fresh upstream fetches.

Attribution is bounded: the [original installer commit](https://github.com/drawmeanelephant/atmosplorer/commit/a9119e1e21c54a3f7fc18d4f20091c18b3b4aafd) explicitly co-credits `factory-droid[bot]`. PR #2 explicitly says Codebuff and co-credits Codebuff. There is no evidence for historical Luna/Sol routing or Factory authorship of the vendor repair.

## What's next

**Recommendation: retain the already-merged tag-and-hash repair; no new blocker issue.** A duplicate repair would add noise. All open and closed issues were queried: only PRs #1 and #2 existed; no standalone issue was returned (`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/issues.json`).

Options, not implemented by this study:

1. **Keep 0.4.5 tag + hash (recommended).** Already integrated and green; least compatibility risk.
2. **Fetch the exact 0.4.5 commit with a verified matching package hash.** Optional stricter ref policy; tags are conventional stable release refs, not technically unmovable. A moved tag would still fail closed against the retained package hash. No defect currently warrants this policy change.
3. **Upgrade deliberately to 0.5.2.** Separate integration work: review `zttp`, overlay/build wiring and ABI compatibility, update ref/hash/docs together, then run core/wrapper/app tests. Do not accept moving-main content merely to silence a mismatch.

### Local verification and limits

Scratch environment: Darwin arm64, Zig 0.16.0, Swift 6.4, installed Xcode. It differs from CI's macOS-14 / Swift 6.2 toolchain.

- Original failed-head script reproduced exactly the old hash mismatch and exited 1.
- Current script with `ZAT_REF=v0.5.2` and default pin rejected the half-bump before any fetch, exit 1.
- Current default tag fetched successfully and passed hash verification, overlay and preflight. Its Zig build then hit **HTTP 429 fetching transitive `websocket.zig` v0.1.12**. Local packaging/Swift tests were consequently not attempted. This is a fresh upstream-service rate limit, not a demonstrated code regression; actual CI has independently completed those stages.
- No remote rerun was requested. No vendor refresh, project edit, issue/comment write, merge, or subdelegation occurred.
- Live ATProto tests are gated/skipped. Zig core `zig build test` is not invoked by the inspected workflow. Those are verification boundaries, not evidence that those tests fail; PR #2 already mentions core-test CI as a possible separate follow-up.

Reproducible commands are in `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/commands.md`; full captured logs remain beside them. Blog validation/build belongs to the coordinator; this card writes only ignored research assets.
