# Unposted issue draft

Coordinator disposition, 2026-10-01: after refreshing HEAD and open
state, candidate 1 was filed as
[#1015](https://github.com/drawmeanelephant/boris/issues/1015).
The research proposal below was unposted at worker completion.
Its exact posted body is in `../issues/boris-social-metadata.md`.
This is a feature proposal, not an implemented social-card surface.

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


## Candidate 1 — target-owned social metadata

**Target repository:** `drawmeanelephant/boris`

**Title:** `Proposal: compiler-owned canonical, OpenGraph and Twitter cards in {{head}}`

**Classification:** Documented limitation → owner-priority feature proposal. Not a regression or security defect.

**State:** Draft only; no GitHub write performed.

### Problem

The current compiler-owned `{{head}}` composes Standard.site and Nostr links, but not canonical, description, OpenGraph, or Twitter cards. Themes can hand-write static tags, yet cannot request a validated per-page social object using the existing closed slots. On an immutable droidsblog sample, both its pinned Boris and current upstream emitted no such metadata despite page summaries and a supplied sitemap URL.

### Evidence

- Upstream observed 2026-10-01: [`08969742f85238443ce5cd1cd53ceab1b1f3f85a`, head assembly](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/compile.zig#L982-L1002).
- Sample: [`3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce`, layout](https://github.com/drawmeanelephant/droidsblog/blob/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce/lab/layouts/main.html#L1-L13). CI pin is `5ef49ae2c7fcdc11cac907fecebf51ea8c3fd54b`.
- Retained [sample heads](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/generated-heads.txt): 23 content pages plus proof HTML in each build; no canonical/description/OG/Twitter head tags.
- [Strict checker](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/html4_strict.zig#L44-L56) and [probe results](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/probes.log): Twitter `name=` is accepted; OGP `property=` is rejected.

### Proposed scope

Implement the contract-first design in [design.md](design.md), retaining the existing frontmatter grammar. Add opt-in closed target configuration and exact-page overrides, one shared resolver/emitter for build and zero-write validate, and composition into `{{head}}`. First ship one hosted HTML5 target; subsequently extend target isolation/Strict behavior using the same model, without pretending current unsupported profile projections already work.

### Acceptance criteria

1. Enabling metadata with a validated public base emits one canonical URL equal to `og:url` and consistent with the existing RSS/sitemap emitted-route policy, including nested routes, Unicode path encoding, and project base paths.
2. Defaults and exact-id overrides for title, description, image+alt, type and Twitter card have documented precedence; arbitrary frontmatter/HTML injection remains rejected or escaped.
3. Local images resolve through declared theme/static/content-local inventories; missing assets fail preflight and preserve last-good output. Images are never selected from a favicon or arbitrary first body image.
4. HTML5 emits real `property=` OGP and explicit `name=` Twitter tags. Strict never receives invalid `property=` attributes: an explicit required-OGP request fails; optional OGP omission is visible. No `name="og:*"` compatibility claim.
5. Draft HTML remains emitted but receives no new social/canonical advertising metadata by default; drafts remain excluded from the existing advertised projections.
6. Multiple targets cannot borrow each other's base URL, image inventory, cache, or output profile. Relative/local builds retain old bytes when disabled and never invent absolute public URLs.
7. `{{head}}` omission/placement and conflicting hand-authored owned tags are diagnosed before publication; existing Standard.site/Nostr links survive.
8. Clean/incremental/parallel outputs agree; profile/default/image/status changes invalidate the necessary pages; validate/build share semantics; focused tests plus standing `zig build test` and release gate pass.
9. Contract/schema/changelog changes explicitly distinguish this new surface from the existing profile-execution limits; v1 configurations preserve their behavior.

### Explicit non-goals

No frontmatter expansion; no arbitrary metadata passthrough; no image generator or resizing service; no Node pipeline; no scraped descriptions; no inferred author identity; no live publishing or crawler certification; no cross-domain canonical aliases/pretty-URL router; no completion of the entire profile coordinator; no body-metadata theme-hook redesign.

### Duplication check

Observed 2026-10-01, all **1,013** open/closed issue and PR API records inspected for direct social terms; no direct social-card match. Source/contracts/plans were also searched.

- [#1007](https://github.com/drawmeanelephant/boris/issues/1007), **open**: status attributes/tag items/parent-title body hooks. Adjacent, not the same work.
- [#1010](https://github.com/drawmeanelephant/boris/issues/1010), **closed**, implemented by [#1014](https://github.com/drawmeanelephant/boris/pull/1014): editor shell favicon/theme-color/noscript. Not generated-site social metadata.
- [#1006](https://github.com/drawmeanelephant/boris/issues/1006), **closed**, and [#1013](https://github.com/drawmeanelephant/boris/pull/1013), **merged**: bounded HTML profile execution. Reuse that infrastructure; do not file another profile-coordinator issue under this card.
- [#1004](https://github.com/drawmeanelephant/boris/pull/1004), **merged**: Strict target. Keep its conformance boundary rather than reopening it as a social-card bug.
- [#881](https://github.com/drawmeanelephant/boris/issues/881), **closed**, implemented by [#1000](https://github.com/drawmeanelephant/boris/pull/1000): rendered-search title marker documentation. Social titles must not silently adopt that rendered-search-specific marker.

Coordinator follow-up: refresh duplicate/state checks immediately before any authorized filing. Discussion/private plans outside the fetched repository records were not visible.

## No other new issue recommended

The blog's seven-key policy is narrower than Boris's nine-field grammar. That is an evidenced policy/documentation clarification for its owner, not an excuse to modify the blog or open an unrelated Boris bug. Missing live crawler verification is a gap, not evidence of a failed card renderer.
