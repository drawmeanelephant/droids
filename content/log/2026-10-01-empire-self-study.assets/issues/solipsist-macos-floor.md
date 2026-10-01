## Problem

The root README says macOS 26+, but the shipped app's deployment target
is macOS 27.0. The separate harness/test targets still support 26.
Users receive an unsupported app install/build expectation.

## Evidence

Observed 2026-10-01 at `53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc`.

- [README prerequisites](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/README.md#L41-L46).
- [App deployment target](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/Project.yml#L6-L19).
- [Harness/test targets](https://github.com/drawmeanelephant/solipsist/blob/53f1e3e448fa509a3eaaf9e7f3905f0d387b23cc/Project.yml#L81-L110).
- [Merged M18, #294](https://github.com/drawmeanelephant/solipsist/pull/294).

## Proposed scope

README-only correction: app macOS 27+, with a distinct macOS 26
harness/test note. Keep the requirements target-specific.

## Acceptance criteria

- App and harness/test requirements agree with `Project.yml`.
- The README neither promises app support on 26 nor implies every
  target requires 27.
- No deployment target, entitlement, signing, or product changes.

## Not in scope

Backporting Siri/FoundationModels; notarization; changing Xcode support
without evidence; app UI; engine work; general roadmap synchronization.

## Duplicate check

All 302 closed issue/PR records were checked, including related docs
PRs #290/#295. No open work or dedicated successor covers the remaining
root prerequisite mismatch. Open state is refreshed before filing.
