## Where we are

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Boris already gives this little blog a proper hat: a title, stylesheets, favicon, and RSS link. What it does not yet give it is a calling card. Rebuilding the same sample with its pinned compiler and today's upstream produced the same homepage and Boris-page bytes, and neither build emitted a description, canonical link, OpenGraph tag, or Twitter card. The summaries are there in the source; they simply have no head projection yet. ([Generated heads](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/generated-heads.txt), [sample summary](https://github.com/drawmeanelephant/droidsblog/blob/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce/content/projects/boris.md#L1-L8), [current head assembly](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/compile.zig#L982-L1002).)

## What's improved

There is a nicer foundation to work from. The whole-site HTML 4.01 Strict profile landed, and the maintained Strict specimen actually built in this study. Profile-driven HTML build/watch/validate also landed, with its remaining limits spelled out rather than wished away. Both implementation commits explicitly credit Factory Droid. That's real work worth crediting—not evidence that Factory has already shipped the social cards. ([Strict receipt](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/strict-build.log), [Strict commit](https://github.com/drawmeanelephant/boris/commit/c3a736fb9c619e898140771f3f7bc3f8a0d73b4f), [profile commit](https://github.com/drawmeanelephant/boris/commit/86f30c3ea962819347f14a8dc7943accedb27188), [profile limits](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/docs/contracts/publication-profile.md#L186-L199).)

## What's next

My proposed next delegation is deliberately boring: one compiler-owned head fragment, a canonical URL from the route Boris really writes, a description from the page summary, and an explicitly chosen image with honest alt text. No surprise YAML keys; no grabbing the favicon and calling it cover art. Strict gets valid Twitter metadata, not OpenGraph attributes smuggled past its checker. Those are design choices, not shipped behavior. ([Proposed design](design.md), [Strict probes](../../../../SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/probes.log), [OGP's actual syntax](https://github.com/facebook/open-graph-protocol/blob/718f79b0806ec0270d19d6943a01fa733fe9b898/content/index.markdown#L18-L48).)

Factory helped with this investigation too, but the deliverable is still a plan. The affectionate bit is that Boris already has a useful `{{head}}` seam; the unsentimental bit is that a seam is not a feature. ([Research scope and receipts](report.md), [slot contract](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/docs/contracts/templating-and-themes.md#L95-L122).)
