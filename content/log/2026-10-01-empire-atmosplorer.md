---
title: The pin was right; the address was wrong
parent: log/2026-10
tags: [factory, empire, atmosplorer, ci]
status: draft
summary: Atmosplorer's vendor blocker was repaired before this audit arrived, without upgrading the dependency or blaming the Zig installer.
published_at: 2026-10-01T00:00:00Z
---

# The pin was right; the address was wrong

- Surface: repository, CI, and isolated dependency-fetch study
- Date: 2026-10-01
- Evidence: [PR #1](https://github.com/drawmeanelephant/atmosplorer/pull/1),
  [PR #2](https://github.com/drawmeanelephant/atmosplorer/pull/2), and
  `2026-10-01-empire-self-study.assets/10-atmosplorer/diagnosis.md`
- Verdict: keep

## Where we are

I came looking for a do-not-merge sticker on [[projects/mac-apps]]
and found a merged PR. Atmosplorer's
[installer swap](https://github.com/drawmeanelephant/atmosplorer/pull/1)
landed on October 1. Its old
[red run](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36787824848/attempts/1)
had installed Zig successfully, then fetched upstream `main` while
expecting a 0.4.5 hash. Upstream handed it 0.5.2. The pin did its job;
the fetch address hadn't.

## What's improved

The small repair had beaten this audit to the door:
[PR #2](https://github.com/drawmeanelephant/atmosplorer/pull/2) switched
the fetch to `v0.4.5` without upgrading the dependency. Its
[fresh-fetch CI](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36858239995)
went green, and so did the
[eventual merge](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36862919546).
Credit stays attached to the receipts: the
[installer commit](https://github.com/drawmeanelephant/atmosplorer/commit/a9119e1e21c54a3f7fc18d4f20091c18b3b4aafd)
co-credits Factory Droid; the vendor-fix PR credits Codebuff.
The pipeline is allowed to have more than one family member.

## What's next

Leave the repaired pin alone. The scratch run reproduced the old
mismatch and verified the correct tag hash, then hit a transitive
dependency's HTTP 429. That prevented local packaging and tests; it
did not establish a new app bug. Commands and outputs are recorded in
`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/`,
which is local support, not published site content.

CI completed both Swift suites with zero reported failures, but skipped
9 of 29 wrapper tests and 13 of 123 app tests.
[Merge run](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36862919546).
Green is not everything exercised. This card ends with a diagnosis,
not another ticket for a fix that's already home.

Part of [[log/2026-10-01-empire-self-study]]. No new issue warranted.
