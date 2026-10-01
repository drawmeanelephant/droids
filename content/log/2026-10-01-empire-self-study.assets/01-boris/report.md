# Card 1 — Boris social metadata

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


**Observation:** 2026-10-01; upstream rechecked at 12:48:38Z. **Authority:** explore and design only. No implementation, project-source edits, issue changes, publication, or subdelegation.

## Scope and sources

- Upstream `main`: [`08969742f85238443ce5cd1cd53ceab1b1f3f85a`](https://github.com/drawmeanelephant/boris/commit/08969742f85238443ce5cd1cd53ceab1b1f3f85a).
- Sample: droidsblog [`3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce`](https://github.com/drawmeanelephant/droidsblog/commit/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce), copied with `git archive`, not built in the coordinator's checkout.
- Sample CI pin: [`5ef49ae2c7fcdc11cac907fecebf51ea8c3fd54b`](https://github.com/drawmeanelephant/boris/commit/5ef49ae2c7fcdc11cac907fecebf51ea8c3fd54b), declared by [setup-boris/action.yml](https://github.com/drawmeanelephant/droidsblog/blob/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce/.github/actions/setup-boris/action.yml#L5-L14). Both snapshots report `boris/0.8.2`; the version string alone cannot distinguish them.
- Fresh tarballs and all builds were confined to `/private/tmp/boris-social-study-20261001/`. Applicable Boris and sample `AGENTS.md` files, status, changelog, and relevant contracts were read. `/Users/tbuddy/t3/zig/boris` was neither modified nor built nor fetched.
- Evidence types below are explicit: **executed checks**, **source inspection**, **upstream documentation**, and **owner-supplied premise**. Compact retained receipts are in [evidence/manifest.json](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/manifest.json), [generated-heads.txt](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/generated-heads.txt), and [related-records.json](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/related-records.json).

## Where we are

### 1. The sample has a tidy head, but no generated social identity

**Documented limitation / feature gap; owner priority, not a confirmed compiler defect.**

**Executed:** built the immutable sample with both its pinned compiler and current upstream, using its actual theme, homepage layout rule, static files, sitemap, and `--site-url https://droids.filed.fyi/`. Both validations and builds exited 0. Each output contained **23 content-page HTML files plus one Proof Pack HTML file**. All 24 heads had **zero description tags, zero canonical links, and zero OpenGraph/Twitter tags**. The retained homepage and Boris-project HTML bytes were identical across the two compilers.

For `projects/boris.html`, the head is:

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Boris · droids.filed.fyi</title>
  <link rel="stylesheet" href="../assets/css/lab.css">
  <link rel="stylesheet" href="../assets/css/modes.css">
  <link rel="icon" type="image/svg+xml" href="../assets/favicon.svg">

  <link rel="alternate" type="application/rss+xml" title="droids.filed.fyi" href="https://droids.filed.fyi/rss.xml">
</head>
```

That title, favicon, viewport, and feed link belong to the [sample layout](https://github.com/drawmeanelephant/droidsblog/blob/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce/lab/layouts/main.html#L1-L13), not an automatic Boris social emitter. The [trunk layout](https://github.com/drawmeanelephant/droidsblog/blob/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce/lab/layouts/trunk.html#L1-L13) omits the site-title suffix. The print layout also has `{{head}}`, but was not selected in this sample build. The [profile](https://github.com/drawmeanelephant/droidsblog/blob/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce/boris.json#L1-L14) declares site title and public theme; it does not declare a site URL, description, or social image.

**Source:** [`renderPageSlots`](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/compile.zig#L982-L1002) currently composes only Standard.site verification links and Nostr alternates into `{{head}}`. A supplied sitemap URL does not make it emit a canonical link. The shared location audit already recognizes manually authored `og:url` and `twitter:url`; recognition is not generation ([contract](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/docs/contracts/html-output.md#L60-L86)).

### 2. “Seven keys” is the blog policy, not the current compiler grammar

**Non-issue / packet drift in the compiler premise.**

**Owner premise:** the sample's `AGENTS.md` permits exactly seven keys: `title`, `parent`, `tags`, `status`, `summary`, `published_at`, `relations`. Respect that narrower project rule.

**Source and executed:** both pinned and current Boris also accept `id` and `servings`. Current normative grammar lists **nine canonical fields**, with `serves` and `yield` as aliases of `servings` ([frontmatter contract](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/docs/contracts/frontmatter.md#L151-L189)). A synthetic page containing `id` and `servings` built successfully in both snapshots; `og_image` failed with `EFRONTMATTER` in current upstream ([probe receipts](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/probes.log), [pinned check](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/pinned-frontmatter.log)). This does **not** authorize adding those keys to the blog or editing its policy.

Recommendation: social overrides belong to closed publication configuration, not new frontmatter keys, nested YAML, or an assumed “extras” map. No frontmatter expansion is needed.

### 3. Strict compatibility requires a real choice

**Documented limitation, verified.**

Current Strict mode accepts `<meta name="twitter:card" content="summary">`, but rejects `<meta property="og:title" …>` with `EHTML4STRICT` because `property` is outside its HTML 4.01 attribute vocabulary ([checker](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/html4_strict.zig#L44-L56), [executed probes](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/probes.log)). A `name="og:title"` probe passes the checker; that only demonstrates syntactic acceptance, **not** a proper OGP substitute.

**Upstream documentation:** OGP specifies RDFa-style `property`/`content`, four required basic properties including an image, and image alt text ([immutable protocol source](https://github.com/facebook/open-graph-protocol/blob/718f79b0806ec0270d19d6943a01fa733fe9b898/content/index.markdown#L18-L48), [image properties](https://github.com/facebook/open-graph-protocol/blob/718f79b0806ec0270d19d6943a01fa733fe9b898/content/index.markdown#L87-L111)). Do not weaken Strict or promise crawler equivalence for the `name=` workaround.

Proposed policy: HTML5 gets actual OGP plus explicit Twitter cards; Strict gets canonical/description/Twitter using valid HTML 4 markup and a visible “OpenGraph omitted for Strict” warning. An explicitly required OGP configuration on Strict fails before publication. XHTML behavior must be specified and tested separately, not inferred from HTML5.

## What's improved

- The sample pin predates whole-document HTML 4.01 Strict support. [PR #1004](https://github.com/drawmeanelephant/boris/pull/1004) merged on **2026-09-27**; current upstream's maintained Strict fixture built successfully, including proof HTML ([receipt](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/strict-build.log)), while the pinned binary rejected the Strict profile ([receipt](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/pinned-strict.log)). [Commit `c3a736fb9c619e898140771f3f7bc3f8a0d73b4f`](https://github.com/drawmeanelephant/boris/commit/c3a736fb9c619e898140771f3f7bc3f8a0d73b4f) explicitly credits `factory-droid[bot]`.
- [PR #1013](https://github.com/drawmeanelephant/boris/pull/1013), merged **2026-10-01**, supplies the bounded build/watch/validate profile execution slice. This is useful configuration infrastructure, **not social metadata**. Multi-target sitemap/static/publication metadata and some editions remain explicit refusals ([current contract](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/docs/contracts/publication-profile.md#L164-L199)). [Commit `86f30c3ea962819347f14a8dc7943accedb27188`](https://github.com/drawmeanelephant/boris/commit/86f30c3ea962819347f14a8dc7943accedb27188) explicitly records Factory co-authorship.
- [PR #1014](https://github.com/drawmeanelephant/boris/pull/1014) completes the **editor application's** favicon/theme-color/noscript head. It does not change the generated-site head; no reopening or duplicate issue is warranted.

No improvement in sample social output was observed between the evidenced pin and current upstream.

## What's next

[design.md](design.md) proposes a compiler-owned, target-scoped head model: exact emitted-route canonical URLs; description from summary/site defaults; explicit local image ownership and alt; truthful website/article typing; independent social-title overrides; escaped attributes; draft suppression; and target-local cache/watch dependencies.

One **feature proposal**, not a bug claim, is drafted in [issue-drafts.md](issue-drafts.md). Duplicate checks covered **all 1,013 open and closed issue/PR records** returned by the repository API. No title/body matched `social[ -]card|open.?graph|twitter|social metadata|head metadata`; repository source searches found no standing social emitter/design. The four open records were #1007, #1002, #599, #454. **#1007** is adjacent but not duplicate: it proposes body/status/tag/parent theme hooks, not head cards. #1006/#1013 concern profile execution; #1010/#1014 concern the editor shell.

## Verification and gaps

**Executed, successful:** Zig 0.16.0 builds for both immutable compiler snapshots; sample validation and HTML+sitemap builds with both; upstream Strict fixture build; synthetic escaping/frontmatter/Strict probes; `zig build test-compile test-render` and a separate `zig build test-validation`.

The first combined gate had **956/956 Zig tests pass**, but its process validation failed because `/tmp` is a macOS symlink and the script's absolute output path hit `WorkspaceEscape`. Re-running from the physical `/private/tmp` path passed. Logs retain the failure and successful retry; this is not presented as an unexplained green run. Initial scratch probes also used an unsupported `--layout` flag; successful retained probes use `--html-layout`.

**Not verified:** real deployed site heads, Facebook/X/Slack/Discord crawler behavior, redirect handling at the live host, social image fetching, or an actual X card preview. No full release gate or universal DTD certification was run. Public X documentation was located via WebSearch, but full numeric platform constraints were not retrieved; the design's text bounds and recommended art size are **proposed Boris policy**, not certified X limits. The implementation must review current [X markup documentation](https://developer.x.com/en/docs/x-for-websites/cards/overview/markup) before locking platform-specific assertions.

This card ran in Factory, inheriting the coordinating session's model. Historical Factory attribution above rests on explicit commit credit, not branch names or task shape. The social design is **not shipped**.
