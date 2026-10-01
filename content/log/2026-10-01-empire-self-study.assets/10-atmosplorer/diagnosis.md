# Diagnosis

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


**Classification:** pre-existing project vendor ref/pin integration error, exposed by upstream branch movement. **Present blocker:** none demonstrated; repair is merged and PR/default CI are successful.

## Exact mismatch

```text
Old requested ref: main
Old expected pin: zat-0.4.5-5PuC7l6sDADAZQOBW-yKi6qnk67spfoYMRNoVpCUkvoC
Actual main pin:  zat-0.5.2-5PuC7uckDACz4E3MVNk5rN9Gz3N9CdRtSiNoYzuPLiNX
Fixed ref:        v0.4.5
Fixed pin:        unchanged from old expected pin
```

These values appear in [failed CI](https://github.com/drawmeanelephant/atmosplorer/actions/runs/36787824848/attempts/1) and were independently reproduced by Zig 0.16.0 in scratch (`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/upstream-fetch.log`, `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/local-reproduction.log`).

| Hypothesis | Evidence | Verdict |
|---|---|---|
| Installer introduced wrong Zig | CI installed requested 0.16.0 successfully; PR changes only setup-action line | Unsupported |
| Swift project test regression | Vendor failed before wrapper/app tests; repaired CI has zero test failures | Unsupported |
| Upstream's current version no longer matches downstream pin | Exact fresh main hash is 0.5.2; expected 0.4.5 tag hash is available and matches | Proven |
| Broken upstream 0.4.5 release | Correct tag fetch passes hash; PR #2 cold-fetch CI builds/tests it | Unsupported |
| Downstream fetch/pin design defect | Moving `archive/main` paired with fixed hash, unchanged by original PR #1 | Proven |
| Current code remains blocked | PR #2 merged; updated PR #1 and merge run successful | Refuted for inspected offline CI |
| Local current build failed | Transitive fetch got HTTP 429; packaging/tests not reached | Proven service/environment limitation, not proven code failure |

## Repair and alternatives

[PR #2](https://github.com/drawmeanelephant/atmosplorer/pull/2) already implemented the recommended scope: release-tag selection plus retained hash, explicit half-bump guard, clearer mismatch versus transport handling. [PR #1](https://github.com/drawmeanelephant/atmosplorer/pull/1) subsequently incorporated that fix and merged. No new repair is proposed for implementation.

For future bumps, an exact-commit fetch is an optional hardening alternative; verify its package hash rather than assume archive equivalence. A 0.5.2 upgrade is a separate feature/integration decision because upstream main adds `zttp`; the existing overlay build wires `websocket` but not `zttp`. That inspection establishes an integration review requirement, **not** an executed 0.5.2 compatibility failure.

## Verification boundary

Reproduction used separate mutable copies of read-only SHA snapshots. Old mismatch and current pre-fetch guard reproduced; corrected source retrieval passed. Current local build could not complete because `websocket.zig` returned 429. Independent CI completed wrapper and app suites, with 9/29 and 13/123 tests skipped respectively. Live services and Zig core tests were not exercised by this card. No owner checkout was touched and no remote CI was rerun.

See `report.md` for full SHA/CI citations and `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/10-atmosplorer/receipts/commands.md` for command receipts.
