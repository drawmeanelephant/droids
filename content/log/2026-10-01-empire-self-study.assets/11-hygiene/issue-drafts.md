# Documentation-only issue drafts — card 11

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/11-hygiene/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Coordinator disposition, 2026-10-01: after refreshing all four HEADs
and open states, H1–H4 were filed as
[migration-lab #20](https://github.com/drawmeanelephant/boris-migration-lab/issues/20),
[Solipsist #304](https://github.com/drawmeanelephant/solipsist/issues/304),
[elephant site #11](https://github.com/drawmeanelephant/drawmeanelephant.com/issues/11),
and [Z guide #5](https://github.com/drawmeanelephant/z.filed.fyi/issues/5).
The drafts below were unfiled at worker completion.
Exact posted bodies are in `../issues/`; existing tracker states were
not changed.

Not filed. Recheck HEAD and open state immediately before filing. Duplicate
checks use all open and all closed issue/PR records on every candidate target,
observed 2026-10-01. Specialist concerns below are references, not new drafts.

## H1 — Repair standalone migration-lab README links and ownership language

**Target:** `drawmeanelephant/boris-migration-lab`

**Problem:** three root README links escape the repository; the boundary section
still describes the former `tools/`-resident lab rather than this standalone home.

**Evidence:** [boris-migration-lab README.md](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/README.md#L1141-L1143);
[boris-migration-lab README.md](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/README.md#L1337-L1345). Pinned tree has root `build.zig`
and `docs/MIGRATION.md`, no `tools/` parent. The README already pins product
contracts to Boris `v0.8.2` elsewhere.

**Proposed scope:** only root README link destinations and the short ownership
paragraph. Use local `docs/MIGRATION.md`; use the existing release-pinned Boris
contract convention for product-owned docs. Describe the lab's own build versus
the product compiler boundary clearly.

**Acceptance:** all three repaired links resolve against their declared pinned
repositories; the README no longer places this repository under `tools/` or
mistakes its root build for Boris's build; no product or converter files change.

**Non-goals:** grammar changes, migration behavior, new modes, moving source,
pin upgrades, or a new link-checking framework.

**Duplicate check:** open #1 (AT import) and #8 (Tinderbox seeder) are unrelated.
All 17 closed issue/PR records, including the importer-contract PRs #14–#17,
contain no standalone-pointer repair. No new specialist overlap.

## H2 — Document Solipsist's macOS 27 app floor separately from its 26 harness

**Target:** `drawmeanelephant/solipsist`

**Problem:** README macOS 26+ prerequisites disagree with the shipped app's 27.0
deployment target, sending users to an unsupported install/build expectation.

**Evidence:** [solipsist README.md](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/README.md#L41-L46);
[solipsist Project.yml](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/Project.yml#L6-L19);
[solipsist Project.yml](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/Project.yml#L81-L110);
[merged M18 PR #294](https://github.com/drawmeanelephant/solipsist/pull/294).

**Proposed scope:** README prerequisites say app macOS 27+, with a separate
macOS 26 harness/test note. Bring the nearby M17 status line up to the evidenced
M18 state if desired, referencing #294 rather than duplicating the roadmap.

**Acceptance:** app and spike/test requirements agree with Project.yml; README
does not imply all targets require 27 or the app supports 26; no deployment
target, entitlement, signing, or product change.

**Non-goals:** backporting Siri/FoundationModels, notarization, changing Xcode
support without evidence, app UI work, or engine changes.

**Duplicate check:** no open issues or PRs. Full 302-record closed history checked;
docs PRs #290/#295 are related earlier sync work, but the wrong root README
prerequisite remains at the pinned SHA. Treat this as a small missed-doc follow-up,
not a reopened feature request.

## H3 — Replace the elephant-site's clean-clone subtree deploy recipe with current instructions

**Target:** `drawmeanelephant/drawmeanelephant.com`

**Problem:** root README omits the active automated Cloudflare route and instructs
subtree-pushing an ignored/untracked `dist` prefix without preparing tracked
history. Building a clean checkout does not make that recipe usable as written.

**Evidence:** [drawmeanelephant.com README.md](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/README.md#L84-L90);
[drawmeanelephant.com .gitignore](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/.gitignore#L1);
[drawmeanelephant.com .github/workflows/deploy.yml](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/.github/workflows/deploy.yml#L60-L74);
[exact-SHA deploy run](https://github.com/drawmeanelephant/drawmeanelephant.com/actions/runs/36790512598).
GitHub Pages is still enabled according to the read-only Pages API: preserve that
fact rather than asserting the old host is gone.

**Proposed scope:** update README source/output/deployment explanation to name
the existing Cloudflare workflow, required secret names (never values), project,
and trigger. Remove the unsupported clean-clone subtree recipe, or label and
fully specify an intentionally retained manual Pages path after owner confirmation.

**Acceptance:** documented normal deploy matches checked-in workflow; it does not
require committing ignored output or undocumented subtree history; any retained
Pages alternative is explicitly distinguished. No workflow, host, branch, or
secret change.

**Non-goals:** deploying, disabling Pages, altering compiler branch/pins, forcing
tracked dist output, changing domain routing, or executing a push to test docs.

**Duplicate check:** open state empty; all ten closed PRs checked. Existing tooling/
content PRs (#2/#5/#10 among them) do not repair this deployment section.

## H4 — Point the Z guide README's generator link at La Famille

**Target:** `drawmeanelephant/z.filed.fyi`

**Problem:** root README's `../../README.md` generator link escapes the site repo.

**Evidence:** [z.filed.fyi README.md](https://github.com/drawmeanelephant/z.filed.fyi/blob/888f502588a12624d90b9be1f7df0c7cd7b397a3/README.md#L3-L5); the same README later provides
`https://github.com/drawmeanelephant/la-famille` as the generator repository.

**Proposed scope:** one link-target correction to the generator repository or
its deliberately chosen release-pinned README.

**Acceptance:** clicking “la-famille” reaches the actual generator source/docs;
the site README does not link to a parent tree outside this repository.

**Non-goals:** rebuilding the site, updating Z.ai facts, generator version changes,
freshness automation, or adding broad link-audit infrastructure.

**Duplicate check:** open state empty; all four closed issue/PR records checked.
Closed freshness #1 and search/cache PRs #3/#4 are unrelated.
This tiny correction can be included in an existing planned site docs pass
instead of filing a separate issue if the owner prefers.

## Do not file duplicates or feature work from this sweep

* Squirrel #11 and Mediluna #6/PR #9 already own their hygiene defects.
* Migration-lab #8 has an implementation; verify live acceptance/reconcile the
  existing issue rather than opening another seeder request.
* Oliver #130/PR #131 is partial original acceptance (full SGML DTD not proven);
  refer to card 09.
* Boris already-resolved #533/#301 README claims → card 01.
* VirelaiOS old documentation-route links → card 02.
* fart-app #40/#41 prose/corpus reconciliation → card 03.
* setup-zig ownership-description conflict is an owner question at a read-only
  mirror/fork boundary, not permission to change or file upstream.
