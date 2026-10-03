---
title: "Week one: more receipts, not a finished empire"
parent: log/2026-10
tags: [factory, week-one, empire, retrospective]
status: draft
summary: A first-week snapshot of Factory-assisted delivery across the project shelf, with merged work, corrected blockers, and unfinished acceptance kept separate.
published_at: 2026-10-03T19:56:54Z
relations: [relates_to=projects/virelai-os, relates_to=projects/boris, relates_to=projects/oliver, relates_to=projects/la-famille, relates_to=projects/rotkeeper, relates_to=projects/virelai-sans, relates_to=projects/filed-fyi, relates_to=projects/mac-apps]
---

# Week one: more receipts, not a finished empire

- Surface: Factory Droid sessions, local Git histories, and GitHub receipts across the project shelf
- Date: 2026-09-26 through 2026-10-03, Git snapshot at 19:56 UTC, with the later #1918 specification handoff below
- Evidence: [pinned Git inventory](2026-10-03-week-one-recap.assets/git-snapshot.json), the merged PRs below, and the earlier field notes
- Verdict: keep, draft until the owner approves the recap

My first week with Factory Droid is nearly over. The empire has not
graduated, but the fridge is running out of room for receipts.

These were mostly existing projects, not things invented from nothing
this week. VirelaiOS did not go from an empty directory to an operating
system in seven days. What this week added was a substantial stretch
of implementation, review, repairs, and acceptance across projects
that already had histories of their own.

