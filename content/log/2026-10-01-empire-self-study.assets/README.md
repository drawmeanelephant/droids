# Empire self-study: findings and receipts

Observed 2026-10-01. Eleven independent explore-only cards; no project
implementation changes, merges, publication, or existing tracker-state
changes. The coordinator created **15 follow-up issues across 10 repos**
after duplicate checks and verified their posted titles and bodies.

These statements record the completed research phase. The owner later
asked for a public draft PR and a playful work-in-public frame. The
original issue bodies, measured outputs, and implementation boundaries
remain unchanged. The owner explicitly approved public disclosure of
findings from private `virelai-sans` and `redesigned-dollop`; their source
links still require access and neither repository was made public.

The narrative series is twelve **draft** log entries: one overview,
ten concern-specific repo posts, and one grouped shelf post. The draft
October hub is separate. This is not an audit of every source file in
31 repos: specialist cards investigate their assigned concerns, while
the all-repo sweep covers root documentation and tracker hygiene.

## Findings map

| Card | Source snapshot | Finding / disposition | Deliverables |
|---|---|---|---|
| 1, Boris | `08969742f85238443ce5cd1cd53ceab1b1f3f85a` | Sample lacks social metadata; proper OGP conflicts with Strict attributes. Feature #1015 filed. | [Report](01-boris/report.md), [design](01-boris/design.md), [issue decision](01-boris/issue-drafts.md). |
| 2, VirelaiOS | main `fc21e5315d498a999974bc11da0ed2cd1dd39cbb`; PR `aa5e79c9f46dc693a226a4626012e6b0f15cfa17` | #1860 remains open and #1864 draft. Different identifiers do not prove separate physical machines. Existing issue owns the fix. | [Report](02-virelai-os/report.md), [proof design and testing amendment](02-virelai-os/design.md), [issue decision](02-virelai-os/issue-drafts.md). |
| 3, fart-app | `cc2cd4a6b4f07d14f439004db981db7a1055f807` | #56 merged. Failed attempt was cache-restore/DNS provisioning, before demo. #58 filed. | [Report](03-fart-app/report.md), [workflow map](03-fart-app/workflow-map.md). |
| 4, k4o | `59f88233589d2643ba5b4f380e3db70664bba2b3` | Markdown/GFM already shipped. Measured corpus supports three bounded output-contract issues, #21–#23. | [Report](04-k4o/report.md), [corpus map](04-k4o/oracle-corpus.md), [cases](04-k4o/measured-cases.json), [replay](04-k4o/replay-corpus.py). |
| 5, Virelai Sans | `e023614728579b59f20298d333e8b5a8d989c199` | 133/131 glyph slots, same 125 Unicode characters. Empty exporter helpers explain the gap; no new defect issue. | [Report](05-virelai-sans/report.md), [inventory](05-virelai-sans/glyph-inventory.md). |
| 6, la-famille | `bb9c4952331ad9e9401e2f3645617018a18bb9c5` | #581 already implementation-closed; strict dense uplift unverified and hard warranty abstention fails. #602/#603 filed. | [Report](06-la-famille/report.md), [criterion matrix](06-la-famille/criterion-matrix.md), [closure summary](06-la-famille/closure-summary.md). |
| 7, NINJAM | `5b5f266d49d836b5700c09bea149cc88c11bd4b7` | Revival baseline exists. Documentation and pre-release notices remain; #36/#37 filed. | [Report](07-ninjam/report.md), [ordered janitor plan](07-ninjam/janitor-plan.md). |
| 8, BANAL | `24e1da4439b016473119738b233eb8e636979cc6` | Focus-sensitive recommendation only; #225 already owns work. No application runtime test or owner decision claimed. | [Report](08-banal/report.md), [conventions survey](08-banal/conventions-survey.md). |
| 9, Oliver | `3615e6253f0e17b410cf1b987507d30bfcde537c` | Seeded differential/roundtrip campaign isolates two Cooklang regressions, #133/#134. No new high-confidence Textile defect; CommonMark untouched. | [Report](09-oliver/report.md), [results](09-oliver/conformance-results.md), [reproduction](09-oliver/reproduce.sh), [minimized cases](09-oliver/minimized.json). |
| 10, atmosplorer | `806db2a711f8a3a2d903f0fafe20d09ffc4a9480` | #2 repaired the moving-main/fixed-hash mismatch; #1 merged. No new issue. Local transitive fetch 429 limits tests, not a proven regression. | [Report](10-atmosplorer/report.md), [diagnosis](10-atmosplorer/diagnosis.md). |
| 11, empire hygiene | 31 default SHAs in inventory | Four distinct docs repairs filed. Existing Squirrel/Mediluna issues, incomplete acceptance, and mirror boundaries retained. | [Report](11-hygiene/report.md), [coverage](11-hygiene/hygiene-inventory.md), [results](11-hygiene/results.json). |

