# Card 2 — VirelaiOS M87 tape identity proof

**Explore-only; no implementation or GitHub writes.** Observed 2026-10-01, between 12:39 and 12:55 UTC. Target: `drawmeanelephant/VirelaiOS`. The assignment is the evidence predicate, **not SSH**.

## Where we are

**The holdup is still current, but its history matters.** M87d [#1860](https://github.com/drawmeanelephant/VirelaiOS/issues/1860) remains open; [PR #1864](https://github.com/drawmeanelephant/VirelaiOS/pull/1864) is open and draft, at `aa5e79c9f46dc693a226a4626012e6b0f15cfa17`. The PR briefly presented a Docker/Colima connecting environment as passing class C. At 11:59:21 UTC, the owner explicitly [re-blocked that acceptance](https://github.com/drawmeanelephant/VirelaiOS/pull/1864#issuecomment-5930867617): it was not evidence of separate physical machines, and no code change accompanied the correction.

The proposed tape still compares a Linux installation ID with a macOS platform UUID and turns inequality into “distinct machines.” The PR's `docs/testing.md` expressly requires another **physical** machine. The mismatch is therefore verified by source, not merely an unavailable second-machine test.

## What's improved

The preceding M87 survey recorded an existing authenticated bridge but no human client and periodic diagnostic contamination of the serial prompt ([index #1856](https://github.com/drawmeanelephant/VirelaiOS/issues/1856), baseline `9592bd319698fb4abc667a615b335f4fc297587d`). M87b [#1858](https://github.com/drawmeanelephant/VirelaiOS/issues/1858) and M87c [#1859](https://github.com/drawmeanelephant/VirelaiOS/issues/1859) are now closed, with merged [PR #1862](https://github.com/drawmeanelephant/VirelaiOS/pull/1862) and [PR #1863](https://github.com/drawmeanelephant/VirelaiOS/pull/1863).

Those changes are present in pinned main: the [human byte-relay client](https://github.com/drawmeanelephant/VirelaiOS/blob/fc21e5315d498a999974bc11da0ed2cd1dd39cbb/tools/console-client/client.py#L165-L210) and [ownership-sensitive idle-report sink](https://github.com/drawmeanelephant/VirelaiOS/blob/fc21e5315d498a999974bc11da0ed2cd1dd39cbb/kernel/src/shell.zig#L3716-L3794). The M87d wrapper/tape and expanded integration spec are **proposed in the draft PR**, not merged main. Its claimed A/B and Docker SSH results remain useful, bounded evidence; the Docker result must not be promoted to physical separation.

The 11:59 correction improved the recorded verdict, **not the tape implementation**. This study independently ran the five existing wrapper tests successfully, without a VM or SSH target. That success does not close the identity-proof gap.

## What's next

Fix the predicate inside the existing M87d card/PR: separate fixture behavior from physical-host separation, require owner-reviewed external placement evidence, bind it to a fresh run, and return **inconclusive** rather than class-C success when only software identities are available. Keep the working SSH mechanism. See `design.md` for a concrete correction and an exact, design-only `docs/testing.md` replacement.

**New issues warranted: none.** The identity fix, test extensions, documentation and real second-machine run all fall inside #1860's existing `Touches` and acceptance bar.

## Scope, snapshots and evidence labels

- Read the parent study contract first and both snapshots' root `AGENTS.md`; there were no nested instruction files.
- Owner checkout `/Users/tbuddy/t3/zig/DipshitOS` was not read, fetched, built, switched, cleaned or otherwise touched.
- Fresh tarball snapshots came from authenticated, read-only `gh api` calls:
  - Main: `fc21e5315d498a999974bc11da0ed2cd1dd39cbb`, [commit](https://github.com/drawmeanelephant/VirelaiOS/commit/fc21e5315d498a999974bc11da0ed2cd1dd39cbb), at `/tmp/virelai-identity-study.VQhyis/source`.
  - Draft PR head: `aa5e79c9f46dc693a226a4626012e6b0f15cfa17`, [commit](https://github.com/drawmeanelephant/VirelaiOS/commit/aa5e79c9f46dc693a226a4626012e6b0f15cfa17), at `/tmp/virelai-identity-study.VQhyis/pr-source`.
- API records and executed-check output are at `/tmp/virelai-identity-study.VQhyis/records`. These are temporary research inputs, not project artifacts or publication evidence.
- **Source inspection** establishes what the pinned code checks.
- **Executed checks** below establish only local stand-in tests and syntax.
- **Recorded observations** in issue/PR comments are the owner's reports; their gitignored hardware transcripts were not supplied to this study.
- **Upstream documentation** establishes identifier semantics and provider promises, not actual placement of any machine used here.
- **Recommendations** are unimplemented. No hardware, cloud, SSH or attestation run was performed.

### Source receipts

1. Existing acceptance/ownership: [#1860](https://github.com/drawmeanelephant/VirelaiOS/issues/1860), including the [04:03 implementation/blocker report](https://github.com/drawmeanelephant/VirelaiOS/issues/1860#issuecomment-5924491360).
2. Docker result: [11:47 issue comment](https://github.com/drawmeanelephant/VirelaiOS/issues/1860#issuecomment-5930658762); subsequent controlling correction: [11:59 PR comment](https://github.com/drawmeanelephant/VirelaiOS/pull/1864#issuecomment-5930867617).
3. Current draft identity collector and inequality test: [tape lines 39–118](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal-tape.sh#L39-L118).
4. Current draft output and continuity assertions: [tape lines 126–145](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal-tape.sh#L126-L145), [190–229](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal-tape.sh#L190-L229).
5. Draft hardware requirement and current wording: [testing lines 61–105](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/docs/testing.md#L61-L105). Main's [testing evidence/classes policy](https://github.com/drawmeanelephant/VirelaiOS/blob/fc21e5315d498a999974bc11da0ed2cd1dd39cbb/docs/testing.md#L10-L35) does not yet contain this M87 section.
6. Existing negative test: [test lines 210–243](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/tests/test_remote_terminal.py#L210-L243). Draft continuity metadata: [wrapper lines 229–238](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal.sh#L229-L238).
7. Draft class-B behavior checks: [existing spec extension](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/gate/specs/live-remote-console.spec#L273-L305).
8. M87b [recorded test/blocked-live-smoke evidence](https://github.com/drawmeanelephant/VirelaiOS/issues/1858#issuecomment-5923591091); M87c [recorded implementation and verification](https://github.com/drawmeanelephant/VirelaiOS/issues/1859#issuecomment-5924011696).

## Findings

### 1. The current success predicate cannot prove physical separation

**High confidence; source inspection plus a recorded counterexample.** The local collector hashes `IOPlatformUUID` on Darwin, but hashes `/etc/machine-id` otherwise. The host probe returns the same untyped `machine` field. Only digest equality blocks the alleged same-machine case; inequality reaches a final “PASS class C: distinct machines” message (receipts 3–4).

`/etc/machine-id` is an installation/boot identifier that can be configured, generated randomly, supplied by a container/VM, and retained even when hardware is replaced. Its [authoritative manual](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html) expressly documents these properties. Comparing it with a platform UUID says nothing about the container's physical parent. The owner's Docker report and subsequent rejection demonstrate this exact category error (receipt 2).

**A same-namespace fix alone is insufficient.** Two Linux installations, two macOS guests or two deliberately changed IDs can have different same-namespace identifiers on one physical machine. Apple describes [`VZGenericMachineIdentifier`](https://developer.apple.com/documentation/virtualization/vzgenericmachineidentifier) as a VM identifier that can be saved and restored, not a hardware certificate. Likewise, equal installation identifiers on two real hosts can result from image cloning; equality should conservatively invalidate that evidence, not claim a universal physical fact.

Neither IPs, hostnames, SSH host keys, MAC addresses, installation IDs, UUID hashes nor cloud instance IDs establish distinct physical hardware. Endpoint authentication and physical placement are separate propositions.

**Correction:** keep optional namespace-tagged IDs as diagnostic consistency signals only. The acceptance decision needs an independently reviewed mapping from both execution endpoints to different physical hosts. Witnessed owner hardware is the simplest route; provider placement is an explicitly different trust route.

### 2. Current automated coverage misses the property at issue

**High confidence; source inspection and executed checks.** The existing negative test supplies the *same collector result* through fake SSH and checks that equality is blocked (receipt 6). It does not cover a container on the host, different namespaces, two guests on one host, changed/cloned IDs, unknown placement or reused evidence.

The five wrapper tests passed in this study. This is not a contradiction: they verify the contracts they contain, not the stronger physical-machine promise. Add placement/verdict and replay regressions to this same test file, with explicit expected verdicts; do not add another gate or micro-issue.

### 3. Fixture freshness and process continuity need honest bounds

**Design hardening inside #1860, not a demonstrated restart/replay exploit.** The tape uses a fixed `remote-owner-ok` receipt and compares service/runner PID pairs before and after reconnect. The wrapper's session metadata contains only share, port and the two PIDs (receipts 4 and 6).

Fixed fixture output is reusable; `kill(pid, 0)` and unchanged PID numbers are not generation-aware process identities. These observations do **not** prove that the reported smoke replayed output or restarted the VM. They identify the bounds of its assertions.

Use a fresh run challenge in command output and guest-written receipt bytes, verify the receipt was absent beforehand, and bind preflight/reconnect reports to process start tokens plus service-owned session generation. These strengthen accidental reuse detection under an honest host OS; they still cannot defeat a malicious host forging the entire session.

### 4. “Digested” does not mean non-linkable or guaranteed public-safe

**Source observation plus upstream privacy guidance.** The current collector uses plain SHA-256 of stable values; those digests remain linkable across tapes. systemd instructs applications to treat machine IDs as confidential and use an application-specific keyed hash rather than expose the raw ID (upstream manual).

The tape's address summary avoids raw addresses, but its transcript merges SSH stderr into stdout (receipt 4); transport messages or an unexpected prompt can carry a target name, user or path. No leak in the reported private transcript was established here.

Default to role labels `client-A` and `vm-host-B`, placement relation/verdict, fixture assertions and artifact hashes. Keep raw transport captures private; publish only an allowlisted fixture extract and an owner-reviewed separation summary. Stable identifiers and personal infrastructure details are unnecessary for the public claim.

## Honest proof options

| Evidence | What can honestly be concluded | Trust/limit |
|---|---|---|
| Different guest/installation IDs | Different reported guest identities | Guest/admin can change, clone or spoof them; physical placement unknown. |
| Two simultaneously running VMs | Two VM executions, if separately observed | Both may share one host. Does not satisfy physical separation. |
| Two hypervisor/OS hosts | Two reported host environments | Nested virtualization still requires mapping to the ultimate physical parents. |
| Owner observes two physical devices and binds their live consoles/processes to the fixture | Separate physical machines, accepted under an explicit owner-witness trust model | Not cryptographic resistance to a dishonest owner, compromised OS or hidden relay. No public serial numbers needed. |
| Trusted infrastructure admin maps both endpoints through every virtualization layer to different physical hosts | Admin-verified physical placement | Trust that admin, mapping source and freshness; self-reported guest topology is insufficient. |
| Verified hardware-backed attestation of distinct certified devices, fresh and endpoint-bound | Distinct attested devices under issuer/platform trust | Two keys alone are insufficient; relay/session binding and actual verifier support remain necessary. Not implemented here. |
| Authenticated cloud control-plane placement plus a documented separation guarantee | **Provider-assured** physical separation | Trust provider and current instance-to-host mapping; not independently measured hardware. Two instance IDs alone prove neither placement nor separation. |

Concrete authoritative examples:

- Apple [Managed Device Attestation](https://support.apple.com/guide/deployment/dep28afbde6a/web) covers Apple-silicon Macs, hardware-bound keys, device properties and freshness. Its device-information attestations may be cached, fresh requests are rate-limited, and User Enrollment omits serial/UDID. Therefore a pair of arbitrary Secure Enclave keys or anonymous attestations is **not** automatically a distinct-device proof. This study did not provision MDM, attest or establish a tape-to-attestation channel binding.
- Microsoft [Trusted Launch](https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch#vtpm) explicitly gives each VM its own **virtual** TPM. Guest attestation/boot integrity is not a physical-host separation oracle.
- AWS [spread placement](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html#placement-groups-spread) promises distinct hardware for instances **within the same spread group**; separate spread groups do not guarantee separation between groups. Partition groups separate racks between partitions, not necessarily between two instances in one partition. Cluster groups target proximity, not separation.
- AWS [Dedicated Hosts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html) are physical servers with placement control; “dedicated instances” alone do not identify separate servers. Two authenticated, distinct host allocations and current endpoint mappings support a provider-assured verdict. Dedicated Hosts cannot be launched into placement groups.
- AWS [Mac instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-mac-instances.html#mac-instance-considerations) are bare-metal, one Mac instance per Dedicated Host, with a 24-hour minimum allocation. This is an illustrative proof route, **not** a recommendation to buy hardware or a verified VirelaiOS host: available macOS 27 images, VZ/runner capability, region/quota and actual placement were not checked.

## Verification performed

Commands ran only in temporary snapshots/stand-ins:

```sh
cd /tmp/virelai-identity-study.VQhyis/pr-source
/opt/homebrew/bin/bash tools/env-check.sh
PYTHONDONTWRITEBYTECODE=1 PATH="/opt/homebrew/bin:$PATH" \
  python3 -m unittest discover -s tools/tests -p test_remote_terminal.py -v
/opt/homebrew/bin/bash -n tools/remote-terminal.sh tools/remote-terminal-tape.sh
```

Results: **5 tests, 20.224 seconds, OK**; both shell syntax checks passed; extracted tape Python and identity probe parsed successfully with `ast.parse`. Tests created isolated fake home/repo/build/runner state, not a real VZ guest or SSH connection. Bytecode writes were disabled.

A separate non-sensitive logical counterexample computed hashes of fixture strings representing a container installation ID and host platform UUID: the current inequality predicate returned `True` although the stipulated physical-host count was one. This illustrates the predicate; it is **not** an executed physical-machine tape.

Duplicate survey: authenticated `gh issue list --state all --limit 2000` returned 955 issues; corresponding PR list returned 902 PRs. Open and closed titles were searched for M87, identity, physical/two-host/another-machine and tape/remote-terminal concerns. #1860 and #1864 already own the finding; #1856 is their index. The relevant bodies/comments were then read. No second identity-proof card was found, and none is needed.

## Remaining gaps and disposition

- **Current premise:** re-blocked, not fixed; no accepted separate-physical-machine record found in the inspected issue/PR discussion.
- No second physical device, authorized SSH target, owner witness/placement mapping, raw hardware transcript, provider control-plane evidence or hardware attestation was supplied.
- The study did not run class B/C, modify the projects, post/close issues, review unrelated SSH implementation, or infer that unavailable verification failed.
- The study did not verify the claimed historical gate totals against private artifacts.
- Records name agents, including a Sol claim/implementation statement on #1859, but do not establish Factory model-routing decisions or a Luna/Sol portfolio allocation. No routing credit is inferred.
- No new issue draft should be filed. Apply the design as a fixup to the active #1860 / draft #1864 work, then arrange owner-approved physical evidence. Neither recommendation nor this successful local test run changes project acceptance.
