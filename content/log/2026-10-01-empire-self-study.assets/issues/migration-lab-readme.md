## Problem

Three root README links escape the standalone repository. Its boundary
paragraph still describes the former `tools/`-resident migration lab,
misidentifying ownership of the root build.

## Evidence

Observed 2026-10-01 at `f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce`.

- [Broken standalone pointers](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/README.md#L1141-L1143).
- [Former-home boundary prose and links](https://github.com/drawmeanelephant/boris-migration-lab/blob/f40aa8a48f9c8e2cc85be01363c9f1005c0bd1ce/README.md#L1337-L1345).

The pinned tree has root `build.zig` and `docs/MIGRATION.md`, not the
former `tools/` parent. Elsewhere this README already uses Boris
`v0.8.2` links for product-owned contracts.

## Proposed scope

Correct only those three root README destinations and the short
ownership paragraph. Use local `docs/MIGRATION.md` for the lab and the
existing release-pinned Boris convention for product-owned contracts.
Distinguish this lab's build from the product compiler's build.

## Acceptance criteria

- All three links resolve against their declared pinned repositories.
- The README no longer places this repository under `tools/` or treats
  its root build as Boris's build.
- No product or converter files change.

## Not in scope

Grammar or migration behavior; new modes; source moves; pin upgrades;
a new link-checking framework.

## Duplicate check

Open #1/#8 and all 17 closed issue/PR records were checked. The importer
contract PRs #14–#17 do not own this standalone-pointer repair. A fresh
open-state check precedes filing.
