## Problem

The required demo gate can fail before compilation or the demo when a
cache restore times out and its single fallback clone fails transiently.
Reference identity is printed rather than enforced, and unconditional
artifact upload can collect checked-in historical demo evidence.

PR #56 is already merged. This is provisioning hardening, not a claim
that the current demo or a cold-cache compilation is broken.

## Evidence

Observed 2026-10-01 at fart-app
`cc2cd4a6b4f07d14f439004db981db7a1055f807`.

- [Attempt 1](https://github.com/drawmeanelephant/fart-app/actions/runs/36856588659/job/110351731710):
  cache restore timeout, fallback clone DNS failure, demo skipped,
  evidence uploaded.
- [Same-head retry](https://github.com/drawmeanelephant/fart-app/actions/runs/36856588659/job/110358988801):
  demo passed without a workflow change.
- [Current bootstrap](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L179-L231)
  and [upload](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L236-L243).

## Proposed scope

Keep one bounded reference-provisioning path:

1. Resolve and validate a nonempty reference SHA; fetch/check out that
   exact commit and enforce actual/expected identity before use.
2. Validate warm-cache source/build identity with an appropriate manifest
   or equivalent; do not save another revision under the resolved key.
3. Add capped retry/backoff within the existing job budget for transient
   network provisioning only. Recreate only task-owned partial state.
4. Upload current-run phase/identity/failure receipts, clearly separate
   from historical fixtures. Never present an old DEMO PASS as this run's
   result.

No cache ABI or branch-race failure was reproduced by the study; the
identity checks are proposed safeguards, not claims of such incidents.

## Acceptance criteria

- A genuine cold cache builds the recorded reference revision and reaches
  the existing demo assertions.
- A clean warm job verifies identity, skips reference compilation, and
  passes the same assertions with current-run evidence.
- Restore failure and a genuinely absent key are tested separately.
  A first transient fetch failure recovers within a fixed retry/time cap.
- Persistent outage remains red before the demo, with an unambiguous
  provisioning-failed artifact and no apparent fresh DEMO PASS.
- An identity mismatch is rejected or rebuilt at the expected revision
  before cached tools execute.
- An injected compile or demo assertion failure stays red; the network
  retry policy does not retry it until green.

## Not in scope

Audio/session/backpressure changes; reopening runtime flake #28;
Windows support; weakening merge protection; general dependency
maintenance; blanket retries; automatic issue posting.

## Existing work and duplicate check

[#27](https://github.com/drawmeanelephant/fart-app/issues/27) established
the gate; [#28](https://github.com/drawmeanelephant/fart-app/issues/28)
covered runtime EndOfStream. Both are closed and concern different work.
The study read all issue records and rechecked open issues immediately
before filing. #25, #29, and #31 do not provide a dedicated provisioning
hardening task.
