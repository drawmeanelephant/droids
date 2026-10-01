# M87 identity proof — follow-up disposition

**No new issue is warranted. No GitHub action was taken.**

Surveyed 2026-10-01: all-state listings of 955 issues and 902 PRs, with relevant M87/tape/identity/physical-host/remote-terminal matches inspected. The current owner is the open [M87d #1860](https://github.com/drawmeanelephant/VirelaiOS/issues/1860); its [PR #1864](https://github.com/drawmeanelephant/VirelaiOS/pull/1864) is draft and explicitly [re-blocked](https://github.com/drawmeanelephant/VirelaiOS/pull/1864#issuecomment-5930867617). Its declared scope already includes the wrapper/tape scripts, tests and `docs/testing.md`. [Project rules](https://github.com/drawmeanelephant/VirelaiOS/blob/fc21e5315d498a999974bc11da0ed2cd1dd39cbb/AGENTS.md#L85-L99) require fixups inside an existing card, not a second micro-issue.

## Existing-card amendment candidate — do not file as a new issue

**Target repository:** `drawmeanelephant/VirelaiOS`.

**Suggested amendment title:** M87d: separate physical-host evidence from software identity and bind the tape to a fresh run.

**Problem:** The draft tape compares untyped hashes of macOS `IOPlatformUUID` and Linux `/etc/machine-id`; inequality can give a class-C success for a container/VM on the same hardware. Same-namespace inequality is also insufficient. Current fixed receipt/PID-only assertions and stable digests should be tightened as part of the same evidence fix.

**Evidence:**

- [Pinned collector/predicate](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal-tape.sh#L39-L118).
- [Pinned fixed receipt/PID/final-verdict path](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal-tape.sh#L190-L229).
- [Physical-machine requirement](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/docs/testing.md#L61-L105).
- [Docker/Colima observation](https://github.com/drawmeanelephant/VirelaiOS/issues/1860#issuecomment-5930658762) and [owner's subsequent correction](https://github.com/drawmeanelephant/VirelaiOS/pull/1864#issuecomment-5930867617).
- [Existing negative test](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/tests/test_remote_terminal.py#L210-L243) covers same collector equality, not physical placement.

**Proposed scope:** Implement `design.md` inside #1860/#1864. Remove digest-inequality acceptance; separate behavior and separation verdicts; support owner-witnessed/admin-verified placement evidence with fresh run binding; make unknown/same-host placement non-success; add fresh receipt and generation-aware process continuity checks; export privacy-safe evidence; amend existing testing documentation. Keep the selected SSH/loopback/GOSH mechanism.

**Acceptance criteria:**

1. A container on the VM host and two guests on one physical host cannot produce accepted class C, even with distinct namespaces/IDs/IPs/host keys.
2. Unknown physical parents produce `INCONCLUSIVE` separation and nonzero class-C status; passing SSH/fixture behavior remains recorded as smoke evidence.
3. Owner-reviewed evidence maps both execution endpoints to different physical hosts and is bound to the exact run/challenge/source and fixture result. A plain `--different-machines` assertion is not enough.
4. A real, approved second-physical-host fixture verifies the existing guest/edit/history/cancel/file/ELF/disconnect/reconnect chain without reboot. Record trust route; no invented physical proof from the old Docker tape.
5. Same-namespace changed/cloned IDs, forged self-reported placement, stale/wrong-nonce/reused manifests, old receipt bytes and PID reuse have regression tests with explicit non-accepted outcomes.
6. Public output excludes stable hardware identifiers, unkeyed identity digests, addresses, account names, keys, private paths and unrelated session data. Private raw fixture capture remains owner-only.
7. `docs/testing.md` states acceptance, rejection, inconclusive/blocked results and trust limits. A/B tests and syntax pass; class-C evidence is reported separately. No new near-duplicate gate.

**Explicit non-goals:** SSH implementation/authentication changes; guest sshd or PTYs; opening sockets/services/firewalls; buying cloud instances; MDM/TPM deployment; automatic physical attestation; new boot defaults; changes to M87b/c; claims of resistance to a malicious OS/provider/owner; closing #1860 or #1856 without acceptance evidence.

**Duplication check:** Exact duplicate of the evidence portion of active #1860 and draft #1864, not a new independent workstream. #1856 is the parent index; closed #1858/#1859 are dependencies with different owned files. Recommend an existing-card fixup, not a posted issue or comment from this study.
