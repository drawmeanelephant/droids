# Card 11 — Empire documentation and issue hygiene

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/11-hygiene/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


## Scope and evidence

Explore-only sweep of the complete captured 31-repository inventory under
`drawmeanelephant`, observed **2026-10-01**. Default SHAs, instruction coverage,
all open issue/PR counts, bounded/completed closed-history accounting and
fork/mirror boundaries are in [hygiene-inventory.md](hygiene-inventory.md).
This card used authenticated **read-only `gh api` GETs**, immutable Git trees
and contents, issue timelines, merge records, bounded CI records, and URL-only
public reads. No sibling checkout or worker report supplied findings.

**Result:** four new, documentation-only candidates; two existing implementation/
acceptance reconciliation references; two established hygiene duplicates;
three specialist overlap references; one mirror-description boundary discrepancy.
No open issue is called stale just because it is old, and no automatic issue
closure is recommended. No project or GitHub state was changed.

## Where we are

### H1 — Standalone migration-lab README still contains in-tree pointers

Confirmed source-documentation defect, low severity. At `f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce`,
the links `../../docs/contracts/content-local-assets.md`,
`../../docs/contracts/frontmatter.md`, and `../../docs/MIGRATION.md` escape the
repository. See [boris-migration-lab README.md](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/README.md#L1141-L1143) and
[boris-migration-lab README.md](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/README.md#L1337-L1345). The pinned tree contains
`docs/MIGRATION.md` and a root build/source layout, not a `tools/` parent.
The latter section's “lives under tools” / “does not modify root build” guidance
still speaks from Boris's old in-tree viewpoint. Earlier README sections already
name the standalone home and pin Boris contracts to `v0.8.2`.

Recommendation: one small docs card fixes these three destinations and ownership
language. Do not widen converters or reinterpret product grammar. All two open
issues and all 17 closed issue/PR records were checked: no matching pointer/
standalone-boundary repair exists.

### H2 — Solipsist's README promises the wrong app OS floor

Confirmed source-documentation defect, medium onboarding impact.
[solipsist README.md](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/README.md#L41-L46) says macOS 26+. The actual app spec is
[solipsist Project.yml](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/Project.yml#L6-L19): macOS 27.0. Separate spike and test targets
explicitly remain 26 ([solipsist Project.yml](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/Project.yml#L81-L110)).
[Merged PR #294](https://github.com/drawmeanelephant/solipsist/pull/294)
records the intentional 26→27 app change; commit
[`27061cff73812b63c212d9db8f21883814a5687e`](https://github.com/drawmeanelephant/solipsist/commit/27061cff73812b63c212d9db8f21883814a5687e)
keeps the harness targets host-agnostic.

Recommendation: distinguish the shipped-app floor from the harness floor in the
README; do not lower code requirements. README status also stops at M17 while
[PR #295](https://github.com/drawmeanelephant/solipsist/pull/295) establishes M18
landed. That is an adjacent one-line correction, not a new roadmap. Full closed
history (302 combined records) includes #290/#295 docs work, but the wrong README
requirement remains at this SHA and no open repair exists.

### H3 — Elephant-site deployment instructions do not describe the active path

Confirmed source-documentation defect, medium operator impact.
[drawmeanelephant.com README.md](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/README.md#L84-L90) prescribes
`git subtree push --prefix dist origin gh-pages`; `dist/` is ignored
([drawmeanelephant.com .gitignore](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/.gitignore#L1)) and absent from the pinned source
tree, so a clean build does not create the tracked history that this subtree
recipe needs. This conclusion is source inspection, **not an executed push**.
Meanwhile [drawmeanelephant.com .github/workflows/deploy.yml](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/.github/workflows/deploy.yml#L60-L74)
builds and deploys `dist` to Cloudflare project `drawmeanelephant`.
[Run 36790512598](https://github.com/drawmeanelephant/drawmeanelephant.com/actions/runs/36790512598)
records success at the exact audited SHA.

The GitHub Pages API still reports an enabled Pages site: **do not claim Pages
was removed or its branch is dead**. The warranted repair documents the automated
Cloudflare route and labels/repairs any intentionally retained Pages alternative,
without changing either host. All ten closed PRs and empty open state were
checked; no corresponding docs card exists.

### H4 — Z guide's generator link still assumes a parent repository

Confirmed broken public README navigation, low severity.
[z.filed.fyi README.md](https://github.com/drawmeanelephant/z.filed.fyi/blob/888f502588a12624d90b9be1f7df0c7cd7b397a3/README.md#L3-L5) links La Famille to `../../README.md`.
At repository root that cannot resolve to the generator's README. Later in the
same file the generator's GitHub URL is already documented, providing an
unambiguous replacement. Both the guide's custom domain and pages.dev URL
returned 200; the site is not being called dead.

Recommendation: repair the root generator link only. Empty open state and all
four closed issue/PR records contain no duplicate. Freshness issue #1 is closed;
do not resurrect it without new factual evidence.

## What's improved

Evidence-backed earlier/current transitions, not credit inferred from bot names:

* **The elephant-site deployment already changed:** commit
  [`0e0e71f74bb987fc2e424cf8944f09faae2f0979`](https://github.com/drawmeanelephant/drawmeanelephant.com/commit/0e0e71f74bb987fc2e424cf8944f09faae2f0979)
  adds Cloudflare CI deployment; the current exact-SHA run above succeeds.
  H3 is the instructions lagging shipped infrastructure, not a request to build it.
* **Solipsist already shipped M18 and separated host requirements:** PR #294
  and the harness-floor commit above establish the intentional change. H2 is
  a README repair, not an unimplemented feature.
* **H8 — The optional Tinderbox seeder already exists:** [merged PR #10](https://github.com/drawmeanelephant/boris-migration-lab/pull/10),
  [issue #8's implementation comment](https://github.com/drawmeanelephant/boris-migration-lab/issues/8#issuecomment-5721093089),
  and [boris-migration-lab scripts/seed-tinderbox-corpus.sh](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/scripts/seed-tinderbox-corpus.sh#L1-L6)
  agree. The AppleScript creates user attributes, hierarchy and named links.
  #8 remains open and the PR's optional live smoke is unchecked. Reconcile the
  existing issue after Tinderbox 11 verification; do not invent another seeder
  card or pronounce runtime acceptance complete.
* **H9 / card 09 — Oliver's HTML4 serializer already shipped:** [merged PR #131](https://github.com/drawmeanelephant/oliver/pull/131)
  implements the feature in open [#130](https://github.com/drawmeanelephant/oliver/issues/130).
  It explicitly substitutes a hermetic subset checker for full upstream SGML
  DTD validation ([oliver docs/HTML4-STRICT.md](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/HTML4-STRICT.md#L62-L84)).
  This is partial original acceptance, not evidence that the whole issue should
  be closed. Refer to card 09; no duplicate draft here.
* **H5 / card 01 — Boris README holds already-resolved premises:** #533 has a
  [“closing as implemented” receipt](https://github.com/drawmeanelephant/boris/issues/533#issuecomment-5308622065);
  #301 is closed with an acceptance audit. The root README still leaves #533
  unchecked and calls #301's live smoke/isolate measurements open, and still
  says HTML verification surfaces are not emitted. Refer to card 01, not a
  separate compiler feature request.
* **H7 / card 03 — fart-app's panic descriptions need state reconciliation:**
  [#40](https://github.com/drawmeanelephant/fart-app/issues/40) and
  [#41](https://github.com/drawmeanelephant/fart-app/issues/41) are closed, while
  the README describes avoiding those inputs “until fixed.” Card 03 owns
  verification against the actual corpus; this card does not infer a code
  failure from the prose.

No Factory/Luna/Sol attribution is inferred from task shape, authorship labels,
or CI success. Source PRs establish changes, not the model that performed them.

## What's next

### Avoid duplicate work

* **H10:** [squirrel.filed.fyi #11](https://github.com/drawmeanelephant/squirrel.filed.fyi/issues/11)
  already covers missing README/watch static flags and homepage layout rule.
  The defect remains in the pinned docs. Its upstream
  [Boris #1006](https://github.com/drawmeanelephant/boris/issues/1006) is now
  closed; update the root-cause reference during the existing card, not a new
  local issue. Closure upstream is not proof of a local README fix.
* **H11:** [Mediluna #6](https://github.com/drawmeanelephant/mediluna/issues/6)
  already covers pooled relative-reference validation and has open
  [PR #9](https://github.com/drawmeanelephant/mediluna/pull/9). Main still pools
  references. Do not duplicate it, and do not count the unmerged PR as shipped.
* **H6 / card 02:** three README DipshitOS documentation URLs returned 404.
  GitHub Pages configuration names `https://drawmeanelephant.github.io/VirelaiOS/`,
  which returned 200. The source README still uses the old paths. This is
  independently corroborated renamed-route drift, referred to card 02;
  the identity/design card may incorporate the link repair without another
  parallel scope. Old GitHub repository URLs may redirect and are **not**
  automatically classified broken.
* **H12:** setup-zig's captured description calls it a read-only Codeberg mirror;
  its pinned README calls it a maintained Node24 fork. Preserve the stricter
  read-only boundary until the owner clarifies intent. Issues are disabled;
  a zero issue count is not duplicate clearance to file there. Ninjam is a
  separate maintained fork of `justinfrankel/ninjam`, not a read-only mirror.
* Existing BANAL #225, TED relation-slot #34, TED open ingestion PRs, Dollop
  privacy/history #2, NINJAM #32 and La Famille moonshots remain their existing
  workstreams. No staleness verdict is based on age, volume, or unfamiliarity.

### Verification and concrete gaps

Executed: 31 metadata/commit/tree/README/root-instruction/open/closed snapshots,
56 targeted workflow/source fetches, complete candidate-target closed-history
reads, selected issue timelines and merged PR details, source-link checks,
16 public URL reads. `collect.py`, `collect_targets.py`, `check_links.py` and
`check_public.py` retain reproducible bounded methods; `coverage.json`,
`results.json`, `links.json`, `public-links.json`, `source-checks.json` and
`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/11-hygiene/evidence/` retain receipts. The five extra public checks were a targeted
follow-up captured in `public-links.json`.

Not executed: compiler builds, application tests, live Tinderbox, Swift app
launches, full SGML validation, a generated-site-wide link crawl, every external
URL/fragment, GitHub writes, deployments or pushes. Seven large-repo closed
histories remain bounded; all new-candidate histories are complete. GitHub
issue/PR state is mutable and counts are observation-time snapshots, not
guarantees against later changes. No inaccessible repository check was hidden;
three failed public reads are recorded explicitly as old-route 404s.

Before filing, coordinator should recheck issue/PR state and default HEAD,
then file only still-warranted H1–H4. H8 needs an existing-issue acceptance
decision; H9 belongs to card 09. Coordinator owns Boris validate/full-build
for the assembled study; this source-only worker did not run them.
