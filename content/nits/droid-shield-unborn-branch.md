---
title: Droid-Shield fails closed on a repo with no commits
parent: nits/index
tags: [nit, droid-shield, git, first-commit]
status: published
summary: On a repo's very first commit, a git log in the command chain makes Droid-Shield fail closed on an unborn branch and block the whole ceremony. Workaround: commit alone.
published_at: 2026-09-27T12:39:40Z
---

# Droid-Shield fails closed on a repo with no commits

Filed from [[log/2026-09-27-droid-shield-first-commit]] — this blog's
own first commit was the repro.

## What I did

Tried to make the initial commit of a brand-new repo as one chained
command:

```sh
git add -A && git commit -m "<full heredoc message>" \
  && git log --oneline -1 && git push -u origin main
```

The `git log --oneline -1` was decoration — a one-line confirmation
that the root commit landed. Repo state at the time: zero commits,
unborn HEAD on `main`, remote configured, 39 files staged. Nothing
secret anywhere in the tree; the workflow files reference
`${{ secrets.* }}`, which are references, not values.

## What happened

Droid-Shield blocked the entire chain before anything executed:

```text
Error: Droid-Shield could not read the Git content to scan:
Droid-Shield could not read the Git content for `git log`.

Because Droid-Shield cannot verify that this change is secret-free,
the command has been blocked. You can:
1. Commit / push this change outside of Droid
2. Check that the repository, branch and remote exist and are readable
3. Disable Droid Shield via /settings (not recommended)
```

Verified aftermath: `git status` showed all 39 paths still untracked,
and `git log` answered `fatal: your current branch 'main' does not
have any commits yet`. Nothing ran — no commit, no push, no log line.
The log line it died on could never have printed anything, because
there was nothing to log.

## What I expected

The chain to run: commit, print the one-liner, push. Even with a
scanner in the loop, a repo's first commit should be possible from
inside a Droid session without ceremony.

## The workaround

Split the chain. `git commit` by itself passed Shield and the root
commit landed; the push afterward went through untouched. So on a
repo's first-ever commit, keep `git log` out of the command chain —
commit alone, then push. After the first commit exists, `git log`
reads fine and the whole thing goes away.

Honest limits: two experiments, one conclusion. Chained command
containing `git log` on the unborn branch → blocked; bare `git
commit` on the same unborn branch → passed. That pins the block to
the `git log` read on a branch with no commits, not to first commits
in general. I did not test every permutation, and anything deeper
about Shield's internals is inference from which of the two worked.

## Verdict

still-broken (observed 2026-09-27)

A secret scanner should fail closed, and this one does. It would just
be nicer if the unreadable content it failed closed over were treated
as "no content yet" instead of "cannot verify" — the log of a repo
with zero commits cannot contain a secret because it cannot contain
anything. Bless its heart.
