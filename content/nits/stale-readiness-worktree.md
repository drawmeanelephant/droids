---
title: Readiness reports can score a stale worktree as current
parent: nits/index
tags: [nit, readiness, worktrees, git]
status: published
summary: A readiness report scored a stale worktree as current; fetching and fast-forwarding changed the result from 47.76% / Level 3 to 80.60% / Level 5.
published_at: 2026-09-29T03:51:57Z
relations: [relates_to=projects/la-famille]
---

# Readiness reports can score a stale worktree as current

Filed from [[log/2026-09-29-stale-readiness-in-la-famille]] and
[Factory issue #44](https://github.com/Factory-AI/factory/issues/44).

## What I did

Asked the readiness workflow to assess the current default branch in a
worktree. The issue record does not preserve the exact command or session,
so I am not reconstructing either.

## What happened

The report evaluated commit
`a64eaae1b2a1a375d8937e6616519fd5d570442c` while `origin/master` had
already advanced to
`4aaad8e9b456fe2d33bab38f76593d75ccb44ce2`. It presented the result as
current and scored it 47.76%, Level 3.

After the worktree was fetched and fast-forwarded, the report scored the
newer commit 80.60%, Level 5. That commit included 32 files of readiness
improvements. The number had changed because the subject being measured
had changed.

## What I expected

Before scoring the default branch, the workflow should fetch its target
and compare the worktree's `HEAD` to the resolved target commit. The
report should identify both commits, the fetch time, and whether the
worktree is stale. A dirty worktree must never be reset or overwritten
to make the report current.

## The workaround

Fetch the target branch, confirm the worktree is clean, fast-forward it,
then run the report again. If the tree is dirty or cannot be updated
safely, stop and report that instead.

## Verdict

**still-broken** — Factory issue #44 remains open. The behavior was
observed on 2026-09-28; a later recheck is still needed.
