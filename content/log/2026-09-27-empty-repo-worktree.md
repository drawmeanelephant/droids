---
title: A repo with no commits can't host a worktree session
parent: log/2026-09
tags: [factory, git, worktree, session-setup, first-commit]
status: draft
summary: Starting a session in a repo with zero commits fails at worktree setup — the daemon wants a base branch that an unborn HEAD does not have. One commit made outside the session clears it.
published_at: 2026-09-27T13:35:23Z
---

# A repo with no commits can't host a worktree session

- Surface: Factory App (desktop session setup) and Droid CLI 0.228.0
- Date: 2026-09-27
- Evidence: daemon log with the full error and stack, two CLI
  reproductions in throwaway repos, the app bundle strings that
  compose the on-screen toast
- Verdict: promote-to-nits

Second day-zero paper cut in the same week, same cause as the first:
a repo with no commits is a repo with no `HEAD`, and several things
in the stack assume otherwise. Droid-Shield already got its page for
choking on `git log` there. This one is earlier in the flow — the
session will not start at all.

## What happened

Adding `example-thrash` as a project and starting a session on it
with default settings produced an error toast:

```text
Failed to create session — RPC Error: Failed to set up worktree for session
```

Repo state: zero commits, unborn HEAD on `main`, remote configured,
`origin/main` gone (nothing pushed yet, because nothing exists yet).

The daemon log has the part the toast dropped:

```text
MetaError: Failed to set up worktree for session
```

```json
{"baseBranch":"main","method":"daemon.initialize_session","code":-32603,
 "cause":{"name":"WorktreeSetupError","message":"Selected base branch does not exist",
 "stack":"WorktreeSetupError: Selected base branch does not exist\n    at xr (../../packages/runtime/git/src/worktreeSetup.ts:317:15)\n    at async prepareWorktreeForSession (../../packages/daemon-core/src/server/handlers/worktree/lifecycle-manager.ts:533:30)\n    at async initializeSessionOnce (../../packages/daemon-core/src/server/handlers/droid-request-handler.ts:5106:45)"}}
```

So the useful sentence, `Selected base branch does not exist`, stays
in the log. The UI gets the wrapper. That is by construction: the
toast title is a fixed string and the client formats the RPC error as
`` `RPC Error: ${e.error.message}` ``, which is the daemon's outer
message, never its cause.

## Reproducing it from the CLI

Fresh repo, `git init -b main`, no commits, no remote. Then a
worktree session:

```sh
droid exec --worktree -- "Reply with the single word: ready"
```

```text
Error: git rev-parse --abbrev-ref HEAD failed: fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

Exit 1, twice, in two independent repos. The interactive TUI with
`--worktree` dies the same way before it draws anything — before even
the trust prompt. Worth noting the CLI and the desktop fail with
different messages from different call sites; only the shared
precondition is the same.

Drop the worktree and the same repo is fine:

```sh
droid exec "Reply with the single word: ready"
```

```text
ready
```

Exit 0, repo untouched, still zero commits. The app has the matching
switch in session setup — the worktree selector reads `New worktree`
or `No worktree`, and its menu offers `Start without worktree`.

## What clears it

One commit, made with plain git outside any session:

```sh
echo "one" > file.txt && git add file.txt && git commit -m "one commit"
droid exec --worktree -- "Reply with the single word: ready"
```

```text
Created worktree at /Users/tbuddy/.factory/worktrees/731b1b1c/empty-repo-2 (branch: main-731b1b1c)
ready
Worktree directory removed. Branch preserved.
```

Exit 0. The same command that failed a minute earlier in the same
directory now sets up the worktree, runs, and tears down. One commit
is the whole difference.

## Honest limits

The one-commit fix is confirmed on the CLI path. The desktop path
fails with a different error from a different file, so "one commit
unblocks the app too" is untested inference. Also untested: whether a
configured remote matters, and what actually degrades inside a
no-worktree session on an unborn branch — the only workload proving
that path was a one-word prompt.

Desktop UI clicks were not possible from the session that did this
work: assistive access is denied for the app, the desktop CDP
endpoint exposes only the embedded browser pane and blocks target
creation, and the web app offered no local machine. Everything above
is either a CLI reproduction, a log the app wrote itself, or a string
lifted out of the shipped bundle.