The large specification job that was still running at the initial
checkpoint has now returned
[PR #1918](https://github.com/drawmeanelephant/VirelaiOS/pull/1918).
The drafting job is finished; its PR was still open when checked.
The next grounding and specification passes will expand the work,
not turn the draft roadmap into already-shipped implementation.

## A count, with the label still attached

The fresh local Git inventory found **227 non-merge commits with
Git-recognized `factory-droid[bot]` co-author trailers across 17 active
repositories**.
It inspected 18 distinct repository histories; one had no matching
commits. Duplicate checkouts count once.

The initial text search counted 229 markers. Two La Famille commits,
[`f65153b`](https://github.com/drawmeanelephant/la-famille/commit/f65153bc04706430669a8e28bb99499491b937fc)
and
[`3d336ba`](https://github.com/drawmeanelephant/la-famille/commit/3d336ba52ef61e218e6c5ef7f407b7af75f57b18),
contain literal `\n` text instead of the real newlines needed for a
co-author footer. They express attribution, but Git's trailer parser
does not recognize it. The narrower count excludes them; published
history was not rewritten.

That is a provenance sample, not an account-wide productivity score.
The filter starts at September 26 midnight, US Eastern time, uses
committer timestamps, and stops at each pinned fetched default-branch
revision. It misses work without the trailer, unmerged branches,
sessions that produced no commit, and repositories outside the local
sample. It does not measure hours, model shares, money, or how much
of each change was mine versus Droid's.

The bigger result is less numerical: several proposals became running
workloads, several measured bugs became regression tests, and some
“still blocked” notes acquired receipts that let them stop saying so.

## The OS deserves more than a footnote

[[projects/virelai-os]] was under-covered in the earlier
[[log/2026-09-28-factory-usage]] recap. This week's merged work includes
file-platform seams, notifications and keyboard behavior, clock and
idle work, terminal images, drawing primitives, and remote display.

The remote display story has a particularly useful endpoint.
[PR #1840](https://github.com/drawmeanelephant/VirelaiOS/pull/1840)
records native macOS Screen Sharing completing the authenticated host
bridge and capturing a real 2560×1440 guest scanout. That is stronger
than a codec test or a picture of a host-rendered terminal. The bridge
is local and the guest RFB path is hermetic; this is not a claim of
an internet-ready remote desktop.

The bounded native Zig portfolio also finished its approved program.
[Umbrella #1880](https://github.com/drawmeanelephant/VirelaiOS/issues/1880)
is closed, and
[PR #1913](https://github.com/drawmeanelephant/VirelaiOS/pull/1913)
reconciles its 15 child cards and remaining limits. The result includes
the pinned SDK, standard streams and filesystem contracts, Oliver and
k4o workloads, the actual Fart synthesizer, bounded threads, preview
sockets/DNS, continuous bounded PCM, and finally
[serial-offline Boris](https://github.com/drawmeanelephant/VirelaiOS/pull/1911).

Those last words matter. This is native Zig EL0 work on a from-scratch
OS hosted by Apple's Virtualization.framework, not a Linux guest,
POSIX compatibility layer, full Zig self-host, or hosted Boris port.
The Go desktop remains the boot default.

The separate remote-terminal acceptance changed too.
[PR #1912](https://github.com/drawmeanelephant/VirelaiOS/pull/1912)
records independently supplied October 2 evidence from physically
separate DGX and HP connecting machines. Remote card
[#1860](https://github.com/drawmeanelephant/VirelaiOS/issues/1860)
is now closed. Human desktop-launcher acceptance
[#1857](https://github.com/drawmeanelephant/VirelaiOS/issues/1857)
is still open, so the combined M87 index is not finished.

The October 1 report card remains an October 1 snapshot. Its remote
and portfolio blockers should not be copied into a current recap.
Nor should today's acceptance be projected backward into that audit.

## The publishing shelf became more of a platform

[[projects/la-famille]] had more than a readiness nit this week.
Its bounded [Vault Mode acceptance](https://github.com/drawmeanelephant/la-famille/pull/611)
and [Change Ledger implementation closure](https://github.com/drawmeanelephant/la-famille/pull/616)
landed. Vault subset selection is per-note `publish: false`, not
promised directory-pattern exclusion. The ledger remains advisory,
with observation and an owner enforcement decision tracked separately.

Corpus Packs progressed through
[build/verify](https://github.com/drawmeanelephant/la-famille/pull/612),
[local diff/apply](https://github.com/drawmeanelephant/la-famille/pull/618),
[pack-backed Ask](https://github.com/drawmeanelephant/la-famille/pull/621),
[local-feed pull](https://github.com/drawmeanelephant/la-famille/pull/625),
and [secure HTTPS feeds and durable watch](https://github.com/drawmeanelephant/la-famille/pull/627).
Those are separate reviewable deliverables, not one optimistic checkbox.
The parent and final acceptance follow-up remained open when checked;
git-ref sources are explicitly deferred.

The measured strict-abstention regression was repaired in
[#604](https://github.com/drawmeanelephant/la-famille/pull/604).
The [real-model retrieval and cache-timing measurement](https://github.com/drawmeanelephant/la-famille/issues/602)
is still open. A working fake-provider test does not answer that
empirical question.

On the compiler side, [[builds/boris-html4-strict]] already has a proper
finished-delegation write-up. The later work deserves its own space:
Oliver's [Cooklang round-trip fixes](https://github.com/drawmeanelephant/oliver/pull/137),
k4o's output-boundary and list repairs, and now its
[teaching lint](https://github.com/drawmeanelephant/k4o/pull/30),
[non-overwriting scaffolder](https://github.com/drawmeanelephant/k4o/pull/31),
and [standing Markdown differential gate](https://github.com/drawmeanelephant/k4o/pull/32).

[2nap #1](https://github.com/drawmeanelephant/2nap/pull/1) reports
2,703 differential cases with zero divergences on Linux and macOS CI.
That is scoped parity with its pinned oracle, not universal template
compatibility. k4o likewise keeps its documented incompatibilities
instead of hiding them under a large passing number.

Boris's [compiler-owned social metadata](https://github.com/drawmeanelephant/boris/pull/1018)
also landed on October 3. Its separate
[NIP-42 acceptance fixes](https://github.com/drawmeanelephant/boris/pull/1017)
are actual merged code and regression tests, not merely a review
report. The [parent #1002](https://github.com/drawmeanelephant/boris/issues/1002)
still remains open; the scoped local proof is not a public-relay
interoperability or release claim.

## Infrastructure, help, and the smaller shelves

One shared tool had a wider reach than its own repository:
[zig-zouave #1](https://github.com/drawmeanelephant/zig-zouave/pull/1)
introduced a shell-based Zig installer, followed by the 15 consumer
adoptions listed in [[log/2026-09-30-node-free-zig-ci]].
The installer is node-free; its optional GitHub cache action is not.
The download check uses the official HTTPS index's SHA-256, not a
minisign verification.

[[projects/rotkeeper]] now has a completed help rebuild rather than
the old “Ubuntu identity failure, still waiting” picture. The matrix
repair merged, and
[#351](https://github.com/drawmeanelephant/rotkeeper/pull/351)
finished the remaining site-gate and Actions-only guidance checks.
Its acceptance records 87 Help/Docs pages, all 14 theme accessibility
audits passing, and 8,596 local references without a failure.
[#334](https://github.com/drawmeanelephant/rotkeeper/issues/334)
is closed. Relocated-checkout and Oliver-install recovery repairs
also landed along the way.

The rest of the shelf should not disappear merely because an OS is
louder:

- Filed & Forgotten's homepage and accessibility work has
  [#580](https://github.com/drawmeanelephant/filed.fyi/pull/580),
  while the archive cross-linking story is already introduced in the
  September usage recap.
- Fart-app gained demo/required-check work, provisioning repairs, and
  a [field manual](https://github.com/drawmeanelephant/fart-app/pull/62).
  NINJAM gained client/protocol work and
  [build docs](https://github.com/drawmeanelephant/ninjam/pull/39) plus
  [third-party notices](https://github.com/drawmeanelephant/ninjam/pull/40).
  Neither sentence claims a public release or a live jam on every device.
- [[projects/virelai-sans]] gained measured glyph repairs and a
  [separate nine-mascot font](https://github.com/drawmeanelephant/virelai-sans/pull/36).
  The pinned web specimen is deliberately unchanged; source-font
  improvements are not automatically website improvements.
- Solipsist's [Compose and subprocess safety pass](https://github.com/drawmeanelephant/solipsist/pull/307)
  landed, with four more specific correctness cards still open.
  Muse gained illustrated posts, TED gained contribution/review
  scaffolding, and the migration lab got repaired README pointers.

## Late-week coda: the next OS work has a handoff

[PR #1918](https://github.com/drawmeanelephant/VirelaiOS/pull/1918)
adds 15 card drafts and a summary for four next arcs: bounded QuickJS,
a scoped PDF subset, SVG rendering, and local desktop readiness.
It preserves the existing human desktop-acceptance card instead of
duplicating it or substituting automation for a person's journey.

The handoff proposes a 40-hour first workweek, mostly design gates,
with explicit implementation deferrals. Its initial full card shapes
estimate 160–212 agent hours plus human acceptance. Those are planning
estimates, not observed performance, actual time spent this week,
or evidence that an engine port is feasible.

This is a completed documentation delegation awaiting review, not
delivered JS/PDF/SVG support. Further grounding must settle the engine
and platform boundaries before implementation. The pinned merged-history
count above intentionally does not include this open PR.

## The friction belongs in the recap too

This blog itself is a week-one deliverable: a Boris-built field-notes
site, its Manila theme, project hubs, a finished build write-up, and
a place for the nits to survive the next successful run.

The empty-repository Droid-Shield problem and stale worktree readiness
report earned [[nits/droid-shield-unborn-branch]] and
[[nits/stale-readiness-worktree]]. They are documented observations
from this week, not fresh October 3 retests of Factory's current state.

The earlier usage screenshot also lacked a per-model breakdown.
This review took no new account-usage reading. Session model labels
and co-author trailers do not turn into a trustworthy cost comparison.
The portfolio study's workers inherited Sol, so that study is not
evidence for the proposed cheaper Luna/Sol split either.

The practical lesson is the one in
[[log/2026-10-01-empire-self-study]]: a bounded ask, a returned receipt,
and a review before the gold star. “Already fixed,” “no new issue
needed,” and “implementation landed, acceptance pending” were useful
answers, not disappointing ones.

This recap review refreshed histories and checked linked PR and
tracker evidence. It did not rerun every project's tests, the OS gate
fleet, public deployments, or physical-machine acceptance. The cited
results belong to their original runs and testers.

The spec job now has its outcome and receipt; the owner's voice pass
and publication decision are still ahead. For now: a lot landed,
the next work has a reviewable shape, and the unfinished bits still
get their own lines.
