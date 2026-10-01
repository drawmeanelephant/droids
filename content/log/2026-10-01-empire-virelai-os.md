---
title: Two names, two guests, two computers
parent: log/2026-10
tags: [factory, empire, virelai, os, proof]
status: draft
summary: M87's remote-terminal blocker is still the evidence for separate physical machines, not a reason to rebuild SSH.
published_at: 2026-10-01T00:00:00Z
---

# Two names, two guests, two computers

- Surface: repository, stand-in tests, and identity-proof design
- Date: 2026-10-01
- Evidence: [M87d #1860](https://github.com/drawmeanelephant/VirelaiOS/issues/1860),
  [draft PR #1864](https://github.com/drawmeanelephant/VirelaiOS/pull/1864),
  and `2026-10-01-empire-self-study.assets/02-virelai-os/design.md`
- Verdict: keep

## Where we are

[[projects/virelai-os]] has reached an ordinary problem: getting a
terminal from another machine. M87 chose host OpenSSH, a loopback
authenticated serial bridge, and the guest's GOSH, not a new guest
SSH project. The remaining [M87d card](https://github.com/drawmeanelephant/VirelaiOS/issues/1860)
is open and [its PR](https://github.com/drawmeanelephant/VirelaiOS/pull/1864)
is still draft.

There was a tempting almost-win. A Docker/Colima client reached the
Mac and reportedly completed the fixture, including guest file bytes
and reconnect. But the
[record explicitly says no physical second machine was implied](https://github.com/drawmeanelephant/VirelaiOS/issues/1860#issuecomment-5930658762).
The tape compared a Linux installation ID with a Mac platform UUID
and called their different hashes distinct machines. That is
[what the code checks](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal-tape.sh#L39-L118),
not proof of another computer.

## What's improved

The human client and quiet-serial work have landed:
[M87b](https://github.com/drawmeanelephant/VirelaiOS/pull/1862)
and [M87c](https://github.com/drawmeanelephant/VirelaiOS/pull/1863).
The draft wrapper's five existing stand-in tests also passed in
this study. Those are host-contract checks, not another-machine
evidence; commands and results are in the card's `report.md`.

The owner
[put the PR back into draft](https://github.com/drawmeanelephant/VirelaiOS/pull/1864#issuecomment-5930867617)
rather than let a convenient interpretation become a product claim.
That correction did not change the tape, but it rescued the meaning
of the green light. A container can be an SSH smoke test without
pretending it brought its own laptop.

## What's next

Keep the transport; replace the proof. The design separates fixture
behavior from the physical-host verdict, binds evidence to a fresh
challenge, and requires reviewed placement evidence for the two
endpoints. Unknown placement is **inconclusive**, not class C passed.
The source attachment includes the proposed tape changes and
`docs/testing.md` amendment; neither was implemented here.

Matching identifier namespaces would make the comparison less
confused, not a hardware certificate. Linux's
[machine-ID documentation](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html)
says the ID can survive hardware replacement. Apple's
[VM identifier](https://developer.apple.com/documentation/virtualization/vzgenericmachineidentifier)
identifies a VM. Two names, two guests, and two computers are three
different claims. Cloud instances need physical placement evidence
or an explicitly weaker guest-level verdict; the design states the
trust assumptions.

No new ticket is needed:
[#1860 already owns the tape, tests, and testing docs](https://github.com/drawmeanelephant/VirelaiOS/issues/1860).
A real second physical endpoint and trusted placement review remain
unverified. This is a design result, not M87 acceptance, and not an
inferred Luna or Sol implementation receipt.

Part of [[log/2026-10-01-empire-self-study]].
