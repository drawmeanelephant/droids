# Design only — a physical-host evidence contract for M87

**Not implemented.** No VirelaiOS files were changed. Designed against main `fc21e5315d498a999974bc11da0ed2cd1dd39cbb` and draft [PR #1864](https://github.com/drawmeanelephant/VirelaiOS/pull/1864) head `aa5e79c9f46dc693a226a4626012e6b0f15cfa17`, inspected 2026-10-01. Ownership remains [M87d #1860](https://github.com/drawmeanelephant/VirelaiOS/issues/1860).

## 1. The proposition, not the identifier

For class-C separation we need:

```text
ultimate_physical_parent(connecting SSH client)
    !=
ultimate_physical_parent(macOS host running VirelaiOS VMRunner)
```

The VirelaiOS guest is not “another physical machine” relative to its Mac host. A Docker client, another VM, a second guest identity or another nested host OS may all share that Mac.

| Claim | Sufficient observation | Not a physical-separation proof |
|---|---|---|
| Two guest identities | Two reported installation/VM identifiers | Different machine IDs or VM UUIDs. |
| Two VMs | Two separately observed running VM instances | They may share one hypervisor/physical host. |
| Two hosts | Two OS/hypervisor execution environments | “Host” may itself be a VM; follow placement to ultimate hardware. |
| Two physical machines | Trusted witness/admin maps endpoints to distinct hardware, or an explicitly accepted hardware/provider route | IPs, DNS names, SSH keys, MAC addresses, instance IDs or unverified topology JSON. |
| Cloud separation | Verified control-plane mapping plus a provider's applicable placement guarantee for this run | A pair of guest-reported instance IDs, “dedicated” marketing, or merely different regions/labels without a verified mapping. |

Sources: the draft [collector/predicate](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal-tape.sh#L39-L118); [systemd identifier semantics](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html); Apple's [VM identifier API](https://developer.apple.com/documentation/virtualization/vzgenericmachineidentifier). **Same-namespace inequality is diagnostic, not acceptance.**

## 2. Threat model and explicit trust

**Protect against:** accidental same-host aliases, NAT/bridge/container confusion, confusing two guests with two physical machines, changed/cloned IDs, self-reported topology being silently treated as verified, old fixture/transcript/manifest reuse, PID-number reuse and accidental disclosure of identifying evidence.

**Primary acceptance model:** owner-witnessed product testing. Trust the named reviewer/owner to inspect two real devices, trace the client and VMRunner execution to those devices, verify the intended SSH target out of band, and honestly approve the run. Trust their OS, firmware, tools and clocks/process information enough for the fixture. SSH supplies endpoint authentication/encryption, not hardware placement. NAT or a jump host is allowed if the true endpoint mapping is reviewed; intermediaries do not count as the second device.

**Not defended:** a malicious owner/reviewer, root-controlled endpoint forging all outputs, modified tape/SSH/VMRunner, dishonest hypervisor/provider, or covert command relaying to unrelated hardware. A nonce detects stale evidence under the stated trust model, not an adversarial OS synthesizing fresh evidence.

**Alternative trust models:** a trusted infrastructure administrator's physical inventory/placement mapping, a trusted provider's live control-plane placement assurances, or a separately engineered verified hardware-attestation route. Report these as different methods; never describe them as locally measured physical hardware. The initial implementation need only support the owner-witnessed route. Unknown or unsupported methods remain inconclusive.

## 3. Proof routes and their limits

### Recommended now: owner-witnessed hardware

1. Before the run, owner/reviewer observes the two physical devices, labeled `client-A` and `vm-host-B`, without recording serial numbers, account names or locations publicly.
2. Confirm which local console executes the client and which physical Mac executes VMRunner. If the client is a VM/container, trace its placement through every parent to the second physical device. A VM client is acceptable only with this additional independently verified mapping; changing the docs to permit this explicitly requires owner approval, not an implicit reinterpretation of the old Docker run.
3. Display the fresh run challenge/role at the respective consoles, observe the fixture and same-VM reconnect, and privately review exact-source/process continuity evidence.
4. Approve a run-bound separation statement and artifact hashes. A reviewer can be the owner; this is transparent trusted observation, not an independent third-party certificate. A signed statement improves attribution/tamper detection, not the truth of what was observed.

Do not require different public IPs, OS vendors, device models or hostnames. Two laptops on one router can be two machines; two routed VMs can be one.

### Trusted admin placement

Obtain current physical inventory mapping for both endpoints from a verifier outside the guest identity namespace. Resolve containers, VMs and nested hypervisors to ultimate hardware. Bind the mapping to the run interval and endpoint execution; recheck after reconnect if migration is possible. Unknown parent, ambiguous inventory alias or unobserved migration yields inconclusive.

### Provider-assured placement, optional and unverified here

AWS [spread placement](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-strategies.html#placement-groups-spread) documents distinct hardware within one spread group. AWS [Dedicated Hosts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html) are physical servers with placement control; two different authenticated host allocations with fresh endpoint mappings are another route. “Dedicated Instances” alone do not provide separate-host identity. Do not combine Dedicated Hosts with placement groups: AWS prohibits that.

For a possible Mac route, AWS [Mac considerations](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-mac-instances.html#mac-instance-considerations) specify bare-metal instances, one Mac instance per Dedicated Host and a 24-hour allocation minimum. A private verifier would read authenticated control-plane mappings before/after the fixture, ensure both host allocations differ, and record any recovery/migration event. Raw account/instance/host IDs remain private; export only the checked relationship and reviewer decision. An exported screenshot or guest-provided instance ID is not an authenticated API observation.

**Not verified:** an available macOS 27+ image, entitlement/VZ launch behavior, required region/quota, SSH reachability, provider account or an actual cloud placement. Do not purchase or provision anything for this study. Generic Linux spread placement cannot replace the required compatible Mac running VMRunner.

### Hardware-backed attestation, future only

Apple [Managed Device Attestation](https://support.apple.com/guide/deployment/dep28afbde6a/web) can verify specific device properties with Secure Enclave/Apple issuer trust on supported hardware. But distinct keys are not necessarily distinct devices: one device can hold more than one key. Compare verified certified device identity in private, require genuine hardware roots rather than guest/vTPM identities, check the certificate chain/freshness and bind the attested endpoint to this fixture/channel.

Apple documents cached attestations, fresh-query rate limits and anonymous User Enrollment properties; missing unique-device properties or unestablished session binding is inconclusive. A remote quote can be relayed from other hardware, so freshness alone is insufficient. Microsoft [vTPM documentation](https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch#vtpm) illustrates why two TPM-looking guest attestations need not imply two physical hosts.

This route needs a real verifier and a platform-specific deployment design. It is **not** the narrow M87 fix and no automatic hardware-attestation claim is proposed.

## 4. Concrete tape correction

Keep `remote-terminal.sh serve/attach`, strict host-key checks, key authorization, loopback bridge and the guest fixture. Change evidence handling, not the chosen transport.

### A. Replace the collector and single success bit

Remove the physical-identity inference at draft [tape lines 39–118](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal-tape.sh#L39-L118). Do not replace it with “different IDs in one namespace.”

Record independent result fields:

```json
{
  "schema": "virelai.m87-evidence/v1",
  "run_id": "<fresh random run label>",
  "challenge": "<fresh 256-bit challenge, hexadecimal>",
  "source": {"client": "<exact SHA>", "host": "<exact SHA>", "dirty": false},
  "behavior": {"verdict": "passed|failed|blocked", "checks": {}},
  "continuity": {"verdict": "passed|failed|inconclusive"},
  "separation": {
    "verdict": "accepted|rejected|inconclusive",
    "method": "owner-witness|admin-placement|provider-assurance|none",
    "roles": ["client-A", "vm-host-B"],
    "same_physical_parent": null,
    "reviewed": false,
    "trust": "<explicit reviewer/platform/provider assumptions>"
  },
  "class_c": "pending|accepted|failed|blocked|inconclusive"
}
```

This is a schema sketch, not an actual successful manifest. Capability facts (`arm64`, macOS version), endpoint identities and address-family/loopback summaries are reported checks, not separation evidence.

Optional installation diagnostics must use `{namespace, scope, provenance, token}` rather than an untyped `machine`. Disable them by default. If needed privately, use a single per-run random HMAC key on both collectors, conveyed over verified SSH input—not argv/environment/logs—and domain-separate by namespace. Do not publish the key or tokens. Different namespaces are incomparable; different tokens do not grant acceptance, and collisions/cloned tokens mean that diagnostic is unusable, not that the hardware is proved identical. This avoids today's linkable plain digest without making HMAC a hardware proof.

### B. Make the fixture fresh

Generate one random run ID and a 256-bit challenge; never call them hardware identities. Use run-specific fixture filenames and verify their absence before starting. Refuse an occupied fixture namespace rather than deleting unknown files.

For example, a challenge-bearing guest command can retain the existing shell semantics:

```text
echo m87-<challenge>-first > M87.<short-run-id>.A
cat M87.<short-run-id>.A
```

Require exact host-share bytes `m87-<challenge>-first\n`; record the result only after the submitted-line boundary, not the command echo. On reconnect, write/read a second phase token through the same live guest, then compare both exact files. Use run-specific cancel/partial negatives and verify they were absent before and remain absent after. Retain existing editing/history/UTF-8/ANSI/pipeline/external-ELF assertions.

This prevents an *old* receipt satisfying a *new* run. It does not make a forged live host trustworthy or certify hardware.

### C. Bind “same live VM” more carefully

The draft [wrapper metadata](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal.sh#L229-L238) records only service/runner PIDs. Add a private random `session_generation` at service launch. Capture generation-aware process start tokens for the actual service and runner, from the host OS process API; store/compare these under the service's existing owner-only state.

At preflight, middle and final probes:

- Require the active per-share lock, service generation and both `(PID, start-token)` pairs to be unchanged.
- Require both processes live and owned as expected; do not accept a copied `session.json` whose PIDs now name different processes.
- Check the serial log/session from initial attachment through the fixture for exactly one initial guest boot/GOSH attach and no restart/handback; compare fresh phase receipts.
- Record the precise host API/start-token resolution and its limitations. If the implementation cannot acquire a generation-aware token, return continuity inconclusive rather than relabeling PID equality.

A session-generation UUID alone can be copied and does not establish process or hardware identity. Together these checks strengthen continuous-process evidence under a trusted OS. Host-controlled logs and tokens are not cryptographic proof against that host.

### D. A two-phase result, not an arbitrary override flag

Proposed interfaces, **not existing commands**:

```sh
# Behavior capture. Records separation as unknown unless reviewed evidence exists.
bash tools/remote-terminal-tape.sh ... --fixture-only \
  --evidence-mode capture

# After observing that exact run: local verification/finalization, no new SSH action.
bash tools/remote-terminal-tape.sh \
  --evidence-mode finalize --run /private/run-dir \
  --separation-evidence /private/owner-reviewed-evidence.json
```

The behavior capture generates the challenge at start and leaves a **pending/non-accepted** class-C result. A reviewer must observe the live run, not retroactively assert hardware from a transcript. Finalization checks strict schema, matching run/challenge/exact SHAs, run interval, approved method/reviewer, reviewed endpoint-to-physical-parent mapping, fixture/continuity verdicts and artifact hashes. Use a reviewer key configured independently from the tape/SSH target if authenticating approval; do not trust a public key supplied in the evidence file. An unsigned approval is acceptable only when the owner directly reviews it locally, explicitly marked as owner-trusted, never automatically accepted as a third-party attestation.

Reject unknown schema/method, excess-size/unsafe-path input, wrong nonce, wrong source, edited/missing artifact, stale interval, unreviewed self-report or ambiguous mapping. Maintain a local private consumed-run ledger, with atomic finalization, so the same approval cannot authorize a later run. Rereading an accepted run is idempotent verification, not another observation.

Do **not** add `--different-machines`, `--force-class-c` or a user-supplied random identity that manufactures separation. A single boolean in a JSON file is not the owner observation.

### E. Verdict/exit rules

| Condition | Behavior result | Separation result | Overall class C / exit |
|---|---|---|---|
| Complete fixture, continuity and approved distinct physical mapping | passed | accepted, named trust route | **ACCEPTED / 0** |
| Same physical parent verified (container, two VMs, nested hosts on one machine) | may pass as smoke | rejected | **REJECTED / 1**, not a broken SSH claim |
| Guest fixture or continuity actually fails | failed | whatever evidence supports | **FAILED / 1** |
| SSH/consent/authorized key/compatible host prerequisite missing | blocked | unassessed | **BLOCKED / 2** |
| Fixture passes but physical placement/continuity unknown, or review pending | passed | inconclusive | **INCONCLUSIVE / 2** |
| Invalid, forged, mismatched or replayed evidence | keep actual fixture result | rejected evidence, not necessarily known same hardware | **EVIDENCE REJECTED / 1** |

Preserve different reasons in `result.json` and short `result.txt`. Do not print “PASS class C” during behavior capture, and do not count smoke or inconclusive records as project completion. A failed proof is not automatically proof of same hardware.

## 5. Privacy-safe evidence

- Use the existing mode-0700 evidence directory/mode-0600 files; creation must be exclusive and non-symlinked.
- Private raw capture may contain SSH diagnostics and identifying prompts. Never claim it is public-safe merely because scripted commands are fixtures.
- Publish only an allowlisted fixture extract, assertion results, fresh challenge/run ID, exact source SHAs, artifact hashes, role labels, relation “different physical parents,” method and named trust class. The reviewer may use an established pseudonym/key without publishing personal information.
- Keep hardware serials/UUIDs, installation tokens, cloud account/instance/host IDs, SSH keys/fingerprints, usernames, addresses, local paths and inventory location private. No secrets, session stores, owner history/documents or arbitrary session recording.
- Review public exports before sharing. Hashes bind the retained private raw files without disclosing their contents; a reviewer must inspect the underlying evidence, not merely a hash.
- Do not filter the operational terminal byte stream or hide diagnostics to make tests pass. Sanitization is a separate evidence-export step.

## 6. Regression matrix inside the existing card

Extend `tools/tests/test_remote_terminal.py`; keep the existing five wrapper contracts and `live-remote-console.spec`. No new `verify-*` script or near-duplicate gate.

| Fixture/case | Required result |
|---|---|
| Same Mac through another SSH alias, or Colima/container with Linux machine ID | No physical acceptance; rejected if same parent verified, otherwise inconclusive. |
| Two VMs on one host; two macOS guests with different VM UUIDs | No physical acceptance. |
| Two nested “hosts” whose ultimate parent is the same | No physical acceptance. |
| Different OS namespaces | Not comparable; no acceptance from inequality. |
| Same namespace, IDs deliberately changed | Diagnostic only; physical verdict unchanged. |
| Two real hosts with cloned installation IDs | ID diagnostic unusable; approved physical mapping remains the actual evidence. |
| Different IPs, names, SSH keys or instance IDs without placement | Inconclusive separation. |
| Same NAT/public IP on two witnessed devices | May accept with reviewed mapping; no IP inequality requirement. |
| Client VM on independently verified second physical host | May accept only under explicitly owner-approved mapped-client policy. |
| Guest supplies fabricated topology/physical labels | Inconclusive; self-report never upgrades method. |
| Evidence for old/wrong challenge/SHA/interval; altered artifact; approval reused for new run | Evidence rejected, never accepted class C. |
| Old fixed receipt or exact old transcript | New challenge/receipt phase fails. |
| Service restarted with copied generation, or same PID number and new start token | Continuity fails. |
| Missing start token or physical-parent mapping | Inconclusive rather than assumed success. |
| Two provider instances without placement; different spread groups; two instances on one Dedicated Host | No provider-separated acceptance. |
| Approved provider route with actual compatible Mac and verified distinct allocations/mappings | Provider-assured acceptance only after real fixture; mocks test verdict logic only. |
| Two keys/guest vTPM certificates, stale/cached unrelated attestation | Not an implemented hardware-proof route; inconclusive. |
| Missing SSH prerequisite/consent | Existing explicit blocked result preserved; no local success fallback. |
| Public export contains identity/path/transport diagnostic/secret sentinel | Export fails privacy test; private raw capture is not published. |

Tests use stand-ins and do not claim hardware acceptance. The actual class-C run remains an owner-arranged physical test. Existing A/B outputs do not establish the placement proposition.

## 7. Proposed `docs/testing.md` amendment

**Design-only replacement text** for the draft PR's class-C portion, currently [lines 61–105](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/docs/testing.md#L61-L105). Do not apply to a project during this study. Apply with the tape correction so documentation never advertises unimplemented flags or evidence checks. Leave the class-A/B section unchanged.

```markdown
### Class C: remote fixture and physical-host separation

Class C requires the SSH client and the Mac running VMRunner to have
different ultimate physical hosts, authorized key-based host OpenSSH
access, and a verified host key. The VirelaiOS guest is not a second
physical machine. Two containers, two VMs, two guest identities or two
nested host OSes may share one physical host.

Operator prerequisites: configure Remote Login/key authorization yourself,
verify the host fingerprint through a trusted channel, and ensure SSH
reachability. Do not disable host-key checks. Neither script enables
Remote Login, uses sudo or changes network rules.

On the Apple-silicon/macOS 27+ VM host:

    bash tools/remote-terminal.sh serve --share /absolute/remote-share

From the independently identified connecting machine:

    ssh -tt operator@vm-host 'cd /absolute/VirelaiOS && bash tools/remote-terminal.sh attach --share /absolute/remote-share'

Record only the explicitly consented scripted fixture:

    bash tools/remote-terminal-tape.sh --ssh-target operator@vm-host \
      --host-repo /absolute/VirelaiOS --share /absolute/remote-share \
      --fixture-only --evidence-mode capture

The tape records two different propositions:

- Fixture behavior: verified-key SSH, GOSH/guest principal, editing/Up,
  Ctrl-C cancellation, UTF-8/ANSI, pipeline/external command, fresh
  challenge-bearing guest receipts and same-live-VM reconnect.
- Physical placement: owner-witnessed or trusted-admin-verified mapping
  of both execution endpoints to different physical hosts. Any
  provider-assured route is identified separately with its assumptions.

IPs, hostnames, SSH host keys, installation/machine IDs, VM UUIDs and
cloud instance IDs do not prove physical separation. Namespace-tagged
identifier checks are diagnostics only. Different IDs, even in the same
namespace, cannot upgrade the verdict. A connecting VM/container qualifies
only when its complete placement to the second physical host is
independently verified and the owner approves that mapped-client policy.

For the ordinary owner-witnessed route, observe the two physical devices
and their live endpoint execution during the challenged run. Review the
exact source, fixture and continuity evidence, then finalize that same run:

    bash tools/remote-terminal-tape.sh --evidence-mode finalize \
      --run /private/run-dir \
      --separation-evidence /private/owner-reviewed-evidence.json

Finalization requires run/challenge/source/interval and artifact-hash
agreement, approved reviewer/method and distinct physical-parent mapping.
An unreviewed self-report, arbitrary override flag or old approval is not
proof. Trust the honest reviewer and endpoint OS for witnessed acceptance;
this is not cryptographic resistance to a malicious host, owner or relay.

Service generation and generation-aware service/runner process tokens
must remain unchanged through disconnect/reconnect. PIDs alone are not
generation identities. Missing continuity evidence is inconclusive.

Evidence is private under artifacts/remote-terminal/<run>/ on the
connecting machine. Use a dedicated clean fixture share and run-specific
files; occupied fixture names are refused, not silently overwritten.
Keep raw transport captures owner-only. Export only reviewed fixture
assertions, role labels, method/trust, result and artifact hashes; do not
publish stable hardware IDs or digests, addresses, usernames, keys,
cloud account/host IDs, private paths, documents or history.

Overall verdicts:

- ACCEPTED (exit 0): fixture and continuity pass, and distinct physical
  placement is reviewed and accepted under the named trust route.
- FAILED / REJECTED (exit 1): a required behavior/continuity check fails,
  same physical placement is verified, or submitted evidence is invalid.
  A rejected proof is not automatically proof of same hardware.
- BLOCKED (exit 2): a named SSH, key, consent or host prerequisite is absent.
- INCONCLUSIVE (exit 2): fixture behavior may pass, but physical placement,
  continuity or owner review is unavailable. Keep smoke evidence; do not
  report class-C acceptance.

Controls: attach Ctrl-C goes to GOSH; Ctrl-] disconnects without stopping
the VM. Serve Ctrl-C stops its own runner. Ctrl-D on an empty line, exit
or monitor returns the kernel monitor; a bare monitor is not GOSH
acceptance. Reattach refuses until GOSH is attached. Documents and
GOSH-HISTORY.TXT persist; VM RAM/vars/overlay do not persist across a
service restart.

The bridge is loopback-only, HMAC-authenticated plaintext within the SSH
boundary. One client, serial-only; no guest SSH/PTY/resize/Screen/graphics
or expanded kernel TUI claim. Keep M87 product acceptance open until both
desktop and remote journeys have their required evidence. State remains
in docs/status.md; neither smoke nor an inconclusive tape completes M87.
```

## 8. Landing sequence and unanswered questions

1. Owner approves the witnessed trust model and whether a client VM mapped to a second physical host qualifies. Do not reuse the old same-Mac Docker run as class C.
2. Existing #1860 owner implements the correction/tests in the active PR, including schema/finalization and continuity fields; no independent issue or overlapping editor.
3. Run A/B according to the existing card and retain private evidence. This design does not claim those implementation checks passed.
4. Arrange the second physical endpoint and reviewer, run the challenged fixture, then finalize the exact observed run.
5. Only accepted evidence can support changing product completion state; update misleading verdict wording while retaining the old Docker run as explicitly labeled smoke.

Open verification gaps: real second device, trusted placement/witness, raw live fixture artifacts, process start-token API implementation, mapped-client policy approval, any provider/VZ capability and any hardware-attestation/session binding. These are named prerequisites/design work, not evidence that the working SSH path is broken.
