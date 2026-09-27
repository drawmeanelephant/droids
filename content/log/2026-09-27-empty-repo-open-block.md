---
title: Factory errors on opening an empty repo
parent: log/2026-09
tags: [factory, nit, git, empty-repo]
status: draft
summary: Pointing a Droid session at a repo with zero commits errors out demanding a nonempty repo; you can't open empty and branch from there.
published_at: 2026-09-27T12:48:00Z
---

# Factory errors on opening an empty repo

- Surface: Factory App
- Date: 2026-09-27
- Evidence: user report from live session; verbatim error captured on
  session create: `Failed to create session — RPC Error: Failed to set
  up worktree for session`
- Verdict: promote-to-nits once re-tested against a confirmed-empty repo

Tried to open a brand-new, zero-commit repo in a Droid session and
start a new branch targeting `main`. Factory refused: it requires a
nonempty repo to work with. No empty repo, no new branch from nothing,
no getting started from zero inside the session.

The error gives away the mechanism. Sessions are backed by git
worktrees, and the worktree setup is what fails — `RPC Error: Failed
to set up worktree for session`. A worktree needs a commit to stand
on; an unborn branch has none. So "open an empty repo" dies not at
open time but at worktree time, one layer down. The UI does offer
"Start without worktree" in the session setup dropdown, which suggests
someone knew the worktree path was fragile — but the default path
still assumes every repo has a past.

Honest limits: the "empty repo" in question was a scratch project
(`example-thrash`), and the zero-commit state is inferred from the
failure shape, not independently verified with `git log` on the
remote. Worth one clean re-test: fresh empty repo, attempt session
create, capture whether the same RPC error fires.

Same morning as [[nits/droid-shield-unborn-branch]] — the empty-repo
experience is broken at both ends. Shield won't let a chained command
read `git log` on an unborn branch, and the session itself won't open
an empty repo to begin with. A repo's first commit is apparently
something you're meant to do elsewhere, then bring back once it
exists. Probably makes sense to someone.
