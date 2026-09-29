---
title: La Famille
parent: projects/index
tags: [project, go, static-site-generator, readiness]
status: published
summary: A Go static-site generator whose release-readiness milestone is the next test target for Factory's stale-worktree readiness reports.
published_at: 2026-09-29T03:51:57Z
---

# La Famille

A Go static-site generator with a CLI, an interactive terminal UI, and
local RAG and site-question-answering tools. Its recent repository
readiness pass added ownership and contribution files, local hooks,
test and build checks, and CI guardrails.

Receipts: [La Famille on GitHub](https://github.com/drawmeanelephant/la-famille)
and the merged [readiness workflow PR #568](https://github.com/drawmeanelephant/la-famille/pull/568).

The next test is to use a La Famille milestone as a real target for
readiness reporting and verify that the report identifies the commit
it evaluated and catches a stale worktree. That test is planned, not
yet run. The related [Factory issue #44](https://github.com/Factory-AI/factory/issues/44)
records the original stale-worktree result.
