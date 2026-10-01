## Problem

The root README's `../../README.md` generator link escapes this site's
repository. Clicking “la-famille” does not reach its generator docs.

## Evidence

Observed 2026-10-01 at `888f502588a12624d90b9be1f7df0c7cd7b397a3`.
[Broken link](https://github.com/drawmeanelephant/z.filed.fyi/blob/888f502588a12624d90b9be1f7df0c7cd7b397a3/README.md#L3-L5).
The same README later gives the actual generator repository,
`https://github.com/drawmeanelephant/la-famille`.

## Proposed scope

One README link-target correction to the actual generator repository
or a deliberately selected release-pinned README.

## Acceptance criteria

- Clicking “la-famille” reaches the generator source/documentation.
- The link no longer points outside this site's repository tree.
- No site content, build configuration, or dependency changes.

## Not in scope

Rebuilding; updating Z.ai facts; generator version changes; freshness
automation; broad link-audit infrastructure.

## Duplicate check

All four closed issue/PR records were checked. Closed freshness #1 and
search/cache PRs #3/#4 are unrelated. No open successor was found;
open state is refreshed before filing.
