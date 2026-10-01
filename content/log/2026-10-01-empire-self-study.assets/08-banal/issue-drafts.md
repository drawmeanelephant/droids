# Existing-issue decision memo — do not file a duplicate

**New issue candidates: 0. External actions taken: 0.**

## Candidate disposition: retain on existing #225, unposted

- **Target repo:** `drawmeanelephant/banal`.
- **Existing issue:** [#225 — `⌘⌫` doesn't trash the note when the editor is focused](https://github.com/drawmeanelephant/banal/issues/225), open, zero comments on 2026-10-01.
- **Memo title:** Decide Command–backward Delete's text-versus-file scope before fixing #225.
- **Problem:** The owner reports editor-focused ⌘⌫ did not trash a note, while README/Help advertise it without focus scope. Making it global also conflicts with native text deletion and leaves selection/focus, auxiliary windows, folder targets, and recovery undefined.
- **Evidence:** SHA [`24e1da4439b016473119738b233eb8e636979cc6`](https://github.com/drawmeanelephant/banal/commit/24e1da4439b016473119738b233eb8e636979cc6); [current command/enablement](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALApp/Commands/FileCommands.swift#L4-L58); [editor key delegation](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALApp/Views/MarkdownTextView.swift#L562-L596); [pending-write cancellation and filesystem trash](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALCore/NoteStore.swift#L478-L499). Official-source distinctions and the installed AppKit binding receipt are in `conventions-survey.md`. No new live repro was performed.

### Decision requested from owner

**Recommended:** text responders retain native/customized text deletion; ⌘⌫ trashes only in the focused note/folder collection; explicit menus still offer note trash. Clarify Help/README and verify ⌘2 → ⌘⌫. A one-step editor-trash chord, if needed, should be distinct and conflict-checked.

**Alternative requiring explicit owner approval:** deliberately override editor ⌘⌫ to trash the note. Record the loss of native text behavior and select a documented alternative for line deletion. Define whether selected text, title/tags/search/find fields, marked text, and sheets are excluded. Do not treat “main window” alone as adequate focus scope.

**Neither option is implemented or approved by this study.**

### Proposed scope after decision

One issue, one focus/target policy, matching menu/help copy, and focused UI/recovery coverage. Investigate responder dispatch with an isolated scratch vault, recording caret/selection/first responder; do not infer no-op causes from source alone.

### Acceptance criteria

1. Owner records the selected policy and exact backward-delete chord.
2. Middle/end/start/empty/wrapped-line and selected-text cases behave as the chosen policy states; ordinary text editing never accidentally trashes a file under the recommended policy.
3. Title/tags/search/find/rename fields, marked text, Settings/sheets/open panels, read mode, and two-window target ownership are covered.
4. Note-list trash targets its selected note; folder-focused trash targets its folder even when a note remains selected; virtual sidebar filters have no filesystem-delete target.
5. File and context-menu actions remain keyboard/VoiceOver discoverable; document focus-scoped shortcut use and recovery accurately.
6. Check ⌘Z text undo separately from filesystem recovery; restore immediately typed bytes after trash, and preserve pending edits on a failing trash operation. This is an unverified source-backed risk, not a reproduced bug.
7. Verify held-key behavior and distinct ⌫/⌦/Fn-Delete on Apple and external PC keyboards; do not add accidental forward-delete aliases.
8. Add targeted UI coverage and run project checks on the eventual authorized implementation; do not cite #229's six unrelated UI tests as Command-Delete coverage.

### Explicit non-goals

No implementation in this card; no global keyboard hook by default; no new settings mode, custom trash database, permanent-delete feature, cross-platform app work, or redesign of publishing menu availability. No new ticket for each unverified matrix cell.

### Duplication check

Read all 229 issue/PR records available on 2026-10-01 (106 issues), inspecting relevant titles/bodies. #225 is the exact open concern. Closed [#140](https://github.com/drawmeanelephant/banal/issues/140) covers broader keyboard/focus/undo; closed [#165](https://github.com/drawmeanelephant/banal/issues/165) covers Finder fidelity/trash; closed [#191](https://github.com/drawmeanelephant/banal/issues/191) and merged [#194](https://github.com/drawmeanelephant/banal/pull/194) cover model fallback with Settings key. Merged [#229](https://github.com/drawmeanelephant/banal/pull/229) mentions verifying #225 but fixes UI-test harness flakiness, not a documented Command-Delete policy.

All actionable work here belongs in #225's decision and acceptance scope. Do not reopen unrelated closed issues or create a duplicate. Split a new recovery/focus bug only after an independent reproduction and another duplicate check.
