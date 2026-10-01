---
title: Most of the shelf did not need a chore
parent: log/2026-10
tags: [factory, empire, docs, hygiene]
status: draft
summary: The 31-repo documentation sweep found four concrete repairs and kept existing issues, mirror boundaries, and limited coverage visible.
published_at: 2026-10-01T00:00:00Z
---

# Most of the shelf did not need a chore

- Surface: README, source-path, and issue-tracker study
- Date: 2026-10-01
- Evidence:
  `2026-10-01-empire-self-study.assets/11-hygiene/hygiene-inventory.md`,
  its pinned per-repo records, and the receipts below
- Verdict: keep

## Where we are

The repos do not need to audition for busyness. All 31 got a README
and open-tracker read; most earned no new hygiene chore. This is a
documentation sweep, not an application test or every-source-file
audit. Seven large-repo closed histories were bounded, and public
links were sampled. The exact coverage and gaps are in the inventory
attachment.

The useful nits are literal. The
[Z guide's generator link](https://github.com/drawmeanelephant/z.filed.fyi/blob/888f502588a12624d90b9be1f7df0c7cd7b397a3/README.md#L3-L5)
escapes its repo. The
[migration lab](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/README.md#L1337-L1345)
still gives directions from its former home.
[Solipsist's README](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/README.md#L41-L46)
offers macOS 26 while
[the app target](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/Project.yml#L6-L19)
asks for 27.

The ten concern-specific repos have their own companion posts in
[[log/2026-10-01-empire-self-study]]. The other 21 are grouped here
because this card has shelf-label evidence, not enough behavioral
evidence to award each a grand state-of-the-union speech:

| Repo and pinned receipt | What this card can honestly say |
|---|---|
| [2nap](https://github.com/drawmeanelephant/2nap/blob/b23fcad79bc9d55b062263c34f643b4df2e44ef6/README.md) | README/workflow read; clean-room boundary preserved; no engine audit. |
| [boris-content-audit](https://github.com/drawmeanelephant/boris-content-audit/blob/c8ace046d70973459cf2b65b6ab6b7c9d84af028/README.md) | Standalone boundary and release-pinned grammar documented; no new candidate. |
| [boris.filed.fyi](https://github.com/drawmeanelephant/boris.filed.fyi/blob/97535d1f39ece03c211de0538e34af9361b6a721/README.md) | Prebuilt-site instructions agree with the inspected tree. |
| [droids.filed.fyi](https://github.com/drawmeanelephant/droids.filed.fyi/blob/399e93109108990772b5da0ff4b2fbc2d01bb7bf/README.md) | Upstream README matches its tree; this older worktree is not an upstream defect. |
| [solipsist](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/README.md) | Target-specific macOS requirements need a docs correction. |
| [fullonrogues.org](https://github.com/drawmeanelephant/fullonrogues.org/blob/ad2de869158dfc6c9fccbbfd5f865e2b584b8276/README.md) | Production instructions agree with workflow source. |
| [corgifever.com](https://github.com/drawmeanelephant/corgifever.com/blob/d9045dac96a520da007ad21cedfdcdfe915a3dfa/README.md) | README/workflow agree within this narrow read. |
| [drawmeanelephant.com](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/README.md) | Deployment instructions lag the checked-in workflow. |
| [thermalextractiondevices.com](https://github.com/drawmeanelephant/thermalextractiondevices.com/blob/49d076093ca593fc19f913570ff4fce9c8f40cdf/README.md) | Open ingestion/design work is not stale merely because the queue is busy. |
| [filed.fyi](https://github.com/drawmeanelephant/filed.fyi/blob/081a7e3e0e1b94b363e77dff493900679a1162dd/README.md) | Compiler-source and workflow pointers checked; no new candidate. |
| [boris-migration-lab](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/README.md) | Standalone links and ownership prose need reconciliation. |
| [zig-zouave](https://github.com/drawmeanelephant/zig-zouave/blob/2d8510d62b517fa786279562cf8b1bdcf0c47b9f/README.md) | Hash checks and signature assurance are already distinguished. |
| [dogbed](https://github.com/drawmeanelephant/dogbed/blob/1d9c9a60cf9e6dc94748ca581328930edc1f4cee/README.md) | Referenced assets/spec/license paths exist; no runtime claim tested. |
| [z.filed.fyi](https://github.com/drawmeanelephant/z.filed.fyi/blob/888f502588a12624d90b9be1f7df0c7cd7b397a3/README.md) | One generator link needs correction. |
| [muse.filed.fyi](https://github.com/drawmeanelephant/muse.filed.fyi/blob/a78886ff4c8afb2f8bef8bda3d1b2eaf2785054e/README.md) | Production flags agree with workflow source; no inactivity verdict. |
| [squirrel.filed.fyi](https://github.com/drawmeanelephant/squirrel.filed.fyi/blob/4860fae61e7418838a3b8db229010e153d15fdef/README.md) | Command drift already belongs to #11. |
| [rotkeeper](https://github.com/drawmeanelephant/rotkeeper/blob/de3b393be3d1aeb041a4be7665700b5e6dedb10e/README.md) | Source paths checked; no new candidate in this bounded sweep. |
| [setup-zig](https://github.com/drawmeanelephant/setup-zig/blob/31b51da6a961bb5903fef5cc8f22db25a0223d67/README.md) | Read-only mirror/fork boundary retained; tracker disabled. |
| [agent-hub](https://github.com/drawmeanelephant/agent-hub/blob/6db64069854c56795a0656b5c5af9ad57b2326a4/README.md) | Local-only contract respected; no service started or token store read. |
| [mediluna](https://github.com/drawmeanelephant/mediluna/blob/0475f581af56c4cb47d48eb5ad444e0e0d004e6c/README.md) | Link-checker work already belongs to #6/PR #9. |
| [redesigned-dollop](https://github.com/drawmeanelephant/redesigned-dollop/blob/55dca9e4811eee1d48e8d89fbd0e2f91b7bb236c/README.md) | Existing history-privacy issue retained; no cleanup attempted. |

Those dispositions are source/tracker observations documented in
the coverage inventory, not health certificates.
The `redesigned-dollop` receipt is private; the owner approved sharing
the finding here, not changing that repository's visibility.

## What's improved

Some loose ends are the instructions arriving late to the party.
Solipsist [already shipped M18's newer app floor](https://github.com/drawmeanelephant/solipsist/pull/294).
The elephant archive has a
[successful Cloudflare deployment at the audited revision](https://github.com/drawmeanelephant/drawmeanelephant.com/actions/runs/36790512598),
though its
[README still suggests a subtree push](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/README.md#L84-L90).
GitHub Pages is still enabled in the recorded API observation; the
sweep did not decide to retire it.

The lab's
[optional Tinderbox seeder exists](https://github.com/drawmeanelephant/boris-migration-lab/pull/10).
Remember that before commissioning it again. It is not proof that
[#8's live acceptance](https://github.com/drawmeanelephant/boris-migration-lab/issues/8)
has been completed. No further improvement is claimed for the other
grouped repos from a README read.

## What's next

Four filed documentation repairs, not another empire-wide machinery
project:
[migration-lab #20](https://github.com/drawmeanelephant/boris-migration-lab/issues/20),
[Solipsist #304](https://github.com/drawmeanelephant/solipsist/issues/304),
[elephant site #11](https://github.com/drawmeanelephant/drawmeanelephant.com/issues/11),
and [Z guide #5](https://github.com/drawmeanelephant/z.filed.fyi/issues/5).
They change labels, not behavior. This study did not implement them.

Keep [Squirrel #11](https://github.com/drawmeanelephant/squirrel.filed.fyi/issues/11)
and [Mediluna #6](https://github.com/drawmeanelephant/mediluna/issues/6)
as their existing homes. Keep
[Oliver's full-DTD gap](https://github.com/drawmeanelephant/oliver/issues/130)
distinct from the
[serializer that shipped](https://github.com/drawmeanelephant/oliver/pull/131).
No issue was closed simply because a related PR exists.

Factory's contribution here is the evidence-backed research and
filing pass recorded in the study ledger. These receipts do not
establish historical Luna/Sol routing. The affectionate thing to do
for a crowded shelf is repair the labels that mislead people, then
leave the good shelves alone.

Part of [[log/2026-10-01-empire-self-study]] and [[projects/index]].
