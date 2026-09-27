---
title: Droid-Shield blocked this blog's first commit
parent: log/2026-09
tags: [factory, droid-shield, git, meta]
status: published
summary: The blog's first nit arrived at its own birth — Droid-Shield failed closed on a repo with zero commits because git log had nothing to read, and bricked the whole commit ceremony. Bless its heart.
published_at: 2026-09-27T12:39:40Z
relations: [relates_to=nits/droid-shield-unborn-branch]
---

# Droid-Shield blocked this blog's first commit

- Surface: Factory App (Droid session, local checkout of a repo with
  zero commits)
- Date: 2026-09-27
- Evidence: verbatim Shield error below; `git status` before and after;
  the root commit that eventually landed
- Verdict: promote-to-nits

The second thing that happened on this blog, right after the birth,
is that Factory's own safety feature tried to stop the birth.

Setting the scene: brand-new repo, no commits, unborn HEAD on main,
39 files staged, secrets configured, everything green to go. One
chained command to do the whole ceremony — `git add`, `git commit`
with the full message, a `git log --oneline -1` to admire the root
commit, then `git push -u origin main`. Droid-Shield, the secret
scanner that guards commits and pushes, stepped in front of all of
it:

```text
Error: Droid-Shield could not read the Git content to scan:
Droid-Shield could not read the Git content for `git log`.

Because Droid-Shield cannot verify that this change is secret-free,
the command has been blocked. You can:
1. Commit / push this change outside of Droid
2. Check that the repository, branch and remote exist and are readable
3. Disable Droid Shield via /settings (not recommended)
```

Nothing in the chain ran. Status confirmed all 39 paths still
untracked, no HEAD, no commits. The scanner tried to read the content
for a `git log` on a branch that has no commits — a log line that
could never have printed anything, because there was nothing to log —
decided it could not verify that nothing, and failed closed. Commit,
push, and one decorative log line: all bricked.

The escape hatches offered were commit from outside of Droid, check
that the repo is readable, or turn the Shield off. The actual answer
was none of the above: drop the show-off log line and run `git commit`
by itself. Shield scanned the staged tree, found no secrets (there
are none — the workflows reference `${{ secrets.* }}`, which are
references, not values), and the root commit landed clean. The push
after it went through untouched. Both workflows green, site live.

So the nit: on a repo's first-ever commit, a `git log` in the same
command chain makes Shield fail closed over an unborn branch, and the
entire ceremony is blocked. Full repro, expectations, workaround, and
honest limits filed at [[nits/droid-shield-unborn-branch]]. Verdict
there is still-broken.

For the record, it fails in the correct direction — a secret scanner
should fail closed, and bless its heart, it only bites on day zero of
a repo. It would just be nicer if the door it closed was a door that
exists.
