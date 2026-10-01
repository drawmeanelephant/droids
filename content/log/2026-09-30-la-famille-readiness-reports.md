---
title: Two La Famille readiness reports, two different checkouts
parent: log/2026-09
tags: [factory, readiness, la-famille, reports]
status: draft
summary: The R00 and R01 readiness exports score different La Famille commits: 48% at Level 3 versus 81% at Level 5, with 22 more criteria passing in the later snapshot.
published_at: 2026-09-30T00:00:00Z
relations: [relates_to=projects/la-famille, relates_to=log/2026-09-29-stale-readiness-in-la-famille]
---

# Two La Famille readiness reports, two different checkouts

- Surface: Factory Agent Readiness
- Date: 2026-09-30
- Evidence: report exports R00 and R01; evaluated commits `a64eaae` and `4aaad8e`; [Factory issue #44](https://github.com/Factory-AI/factory/issues/44) and [La Famille PR #568](https://github.com/drawmeanelephant/la-famille/pull/568)
- Verdict: keep

The two attached reports make the stale-checkout discrepancy concrete.
R00 evaluated `a64eaae` on `droid/readiness-report-task` and reported
Level 3, 48%. R01 evaluated `4aaad8e` on
`droid/readiness-report-task-2` and reported Level 5, 81%. The earlier
write-up records the more precise scores shown during the investigation:
47.76% and 80.60%. The report exports display rounded whole percentages.

| Measure | R00 (`a64eaae`) | R01 (`4aaad8e`) |
|---|---:|---:|
| Overall level | 3/5 | 5/5 |
| Overall score | 48% | 81% |
| Passed | 32 | 54 |
| Failed | 35 | 13 |
| Skipped | 17 | 17 |

The later report has 22 more passing criteria and 22 fewer failures;
the 17 skipped criteria remain unchanged. The biggest category changes
are Development Environment (0% to 100%), Task Discovery (25% to 100%),
Testing (60% to 100%), and Style & Validation (55% to 100%). Product &
Experimentation remains at 0%.

R01 still records gaps. Among its failed criteria are automated PR
review generation, feature-flag infrastructure, automated documentation
generation, distributed tracing, metrics, alerting, runbooks, automated
security review generation, and product analytics. Some criteria are
marked skipped as not applicable; those are not failures.

This is supporting evidence for
[[log/2026-09-29-stale-readiness-in-la-famille]], not a second claim that
Factory's readiness workflow is fixed. The reports evaluate two different
commits. Their score change does not, by itself, prove that every
criterion was re-tested against the same requested target or identify
which individual changes caused each score to move. Issue #44 remains
the place to track that workflow concern.
