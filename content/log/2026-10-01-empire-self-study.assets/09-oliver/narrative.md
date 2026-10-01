## Where we are

> Coordinator provenance note: findings below record the worker snapshot.
> Current filing dispositions are in `../filed-issues.json`; no project fixes
> were made. Raw captures were preserved only in ignored local
> `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/09-oliver/`.
> These local support links are not published or included in a clean clone.
> Immutable GitHub receipts and the distilled report remain the portable record.


Oliver has a respectable wall: the fresh build passed all **60 Cooklang canonical examples**. The supplied **652/652 CommonMark** score stayed on the shelf; this visit was for Textile and recipes, not another lap around Markdown. Textile's own audit calls its wall fixtures rather than normative conformance, and Cooklang's HTML is deliberately Oliver's business, not the language's. So we compared actual Textile HTML and actual recipe semantics against pinned reference implementations. [Receipts: `conformance-results.md`, `summary.json`; [Textile contract](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/TEXTILE-PARITY.md#L7-L17), [Cooklang contract](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/COOKLANG.md#L262-L269).]

## What's improved

The improvement is in the flashlight, not the parser. **800 fixed-seed comparisons** gave us 240 Textile agreements and 296 Cooklang agreements after normalization; the remaining outputs are not a bag of bugs. Big/small phrases, raw-HTML policy, forcing brackets, pretty-printing and the recipe pane's JSON choices all need their own labels. Then a second look at the same 400 recipes found **three canonical roundtrip failures**, all one family. [Receipts: `results.jsonl`, `roundtrip-results.jsonl`, `conformance-results.md`.]

Two tiny nits survived minimization: `[-\n\n-]` escapes the comment remover and becomes two steps, and `@x{\n}` turns from text into an ingredient when serialized and reparsed. The latter breaks Oliver's own fixed-point promise, not merely somebody else's preferred spelling. A green corpus can be quite sincere and still have a blind spot. [Receipts: `minimized.json`, `minimized-roundtrip.json`; [fixed-point promise](https://github.com/drawmeanelephant/oliver/blob/3615e6253f0e17b410cf1b987507d30bfcde537c/docs/COOKLANG.md#L374-L388).]

## What's next

There are **two drafts, zero posted issues, zero project fixes**. We checked the existing open and closed issues first; the old fuzz card covered safety and determinism, not this semantic comparison. The useful next move is small: keep comments opaque across paragraph boundaries, and keep canonical text from quietly acquiring ingredient status. Leave the owner's checkout and CommonMark campaign alone. The recipes have earned a better regression test, not a grand rewrite. [Receipts: `issue-drafts.md`, `SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/09-oliver/issue-inventory.json`; [closed safety fuzz issue #94](https://github.com/drawmeanelephant/oliver/issues/94).]
