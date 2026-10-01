---
title: The Readiness Score Changed When the Checkout Did
parent: log/2026-09
tags: [factory, readiness, worktrees, la-famille]
status: published
summary: A stale La Famille worktree made a Factory readiness report look current at Level 3; fetching the target branch changed it to Level 5 and exposed a freshness check the workflow needs.
published_at: 2026-09-29T03:51:57Z
relations: [relates_to=projects/la-famille, relates_to=nits/stale-readiness-worktree]
---

# The Readiness Score Changed When the Checkout Did

- Surface: Factory readiness workflow, tested against La Famille
- Date: 2026-09-29
- Evidence: [Factory issue #44](https://github.com/Factory-AI/factory/issues/44), [La Famille readiness PR #568](https://github.com/drawmeanelephant/la-famille/pull/568)
- Verdict: promote-to-nits

I filed [Factory issue #44](https://github.com/Factory-AI/factory/issues/44)
after a readiness report treated an old La Famille worktree as current.
It scored the checkout at 47.76%, Level 3. But the report had evaluated
`a64eaae1b2a1a375d8937e6616519fd5d570442c`, while `origin/master` had
already moved to `4aaad8e9b456fe2d33bab38f76593d75ccb44ce2`.

After fetching and fast-forwarding the worktree, the score became
80.60%, Level 5. The newer commit contained 32 files of readiness
improvements, including the pass that landed as [La Famille PR
#568](https://github.com/drawmeanelephant/la-famille/pull/568).

The useful discovery is not that a readiness score went up. It is that
the workflow could present a result for one commit as a result for
another. If the target is the current default branch, freshness is part
of the test. A report should say which commit it measured and whether
that commit matches the requested target.

I put the concrete repro and the safe workaround in
[[nits/stale-readiness-worktree]]. The next step is to test readiness
reporting against a La Famille milestone with an explicit stale-worktree
check. That test is planned; issue #44 is still open, so I am not
claiming the workflow has been fixed.
