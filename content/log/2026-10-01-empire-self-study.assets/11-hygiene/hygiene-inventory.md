# Hygiene inventory — card 11

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/11-hygiene/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Observed 2026-10-01, one immutable default-branch snapshot per repository.
Complete input inventory: **31/31 repositories**. README read: **31/31**.
Root instructions inspected: **31/31** (14 have AGENTS/CLAUDE files; Rotkeeper's
additional GEMINI guidance was also read). Open issue/PR state read:
**31/31**, including **27 open issues and 18 open PRs**. No repository API,
README, tree, or open-state check was inaccessible. All trees were untruncated.
Issue tracker is disabled on setup-zig; its zero is not a claim that an enabled
tracker was reviewed. Root issue listings include PRs and are fully paginated.

Closed listings are complete on 23 repositories initially and on Solipsist
after a full-history follow-up (302 issue/PR records). The other seven retain
the latest 100 *combined issue+PR* records: Boris, VirelaiOS, La Famille,
Oliver, Filed, BANAL, Rotkeeper. Candidate-target closed histories are complete.
Exact issue/PR fetches supplement the bounded specialist histories.

| Repository / immutable README | Default branch SHA | README / instructions | Open issues / PRs | Closed-history coverage | Boundary / result |
|---|---|---|---:|---|---|
| [fart-app](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/README.md) | `main@cc2cd4a6b4f07d14f439004db981db7a1055f807` | read / none at root | 3 / 1 | all | Card 03; H7, existing open docs PR #57; no new draft. |
| [atmosplorer](https://github.com/drawmeanelephant/atmosplorer/blob/806db2a711f8a3a2d903f0fafe20d09ffc4a9480/README.md) | `main@806db2a711f8a3a2d903f0fafe20d09ffc4a9480` | read / none at root | 0 / 0 | all | Card 10; README/state read, paths present; no hygiene candidate. |
| [virelai-sans](https://github.com/drawmeanelephant/virelai-sans/blob/e023614728579b59f20298d333e8b5a8d989c199/README.md) | `main@e023614728579b59f20298d333e8b5a8d989c199` | read / none at root | 5 / 1 | all | Card 05; five open NEXT cards + PR #19, not stale by age. |
| [2nap](https://github.com/drawmeanelephant/2nap/blob/b23fcad79bc9d55b062263c34f643b4df2e44ef6/README.md) | `main@b23fcad79bc9d55b062263c34f643b4df2e44ef6` | read / none at root | 0 / 0 | all | README/differential workflow read; clean-room boundary preserved; no implementation read. |
| [boris](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/README.md) | `main@08969742f85238443ce5cd1cd53ceab1b1f3f85a` | read / AGENTS.md | 4 / 0 | latest 100 issue+PR records | Card 01; H5; #1006 closure affects H10 provenance, not local fix. |
| [k4o](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/README.md) | `main@59f88233589d2643ba5b4f380e3db70664bba2b3` | read / none at root | 0 / 0 | all | Card 04; README/state read; no added scope. |
| [VirelaiOS](https://github.com/drawmeanelephant/VirelaiOS/blob/fc21e5315d498a999974bc11da0ed2cd1dd39cbb/README.md) | `main@fc21e5315d498a999974bc11da0ed2cd1dd39cbb` | read / AGENTS.md | 2 / 1 | latest 100 issue+PR records | Card 02; H6; M87 issue/index + blocked PR remain open. |
| [la-famille](https://github.com/drawmeanelephant/la-famille/blob/bb9c4952331ad9e9401e2f3645617018a18bb9c5/README.md) | `master@bb9c4952331ad9e9401e2f3645617018a18bb9c5` | read / AGENTS.md | 4 / 0 | latest 100 issue+PR records | Card 06; four moonshot trackers are intentional active scope, not bulk cleanup. |
| [droids.filed.fyi](https://github.com/drawmeanelephant/droids.filed.fyi/blob/399e93109108990772b5da0ff4b2fbc2d01bb7bf/README.md) | `main@399e93109108990772b5da0ff4b2fbc2d01bb7bf` | read / AGENTS.md | 0 / 0 | all | Upstream manila docs match tree; local checkout differs, not an upstream defect. |
| [solipsist](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/README.md) | `main@53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc` | read / AGENTS.md | 0 / 0 | all | H2; all 302 closed issue/PR records checked for duplicates. |
| [fullonrogues.org](https://github.com/drawmeanelephant/fullonrogues.org/blob/ad2de869158dfc6c9fccbbfd5f865e2b584b8276/README.md) | `main@ad2de869158dfc6c9fccbbfd5f865e2b584b8276` | read / AGENTS.md | 0 / 0 | all | README production path consistent with workflow source. |
| [ninjam](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/README.md) | `main@5b5f266d49d836b5700c09bea149cc88c11bd4b7` | read / none at root | 1 / 0 | all | Maintained fork of justinfrankel/ninjam; card 07 owns engineering concerns. |
| [oliver](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/README.md) | `main@3615e6253f0e17b410cf1b987507d30bfcde537c` | read / none at root | 1 / 0 | latest 100 issue+PR records | Card 09; H9 partial acceptance, not unconditional closure. |
| [boris-content-audit](https://github.com/drawmeanelephant/boris-content-audit/blob/c8ace046d70973459cf2b65b6ab6b7c9d84af028/README.md) | `main@c8ace046d70973459cf2b65b6ab6b7c9d84af028` | read / none at root | 0 / 0 | all | Release-tag grammar pins and standalone boundary documented; no candidate. |
| [boris.filed.fyi](https://github.com/drawmeanelephant/boris.filed.fyi/blob/97535d1f39ece03c211de0538e34af9361b6a721/README.md) | `main@97535d1f39ece03c211de0538e34af9361b6a721` | read / none at root | 0 / 0 | all | Committed HTML/prebuilt docs consistent with tree; CI regenerates llms/RSS. |
| [corgifever.com](https://github.com/drawmeanelephant/corgifever.com/blob/d9045dac96a520da007ad21cedfdcdfe915a3dfa/README.md) | `main@d9045dac96a520da007ad21cedfdcdfe915a3dfa` | read / AGENTS.md | 0 / 0 | all | Three-page boutique README and workflow consistent; no registry demand. |
| [drawmeanelephant.com](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/README.md) | `main@8cbbf43ef8e52d5c5311cff683fbb716fb91078f` | read / none at root | 0 / 0 | all | H3; Pages API also enabled: do not assert Pages was removed. |
| [thermalextractiondevices.com](https://github.com/drawmeanelephant/thermalextractiondevices.com/blob/49d076093ca593fc19f913570ff4fce9c8f40cdf/README.md) | `main@49d076093ca593fc19f913570ff4fce9c8f40cdf` | read / AGENTS.md | 1 / 14 | all | 14 open PRs + relation-slot decision; preserve design/ingestion lanes, no volume-based verdict. |
| [filed.fyi](https://github.com/drawmeanelephant/filed.fyi/blob/081a7e3e0e1b94b363e77dff493900679a1162dd/README.md) | `main@081a7e3e0e1b94b363e77dff493900679a1162dd` | read / AGENTS.md | 0 / 0 | latest 100 issue+PR records | README pinned compiler source/workflow checked; no candidate. |
| [boris-migration-lab](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/README.md) | `main@f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce` | read / none at root | 2 / 0 | all | H1 and H8; all closed records checked; no new importer scope. |
| [zig-zouave](https://github.com/drawmeanelephant/zig-zouave/blob/2d8510d62b517fa786279562cf8b1bdcf0c47b9f/README.md) | `main@2d8510d62b517fa786279562cf8b1bdcf0c47b9f` | read / none at root | 0 / 0 | all | SHA-256 versus minisign distinction explicitly documented, not a hygiene failure. |
| [dogbed](https://github.com/drawmeanelephant/dogbed/blob/1d9c9a60cf9e6dc94748ca581328930edc1f4cee/README.md) | `main@1d9c9a60cf9e6dc94748ca581328930edc1f4cee` | read / none at root | 0 / 0 | all | README relative assets/spec/license paths present; no runtime claim verified. |
| [z.filed.fyi](https://github.com/drawmeanelephant/z.filed.fyi/blob/888f502588a12624d90b9be1f7df0c7cd7b397a3/README.md) | `main@888f502588a12624d90b9be1f7df0c7cd7b397a3` | read / none at root | 0 / 0 | all | H4; freshness issue #1 already closed, not reopened without fresh fact evidence. |
| [muse.filed.fyi](https://github.com/drawmeanelephant/muse.filed.fyi/blob/a78886ff4c8afb2f8bef8bda3d1b2eaf2785054e/README.md) | `main@a78886ff4c8afb2f8bef8bda3d1b2eaf2785054e` | read / none at root | 0 / 0 | all | Thin README production flags match workflow source; no inactivity inference. |
| [banal](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/README.md) | `main@24e1da4439b016473119738b233eb8e636979cc6` | read / AGENTS.md | 1 / 0 | latest 100 issue+PR records | Card 08; shortcut defect already #225; no duplicate. |
| [squirrel.filed.fyi](https://github.com/drawmeanelephant/squirrel.filed.fyi/blob/4860fae61e7418838a3b8db229010e153d15fdef/README.md) | `main@4860fae61e7418838a3b8db229010e153d15fdef` | read / AGENTS.md | 1 / 0 | all | H10 duplicate #11; public home readable. |
| [rotkeeper](https://github.com/drawmeanelephant/rotkeeper/blob/de3b393be3d1aeb041a4be7665700b5e6dedb10e/README.md) | `main@de3b393be3d1aeb041a4be7665700b5e6dedb10e` | read / AGENTS.md | 0 / 0 | latest 100 issue+PR records | README paths present; generated/DIP prose not used as sole authority; no new draft. |
| [setup-zig](https://github.com/drawmeanelephant/setup-zig/blob/31b51da6a961bb5903fef5cc8f22db25a0223d67/README.md) | `main@31b51da6a961bb5903fef5cc8f22db25a0223d67` | read / none at root | 0 / 0 | all | H12; read-only mirror boundary retained; issue tracker disabled. |
| [agent-hub](https://github.com/drawmeanelephant/agent-hub/blob/6db64069854c56795a0656b5c5af9ad57b2326a4/README.md) | `main@6db64069854c56795a0656b5c5af9ad57b2326a4` | read / AGENTS.md, CLAUDE.md | 0 / 0 | all | Local-only contract; no collector started, tokens read, or service writes. |
| [mediluna](https://github.com/drawmeanelephant/mediluna/blob/0475f581af56c4cb47d48eb5ad444e0e0d004e6c/README.md) | `main@0475f581af56c4cb47d48eb5ad444e0e0d004e6c` | read / none at root | 1 / 1 | all | H11 duplicate #6/PR #9; main still has pooled checker. |
| [redesigned-dollop](https://github.com/drawmeanelephant/redesigned-dollop/blob/55dca9e4811eee1d48e8d89fbd0e2f91b7bb236c/README.md) | `main@55dca9e4811eee1d48e8d89fbd0e2f91b7bb236c` | read / AGENTS.md | 1 / 0 | all | Existing history-privacy issue #2 retained; no history cleanup attempted. |

## Link coverage and limitations

`links.json` captures 311 regex-extracted README/root-instruction occurrences:
190 existing relative paths, 107 external destinations, eight same-document
fragments, and six initial missing-path hits. Two hits are inline code examples
(`url`, `href="…"`), not links. Manual review leaves **four real broken relative
links across two READMEs**: migration-lab at 1143/1343/1344, Z guide at 5.
This is a bounded source-path audit, not a complete Markdown parser: reference
definitions, every inline-code context, headings/fragments, generated routes,
all prose URLs, and the full site corpus are not exhaustively checked.

`public-links.json` contains **16 targeted public URL reads**: 13 returned 200,
three old DipshitOS documentation paths returned an explicit HTTP 404. Their
replacement site's 200 plus GitHub Pages configuration corroborate renamed-route
drift; this is not a claim that a domain is permanently dead. The historic
Textism link returned 200 and is not reported broken. Other third-party links
and badges are not comprehensively HTTP-tested. No login or browser interaction
was needed: `agent-browser read URL --json` performed URL-only reads because
FetchUrl accepts only user-explicit URLs, not source-discovered destinations.

## Instruction / source boundaries

The study contract overrides implementation workflows: no builds, patching,
GitHub claims/comments, application starts, or PR operations. Agent-hub's
loopback/token rules were respected; no secrets or durable runtime state were
read. 2nap's black-box clean-room boundary was respected: neither its engine nor
k4o implementation was inspected by this card. Ninjam is a maintained fork;
setup-zig is treated as a read-only mirror/fork despite its conflicting README
description. No follow-up change is authorized in either boundary.

No specialist output was read. Cards 01–10 are referenced by assigned repository
only, using upstream source/issue evidence independently.
