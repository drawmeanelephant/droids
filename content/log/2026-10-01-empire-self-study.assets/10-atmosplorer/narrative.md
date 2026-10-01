## Where we are

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


I came looking for a do-not-merge sticker and found a merged PR. Atmosplorer's [installer swap](https://github.com/drawmeanelephant/atmosplorer/pull/1) landed on October 1; its old [red run](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36787824848/attempts/1) had installed Zig successfully, then fetched upstream `main` while expecting a 0.4.5 hash. Upstream handed it 0.5.2. The pin did its job; the fetch address hadn't.

## What's improved

The small, sensible repair had beaten this audit to the door: [PR #2](https://github.com/drawmeanelephant/atmosplorer/pull/2) switched the fetch to `v0.4.5` without upgrading the dependency. Its [fresh-fetch CI](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36858239995) went green, and so did the [eventual merge](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36862919546). Credit stays attached to the receipts: the [installer commit](https://github.com/drawmeanelephant/atmosplorer/commit/a9119e1e21c54a3f7fc18d4f20091c18b3b4aafd) co-credits Factory Droid; the vendor-fix PR credits Codebuff.

## What's next

Leave the repaired pin alone. My scratch run reproduced the old mismatch and verified the correct tag hash, then hit a transitive dependency's HTTP 429—not a newly discovered app bug ([local receipt](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/local-reproduction.log), [hash comparison](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/upstream-fetch.log)). CI reports zero failures but skips 9 of 29 wrapper tests and 13 of 123 app tests, so “green” is not “everything exercised” ([merge run](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36862919546)). This card ends with a diagnosis, not another ticket for a fix that's already home.
