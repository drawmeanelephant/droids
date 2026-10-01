# Candidate follow-up (not filed)

Coordinator disposition, 2026-10-01: the research draft below was
unfiled at worker completion. After a fresh duplicate check, its scoped
bootstrap successor was filed as
[fart-app #58](https://github.com/drawmeanelephant/fart-app/issues/58).
The exact posted body is in `../issues/fart-app-bootstrap.md`.

## 1. Harden reference bootstrap identity, bounded fetch recovery and phase receipts

- **Target repository:** `drawmeanelephant/fart-app`.
- **Suggested title:** `ci: harden demo reference provisioning and distinguish bootstrap failures from demo evidence`
- **Problem:** A required demo gate can fail before running the demo when cache restore times out and the single clone fails transiently. Source identity is printed rather than enforced, and unconditional evidence upload can contain only historical checked-in demo receipts.
- **Evidence:** [PR #56 attempt 1](https://github.com/drawmeanelephant/fart-app/actions/runs/36856588659/job/110351731710): cache hit download stalls at 4,194,304/44,225,326 bytes; restore timeout; clone DNS failure/128; demo skipped; 26 evidence files uploaded. [Attempt 2](https://github.com/drawmeanelephant/fart-app/actions/runs/36856588659/job/110358988801) passes without a code change. [Current miss block](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L201-L231) lacks bounded retry/exact-SHA enforcement. [Current upload](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L236-L243); [tracked historical evidence](https://github.com/drawmeanelephant/fart-app/tree/cc2cd4a6b4f07d14f439004db981db7a1055f807/demo/evidence).
- **Proposed scope (recommendation only):** One small bootstrap/receipt change. Validate a nonempty resolved 40-hex reference SHA; fetch/check out that exact commit and verify it before use. Validate source/build identity on warm restores (recipe/platform identity or equivalent manifest); avoid stale-prefix restores. Apply a capped retry/backoff/time budget only to reference network provisioning; discard/recreate only task-owned partial checkout state between attempts. Do not retry compile/test/assertion failures. Record bootstrap phase, actual/expected SHA and failure reason; upload only this run's evidence plus provisioning log, never relabel historical fixtures. Consider a recipe/platform cache-key suffix to invalidate incompatible cached products; no observed ABI bug is claimed.
- **Acceptance criteria:**
  1. **Cold:** fresh isolated runtime and a never-used cache key; reference `5b5f266d49d836b5700c09bea149cc88c11bd4b7` and fart-app `cc2cd4a6b4f07d14f439004db981db7a1055f807` (or the eventual change's recorded SHA); build all reference products and refpeer; demo reaches decode, five play payloads/rest marker, silence rejection, payload determinism and DEMO PASS; actual source SHA equals key/manifest SHA; bounded within the existing 30-minute job budget.
  2. **Warm:** second clean job with the saved exact key restores and skips reference compile, validates SHA/manifest, then passes the identical assertions with run-specific evidence.
  3. **Restore unavailable + transient fetch:** injected first network failure, then success; bounded recovery reaches the real demo and records retry count. Test restore failure separately from a genuine absent key.
  4. **Persistent fetch outage:** retries exhaust predictably; required job stays red before demo; current-run artifact says provisioning failed and contains no apparent fresh DEMO PASS.
  5. **Identity mismatch:** expected SHA A with source/manifest B or upstream main moving to B after resolution fails before executing cached tools (or rebuilds verified A); never saves B under A's key.
  6. **Real demo failure:** injected failed assertion remains red; bootstrap retry policy does not mask it or rerun the demo until green.
- **Explicit non-goals:** no automatic issue posting, no change to audio/session/backpressure behavior, no reopening #28, no Windows work, no general dependency overhaul, no relaxing merge protection, no blanket retries or claims of historical runtime-flake causation.
- **Duplication check:** Read all open and closed issues on 2026-10-01. #27 is closed and establishes the demo gate; this hardens its remaining provisioning path rather than reimplementing the gate. #28 is closed and concerns runtime EndOfStream, not DNS/cache restoration. #25/#29/#31 are open but cover different work. Open [PR #57](https://github.com/drawmeanelephant/fart-app/pull/57) updates documentation checkboxes, not CI provisioning. No matching existing issue found. Recheck immediately before filing because state can change.

## Deliberately not proposed

- “Unblock PR #56”: already merged at 12:13:46 UTC.
- “Fix deterministic cold-cache C++ failure”: no compiler failure in the relevant failed log; current exact cold build remains unverified, not broken by inference.
- “Fix/reopen runtime flake #28”: duplicate historical investigation with no new reproduction.
- Separate cache-ABI or pkg-config issue: inspection identifies boundaries, not an observed CI break on the current runner.
