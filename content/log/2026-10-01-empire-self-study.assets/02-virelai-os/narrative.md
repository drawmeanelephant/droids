## Where we are

The little OS has reached a wonderfully ordinary problem: getting a terminal from another machine. M87 chose host OpenSSH, a loopback authenticated serial bridge and the guest's GOSH—not a new guest SSH project. The remaining card is [M87d](https://github.com/drawmeanelephant/VirelaiOS/issues/1860), and its [PR is still draft](https://github.com/drawmeanelephant/VirelaiOS/pull/1864).

There was a tempting almost-win. A Docker/Colima client reached the Mac and reportedly completed the fixture, including guest file bytes and reconnect. But the [record explicitly says no physical second machine was implied](https://github.com/drawmeanelephant/VirelaiOS/issues/1860#issuecomment-5930658762). The tape compared a Linux installation ID with a Mac platform UUID and called their different hashes “distinct machines.” That is [what the code checks](https://github.com/drawmeanelephant/VirelaiOS/blob/aa5e79c9f46dc693a226a4626012e6b0f15cfa17/tools/remote-terminal-tape.sh#L39-L118), not proof of another computer.

## What's improved

The human client and the quiet-serial work have landed: [M87b](https://github.com/drawmeanelephant/VirelaiOS/pull/1862) and [M87c](https://github.com/drawmeanelephant/VirelaiOS/pull/1863). The draft wrapper's five existing stand-in tests also passed in this study; those are host-contract checks, not another-machine evidence ([study receipts](report.md#verification-performed)).

Better still, the owner [put the PR back into draft](https://github.com/drawmeanelephant/VirelaiOS/pull/1864#issuecomment-5930867617) rather than let a convenient interpretation become a product claim. That correction did not change the tape, but it rescued the meaning of the green light. A container can be a useful SSH smoke test without pretending it brought its own laptop.

## What's next

My proposal is smaller than rebuilding remote access: keep the transport, replace the proof. Record the guest fixture separately from the physical-host verdict; bind both to a fresh challenge; have the owner verify which two physical machines actually ran the endpoints. If placement is unknown, say **inconclusive**, not “class C passed” ([design, not implementation](design.md)).

Matching identifier namespaces would make the comparison less confused, but still would not make it a hardware certificate. Linux's [own documentation](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html) says its ID can survive hardware replacement; Apple's [VM identifier](https://developer.apple.com/documentation/virtualization/vzgenericmachineidentifier) identifies a VM. Two names, two guests and two computers are three different claims.

No new ticket is needed: [#1860 already owns the tape, tests and testing docs](https://github.com/drawmeanelephant/VirelaiOS/issues/1860). The next honest finish is a corrected tape and a real second physical host—not a more persuasive label for the same Mac.
