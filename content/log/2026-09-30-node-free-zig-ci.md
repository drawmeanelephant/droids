---
title: One node-free Zig installer rolled out across 15 repositories
parent: log/2026-09
tags: [factory, zig, ci, github-actions, infrastructure]
status: draft
summary: A Droid-built shell composite action replaced Node-based Zig setup in CI, then spread through 15 public repositories with pinned adoption PRs.
published_at: 2026-09-30T00:00:00Z
relations: [relates_to=projects/boris, relates_to=projects/oliver, relates_to=projects/virelai-os, relates_to=projects/filed-fyi]
---

# One node-free Zig installer, rolled across the project shelf

- Surface: Factory Droid worktree sessions and GitHub Actions
- Date: 2026-09-30
- Evidence: [zig-zouave PR #1](https://github.com/drawmeanelephant/zig-zouave/pull/1), [VirelaiOS adoption PR #1855](https://github.com/drawmeanelephant/VirelaiOS/pull/1855), and the adoption PRs listed below
- Verdict: promote-to-builds after the rollout settles

This was infrastructure work with a wider reach than one repository. A
Droid session built **zig-zouave**, a small composite GitHub Action that
installs Zig without putting Node.js code or vendored Node dependencies
in the installer. Then the same action was adopted across 15 public
repositories on the account.

## What the action does

The action keeps the familiar `setup-zig` inputs, resolves a version
from an explicit setting or `build.zig.zon`, downloads the archive, and
checks its SHA-256 against Zig's official download index. It supports
Linux and macOS on x86_64 and aarch64, and Windows on x86_64. Optional
inputs configure the runner tool cache and the compilation cache.

Its security tradeoff is explicit: the installer checks the archive
against a digest delivered by the download index over HTTPS; it does not
verify Zig's minisign signature. Also, enabling compilation caching uses
GitHub's separate `actions/cache@v4`, which uses Node. The installer
itself is shell-based; the optional cache dependency is not.

The action's own CI exercised Linux and macOS. Windows passed an
individual run, but its rerun spent more than 20 minutes installing Zig,
so Windows was removed from the regular required matrix. A Bash 3.2
check, ShellCheck, `bash -n`, SHA verification, and a local Zig compile
were also reported passing.

## The rollout

The action was pinned to its merge commit because it had no release tags
yet. The consumer PRs preserve each repository's Zig version and job
structure while replacing the old Node-based setup step. Fourteen of
the 15 adoption PRs are merged; the Atmosplorer PR remains open.

**Compiler and development tools:** [Boris #1012](https://github.com/drawmeanelephant/boris/pull/1012),
[Oliver #132](https://github.com/drawmeanelephant/oliver/pull/132),
[k4o #17](https://github.com/drawmeanelephant/k4o/pull/17),
[NINJAM #35](https://github.com/drawmeanelephant/ninjam/pull/35),
[boris-content-audit #1](https://github.com/drawmeanelephant/boris-content-audit/pull/1),
and [boris-migration-lab #19](https://github.com/drawmeanelephant/boris-migration-lab/pull/19).

**OS, apps, and sites:** [VirelaiOS #1855](https://github.com/drawmeanelephant/VirelaiOS/pull/1855),
[filed.fyi #584](https://github.com/drawmeanelephant/filed.fyi/pull/584),
[boris.filed.fyi #13](https://github.com/drawmeanelephant/boris.filed.fyi/pull/13),
[Atmosplorer #1](https://github.com/drawmeanelephant/atmosplorer/pull/1),
[Solipsist #303](https://github.com/drawmeanelephant/solipsist/pull/303),
[drawmeanelephant.com #10](https://github.com/drawmeanelephant/drawmeanelephant.com/pull/10),
[thermalextractiondevices.com #60](https://github.com/drawmeanelephant/thermalextractiondevices.com/pull/60),
[fullonrogues.org #4](https://github.com/drawmeanelephant/fullonrogues.org/pull/4),
and [corgifever.com #3](https://github.com/drawmeanelephant/corgifever.com/pull/3).

The number of repos is the interesting part, but not the whole result:
one implementation became a shared tool, and a sequence of small,
reviewable PRs carried it across projects without replacing each
project's Zig version or CI structure. The rollout is still in progress,
so this is a draft record, not a claim that every consumer has merged.
