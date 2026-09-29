---
title: Nits
parent: index
tags: [bucket, nits]
summary: The friction ledger — the small stuff that sucks while using Factory. Every nit with a repro, none without.
---

# Nits

The friction ledger: small annoyances, paper cuts, and
papercuts-adjacent behaviors picked up while delegating real work to
Factory Droid. A nit without a repro is a vibe; vibes live in the
[[log/index]], not here.

## On the ledger

- [[nits/droid-shield-unborn-branch]] — Droid-Shield fails closed on
  a repo with no commits, blocking the first commit ceremony. Workaround:
  commit alone. still-broken.
- [[nits/stale-readiness-worktree]] — readiness reports can score an old
  worktree as current. Fetch and compare before trusting the score.

## Structure per nit:

1. What I did (the exact delegation or command)
2. What happened (observed, not interpreted)
3. What I expected
4. The workaround, if one survived
5. Verdict: still-broken | fixed | lived-with

Rules:

- Real observed behavior only. Session link, transcript excerpt, or it
  didn't happen.
- One nit per page. Small pages are the point.
- Nits that turn out to be documentation gaps get a link to the doc
  and a note on where the doc lost the plot, not just "RTFM."
- When Factory fixes a nit, the page gets re-checked and the verdict
  flips. Updates get dated.

Filing: nits get noticed in [[log/index]] entries first; promotion to a
page happens when the nit deserves its own file and will be re-checked.
