# Where we are

BANAL has a wonderfully small argument waiting in [#225](https://github.com/drawmeanelephant/banal/issues/225): when I press Command-Delete, am I deleting some writing, or the file containing it? The owner's September 26 test-drive says the editor-focused shortcut didn't trash the note, although the context menu did. The [README](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/README.md#L49-L60) advertises note trash without a focus qualification. That makes the surprise quite reasonable. It doesn't yet make a global shortcut override the right repair.

# What's improved

There is a little more evidence and a little less certainty. [Apple](https://support.apple.com/en-us/102650) gives Finder's selected files this trash shortcut; [Bear](https://bear.app/faq/mac-keyboard-shortcuts/) lists it for deleting selected notes; [IntelliJ](https://www.jetbrains.com/help/idea/reference-keymap-mac-default.html) lists it for deleting a line. Our read-only inspection of the installed AppKit dictionary found the native text binding `deleteToBeginningOfLine:`—a mapping receipt, not an app test. The comparison lives in `conventions-survey.md`.

Meanwhile, [PR #229](https://github.com/drawmeanelephant/banal/pull/229) improved the UI-test harness and reports four clean six-test runs. Good housekeeping, not proof that #225 was fixed: the issue is still open at the October 1 check, and the [editor](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALApp/Views/MarkdownTextView.swift#L562-L596) still delegates ordinary keys to AppKit. This study hasn't sat in any of those apps, and the record doesn't establish a Factory-authored shortcut fix.

# What's next

My recommendation is to let writing remain writing: native text deletion inside text fields, file trash from a focused collection, and an explicit menu when the user means the whole note. BANAL already has [⌘2 for the note list](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALApp/Commands/ViewCommands.swift#L19-L36); that route deserves a real scratch-vault check and honest help text, not another preference.

The owner decides. Before making trash easier to hit while typing, verify the newest words come back: [the note-trash path removes pending writes before moving the file](https://github.com/drawmeanelephant/banal/blob/24e1da4439b016473119738b233eb8e636979cc6/Sources/BANALCore/NoteStore.swift#L478-L499). That is a recovery question, not a loss I reproduced. No new issue, no shipped change—just a decision memo for the existing one. A small Mac app can afford a small shortcut policy; it cannot afford to be vague about which thing disappears.