Each card also has `narrative.md` and `issue-drafts.md`. Worker drafts
record their research snapshot; coordinator notes and the ledgers record
subsequent filing. No design or recommendation is labeled a shipped fix.

## Filed issues

| Repository | Issues |
|---|---|
| Boris | [#1015, social metadata](https://github.com/drawmeanelephant/boris/issues/1015) |
| fart-app | [#58, provisioning/phase evidence](https://github.com/drawmeanelephant/fart-app/issues/58) |
| k4o | [#21, code boundaries](https://github.com/drawmeanelephant/k4o/issues/21); [#22, ordered nesting](https://github.com/drawmeanelephant/k4o/issues/22); [#23, scalar markers](https://github.com/drawmeanelephant/k4o/issues/23) |
| la-famille | [#602, real-model measurements](https://github.com/drawmeanelephant/la-famille/issues/602); [#603, strict abstention](https://github.com/drawmeanelephant/la-famille/issues/603) |
| NINJAM | [#36, notices](https://github.com/drawmeanelephant/ninjam/issues/36); [#37, support docs](https://github.com/drawmeanelephant/ninjam/issues/37) |
| Oliver | [#133, block comments](https://github.com/drawmeanelephant/oliver/issues/133); [#134, canonical fixed points](https://github.com/drawmeanelephant/oliver/issues/134) |
| boris-migration-lab | [#20, standalone README](https://github.com/drawmeanelephant/boris-migration-lab/issues/20) |
| Solipsist | [#304, app versus harness floor](https://github.com/drawmeanelephant/solipsist/issues/304) |
| drawmeanelephant.com | [#11, deployment docs](https://github.com/drawmeanelephant/drawmeanelephant.com/issues/11) |
| z.filed.fyi | [#5, generator link](https://github.com/drawmeanelephant/z.filed.fyi/issues/5) |

[Filing ledger](filed-issues.json), [read-back verification](issue-verification.json),
and [exact posted bodies](issues/) preserve the
action receipts. All fifteen bodies are in `issues/`.

## Checks and limits

- Boris: pinned/current sample builds and validations, current Strict
  specimen, and focused gates passed. No live crawler or full release
  gate; X-specific constraints still need confirmation.
- VirelaiOS: five existing stand-in tests and syntax checks passed.
  Real second physical endpoint, placement witness, and corrected-tape
  implementation remain unverified.
- k4o: existing 99-check harness passed, including 75 byte-identical
  oracle checks. Fifty-two extra paired cases and both retained corpora
  were replayed; eight proposed cases are unexecuted. No GFM-aware
  renderer or npm-source-commit attestation.
- Sans: inventory assertions passed; specific owner intent and old
  Macintosh consumer behavior remain unverified.
- Retrieval: targeted tests passed in five packages. Hard CLI reproduced
  the known warranty failure. Graph figures use deterministic providers;
  no real dense uplift/timing or visual-browser claim.
- NINJAM: 7/7 CTest, 27/27 Zig, vendor reproduction, and static Linux
  cross-build passed. No real-device jam or native Linux/Windows
  execution, GUI exercise, release dispatch, or tag.
- Oliver: 60/60 canonical Cooklang examples; 400 Textile plus 400 Cooklang
  comparisons; 400 serializer checks and 74 minimization comparisons.
  Repeated results were byte-identical. Not every unequal mutation was
  adjudicated; metadata/broader dialects/sanitizers/wheel attestation
  remain gaps.
- atmosplorer: old mismatch and current half-bump rejection reproduced.
  Correct-tag hash passed; a transitive HTTP 429 prevented local
  packaging/tests. CI's Swift suites passed with documented skips.
- Hygiene: 31/31 root READMEs and open tracker states inspected; candidate
  targets' closed histories complete. Seven other large histories were
  bounded and external links sampled. No application/compiler tests.

The reports distinguish fresh execution from source inspection,
upstream-reported results, and supplied premises.

## Raw support and provenance

Raw GitHub records, copied source documents, and full logs are **not
site source**. They remain only in ignored
`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/`.
[Raw-support manifest](raw-support-manifest.json) records their original
paths, ignored locations, sizes, and hashes without copying their content.
Local support links in technical reports are explicitly labeled;
they are unavailable in a clean clone and must not be published.
Immutable remote receipts and distilled findings remain portable.

[Execution ledger](01-execution-ledger.md) records dispatch and checks;
[validation.json](validation.json) records the final output/discovery
assertions from the original lab-theme study. Those commands exited 0
with three pre-existing unreferenced pages.
[PR validation](pr-validation.json) records the later Manila build
against current `main`: validate, HTML, RSS, and graph check exit 0;
all thirteen new pages remain draft and absent from discovery.
Eight existing pages are unreferenced; none is a study page.
The requested portfolio is two design cards plus nine bounded audits.
All workers inherited the GPT-6.1 Sol session model; there is no claim
that nine Luna runs occurred, no cost comparison, and no invented
historical model routing. Attribution in posts follows actual commit
trailers and issue/PR records, including non-Factory contributors.
